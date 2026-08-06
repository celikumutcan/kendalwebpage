"use client";

import React, { useRef } from "react";
import { gsap } from "@/lib/gsapConfig";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import { useLanguage } from "@/app/i18n/LanguageProvider";

import Image from "next/image";
import { getAssetPath } from "@/utils/basePath";

const STATS = [
  { value: 29, label: "Yıllık Tecrübe", suffix: "" },
  { value: 22000, label: "m² Kapalı Alan", suffix: "" },
  { value: 350, label: "İstihdam", suffix: "+" },
  { value: 80, label: "Milyon+ Yıllık Üretim Hacmi", suffix: "" },
  { value: 1000, label: "Çeşit Farklı Ürün", suffix: "+" },
  { value: 540, label: "Türkiye Çapında Bayi", suffix: "+" },
];

export const CompanyStats = () => {
  const containerRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const { t } = useLanguage();
  const statData = (t as any).company_stats?.stats || STATS;

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect for the background
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          yPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      }

      STATS.forEach((stat, index) => {
        const el = numberRefs.current[index];
        if (el) {
          const obj = { val: 0 };
          gsap.to(obj, {
            val: stat.value,
            duration: 2.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
            },
            onUpdate: () => {
              if (el) {
                el.innerHTML = Math.round(obj.val).toLocaleString('tr-TR') + stat.suffix;
              }
            }
          });
        }
      });

      gsap.fromTo(
        ".stat-item",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="stats" ref={containerRef} className="py-24 md:py-32 relative border-y border-white/10 overflow-hidden bg-black text-white">
      {/* Background Image with Parallax */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div ref={bgRef} className="absolute -top-[20%] -bottom-[20%] -left-[10%] -right-[10%] w-[120%] h-[140%]">
          <Image 
            src={getAssetPath("/images/fabric-photo.png")}
            alt="Factory Background"
            fill
            sizes="100vw"
            quality={75}
            className="object-cover opacity-90"
          />
        </div>
        {/* Organic gradients: Strong black on the left for text, dark on bottom for stats, transparent on top right */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/40" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Top Text Section */}
        <div className="flex flex-col md:flex-row gap-12 md:gap-24 mb-24 items-start">
          <div className="md:w-1/3">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
              {(t as any).company_stats?.title_part1 || "Aydınlatmada"} <br /> <span className="text-[var(--brand-red)]">{(t as any).company_stats?.title_part2 || "Türkiye'nin"}</span> {(t as any).company_stats?.title_part3 || "Gururu"}
            </h2>
            <div className="w-16 h-1 bg-[var(--brand-red)] rounded-full shadow-[0_0_10px_rgba(227,0,15,0.5)]"></div>
          </div>
          <div className="md:w-2/3">
            <p className="text-white/90 text-lg md:text-xl leading-relaxed font-light text-justify drop-shadow-md">
              {(t as any).company_stats?.desc || "Sektördeki yolculuğuna 1997 yılında başlayan Kendal Elektrik A.Ş., bugün geldiği noktada üretim, kalite ve inovasyon gücüyle Türkiye aydınlatma pazarının en büyük üreticilerinden biri konumundadır. Sürekli gelişen teknolojik altyapımız, taviz vermediğimiz kalite standartlarımız ve her geçen gün büyüyen üretim hedeflerimizle; sadece ülkemizde değil, küresel ölçekte de dünya standartlarında bir değer yaratmaya tüm hızımızla devam ediyoruz."}
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-16">
          {STATS.map((stat, idx) => (
            <div key={idx} className="stat-item flex flex-col items-start border-l-2 border-[var(--brand-red)]/80 pl-6 hover:border-[var(--brand-red)] transition-colors duration-300 group">
              <div className="text-4xl md:text-6xl font-bold text-white mb-3 tracking-tighter flex items-center group-hover:scale-105 transition-transform duration-300 origin-left drop-shadow-lg">
                <span ref={(el) => { numberRefs.current[idx] = el; }} suppressHydrationWarning>
                  {stat.value.toLocaleString('tr-TR')}{statData[idx]?.suffix || stat.suffix}
                </span>
              </div>
              <div className="text-white/70 text-sm md:text-base font-semibold tracking-wider uppercase group-hover:text-white transition-colors duration-300 drop-shadow-md">
                {statData[idx]?.label || stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
