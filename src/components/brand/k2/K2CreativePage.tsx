"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { K2Scene } from "./K2Scene";
import { ProductCarousel } from "@/components/brand/shared/ProductCarousel";
import { CategoryShowcase } from "@/components/brand/shared/CategoryShowcase";
import { DealerMap } from "@/components/brand/shared/DealerMap";
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
  newProducts: Product[];
  allProducts: Product[];
}

const translations = {
  tr: {
    heroSub: "AYDINLATMANIN ZİRVESİ",
    explore: "Hikayeyi Keşfet",
    sec1Title: "Zirve",
    sec1Text: "İsmini, dağcıların zirvesine ulaşması en zor ve prestijli dağlardan biri olan K2'den alan markamız, 'Karanlığı Aydınlatıyoruz' vizyonuyla hareket etmektedir.",
    sec2Title: "Geniş Yelpaze",
    sec2Text: "Kendal Elektrik'in profesyonel LED aydınlatma sistemleri, enerji verimliliği odaklı çözümleri ve dekoratif ürünlerini içeren geniş yelpazesini temsil eder. K2, Türkiye'nin en prestijli ve güvenilir aydınlatma markalarından biri olarak sektöre öncülük ediyor.",
    popularLabel: "Ürün Kategorileri",
    popularTitle: "Kategorilerimiz",
    categoryCountLabel: "Ürün",
    viewAllLabel: "Tüm Kategoriler",
    newLabel: "Yeni Çıkanlar",
    newTitle: "Yeni Ürünler",
    modelLabel: "Model",
    viewLabel: "İncele",
    dealerEyebrow: "Yurt İçi Ağımız",
    dealerTitle: "Türkiye'nin dört bir yanında, yanınızdayız.",
    dealerBadge: "67 İlde Yetkili Bayimiz Var",
    dealerLabel: "Yetkili Bayi",
    dealerHint: "İl üzerine gelerek bayi ağımızı keşfedin.",
    exportEyebrow: "Global Erişim",
    exportTitle: "K2, sınırları aşarak dünyanın dört bir yanını aydınlatıyor.",
    exportHint: "Haritadaki noktalara tıklayın.",
    sec3Title: "Zorlu Koşullar",
    sec3Text: "Spot, LED panel, projektör, solar armatür ve magnet sistemlerden dekoratif aydınlatmaya uzanan geniş ürün gamıyla K2; ev ve ofis aydınlatmasında yenilikçi LED çözümleriyle enerjiden tasarruf edin, geleceğe yatırım yapın.",
    catalogBtn: "Ürünleri İncele"
  },
  en: {
    heroSub: "WE ILLUMINATE THE DARKNESS",
    explore: "Discover the Story",
    sec1Title: "The Peak",
    sec1Text: "Taking its name from K2, one of the most difficult and prestigious mountains for climbers to conquer, our brand operates with the vision to 'Illuminate the Darkness'.",
    sec2Title: "Wide Range",
    sec2Text: "Represents the wide range of Kendal Elektrik's professional LED lighting systems, energy efficiency-oriented solutions, and decorative products. K2 leads the industry as one of Turkey's most prestigious and trusted lighting brands.",
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
    exportTitle: "K2 lights up every corner of the world, beyond our borders.",
    exportHint: "Click a point on the map.",
    sec3Title: "Extreme Conditions",
    sec3Text: "From spotlights, LED panels and floodlights to solar fixtures, magnet systems and decorative lighting, K2's extensive range brings innovative LED solutions to home and office lighting — save energy, invest in the future.",
    catalogBtn: "Explore Products"
  }
};

export function K2CreativePage({ newProducts, allProducts }: K2CreativePageProps) {
  const { language } = useLanguage();
  const t = translations[language as keyof typeof translations] || translations.tr;

  const containerRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let ctx = gsap.context(() => {
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
  }, [language]);

  return (
    <div ref={containerRef} className="relative w-full bg-[#0a0a0b] text-white selection:bg-orange-500 selection:text-white">
      
      <div className="k2-scene-wrapper fixed inset-0 z-0 pointer-events-none">
        <K2Scene />
      </div>

      <section className="relative z-10 w-full h-screen flex flex-col items-center justify-center pointer-events-none px-4">
        <div ref={heroTextRef} className="text-center flex flex-col items-center -mt-20">
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

      <section className="relative z-10 w-full min-h-screen flex flex-col justify-center px-6 md:px-24 py-24">
        <div className="max-w-4xl reveal-text">
          <h3 className="text-orange-500 font-semibold tracking-widest mb-6 uppercase text-sm md:text-base border-l-2 border-orange-500 pl-4">{t.sec1Title}</h3>
          <h2 className="text-3xl md:text-5xl font-bold leading-tight">
            {t.sec1Text}
          </h2>
        </div>
      </section>

      <section className="relative z-10 w-full min-h-screen flex flex-col justify-center items-end px-6 md:px-24 py-24 text-right">
        <div className="max-w-4xl reveal-text">
          <h3 className="text-orange-500 font-semibold tracking-widest mb-6 uppercase text-sm md:text-base border-r-2 border-orange-500 pr-4 inline-block">{t.sec2Title}</h3>
          <h2 className="text-3xl md:text-5xl font-bold leading-tight">
            {t.sec2Text}
          </h2>
        </div>
      </section>

      <CategoryShowcase
        label={t.popularLabel}
        title={t.popularTitle}
        allProducts={allProducts}
        language={language}
        brandName="k2"
        accent={K2_ACCENT}
        countLabel={t.categoryCountLabel}
        viewAllLabel={t.viewAllLabel}
        align="left"
      />

      <DealerMap
        eyebrow={t.dealerEyebrow}
        title={t.dealerTitle}
        hint={t.dealerHint}
        badge={t.dealerBadge}
        dealerLabel={t.dealerLabel}
        language={language}
        accent={K2_ACCENT}
      />

      <ExportMap eyebrow={t.exportEyebrow} title={t.exportTitle} hint={t.exportHint} language={language} accent={K2_ACCENT} />

      <ProductCarousel
        label={t.newLabel}
        title={t.newTitle}
        products={newProducts}
        language={language}
        modelLabel={t.modelLabel}
        viewLabel={t.viewLabel}
        brandName="k2"
        accent={K2_ACCENT}
        align="right"
      />

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
