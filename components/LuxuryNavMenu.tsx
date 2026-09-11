"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Compass, Sparkles, Building2, Watch, Anchor, Plane, X, ArrowUpRight } from "lucide-react";

const CHAPTERS = [
  { num: "01", title: "The Zenith", subtitle: "Metropolis High-Rise Living (Act I)", target: 0 },
  { num: "02", title: "The Residences", subtitle: "Travertine & Glass Suite (Act II)", target: 210 },
  { num: "03", title: "Horology", subtitle: "28,800 VPH Mechanical Caliber (Act III)", target: 380 },
  { num: "04", title: "Terra & Marina", subtitle: "Superyacht Engineering (Act IV)", target: 550 },
  { num: "05", title: "Stratosphere", subtitle: "Private Aviation Atelier (Act V)", target: 700 },
  { num: "06", title: "Architectural Dossier", subtitle: "3D Blueprint & Tolerances", id: "#stage-dossier" },
  { num: "07", title: "Master Monograph & Film", subtitle: "Purpose, Workflow & Cinema Reel", id: "#stage-monograph-about" },
  { num: "08", title: "Four Disciplines", subtitle: "Haute Living, Watches, Yachts, Jets", id: "#stage-disciplines" },
  { num: "09", title: "Materiality Desk", subtitle: "Physical Specimen Moodboard", id: "#stage-lookbook" },
  { num: "10", title: "Founder Manifesto", subtitle: "Ray Atelier Direction & LiDAR", id: "#stage-founder" },
  { num: "11", title: "Flight Corridors", subtitle: "Tactical WebGL 3D Globe", id: "#stage-globe" },
  { num: "12", title: "Private Concierge", subtitle: "VIP Access Entry", id: "#stage-concierge" },
];

export function LuxuryNavMenu({ lenis }: { lenis: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"chapters" | "overview">("chapters");

  // Close with Escape key
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  const scrollToSection = useCallback(
    (ch: (typeof CHAPTERS)[0]) => {
      // 1. Immediately ensure Lenis is started
      if (lenis) {
        try {
          lenis.start();
        } catch {}
      }

      // 2. Close drawer
      setIsOpen(false);

      // 3. Scroll to destination with both Lenis and native fallbacks
      setTimeout(() => {
        if (ch.id) {
          const el = document.querySelector(ch.id);
          if (el) {
            if (lenis) {
              try {
                lenis.scrollTo(el, { duration: 1.4, offset: -20 });
              } catch {
                el.scrollIntoView({ behavior: "smooth" });
              }
            } else {
              el.scrollIntoView({ behavior: "smooth" });
            }
          }
        } else if (typeof ch.target === "number") {
          const targetPx = (ch.target / 100) * window.innerHeight;
          if (lenis) {
            try {
              lenis.scrollTo(targetPx, { duration: 1.4 });
            } catch {
              window.scrollTo({ top: targetPx, behavior: "smooth" });
            }
          } else {
            window.scrollTo({ top: targetPx, behavior: "smooth" });
          }
        }
      }, 50);
    },
    [lenis]
  );

  return (
    <div className="relative z-50">
      {/* Fixed Persistent Header */}
      <header className="fixed top-0 inset-x-0 z-40 flex items-center justify-between px-6 sm:px-10 py-6 pointer-events-none">
        <button
          type="button"
          onClick={() => {
            if (lenis) {
              try {
                lenis.start();
                lenis.scrollTo(0, { duration: 1.5 });
              } catch {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            } else {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="font-serif text-2xl font-light uppercase tracking-widest text-[#BDD8E9] pointer-events-auto cursor-pointer hover:text-[#E29B4A] transition-colors focus:outline-none"
        >
          Aurelia
        </button>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close Monograph Index" : "Open Monograph Index"}
          className="pointer-events-auto flex items-center gap-3 rounded-full border border-[#BDD8E9]/20 bg-[#001224]/80 px-5 py-2 backdrop-blur-md transition-colors hover:border-[#E29B4A] shadow-lg focus:outline-none cursor-pointer"
        >
          <span className="font-mono text-xs uppercase tracking-wider text-[#BDD8E9]">
            {isOpen ? "Close" : "Index"}
          </span>
          <span
            className={`h-2 w-2 rounded-full transition-transform duration-300 ${
              isOpen ? "bg-[#E29B4A] scale-125" : "bg-[#BDD8E9]"
            }`}
          />
        </button>
      </header>

      {/* Sliding Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end pointer-events-auto">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative z-10 h-full w-full sm:w-[540px] bg-[#001224] border-l border-[#BDD8E9]/15 p-6 sm:p-10 pt-20 flex flex-col justify-between shadow-2xl overflow-y-auto pointer-events-auto">
            <div>
              {/* Header Navigation Tabs & Close Button */}
              <div className="flex items-center justify-between border-b border-[#49769F]/20 pb-4 mb-6">
                <div className="flex gap-4 font-mono text-[10px] uppercase tracking-widest">
                  <button
                    type="button"
                    onClick={() => setActiveTab("chapters")}
                    className={`pb-1 transition-colors cursor-pointer focus:outline-none ${
                      activeTab === "chapters"
                        ? "text-[#E29B4A] border-b-2 border-[#E29B4A] font-bold"
                        : "text-[#6EA2B3] hover:text-[#BDD8E9]"
                    }`}
                  >
                    01 // Chapters
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("overview")}
                    className={`pb-1 transition-colors cursor-pointer focus:outline-none ${
                      activeTab === "overview"
                        ? "text-[#E29B4A] border-b-2 border-[#E29B4A] font-bold"
                        : "text-[#6EA2B3] hover:text-[#BDD8E9]"
                    }`}
                  >
                    02 // Atelier Overview
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#BDD8E9]/20 hover:border-[#E29B4A] text-[#6EA2B3] hover:text-[#BDD8E9] font-mono text-[9px] uppercase tracking-wider transition-colors cursor-pointer focus:outline-none"
                >
                  <span>Close</span>
                  <X className="w-3 h-3 text-[#E29B4A]" />
                </button>
              </div>

              {/* View 1: Chapters List */}
              {activeTab === "chapters" ? (
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#E29B4A] block mb-4">
                    Monograph Navigation Index // Click to Navigate
                  </span>
                  <ul className="space-y-2.5">
                    {CHAPTERS.map((ch) => (
                      <li key={ch.num}>
                        <button
                          type="button"
                          onClick={() => scrollToSection(ch)}
                          className="w-full group cursor-pointer border-b border-[#49769F]/20 pb-2 text-left hover:border-[#E29B4A] transition-colors flex flex-col focus:outline-none"
                        >
                          <div className="flex items-baseline justify-between font-serif text-lg sm:text-xl font-light text-[#BDD8E9] group-hover:text-[#E29B4A] transition-colors w-full">
                            <span>
                              {ch.num}. {ch.title}
                            </span>
                            <span className="font-mono text-[9px] opacity-0 group-hover:opacity-100 transition-opacity text-[#E29B4A] flex items-center gap-1">
                              [EXPLORE]
                              <ArrowUpRight className="w-2.5 h-2.5" />
                            </span>
                          </div>
                          <p className="mt-0.5 font-sans text-[11px] text-[#6EA2B3] group-hover:text-[#BDD8E9]/80 transition-colors">
                            {ch.subtitle}
                          </p>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                /* View 2: Complete Atelier Overview & Story */
                <div className="space-y-6 text-left">
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#E29B4A] block">
                    What is Aurelia? // The Master Monograph
                  </span>
                  <h3 className="font-serif text-2xl font-light text-[#BDD8E9]">
                    The Horizon Atelier
                  </h3>
                  <p className="font-sans text-xs text-[#6EA2B3] leading-relaxed">
                    Aurelia is an elite, multidisciplinary private design syndicate founded by <strong className="text-[#BDD8E9]">Ray</strong>. Operating beyond conventional architecture firms, Aurelia crafts ultra-exclusive sky residences at 412-meter altitudes, limited-edition horological skeleton tourbillons (12 per year), 88-meter carbon superyachts, and supersonic private aviation suites.
                  </p>

                  <div className="space-y-2 border-t border-[#49769F]/20 pt-4 font-mono text-[10px]">
                    <button
                      type="button"
                      onClick={() => scrollToSection(CHAPTERS[6])}
                      className="w-full flex items-center justify-between p-2.5 rounded-lg bg-[#001D39]/80 hover:bg-[#0A4174]/40 border border-[#BDD8E9]/10 text-left transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2 text-[#E29B4A]">
                        <Building2 className="w-3.5 h-3.5" />
                        <span>HAUTE ARCHITECTURE // 412M PENTHOUSES</span>
                      </div>
                      <ArrowUpRight className="w-3 h-3 text-[#E29B4A]" />
                    </button>

                    <button
                      type="button"
                      onClick={() => scrollToSection(CHAPTERS[2])}
                      className="w-full flex items-center justify-between p-2.5 rounded-lg bg-[#001D39]/80 hover:bg-[#0A4174]/40 border border-[#BDD8E9]/10 text-left transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2 text-[#BDD8E9]">
                        <Watch className="w-3.5 h-3.5" />
                        <span>HAUTE HORLOGERIE // CALIBER 9001 TOURBILLON</span>
                      </div>
                      <ArrowUpRight className="w-3 h-3 text-[#BDD8E9]" />
                    </button>

                    <button
                      type="button"
                      onClick={() => scrollToSection(CHAPTERS[3])}
                      className="w-full flex items-center justify-between p-2.5 rounded-lg bg-[#001D39]/80 hover:bg-[#0A4174]/40 border border-[#BDD8E9]/10 text-left transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2 text-[#7BBDE8]">
                        <Anchor className="w-3.5 h-3.5" />
                        <span>NAVAL DYNAMICS // RIVIERA 88M YACHTS</span>
                      </div>
                      <ArrowUpRight className="w-3 h-3 text-[#7BBDE8]" />
                    </button>

                    <button
                      type="button"
                      onClick={() => scrollToSection(CHAPTERS[4])}
                      className="w-full flex items-center justify-between p-2.5 rounded-lg bg-[#001D39]/80 hover:bg-[#0A4174]/40 border border-[#BDD8E9]/10 text-left transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2 text-[#F5A642]">
                        <Plane className="w-3.5 h-3.5" />
                        <span>STRATOSPHERE // MACH 0.88 CORRIDORS</span>
                      </div>
                      <ArrowUpRight className="w-3 h-3 text-[#F5A642]" />
                    </button>
                  </div>

                  <div className="bg-[#001D39] p-4 rounded-xl border border-[#BDD8E9]/15 font-sans text-xs text-[#6EA2B3] leading-relaxed">
                    <strong className="text-[#E29B4A] block font-mono text-[9px] uppercase tracking-wider mb-1">
                      Private Commissioning Guidelines:
                    </strong>
                    All commissions require legal NDA execution. Sky residences are limited to 5 per decade globally to preserve spatial rarity and construction perfection.
                    <button
                      type="button"
                      onClick={() => scrollToSection(CHAPTERS[10])}
                      className="mt-3 block text-[#E29B4A] underline font-mono text-[10px] cursor-pointer"
                    >
                      Inquire for Private Entry &rarr;
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Footer Telemetry */}
            <div className="border-t border-[#49769F]/20 pt-4 flex justify-between font-mono text-[10px] text-[#4E8EA2] mt-6">
              <span>EDITION MMXXVI</span>
              <span>DXB • GVA • MCM • HND</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
