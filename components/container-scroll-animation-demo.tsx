"use client";

import React, { useRef, useState } from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";

export default function HeroScrollVideoDemo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const sectionRef = useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
          setIsPlaying(true);
        } else {
          video.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section ref={sectionRef} id="stage-cinema" className="relative flex flex-col overflow-hidden bg-[#F7F5F0] py-16">
      <ContainerScroll
        titleComponent={
          <div className="flex flex-col items-center">
            <span className="font-mono text-xs uppercase tracking-[0.35em] text-[#A37B48] mb-3">
              STAGE 02 // CINEMATIC REEL
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-[#171614] leading-tight">
              The Cinema Deck <br />
              <span className="text-[#A37B48] font-light italic">Motion Architecture</span>
            </h2>
            <p className="mt-4 font-sans text-xs sm:text-sm text-[#736F68] max-w-xl mx-auto">
              Dynamic perspective showcase encompassing private aviation trajectories, superyacht Mediterranean sea-trials, and haute horlogerie calibers.
            </p>
          </div>
        }
      >
        <div className="relative w-full h-full group">
          <video
            ref={videoRef}
            src="/assets/explore.mp4"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover"
          />

          {/* Video Controls Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#171614]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-6">
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="p-3 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md text-white border border-white/30 transition-colors duration-200"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>

              <button
                onClick={toggleMute}
                className="p-3 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md text-white border border-white/30 transition-colors duration-200"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              <div className="hidden sm:flex flex-col font-mono text-[9px] uppercase tracking-widest text-white/80">
                <span>MASTER REEL 4K // 60 FPS</span>
                <span className="text-[#E29B4A]">DIRECTOR CUT // RAY ATELIER</span>
              </div>
            </div>

            <div className="font-mono text-[9px] uppercase tracking-widest text-white/60">
              AURELIA ARCHIVES
            </div>
          </div>
        </div>
      </ContainerScroll>
    </section>
  );
}
