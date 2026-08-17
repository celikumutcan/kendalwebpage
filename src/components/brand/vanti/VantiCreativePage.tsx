"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VantiScene } from "./VantiScene";
import Link from "next/link";
import { Product } from "@/data/products";
import { useLanguage } from "@/app/i18n/LanguageProvider";

import { getAssetPath } from "@/utils/basePath";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface VantiCreativePageProps {
  products: Product[];
}

const translations = {
  tr: {
    heroSub: "SERİNLİĞİN VE KONFORUN ADRESİ",
    explore: "Ferahlığı Hisset",
    sec1Title: "Doğal Esinti",
    sec1Text: "Evinizin her köşesinde doğanın tazeleyici esintisini hissetmeniz için en sessiz ve güçlü motorları tasarlıyoruz.",
    sec2Title: "Akıllı Soğutma",
    sec2Text: "Geniş açılı salınım ve aerodinamik pervane yapısıyla havayı homojen dağıtır, anında ferahlık sağlar.",
    sec3Title: "Enerji Tasarrufu",
    sec3Text: "Düşük enerji tüketimiyle yüksek performans sunan çevre dostu Vanti serisi ile yazı serin geçirin.",
    catalogBtn: "Ürünleri İncele"
  },
  en: {
    heroSub: "THE ADDRESS OF COOLNESS AND COMFORT",
    explore: "Feel the Freshness",
    sec1Title: "Natural Breeze",
    sec1Text: "We design the quietest and most powerful motors so you can feel the refreshing breeze of nature in every corner of your home.",
    sec2Title: "Smart Cooling",
    sec2Text: "With wide-angle oscillation and aerodynamic blade structure, it distributes air evenly, providing instant freshness.",
    sec3Title: "Energy Saving",
    sec3Text: "Spend the summer cool with the eco-friendly Vanti series that offers high performance with low energy consumption.",
    catalogBtn: "Explore Products"
  }
};

export function VantiCreativePage({ products }: VantiCreativePageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  const t = translations[language as keyof typeof translations];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero fade out on scroll
      gsap.to(heroTextRef.current, {
        opacity: 0,
        y: -100,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "500px top",
          scrub: 1,
        },
      });

      // Animate all text blocks
      const textBlocks = gsap.utils.toArray<HTMLElement>(".reveal-text");
      
      textBlocks.forEach((block) => {
        gsap.fromTo(
          block,
          { opacity: 0, y: 100, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: block,
              start: "top 80%",
              end: "top 40%",
              scrub: 1,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [language]);

  return (
    <div ref={containerRef} className="relative w-full bg-sky-50 text-teal-900 selection:bg-teal-600 selection:text-white overflow-hidden">
      
      {/* 3D Background */}
      <VantiScene />

      {/* Hero Section */}
      <section className="relative z-10 w-full h-screen flex flex-col items-center justify-center pointer-events-none px-4">
        <div ref={heroTextRef} className="text-center inline-flex flex-col items-center p-10 md:p-16 rounded-[4rem] bg-white/40 backdrop-blur-2xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.1)] -mt-40">
          <img 
            src={getAssetPath("/images/brands/vanti-logo.svg")}
            alt="Vanti Logo" 
            className="h-28 md:h-40 lg:h-48 mx-auto mb-2 opacity-90 drop-shadow-md" 
          />
          <span className="text-xs md:text-lg font-light tracking-[0.5em] text-teal-800 block mt-6 opacity-80">
            {t.heroSub}
          </span>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <p className="text-xs tracking-[0.3em] uppercase opacity-50 mb-6 font-medium text-teal-900">{t.explore}</p>
          <div className="w-[1px] h-32 bg-teal-900/30"></div>
        </div>
      </section>

      {/* Story Section 1: Natural Breeze (Airy, Left-Aligned) */}
      <section className="relative z-10 w-full min-h-screen flex flex-col items-start justify-center px-6 md:px-32 py-24">
        <div className="max-w-4xl reveal-text bg-white/20 backdrop-blur-md p-8 md:p-12 rounded-[3rem]">
          <h3 className="font-medium tracking-[0.2em] mb-8 uppercase text-lg text-teal-600 flex items-center gap-4">
            <span className="w-16 h-[1px] bg-teal-600 block"></span>
            {t.sec1Title}
          </h3>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-light leading-[1.1] text-teal-950 drop-shadow-sm">
            {t.sec1Text}
          </h2>
        </div>
      </section>

      {/* Story Section 2: Smart Cooling (Airy, Right-Aligned) */}
      <section className="relative z-10 w-full min-h-screen flex flex-col items-end justify-center px-6 md:px-32 py-24 text-right">
        <div className="max-w-4xl reveal-text bg-white/20 backdrop-blur-md p-8 md:p-12 rounded-[3rem]">
          <h3 className="font-medium tracking-[0.2em] mb-8 uppercase text-lg text-teal-600 flex items-center justify-end gap-4">
            {t.sec2Title}
            <span className="w-16 h-[1px] bg-teal-600 block"></span>
          </h3>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-light leading-[1.1] text-teal-950 drop-shadow-sm">
            {t.sec2Text}
          </h2>
        </div>
      </section>

      {/* Story Section 3: Energy Saving (Airy, Centered) */}
      <section className="relative z-10 w-full min-h-[80vh] flex flex-col items-center justify-center px-6 md:px-32 py-24 text-center">
        <div className="max-w-5xl reveal-text flex flex-col items-center bg-white/20 backdrop-blur-md p-8 md:p-16 rounded-[4rem]">
          <h3 className="font-medium tracking-[0.2em] mb-8 uppercase text-lg text-teal-600 flex items-center gap-4">
            <span className="w-8 h-[1px] bg-teal-600 block"></span>
            {t.sec3Title}
            <span className="w-8 h-[1px] bg-teal-600 block"></span>
          </h3>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-light leading-[1.1] mb-16 text-teal-950 drop-shadow-sm">
            {t.sec3Text}
          </h2>
          <Link 
            href="/urunler"
            className="group relative overflow-hidden inline-block px-14 py-6 border border-teal-800 text-teal-900 font-medium tracking-[0.2em] uppercase rounded-full hover:text-white transition-colors duration-500"
          >
            <span className="relative z-10">{t.catalogBtn}</span>
            <div className="absolute inset-0 bg-teal-800 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0"></div>
          </Link>
        </div>
      </section>

    </div>
  );
}
