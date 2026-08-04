"use client";

import React, { useRef } from "react";
import { useLanguage } from "@/app/i18n/LanguageProvider";
import { gsap } from "@/lib/gsapConfig";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";

export const CatalogCTA = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Simple fade-up
      gsap.fromTo(
        ".catalog-content",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full relative py-32 px-6 overflow-hidden flex items-center justify-center">
      {/* Background glow effects */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30 dark:opacity-50">
        <div className="absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-gradient-to-r from-[var(--brand-red)] to-rose-500 blur-[120px] rounded-full translate-x-1/4 -translate-y-1/4 mix-blend-multiply dark:mix-blend-screen" />
        <div className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-gradient-to-r from-blue-500 to-indigo-500 blur-[120px] rounded-full -translate-x-1/4 translate-y-1/4 mix-blend-multiply dark:mix-blend-screen" />
      </div>
      
      <div className="catalog-content relative z-10 w-full max-w-5xl mx-auto text-center p-10 md:p-20 lg:p-24 rounded-[3rem] bg-[var(--global-bg)]/40 backdrop-blur-2xl border border-[var(--global-text)]/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.05)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.2)]">
        <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-b from-[var(--global-text)]/[0.03] to-transparent pointer-events-none" />
        
        <div className="relative flex flex-col items-center">
          <div className="w-20 h-20 mb-8 rounded-full bg-[var(--brand-red)]/10 flex items-center justify-center text-[var(--brand-red)]">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v12m-5-5l5 5 5-5" />
            </svg>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-[var(--global-text)] tracking-tight">
            {t.catalog.title}
          </h2>
          
          <p className="text-[var(--global-text)] opacity-70 text-lg md:text-xl lg:text-2xl mb-12 max-w-2xl mx-auto font-medium">
            {t.catalog.subtitle}
          </p>
          
          <a
            href="kendal-elektrik-katalog-2026.pdf"
            download
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-4 bg-[var(--brand-red)] hover:bg-[var(--brand-red-deep)] text-white font-bold text-lg md:text-xl px-10 py-5 rounded-full transition-all duration-300 shadow-xl hover:shadow-[var(--brand-red)]/40 hover:-translate-y-1"
          >
            <span>{t.catalog.button}</span>
            <svg className="w-6 h-6 transition-transform duration-300 group-hover:translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

