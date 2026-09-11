"use client";

import { useState, useEffect } from "react";

export function useDeviceDetect() {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      setIsMobile(width < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { isMobile, windowWidth };
}
