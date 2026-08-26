"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { Product } from "@/data/products";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { getAssetPath } from "@/lib/basePath";
import { ProductCarousel } from "@/components/brand/shared/ProductCarousel";
import { CategoryShowcase } from "@/components/brand/shared/CategoryShowcase";
import { DealerMap } from "@/components/brand/shared/DealerMap";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const GLOBAL_ACCENT = "#e6b800";

interface GlobalCreativePageProps {
  newProducts: Product[];
  allProducts: Product[];
}

const translations = {
  tr: {
    heroSub: "KAPSAMLI AYDINLATMA ÇÖZÜMLERİ",
    heroTitle: "IŞIĞIN YENİ BOYUTU",
    explore: "Işığı Keşfet",
    sec1Title: "Kusursuz Güç",
    sec1Text: "Kendal Elektrik güvencesiyle, projelerinizi aydınlatacak en parlak ve en güçlü çözümler.",
    sec2Title: "Sınırsız Performans",
    sec2Text: "Endüstriyel tesislerden yaşam alanlarına kadar her noktada ışığın enerjisini hissettiren benzersiz aydınlatma ağı.",
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
    dealerBadge: "81 İlde Yetkili Bayimiz Var",
    dealerLabel: "Yetkili Bayi",
    dealerHint: "İl üzerine gelerek bayi ağımızı keşfedin.",
    sec3Title: "Geleceğin Işığı",
    sec3Text: "Daha parlak, daha uzun ömürlü ve sınırları zorlayan yüksek teknolojili tasarımlar.",
    catalogBtn: "Ürünleri İncele"
  },
  en: {
    heroSub: "COMPREHENSIVE LIGHTING SOLUTIONS",
    heroTitle: "NEW DIMENSION OF LIGHT",
    explore: "Discover the Light",
    sec1Title: "Flawless Power",
    sec1Text: "With Kendal Elektrik's assurance, the brightest and most powerful solutions to illuminate your projects.",
    sec2Title: "Limitless Performance",
    sec2Text: "A unique lighting network that makes you feel the energy of light everywhere from industrial facilities to living spaces.",
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
    dealerBadge: "Authorized Dealers in All 81 Provinces",
    dealerLabel: "Authorized Dealer",
    dealerHint: "Hover a province to explore our dealer network.",
    sec3Title: "Light of the Future",
    sec3Text: "Brighter, longer-lasting, and boundary-pushing high-tech designs.",
    catalogBtn: "Explore Products"
  }
};

const CursorIcon = () => (
  <svg width="60" height="65" viewBox="0 0 24 26" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_2px_5px_rgba(0,0,0,0.4)]">
    <polygon
      points="2,2 2,22 8,17 11,24 15,22 12,15 20,15"
      fill="#ffffff"
      stroke="#1a1a1a"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
  </svg>
);

const SwitchIcon = () => (
  <svg width="100" height="150" viewBox="0 0 80 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
    <rect x="5" y="5" width="70" height="110" rx="8" stroke="rgba(255,255,255,0.4)" strokeWidth="2" fill="rgba(10,10,12,0.9)" />
    <rect className="switch-toggle" x="25" y="65" width="30" height="40" rx="4" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.6)" strokeWidth="1" />
  </svg>
);

const CURSOR_END_X = 45;
const CURSOR_END_Y = 101;

export function GlobalCreativePage({ newProducts, allProducts }: GlobalCreativePageProps) {
  const { language } = useLanguage();
  const t = translations[language as keyof typeof translations] || translations.tr;

  const containerRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const logoRef = useRef<HTMLImageElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubRef = useRef<HTMLSpanElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let ctx = gsap.context(() => {
      const introTl = gsap.timeline({ delay: 0 });

      introTl.fromTo(
        cursorRef.current,
        { x: 220, y: 260, opacity: 0 },
        { x: CURSOR_END_X, y: CURSOR_END_Y, opacity: 1, duration: 1.5, ease: "power2.out" }
      );

      introTl
        .to(cursorRef.current, { scale: 0.85, duration: 0.12, ease: "power1.in", transformOrigin: "8% 8%" })
        .to(".switch-toggle", { y: 6, fill: "rgba(255,255,255,1)", duration: 0.12, ease: "power1.in" }, "<")
        .to(cursorRef.current, { scale: 1, duration: 0.18, ease: "power1.out", transformOrigin: "8% 8%" })
        .to(".switch-toggle", { y: 0, duration: 0.18, ease: "power1.out" }, "<")
        .fromTo(
          rippleRef.current,
          { scale: 0.3, opacity: 0.9 },
          { scale: 2.4, opacity: 0, duration: 0.45, ease: "power1.out" },
          "<"
        );

      introTl
        .to(flashRef.current, { opacity: 1, duration: 0.25 })
        .to(containerRef.current, { backgroundColor: "#fdfbf5", duration: 0 }, "<")
        .to([cursorRef.current, ".switch-container"], { opacity: 0, duration: 0.12 }, "<");

      introTl.to(flashRef.current, { opacity: 0, duration: 0.18 });

      introTl
        .fromTo(glowRef.current, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1.6 }, "-=0.08")
        .fromTo(logoRef.current, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 1 }, "<")
        .fromTo(heroTitleRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9 }, "-=0.75")
        .fromTo(heroSubRef.current, { opacity: 0, letterSpacing: "0.1em" }, { opacity: 1, letterSpacing: "0.3em", duration: 0.8 }, "-=0.6")
        .fromTo(scrollIndicatorRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4");

      introTl.call(() => {
        gsap.to(glowRef.current, {
          opacity: 0.7,
          scale: 1.08,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      gsap.to(heroContentRef.current, {
        y: -150,
        opacity: 0,
        scrollTrigger: {
          trigger: introRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      const sections = gsap.utils.toArray(".reveal-card");
      sections.forEach((section: any) => {
        const textElements = section.querySelectorAll(".reveal-content");

        const sectionTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            end: "top 40%",
            scrub: 1,
          }
        });

        sectionTl.fromTo(
          section,
          { opacity: 0, y: 50, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 1 }
        )
        .fromTo(
          textElements,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.2 },
          "-=0.5"
        );
      });

      gsap.utils.toArray(".reveal-text").forEach((section: any) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: { trigger: section, start: "top 95%", end: "top 65%", scrub: 1 },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [language]);

  return (
    <div ref={containerRef} className="relative w-full bg-black text-black overflow-hidden font-sans min-h-screen" style={{ "--page-bg": "#fdfbf5" } as React.CSSProperties}>
      

      <section ref={introRef} className="relative z-50 w-full h-screen flex flex-col items-center justify-center pointer-events-none overflow-hidden px-4">
        <div className="relative">
          <div className="switch-container">
            <SwitchIcon />
          </div>
          <div ref={cursorRef} className="absolute top-0 left-0" style={{ opacity: 0 }}>
            <CursorIcon />
          </div>
          <div
            ref={rippleRef}
            className="absolute rounded-full border-2 border-white pointer-events-none"
            style={{ width: 16, height: 16, left: 42, top: 98, opacity: 0 }}
          />
        </div>

        <div ref={flashRef} className="absolute inset-0 bg-white opacity-0 pointer-events-none" />

        <div ref={heroContentRef} className="absolute inset-0 flex flex-col items-center justify-center px-4">
          <div
            ref={glowRef}
            className="absolute w-[420px] h-[420px] md:w-[620px] md:h-[620px] rounded-full pointer-events-none opacity-0 -mt-20"
            style={{ background: "radial-gradient(circle, rgba(255,203,5,0.35) 0%, rgba(255,203,5,0) 70%)" }}
          />
          <div className="text-center flex flex-col items-center justify-center -mt-20">
            <img
              ref={logoRef}
              src={getAssetPath("/images/brands/global-logo.svg")}
              alt="Global Logo"
              className="h-24 md:h-32 lg:h-40 mx-auto mb-8 opacity-0"
            />
            <h1
              ref={heroTitleRef}
              className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tight text-black mb-4 opacity-0"
            >
              {t.heroTitle}
            </h1>
            <span
              ref={heroSubRef}
              className="text-sm md:text-lg font-bold text-gray-500 uppercase opacity-0 tracking-widest"
            >
              {t.heroSub}
            </span>
          </div>

          <div ref={scrollIndicatorRef} className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-0">
            <p className="text-xs tracking-widest uppercase mb-4 font-bold text-black bg-[#fff3c4] border border-[#ffcb05]/40 px-5 py-2 rounded-full">
              {t.explore}
            </p>
            <div className="w-[2px] h-16 bg-gradient-to-b from-[#ffcb05]/60 to-transparent rounded-full"></div>
          </div>
        </div>
      </section>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 py-32 space-y-40">
        
        <section className="reveal-card flex flex-col items-center text-center bg-white shadow-xl border border-gray-100 p-12 md:p-20 rounded-[3rem]">
          <div className="reveal-content w-16 h-[2px] bg-[#ffcb05] mb-8"></div>
          <h3 className="reveal-content font-black tracking-[0.3em] mb-6 uppercase text-lg text-gray-400">
            {t.sec1Title}
          </h3>
          <h2 className="reveal-content text-3xl md:text-5xl font-light leading-tight text-black">
            {t.sec1Text}
          </h2>
        </section>

        <section className="reveal-card flex flex-col items-center text-center bg-white shadow-xl border border-gray-100 p-12 md:p-20 rounded-[3rem]">
          <div className="reveal-content w-16 h-[2px] bg-[#ffcb05] mb-8"></div>
          <h3 className="reveal-content font-black tracking-[0.3em] mb-6 uppercase text-lg text-gray-400">
            {t.sec2Title}
          </h3>
          <h2 className="reveal-content text-3xl md:text-5xl font-light leading-tight text-black">
            {t.sec2Text}
          </h2>
        </section>

      </div>

      <DealerMap
        eyebrow={t.dealerEyebrow}
        title={t.dealerTitle}
        hint={t.dealerHint}
        badge={t.dealerBadge}
        dealerLabel={t.dealerLabel}
        language={language}
        accent={GLOBAL_ACCENT}
        theme="light"
      />

      <CategoryShowcase
        label={t.popularLabel}
        title={t.popularTitle}
        allProducts={allProducts}
        language={language}
        brandName="global"
        accent={GLOBAL_ACCENT}
        countLabel={t.categoryCountLabel}
        viewAllLabel={t.viewAllLabel}
        align="left"
        theme="light"
      />

      <ProductCarousel
        label={t.newLabel}
        title={t.newTitle}
        products={newProducts}
        language={language}
        modelLabel={t.modelLabel}
        viewLabel={t.viewLabel}
        brandName="global"
        accent={GLOBAL_ACCENT}
        align="right"
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 py-32">
        <section className="reveal-card flex flex-col items-center text-center bg-white shadow-xl border border-gray-100 p-12 md:p-20 rounded-[3rem]">
          <div className="reveal-content w-16 h-[2px] bg-[#ffcb05] mb-8"></div>
          <h3 className="reveal-content font-black tracking-[0.3em] mb-6 uppercase text-lg text-gray-400">
            {t.sec3Title}
          </h3>
          <h2 className="reveal-content text-3xl md:text-5xl font-light leading-tight mb-16 text-black">
            {t.sec3Text}
          </h2>
          <Link
            href={process.env.NODE_ENV === "production" ? "/brand/global/urunler" : "/urunler"}
            className="reveal-content relative group inline-flex items-center justify-center px-12 py-5 bg-black text-white font-black tracking-widest uppercase rounded-full overflow-hidden transition-all duration-300 hover:scale-105"
          >
            <span className="relative z-10">{t.catalogBtn}</span>
            <div className="absolute inset-0 bg-gray-800 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
          </Link>
        </section>

      </div>
    </div>
  );
}
