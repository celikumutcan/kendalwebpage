"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GlobalScene } from "./GlobalScene";
import Link from "next/link";
import { Product } from "@/data/products";
import { useLanguage } from "@/app/i18n/LanguageProvider";

import { getAssetPath } from "@/utils/basePath";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface GlobalCreativePageProps {
  products: Product[];
}

const translations = {
  tr: {
    heroSub: "KAPSAMLI AYDINLATMA VE ELEKTRİK ÇÖZÜMLERİ",
    explore: "Işığı Keşfet",
    sec1Title: "Güven",
    sec1Text: "Kendal Elektrik güvencesiyle üretilen Global markası, sektördeki güçlü tecrübeyi ve kaliteyi temsil eder.",
    sec2Title: "Geniş Yelpaze",
    sec2Text: "LED panelden şerit aydınlatmaya, projektörden ampule; endüstriyel tesislerden modern yaşam alanlarına kadar her projeye uygun geniş bir aydınlatma ağı.",
    sec3Title: "Dayanıklılık",
    sec3Text: "Zorlu koşullara meydan okuyan, uzun ömürlü ve enerji verimli ürünler.",
    catalogBtn: "Ürünleri İncele"
  },
  en: {
    heroSub: "COMPREHENSIVE SOLUTIONS",
    explore: "Discover the Light",
    sec1Title: "The Assurance",
    sec1Text: "Produced with Kendal Elektrik's assurance, Global represents deep experience and quality in the industry.",
    sec2Title: "Wide Range",
    sec2Text: "From LED panels to strip lighting, floodlights to bulbs; a wide lighting network suited to every project, from industrial facilities to modern living spaces.",
    sec3Title: "Durability",
    sec3Text: "Long-lasting and energy-efficient products that challenge tough conditions.",
    catalogBtn: "Explore Products"
  }
};

export function GlobalCreativePage({ products }: GlobalCreativePageProps) {
  const { language } = useLanguage();
  const t = translations[language as keyof typeof translations] || translations.tr;

  const containerRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let ctx = gsap.context(() => {
      // 1. Hero Text Parallax
      gsap.to(heroTextRef.current, {
        y: -150,
        opacity: 0,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // 2. Sections Fade In
      const sections = gsap.utils.toArray(".reveal-text");
      sections.forEach((section: any) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "top 50%",
              scrub: 1,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [language]);

  return (
    <div ref={containerRef} className="relative w-full bg-zinc-950 text-white selection:bg-[#FFDA51] selection:text-zinc-900 overflow-hidden">

      {/* 3D Background */}
      <GlobalScene />

      {/* Hero Section */}
      <section className="relative z-10 w-full h-screen flex flex-col items-center justify-center pointer-events-none px-4">
        <div ref={heroTextRef} className="text-center flex flex-col items-center p-8 md:p-16 rounded-[3rem] bg-white/95 backdrop-blur-2xl border border-white/70 shadow-[0_8px_40px_rgba(0,0,0,0.5)] -mt-40">
          <img
            src={getAssetPath("/images/brands/global-logo.svg")}
            alt="Global Logo"
            className="h-24 md:h-36 lg:h-48 mx-auto drop-shadow-sm"
          />
          <span className="text-sm md:text-xl font-medium tracking-[0.3em] text-amber-700 block mt-8">
            {t.heroSub}
          </span>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <p className="text-xs tracking-widest uppercase opacity-80 mb-4 font-semibold text-zinc-950 bg-[#FFDA51] px-4 py-1 rounded-full">{t.explore}</p>
          <div className="w-[2px] h-24 bg-white/20 rounded-full"></div>
        </div>
      </section>

      {/* Story Section 1: The Assurance */}
      <section className="relative z-10 w-full min-h-[80vh] flex flex-col items-center justify-center px-6 md:px-24 py-24 text-center">
        <div className="max-w-4xl reveal-text flex flex-col items-center bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.35)] p-10 md:p-16 rounded-[2rem]">
          <div className="w-12 h-[3px] bg-[#FFDA51] mb-6 rounded-full"></div>
          <h3 className="font-bold tracking-widest mb-6 uppercase text-sm md:text-base text-zinc-400">{t.sec1Title}</h3>
          <h2 className="text-2xl md:text-5xl font-light leading-tight text-white">
            {t.sec1Text}
          </h2>
        </div>
      </section>

      {/* Story Section 2: Range & Solutions */}
      <section className="relative z-10 w-full min-h-[80vh] flex flex-col items-center justify-center px-6 md:px-24 py-24 text-center">
        <div className="max-w-4xl reveal-text flex flex-col items-center bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.35)] p-10 md:p-16 rounded-[2rem]">
          <div className="w-12 h-[3px] bg-[#FFDA51] mb-6 rounded-full"></div>
          <h3 className="font-bold tracking-widest mb-6 uppercase text-sm md:text-base text-zinc-400">{t.sec2Title}</h3>
          <h2 className="text-2xl md:text-5xl font-light leading-tight text-white">
            {t.sec2Text}
          </h2>
        </div>
      </section>

      {/* Story Section 3: Durability & Quality */}
      <section className="relative z-10 w-full min-h-[80vh] flex flex-col items-center justify-center px-6 md:px-24 py-24 text-center">
        <div className="max-w-4xl reveal-text flex flex-col items-center bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.35)] p-10 md:p-16 rounded-[2rem]">
          <div className="w-12 h-[3px] bg-[#FFDA51] mb-6 rounded-full"></div>
          <h3 className="font-bold tracking-widest mb-6 uppercase text-sm md:text-base text-zinc-400">{t.sec3Title}</h3>
          <h2 className="text-2xl md:text-5xl font-light leading-tight mb-12 text-white">
            {t.sec3Text}
          </h2>
          <Link
            href="/urunler"
            className="inline-block px-12 py-5 bg-[#FFDA51] text-zinc-950 font-bold tracking-widest uppercase rounded-full hover:scale-105 hover:shadow-[0_0_30px_rgba(255,218,81,0.4)] transition-all duration-300"
          >
            {t.catalogBtn}
          </Link>
        </div>
      </section>

    </div>
  );
}
