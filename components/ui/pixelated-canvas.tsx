"use client";

import React, { useRef, useEffect } from "react";

interface PixelatedCanvasProps {
  src: string;
  width?: number;
  height?: number;
  cellSize?: number;
  dotScale?: number;
  shape?: "circle" | "square";
  backgroundColor?: string;
  dropoutStrength?: number;
  interactive?: boolean;
  distortionStrength?: number;
  distortionRadius?: number;
  distortionMode?: "swirl" | "repel";
  tintColor?: string;
  tintStrength?: number;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
}

export function PixelatedCanvas({
  src,
  width = 420,
  height = 540,
  cellSize = 4,
  dotScale = 0.72,
  shape = "circle",
  backgroundColor = "#001224",
  dropoutStrength = 0.2,
  interactive = true,
  distortionStrength = 2.8,
  distortionRadius = 85,
  distortionMode = "swirl",
  tintColor = "#BDD8E9",
  tintStrength = 0.35,
  className = "",
}: PixelatedCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -9999,
    y: -9999,
    active: false,
  });

  // Helper to parse hex tint color
  const parseColor = (hex: string) => {
    let clean = hex.replace("#", "");
    if (clean.length === 3) {
      clean = clean.split("").map((c) => c + c).join("");
    }
    const num = parseInt(clean, 16);
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255,
    };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let isMounted = true;
    let observer: IntersectionObserver | null = null;
    const img = new Image();
    if (src.startsWith("http://") || src.startsWith("https://")) {
      img.crossOrigin = "anonymous";
    }
    img.src = src;

    img.onload = () => {
      if (!isMounted) return;

      const targetWidth = width;
      const targetHeight = height;

      canvas.width = targetWidth;
      canvas.height = targetHeight;

      // Offscreen canvas to sample pixel data
      const offCanvas = document.createElement("canvas");
      offCanvas.width = targetWidth;
      offCanvas.height = targetHeight;
      const offCtx = offCanvas.getContext("2d");
      if (!offCtx) return;

      // Draw image to cover target area
      const hRatio = targetWidth / img.width;
      const vRatio = targetHeight / img.height;
      const ratio = Math.max(hRatio, vRatio);
      const shiftX = (targetWidth - img.width * ratio) * 0.5;
      const shiftY = (targetHeight - img.height * ratio) * 0.5;

      offCtx.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        shiftX,
        shiftY,
        img.width * ratio,
        img.height * ratio
      );

      let imgData: Uint8ClampedArray;
      try {
        imgData = offCtx.getImageData(0, 0, targetWidth, targetHeight).data;
      } catch {
        return;
      }

      const tint = parseColor(tintColor);
      const particles: Particle[] = [];
      const step = cellSize;

      for (let y = 0; y < targetHeight; y += step) {
        for (let x = 0; x < targetWidth; x += step) {
          // Dropout threshold
          if (Math.random() < dropoutStrength) continue;

          const index = (y * targetWidth + x) * 4;
          const r = imgData[index];
          const g = imgData[index + 1];
          const b = imgData[index + 2];
          const a = imgData[index + 3];

          if (a > 30) {
            const brightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
            if (brightness < 0.04) continue;

            const finalR = Math.round(r * (1 - tintStrength) + tint.r * tintStrength);
            const finalG = Math.round(g * (1 - tintStrength) + tint.g * tintStrength);
            const finalB = Math.round(b * (1 - tintStrength) + tint.b * tintStrength);

            const dotSize = Math.max(1, step * dotScale * (0.4 + brightness * 0.8));

            particles.push({
              x: x + (Math.random() - 0.5) * 2,
              y: y + (Math.random() - 0.5) * 2,
              originX: x,
              originY: y,
              vx: 0,
              vy: 0,
              color: `rgba(${finalR}, ${finalG}, ${finalB}, ${0.4 + brightness * 0.6})`,
              size: dotSize,
            });
          }
        }
      }

      particlesRef.current = particles;

      let isVisible = false;

      const render = () => {
        if (!isVisible) return;

        // Background fill
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, targetWidth, targetHeight);

        const mouse = mouseRef.current;
        const radius = distortionRadius;
        const radiusSq = radius * radius;

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          if (interactive && mouse.active) {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const distSq = dx * dx + dy * dy;

            if (distSq < radiusSq && distSq > 0) {
              const dist = Math.sqrt(distSq);
              const force = (1 - dist / radius) * distortionStrength;
              const angle = Math.atan2(dy, dx);

              if (distortionMode === "swirl") {
                p.vx += Math.cos(angle + 0.45) * force;
                p.vy += Math.sin(angle + 0.45) * force;
              } else {
                p.vx += Math.cos(angle) * force;
                p.vy += Math.sin(angle) * force;
              }
            }
          }

          // Return spring force towards grid origin
          const returnForceX = (p.originX - p.x) * 0.08;
          const returnForceY = (p.originY - p.y) * 0.08;

          p.vx = (p.vx + returnForceX) * 0.84;
          p.vy = (p.vy + returnForceY) * 0.84;

          p.x += p.vx;
          p.y += p.vy;

          // Draw particle
          ctx.fillStyle = p.color;
          if (shape === "circle") {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
            ctx.fill();
          } else {
            ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
          }
        }

        animId = requestAnimationFrame(render);
      };

      observer = new IntersectionObserver(
        ([entry]) => {
          isVisible = entry.isIntersecting;
          if (isVisible) {
            cancelAnimationFrame(animId);
            animId = requestAnimationFrame(render);
          } else {
            cancelAnimationFrame(animId);
          }
        },
        { threshold: 0.05 }
      );

      if (containerRef.current) {
        observer.observe(containerRef.current);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      mouseRef.current = {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      isMounted = false;
      cancelAnimationFrame(animId);
      if (observer) observer.disconnect();
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [
    src,
    width,
    height,
    cellSize,
    dotScale,
    shape,
    backgroundColor,
    dropoutStrength,
    interactive,
    distortionStrength,
    distortionRadius,
    distortionMode,
    tintColor,
    tintStrength,
  ]);

  return (
    <div ref={containerRef} className={`relative flex items-center justify-center ${className}`}>
      <canvas
        ref={canvasRef}
        style={{ width: "100%", maxWidth: `${width}px`, height: "auto" }}
        className="cursor-crosshair rounded-xl"
      />
    </div>
  );
}
