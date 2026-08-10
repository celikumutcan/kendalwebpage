"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/app/i18n/LanguageProvider";
import { gsap } from "@/lib/gsapConfig";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";

export const CompanyVideo = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        videoRef.current,
        { opacity: 0, scale: 0.95, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="company-video"
      ref={containerRef}
      className="relative w-full pt-12 pb-24 md:pt-16 md:pb-32 px-6 bg-black text-white overflow-hidden flex flex-col items-center justify-center"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--brand-red)] opacity-[0.04] rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center">
        <div className="flex flex-col items-center mb-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 pb-2 md:pb-4 leading-normal">
            {(t as any).company_video?.discover || "Işığın Arkasındaki Gücü Keşfedin"}
          </h2>
        </div>
        
        <div 
          ref={videoRef}
          className="w-full relative group"
        >
          {/* LED Ambilight Glow Effect */}
          <div className="absolute -inset-2 md:-inset-4 bg-gradient-to-r from-[var(--brand-red)] via-orange-500 to-[var(--brand-red)] rounded-[2.5rem] md:rounded-[3rem] opacity-50 blur-2xl md:blur-3xl group-hover:opacity-75 transition-opacity duration-700 animate-pulse pointer-events-none" />
          
          {/* Video Container */}
          <div className="w-full aspect-video rounded-3xl overflow-hidden border border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.8)] relative z-10 bg-black cursor-pointer group/video" onClick={() => setIsPlaying(true)}>
            {!isPlaying ? (
              <>
                <Image 
                  src="/images/uretim/uretim-4.webp"
                  alt="Kendal Elektrik Corporate Video Thumbnail"
                  fill
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-cover transition-transform duration-700 group-hover/video:scale-105 opacity-80 group-hover/video:opacity-100"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-[var(--brand-red)] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,0,0,0.6)] transform transition-transform duration-300 group-hover/video:scale-110">
                    <svg className="w-8 h-8 text-white translate-x-[2px]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </>
            ) : (
              <iframe
                className="w-full h-full object-cover"
                src="https://www.youtube.com/embed/NxqB0GMRQJw?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1"
                title="Kendal Elektrik Corporate Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
