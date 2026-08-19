"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
    heroSub: "KAPSAMLI AYDINLATMA ÇÖZÜMLERİ",
    heroTitle: "IŞIĞIN YENİ BOYUTU",
    explore: "Işığı Keşfet",
    sec1Title: "Kusursuz Güç",
    sec1Text: "Kendal Elektrik güvencesiyle, projelerinizi aydınlatacak en parlak ve en güçlü çözümler.",
    sec2Title: "Sınırsız Performans",
    sec2Text: "Endüstriyel tesislerden yaşam alanlarına kadar her noktada ışığın enerjisini hissettiren benzersiz aydınlatma ağı.",
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
    sec3Title: "Light of the Future",
    sec3Text: "Brighter, longer-lasting, and boundary-pushing high-tech designs.",
    catalogBtn: "Explore Products"
  }
};

// A simple, unmistakable cursor arrow instead of a hand — much easier to read
// clearly at this size. Tip sits at local (5, 5). Keep in sync with
// CURSOR_END_X/Y below.
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

// Aligns the cursor's tip (local 5,5) with the switch-toggle's center (~50,106) in shared parent space.
const CURSOR_END_X = 45;
const CURSOR_END_Y = 101;

export function GlobalCreativePage({ products }: GlobalCreativePageProps) {
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
      // Autoplay intro: hand approaches, presses the switch, screen flashes,
      // logo/title reveal. Runs once on load, no scrolling required. Everything
      // is one timeline so ordering (e.g. flash fully gone before logo fades in)
      // stays guaranteed regardless of playback speed.
      const introTl = gsap.timeline({ delay: 0 });

      // 1. Cursor slides in toward the switch
      introTl.fromTo(
        cursorRef.current,
        { x: 220, y: 260, opacity: 0 },
        { x: CURSOR_END_X, y: CURSOR_END_Y, opacity: 1, duration: 1.5, ease: "power2.out" }
      );

      // 2. Click: a quick scale pulse anchored on the cursor's tip (not the
      // center) so it reads as a click, not a slide, plus the toggle depressing
      // in sync and a tap-ripple pulsing out to make the "click" unmistakable
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

      // 3. Light switches on: flash rises, cursor/switch disappear
      introTl
        .to(flashRef.current, { opacity: 1, duration: 0.25 })
        .to(containerRef.current, { backgroundColor: "#fdfbf5", duration: 0 }, "<")
        .to([cursorRef.current, ".switch-container"], { opacity: 0, duration: 0.12 }, "<");

      // 4. Flash fully fades out BEFORE the logo starts appearing, so the white
      // overlay never washes out the logo while it's revealing
      introTl.to(flashRef.current, { opacity: 0, duration: 0.18 });

      // 5. Reveal logo, title, subtitle, scroll indicator, and a warm gold glow
      // behind the logo — reads as the light actually illuminating the room
      introTl
        .fromTo(glowRef.current, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1.6 }, "-=0.08")
        .fromTo(logoRef.current, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 1 }, "<")
        .fromTo(heroTitleRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9 }, "-=0.75")
        .fromTo(heroSubRef.current, { opacity: 0, letterSpacing: "0.1em" }, { opacity: 1, letterSpacing: "0.3em", duration: 0.8 }, "-=0.6")
        .fromTo(scrollIndicatorRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4");

      // Once settled, let the glow breathe gently — a small "living light" touch
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

      // HERO PARALLAX SCROLL: content drifts up and fades as the user scrolls the
      // intro section itself out of view (no fixed pixel offset needed now that
      // it isn't pinned)
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

      // 3. REVEAL SECTIONS
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
    }, containerRef);

    return () => ctx.revert();
  }, [language]);

  return (
    // Page starts with bg-black for the dark room switch intro. GSAP turns it to #f8f9fa during the flash.
    <div ref={containerRef} className="relative w-full bg-black text-black overflow-hidden font-sans min-h-screen">
      
      {/* 
        NO 3D SCENE! 
        Removed GlobalScene completely to prevent any flickering or conflicts.
        The background is now purely handled by the container's backgroundColor via GSAP.
      */}

      {/* INTRO + HERO: plays automatically on load — cursor approaches, clicks the
          switch, the screen flashes white, then the logo/title reveal. No
          scrolling required to trigger it. */}
      <section ref={introRef} className="relative z-50 w-full h-screen flex flex-col items-center justify-center pointer-events-none overflow-hidden px-4">
        <div className="relative">
          <div className="switch-container">
            <SwitchIcon />
          </div>
          <div ref={cursorRef} className="absolute top-0 left-0" style={{ opacity: 0 }}>
            <CursorIcon />
          </div>
          {/* Tap ripple, centered on the switch-toggle button */}
          <div
            ref={rippleRef}
            className="absolute rounded-full border-2 border-white pointer-events-none"
            style={{ width: 16, height: 16, left: 42, top: 98, opacity: 0 }}
          />
        </div>

        {/* Blinding White Flash Layer */}
        <div ref={flashRef} className="absolute inset-0 bg-white opacity-0 pointer-events-none" />

        {/* Hero content, revealed only after the flash has fully faded */}
        <div ref={heroContentRef} className="absolute inset-0 flex flex-col items-center justify-center px-4">
          {/* Warm gold glow behind the logo — the room catching the light */}
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

          {/* Scroll Indicator */}
          <div ref={scrollIndicatorRef} className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-0">
            <p className="text-xs tracking-widest uppercase mb-4 font-bold text-black bg-[#fff3c4] border border-[#ffcb05]/40 px-5 py-2 rounded-full">
              {t.explore}
            </p>
            <div className="w-[2px] h-16 bg-gradient-to-b from-[#ffcb05]/60 to-transparent rounded-full"></div>
          </div>
        </div>
      </section>

      {/* STORY SECTIONS */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 py-32 space-y-40">
        
        {/* Section 1 */}
        <section className="reveal-card flex flex-col items-center text-center bg-white shadow-xl border border-gray-100 p-12 md:p-20 rounded-[3rem]">
          <div className="reveal-content w-16 h-[2px] bg-[#ffcb05] mb-8"></div>
          <h3 className="reveal-content font-black tracking-[0.3em] mb-6 uppercase text-lg text-gray-400">
            {t.sec1Title}
          </h3>
          <h2 className="reveal-content text-3xl md:text-5xl font-light leading-tight text-black">
            {t.sec1Text}
          </h2>
        </section>

        {/* Section 2 */}
        <section className="reveal-card flex flex-col items-center text-center bg-white shadow-xl border border-gray-100 p-12 md:p-20 rounded-[3rem]">
          <div className="reveal-content w-16 h-[2px] bg-[#ffcb05] mb-8"></div>
          <h3 className="reveal-content font-black tracking-[0.3em] mb-6 uppercase text-lg text-gray-400">
            {t.sec2Title}
          </h3>
          <h2 className="reveal-content text-3xl md:text-5xl font-light leading-tight text-black">
            {t.sec2Text}
          </h2>
        </section>

        {/* Section 3 */}
        <section className="reveal-card flex flex-col items-center text-center bg-white shadow-xl border border-gray-100 p-12 md:p-20 rounded-[3rem]">
          <div className="reveal-content w-16 h-[2px] bg-[#ffcb05] mb-8"></div>
          <h3 className="reveal-content font-black tracking-[0.3em] mb-6 uppercase text-lg text-gray-400">
            {t.sec3Title}
          </h3>
          <h2 className="reveal-content text-3xl md:text-5xl font-light leading-tight mb-16 text-black">
            {t.sec3Text}
          </h2>
          <Link
            href="/urunler"
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
