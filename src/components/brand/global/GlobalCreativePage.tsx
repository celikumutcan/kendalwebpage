'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import type React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { CategoryShowcase } from '@/components/brand/shared/CategoryShowcase';
import { DealerMap } from '@/components/brand/shared/DealerMap';
import type { Product } from '@/data/products';
import { getAssetPath } from '@/lib/basePath';
import { useLanguage } from '@/lib/i18n/LanguageProvider';
import { GlobalPreloader } from './GlobalPreloader';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const GLOBAL_ACCENT = '#e6b800';

interface GlobalCreativePageProps {
  allProducts: Product[];
}

const translations = {
  tr: {
    heroSub: 'KAPSAMLI AYDINLATMA ÇÖZÜMLERİ',
    heroTitle: 'IŞIĞIN YENİ BOYUTU',
    explore: 'Işığı Keşfet',
    whyEyebrow: 'Neden Global?',
    whyHeading: 'Aydınlatmada güvenilir bir isim.',
    whySubtext:
      "Global, Kendal Elektrik'in 29 yıllık üretim tecrübesiyle güçleniyor.",
    trustStats: [
      {
        value: 'Sektörün Güvendiği İsimlerden',
        label: 'Aydınlatma Markaları Arasında',
      },
      {
        numericTarget: 9.6,
        suffix: ' / 10',
        label: 'Ortalama Müşteri Memnuniyeti',
      },
      { value: "%2'nin Altında", label: 'İade Oranı' },
    ],
    sec1Title: 'Kusursuz Güç',
    sec1Text:
      'Kendal Elektrik güvencesiyle, projelerinizi aydınlatacak en parlak ve en güçlü çözümler.',
    sec2Title: 'Sınırsız Performans',
    sec2Text:
      'Endüstriyel tesislerden yaşam alanlarına kadar her noktada ışığın enerjisini hissettiren benzersiz aydınlatma ağı.',
    popularLabel: 'Ürün Kategorileri',
    popularTitle: 'Kategorilerimiz',
    categoryCountLabel: 'Ürün',
    viewAllLabel: 'Tüm Kategoriler',
    dealerEyebrow: 'Yurt İçi Ağımız',
    dealerTitle: "Türkiye'nin her köşesine ışık taşıyan güçlü bir ağ.",
    dealerBadge: '77 İlde Yetkili Bayimiz Var',
    dealerLabel: 'Yetkili Bayi',
    dealerHint: 'İl üzerine gelerek bayi ağımızı keşfedin.',
    sec3Title: 'Geleceğin Işığı',
    sec3Text:
      'Daha parlak, daha uzun ömürlü ve sınırları zorlayan yüksek teknolojili tasarımlar.',
    catalogBtn: 'Ürünleri İncele',
  },
  en: {
    heroSub: 'COMPREHENSIVE LIGHTING SOLUTIONS',
    heroTitle: 'NEW DIMENSION OF LIGHT',
    explore: 'Discover the Light',
    whyEyebrow: 'Why Global?',
    whyHeading: 'A trusted name in lighting.',
    whySubtext:
      "Global is backed by Kendal Elektrik's 29 years of manufacturing experience.",
    trustStats: [
      { value: 'A Trusted Industry Name', label: 'Among Lighting Brands' },
      {
        numericTarget: 9.6,
        suffix: ' / 10',
        label: 'Average Customer Satisfaction',
      },
      { value: 'Under 2%', label: 'Return Rate' },
    ],
    sec1Title: 'Flawless Power',
    sec1Text:
      "With Kendal Elektrik's assurance, the brightest and most powerful solutions to illuminate your projects.",
    sec2Title: 'Limitless Performance',
    sec2Text:
      'A unique lighting network that makes you feel the energy of light everywhere from industrial facilities to living spaces.',
    popularLabel: 'Product Categories',
    popularTitle: 'Our Categories',
    categoryCountLabel: 'Products',
    viewAllLabel: 'All Categories',
    dealerEyebrow: 'Our Domestic Network',
    dealerTitle: 'A powerful network carrying light to every corner of Turkey.',
    dealerBadge: 'Authorized Dealers in 77 Provinces',
    dealerLabel: 'Authorized Dealer',
    dealerHint: 'Hover a province to explore our dealer network.',
    sec3Title: 'Light of the Future',
    sec3Text:
      'Brighter, longer-lasting, and boundary-pushing high-tech designs.',
    catalogBtn: 'Explore Products',
  },
};

function BoltIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" />
    </svg>
  );
}

function InfinityIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18.2 8c5.1 0 5.1 8 0 8-5.1 0-7.1-8-12.2-8-5.1 0-5.1 8 0 8 5.1 0 7.1-8 12.2-8z" />
    </svg>
  );
}

function BulbIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.3h6c0-1 .4-1.8 1-2.3A7 7 0 0 0 12 2Z" />
    </svg>
  );
}

export function GlobalCreativePage({ allProducts }: GlobalCreativePageProps) {
  const { language } = useLanguage();
  const t =
    translations[language as keyof typeof translations] || translations.tr;

  const containerRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const logoRef = useRef<HTMLImageElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubRef = useRef<HTMLSpanElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const statNumberRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const [introDone, setIntroDone] = useState(false);
  const introPlayedRef = useRef(false);
  const handlePreloaderComplete = useCallback(() => setIntroDone(true), []);

  // Hero content reveal, kicked off by GlobalPreloader once its own
  // click/flash sequence completes (mirrors K2/VantiCreativePage's
  // sceneReady-gated reveal effect).
  useEffect(() => {
    if (!introDone || introPlayedRef.current) return;
    introPlayedRef.current = true;

    const tl = gsap.timeline({ delay: 0 });

    tl.fromTo(
      glowRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1.6 },
    )
      .fromTo(
        logoRef.current,
        { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1, duration: 1 },
        '<',
      )
      .fromTo(
        heroTitleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9 },
        '-=0.75',
      )
      .fromTo(
        heroSubRef.current,
        { opacity: 0, letterSpacing: '0.1em' },
        { opacity: 1, letterSpacing: '0.3em', duration: 0.8 },
        '-=0.6',
      )
      .fromTo(
        scrollIndicatorRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.4',
      );

    tl.call(() => {
      gsap.to(glowRef.current, {
        opacity: 0.7,
        scale: 1.08,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });

    return () => {
      tl.kill();
    };
  }, [introDone, language]);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(heroContentRef.current, {
        y: -150,
        opacity: 0,
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      const sections = gsap.utils.toArray<Element>('.reveal-card');
      sections.forEach((section) => {
        const textElements = section.querySelectorAll('.reveal-content');

        const sectionTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            end: 'top 40%',
            scrub: 1,
          },
        });

        sectionTl
          .fromTo(
            section,
            { opacity: 0, y: 50, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 1 },
          )
          .fromTo(
            textElements,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1, stagger: 0.2 },
            '-=0.5',
          );
      });

      gsap.utils.toArray<Element>('.reveal-text').forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: section,
              start: 'top 95%',
              end: 'top 65%',
              scrub: 1,
            },
          },
        );
      });

      t.trustStats.forEach((stat, i) => {
        if (!('numericTarget' in stat)) return;
        const el = statNumberRefs.current[i];
        if (!el) return;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: stat.numericTarget,
          duration: 2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
          },
          onUpdate: () => {
            el.textContent = obj.val.toFixed(1) + stat.suffix;
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [language]);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#fdfbf5] text-black overflow-hidden font-sans min-h-screen"
      style={{ '--page-bg': '#fdfbf5' } as React.CSSProperties}
    >
      <GlobalPreloader onComplete={handlePreloaderComplete} />

      <section
        ref={heroSectionRef}
        className="relative z-10 w-full h-screen flex flex-col items-center justify-center pointer-events-none overflow-hidden px-4"
      >
        <div
          ref={heroContentRef}
          className="absolute inset-0 flex flex-col items-center justify-center px-4"
        >
          <div
            ref={glowRef}
            className="absolute w-[420px] h-[420px] md:w-[620px] md:h-[620px] rounded-full pointer-events-none opacity-0 -mt-8"
            style={{
              background:
                'radial-gradient(circle, rgba(255,203,5,0.35) 0%, rgba(255,203,5,0) 70%)',
            }}
          />
          <div className="text-center flex flex-col items-center justify-center -mt-8">
            <img
              ref={logoRef}
              src={getAssetPath('/images/brands/global-logo.svg')}
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

          <div
            ref={scrollIndicatorRef}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-0"
          >
            <p className="text-xs tracking-widest uppercase mb-4 font-bold text-black bg-[#fff3c4] border border-[#ffcb05]/40 px-5 py-2 rounded-full">
              {t.explore}
            </p>
            <div className="w-[2px] h-16 bg-gradient-to-b from-[#ffcb05]/60 to-transparent rounded-full"></div>
          </div>
        </div>
      </section>

      <div className="reveal-text opacity-0 relative z-10 w-full max-w-5xl mx-auto px-6 -mt-6 md:-mt-10 pb-12 md:pb-16">
        <div className="absolute -bottom-10 -right-16 md:-right-24 w-[380px] h-[380px] md:w-[500px] md:h-[500px] bg-orange-400/25 blur-[110px] rounded-full pointer-events-none z-0" />
        <div className="relative z-10 bg-white shadow-xl border border-gray-100 rounded-[3rem] p-8 md:p-14 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="flex flex-col justify-center">
            <div className="inline-flex w-max items-center gap-2 px-4 py-1.5 rounded-full border border-[#e6b800]/30 bg-[#fff3c4]/50 text-xs md:text-sm font-black tracking-widest uppercase text-[#8a6d00] mb-6">
              {t.whyEyebrow}
            </div>
            <h2 className="text-3xl md:text-5xl font-black leading-tight text-black mb-6">
              {t.whyHeading}
            </h2>
            <p className="text-base md:text-lg text-gray-500 leading-relaxed max-w-md">
              {t.whySubtext}
            </p>
          </div>

          <div className="flex flex-col gap-10 pl-8 md:pl-10 relative">
            <div className="absolute top-2 bottom-2 left-0 w-[2px] bg-gray-200 rounded-full"></div>
            {t.trustStats.map((stat, i) => (
              <div key={stat.label} className="relative">
                <div className="absolute -left-[41px] md:-left-[45px] top-1.5 w-4 h-4 bg-white border-2 border-[#e6b800] rounded-full shadow-sm"></div>
                <div className="text-2xl md:text-4xl font-black text-black leading-tight mb-1.5">
                  {'numericTarget' in stat ? (
                    <span
                      ref={(el) => {
                        statNumberRefs.current[i] = el;
                      }}
                    >
                      0{stat.suffix}
                    </span>
                  ) : (
                    stat.value
                  )}
                </div>
                <div className="text-sm md:text-lg text-gray-500">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="reveal-text opacity-0 relative z-10 w-full max-w-5xl mx-auto px-6 py-12 md:py-16">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] md:w-[560px] md:h-[560px] bg-sky-400/20 blur-[110px] rounded-full pointer-events-none z-0" />
        <div className="relative z-10 bg-white shadow-xl border border-gray-100 rounded-[3rem] p-8 md:p-14 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0 md:divide-x md:divide-gray-100">
          {[
            { title: t.sec1Title, text: t.sec1Text, icon: BoltIcon },
            { title: t.sec2Title, text: t.sec2Text, icon: InfinityIcon },
            { title: t.sec3Title, text: t.sec3Text, icon: BulbIcon },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`flex flex-col gap-4 ${i > 0 ? 'md:pl-10' : ''} ${i < 2 ? 'md:pr-10' : ''}`}
              >
                <div className="w-12 h-12 rounded-full bg-[#fff3c4]/60 flex items-center justify-center text-[#8a6d00]">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-black tracking-[0.2em] uppercase text-sm md:text-base text-gray-400">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-base md:text-lg leading-relaxed">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div className="absolute bottom-0 -left-16 md:-left-24 w-[420px] h-[420px] md:w-[560px] md:h-[560px] bg-violet-400/20 blur-[120px] rounded-full pointer-events-none z-0" />
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
      </div>

      <div className="relative md:-mt-12 overflow-hidden">
        <div className="absolute -top-16 -right-16 md:-right-24 w-[380px] h-[380px] md:w-[500px] md:h-[500px] bg-rose-400/20 blur-[110px] rounded-full pointer-events-none z-0" />
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
      </div>

      <section className="relative z-10 w-full flex flex-col items-center justify-center px-6 py-12 md:py-16 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[420px] h-[420px] md:w-[560px] md:h-[560px] bg-sky-400/15 blur-[110px] rounded-full pointer-events-none z-0" />
        <Link
          href="/urunler"
          className="relative z-10 inline-flex items-center justify-center px-12 py-5 bg-black text-white font-black tracking-widest uppercase rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.25)] hover:bg-gray-800 hover:shadow-[0_10px_28px_rgba(0,0,0,0.35)] transition-all duration-300"
        >
          {t.catalogBtn}
        </Link>
      </section>
    </div>
  );
}
