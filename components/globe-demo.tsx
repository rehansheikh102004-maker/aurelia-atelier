"use client";

import React from "react";
import { WorldGlobe } from "@/components/ui/globe";
import { Globe, Plane, Clock, ShieldCheck } from "lucide-react";

export default function FlightCorridorShowcase() {
  return (
    <section id="stage-globe" className="relative bg-[#F0ECE1] py-28 px-6 md:px-16 overflow-hidden border-t border-[#B4A896]/30">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.35em] text-[#A37B48] mb-3">
            <Globe className="w-3.5 h-3.5" />
            <span>STAGE 05 // TRANSCONTINENTAL CORRIDORS</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-[#171614] leading-tight">
            Global Syndicates <br />
            <span className="italic text-[#A37B48]">Flight Trajectories</span>
          </h2>

          <p className="mt-4 font-sans text-xs sm:text-sm text-[#736F68] leading-relaxed">
            Synchronized connectivity uniting Aurelia&apos;s private helipads, deep-water Mediterranean berths, and alpine horology vaults across six global capitals.
          </p>
        </div>

        {/* 3D WebGL Globe Container */}
        <div className="relative rounded-3xl bg-[#F7F5F0]/70 border border-[#B4A896]/40 backdrop-blur-xl p-4 md:p-8 shadow-luxury">
          <WorldGlobe />

          {/* Telemetry Floating Overlays */}
          <div className="absolute top-8 left-8 hidden md:flex flex-col gap-3 font-mono text-[9px] uppercase tracking-widest text-[#736F68]">
            <div className="flex items-center gap-2 bg-white/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#B4A896]/30">
              <Plane className="w-3 h-3 text-[#A37B48]" />
              <span>NON-STOP G700 CORRIDOR: DXB ➔ GVA</span>
            </div>
            <div className="flex items-center gap-2 bg-white/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#B4A896]/30">
              <Clock className="w-3 h-3 text-[#A37B48]" />
              <span>FLIGHT TIME: 06H 12M // MACH 0.90</span>
            </div>
          </div>

          <div className="absolute top-8 right-8 hidden md:flex items-center gap-2 bg-white/70 backdrop-blur-md px-4 py-2 rounded-full border border-[#B4A896]/30 font-mono text-[9px] tracking-widest text-[#736F68]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#A37B48]" />
            <span>ENCRYPTED AVIONICS TELEMETRY</span>
          </div>
        </div>
      </div>
    </section>
  );
}
