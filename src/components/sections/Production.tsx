"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useLanguage } from "@/app/i18n/LanguageProvider";
import { gsap } from "@/lib/gsapConfig";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import { getAssetPath } from "@/utils/basePath";

export const Production = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const prod = (t as any).production;

  useIsomorphicLayoutEffect(() => {
    if (!prod) return;
    const ctx = gsap.context(() => {
      // Cinematic fade up
      const elements = gsap.utils.toArray(".prod-reveal");
      gsap.fromTo(
        elements,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );

      // Stat counters animation
      const statElements = gsap.utils.toArray(".stat-num");
      statElements.forEach((el: any) => {
        const targetValue = parseFloat(el.getAttribute("data-value"));
        const suffix = el.getAttribute("data-suffix") || "";
        const obj = { val: 0 };

        gsap.to(obj, {
          val: targetValue,
          duration: 3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
          },
          onUpdate: () => {
            el.innerHTML = Math.round(obj.val) + suffix;
          },
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, [prod]);

  if (!prod) return null;

  return (
    <section
      id="production"
      ref={containerRef}
      className="relative w-full bg-transparent py-32 px-6 overflow-hidden"
    >
      {/* LED Strip Illumination Concept (Tech/Neon) */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-[#00f3ff] opacity-40 shadow-[0_0_20px_#00f3ff]" />
      <div className="absolute bottom-0 right-0 w-full h-[2px] bg-[#00f3ff] opacity-40 shadow-[0_0_20px_#00f3ff]" />
      
      <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-screen">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vh]" style={{ background: 'radial-gradient(ellipse at center, rgba(0,243,255,0.15) 0%, transparent 70%)' }} />
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulse-scale {
          0%, 100% { transform: scale(1); opacity: 0.1; }
          50% { transform: scale(1.1); opacity: 0.3; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}} />

      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold mb-20 text-center text-[var(--global-text)] prod-reveal">
          {prod.title}
        </h2>

        {/* Top Section: Image left, Text right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden prod-reveal group shadow-2xl">
            <Image
              src={getAssetPath("/images/production/uretim-1.jpg")}
              alt="Kendal Elektrik Üretim Tesisi 1"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:opacity-0 transition-opacity duration-700" />
          </div>
          <div className="space-y-8 prod-reveal text-[var(--global-text)] opacity-90 leading-relaxed text-lg md:text-xl font-light text-justify">
            <p>{prod.text1}</p>
          </div>
        </div>

        {/* Stats Section with Energy Rings */}
        <div 
          ref={statsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32 prod-reveal relative"
        >
          {[
            { value: "60", suffix: "M+", label: prod.stat1_label },
            { value: "200", suffix: "", label: prod.stat2_label },
            { value: "97", suffix: "/100", label: prod.stat3_label }
          ].map((stat, i) => (
            <div key={i} className="relative flex flex-col items-center justify-center p-10 group">
              {/* Energy Rings Background */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30 group-hover:opacity-60 transition-opacity duration-700">
                <svg className="w-48 h-48 absolute" viewBox="0 0 100 100" style={{ animation: 'spin-slow 15s linear infinite' }}>
                  <circle cx="50" cy="50" r="48" fill="none" stroke="#00f3ff" strokeWidth="0.5" strokeDasharray="4 8" />
                  <circle cx="50" cy="50" r="42" fill="none" stroke="#00f3ff" strokeWidth="1.5" strokeDasharray="20 10" opacity="0.8" />
                </svg>
                <div className="w-32 h-32 bg-[#00f3ff] rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
              </div>
              
              <div 
                className="stat-num text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[var(--global-text)] to-[var(--accent-current)] mb-4 drop-shadow-lg relative z-10"
                data-value={stat.value}
                data-suffix={stat.suffix}
              >
                0{stat.suffix}
              </div>
              <div className="text-[var(--global-text)] opacity-70 font-medium tracking-widest uppercase text-sm relative z-10 text-center">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section: Text left, Image right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 prod-reveal text-[var(--global-text)] opacity-90 leading-relaxed text-lg md:text-xl font-light lg:order-1 order-2 text-justify">
            <p>{prod.text2}</p>
            <p>{prod.text3}</p>
          </div>
          <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden prod-reveal group shadow-2xl lg:order-2 order-1">
            <Image
              src={getAssetPath("/images/production/uretim-2.jpg")}
              alt="Kendal Elektrik Üretim Tesisi 2"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:opacity-0 transition-opacity duration-700" />
          </div>
        </div>
      </div>
    </section>
  );
};
