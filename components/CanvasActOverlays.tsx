"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";
import { LightSpotlightCard } from "@/components/SpotlightCard";
import Luxury3DCard from "@/components/Luxury3DCard";
import {
  Compass,
  Layers,
  ShieldCheck,
  Maximize2,
  Activity,
  Wind,
  Gauge,
  Anchor,
  Plane,
  Cpu,
  Clock,
  Crosshair,
  Sparkles,
  ChevronDown,
  CircleDot,
  Radio,
  ArrowRight,
  Sliders,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface CanvasActOverlaysProps {
  activeAct: number;
  lenis?: any;
}

const ACTS = [
  { id: 1, label: "ZENITH", title: "Metropolis Spire", progress: 0.05, elev: "412M" },
  { id: 2, label: "RESIDENCES", title: "Oceanic Panorama", progress: 0.25, elev: "280M" },
  { id: 3, label: "HOROLOGY", title: "Skeleton Tourbillon", progress: 0.45, elev: "12M" },
  { id: 4, label: "MARITIME", title: "Riviera 88M Corvette", progress: 0.65, elev: "0M" },
  { id: 5, label: "STRATOSPHERE", title: "Hypersonic Corridor", progress: 0.85, elev: "13,700M" },
];

export function CanvasActOverlays({ activeAct, lenis }: CanvasActOverlaysProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // GSAP Viewport Pinning & Exit Transition Hand-off to Stage 2
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const frameEl = document.getElementById("overlay-live-frame");
    const elevEl = document.getElementById("overlay-live-elev");
    const pressEl = document.getElementById("overlay-live-press");
    const aziEl = document.getElementById("overlay-live-azi");

    // Direct synchronization with #scrolly-canvas-track
    const exitTrigger = ScrollTrigger.create({
      trigger: "#scrolly-canvas-track",
      start: "top top",
      end: "bottom bottom",
      onEnter: () => gsap.to(el, { autoAlpha: 1, duration: 0.2 }),
      onLeave: () => gsap.to(el, { autoAlpha: 0, duration: 0.25 }),
      onEnterBack: () => gsap.to(el, { autoAlpha: 0.25, duration: 0.25 }),
      onLeaveBack: () => gsap.to(el, { autoAlpha: 1, duration: 0.2 }),
      onUpdate: (self) => {
        const p = self.progress;
        const frame = Math.min(Math.max(Math.round(p * 449), 0), 449);

        // Zero-cost DOM direct telemetry updates (ZERO React re-renders!)
        if (frameEl) {
          frameEl.textContent = `FRAME: ${String(frame).padStart(3, "0")} / 450`;
        }

        let elevStr = "412M";
        let aziStr = "342° NNW";
        let pressStr = "968 hPa";

        if (p < 0.2) {
          const elev = Math.round(412 - (p / 0.2) * 50);
          elevStr = `${elev}M`;
          aziStr = "342° NNW";
          pressStr = "968 hPa";
        } else if (p < 0.4) {
          const elev = Math.round(362 - ((p - 0.2) / 0.2) * 180);
          elevStr = `${elev}M`;
          aziStr = "018° NNE";
          pressStr = "992 hPa";
        } else if (p < 0.6) {
          const elev = Math.round(182 - ((p - 0.4) / 0.2) * 170);
          elevStr = `${elev}M`;
          aziStr = "145° SE";
          pressStr = "1013 hPa";
        } else if (p < 0.8) {
          elevStr = "0.0M SEA LEVEL";
          aziStr = "220° SW";
          pressStr = "1014 hPa";
        } else {
          const elev = Math.round(1200 + ((p - 0.8) / 0.2) * 12500);
          elevStr = `${elev.toLocaleString()}M`;
          aziStr = "004° N";
          pressStr = "148 hPa";
        }

        if (elevEl) elevEl.textContent = `ELEV: ${elevStr}`;
        if (pressEl) pressEl.textContent = `PRESS: ${pressStr}`;
        if (aziEl) aziEl.textContent = `AZI: ${aziStr}`;
      },
    });

    return () => {
      exitTrigger.kill();
    };
  }, []);

  // Jump to specific act on click
  const handleJumpToAct = (targetProgress: number) => {
    const track = document.getElementById("scrolly-canvas-track");
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const trackTop = rect.top + scrollTop;
    const trackHeight = track.scrollHeight - window.innerHeight;
    const targetY = trackTop + trackHeight * targetProgress;

    if (lenis) {
      lenis.scrollTo(targetY, { duration: 1.2, smooth: true });
    } else {
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-20 pointer-events-none flex flex-col justify-between p-4 sm:p-8 md:p-12 transition-opacity duration-300"
    >
      {/* ========================================================= */}
      {/* CORNER BLUEPRINT RETICLES (Architectural Precision Accents) */}
      {/* ========================================================= */}
      <div className="absolute top-4 left-4 font-mono text-[8px] tracking-[0.25em] text-[#BDD8E9]/30 uppercase flex items-center gap-1.5">
        <Crosshair className="w-3 h-3 text-[#E29B4A]/60" />
        <span>AURELIA // CADENCE MMXXVI</span>
      </div>

      <div className="absolute top-4 right-20 sm:right-28 font-mono text-[8px] tracking-[0.25em] text-[#BDD8E9]/30 uppercase hidden sm:flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-[#E29B4A] animate-ping" />
        <span>OPTICAL SAMPLING: 60FPS</span>
      </div>

      <div className="absolute bottom-4 right-4 font-mono text-[8px] tracking-[0.25em] text-[#BDD8E9]/30 uppercase hidden md:flex items-center gap-2">
        <span id="overlay-live-press">PRESS: 968 hPa</span>
        <span>//</span>
        <span id="overlay-live-azi">AZI: 342° NNW</span>
      </div>

      {/* ========================================================= */}
      {/* TOP ATELIER BAR (Act-Specific Engineering Header)          */}
      {/* ========================================================= */}
      <div className="w-full flex items-start justify-between pointer-events-auto mt-12 sm:mt-14">
        {/* Dynamic Act Header Badge */}
        <div className="glass-marine px-4 py-2 rounded-full border border-[#BDD8E9]/15 flex items-center gap-3 backdrop-blur-md shadow-lg">
          <div className="flex items-center gap-2 font-mono text-[9px] sm:text-[10px] tracking-[0.25em] text-[#E29B4A] uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E29B4A] animate-pulse" />
            <span>ACT 0{activeAct} // 05</span>
          </div>
          <span className="text-[#BDD8E9]/20">|</span>
          <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] text-[#BDD8E9] uppercase">
            {activeAct === 1 && "THE ZENITH ARCHIVE — METROPOLIS CROWN"}
            {activeAct === 2 && "THE RESIDENCES — HABITAT MATRIX"}
            {activeAct === 3 && "HAUTE HORLOGERIE — CALIBER AU-01"}
            {activeAct === 4 && "HYDRODYNAMICS — RIVIERA 88M DISPLACEMENT"}
            {activeAct === 5 && "STRATOSPHERE — HYPERSONIC CORRIDOR"}
          </span>
          <span className="text-[#BDD8E9]/20 hidden sm:inline">|</span>
          <span id="overlay-live-elev" className="font-mono text-[9px] sm:text-[10px] text-[#6EA2B3] tracking-widest hidden sm:inline">
            ELEV: 412M
          </span>
        </div>

        {/* Live Frame Counter Readout */}
        <div className="hidden lg:flex items-center gap-3 font-mono text-[9px] text-[#6EA2B3] tracking-widest bg-[#001224]/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#BDD8E9]/10">
          <Activity className="w-3 h-3 text-[#E29B4A]" />
          <span id="overlay-live-frame">FRAME: 000 / 450</span>
        </div>
      </div>

      {/* ========================================================= */}
      {/* RIGHT-SIDE VERTICAL ACT SCRUBBER RAIL                     */}
      {/* ========================================================= */}
      <div className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-30 pointer-events-auto hidden md:flex flex-col items-end gap-3.5">
        <div className="font-mono text-[8px] uppercase tracking-[0.3em] text-[#E29B4A]/80 mb-1 text-right">
          ATELIER CODEX
        </div>
        <div className="flex flex-col gap-2.5 p-2 rounded-2xl bg-[#001224]/75 backdrop-blur-lg border border-[#BDD8E9]/15 shadow-xl">
          {ACTS.map((act) => {
            const isActive = activeAct === act.id;
            return (
              <button
                key={act.id}
                onClick={() => handleJumpToAct(act.progress)}
                className={`group flex items-center justify-end gap-2.5 py-1.5 px-2 rounded-lg transition-all duration-300 text-right ${
                  isActive
                    ? "bg-[#E29B4A]/15 border border-[#E29B4A]/40"
                    : "hover:bg-white/5 border border-transparent"
                }`}
                title={`Jump to Act ${act.id}: ${act.title}`}
              >
                <div className="flex flex-col items-end">
                  <span
                    className={`font-mono text-[9px] tracking-widest uppercase transition-colors ${
                      isActive ? "text-[#E29B4A] font-semibold" : "text-[#6EA2B3] group-hover:text-[#BDD8E9]"
                    }`}
                  >
                    0{act.id} {act.label}
                  </span>
                  <span className="font-sans text-[8px] text-[#4E8EA2] hidden xl:inline">
                    {act.elev}
                  </span>
                </div>
                <div
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    isActive
                      ? "bg-[#E29B4A] shadow-[0_0_8px_#E29B4A] scale-125"
                      : "bg-[#49769F]/40 group-hover:bg-[#BDD8E9]"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================= */}
      {/* ACT 1: THE ZENITH (Compact Lower-Third HUD)               */}
      {/* ========================================================= */}
      {activeAct === 1 && (
        <div className="mt-auto pointer-events-auto max-w-xl w-full transition-all duration-500 animate-in fade-in slide-in-from-bottom-4">
          <div className="bg-[#001224]/55 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-[#BDD8E9]/15 shadow-2xl">
            <div className="flex items-center gap-2 font-mono text-[9px] tracking-[0.25em] text-[#E29B4A] uppercase mb-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E29B4A] animate-ping" />
              <span>ARCHITECTURAL MONOGRAM // COMMISSION NO. 09</span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl font-light text-[#BDD8E9] leading-tight tracking-tight">
              Living spaces designed for{" "}
              <span className="text-[#E29B4A] italic">Sanctuary</span> above the metropolis.
            </h1>

            <p className="mt-1.5 font-sans text-xs text-[#6EA2B3] leading-relaxed line-clamp-2">
              Suspended over four hundred meters above the coastal embankment with cantilevered structural gardens.
            </p>

            <div className="mt-3 pt-2.5 border-t border-[#BDD8E9]/10 flex flex-wrap items-center gap-3 font-mono text-[9px] text-[#6EA2B3] uppercase tracking-wider">
              <span className="text-[#BDD8E9]">PINNACLE: 412.8M</span>
              <span>•</span>
              <span>88 LEVELS</span>
              <span>•</span>
              <span>99.4% OPTICAL</span>
              <span>•</span>
              <span className="text-[#E29B4A]">WIND DAMPENING: 99.8%</span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* ACT 2: THE RESIDENCES (Compact Lower-Third HUD)           */}
      {/* ========================================================= */}
      {activeAct === 2 && (
        <div className="mt-auto pointer-events-auto max-w-xl w-full transition-all duration-500 animate-in fade-in slide-in-from-bottom-4">
          <div className="bg-[#001224]/55 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-[#BDD8E9]/15 shadow-2xl">
            <div className="flex items-center gap-2 font-mono text-[9px] tracking-[0.25em] text-[#E29B4A] uppercase mb-1.5">
              <Layers className="w-3 h-3 text-[#E29B4A]" />
              <span>ACT II // HABITAT SPECIFICATION MATRIX</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#BDD8E9] leading-tight">
              Travertine &amp; <span className="text-[#E29B4A] italic">Panoramic Horizon</span>
            </h2>

            <p className="mt-1.5 font-sans text-xs text-[#6EA2B3] leading-relaxed line-clamp-2">
              Continuous floor-to-ceiling acoustic glass framing unhindered golden-hour coastal elevations.
            </p>

            <div className="mt-3 pt-2.5 border-t border-[#BDD8E9]/10 flex flex-wrap items-center gap-3 font-mono text-[9px] text-[#6EA2B3] uppercase tracking-wider">
              <span className="text-[#BDD8E9]">CEILING: 3.80M</span>
              <span>•</span>
              <span>COLUMN-FREE 14.5M</span>
              <span>•</span>
              <span>HEPA-14</span>
              <span>•</span>
              <span className="text-[#E29B4A]">SOUND &lt; 22 dBA</span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* ACT 3: HAUTE HORLOGERIE (Compact Lower-Third HUD)         */}
      {/* ========================================================= */}
      {activeAct === 3 && (
        <div className="mt-auto pointer-events-auto max-w-xl w-full transition-all duration-500 animate-in fade-in slide-in-from-bottom-4">
          <div className="bg-[#001224]/55 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-[#BDD8E9]/15 shadow-2xl">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2 font-mono text-[9px] tracking-[0.25em] text-[#E29B4A] uppercase">
                <Clock className="w-3 h-3 text-[#E29B4A]" />
                <span>ACT III // CALIBER AU-01 SPEC</span>
              </div>
              <span className="font-mono text-[8px] text-[#4E8EA2] uppercase tracking-wider">
                COSC+ MASTER
              </span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#BDD8E9] leading-tight">
              The Skeleton <span className="text-[#E29B4A] italic">Tourbillon</span>
            </h2>

            <p className="mt-1.5 font-sans text-xs text-[#6EA2B3] leading-relaxed line-clamp-2">
              60-second flying carriage sculpted from grade-5 titanium weighing 0.28 grams with sapphire reticle.
            </p>

            <div className="mt-3 pt-2.5 border-t border-[#BDD8E9]/10 flex flex-wrap items-center justify-between gap-2 font-mono text-[9px] text-[#6EA2B3] uppercase tracking-wider">
              <div className="flex items-center gap-3">
                <span className="text-[#BDD8E9]">28,800 VPH</span>
                <span>•</span>
                <span>72H RESERVE</span>
                <span>•</span>
                <span className="text-[#E29B4A]">+0.8 S/DAY</span>
              </div>
              <span className="text-[8px] text-[#4E8EA2] hidden sm:inline">
                HOVER CURSOR FOR 4X LOUPE
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* ACT 4: HYDRODYNAMICS (Compact Lower-Third HUD)            */}
      {/* ========================================================= */}
      {activeAct === 4 && (
        <div className="mt-auto pointer-events-auto max-w-xl w-full transition-all duration-500 animate-in fade-in slide-in-from-bottom-4">
          <div className="bg-[#001224]/55 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-[#BDD8E9]/15 shadow-2xl">
            <div className="flex items-center gap-2 font-mono text-[9px] tracking-[0.25em] text-[#E29B4A] uppercase mb-1.5">
              <Anchor className="w-3 h-3 text-[#E29B4A]" />
              <span>ACT IV // 88M HYBRID CORVETTE YACHT</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#BDD8E9] leading-tight">
              Riviera <span className="text-[#E29B4A] italic">Equilibrium</span>
            </h2>

            <p className="mt-1.5 font-sans text-xs text-[#6EA2B3] leading-relaxed line-clamp-2">
              Carbon-composite displacement envelope with active zero-speed gyro stabilizers and silent electric cruise.
            </p>

            <div className="mt-3 pt-2.5 border-t border-[#BDD8E9]/10 flex flex-wrap items-center gap-3 font-mono text-[9px] text-[#6EA2B3] uppercase tracking-wider">
              <span className="text-[#BDD8E9]">LOA: 88.4M</span>
              <span>•</span>
              <span>32.4 KNOTS</span>
              <span>•</span>
              <span>SILENCE &lt; 38 dBA</span>
              <span>•</span>
              <span className="text-[#E29B4A]">5,400 NM RANGE</span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* ACT 5: STRATOSPHERE CORRIDOR (Compact Sleek HUD)          */}
      {/* ========================================================= */}
      {activeAct === 5 && (
        <div className="mt-auto pointer-events-auto max-w-xl w-full transition-all duration-500 animate-in fade-in slide-in-from-bottom-4">
          <div className="bg-[#001224]/55 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-[#E29B4A]/30 shadow-2xl">
            <div className="flex items-center gap-2 font-mono text-[9px] tracking-[0.25em] text-[#E29B4A] uppercase mb-1.5">
              <Plane className="w-3 h-3 text-[#E29B4A]" />
              <span>ACT V // SUB-ORBITAL FLIGHT CORRIDOR — FL450</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#E29B4A] animate-ping" />
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#BDD8E9] leading-tight">
              Beyond the <span className="text-[#E29B4A] italic">Cloudline</span>
            </h2>

            <p className="mt-1.5 font-sans text-xs text-[#6EA2B3] leading-relaxed line-clamp-2">
              Cruising at 45,000 feet above atmospheric friction connecting Dubai, Geneva, Tokyo, and New York.
            </p>

            <div className="mt-3 pt-2.5 border-t border-[#BDD8E9]/10 flex flex-wrap items-center gap-3 font-mono text-[9px] text-[#6EA2B3] uppercase tracking-wider">
              <span className="text-[#BDD8E9]">SPEED: MACH 0.925</span>
              <span>•</span>
              <span>CEILING: FL450</span>
              <span>•</span>
              <span>RANGE: 7,500 NM</span>
              <span>•</span>
              <span className="text-[#E29B4A]">CABIN: 2,900 FT</span>
            </div>

            <div className="mt-3 pt-2.5 flex items-center justify-between gap-3">
              <button
                onClick={() => {
                  const el =
                    document.getElementById("stage-dossier") ||
                    document.getElementById("architectural-dossier");
                  if (el) {
                    if (lenis) lenis.scrollTo(el, { duration: 1.5 });
                    else el.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="px-4 py-1.5 rounded-full bg-[#E29B4A] hover:bg-[#F5A642] text-[#001224] font-mono text-[9px] uppercase tracking-[0.2em] font-semibold flex items-center gap-1.5 transition-all shadow-[0_0_20px_rgba(226,155,74,0.35)]"
              >
                <span>ENTER ARCHITECTURAL CODEX</span>
                <ArrowRight className="w-3 h-3" />
              </button>
              <span className="font-mono text-[8px] text-[#6EA2B3] tracking-widest uppercase hidden sm:inline">
                SCROLL TO DESCEND ↓
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* BOTTOM BUFFER / COMPASS COORDINATE STRIP                  */}
      {/* ========================================================= */}
      <div className="h-4" />
    </div>
  );
}
