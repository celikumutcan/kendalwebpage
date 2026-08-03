"use client";

import React, { useRef } from "react";
import { useLanguage } from "@/app/i18n/LanguageProvider";
import { gsap } from "@/lib/gsapConfig";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import Image from "next/image";
import { getAssetPath } from "@/utils/basePath";

const RETAILERS = [
  { name: "Bizim Toptan", logo: getAssetPath("/images/retail/bizim-logo.png") },
  { name: "Seç Market", logo: getAssetPath("/images/retail/sec-logo.png") },
  { name: "Avansas", logo: getAssetPath("/images/retail/avansas-logo.png") },
  { name: "ANPA Gross", logo: getAssetPath("/images/retail/anpa-logo.png") },
  { name: "Türkiye Tarım Kredi Kooperatif Market", logo: getAssetPath("/images/retail/tarim-logo.png") },
  { name: "Koçtaş", logo: getAssetPath("/images/retail/koctas-logo.png") },
  { name: "BİM", logo: getAssetPath("/images/retail/bim-logo.webp") },
  { name: "A101", logo: getAssetPath("/images/retail/a101-logo.png") },
];

export const RetailPresence = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);
  
  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".retail-logo",
        { y: 30, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.5)",
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
    <section ref={containerRef} className="w-full bg-transparent py-24 md:py-32 px-6 border-t border-[var(--global-text)]/5">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-16 text-[var(--global-text)] opacity-90 tracking-tight">
          {(t as any).retail?.title || "Türkiye'nin Önde Gelen Zincir Marketlerinde"}
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 items-center justify-items-center">
          {RETAILERS.map((retailer, idx) => (
            <div 
              key={idx} 
              className="retail-logo w-full aspect-video rounded-2xl border border-[var(--global-text)]/10 flex items-center justify-center p-6 transition-all duration-300 bg-white hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)] group"
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={retailer.logo}
                  alt={retailer.name}
                  fill
                  className="object-contain object-center transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
