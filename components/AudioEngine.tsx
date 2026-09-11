"use client";

import React, { useState, useRef } from "react";

export function AudioEngine() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleSound = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.volume = 0.25;
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  return (
    <div className="fixed bottom-6 right-6 sm:right-8 z-40">
      <audio ref={audioRef} loop src="/audio/ambient-monograph.mp3" preload="none" />
      <button
        onClick={toggleSound}
        aria-label="Toggle ambient sound"
        className="flex items-center gap-2.5 rounded-full border border-[#BDD8E9]/20 bg-[#001224]/80 px-4 py-2 backdrop-blur-md transition-all hover:border-[#E29B4A] shadow-lg"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest text-[#BDD8E9]">
          Sound: {isPlaying ? "On" : "Off"}
        </span>
        <div className="flex items-end gap-[2px] h-3">
          <span
            className={`w-[2px] bg-[#E29B4A] transition-all duration-300 ${
              isPlaying ? "h-3 animate-pulse" : "h-1"
            }`}
          />
          <span
            className={`w-[2px] bg-[#E29B4A] transition-all duration-300 ${
              isPlaying ? "h-2 animate-pulse delay-75" : "h-1"
            }`}
          />
          <span
            className={`w-[2px] bg-[#E29B4A] transition-all duration-300 ${
              isPlaying ? "h-3.5 animate-pulse delay-150" : "h-1"
            }`}
          />
        </div>
      </button>
    </div>
  );
}
