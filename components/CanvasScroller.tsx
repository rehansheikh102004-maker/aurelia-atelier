"use client";

import React, { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useDeviceDetect } from "@/hooks/useDeviceDetect";
import { useFramePreloader } from "@/hooks/useFramePreloader";
import { Preloader } from "@/components/Preloader";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface CanvasScrollerProps {
  onActChange?: (act: number) => void;
}

export default function CanvasScroller({ onActChange }: CanvasScrollerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const { isMobile } = useDeviceDetect();
  const totalFrames = 450;
  const { imagesRef, progress, isReady, prioritizeAround } = useFramePreloader({
    totalFrames,
    isMobile,
  });

  const targetFrameRef = useRef<number>(0);
  const currentFrameRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);
  const isAnimatingRef = useRef<boolean>(false);
  const currentActRef = useRef<number>(1);
  const lastDrawnIdxRef = useRef<number>(-1);
  const lastValidImage = useRef<HTMLImageElement | null>(null);

  const canvasDimRef = useRef<{ w: number; h: number }>({ w: 1920, h: 1080 });
  const cropRef = useRef<{ sx: number; sy: number; sWidth: number; sHeight: number }>({
    sx: 0,
    sy: 0,
    sWidth: 1920,
    sHeight: 1080,
  });

  // Zero-lag, zero-black-frame direct GPU render pipeline
  const renderFrame = useCallback(
    (frameIndex: number, forceRedraw: boolean = false) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      let ctx = ctxRef.current;
      if (!ctx) {
        ctx = canvas.getContext("2d", {
          alpha: false,
          desynchronized: true,
        });
        if (!ctx) return;
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "medium";
        ctxRef.current = ctx;
      }

      const idx = Math.min(Math.max(Math.round(frameIndex), 0), totalFrames - 1);

      if (!forceRedraw && idx === lastDrawnIdxRef.current && lastValidImage.current) {
        return;
      }

      const images = imagesRef.current;
      let prospectiveImg: HTMLImageElement | null = images[idx] || null;

      // Resilient nearest-frame lookup if target frame is still pending decode
      if (!prospectiveImg || !prospectiveImg.complete || prospectiveImg.naturalWidth === 0) {
        for (let offset = 1; offset < 20; offset++) {
          const prev = images[idx - offset];
          if (prev && prev.complete && prev.naturalWidth > 0) {
            prospectiveImg = prev;
            break;
          }
          const next = images[idx + offset];
          if (next && next.complete && next.naturalWidth > 0) {
            prospectiveImg = next;
            break;
          }
        }
      }

      // Fall back to previously rendered image to guarantee ZERO blank/black flashes
      const imgToDraw =
        prospectiveImg && prospectiveImg.complete && prospectiveImg.naturalWidth > 0
          ? prospectiveImg
          : lastValidImage.current;

      if (!imgToDraw || !imgToDraw.complete || imgToDraw.naturalWidth === 0) return;
      lastValidImage.current = imgToDraw;

      const crop = cropRef.current;
      const dim = canvasDimRef.current;

      ctx.drawImage(
        imgToDraw,
        crop.sx,
        crop.sy,
        crop.sWidth,
        crop.sHeight,
        0,
        0,
        dim.w,
        dim.h
      );

      lastDrawnIdxRef.current = idx;
    },
    [imagesRef, totalFrames]
  );

  // Silky, video-smooth RAF interpolation loop with cinematic momentum damping
  const startAnimationLoop = useCallback(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    const tick = () => {
      const target = targetFrameRef.current;
      const current = currentFrameRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.04) {
        // Smooth 10% lerp per 60fps tick - glides through all intermediate frames like a 30-60fps video
        currentFrameRef.current = current + diff * 0.10;
        renderFrame(currentFrameRef.current);
        prioritizeAround(Math.round(currentFrameRef.current));

        // Sync live frame counter in telemetry overlay smoothly
        const frameEl = document.getElementById("overlay-live-frame");
        if (frameEl) {
          const displayFrame = Math.min(Math.max(Math.round(currentFrameRef.current), 0), totalFrames - 1);
          frameEl.textContent = `FRAME: ${String(displayFrame).padStart(3, "0")} / ${totalFrames}`;
        }

        rafIdRef.current = requestAnimationFrame(tick);
      } else {
        // Settled exactly at target frame
        currentFrameRef.current = target;
        renderFrame(target);
        isAnimatingRef.current = false;
        rafIdRef.current = null;
      }
    };

    rafIdRef.current = requestAnimationFrame(tick);
  }, [renderFrame, prioritizeAround, totalFrames]);

  const onScrollUpdate = useCallback(
    (targetFrame: number) => {
      targetFrameRef.current = targetFrame;
      prioritizeAround(Math.round(targetFrame));
      startAnimationLoop();
    },
    [prioritizeAround, startAnimationLoop]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Initialize 2D rendering context with desynchronized acceleration
    const ctx = canvas.getContext("2d", {
      alpha: false,
      desynchronized: true,
    });
    if (ctx) {
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "medium";
      ctxRef.current = ctx;
    }

    // DPR-Capped Resize Handler
    let lastWidth = window.innerWidth;
    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = window.innerWidth;
      const h = window.innerHeight;

      const pixelW = Math.floor(w * dpr);
      const pixelH = Math.floor(h * dpr);

      canvas.width = pixelW;
      canvas.height = pixelH;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      canvasDimRef.current = { w: pixelW, h: pixelH };

      const imgW = isMobile ? 720 : 1920;
      const imgH = isMobile ? 1280 : 1080;
      const canvasRatio = pixelW / pixelH;
      const imgRatio = imgW / imgH;

      let sx = 0,
        sy = 0,
        sWidth = imgW,
        sHeight = imgH;

      if (imgRatio > canvasRatio) {
        sWidth = imgH * canvasRatio;
        sx = (imgW - sWidth) / 2;
      } else {
        sHeight = imgW / canvasRatio;
        sy = (imgH - sHeight) / 2;
      }

      cropRef.current = { sx, sy, sWidth, sHeight };
      renderFrame(currentFrameRef.current, true);
    };

    const handleResize = () => {
      if (window.innerWidth !== lastWidth) {
        lastWidth = window.innerWidth;
        resizeCanvas();
      }
    };

    window.addEventListener("resize", handleResize);
    resizeCanvas();

    // GSAP ScrollTrigger Synchronization with Lenis
    const scrollTween = ScrollTrigger.create({
      trigger: "#scrolly-canvas-track",
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const p = self.progress;
        const targetFrame = p * (totalFrames - 1);
        onScrollUpdate(targetFrame);

        // Update telemetry HUD directly on the DOM
        const hudEl = document.getElementById("hud-progress-pct");
        if (hudEl) {
          hudEl.textContent = `${Math.round(p * 100)}%`;
        }

        let newAct = 1;
        if (p >= 0.8) newAct = 5;
        else if (p >= 0.6) newAct = 4;
        else if (p >= 0.4) newAct = 3;
        else if (p >= 0.2) newAct = 2;

        if (newAct !== currentActRef.current) {
          currentActRef.current = newAct;
          if (onActChange) onActChange(newAct);
        }
      },
    });

    // Stage 1 -> Stage 2 Exit Hand-off
    const exitTrigger = ScrollTrigger.create({
      trigger: "#scrolly-canvas-track",
      start: "bottom bottom",
      onEnter: () => gsap.to(container, { autoAlpha: 0, duration: 0.35 }),
      onLeaveBack: () => gsap.to(container, { autoAlpha: 1, duration: 0.35 }),
    });

    if (isReady) {
      renderFrame(0, true);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      scrollTween.kill();
      exitTrigger.kill();
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [isReady, isMobile, totalFrames, renderFrame, onScrollUpdate, onActChange]);

  return (
    <>
      <Preloader progress={progress} isReady={isReady} />
      <div
        ref={containerRef}
        className="fixed inset-0 z-0 h-[100dvh] w-screen pointer-events-none"
      >
        <canvas
          ref={canvasRef}
          className="h-full w-full object-cover will-change-transform"
        />
        {/* Subtle Contrast Vignette Layer */}
        <div className="absolute inset-0 vignette-overlay" />
      </div>
    </>
  );
}
