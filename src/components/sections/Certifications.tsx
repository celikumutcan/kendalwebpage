"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { gsap } from "@/lib/gsapConfig";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import { getAssetPath } from "@/lib/basePath";

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

  const isoSubCerts = [
    getAssetPath("/images/certifications/ISO/1.webp"),
    getAssetPath("/images/certifications/ISO/2.webp"),
    getAssetPath("/images/certifications/ISO/3.webp"),
    getAssetPath("/images/certifications/ISO/4.webp"),
  ];

  const certs = [
    { id: "iso", label: (t as any).certifications?.iso, icon: getAssetPath("/images/certifications/iso.webp") },
    { id: "tse", label: (t as any).certifications?.tse, icon: getAssetPath("/images/certifications/tse.webp") },
    { id: "kalite", label: (t as any).certifications?.kalite, icon: getAssetPath("/images/certifications/kalite.webp") },
    { id: "yerli", label: (t as any).certifications?.yerli, icon: getAssetPath("/images/certifications/yerli-uretim.webp") },
    { id: "marka", label: (t as any).certifications?.marka_tescil, icon: getAssetPath("/images/certifications/marka-tescil.webp") },
  ];

  return (
    <section
      id="certifications"
      ref={containerRef}
      className="w-full relative bg-transparent py-16 md:py-24 px-6 border-t border-white/5 overflow-hidden"
    >
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[1200px] h-[300px] bg-yellow-500/40 rounded-[100%] blur-[90px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {certs.map((cert, idx) => (
            <div
              key={idx}
              className={`cert-item relative flex flex-col items-center justify-center p-6 rounded-2xl bg-[var(--global-text)]/[0.02] border border-[var(--global-text)]/10 transition-all duration-300 hover:bg-[var(--global-text)]/[0.05] hover:border-[var(--brand-red)] hover:shadow-[0_0_15px_rgba(227,0,15,0.3)] group ${cert.id === 'iso' ? 'cursor-pointer z-40' : 'z-10'}`}
            >
              {/* ----------------- ISO SPECIFIC ANIMATION ELEMENTS ----------------- */}
              {cert.id === 'iso' && (
                <>
                  {/* Connecting Lines SVG (Anchored to the entire card) */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 transition-all duration-500 scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 origin-center">
                    {/* Lines start from roughly the center of the ISO logo (50%, 45%) and go to the 4 corners of the card */}
                    <line x1="50%" y1="45%" x2="0%" y2="0%" stroke="var(--brand-red)" strokeWidth="1.5" strokeDasharray="4 4" className="opacity-60" />
                    <line x1="50%" y1="45%" x2="100%" y2="0%" stroke="var(--brand-red)" strokeWidth="1.5" strokeDasharray="4 4" className="opacity-60" />
                    <line x1="50%" y1="45%" x2="0%" y2="100%" stroke="var(--brand-red)" strokeWidth="1.5" strokeDasharray="4 4" className="opacity-60" />
                    <line x1="50%" y1="45%" x2="100%" y2="100%" stroke="var(--brand-red)" strokeWidth="1.5" strokeDasharray="4 4" className="opacity-60" />
                  </svg>

                  {/* 4 Corner Sub-Logos (Anchored to the exact corners of the card) */}
                  {isoSubCerts.map((subIcon, subIdx) => {
                    const positions = [
                      { left: '0%', top: '0%' },     // 0: Top Left
                      { left: '100%', top: '0%' },   // 1: Top Right
                      { left: '0%', top: '100%' },   // 2: Bottom Left
                      { left: '100%', top: '100%' }  // 3: Bottom Right
                    ];
                    
                    const pos = positions[subIdx];

                    return (
                      <div 
                        key={subIdx} 
                        className="absolute z-20 -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-24 md:h-24 flex items-center justify-center transition-all duration-500 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 pointer-events-none group-hover:pointer-events-auto"
                        style={{ left: pos.left, top: pos.top, transitionDelay: `${subIdx * 50}ms` }}
                      >
                        {/* Wrapper for the image to round the corners of the baked-in white background */}
                        <div className="relative w-full h-full bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_15px_rgba(227,0,15,0.4)]">
                          <Image 
                            src={subIcon} 
                            alt={`ISO Detail ${subIdx + 1}`} 
                            fill 
                            sizes="(max-width: 768px) 80px, 96px" 
                            className="object-contain p-2" 
                            style={{ filter: "hue-rotate(135deg) saturate(2.5) contrast(1.1)" }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
              {/* ----------------------------------------------------------------- */}

              <div className="relative w-28 h-28 md:w-32 md:h-32 mb-4 flex items-center justify-center">
                {cert.id === 'iso' ? (
                  /* Main ISO Logo (Stays in center) */
                  <div className="absolute inset-0 z-30 flex items-center justify-center transition-transform duration-500 group-hover:scale-90 bg-transparent rounded-full">
                    <Image
                      src={cert.icon}
                      alt={cert.label || "Certification"}
                      fill
                      sizes="128px"
                      className="object-contain drop-shadow-md"
                    />
                  </div>
                ) : (
                  /* Standard Certificates */
                  <div className="relative w-24 h-24 transition-transform duration-300 group-hover:scale-110 drop-shadow-md">
                    <Image
                      src={cert.icon}
                      alt={cert.label || "Certification"}
                      fill
                      sizes="96px"
                      className="object-contain drop-shadow-md"
                    />
                  </div>
                )}
              </div>
              
              <h3 className={`text-center text-sm md:text-base font-medium text-[var(--global-text)] transition-opacity duration-300 ${cert.id === 'iso' ? 'opacity-90 group-hover:opacity-0' : 'opacity-70 group-hover:opacity-100'}`}>
                {cert.label}
              </h3>
              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

