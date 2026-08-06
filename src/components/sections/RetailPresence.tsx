"use client";

import React, { useRef } from "react";
import { useLanguage } from "@/app/i18n/LanguageProvider";

import Image from "next/image";
import { getAssetPath } from "@/utils/basePath";

const RETAILERS = [
  { name: "BİM", logo: getAssetPath("/images/retail/bim-logo.webp") },
  { name: "A101", logo: getAssetPath("/images/retail/a101-logo.png") },
  { name: "Koçtaş", logo: getAssetPath("/images/retail/koctas-logo.png") },
  { name: "Türkiye Tarım Kredi Kooperatif Market", logo: getAssetPath("/images/retail/tarim-logo.png") },
  { name: "Bizim Toptan", logo: getAssetPath("/images/retail/bizim-logo.png") },
  { name: "Seç Market", logo: getAssetPath("/images/retail/sec-logo.png") },
  { name: "Avansas", logo: getAssetPath("/images/retail/avansas-logo.png") },
  { name: "ANPA Gross", logo: getAssetPath("/images/retail/anpa-logo.png") },
];

export const RetailPresence = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);


  return (
    <section id="retail" ref={containerRef} className="w-full relative py-32 px-6 border-t border-[var(--global-text)]/5 overflow-hidden">
      {/* Vibrant Spotlight Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10 opacity-50 dark:opacity-70">
        {/* Left top warm glow */}
        <div className="absolute -left-[20%] top-0 w-[600px] h-[600px] bg-gradient-to-br from-amber-400 to-orange-500 blur-[150px] rounded-full mix-blend-multiply dark:mix-blend-screen" />
        
        {/* Right bottom cool glow */}
        <div className="absolute -right-[20%] bottom-0 w-[700px] h-[700px] bg-gradient-to-bl from-teal-400 to-emerald-600 blur-[150px] rounded-full mix-blend-multiply dark:mix-blend-screen" />
        
        {/* Center blue/purple subtle glow */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-500/40 blur-[150px] rounded-[100%] mix-blend-multiply dark:mix-blend-screen" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-24 text-[var(--global-text)] opacity-90 tracking-tight">
          {(t as any).retail?.title || "Türkiye'nin Önde Gelen Zincir Marketlerinde"}
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 items-center justify-items-center">
          {RETAILERS.map((retailer, idx) => (
            <div 
              key={idx} 
              className="retail-logo w-full aspect-video rounded-2xl border border-[var(--global-text)]/10 flex items-center justify-center p-6 transition-all duration-300 bg-white hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)] group"
            >
              <div className="relative w-[85%] h-[85%] flex items-center justify-center">
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
