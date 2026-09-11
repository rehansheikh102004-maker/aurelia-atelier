"use client";

import React, { useState } from "react";
import { Building2, Watch, Anchor, Plane, ArrowUpRight, ShieldCheck, Cpu, Compass } from "lucide-react";

interface Discipline {
  id: string;
  num: string;
  category: string;
  title: string;
  tagline: string;
  description: string;
  specs: { label: string; value: string }[];
  accent: string;
  image: string;
  details: string[];
}

const DISCIPLINES: Discipline[] = [
  {
    id: "architecture",
    num: "01",
    category: "HAUTE ARCHITECTURE",
    title: "Sky Sanctuaries & Zenith Towers",
    tagline: "High-Altitude Acoustic Living at 412M Elevation",
    description:
      "Aurelia conceives and engineers monolithic residential towers perched above metropolis cloudlines. Designed as acoustic sanctuaries, each residence incorporates 450-ton tuned-mass harmonic pendulum dampers to counterbalance wind shear, wrapped in triple-laminated Low-E acoustic argon glazing that drops city noise by 52 decibels.",
    specs: [
      { label: "Apex Elevation", value: "412M / 1,350 FT" },
      { label: "Acoustic Attenuation", value: "Rw 52 dB ISO" },
      { label: "Core Damper", value: "450-Ton Kinetic Sphere" },
      { label: "Primary Material", value: "Tuscan Navona Travertine" },
    ],
    accent: "#E29B4A",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop",
    details: [
      "Parametric aerodynamic facade geometry minimizing vortex shedding oscillations.",
      "Book-matched monolithic Italian stone slabs stabilized with clear matte structural resin.",
      "Integrated cantilevered private infinity sky-pools hovering 100 stories over the coastline.",
    ],
  },
  {
    id: "horology",
    num: "02",
    category: "HAUTE HORLOGERIE",
    title: "Caliber 9001 Skeleton Tourbillon",
    tagline: "Architecture in Miniature // 28,800 Vibrations Per Hour",
    description:
      "Aurelia’s horological department treats watchmaking as structural micro-architecture. Limiting production to only 12 timepieces per calendar year, the Caliber 9001 features hand-beveled ruthenium bridges, a variable-inertia Glucydur balance wheel, and an ultra-light titanium tourbillon cage ensuring chronometric stability across extreme G-forces.",
    specs: [
      { label: "Frequency", value: "4.0 Hz / 28,800 VPH" },
      { label: "Power Reserve", value: "72 Hours Twin-Barrel" },
      { label: "Escapement", value: "Silicon Hairspring" },
      { label: "Annual Output", value: "12 Pieces Globally" },
    ],
    accent: "#BDD8E9",
    image: "/assets/lookbook/watch.jpg",
    details: [
      "Geneva Seal (Poinçon de Genève) hand-chamfering across all 248 internal caliber components.",
      "Sapphire crystal box with multi-layer anti-reflective treatment deployed inside and out.",
      "Bespoke titanium bracelet engineered to mimic the tensile cable grid of the Zenith Towers.",
    ],
  },
  {
    id: "maritime",
    num: "03",
    category: "NAVAL DYNAMICS",
    title: "Riviera 88M Displacement Superyacht",
    tagline: "Hydrodynamic Equilibrium on Mediterranean Waters",
    description:
      "Bridging sky and sea, Aurelia’s naval studio designs ultra-low-drag composite displacement hulls tested in the Gulf of Genoa. Engineered with a proprietary axe-bow hydrofoil stabilization system, the Riviera 88M maintains 32-knot cruising stability while seamlessly incorporating private helicopter cantilever decks and submarine wet-docks.",
    specs: [
      { label: "Length Overall", value: "88.4M / 290 FT" },
      { label: "Cruise Velocity", value: "32 Knots Continuous" },
      { label: "Hull Composition", value: "T800 Carbon Matrix" },
      { label: "Home Berths", value: "Monaco & Portofino" },
    ],
    accent: "#7BBDE8",
    image: "/assets/lookbook/yacht.jpg",
    details: [
      "Hybrid electric-diesel propulsion achieving silent zero-emission anchoring in marine reserves.",
      "Transom beach club featuring underwater panoramic viewing lounge with reinforced acoustic acrylic.",
      "Seamless teak and honed basalt decks matching the materiality of Aurelia’s penthouses.",
    ],
  },
  {
    id: "aviation",
    num: "04",
    category: "STRATOSPHERIC TRANSIT",
    title: "Supersonic Horizon Syndicates",
    tagline: "Mach 0.88 Transcontinental Corridors Connecting Global Ateliers",
    description:
      "Aurelia operates private flight syndicates designed for uninterrupted intercontinental transit between our hubs in Dubai, Geneva, Tokyo, London, and Monaco. The aircraft interiors are designed as sky-suites, upholstered in untreated Tuscan saddle leather with custom-milled monolithic carbon dining consoles and pressurized cabin air cycles at 45,000 feet.",
    specs: [
      { label: "Cruise Velocity", value: "Mach 0.88 - 0.90" },
      { label: "Operating Ceiling", value: "45,000 FT / 13.7 KM" },
      { label: "Syndicate Hubs", value: "DXB • GVA • HND • MCM" },
      { label: "Access Protocol", value: "Encrypted Token Access" },
    ],
    accent: "#E29B4A",
    image: "/assets/lookbook/jet.jpg",
    details: [
      "Zero-gravity lie-flat berths engineered with variable density memory composites.",
      "Satellite-linked encrypted atelier conference suites with secure real-time architectural telemetry.",
      "Dedicated airstrip direct-to-penthouse private VIP transit dispatch.",
    ],
  },
];

export function AtelierDisciplines() {
  const [activeTab, setActiveTab] = useState<string>("architecture");
  const selected = DISCIPLINES.find((d) => d.id === activeTab) || DISCIPLINES[0];

  return (
    <section
      id="stage-disciplines"
      className="relative bg-[#001D39] py-28 px-6 sm:px-12 overflow-hidden border-t border-[#49769F]/20"
    >
      {/* Background Watermark */}
      <span className="pointer-events-none absolute left-[-2%] top-1/3 font-serif text-[16vw] font-light text-[#BDD8E9]/[0.02] select-none">
        DISCIPLINES
      </span>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.35em] text-[#E29B4A] mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E29B4A] animate-pulse" />
              THE ATELIER ECOSYSTEM // QUAD-DISCIPLINE MONOGRAPH
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl font-light text-[#BDD8E9] tracking-tight">
              What We Create
            </h2>
            <p className="mt-3 font-sans text-xs sm:text-sm text-[#6EA2B3] max-w-xl leading-relaxed">
              Aurelia is not a conventional studio. We operate as an integrated high-altitude atelier bridging civil engineering, micro-mechanics, naval dynamics, and supersonic aerodynamics.
            </p>
          </div>

          <div className="flex items-center gap-3 font-mono text-[10px] text-[#4E8EA2] uppercase tracking-widest bg-[#001224]/80 px-4 py-2 rounded-full border border-[#BDD8E9]/15 w-fit">
            <Compass className="w-3.5 h-3.5 text-[#E29B4A]" />
            <span>MMXXVI MONOGRAPH ARCHIVE</span>
          </div>
        </div>

        {/* 4 Pillars Navigation Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {DISCIPLINES.map((d) => {
            const isActive = d.id === activeTab;
            return (
              <button
                key={d.id}
                onClick={() => setActiveTab(d.id)}
                className={`p-5 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden group ${
                  isActive
                    ? "glass-marine border-[#E29B4A] shadow-[0_0_25px_rgba(226,155,74,0.15)]"
                    : "bg-[#001224]/60 border-[#BDD8E9]/10 hover:border-[#49769F]/40 hover:bg-[#001224]/90"
                }`}
              >
                <div className="flex justify-between items-start font-mono text-[10px]">
                  <span className={isActive ? "text-[#E29B4A]" : "text-[#4E8EA2]"}>
                    DISCIPLINE {d.num}
                  </span>
                  {isActive && <span className="h-2 w-2 rounded-full bg-[#E29B4A] animate-ping" />}
                </div>
                <h3 className="font-serif text-lg sm:text-xl font-light text-[#BDD8E9] mt-2 block group-hover:text-[#E29B4A] transition-colors">
                  {d.category}
                </h3>
                <span className="font-sans text-[11px] text-[#6EA2B3] block mt-1 line-clamp-1">
                  {d.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Discipline Detailed Showcase Card */}
        <div className="glass-marine rounded-3xl p-6 sm:p-12 border border-[#BDD8E9]/15 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Image Preview with Spec Overlays (5 Cols) */}
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden aspect-4/3 lg:aspect-auto lg:h-[480px] bg-[#001224] border border-[#BDD8E9]/15 group">
            <img
              src={selected.image}
              alt={selected.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#001224]/90 via-transparent to-transparent" />

            {/* Float Metric Badge */}
            <div className="absolute top-4 left-4 font-mono text-[9px] uppercase tracking-widest text-[#001224] bg-[#E29B4A] px-3 py-1 rounded-full font-bold">
              {selected.num} // {selected.category}
            </div>

            <div className="absolute bottom-4 left-4 right-4 font-mono text-[10px] text-[#BDD8E9] border-t border-[#BDD8E9]/20 pt-2 flex justify-between">
              <span>PROPRIETARY DESIGN</span>
              <span className="text-[#E29B4A]">RAY ATELIER</span>
            </div>
          </div>

          {/* Right Column: Deep Technical Prose & Specs (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between h-full">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#E29B4A] block mb-2">
                {selected.tagline}
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-light text-[#BDD8E9] leading-tight">
                {selected.title}
              </h3>
              <p className="mt-4 font-sans text-xs sm:text-sm text-[#6EA2B3] leading-relaxed">
                {selected.description}
              </p>

              {/* Bullet Features */}
              <div className="mt-6 space-y-2.5">
                {selected.details.map((detail, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#E29B4A] shrink-0 mt-1.5" />
                    <span className="font-sans text-xs text-[#BDD8E9]/90 leading-relaxed">
                      {detail}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Specifications Grid */}
            <div className="mt-8 pt-6 border-t border-[#BDD8E9]/15 grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-[10px]">
              {selected.specs.map((s, idx) => (
                <div key={idx} className="bg-[#001224]/50 p-3 rounded-xl border border-[#BDD8E9]/10">
                  <span className="text-[#4E8EA2] block text-[9px] uppercase tracking-wider">
                    {s.label}
                  </span>
                  <span className="text-[#BDD8E9] font-medium text-xs mt-1 block">
                    {s.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
