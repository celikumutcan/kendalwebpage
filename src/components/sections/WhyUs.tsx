"use client";

import React, { useRef } from "react";
import { useLanguage } from "@/app/i18n/LanguageProvider";
import { gsap } from "@/lib/gsapConfig";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";

// Simple Inline SVG Icons
const IconBox = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 md:w-10 md:h-10">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
    <polyline points="3.29 7 12 12 20.71 7"></polyline>
    <line x1="12" y1="22" x2="12" y2="12"></line>
  </svg>
);

const IconShield = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 md:w-10 md:h-10">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
);

const IconStar = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 md:w-10 md:h-10">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

const IconNetwork = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 md:w-10 md:h-10">
    <circle cx="18" cy="5" r="3"></circle>
    <circle cx="6" cy="12" r="3"></circle>
    <circle cx="18" cy="19" r="3"></circle>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
  </svg>
);

const IconCheckBadge = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 md:w-10 md:h-10">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

export const WhyUs = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        itemsRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const features = [
    { title: t.why_us.item1_title, desc: t.why_us.item1_desc, icon: <IconBox /> },
    { title: t.why_us.item2_title, desc: t.why_us.item2_desc, icon: <IconShield /> },
    { title: t.why_us.item3_title, desc: t.why_us.item3_desc, icon: <IconStar /> },
    { title: t.why_us.item4_title, desc: t.why_us.item4_desc, icon: <IconNetwork /> },
    { title: (t as any).why_us.item5_title, desc: (t as any).why_us.item5_desc, icon: <IconCheckBadge /> },
  ];

  return (
    <section
      id="why-us"
      ref={containerRef}
      className="relative w-full py-24 md:py-32 px-6 overflow-hidden"
    >
      {/* Warm Bulb Illumination Concept */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30 mix-blend-screen" style={{ background: 'radial-gradient(ellipse at 50% -10%, #ffb347 0%, transparent 60%)' }} />
      <div className="absolute bottom-0 right-0 w-full h-[500px] pointer-events-none opacity-10 mix-blend-screen" style={{ background: 'radial-gradient(circle at 100% 100%, #ffb347 0%, transparent 60%)' }} />

      <div className="relative max-w-6xl mx-auto z-10">
        <div className="flex flex-col items-center mb-16 md:mb-24 text-center">
          <h3 className="text-3xl md:text-5xl font-bold text-[var(--global-text)] mb-6">
            {t.why_us.title}
          </h3>
          <p className="text-lg text-[var(--global-text)] max-w-2xl font-medium">
            Sektördeki liderliğimizi ve kalitemizi destekleyen en önemli unsurlar.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-16">
          {features.map((item, idx) => (
            <div
              key={idx}
              ref={(el) => { itemsRef.current[idx] = el; }}
              className="w-full sm:w-[45%] lg:w-[30%] flex flex-col items-center text-center group"
            >
              <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-[var(--global-text)] bg-opacity-5 text-[var(--brand-red)] group-hover:scale-110 group-hover:bg-[var(--brand-red)] group-hover:text-white transition-all duration-300">
                {item.icon}
              </div>
              <h4 className="text-xl md:text-2xl font-bold text-[var(--global-text)] mb-3">
                {item.title}
              </h4>
              <p className="text-base text-[var(--global-text)] opacity-90 leading-relaxed font-medium">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};