"use client";

import React, { useState } from "react";
import { PixelatedCanvas } from "@/components/ui/pixelated-canvas";
import { Shield, Sparkles, Sliders, FileText } from "lucide-react";

export default function FounderManifesto() {
  const [activePhilosophyTab, setActivePhilosophyTab] = useState<"vision" | "protocol" | "provenance">("vision");

  return (
    <section
      id="stage-founder"
      className="relative min-h-screen w-full bg-[#001224] py-28 px-6 sm:px-12 flex items-center justify-center overflow-hidden border-t border-[#49769F]/20"
    >
      {/* Subtle Background Watermark */}
      <span className="pointer-events-none absolute right-[-4%] top-1/2 -translate-y-1/2 font-serif text-[18vw] font-light text-[#BDD8E9]/[0.02] select-none">
        MASTERY
      </span>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Column: Bold Manifesto Statement & Interactive Philosophy Tabs (7 Cols) */}
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#49769F]/30 bg-[#0A4174]/20 font-mono text-[10px] uppercase tracking-[0.25em] text-[#E29B4A] mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E29B4A] animate-pulse" />
            Atelier Direction // Ray Monograph MMXXVI
          </div>

          <blockquote className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-[#BDD8E9] leading-[1.08] tracking-tight">
            “We do not build for the skyline. We redefine the physical{" "}
            <span className="italic text-[#E29B4A]">horizon itself</span>.”
          </blockquote>

          {/* Philosophy Subtabs */}
          <div className="mt-8 flex gap-3 border-b border-[#49769F]/20 pb-3 font-mono text-[10px] uppercase tracking-wider">
            <button
              onClick={() => setActivePhilosophyTab("vision")}
              className={`pb-1 transition-colors flex items-center gap-1.5 ${
                activePhilosophyTab === "vision"
                  ? "text-[#E29B4A] border-b-2 border-[#E29B4A] font-bold"
                  : "text-[#6EA2B3] hover:text-[#BDD8E9]"
              }`}
            >
              <Sparkles className="w-3 h-3" />
              01 // The Horizon Vision
            </button>
            <button
              onClick={() => setActivePhilosophyTab("protocol")}
              className={`pb-1 transition-colors flex items-center gap-1.5 ${
                activePhilosophyTab === "protocol"
                  ? "text-[#E29B4A] border-b-2 border-[#E29B4A] font-bold"
                  : "text-[#6EA2B3] hover:text-[#BDD8E9]"
              }`}
            >
              <Shield className="w-3 h-3" />
              02 // Commission Protocol
            </button>
            <button
              onClick={() => setActivePhilosophyTab("provenance")}
              className={`pb-1 transition-colors flex items-center gap-1.5 ${
                activePhilosophyTab === "provenance"
                  ? "text-[#E29B4A] border-b-2 border-[#E29B4A] font-bold"
                  : "text-[#6EA2B3] hover:text-[#BDD8E9]"
              }`}
            >
              <Sliders className="w-3 h-3" />
              03 // Material Provenance
            </button>
          </div>

          {/* Dynamic Tab Body */}
          <div className="mt-6 min-h-[140px] font-sans text-sm text-[#6EA2B3] leading-relaxed space-y-3">
            {activePhilosophyTab === "vision" && (
              <>
                <p>
                  Under the architectural direction of <strong className="text-[#BDD8E9]">Ray</strong>, Aurelia operates as an independent private design syndicate. We synthesize high computational parametric structural engineering with centuries-old European craftsmanship.
                </p>
                <p className="text-xs text-[#BDD8E9]/80">
                  Every structure is treated as an acoustic observatory—a protected microclimate suspended 412 meters above urban friction, offering absolute silence through triple-laminated Low-E acoustic envelopes.
                </p>
              </>
            )}

            {activePhilosophyTab === "protocol" && (
              <>
                <p>
                  Commissions at Aurelia are strictly private and invitation-only. The atelier restricts its pipeline to a maximum of <strong className="text-[#E29B4A]">five sky residences</strong> and <strong className="text-[#E29B4A]">twelve horological pieces</strong> globally per decade.
                </p>
                <p className="text-xs text-[#BDD8E9]/80">
                  Every commission involves direct one-on-one collaboration with Ray and a dedicated team of aerospace and structural engineers under legally binding non-disclosure covenants.
                </p>
              </>
            )}

            {activePhilosophyTab === "provenance" && (
              <>
                <p>
                  We reject temporary composite synthetics. Our surfaces are sourced from historical Roman quarries in Tivoli, Italy—vein-cut Navona Travertine and Calacatta Oro slabs stabilized with invisible matte transparent structural resins.
                </p>
                <p className="text-xs text-[#BDD8E9]/80">
                  From 450-ton tuned-mass kinetic spheres balancing penthouse summits to 28,800 VPH ruthenium balance bridges, precision is maintained to a fraction of a millimeter.
                </p>
              </>
            )}
          </div>

          {/* Technical Monograph Metadata */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#49769F]/20 font-mono text-[10px]">
            <div>
              <span className="text-[#4E8EA2] block uppercase tracking-widest text-[9px]">ATELIER LEAD</span>
              <span className="text-[#BDD8E9] text-xs mt-1 block font-serif">Ray Atelier</span>
            </div>
            <div>
              <span className="text-[#4E8EA2] block uppercase tracking-widest text-[9px]">CORE DISCIPLINE</span>
              <span className="text-[#BDD8E9] text-xs mt-1 block">Parametric Form</span>
            </div>
            <div>
              <span className="text-[#4E8EA2] block uppercase tracking-widest text-[9px]">COMMISSIONS</span>
              <span className="text-[#E29B4A] text-xs mt-1 block">Private Access</span>
            </div>
            <div>
              <span className="text-[#4E8EA2] block uppercase tracking-widest text-[9px]">ACTIVE HUBS</span>
              <span className="text-[#BDD8E9] text-xs mt-1 block">DXB • GVA • MCM</span>
            </div>
          </div>
        </div>

        {/* Right Column: 16:9 Portrait LiDAR Matrix (5 Cols) */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="relative rounded-2xl p-4 glass-marine border border-[#BDD8E9]/15 shadow-2xl">
            <PixelatedCanvas
              src="/founder.png"
              width={420}
              height={540}
              cellSize={4}
              dotScale={0.72}
              shape="circle"
              backgroundColor="#001224"
              dropoutStrength={0.2}
              interactive={true}
              distortionStrength={2.8}
              distortionRadius={85}
              distortionMode="swirl"
              tintColor="#BDD8E9"
              tintStrength={0.35}
              className="rounded-xl"
            />
            <div className="mt-3 flex justify-between items-center font-mono text-[9px] text-[#4E8EA2] uppercase tracking-widest px-2">
              <span>RAY // ATELIER ARCHITECT</span>
              <span className="text-[#E29B4A]">[INTERACTIVE LiDAR SCAN]</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
