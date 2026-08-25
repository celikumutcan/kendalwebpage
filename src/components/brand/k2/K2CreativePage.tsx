"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { K2Scene } from "./K2Scene";
import { ProductCarousel } from "@/components/brand/shared/ProductCarousel";
import { ProductGrid } from "@/components/brand/shared/ProductGrid";
import { Highlights } from "@/components/brand/shared/Highlights";
import { ExportMap } from "@/components/brand/shared/ExportMap";
import Link from "next/link";
import { Product } from "@/data/products";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

import { getAssetPath } from "@/lib/basePath";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const K2_ACCENT = "#f97316";

interface K2CreativePageProps {
  popularProducts: Product[];
  newProducts: Product[];
}

// highlightsStats placeholder note: "20.000+ Saat", "%100 Yerli Üretim" ve
// "8 Ülkeye İhracat" gerçek/teyitli veri (ihracat listesi: Azerbaycan,
// Gürcistan, Moldova, Romanya, Bulgaristan, Arnavutluk, Malta, Irak — bkz.
// K2ExportMapInner.tsx EXPORT_COUNTRIES). "2 Yıl Garanti" hâlâ tahmini —
// yayına almadan önce marka/satış sorumlusundan (patron) teyit edip burada
// güncellemek gerekir.
const translations = {
  tr: {
    heroSub: "AYDINLATMANIN ZİRVESİ",
    explore: "Hikayeyi Keşfet",
    sec1Title: "Zirve",
    sec1Text: "İsmini, dağcıların zirvesine ulaşması en zor ve prestijli dağlardan biri olan K2'den alan markamız, 'Aydınlatmanın Zirvesi' olma vizyonuyla hareket etmektedir.",
    sec2Title: "Geniş Yelpaze",
    sec2Text: "Kendal Elektrik'in profesyonel LED aydınlatma sistemleri, enerji verimliliği odaklı çözümleri ve dekoratif ürünlerini içeren geniş yelpazesini temsil eder.",
    popularLabel: "Çok Tercih Edilen",
    popularTitle: "Popüler Ürünler",
    newLabel: "Yeni Çıkanlar",
    newTitle: "Yeni Ürünler",
    modelLabel: "Model",
    viewLabel: "İncele",
    highlightsEyebrow: "Neden K2?",
    highlightsTitle: "Sahada kanıtlanmış performans, mühendislik hassasiyeti.",
    highlightsStats: [
      { value: "20.000+", label: "Saat Ortalama LED Ömrü" },
      { value: "%100", label: "Yerli Üretim" },
      { value: "8", label: "Ülkeye İhracat" },
      { value: "2 Yıl", label: "Garanti Kapsamı" },
    ],
    exportEyebrow: "Global Erişim",
    exportTitle: "K2, sınırları aşarak dünyanın dört bir yanını aydınlatıyor.",
    exportHint: "Haritadaki noktalara tıklayın.",
    sec3Title: "Zorlu Koşullar",
    sec3Text: "Spot, LED panel, projektör, solar armatür ve magnet sistemlerden dekoratif aydınlatmaya uzanan geniş ürün gamıyla K2; ev ve ofis aydınlatmasında yenilikçi LED çözümleriyle enerjiden tasarruf edin, geleceğe yatırım yapın.",
    catalogBtn: "Ürünleri İncele"
  },
  en: {
    heroSub: "THE PEAK OF LIGHTING",
    explore: "Discover the Story",
    sec1Title: "The Peak",
    sec1Text: "Taking its name from K2, one of the most difficult and prestigious mountains for climbers to conquer, our brand operates with the vision of being the 'Peak of Lighting'.",
    sec2Title: "Wide Range",
    sec2Text: "Represents the wide range of Kendal Elektrik's professional LED lighting systems, energy efficiency-oriented solutions, and decorative products.",
    popularLabel: "Most Loved",
    popularTitle: "Popular Products",
    newLabel: "Just Arrived",
    newTitle: "New Products",
    modelLabel: "Model",
    viewLabel: "View",
    highlightsEyebrow: "Why K2?",
    highlightsTitle: "Field-proven performance, engineered with precision.",
    highlightsStats: [
      { value: "20,000+", label: "Hours Average LED Lifespan" },
      { value: "100%", label: "Domestic Production" },
      { value: "8", label: "Countries Exported To" },
      { value: "2 Years", label: "Warranty Coverage" },
    ],
    exportEyebrow: "Global Reach",
    exportTitle: "K2 lights up every corner of the world, beyond our borders.",
    exportHint: "Click a point on the map.",
    sec3Title: "Extreme Conditions",
    sec3Text: "From spotlights, LED panels and floodlights to solar fixtures, magnet systems and decorative lighting, K2's extensive range brings innovative LED solutions to home and office lighting — save energy, invest in the future.",
    catalogBtn: "Explore Products"
  }
};

export function K2CreativePage({ popularProducts, newProducts }: K2CreativePageProps) {
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
              start: "top 95%",
              end: "top 65%",
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

      {/* Highlights / trust stats */}
      <Highlights eyebrow={t.highlightsEyebrow} title={t.highlightsTitle} stats={t.highlightsStats} accent={K2_ACCENT} />

      {/* Export map */}
      <ExportMap eyebrow={t.exportEyebrow} title={t.exportTitle} hint={t.exportHint} language={language} accent={K2_ACCENT} />

      {/* Popular Products — sliding marquee */}
      <ProductCarousel
        label={t.popularLabel}
        title={t.popularTitle}
        products={popularProducts}
        language={language}
        modelLabel={t.modelLabel}
        viewLabel={t.viewLabel}
        brandName="k2"
        accent={K2_ACCENT}
        align="left"
      />

      {/* New Products — static editorial grid */}
      <ProductGrid label={t.newLabel} title={t.newTitle} products={newProducts} language={language} brandName="k2" accent={K2_ACCENT} />

      {/* Story Section 3: Durability & Quality */}
      <section className="relative z-10 w-full min-h-screen flex flex-col justify-center px-6 md:px-24 py-24">
        <div className="max-w-4xl reveal-text">
          <h3 className="text-orange-500 font-semibold tracking-widest mb-6 uppercase text-sm md:text-base border-l-2 border-orange-500 pl-4">{t.sec3Title}</h3>
          <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-12">
            {t.sec3Text}
          </h2>
          <Link
            href={process.env.NODE_ENV === "production" ? "/brand/k2/urunler" : "/urunler"}
            className="inline-block px-10 py-5 bg-orange-600 text-white font-bold tracking-widest uppercase rounded-full hover:scale-105 transition-transform"
          >
            {t.catalogBtn}
          </Link>
        </div>
      </section>

    </div>
  );
}
