"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useLanguage } from "@/app/i18n/LanguageProvider";
import { gsap } from "@/lib/gsapConfig";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import { getAssetPath } from "@/utils/basePath";

export const Certifications = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".cert-item");
      
      gsap.fromTo(
        items,
        { opacity: 0, scale: 0.9, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
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

  const certs = [
    { label: (t as any).certifications?.iso, icon: getAssetPath("/images/certifications/iso.png") },
    { label: (t as any).certifications?.tse, icon: getAssetPath("/images/certifications/tse.png") },
    { label: (t as any).certifications?.kalite, icon: getAssetPath("/images/certifications/kalite.png") },
    { label: (t as any).certifications?.yerli, icon: getAssetPath("/images/certifications/yerli-uretim.png") },
    { label: (t as any).certifications?.marka_tescil, icon: getAssetPath("/images/certifications/marka-tescil.png") },
  ];

  return (
    <section
      id="certifications"
      ref={containerRef}
      className="w-full bg-transparent py-16 md:py-24 px-6 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {certs.map((cert, idx) => (
            <div
              key={idx}
              className="cert-item flex flex-col items-center justify-center p-6 rounded-2xl bg-[var(--global-text)]/[0.02] border border-[var(--global-text)]/10 transition-all duration-300 hover:bg-[var(--global-text)]/[0.05] hover:border-[var(--brand-red)] hover:shadow-[0_0_15px_rgba(227,0,15,0.3)] group"
            >
              <div className="relative w-24 h-24 mb-4 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 drop-shadow-md">
                <Image
                  src={cert.icon}
                  alt={cert.label || "Certification"}
                  fill
                  sizes="96px"
                  className="object-contain drop-shadow-md"
                />
              </div>
              <h3 className="text-center text-sm md:text-base font-medium text-[var(--global-text)] opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                {cert.label}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

