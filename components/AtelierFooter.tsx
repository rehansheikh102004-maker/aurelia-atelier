"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle2, Send, Shield, Clock, MapPin, KeyRound } from "lucide-react";

export function AtelierFooter() {
  const [accessCode, setAccessCode] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [times, setTimes] = useState({ geneva: "--:--", dubai: "--:--", tokyo: "--:--", monaco: "--:--" });

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      setTimes({
        geneva: now.toLocaleTimeString("en-GB", { timeZone: "Europe/Zurich", hour: "2-digit", minute: "2-digit" }),
        dubai: now.toLocaleTimeString("en-GB", { timeZone: "Asia/Dubai", hour: "2-digit", minute: "2-digit" }),
        tokyo: now.toLocaleTimeString("en-GB", { timeZone: "Asia/Tokyo", hour: "2-digit", minute: "2-digit" }),
        monaco: now.toLocaleTimeString("en-GB", { timeZone: "Europe/Monaco", hour: "2-digit", minute: "2-digit" }),
      });
    };
    updateTimes();
    const timer = setInterval(updateTimes, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessCode) return;
    setSubmitted(true);
  };

  return (
    <footer id="stage-concierge" className="relative border-t border-[#49769F]/20 bg-[#001224] py-24 px-6 sm:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Top Tier: Monograph Identity & Commission Intake */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
          <div className="max-w-xl">
            <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#E29B4A] block mb-2">
              CLIENT PRIVILEGE PROTOCOL // MMXXVI
            </span>
            <span className="font-serif text-4xl sm:text-5xl font-light tracking-widest uppercase text-[#BDD8E9]">
              Aurelia
            </span>
            <p className="mt-3 font-sans text-xs sm:text-sm text-[#6EA2B3] leading-relaxed">
              The Horizon Monograph documents private high-altitude residential commissions, mechanical horology calibers, and bespoke aviation syndicates. Inquiries are subject to mandatory identity verification and strict non-disclosure covenants.
            </p>

            {/* Live Global Atelier Clocks */}
            <div className="mt-6 flex flex-wrap items-center gap-5 font-mono text-[10px] text-[#4E8EA2] bg-[#001D39]/80 px-4 py-2.5 rounded-full border border-[#BDD8E9]/15 w-fit">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3 h-3 text-[#E29B4A]" />
                <span className="text-[#BDD8E9]">GVA: {times.geneva}</span>
              </div>
              <span className="text-[#49769F]">|</span>
              <div>
                <span className="text-[#BDD8E9]">DXB: {times.dubai}</span>
              </div>
              <span className="text-[#49769F]">|</span>
              <div>
                <span className="text-[#BDD8E9]">TYO: {times.tokyo}</span>
              </div>
              <span className="text-[#49769F]">|</span>
              <div>
                <span className="text-[#BDD8E9]">MCM: {times.monaco}</span>
              </div>
            </div>
          </div>

          {/* Confidential Access Input */}
          <div className="w-full lg:w-auto">
            {submitted ? (
              <div className="glass-marine border border-[#E29B4A]/50 p-6 rounded-2xl flex items-center gap-4 max-w-md shadow-2xl">
                <CheckCircle2 className="w-6 h-6 text-[#E29B4A] shrink-0" />
                <div>
                  <h4 className="font-serif text-lg text-[#BDD8E9]">Access Token Dispatched</h4>
                  <p className="font-sans text-xs text-[#6EA2B3] mt-1">
                    An atelier partner will establish contact via end-to-end encrypted protocol within 12 hours.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-[#4E8EA2] absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value)}
                    placeholder="CLIENT EMAIL / ACCESS CODE"
                    required
                    className="bg-[#001D39] border border-[#49769F]/40 pl-11 pr-6 py-4 rounded-full font-mono text-xs text-[#BDD8E9] placeholder-[#4E8EA2] focus:outline-none focus:border-[#E29B4A] w-full sm:w-80 shadow-inner"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#E29B4A] text-[#001224] px-8 py-4 rounded-full font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#F5A642] transition-colors duration-300 flex items-center justify-center gap-2 shrink-0 shadow-lg"
                >
                  <span>Request Entry</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}

            <div className="mt-3 flex items-center gap-2 font-mono text-[9px] uppercase tracking-wider text-[#4E8EA2]">
              <Shield className="w-3 h-3 text-[#E29B4A]" />
              <span>STRICT NON-DISCLOSURE // ENCRYPTED DUAL-CHANNEL PIPELINE</span>
            </div>
          </div>
        </div>

        {/* Middle Tier: 4 Pillars Summary Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-12 border-t border-[#49769F]/20 font-mono text-[10px]">
          <div className="border-l border-[#E29B4A]/30 pl-4">
            <span className="text-[#E29B4A] block uppercase">01 / ARCHITECTURE</span>
            <span className="text-[#BDD8E9] text-xs font-serif mt-1 block">Elevation 412M Towers</span>
            <p className="font-sans text-[11px] text-[#6EA2B3] mt-1">
              Acoustic living sanctuaries hovering over coastlines with 450T kinetic mass damping.
            </p>
          </div>
          <div className="border-l border-[#BDD8E9]/30 pl-4">
            <span className="text-[#BDD8E9] block uppercase">02 / HOROLOGY</span>
            <span className="text-[#BDD8E9] text-xs font-serif mt-1 block">Caliber 9001 Tourbillon</span>
            <p className="font-sans text-[11px] text-[#6EA2B3] mt-1">
              Micro-mechanical structural sculpture operating at 28,800 VPH with Geneva Seal.
            </p>
          </div>
          <div className="border-l border-[#7BBDE8]/30 pl-4">
            <span className="text-[#7BBDE8] block uppercase">03 / HYDRODYNAMICS</span>
            <span className="text-[#BDD8E9] text-xs font-serif mt-1 block">Riviera 88M Superyachts</span>
            <p className="font-sans text-[11px] text-[#6EA2B3] mt-1">
              Carbon displacement hulls engineered for 32-knot smooth transit along Mediterranean waters.
            </p>
          </div>
          <div className="border-l border-[#F5A642]/30 pl-4">
            <span className="text-[#F5A642] block uppercase">04 / STRATOSPHERE</span>
            <span className="text-[#BDD8E9] text-xs font-serif mt-1 block">Mach 0.88 Flight Corridors</span>
            <p className="font-sans text-[11px] text-[#6EA2B3] mt-1">
              Private aviation syndicates connecting Dubai, Geneva, Tokyo, and Monaco directly.
            </p>
          </div>
        </div>

        {/* Bottom Tier: Legal & Architect Credits */}
        <div className="pt-8 border-t border-[#49769F]/15 flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono text-[#4E8EA2] gap-4">
          <span>© MMXXVI AURELIA ATELIER. ALL RIGHTS RESERVED.</span>
          <span>ARCHITECTED & DIRECTED BY RAY // MIDNIGHT MARINE PRODUCTION PIPELINE</span>
        </div>
      </div>
    </footer>
  );
}
