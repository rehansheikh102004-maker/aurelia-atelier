"use client";

import React from "react";
import {
  DraggableCardBody,
  DraggableCardContainer,
} from "@/components/ui/draggable-card";

export default function DraggableCardDemo() {
  const swatches = [
    {
      title: "Roman Travertine",
      tag: "SPECIMEN 01",
      meta: "Density: 2.71 g/cm³",
      image: "/assets/lookbook/marble.jpg",
      className: "top-8 left-[6%] sm:left-[10%] rotate-[-4deg]",
    },
    {
      title: "Skeleton Movement",
      tag: "SPECIMEN 02",
      meta: "Titanium Bridge",
      image: "/assets/lookbook/watch.jpg",
      className: "top-28 sm:top-40 left-[18%] sm:left-[26%] rotate-[5deg]",
    },
    {
      title: "Carbon Composite",
      tag: "SPECIMEN 03",
      meta: "Marine Grade T800",
      image: "/assets/lookbook/yacht.jpg",
      className: "top-10 sm:top-12 left-[32%] sm:left-[44%] rotate-[-2deg]",
    },
    {
      title: "Aero-Jet Turbine",
      tag: "SPECIMEN 04",
      meta: "Nickel Superalloy",
      image: "/assets/lookbook/jet.jpg",
      className: "top-24 sm:top-36 right-[12%] sm:right-[20%] rotate-[6deg]",
    },
    {
      title: "Penthouse Dusk",
      tag: "SPECIMEN 05",
      meta: "Elevation 412M",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop",
      className: "top-12 sm:top-16 right-[4%] sm:right-[6%] rotate-[-5deg]",
    },
  ];

  return (
    <section
      id="stage-lookbook"
      className="relative min-h-[90vh] w-full bg-[#001D39] py-24 overflow-hidden select-none border-t border-[#49769F]/20"
    >
      {/* Background Subtle Watermark */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="font-mono text-xs uppercase tracking-[0.35em] text-[#E29B4A]">
          Physical Specimens // Drag to Inspect
        </span>
        <h2 className="mt-2 font-serif text-6xl sm:text-9xl font-light text-[#BDD8E9]/[0.03]">
          MATERIALITY
        </h2>
      </div>

      <DraggableCardContainer className="relative h-[650px] w-full max-w-7xl mx-auto touch-pan-y">
        {swatches.map((item) => (
          <DraggableCardBody
            key={item.title}
            className={`${item.className} glass-marine p-4 rounded-2xl w-64 sm:w-72 cursor-grab active:cursor-grabbing`}
          >
            <div className="overflow-hidden rounded-xl aspect-4/3 bg-[#001224]">
              <img
                src={item.image}
                alt={item.title}
                className="pointer-events-none h-full w-full object-cover"
              />
            </div>
            <div className="mt-3 flex items-center justify-between font-mono text-[9px]">
              <span className="text-[#E29B4A] uppercase tracking-wider">{item.tag}</span>
              <span className="text-[#6EA2B3]">{item.meta}</span>
            </div>
            <h4 className="font-serif text-lg font-light text-[#BDD8E9] mt-1">{item.title}</h4>
          </DraggableCardBody>
        ))}
      </DraggableCardContainer>
    </section>
  );
}
