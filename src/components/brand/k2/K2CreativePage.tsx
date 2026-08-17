"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { K2Scene } from "./K2Scene";
import Link from "next/link";
import { Product } from "@/data/products";
import { useLanguage } from "@/app/i18n/LanguageProvider";

import { getAssetPath } from "@/utils/basePath";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface K2CreativePageProps {
  products: Product[];
}

const translations = {
  tr: {
    heroSub: "AYDINLATMANIN ZİRVESİ",
    explore: "Hikayeyi Keşfet",
    sec1Title: "Zirve",
    sec1Text: "İsmini, dağcıların zirvesine ulaşması en zor ve prestijli dağlardan biri olan K2'den alan markamız, 'Aydınlatmanın Zirvesi' olma vizyonuyla hareket etmektedir.",
    sec2Title: "Geniş Yelpaze",
    sec2Text: "Kendal Elektrik'in profesyonel LED aydınlatma sistemleri, enerji verimliliği odaklı çözümleri ve dekoratif ürünlerini içeren geniş yelpazesini temsil eder.",
    sec3Title: "Zorlu Koşullar",
    sec3Text: "Ev ve ofis aydınlatmasında yenilikçi LED çözümleri ile enerjiden tasarruf edin, geleceğe yatırım yapın.",
    catalogBtn: "Ürünleri İncele"
  },
  en: {
    heroSub: "THE PEAK OF LIGHTING",
    explore: "Discover the Story",
    sec1Title: "The Peak",
    sec1Text: "Taking its name from K2, one of the most difficult and prestigious mountains for climbers to conquer, our brand operates with the vision of being the 'Peak of Lighting'.",
    sec2Title: "Wide Range",
    sec2Text: "Represents the wide range of Kendal Elektrik's professional LED lighting systems, energy efficiency-oriented solutions, and decorative products.",
    sec3Title: "Extreme Conditions",
    sec3Text: "Offers top-level quality and durability even under the toughest conditions for industrial and architectural needs.",
    catalogBtn: "Explore Products"
  }
};

export function K2CreativePage({ products }: K2CreativePageProps) {
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
  }, [language]); // Re-run if language changes so DOM gets picked up properly

  return (
    <div ref={containerRef} className="relative w-full bg-[#0a0a0b] text-white selection:bg-orange-500 selection:text-white">
      
      {/* 3D Background - Will fade out on scroll */}
      <div className="k2-scene-wrapper fixed inset-0 z-0 pointer-events-none">
        <K2Scene />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 w-full h-screen flex flex-col items-center justify-center pointer-events-none px-4">
        <div ref={heroTextRef} className="text-center flex flex-col items-center -mt-48">
          <img 
            src={getAssetPath("/images/brands/k2-logo.svg")}
            alt="K2 Logo" 
            className="h-32 md:h-48 lg:h-56 mx-auto drop-shadow-2xl opacity-95" 
          />
          <span className="text-sm md:text-2xl font-bold tracking-[0.5em] text-orange-400 block mt-8 uppercase drop-shadow-md">
            {t.heroSub}
          </span>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <p className="text-xs tracking-widest uppercase opacity-50 mb-2">{t.explore}</p>
          <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent"></div>
        </div>
      </section>

      {/* Story Section 1: The Name & Vision */}
      <section className="relative z-10 w-full min-h-screen flex flex-col justify-center px-6 md:px-24 py-24">
        <div className="max-w-4xl reveal-text">
          <h3 className="text-orange-500 font-semibold tracking-widest mb-6 uppercase text-sm md:text-base border-l-2 border-orange-500 pl-4">{t.sec1Title}</h3>
          <h2 className="text-3xl md:text-5xl font-bold leading-tight">
            {t.sec1Text}
          </h2>
        </div>
      </section>

      {/* Story Section 2: Range & Solutions */}
      <section className="relative z-10 w-full min-h-screen flex flex-col justify-center items-end px-6 md:px-24 py-24 text-right">
        <div className="max-w-4xl reveal-text">
          <h3 className="text-orange-500 font-semibold tracking-widest mb-6 uppercase text-sm md:text-base border-r-2 border-orange-500 pr-4 inline-block">{t.sec2Title}</h3>
          <h2 className="text-3xl md:text-5xl font-bold leading-tight">
            {t.sec2Text}
          </h2>
        </div>
      </section>

      {/* Story Section 3: Durability & Quality */}
      <section className="relative z-10 w-full min-h-screen flex flex-col justify-center px-6 md:px-24 py-24">
        <div className="max-w-4xl reveal-text">
          <h3 className="text-orange-500 font-semibold tracking-widest mb-6 uppercase text-sm md:text-base border-l-2 border-orange-500 pl-4">{t.sec3Title}</h3>
          <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-12">
            {t.sec3Text}
          </h2>
          <Link 
            href="/urunler"
            className="inline-block px-10 py-5 bg-orange-600 text-white font-bold tracking-widest uppercase rounded-full hover:scale-105 transition-transform"
          >
            {t.catalogBtn}
          </Link>
        </div>
      </section>

    </div>
  );
}
