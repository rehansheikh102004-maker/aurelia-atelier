"use client";

import React from "react";
import { PixelatedCanvas } from "@/components/ui/pixelated-canvas";
import { Fingerprint, Terminal, Award, Sparkles } from "lucide-react";

export default function PixelatedCanvasDemo() {
  return (
    <section id="stage-founder" className="relative bg-[#F7F5F0] py-28 px-6 md:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Editorial Philosophy & Biography */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.35em] text-[#A37B48] mb-4">
            <Fingerprint className="w-3.5 h-3.5" />
            <span>STAGE 04 // FOUNDER & DIRECTION</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-[#171614] leading-[1.1]">
            Ray <br />
            <span className="italic text-[#A37B48]">Founder & Chief Architect</span>
          </h2>

          <p className="mt-6 font-sans text-sm sm:text-base text-[#736F68] leading-relaxed max-w-xl">
            &ldquo;We reject the ephemeral. True luxury does not shout; it calibrates space, silence, and geometry into an enduring state of grace. Every cantilevered terrace and hand-beveled tourbillon bridge shares the exact same mathematical soul.&rdquo;
          </p>

          {/* Credentials Matrix */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-[#B4A896]/30">
            <div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#736F68] block">
                PRACTICE
              </span>
              <span className="font-serif text-xl font-light text-[#171614] mt-1 block">
                Aurelia Atelier
              </span>
            </div>
            <div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#736F68] block">
                METHODOLOGY
              </span>
              <span className="font-serif text-xl font-light text-[#171614] mt-1 block">
                LiDAR Precision
              </span>
            </div>
            <div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#736F68] block">
                LOCATION
              </span>
              <span className="font-serif text-xl font-light text-[#171614] mt-1 block">
                Geneva & Dubai
              </span>
            </div>
          </div>

          {/* Interactive Hint */}
          <div className="mt-8 inline-flex items-center gap-2 bg-[#F0ECE1] px-4 py-2 rounded-full border border-[#B4A896]/40 font-mono text-[9px] uppercase tracking-[0.2em] text-[#736F68] w-fit">
            <Terminal className="w-3 h-3 text-[#A37B48]" />
            <span>HOVER OVER LIDAR MATRIX TO SCATTER PARTICLES</span>
          </div>
        </div>

        {/* Right Column: Interactive LiDAR Point Cloud Canvas */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative p-3 rounded-3xl border border-[#B4A896]/40 bg-white/50 backdrop-blur-xl shadow-luxury">
            <div className="overflow-hidden rounded-2xl bg-[#171614]">
              <PixelatedCanvas
                src="/founder.png"
                cellSize={5}
                shape="circle"
                tintColor="#A37B48"
              />
            </div>

            {/* Corner Badges */}
            <div className="absolute top-6 left-6 font-mono text-[8px] tracking-[0.25em] text-[#F7F5F0] bg-[#171614]/80 px-3 py-1 rounded-full uppercase border border-white/20 backdrop-blur-sm">
              LIDAR SCAN // 24,000 PTS
            </div>
            <div className="absolute bottom-6 right-6 font-mono text-[8px] tracking-[0.25em] text-[#A37B48] bg-[#171614]/80 px-3 py-1 rounded-full uppercase border border-[#A37B48]/40 backdrop-blur-sm">
              RAY // CHIEF ARCHITECT
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
