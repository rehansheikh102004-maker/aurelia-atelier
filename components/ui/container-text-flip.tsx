"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ContainerTextFlipProps {
  words: string[];
  duration?: number;
  className?: string;
  textClassName?: string;
}

export function ContainerTextFlip({
  words,
  duration = 2600,
  className = "",
  textClassName = "",
}: ContainerTextFlipProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);

    return () => clearInterval(interval);
  }, [words.length, duration]);

  return (
    <span
      className={`inline-flex items-center justify-center relative overflow-hidden h-[1.25em] min-w-[200px] sm:min-w-[280px] align-middle mx-2.5 px-4 rounded-xl border border-[#BDD8E9]/25 bg-[#0A4174]/50 backdrop-blur-md shadow-sm ${className}`}
    >
      <AnimatePresence mode="popLayout">
        <motion.span
          key={words[index]}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -30, opacity: 0 }}
          transition={{
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
          }}
          className={`font-serif italic font-light whitespace-nowrap text-[#E29B4A] ${textClassName}`}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
