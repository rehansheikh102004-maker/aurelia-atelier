"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  ShieldCheck,
  Building2,
  Watch,
  Anchor,
  Plane,
  Play,
  Pause,
  Volume2,
  VolumeX,
  FileCheck2,
  Compass,
  Sparkles,
  Layers,
  ArrowUpRight,
  Clock,
  Lock,
  ChevronRight,
} from "lucide-react";

export function AtelierMonographDossier() {
  const [activeTab, setActiveTab] = useState<"purpose" | "workflow" | "faq">("purpose");
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {
        setIsPlaying(false);
      });
    }
  }, []);

  const toggleVideo = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleAudio = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const PROTOCOL_STEPS = [
    {
      step: "01",
      title: "Encrypted Clearance & Legal NDA",
      tag: "DISCRETION PROTOCOL",
      desc: "Every prospective patron executes an internationally binding non-disclosure agreement. Identity records are sealed under zero-knowledge cryptographic vaults.",
    },
    {
      step: "02",
      title: "Private Consultation with Ray",
      tag: "ATELIER DIRECTION",
      desc: "A bespoke spatial masterclass conducted privately in Geneva, Dubai, or Tokyo to align acoustic requirements, spatial elevation, and aesthetic philosophies.",
    },
    {
      step: "03",
      title: "Parametric Computational Simulation",
      tag: "COMPUTATIONAL PHYSICS",
      desc: "Supercomputer wind-tunnel fluid dynamic analysis, 450-ton kinetic tuned mass harmonic calculations, and 52dB acoustic isolation modeling.",
    },
    {
      step: "04",
      title: "Materiality Harvesting in Tivoli & Geneva",
      tag: "PURE MATERIALITY",
      desc: "Vein-cut Roman travertine extracted from historical quarries in Tivoli, and ruthenium bridges hand-chamfered by master watchmakers in Geneva.",
    },
    {
      step: "05",
      title: "Private Handover & Syndicate Credentials",
      tag: "HORIZON KEYS",
      desc: "Simultaneous transfer of the 412M sky penthouse keycard, custom Caliber 9001 timekeeper, and encrypted access tokens to the Mach 0.88 supersonic flight syndicate.",
    },
  ];

  const FAQS = [
    {
      q: "Why was this website built?",
      a: "This digital atelier replaces conventional brochures and static PDFs with an interactive, tactile monograph. It allows private collectors and patrons to inspect architectural blueprints, material swatches, horological movements, and flight corridors in real time before commissions begin.",
    },
    {
      q: "What is the primary service of Aurelia?",
      a: "Aurelia is a multidisciplinary design syndicate that executes four connected commissions: 412M residential sky penthouses, limited Caliber 9001 skeleton tourbillons (12 per year), 88M carbon superyachts, and transcontinental private aviation corridors.",
    },
    {
      q: "How many commissions are accepted globally?",
      a: "To guarantee uncompromising craftsmanship and zero temporal decay, Aurelia restricts its pipeline to a maximum of 5 sky residential towers and 12 bespoke timepieces per decade globally.",
    },
    {
      q: "Can clients commission only one discipline?",
      a: "While most patrons acquire the complete Aurelia Horizon Monograph ecosystem (Residence + Timepiece + Yacht + Jet), patrons may commission individual disciplines subject to committee approval and NDA execution.",
    },
  ];

  return (
    <section
      id="stage-monograph-about"
      className="relative bg-[#001224] py-28 px-6 sm:px-12 overflow-hidden border-t border-[#49769F]/20"
    >
      {/* Background Watermark */}
      <span className="pointer-events-none absolute right-[-2%] top-1/4 font-serif text-[18vw] font-light text-[#BDD8E9]/[0.02] select-none">
        DOSSIER
      </span>

      <div className="max-w-7xl mx-auto relative z-10 space-y-20">
        {/* Top Header: Core Purpose & Identity */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#49769F]/30 bg-[#0A4174]/20 font-mono text-[10px] uppercase tracking-[0.25em] text-[#E29B4A] mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#E29B4A]" />
              THE ATELIER PURPOSE // A TO Z MASTER DOSSIER
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl font-light text-[#BDD8E9] leading-tight tracking-tight">
              Why Aurelia Exists & <br />
              <span className="italic text-[#E29B4A]">What We Build</span>
            </h2>
            <p className="mt-4 font-sans text-xs sm:text-base text-[#6EA2B3] leading-relaxed">
              This digital monograph is not a commercial storefront. It is the official confidential archive of **AURELIA — The Horizon Atelier**, designed for global patrons seeking acoustic silence, hyper-rarity, and mathematical perfection across sky, sea, and atmosphere.
            </p>
          </div>

          {/* Quick Metrics Badge */}
          <div className="grid grid-cols-2 gap-4 font-mono text-[10px] w-full lg:w-auto">
            <div className="glass-marine p-4 rounded-xl border border-[#BDD8E9]/15">
              <span className="text-[#4E8EA2] block uppercase tracking-wider text-[9px]">
                DECENNIAL LIMIT
              </span>
              <span className="text-xl font-serif text-[#E29B4A] mt-1 block">5 Towers Max</span>
              <span className="text-[#6EA2B3] text-[9px] block">Global Allocation</span>
            </div>
            <div className="glass-marine p-4 rounded-xl border border-[#BDD8E9]/15">
              <span className="text-[#4E8EA2] block uppercase tracking-wider text-[9px]">
                CALIBER RUN
              </span>
              <span className="text-xl font-serif text-[#BDD8E9] mt-1 block">12 Pieces/Yr</span>
              <span className="text-[#6EA2B3] text-[9px] block">Geneva Hallmarked</span>
            </div>
          </div>
        </div>

        {/* Cinematic Atelier Film Deck (The Master Video Player) */}
        <div className="glass-marine rounded-3xl p-6 sm:p-10 border border-[#BDD8E9]/15 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#E29B4A]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#E29B4A] animate-pulse" />
                CINEMATIC MONOGRAPH // DIRECTOR&apos;S CUT
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#BDD8E9] mt-1">
                The Horizon Atelier in Motion
              </h3>
              <p className="font-sans text-xs text-[#6EA2B3] mt-1">
                A 60-second synthesis of Tivoli Roman travertine, high-altitude architectural physics, and supersonic flight corridors.
              </p>
            </div>

            {/* Video Controls Header */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={toggleVideo}
                className="flex items-center gap-2 bg-[#E29B4A] text-[#001224] px-5 py-2.5 rounded-full font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#F5A642] transition-colors shadow-lg cursor-pointer"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPlaying ? "Pause Reel" : "Play Film"}</span>
              </button>

              <button
                type="button"
                onClick={toggleAudio}
                className="p-2.5 rounded-full border border-[#BDD8E9]/20 bg-[#001D39] text-[#BDD8E9] hover:border-[#E29B4A] transition-colors cursor-pointer"
                title={isMuted ? "Unmute Audio" : "Mute Audio"}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Video Container Frame */}
          <div className="relative rounded-2xl overflow-hidden aspect-16/9 bg-[#001224] border border-[#BDD8E9]/20 group">
            <video
              ref={videoRef}
              src="/assets/explore.mp4"
              autoPlay
              loop
              muted={isMuted}
              playsInline
              preload="auto"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              className="w-full h-full object-cover cursor-pointer"
              onClick={toggleVideo}
            />

            {/* Ambient Overlay Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#001224]/80 via-transparent to-transparent pointer-events-none" />

            {/* Floating Telemetry Stamp */}
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end pointer-events-none font-mono text-[9px] uppercase tracking-widest text-[#BDD8E9]/70">
              <div>
                <span className="block text-[#E29B4A] text-[10px]">AURELIA CINEMA ARCHIVE</span>
                <span>4K ULTRA-HIGH FIDELITY // 60 FPS</span>
              </div>
              <div className="text-right">
                <span>COMMISSION FILM NO. 01</span>
                <span className="block text-[#BDD8E9]">RAY ATELIER DIRECTED</span>
              </div>
            </div>

            {/* Play Button Splash Overlay when paused */}
            {!isPlaying && (
              <div
                onClick={toggleVideo}
                className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] cursor-pointer transition-opacity"
              >
                <div className="h-20 w-20 rounded-full border-2 border-[#E29B4A] bg-[#001224]/80 flex items-center justify-center shadow-[0_0_40px_rgba(226,155,74,0.4)] hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 text-[#E29B4A] ml-1" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Interactive Tabs: Purpose, 5-Step Workflow, FAQ */}
        <div className="space-y-8">
          {/* Tabs Selector Bar */}
          <div className="flex border-b border-[#49769F]/20 pb-3 gap-6 font-mono text-[11px] uppercase tracking-widest">
            <button
              type="button"
              onClick={() => setActiveTab("purpose")}
              className={`pb-2 transition-colors cursor-pointer ${
                activeTab === "purpose"
                  ? "text-[#E29B4A] border-b-2 border-[#E29B4A] font-bold"
                  : "text-[#6EA2B3] hover:text-[#BDD8E9]"
              }`}
            >
              01 // The 4 Core Deliverables
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("workflow")}
              className={`pb-2 transition-colors cursor-pointer ${
                activeTab === "workflow"
                  ? "text-[#E29B4A] border-b-2 border-[#E29B4A] font-bold"
                  : "text-[#6EA2B3] hover:text-[#BDD8E9]"
              }`}
            >
              02 // The 5-Phase Commission Protocol
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("faq")}
              className={`pb-2 transition-colors cursor-pointer ${
                activeTab === "faq"
                  ? "text-[#E29B4A] border-b-2 border-[#E29B4A] font-bold"
                  : "text-[#6EA2B3] hover:text-[#BDD8E9]"
              }`}
            >
              03 // Monograph FAQs
            </button>
          </div>

          {/* TAB 1: The 4 Core Deliverables */}
          {activeTab === "purpose" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in duration-500">
              <div className="glass-marine p-6 rounded-2xl border border-[#BDD8E9]/15 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between font-mono text-[10px] text-[#E29B4A] mb-3">
                    <Building2 className="w-4 h-4" />
                    <span>DELIVERABLE 01</span>
                  </div>
                  <h4 className="font-serif text-xl font-light text-[#BDD8E9]">
                    412M Sky Penthouses
                  </h4>
                  <p className="mt-3 font-sans text-xs text-[#6EA2B3] leading-relaxed">
                    Custom cantilevered residences hovering above urban cloudlines. Designed as acoustic soundproof observatories featuring 450-ton harmonic tuned mass dampers and panoramic acoustic Low-E glass.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#BDD8E9]/10 font-mono text-[9px] text-[#4E8EA2] uppercase">
                  <span>Elevation: 412M • Acoustic: 52dB</span>
                </div>
              </div>

              <div className="glass-marine p-6 rounded-2xl border border-[#BDD8E9]/15 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between font-mono text-[10px] text-[#BDD8E9] mb-3">
                    <Watch className="w-4 h-4" />
                    <span>DELIVERABLE 02</span>
                  </div>
                  <h4 className="font-serif text-xl font-light text-[#BDD8E9]">
                    Caliber 9001 Watches
                  </h4>
                  <p className="mt-3 font-sans text-xs text-[#6EA2B3] leading-relaxed">
                    Hand-crafted skeleton tourbillons limited to 12 pieces per year. 28,800 VPH escapement, titanium bridge ribcages, and Geneva Seal finishing mirroring skyscraper architecture on your wrist.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#BDD8E9]/10 font-mono text-[9px] text-[#4E8EA2] uppercase">
                  <span>Frequency: 4.0 Hz • Power: 72H</span>
                </div>
              </div>

              <div className="glass-marine p-6 rounded-2xl border border-[#BDD8E9]/15 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between font-mono text-[10px] text-[#7BBDE8] mb-3">
                    <Anchor className="w-4 h-4" />
                    <span>DELIVERABLE 03</span>
                  </div>
                  <h4 className="font-serif text-xl font-light text-[#BDD8E9]">
                    Riviera 88M Yachts
                  </h4>
                  <p className="mt-3 font-sans text-xs text-[#6EA2B3] leading-relaxed">
                    Carbon-composite axe-bow displacement superyachts tested in the Gulf of Genoa. Silent hybrid electric cruising at 32 knots with private cantilevered helipads and submarine bays.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#BDD8E9]/10 font-mono text-[9px] text-[#4E8EA2] uppercase">
                  <span>Speed: 32 Knots • Length: 88M</span>
                </div>
              </div>

              <div className="glass-marine p-6 rounded-2xl border border-[#BDD8E9]/15 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between font-mono text-[10px] text-[#F5A642] mb-3">
                    <Plane className="w-4 h-4" />
                    <span>DELIVERABLE 04</span>
                  </div>
                  <h4 className="font-serif text-xl font-light text-[#BDD8E9]">
                    Supersonic Sky Corridors
                  </h4>
                  <p className="mt-3 font-sans text-xs text-[#6EA2B3] leading-relaxed">
                    Mach 0.88 transcontinental private flight syndicates linking Dubai, Geneva, Tokyo, and Monaco directly to private airstrips with encrypted token-based boarding protocols.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#BDD8E9]/10 font-mono text-[9px] text-[#4E8EA2] uppercase">
                  <span>Velocity: Mach 0.88 • Altitude: 45,000FT</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: The 5-Phase Commission Protocol */}
          {activeTab === "workflow" && (
            <div className="space-y-4 animate-in fade-in duration-500">
              {PROTOCOL_STEPS.map((step) => (
                <div
                  key={step.step}
                  className="glass-marine p-6 rounded-2xl border border-[#BDD8E9]/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-[#E29B4A]/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <span className="font-mono text-2xl font-bold text-[#E29B4A] shrink-0">
                      {step.step}
                    </span>
                    <div>
                      <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-[#4E8EA2] mb-1">
                        <span>{step.tag}</span>
                      </div>
                      <h4 className="font-serif text-xl font-light text-[#BDD8E9]">
                        {step.title}
                      </h4>
                      <p className="mt-1 font-sans text-xs text-[#6EA2B3] max-w-3xl leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>

                  <span className="font-mono text-[9px] uppercase tracking-wider text-[#BDD8E9]/40 shrink-0 hidden lg:block">
                    CONFIDENTIAL PROTOCOL
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: Monograph FAQs */}
          {activeTab === "faq" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-500">
              {FAQS.map((faq, idx) => (
                <div
                  key={idx}
                  className="glass-marine p-6 rounded-2xl border border-[#BDD8E9]/15 space-y-3"
                >
                  <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-wider text-[#E29B4A]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#E29B4A]" />
                    <span>INQUIRY 0{idx + 1}</span>
                  </div>
                  <h4 className="font-serif text-xl font-light text-[#BDD8E9]">
                    {faq.q}
                  </h4>
                  <p className="font-sans text-xs text-[#6EA2B3] leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
