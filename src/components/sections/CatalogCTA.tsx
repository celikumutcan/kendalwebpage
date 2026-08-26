"use client";

import React, { useRef } from "react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { gsap } from "@/lib/gsapConfig";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";

export const CatalogCTA = () => {
  const { t, language } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
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
    <section id="catalog" ref={containerRef} className="w-full relative py-8 md:py-16 px-4 md:px-6 overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-20 dark:opacity-40">
        <div className="absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-gradient-to-r from-[var(--brand-red)] to-rose-500 blur-[100px] rounded-full translate-x-1/4 -translate-y-1/4 mix-blend-multiply dark:mix-blend-screen" />
        <div className="absolute w-[200px] h-[200px] md:w-[300px] md:h-[300px] bg-gradient-to-r from-blue-500 to-indigo-500 blur-[100px] rounded-full -translate-x-1/4 translate-y-1/4 mix-blend-multiply dark:mix-blend-screen" />
      </div>

      <div className="catalog-content relative z-10 w-full max-w-3xl mx-auto text-center p-6 md:p-10 rounded-[2rem] bg-[var(--global-bg)]/40 backdrop-blur-2xl border border-[var(--global-text)]/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.05)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.2)]">
        <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-b from-[var(--global-text)]/[0.03] to-transparent pointer-events-none" />

        <div className="relative flex flex-col items-center">
          <div className="w-16 h-16 md:w-20 md:h-20 mb-6 rounded-full bg-[var(--brand-red)]/10 flex items-center justify-center text-[var(--brand-red)]">
            <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v12m-5-5l5 5 5-5" />
            </svg>
          </div>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-3 text-[var(--global-text)] tracking-tight">
            {t.catalog.title}
          </h2>

          <p className="text-[var(--global-text)] opacity-70 text-sm md:text-base lg:text-lg mb-8 max-w-2xl mx-auto font-medium">
            {t.catalog.subtitle}
          </p>

          <a
            href={language === "en" ? "en-catalog.pdf" : "kendal-elektrik-katalog-2026.pdf"}
            download={language === "en" ? "Kendal_Electric_Catalog_2026.pdf" : "Kendal_Elektrik_Katalog_Fiyat_Listesi_2026.pdf"}
            rel="noopener noreferrer"
            title={t.catalog.button}
            aria-label={t.catalog.button}
            className="group inline-flex items-center justify-center gap-2 bg-[var(--brand-red)] hover:bg-[var(--brand-red-deep)] text-white font-bold text-sm md:text-base px-6 py-3 md:px-8 md:py-4 rounded-full transition-all duration-300 shadow-xl hover:shadow-[var(--brand-red)]/40 hover:-translate-y-1"
          >
            <span>{t.catalog.button}</span>
            <svg className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 group-hover:translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

