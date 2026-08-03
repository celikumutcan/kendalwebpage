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
    <section ref={containerRef} className="w-full bg-transparent py-32 px-6">
      <div className="catalog-content max-w-4xl mx-auto text-center p-12 md:p-20 rounded-3xl bg-gradient-to-br from-[var(--global-text)]/[0.05] to-transparent border border-[var(--global-text)]/[0.05]">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-[var(--global-text)] opacity-90 tracking-tight">
          {t.catalog.title}
        </h2>
        <p className="text-[var(--global-text)] opacity-60 text-lg mb-10">
          {t.catalog.subtitle}
        </p>
        <a
          href="kendal-elektrik-katalog-2026.pdf"
          download
          rel="noopener noreferrer"
          className="inline-block bg-[var(--brand-red)] hover:bg-[var(--brand-red-deep)] text-white font-semibold text-lg px-8 py-4 rounded-full transition-colors duration-300 shadow-lg shadow-black/20"
        >
          {t.catalog.button}
        </a>
      </div>
    </section>
  );
};

