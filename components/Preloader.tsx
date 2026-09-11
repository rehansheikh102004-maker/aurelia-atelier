"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  progress: number;
  isReady: boolean;
}

export function Preloader({ progress, isReady }: PreloaderProps) {
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    if (isReady && progress >= 100) {
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isReady, progress]);

  return (
    <AnimatePresence>
      {shouldRender && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col justify-between p-8 md:p-16 bg-[#001D39] text-[#BDD8E9] select-none pointer-events-auto"
        >
          {/* Top Telemetry */}
          <div className="flex justify-between items-center font-mono text-[10px] uppercase tracking-[0.3em] text-[#6EA2B3]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E29B4A] animate-pulse" />
              <span className="text-[#BDD8E9]">AURELIA // THE HORIZON ATELIER</span>
            </div>
            <span className="text-[#4E8EA2]">EDITION MMXXVI</span>
          </div>

          {/* Center Brand Monogram & Progress */}
          <div className="my-auto text-center flex flex-col items-center">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="font-serif text-5xl md:text-8xl font-light tracking-[0.2em] uppercase text-[#BDD8E9]"
            >
              Aurelia
            </motion.h1>

            <motion.p
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-4 font-sans text-xs md:text-sm text-[#6EA2B3] tracking-[0.25em] uppercase"
            >
              Haute Architecture • Precision Horology • Sky Syndicates
            </motion.p>

            {/* Gold Hairline Progress Bar */}
            <div className="mt-12 w-64 md:w-80 flex flex-col items-center">
              <div className="relative w-full h-[1.5px] bg-[#BDD8E9]/15 overflow-hidden rounded-full">
                <motion.div
                  className="absolute top-0 left-0 bottom-0 bg-[#E29B4A] shadow-[0_0_12px_#E29B4A]"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut", duration: 0.25 }}
                />
              </div>

              <div className="mt-4 flex justify-between w-full font-mono text-[10px] tracking-[0.25em] text-[#E29B4A]">
                <span className="text-[#6EA2B3]">BUFFERING STREAM</span>
                <span>{progress}%</span>
              </div>
            </div>
          </div>

          {/* Bottom Telemetry */}
          <div className="flex flex-col md:flex-row justify-between items-center font-mono text-[9px] uppercase tracking-[0.3em] text-[#4E8EA2] gap-2">
            <span>25°11&apos;47&quot;N 55°16&apos;28&quot;E</span>
            <span>INITIALIZING 120 FPS STREAM ENGINE</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
