"use client";

import React, { useRef, useState } from "react";
import { Layers, ShieldCheck, Maximize2 } from "lucide-react";

export default function Luxury3DCard() {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div style={{ perspective: "1000px" }} className="w-full max-w-sm">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transition: isHovered ? "transform 0.1s ease-out" : "transform 0.6s ease-out",
        }}
        className="relative rounded-2xl glass-marine p-6 transform-gpu"
      >
        {/* Specular Glare Reflection */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
          style={{
            opacity: isHovered ? 0.25 : 0,
            background: `linear-gradient(${rotate.y * 5 + 135}deg, rgba(189,216,233,0.4), transparent 70%)`,
          }}
        />

        {/* Badge */}
        <div className="flex justify-between items-center mb-4">
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#E29B4A] flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" />
            MATERIAL SPECIFICATION
          </span>
          <span className="w-2 h-2 rounded-full bg-[#E29B4A] animate-pulse" />
        </div>

        {/* Title */}
        <h4 className="font-serif text-xl font-light text-[#BDD8E9]">
          Navona Roman Travertine
        </h4>
        <p className="mt-1 font-sans text-xs text-[#6EA2B3] leading-relaxed">
          Quarried from Tivoli, Italy. Continuous book-matched slabs, honed matte finish with zero open pore sealing.
        </p>

        {/* Feature Specs */}
        <div className="mt-5 space-y-2.5 pt-4 border-t border-[#BDD8E9]/15 font-mono text-[10px] text-[#6EA2B3]">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Maximize2 className="w-3 h-3 text-[#E29B4A]" />
              Slab Thickness
            </span>
            <span className="text-[#BDD8E9] font-medium">30mm Solid Cut</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-3 h-3 text-[#E29B4A]" />
              Acoustic Rating
            </span>
            <span className="text-[#BDD8E9] font-medium">Rw 52 dB</span>
          </div>
        </div>

        {/* Bottom Coordinates */}
        <div className="mt-4 pt-3 border-t border-[#BDD8E9]/10 flex justify-between items-center font-mono text-[8px] tracking-widest text-[#4E8EA2]">
          <span>ATELIER SPEC // MMXXVI</span>
          <span>TIVOLI QUARRY 04</span>
        </div>
      </div>
    </div>
  );
}
