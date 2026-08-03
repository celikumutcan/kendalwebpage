"use client";

import React, { useRef } from "react";
import { useLanguage } from "@/app/i18n/LanguageProvider";
import { gsap } from "@/lib/gsapConfig";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";

export const WhyUs = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((el, index) => {
        if (!el) return;
        
        // Large Typography Cinematic Reveal
        gsap.fromTo(
          el.querySelector(".why-title"),
          { opacity: 0, y: 50, filter: "blur(10px)", scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
            },
          }
        );

        // Abstract line animation
        gsap.fromTo(
          el.querySelector(".why-line"),
          { width: "0%" },
          {
            width: "100%",
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
            },
          }
        );

        // Description Reveal
        gsap.fromTo(
          el.querySelector(".why-desc"),
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.3,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const features = [
    { title: t.why_us.item1_title, desc: t.why_us.item1_desc },
    { title: t.why_us.item2_title, desc: t.why_us.item2_desc },
    { title: t.why_us.item3_title, desc: t.why_us.item3_desc },
    { title: t.why_us.item4_title, desc: t.why_us.item4_desc },
    { title: (t as any).why_us.item5_title, desc: (t as any).why_us.item5_desc },
  ];

  return (
    <section
      id="why-us"
      ref={containerRef}
      className="w-full bg-transparent py-32 md:py-48 px-6 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-sm md:text-base font-medium tracking-[0.3em] uppercase text-center mb-24 md:mb-40 text-[var(--global-text)] opacity-50">
          {t.why_us.title}
        </h2>
        
        <div className="flex flex-col gap-32 md:gap-48">
          {features.map((item, idx) => (
            <div
              key={idx}
              ref={(el) => { itemsRef.current[idx] = el; }}
              className="relative flex flex-col md:flex-row items-start md:items-end gap-8 md:gap-16 group"
            >
              {/* Huge Background Index */}
              <div className="absolute top-0 right-0 md:left-4 md:-top-12 text-9xl md:text-[14rem] font-black bg-clip-text text-transparent bg-gradient-to-b from-[var(--global-text)] to-transparent opacity-10 pointer-events-none tracking-tighter leading-none select-none transition-transform duration-1000 group-hover:scale-105 group-hover:opacity-20 z-0">
                0{idx + 1}
              </div>

              {/* Title Section */}
              <div className="md:w-1/2 relative z-10 w-full">
                <h3 className="why-title text-3xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-[var(--global-text)] opacity-90 pb-8" style={{ willChange: "filter, transform, opacity" }}>
                  {item.title}
                </h3>
                <div className="why-line h-[2px] bg-gradient-to-r from-[var(--accent-current)] to-transparent opacity-50 w-0" />
              </div>

              {/* Description Section */}
              <div className="md:w-1/2 relative z-10 w-full md:pb-8">
                <p className="why-desc text-lg md:text-2xl font-light text-[var(--global-text)] opacity-70 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
