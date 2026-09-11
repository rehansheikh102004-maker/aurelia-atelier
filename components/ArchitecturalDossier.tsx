"use client";

import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

export default function ArchitecturalDossier() {
  return (
    <section id="stage-dossier" className="relative bg-[#001D39] py-16 overflow-hidden border-t border-[#49769F]/20">
      <ContainerScroll
        titleComponent={
          <div className="flex flex-col items-center mb-8">
            <span className="font-mono text-[10px] tracking-[0.35em] text-[#E29B4A] uppercase mb-3">
              TECHNICAL DOSSIER // STAGE 02
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl font-light text-[#BDD8E9] tracking-tight">
              Monolithic Blueprints
            </h2>
            <p className="mt-2 font-sans text-xs text-[#6EA2B3] max-w-md text-center">
              Parametric calculations and spatial tolerances for the high-altitude residential towers.
            </p>
          </div>
        }
      >
        <div className="relative h-full w-full bg-[#001224] rounded-2xl overflow-hidden p-6 sm:p-10 border border-[#BDD8E9]/15 flex flex-col justify-between">
          {/* Blueprint Grid Overlay */}
          <div
            className="absolute inset-0 opacity-[0.07] pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(#BDD8E9 1px, transparent 1px), linear-gradient(90deg, #BDD8E9 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative z-10 flex justify-between items-start font-mono text-[10px] text-[#6EA2B3] uppercase tracking-widest border-b border-[#BDD8E9]/15 pb-4">
            <div>
              <span className="text-[#E29B4A] block">CAD: ELEVATION 412M</span>
              <span>SCALE: 1:250 METRIC</span>
            </div>
            <div className="text-right">
              <span>WIND SHEAR RATING: 240 KM/H</span>
              <span className="block text-[#BDD8E9]">STATUS: APPROVED</span>
            </div>
          </div>

          <div className="relative z-10 my-auto grid grid-cols-1 md:grid-cols-3 gap-8 py-8 text-left">
            <div className="border-l border-[#E29B4A]/40 pl-4">
              <span className="font-mono text-[9px] text-[#4E8EA2] uppercase">01 / Structural Core</span>
              <h4 className="font-serif text-2xl font-light text-[#BDD8E9] mt-1">Damped Tuned Mass</h4>
              <p className="font-sans text-xs text-[#6EA2B3] mt-2">
                450-ton kinetic sphere balancing harmonic wind oscillations at penthouse summit.
              </p>
            </div>
            <div className="border-l border-[#E29B4A]/40 pl-4">
              <span className="font-mono text-[9px] text-[#4E8EA2] uppercase">02 / Facade Glazing</span>
              <h4 className="font-serif text-2xl font-light text-[#BDD8E9] mt-1">Triple Low-E Acoustic</h4>
              <p className="font-sans text-xs text-[#6EA2B3] mt-2">
                Argon-injected laminated panels achieving complete acoustic isolation from city decibels.
              </p>
            </div>
            <div className="border-l border-[#E29B4A]/40 pl-4">
              <span className="font-mono text-[9px] text-[#4E8EA2] uppercase">03 / Materiality</span>
              <h4 className="font-serif text-2xl font-light text-[#BDD8E9] mt-1">Tuscan Travertine</h4>
              <p className="font-sans text-xs text-[#6EA2B3] mt-2">
                Vein-cut monolithic stone surfaces precision-stabilized with matte transparent resin.
              </p>
            </div>
          </div>

          <div className="relative z-10 flex justify-between items-center font-mono text-[9px] text-[#4E8EA2] uppercase pt-4 border-t border-[#BDD8E9]/15">
            <span>AURELIA ENGINEERING ARCHIVE</span>
            <span className="text-[#E29B4A]">[PROPRIETARY // STRICTLY CONFIDENTIAL]</span>
          </div>
        </div>
      </ContainerScroll>
    </section>
  );
}
