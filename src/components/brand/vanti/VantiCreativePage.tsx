"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Product } from "@/data/products";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

import { getAssetPath } from "@/lib/basePath";
import { VantiPreloader } from "./VantiPreloader";
import { ProductCarousel } from "@/components/brand/shared/ProductCarousel";
import { CategoryShowcase } from "@/components/brand/shared/CategoryShowcase";
import { DealerMap } from "@/components/brand/shared/DealerMap";
import { ExportMap } from "@/components/brand/shared/ExportMap";

const VantiScene = dynamic(
  () => import("./VantiScene").then((mod) => mod.VantiScene),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 z-0 pointer-events-none w-full h-screen bg-gradient-to-br from-teal-100 to-sky-200" />
    ),
  }
);

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface VantiCreativePageProps {
  newProducts: Product[];
  allProducts: Product[];
}

const VANTI_ACCENT = "#0f766e";

const translations = {
  tr: {
    heroSub: "SERİNLİĞİN VE KONFORUN ADRESİ",
    explore: "Ferahlığı Hisset",
    sec1Title: "Doğal Esinti",
    sec1Text: "Evinizin her köşesinde doğanın tazeleyici esintisini hissetmeniz için en sessiz ve güçlü motorları tasarlıyoruz.",
    sec2Title: "Akıllı Soğutma",
    sec2Text: "Geniş açılı salınım ve aerodinamik pervane yapısıyla havayı homojen dağıtır, anında ferahlık sağlar.",
    popularLabel: "Ürün Kategorileri",
    popularTitle: "Kategorilerimiz",
    categoryCountLabel: "Ürün",
    viewAllLabel: "Tüm Kategoriler",
    newLabel: "Koleksiyon",
    newTitle: "En Yeni Modeller",
    modelLabel: "Model",
    viewLabel: "İncele",
    dealerEyebrow: "Yurt İçi Ağımız",
    dealerTitle: "Türkiye'nin dört bir yanında, yanınızdayız.",
    dealerBadge: "67 İlde Yetkili Bayimiz Var",
    dealerLabel: "Yetkili Bayi",
    dealerHint: "İl üzerine gelerek bayi ağımızı keşfedin.",
    exportEyebrow: "Global Erişim",
    exportTitle: "Vanti'nin serinliği dünyanın dört bir yanında.",
    exportHint: "Haritadaki noktalara tıklayın.",
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
    popularLabel: "Product Categories",
    popularTitle: "Our Categories",
    categoryCountLabel: "Products",
    viewAllLabel: "All Categories",
    newLabel: "Just Arrived",
    newTitle: "New Products",
    modelLabel: "Model",
    viewLabel: "View",
    dealerEyebrow: "Our Domestic Network",
    dealerTitle: "By your side, in every corner of Turkey.",
    dealerBadge: "Authorized Dealers in 67 Provinces",
    dealerLabel: "Authorized Dealer",
    dealerHint: "Hover a province to explore our dealer network.",
    exportEyebrow: "Global Reach",
    exportTitle: "Vanti's cool breeze, everywhere around the world.",
    exportHint: "Click a point on the map.",
    sec3Title: "Energy Saving",
    sec3Text: "Spend the summer cool with the eco-friendly Vanti series that offers high performance with low energy consumption.",
    catalogBtn: "Explore Products"
  }
};

export function VantiCreativePage({ newProducts, allProducts }: VantiCreativePageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  const t = translations[language as keyof typeof translations];
  const [sceneReady, setSceneReady] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
              start: "top 95%",
              end: "top 65%",
              scrub: 1,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [language]);

  return (
    <div ref={containerRef} className="relative w-full bg-sky-50 text-teal-900 selection:bg-teal-600 selection:text-white overflow-hidden" style={{ "--page-bg": "#f0f9ff" } as React.CSSProperties}>

      <VantiPreloader ready={sceneReady} />

      <VantiScene onReady={() => setSceneReady(true)} />

      <section className="relative z-10 w-full h-screen flex flex-col items-center justify-center pointer-events-none px-4">
        <div ref={heroTextRef} className="text-center inline-flex flex-col items-center p-10 md:p-16 rounded-[4rem] bg-white/40 backdrop-blur-2xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.1)] -mt-4">
          <img 
            src={getAssetPath("/images/brands/vanti-logo.svg")}
            alt="Vanti Logo" 
            className="h-28 md:h-40 lg:h-48 mx-auto mb-2 opacity-90 drop-shadow-md" 
          />
          <span className="text-xs md:text-lg font-bold tracking-[0.5em] text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-cyan-600 block mt-6">
            {t.heroSub}
          </span>
        </div>
        <div className="absolute bottom-4 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <p className="text-xs tracking-[0.3em] uppercase mb-4 md:mb-6 font-bold text-white bg-blue-600/90 backdrop-blur-md px-6 py-2.5 rounded-full shadow-[0_0_20px_rgba(37,99,235,0.4)] border border-blue-400/30">
            {t.explore}
          </p>
          <div className="w-[1px] h-12 md:h-32 bg-teal-900/30"></div>
        </div>
      </section>

      <section className="relative z-10 w-full flex flex-col items-start justify-center px-6 md:px-32 py-16 md:py-24">
        <div className="max-w-4xl reveal-text bg-white/60 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] p-8 md:p-12 rounded-[3rem]">
          <h3 className="font-medium tracking-[0.2em] mb-8 uppercase text-lg text-teal-700 flex items-center gap-4">
            <span className="w-16 h-[1px] bg-teal-600 block"></span>
            {t.sec1Title}
          </h3>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-light leading-[1.1] text-teal-950 drop-shadow-sm">
            {t.sec1Text}
          </h2>
        </div>
      </section>

      <section className="relative z-10 w-full flex flex-col items-end justify-center px-6 md:px-32 py-16 md:py-24 text-right">
        <div className="max-w-4xl reveal-text bg-white/60 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] p-8 md:p-12 rounded-[3rem]">
          <h3 className="font-medium tracking-[0.2em] mb-8 uppercase text-lg text-teal-700 flex items-center justify-end gap-4">
            {t.sec2Title}
            <span className="w-16 h-[1px] bg-teal-600 block"></span>
          </h3>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-light leading-[1.1] text-teal-950 drop-shadow-sm">
            {t.sec2Text}
          </h2>
        </div>
      </section>

      <DealerMap
        eyebrow={t.dealerEyebrow}
        title={t.dealerTitle}
        hint={t.dealerHint}
        badge={t.dealerBadge}
        dealerLabel={t.dealerLabel}
        language={language}
        accent={VANTI_ACCENT}
        theme="light"
      />

      <ExportMap eyebrow={t.exportEyebrow} title={t.exportTitle} hint={t.exportHint} language={language} accent={VANTI_ACCENT} theme="light" />

      <ProductCarousel
        title={t.newTitle}
        products={newProducts}
        language={language}
        modelLabel={t.modelLabel}
        viewLabel={t.viewLabel}
        brandName="vanti"
        accent={VANTI_ACCENT}
        align="right"
      />

      <section className="relative z-10 w-full flex flex-col items-center justify-center px-6 md:px-32 py-16 md:py-24 md:min-h-[80vh] text-center">
        <div className="max-w-5xl reveal-text flex flex-col items-center bg-white/60 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] p-8 md:p-16 rounded-[4rem]">
          <h3 className="font-medium tracking-[0.2em] mb-8 uppercase text-lg text-teal-700 flex items-center gap-4">
            <span className="w-8 h-[1px] bg-teal-600 block"></span>
            {t.sec3Title}
            <span className="w-8 h-[1px] bg-teal-600 block"></span>
          </h3>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-light leading-[1.1] mb-16 text-teal-950 drop-shadow-sm">
            {t.sec3Text}
          </h2>
          <Link
            href={process.env.NODE_ENV === "production" ? "/brand/vanti/urunler" : "/urunler"}
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
