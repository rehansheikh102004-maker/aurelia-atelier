"use client";

import React from "react";
import { DraggableCardContainer, DraggableCardBody } from "@/components/ui/draggable-card";
import { Sparkles, Move, Compass, Shield, Maximize2 } from "lucide-react";

export default function DraggableCardDemo() {
  const cards = [
    {
      id: "marble",
      tag: "ARCHITECTURAL MATERIAL // 01",
      title: "Roman Travertine & Calacatta",
      desc: "Vein-cut slabs with natural porous cavities stabilized with transparent resin.",
      image: "/assets/lookbook/marble.jpg",
      initialX: 40,
      initialY: 40,
      rotate: -4,
    },
    {
      id: "watch",
      tag: "HAUTE HOROLOGY // 02",
      title: "Caliber 9001 Tourbillon",
      desc: "28,800 VPH escapement, 72-hour power reserve, hand-beveled ruthenium bridges.",
      image: "/assets/lookbook/watch.jpg",
      initialX: 340,
      initialY: 100,
      rotate: 3,
    },
    {
      id: "yacht",
      tag: "NAVAL DYNAMICS // 03",
      title: "Riviera 80M Sea-Trial",
      desc: "Low-resistance axe-bow displacement hull tested in the Gulf of Genoa.",
      image: "/assets/lookbook/yacht.jpg",
      initialX: 680,
      initialY: 30,
      rotate: -2,
    },
    {
      id: "jet",
      tag: "SKY SYNDICATE // 04",
      title: "Atmosphere G700 Suite",
      desc: "Mach 0.90 cruise velocity, bespoke Tuscan leather and acoustic travertine tables.",
      image: "/assets/lookbook/jet.jpg",
      initialX: 180,
      initialY: 380,
      rotate: 4,
    },
    {
      id: "blueprint",
      tag: "ZENITH ARCHIVE // 05",
      title: "Elevation 412M Structural Matrix",
      desc: "Tuned mass damper tuned for seismic equilibrium and 140 knot wind shear.",
      image: "/founder.jpg",
      initialX: 520,
      initialY: 400,
      rotate: -3,
    },
  ];

  return (
    <section id="stage-lookbook" className="relative bg-[#F0ECE1] py-24 px-6 md:px-16 overflow-hidden border-t border-b border-[#B4A896]/30">
      {/* Header */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.35em] text-[#A37B48] flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            STAGE 03 // TACTILE ARCHIVE
          </span>
          <h2 className="mt-3 font-serif text-4xl sm:text-6xl font-light text-[#171614] leading-tight">
            The Atelier Lookbook <br />
            <span className="italic text-[#A37B48]">Physics Moodboard</span>
          </h2>
        </div>

        <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-[#736F68] bg-white/50 backdrop-blur-md px-4 py-2.5 rounded-full border border-[#B4A896]/40">
          <Move className="w-3.5 h-3.5 text-[#A37B48]" />
          <span>DRAG & FLING TO REORGANIZE ARTIFACTS</span>
        </div>
      </div>

      {/* Physics Canvas Area */}
      <div className="max-w-7xl mx-auto relative h-[720px] rounded-3xl bg-[#F7F5F0]/60 border border-[#B4A896]/30 backdrop-blur-md overflow-hidden p-8 shadow-inner">
        {/* Background Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#171614 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <DraggableCardContainer className="w-full h-full">
          {cards.map((card) => (
            <DraggableCardBody
              key={card.id}
              initialX={card.initialX}
              initialY={card.initialY}
              initialRotate={card.rotate}
              className="w-72 sm:w-80"
            >
              <div className="rounded-2xl border border-[#B4A896]/40 bg-white/90 backdrop-blur-xl p-4 shadow-luxury hover:shadow-luxury-hover transition-shadow duration-300">
                <div className="relative h-48 w-full rounded-xl overflow-hidden mb-4 bg-[#171614]">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover pointer-events-none"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-[#171614]/80 text-[#F7F5F0] px-2.5 py-0.5 rounded-full font-mono text-[8px] tracking-widest uppercase backdrop-blur-sm border border-white/20">
                    {card.tag}
                  </div>
                </div>

                <h3 className="font-serif text-lg font-light text-[#171614]">
                  {card.title}
                </h3>
                <p className="mt-1 font-sans text-xs text-[#736F68] leading-relaxed line-clamp-2">
                  {card.desc}
                </p>

                <div className="mt-3 pt-3 border-t border-[#B4A896]/20 flex justify-between items-center font-mono text-[8px] tracking-widest text-[#A37B48] uppercase">
                  <span>ATELIER MMXXVI</span>
                  <span>INSPECT SPEC</span>
                </div>
              </div>
            </DraggableCardBody>
          ))}
        </DraggableCardContainer>
      </div>
    </section>
  );
}
