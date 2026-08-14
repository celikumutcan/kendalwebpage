"use client";

import React, { useRef } from "react";
import { gsap } from "@/lib/gsapConfig";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import { useLanguage } from "@/app/i18n/LanguageProvider";
import Image from "next/image";
import { getAssetPath } from "@/utils/basePath";

const STATS = [
  { value: 29, label: "Yıllık Tecrübe", suffix: "" },
  { value: 22000, label: "m² Kapalı Alan", suffix: "" },
  { value: 350, label: "İstihdam", suffix: "+" },
  { value: 80, label: "Yıllık Üretim Kapasitesi", suffix: " Milyon+" },
  { value: 1000, label: "Çeşit Farklı Ürün", suffix: "+" },
  { value: 540, label: "Türkiye Çapında Bayi", suffix: "+" },
];

export const CompanyStats = () => {
  const containerRef = useRef<HTMLElement>(null);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const { t } = useLanguage();
  const statData = (t as any).company_stats?.stats || STATS;

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Counter Animation
      STATS.forEach((stat, index) => {
        const el = numberRefs.current[index];
        if (el) {
          const obj = { val: 0 };
          gsap.to(obj, {
            val: stat.value,
            duration: 4.0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".stats-grid",
              start: "top 85%",
            },
            onUpdate: () => {
              if (el) {
                el.innerHTML = Math.round(obj.val).toLocaleString('tr-TR') + (statData[index]?.suffix || stat.suffix);
              }
            }
          });
        }
      });

      // Photo Parallax & Fade-in
      gsap.fromTo(
        ".photo-card",
        { opacity: 0, y: 40, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          }
        }
      );

      // Stats Grid Animation
      gsap.fromTo(
        ".stat-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: ".stats-grid",
            start: "top 85%",
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [statData]);

  return (
    <section id="stats" ref={containerRef} className="py-24 md:py-32 bg-[#050505] text-white relative w-full border-y border-white/5 overflow-hidden">
      
      {/* Background ambient glows */}
      <div className="absolute top-0 right-1/4 w-[800px] h-[800px] bg-[var(--brand-red)]/5 blur-[150px] rounded-full mix-blend-screen pointer-events-none z-0" />
      
      {/* Blue light from the right shining on stats */}
      <div className="absolute top-[50%] -right-[200px] w-[1200px] h-[900px] bg-blue-500/25 blur-[180px] rounded-[100%] mix-blend-screen pointer-events-none z-0" />
      
      <div className="max-w-[90rem] mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Title Section */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
            {(t as any).company_stats?.title_part1 || "Aydınlatmada"} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand-red)] to-red-500">{(t as any).company_stats?.title_part2 || "Türkiye'nin"}</span> {(t as any).company_stats?.title_part3 || "Gururu"}
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-[var(--brand-red)] to-transparent rounded-full mx-auto"></div>
        </div>

        {/* Jumbo Cinematic Photo */}
        <div className="photo-card relative w-full aspect-[16/9] lg:aspect-[21/9] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 mb-12 lg:mb-20 group">
          <Image 
            src={getAssetPath("/images/fabric-photo.webp")}
            alt="Kendal Elektrik Factory"
            fill
            className="object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-105"
            quality={100}
            priority
          />
          {/* Subtle vignette/gradient for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
          
          <div className="absolute bottom-6 left-6 md:bottom-10 md:left-12 flex flex-col">
            <span className="text-white font-bold text-2xl md:text-4xl tracking-tight drop-shadow-lg mb-2">Kendal Elektrik</span>
            <span className="text-white/80 font-medium text-sm md:text-lg tracking-wide flex items-center gap-2">
              <svg className="w-5 h-5 text-[var(--brand-red)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {(t as any).company_stats?.location_label || "İstanbul, Türkiye Üretim Tesisleri"}
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {STATS.map((stat, idx) => {
            const isHighlight = idx === 0;
            return (
              <div 
                key={idx} 
                className="stat-card group relative bg-black/40 backdrop-blur-2xl border border-white/5 hover:border-[var(--brand-red)]/60 shadow-[0_0_30px_rgba(255,0,0,0.08)] hover:shadow-[0_0_50px_rgba(255,0,0,0.3)] rounded-[1.5rem] overflow-hidden transition-all duration-700 flex flex-col justify-end items-start p-6 md:p-8 min-h-[140px] md:min-h-[160px]"
              >
                {/* Constant light source effect from top right */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[var(--brand-red)]/20 via-[#100505]/40 to-transparent opacity-80 group-hover:from-[var(--brand-red)]/40 group-hover:opacity-100 transition-all duration-700 pointer-events-none z-0"></div>
                
                {/* Subtle blue highlight on the right edge mimicking the global light source */}
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-blue-500/15 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0"></div>
                
                {/* Intense Inner glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[var(--brand-red)]/0 via-transparent to-white/0 group-hover:from-[var(--brand-red)]/30 group-hover:to-[var(--brand-red)]/5 transition-all duration-700"></div>
                
                {/* Subtle top highlight */}
                <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[var(--brand-red)]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-[1px]"></div>
                
                <div className="relative z-10 w-full">
                  <div className={`font-black tracking-tighter mb-2 md:mb-3 transition-transform duration-500 group-hover:scale-105 origin-bottom-left ${isHighlight ? 'text-5xl md:text-6xl text-[var(--brand-red)] drop-shadow-[0_0_20px_rgba(255,0,0,0.6)]' : 'text-4xl md:text-5xl text-white group-hover:text-red-50 group-hover:drop-shadow-[0_0_15px_rgba(255,50,50,0.4)]'}`}>
                    <span ref={(el) => { numberRefs.current[idx] = el; }} suppressHydrationWarning>
                      {/* GSAP fills this */}
                    </span>
                  </div>
                  <div className="w-12 h-0.5 bg-white/20 mb-2 md:mb-3 group-hover:bg-[var(--brand-red)]/50 transition-colors duration-500"></div>
                  <div className={`text-white/70 uppercase tracking-widest transition-colors duration-300 group-hover:text-white ${isHighlight ? 'text-sm md:text-base font-bold' : 'text-xs md:text-sm font-medium'}`}>
                    {statData[idx]?.label || stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
