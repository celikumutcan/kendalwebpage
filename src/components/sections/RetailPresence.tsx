"use client";

import React, { useRef } from "react";
import { useLanguage } from "@/app/i18n/LanguageProvider";
import { gsap } from "@/lib/gsapConfig";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import Image from "next/image";

// IMPORTANT: These are placeholder real brand names/logo slots.
// Actual usage requires Kendal Elektrik to confirm current, authorized retail partnerships
// and obtain correct logo assets before this goes live.
const PLACEHOLDER_RETAILERS = [
  { name: "Migros", logo: "/images/retail/migros.png" },
  { name: "BİM", logo: "/images/retail/bim.png" },
  { name: "A101", logo: "/images/retail/a101.png" },
  { name: "Retailer 4", logo: "/images/retail/placeholder.png" },
  { name: "Retailer 5", logo: "/images/retail/placeholder.png" },
  { name: "Retailer 6", logo: "/images/retail/placeholder.png" },
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
    <section ref={containerRef} className="w-full bg-black py-24 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-16 text-white/90">
          {(t as any).retail?.title}
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
          {PLACEHOLDER_RETAILERS.map((retailer, idx) => (
            <div 
              key={idx} 
              className="retail-logo w-full aspect-video bg-white/5 rounded-xl border border-white/10 flex items-center justify-center p-4 hover:bg-white/10 transition-colors duration-300"
            >
              {/* Fallback to text since images don't exist yet */}
              <span className="font-bold text-lg text-white/50 tracking-wider">
                {retailer.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
