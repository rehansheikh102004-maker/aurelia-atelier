"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";

const World = dynamic(() => import("@/components/ui/globe").then((m) => m.World), {
  ssr: false,
});

export default function FlightCorridorShowcase() {
  const [selectedHub, setSelectedHub] = useState("Dubai");

  const globeConfig = {
    pointSize: 2.2,
    globeColor: "#001224",
    showAtmosphere: true,
    atmosphereColor: "#7BBDE8",
    atmosphereAltitude: 0.18,
    emissive: "#001D39",
    emissiveIntensity: 0.35,
    shininess: 0.95,
    polygonColor: "rgba(73, 118, 159, 0.45)",
    ambientLight: "#49769F",
    directionalLeftLight: "#BDD8E9",
    directionalTopLight: "#E29B4A",
    pointLight: "#E29B4A",
    arcTime: 2000,
    arcLength: 0.85,
    rings: 1,
    maxRings: 3,
    initialPosition: { lat: 25.2048, lng: 55.2708 },
    autoRotate: true,
    autoRotateSpeed: 0.7,
  };

  const arcs = [
    { order: 1, startLat: 25.2048, startLng: 55.2708, endLat: 51.5074, endLng: -0.1278, arcAlt: 0.35, color: "#E29B4A" },
    { order: 2, startLat: 51.5074, startLng: -0.1278, endLat: 40.7128, endLng: -74.006, arcAlt: 0.4, color: "#F5A642" },
    { order: 3, startLat: 25.2048, startLng: 55.2708, endLat: 35.6762, endLng: 139.6503, arcAlt: 0.45, color: "#BDD8E9" },
    { order: 4, startLat: 43.7384, startLng: 7.4246, endLat: 25.2048, endLng: 55.2708, arcAlt: 0.3, color: "#E29B4A" },
    { order: 5, startLat: 46.2044, startLng: 6.1432, endLat: 1.3521, endLng: 103.8198, arcAlt: 0.5, color: "#F5A642" },
  ];

  const hubs = [
    { code: "DXB", name: "Dubai", coords: "25.20° N", mach: "MACH 0.88" },
    { code: "GVA", name: "Geneva", coords: "46.20° N", mach: "MACH 0.90" },
    { code: "HND", name: "Tokyo", coords: "35.67° N", mach: "MACH 0.85" },
    { code: "MCO", name: "Monaco", coords: "43.73° N", mach: "MACH 0.82" },
  ];

  return (
    <section
      id="stage-globe"
      className="relative bg-[#001D39] py-28 px-4 flex flex-col items-center justify-center overflow-hidden border-t border-[#49769F]/20"
    >
      <div className="text-center max-w-2xl z-20">
        <span className="font-mono text-xs uppercase tracking-[0.35em] text-[#E29B4A]">
          TACTICAL FLIGHT OPERATIONS // STAGE 05
        </span>
        <h2 className="mt-3 font-serif text-4xl sm:text-6xl font-light text-[#BDD8E9] tracking-tight">
          Transcontinental Corridors
        </h2>
        <p className="mt-2 font-sans text-xs text-[#6EA2B3]">
          Supersonic private transit corridors linking the primary ateliers.
        </p>
      </div>

      {/* 3D WebGL Globe Stage */}
      <div className="relative w-full max-w-6xl h-[34rem] sm:h-[44rem] flex items-center justify-center">
        <World data={arcs} globeConfig={globeConfig} />
      </div>

      {/* Tactical Radar Departure Terminal */}
      <div className="relative z-20 max-w-4xl mx-auto w-full px-6 -mt-10">
        <div className="glass-marine rounded-2xl p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {hubs.map((hub) => (
            <button
              key={hub.code}
              onClick={() => setSelectedHub(hub.name)}
              className={`p-3 rounded-xl border text-left transition-all ${
                selectedHub === hub.name
                  ? "border-[#E29B4A] bg-[#0A4174]/40"
                  : "border-transparent hover:border-[#49769F]/40 hover:bg-[#001224]/30"
              }`}
            >
              <div className="flex items-center justify-between font-mono text-xs text-[#E29B4A]">
                <span>{hub.code}</span>
                <span className="text-[9px] text-[#6EA2B3]">{hub.mach}</span>
              </div>
              <span className="font-serif text-lg text-[#BDD8E9] block mt-1">{hub.name}</span>
              <span className="font-mono text-[9px] text-[#4E8EA2] block">{hub.coords}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
