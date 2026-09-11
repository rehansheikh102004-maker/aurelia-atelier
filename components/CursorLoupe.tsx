"use client";

import React, { useEffect, useRef } from "react";

interface CursorLoupeProps {
  active: boolean;
}

export function WatchmakerLoupe({ active }: CursorLoupeProps) {
  const loupeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!active) return;

    const loupe = loupeRef.current;
    if (!loupe) return;

    let rafId: number | null = null;
    let targetX = -200;
    let targetY = -200;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          if (loupe) {
            loupe.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
          }
          rafId = null;
        });
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [active]);

  if (!active) return null;

  return (
    <div
      ref={loupeRef}
      className="pointer-events-none fixed top-0 left-0 z-50 will-change-transform transition-opacity duration-300"
      style={{
        transform: "translate3d(-200px, -200px, 0) translate(-50%, -50%)",
      }}
    >
      {/* Outer Loupe Bezel (Optimized GPU glass without costly backdrop re-blur) */}
      <div className="relative w-36 h-36 rounded-full border-2 border-[#E29B4A] bg-[#001224]/50 shadow-[0_0_35px_rgba(226,155,74,0.35)] flex items-center justify-center">
        {/* Reticle Crosshairs */}
        <div className="absolute w-full h-[1px] bg-[#E29B4A]/40" />
        <div className="absolute h-full w-[1px] bg-[#E29B4A]/40" />

        {/* Center Target Dot */}
        <div className="w-2.5 h-2.5 rounded-full border border-[#E29B4A] bg-[#001D39]" />

        {/* Rotating Metric Ring */}
        <div className="absolute inset-1 rounded-full border border-dashed border-[#E29B4A]/40 animate-spin-slow" />

        {/* Floating Callout Badge */}
        <div className="absolute -top-7 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-[#001224]/90 text-[#BDD8E9] px-3 py-0.5 rounded-full font-mono text-[8px] tracking-[0.2em] uppercase border border-[#E29B4A]/40 shadow-lg">
          28,800 VPH // CALIBER ARCHIVE
        </div>

        {/* Bottom Specs Badge */}
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-[#E29B4A] font-mono text-[7px] tracking-[0.25em] uppercase font-semibold">
          MAGNIFICATION 4.0X
        </div>
      </div>
    </div>
  );
}
