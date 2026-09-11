"use client";

import React, { memo } from "react";

interface ChapterHUDProps {
  activeAct: number;
}

const actMetadata = [
  { title: "THE ZENITH ARCHIVE", elevation: "412M", coords: "25°11'47\"N 55°16'28\"E" },
  { title: "THE SKY RESIDENCES", elevation: "380M", coords: "25°12'04\"N 55°16'44\"E" },
  { title: "HOROLOGY ARCHIVE", elevation: "320M", coords: "46°12'19\"N 6°08'48\"E" },
  { title: "TERRA & MARINA", elevation: "000M", coords: "43°44'05\"N 7°25'14\"E" },
  { title: "STRATOSPHERE ASCENT", elevation: "12,500M", coords: "FLIGHT CORRIDOR 09" },
];

export const ChapterHUD = memo(function ChapterHUD({ activeAct }: ChapterHUDProps) {
  const current = actMetadata[Math.min(Math.max(activeAct - 1, 0), actMetadata.length - 1)];

  return (
    <aside
      aria-label="Flight and chapter telemetry"
      className="pointer-events-none fixed bottom-6 left-6 sm:left-8 z-40 hidden md:flex items-center gap-4 font-mono text-[10px] tracking-[0.25em] text-[#6EA2B3] uppercase bg-[#001224]/80 backdrop-blur-md px-4 py-2 rounded-full border border-[#BDD8E9]/15 shadow-lg will-change-transform"
    >
      <div className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-[#E29B4A] animate-pulse" />
        <span className="text-[#BDD8E9] font-medium">ACT 0{activeAct} // 05</span>
      </div>
      <span className="text-[#BDD8E9]/20">|</span>
      <span>{current.title}</span>
      <span className="text-[#BDD8E9]/20">|</span>
      <span>ALT: {current.elevation}</span>
      <span className="text-[#BDD8E9]/20">|</span>
      <span id="hud-progress-pct" className="text-[#E29B4A]">0%</span>
    </aside>
  );
});
