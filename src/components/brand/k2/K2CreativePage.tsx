"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { K2Scene } from "./K2Scene";
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

function MountainIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="m8 3 4.5 9L17 6l5 14H2L8 3z" />
    </svg>
  );
}

function LayersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 2 9 5-9 5-9-5 9-5z" />
      <path d="m3 12 9 5 9-5" />
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2 4 5v6c0 5.2 3.4 9.4 8 11 4.6-1.6 8-5.8 8-11V5l-8-3z" />
    </svg>
  );
}

interface K2CreativePageProps {
  allProducts: Product[];
}

const translations = {
  tr: {
    heroSub: "AYDINLATMANIN ZİRVESİ",
    explore: "Hikayeyi Keşfet",
    whyEyebrow: "Neden K2?",
    whyHeading: "Karanlığı aydınlatan güvenilir marka.",
    whySubtext: "Kendal Elektrik güvencesiyle üretilen K2, profesyonel LED teknolojisi ve dayanıklılığıyla fark yaratıyor.",
    trustStats: [
      { value: "Sektörün Zirvesindeki Markalardan", label: "Profesyonel LED Aydınlatmada" },
      { value: "9.5 / 10", label: "Ortalama Müşteri Memnuniyeti" },
      { value: "%1.5'in Altında", label: "İade Oranı" },
    ],
    sec1Title: "Zirve",
    sec1Text: "İsmini, dağcıların zirvesine ulaşması en zor ve prestijli dağlardan biri olan K2'den alan markamız, 'Karanlığı Aydınlatıyoruz' vizyonuyla hareket etmektedir.",
    sec2Title: "Geniş Yelpaze",
    sec2Text: "Kendal Elektrik'in profesyonel LED aydınlatma sistemleri, enerji verimliliği odaklı çözümleri ve dekoratif ürünlerini içeren geniş yelpazesini temsil eder. K2, Türkiye'nin en prestijli ve güvenilir aydınlatma markalarından biri olarak sektöre öncülük ediyor.",
    popularLabel: "Ürün Kategorileri",
    popularTitle: "Kategorilerimiz",
    categoryCountLabel: "Ürün",
    viewAllLabel: "Tüm Kategoriler",
    dealerEyebrow: "Yurt İçi Ağımız",
    dealerTitle: "Türkiye'nin her noktasında yanınızdayız.",
    dealerBadge: "67 İlde Yetkili Bayimiz Var",
    dealerLabel: "Yetkili Bayi",
    dealerHint: "İl üzerine gelerek bayi ağımızı keşfedin.",
    exportEyebrow: "Global Erişim",
    exportTitle: "K2'nin ışığı sınır tanımıyor.",
    exportHint: "Haritadaki noktalara tıklayın.",
    sec3Title: "Zorlu Koşullar",
    sec3Text: "Spot, LED panel, projektör, solar armatür ve magnet sistemlerden dekoratif aydınlatmaya uzanan geniş ürün gamıyla K2; ev ve ofis aydınlatmasında yenilikçi LED çözümleriyle enerjiden tasarruf edin, geleceğe yatırım yapın.",
    catalogBtn: "Ürünleri İncele"
  },
  en: {
    heroSub: "WE ILLUMINATE THE DARKNESS",
    explore: "Discover the Story",
    whyEyebrow: "Why K2?",
    whyHeading: "The trusted brand that lights up the dark.",
    whySubtext: "Backed by Kendal Elektrik's assurance, K2 stands out with professional LED technology and durability.",
    trustStats: [
      { value: "A Peak Name in the Industry", label: "In Professional LED Lighting" },
      { value: "9.5 / 10", label: "Average Customer Satisfaction" },
      { value: "Under 1.5%", label: "Return Rate" },
    ],
    sec1Title: "The Peak",
    sec1Text: "Taking its name from K2, one of the most difficult and prestigious mountains for climbers to conquer, our brand operates with the vision to 'Illuminate the Darkness'.",
    sec2Title: "Wide Range",
    sec2Text: "Represents the wide range of Kendal Elektrik's professional LED lighting systems, energy efficiency-oriented solutions, and decorative products. K2 leads the industry as one of Turkey's most prestigious and trusted lighting brands.",
    popularLabel: "Product Categories",
    popularTitle: "Our Categories",
    categoryCountLabel: "Products",
    viewAllLabel: "All Categories",
    dealerEyebrow: "Our Domestic Network",
    dealerTitle: "By your side, everywhere in Turkey.",
    dealerBadge: "Authorized Dealers in 67 Provinces",
    dealerLabel: "Authorized Dealer",
    dealerHint: "Hover a province to explore our dealer network.",
    exportEyebrow: "Global Reach",
    exportTitle: "K2's light knows no borders.",
    exportHint: "Click a point on the map.",
    sec3Title: "Extreme Conditions",
    sec3Text: "From spotlights, LED panels and floodlights to solar fixtures, magnet systems and decorative lighting, K2's extensive range brings innovative LED solutions to home and office lighting — save energy, invest in the future.",
    catalogBtn: "Explore Products"
  }
};

export function K2CreativePage({ allProducts }: K2CreativePageProps) {
  const { language } = useLanguage();
  const t = translations[language as keyof typeof translations] || translations.tr;

  const containerRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLHeadingElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to([heroTextRef.current, scrollHintRef.current], {
        y: -150,
        opacity: 0,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      const sections = gsap.utils.toArray<Element>(".reveal-text");
      sections.forEach((section) => {
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
        <div ref={scrollHintRef} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <p className="text-xs tracking-widest uppercase opacity-50 mb-2">{t.explore}</p>
          <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent"></div>
        </div>
      </section>

      <section className="relative z-10 w-full px-6 md:px-24 py-12 md:py-16">
        <div className="reveal-text bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-8 md:p-14 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="flex flex-col justify-center">
            <div className="inline-flex w-max items-center gap-2 px-4 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-xs md:text-sm font-semibold tracking-widest uppercase text-orange-400 mb-6">
              {t.whyEyebrow}
            </div>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight text-white mb-6">{t.whyHeading}</h2>
            <p className="text-base md:text-lg text-white/60 leading-relaxed max-w-md">{t.whySubtext}</p>
          </div>

          <div className="flex flex-col gap-10 pl-8 md:pl-10 relative">
            <div className="absolute top-2 bottom-2 left-0 w-[2px] bg-white/10 rounded-full"></div>
            {t.trustStats.map((stat) => (
              <div key={stat.label} className="relative">
                <div className="absolute -left-[41px] md:-left-[45px] top-1.5 w-4 h-4 bg-[#0a0a0b] border-2 border-orange-500 rounded-full shadow-sm"></div>
                <div className="text-2xl md:text-4xl font-bold text-orange-400 leading-tight mb-1.5">{stat.value}</div>
                <div className="text-sm md:text-lg text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 w-full px-6 md:px-24 py-12 md:py-16">
        <div className="reveal-text bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-8 md:p-14 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0 md:divide-x md:divide-white/10">
          {[
            { title: t.sec1Title, text: t.sec1Text, icon: MountainIcon },
            { title: t.sec2Title, text: t.sec2Text, icon: LayersIcon },
            { title: t.sec3Title, text: t.sec3Text, icon: ShieldIcon },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`flex flex-col gap-4 ${i > 0 ? "md:pl-10" : ""} ${i < 2 ? "md:pr-10" : ""}`}
              >
                <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-400">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold tracking-widest uppercase text-sm md:text-base text-orange-500">
                  {item.title}
                </h3>
                <p className="text-white/70 text-base md:text-lg leading-relaxed">
                  {item.text}
                </p>
              </div>
            );
          })}
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

      <section className="relative z-10 w-full flex flex-col items-center justify-center px-6 py-12 md:py-16 text-center">
        <Link
          href={process.env.NODE_ENV === "production" ? "/brand/k2/urunler" : "/urunler"}
          className="inline-flex items-center justify-center px-10 py-5 bg-orange-600 text-white font-bold tracking-widest uppercase rounded-full shadow-[0_8px_24px_rgba(249,115,22,0.35)] hover:bg-orange-700 hover:shadow-[0_10px_28px_rgba(249,115,22,0.45)] transition-all duration-300"
        >
          {t.catalogBtn}
        </Link>
      </section>

    </div>
  );
}
