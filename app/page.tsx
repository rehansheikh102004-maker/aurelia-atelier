"use client";

import React, { useState, useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import CanvasScroller from "@/components/CanvasScroller";
import { CanvasActOverlays } from "@/components/CanvasActOverlays";
import { LuxuryNavMenu } from "@/components/LuxuryNavMenu";
import { AudioEngine } from "@/components/AudioEngine";
import { WatchmakerLoupe } from "@/components/CursorLoupe";

import ArchitecturalDossier from "@/components/ArchitecturalDossier";
import { AtelierMonographDossier } from "@/components/AtelierMonographDossier";
import { AtelierDisciplines } from "@/components/AtelierDisciplines";
import DraggableCardDemo from "@/components/DraggableCardDemo";
import FounderManifesto from "@/components/FounderManifesto";
import FlightCorridorShowcase from "@/components/FlightCorridorShowcase";
import { AtelierFooter } from "@/components/AtelierFooter";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AureliaMasterPage() {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
  const [activeAct, setActiveAct] = useState<number>(1);
  const [loupeActive, setLoupeActive] = useState<boolean>(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.85,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.15,
      touchMultiplier: 1.6,
    });

    lenis.on("scroll", ScrollTrigger.update);
    const tickerUpdate = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerUpdate);
    gsap.ticker.lagSmoothing(500, 33);

    setLenisInstance(lenis);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickerUpdate);
    };
  }, []);

  useEffect(() => {
    let lastAct = 1;
    let lastLoupe = false;

    const trigger = ScrollTrigger.create({
      trigger: "#scrolly-canvas-track",
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const p = self.progress;
        let act = 1;
        if (p >= 0.8) act = 5;
        else if (p >= 0.6) act = 4;
        else if (p >= 0.4) act = 3;
        else if (p >= 0.2) act = 2;

        const loupe = act === 3;

        if (act !== lastAct) {
          lastAct = act;
          setActiveAct(act);
        }
        if (loupe !== lastLoupe) {
          lastLoupe = loupe;
          setLoupeActive(loupe);
        }
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <main className="relative min-h-screen bg-[#001D39] text-[#BDD8E9]">
      {/* 2% Ultra-Light Tactile Film Grain (Hardware-friendly, zero mix-blend lag) */}
      <div
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <LuxuryNavMenu lenis={lenisInstance} />
      <AudioEngine />
      <WatchmakerLoupe active={loupeActive} />

      {/* Persistent Telemetry HUD */}
      <div className="pointer-events-none fixed bottom-6 left-6 sm:left-8 z-40 hidden md:flex items-center gap-4 font-mono text-[10px] tracking-[0.25em] text-[#6EA2B3] uppercase bg-[#001224]/80 backdrop-blur-md px-4 py-2 rounded-full border border-[#BDD8E9]/15 shadow-lg">
        <span className="h-1.5 w-1.5 rounded-full bg-[#E29B4A] animate-pulse" />
        <span>ACT 0{activeAct} // 05</span>
        <span className="text-[#BDD8E9]/30">|</span>
        <span>LAT: 25.1972° N, LON: 55.2744° E</span>
        <span className="text-[#BDD8E9]/30">|</span>
        <span id="hud-progress-pct" className="text-[#E29B4A]">0%</span>
      </div>

      {/* STAGE 1: SCRUBBED CANVAS TRACK (380vh - Fast, Responsive, Ultra-Smooth) */}
      <section id="scrolly-canvas-track" className="relative h-[380vh] w-full">
        <CanvasScroller onActChange={setActiveAct} />
        <CanvasActOverlays activeAct={activeAct} lenis={lenisInstance} />
      </section>

      {/* STAGE 2: THE ARCHITECTURAL DOSSIER (3D BLUEPRINT TILT) */}
      <ArchitecturalDossier />

      {/* THE MASTER MONOGRAPH: PURPOSE, MISSION & EMBEDDED CINEMA REEL (A TO Z) */}
      <AtelierMonographDossier />

      {/* THE FOUR DISCIPLINES ECOSYSTEM (WHAT IS AURELIA) */}
      <AtelierDisciplines />

      {/* STAGE 3: THE MATERIALITY DESK (PHYSICS DRAG SWATCHES) */}
      <DraggableCardDemo />

      {/* STAGE 4: THE FOUNDER MANIFESTO (12-COL EDITORIAL + LIDAR) */}
      <FounderManifesto />

      {/* STAGE 5: TACTICAL FLIGHT OPERATIONS RADAR (3D GLOBE) */}
      <FlightCorridorShowcase />

      {/* STAGE 6: PRIVATE CONCIERGE & MONOGRAM FOOTER */}
      <AtelierFooter />
    </main>
  );
}
