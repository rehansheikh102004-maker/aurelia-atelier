"use client";

import React, { useRef, useState } from "react";
import { Compass } from "lucide-react";

interface SpotlightCardProps {
  metrics: string;
  title: string;
  subtitle: string;
}

export function LightSpotlightCard({ metrics, title, subtitle }: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative overflow-hidden rounded-2xl glass-marine p-8 transition-all duration-500 hover:border-[#E29B4A]/50"
    >
      {/* Dynamic Liquid Gold Spotlight Beam */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(226, 155, 74, 0.22), transparent 80%)`,
        }}
      />

      {/* Decorative Hairline Top Border */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E29B4A]/50 to-transparent" />

      {/* Header Metric */}
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#E29B4A] flex items-center gap-2">
          <Compass className="w-3.5 h-3.5" />
          {metrics}
        </span>
        <span className="font-mono text-[9px] text-[#4E8EA2] tracking-widest">
          UNIT 840 // LEVEL 72
        </span>
      </div>

      {/* Title */}
      <h3 className="font-serif text-2xl sm:text-3xl font-light leading-tight text-[#BDD8E9]">
        {title}
      </h3>

      {/* Subtitle */}
      <p className="mt-3 font-sans text-xs sm:text-sm text-[#6EA2B3] leading-relaxed">
        {subtitle}
      </p>

      {/* Specs Grid */}
      <div className="mt-6 pt-6 border-t border-[#BDD8E9]/15 grid grid-cols-2 gap-4 font-mono text-[9px] uppercase tracking-wider text-[#6EA2B3]">
        <div>
          <span className="block text-[#BDD8E9] font-medium text-xs">8,450 SQ. FT.</span>
          <span>Interior Footprint</span>
        </div>
        <div>
          <span className="block text-[#E29B4A] font-medium text-xs">360° HORIZON</span>
          <span>Acoustic Low-Iron Glass</span>
        </div>
      </div>
    </div>
  );
}
