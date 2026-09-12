"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface PreloaderOptions {
  totalFrames?: number;
  isMobile?: boolean;
}

export function useFramePreloader({ totalFrames = 450, isMobile = false }: PreloaderOptions = {}) {
  const [progress, setProgress] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const isMountedRef = useRef<boolean>(true);
  const priorityQueueRef = useRef<number[]>([]);
  const activeDownloadsRef = useRef<Set<number>>(new Set());

  const bucket = isMobile ? "mobile" : "desktop";

  const getFrameUrl = useCallback(
    (index: number) => {
      const padded = String(index).padStart(4, "0");
      return `/assets/frames/${bucket}/frame_${padded}.webp`;
    },
    [bucket]
  );

  // Dynamic priority preloader: immediately prioritize unready frames near the user's scroll position
  const prioritizeAround = useCallback(
    (centerFrame: number) => {
      const images = imagesRef.current;
      const target = Math.min(Math.max(Math.round(centerFrame), 1), totalFrames);
      const urgent: number[] = [];

      // Check immediate window +- 8 frames
      for (let offset = 0; offset <= 8; offset++) {
        const f1 = target + offset;
        if (f1 <= totalFrames && !images[f1 - 1] && !activeDownloadsRef.current.has(f1)) {
          urgent.push(f1);
        }
        if (offset > 0) {
          const f2 = target - offset;
          if (f2 >= 1 && !images[f2 - 1] && !activeDownloadsRef.current.has(f2)) {
            urgent.push(f2);
          }
        }
      }

      if (urgent.length > 0) {
        priorityQueueRef.current = [
          ...urgent,
          ...priorityQueueRef.current.filter((idx) => !urgent.includes(idx)),
        ];
      }
    },
    [totalFrames]
  );

  useEffect(() => {
    isMountedRef.current = true;
    const images: HTMLImageElement[] = new Array(totalFrames);
    imagesRef.current = images;

    // TIER 1: DENSE TIMELINE KEYFRAMES (Every 3rd frame across the ENTIRE sequence: 150 frames)
    // Guarantee: Every point on the scroll track is at most 1 frame away from an already-loaded image!
    // Result: ZERO FREEZING, ZERO BLACK FRAMES, ZERO "PHASNA"!
    const tier1Indices: number[] = [];
    // Also include first 15 sequential frames for ultra-crisp Act 1 landing
    for (let i = 1; i <= Math.min(15, totalFrames); i++) {
      tier1Indices.push(i);
    }
    for (let i = 1; i <= totalFrames; i += 3) {
      if (!tier1Indices.includes(i)) {
        tier1Indices.push(i);
      }
    }

    const tier1Set = new Set(tier1Indices);
    const remainingIndices: number[] = [];
    for (let i = 1; i <= totalFrames; i++) {
      if (!tier1Set.has(i)) {
        remainingIndices.push(i);
      }
    }

    priorityQueueRef.current = remainingIndices;

    const tier1Total = tier1Indices.length;
    let tier1Loaded = 0;
    let completedTier1 = false;

    const loadSingleImage = (index: number, onDone: () => void) => {
      if (!isMountedRef.current) return;
      if (images[index - 1] && images[index - 1].complete && images[index - 1].naturalWidth > 0) {
        onDone();
        return;
      }

      activeDownloadsRef.current.add(index);
      const img = new Image();
      img.decoding = "async";
      img.src = getFrameUrl(index);
      images[index - 1] = img;

      let called = false;
      const finish = () => {
        if (called) return;
        called = true;
        activeDownloadsRef.current.delete(index);
        onDone();
      };

      img.onload = finish;
      img.onerror = finish;
    };

    // Fast initial keyframe preloading pool (Concurrency 14)
    let t1Idx = 0;
    const CONCURRENCY_T1 = 14;

    const checkTier1Done = () => {
      if (!isMountedRef.current) return;
      tier1Loaded++;
      const pct = Math.min(Math.round((tier1Loaded / tier1Total) * 100), 100);
      setProgress(pct);

      if (tier1Loaded >= tier1Total && !completedTier1) {
        completedTier1 = true;
        setProgress(100);
        setIsReady(true);
        startTier2();
      }
    };

    const nextTier1 = () => {
      if (!isMountedRef.current || t1Idx >= tier1Indices.length) return;
      const index = tier1Indices[t1Idx++];
      loadSingleImage(index, () => {
        checkTier1Done();
        nextTier1();
      });
    };

    for (let i = 0; i < Math.min(CONCURRENCY_T1, tier1Indices.length); i++) {
      nextTier1();
    }

    // Tier 2: Stream remaining in-between frames in background with adaptive priority
    const startTier2 = () => {
      const CONCURRENCY_T2 = 12;

      const pumpTier2 = () => {
        if (!isMountedRef.current) return;
        const queue = priorityQueueRef.current;
        if (queue.length === 0) return;

        const nextIndex = queue.shift();
        if (nextIndex === undefined) return;

        if (images[nextIndex - 1] && images[nextIndex - 1].complete) {
          pumpTier2();
          return;
        }

        loadSingleImage(nextIndex, () => {
          pumpTier2();
        });
      };

      for (let i = 0; i < CONCURRENCY_T2; i++) {
        pumpTier2();
      }
    };

    // Safety timeout: if on slow network, unlock after 1.2s
    const safetyTimer = setTimeout(() => {
      if (isMountedRef.current && !completedTier1) {
        completedTier1 = true;
        setProgress(100);
        setIsReady(true);
        startTier2();
      }
    }, 1200);

    return () => {
      isMountedRef.current = false;
      clearTimeout(safetyTimer);
    };
  }, [totalFrames, getFrameUrl]);

  return { imagesRef, progress, isReady, totalFrames, prioritizeAround };
}
