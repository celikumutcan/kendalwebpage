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
  { value: 80, label: "Milyon+ Yıllık Üretim Kapasitesi", suffix: "" },
  { value: 1000, label: "Çeşit Farklı Ürün", suffix: "+" },
  { value: 540, label: "Türkiye Çapında Bayi", suffix: "+" },
];

export const CompanyStats = () => {
  const containerRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const { t } = useLanguage();
  const statData = (t as any).company_stats?.stats || STATS;

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect for the background
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          yPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      }

      STATS.forEach((stat, index) => {
        const el = numberRefs.current[index];
        if (el) {
          const obj = { val: 0 };
          gsap.to(obj, {
            val: stat.value,
            duration: 7.0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
            },
            onUpdate: () => {
              if (el) {
                el.innerHTML = Math.round(obj.val).toLocaleString('tr-TR') + stat.suffix;
              }
            }
          });
        }
      });

      gsap.fromTo(
        ".stat-item",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="stats" ref={containerRef} className="py-24 md:py-32 min-h-[70vh] md:min-h-[750px] flex items-center relative border-y border-white/10 overflow-hidden bg-black text-white w-full">
      {/* Background Image with Parallax */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div ref={bgRef} className="absolute -top-[20%] -bottom-[20%] -left-[10%] -right-[10%] w-[120%] h-[140%]">
          <Image 
            src={getAssetPath("/images/fabric-photo.png")}
            alt="Factory Background"
            fill
            sizes="100vw"
            quality={75}
            className="object-cover opacity-90"
          />
        </div>
        {/* Subtle uniform overlay for text readability without obscuring any specific part of the photo */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full">
        
        {/* Top Text Section */}
        <div className="flex flex-col mb-16 items-center md:items-start">
          <div className="inline-flex flex-col bg-black/40 backdrop-blur-xl px-8 py-5 rounded-3xl border border-[var(--brand-red)]/30 shadow-[0_8px_32px_rgba(227,0,15,0.15)] transition-all duration-500 hover:bg-black/50 hover:border-[var(--brand-red)]/60 hover:shadow-[0_8px_32px_rgba(227,0,15,0.3)]">
            <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-white mb-3 tracking-tight leading-tight drop-shadow-xl whitespace-nowrap">
              {(t as any).company_stats?.title_part1 || "Aydınlatmada"} <span className="text-[var(--brand-red)]">{(t as any).company_stats?.title_part2 || "Türkiye'nin"}</span> {(t as any).company_stats?.title_part3 || "Gururu"}
            </h2>
            <div className="w-16 h-1 bg-[var(--brand-red)] rounded-full shadow-[0_0_10px_rgba(227,0,15,0.5)]"></div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {STATS.map((stat, idx) => {
            const cardStyles = [
              { border: "border-[var(--brand-red)]/30", hoverBorder: "hover:border-[var(--brand-red)]/70", shadow: "shadow-[0_8px_32px_rgba(227,0,15,0.15)]", hoverShadow: "hover:shadow-[0_8px_32px_rgba(227,0,15,0.3)]", glow: "from-[var(--brand-red)]/20", line: "border-[var(--brand-red)]" },
              { border: "border-blue-500/30", hoverBorder: "hover:border-blue-500/70", shadow: "shadow-[0_8px_32px_rgba(59,130,246,0.15)]", hoverShadow: "hover:shadow-[0_8px_32px_rgba(59,130,246,0.3)]", glow: "from-blue-500/20", line: "border-blue-500" },
              { border: "border-emerald-500/30", hoverBorder: "hover:border-emerald-500/70", shadow: "shadow-[0_8px_32px_rgba(16,185,129,0.15)]", hoverShadow: "hover:shadow-[0_8px_32px_rgba(16,185,129,0.3)]", glow: "from-emerald-500/20", line: "border-emerald-500" },
              { border: "border-amber-500/30", hoverBorder: "hover:border-amber-500/70", shadow: "shadow-[0_8px_32px_rgba(245,158,11,0.15)]", hoverShadow: "hover:shadow-[0_8px_32px_rgba(245,158,11,0.3)]", glow: "from-amber-500/20", line: "border-amber-500" },
              { border: "border-purple-500/30", hoverBorder: "hover:border-purple-500/70", shadow: "shadow-[0_8px_32px_rgba(168,85,247,0.15)]", hoverShadow: "hover:shadow-[0_8px_32px_rgba(168,85,247,0.3)]", glow: "from-purple-500/20", line: "border-purple-500" },
              { border: "border-cyan-500/30", hoverBorder: "hover:border-cyan-500/70", shadow: "shadow-[0_8px_32px_rgba(6,182,212,0.15)]", hoverShadow: "hover:shadow-[0_8px_32px_rgba(6,182,212,0.3)]", glow: "from-cyan-500/20", line: "border-cyan-500" }
            ];
            const style = cardStyles[idx % cardStyles.length];
            
            return (
            <div key={idx} className={`bg-black/40 backdrop-blur-xl p-6 md:p-8 rounded-3xl border ${style.border} ${style.hoverBorder} hover:bg-black/50 ${style.shadow} ${style.hoverShadow} transition-all duration-500 group relative overflow-hidden hover:-translate-y-1`}>
              <div className={`absolute -inset-x-0 -bottom-1/2 h-full bg-gradient-to-t ${style.glow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>
              <div className={`stat-item flex flex-col items-start border-l-4 ${style.line} pl-5 relative z-10`}>
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 tracking-tighter flex items-center group-hover:scale-105 transition-transform duration-300 origin-left drop-shadow-lg">
                  <span ref={(el) => { numberRefs.current[idx] = el; }} suppressHydrationWarning>
                    {stat.value.toLocaleString('tr-TR')}{statData[idx]?.suffix || stat.suffix}
                  </span>
                </div>
                <div className="text-white/70 text-xs md:text-sm font-semibold tracking-wider uppercase group-hover:text-white transition-colors duration-300 drop-shadow-md">
                  {statData[idx]?.label || stat.label}
                </div>
              </div>
            </div>
          )})}
        </div>
      </div>
    </section>
  );
};
