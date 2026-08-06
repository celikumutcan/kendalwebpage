"use client";

import React, { useRef } from "react";
import { gsap } from "@/lib/gsapConfig";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";

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
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
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
    <section id="stats" ref={containerRef} className="py-24 md:py-32 bg-transparent relative border-t border-[var(--global-text)]/5 overflow-hidden">
      <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[60%] rounded-full bg-[radial-gradient(circle_at_center,rgba(227,0,15,0.05)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row gap-12 md:gap-24 mb-24 items-start">
          <div className="md:w-1/3">
            <h2 className="text-3xl md:text-5xl font-bold text-[var(--global-text)] mb-6 tracking-tight leading-tight">
              Aydınlatmada <br /> <span className="text-[var(--brand-red)]">Türkiye'nin</span> Gururu
            </h2>
            <div className="w-16 h-1 bg-[var(--brand-red)] rounded-full"></div>
          </div>
          <div className="md:w-2/3">
            <p className="text-[var(--global-text)] opacity-70 text-lg md:text-xl leading-relaxed font-light text-justify">
              Sektördeki yolculuğuna 1997 yılında başlayan Kendal Elektrik A.Ş., bugün geldiği noktada üretim, kalite ve inovasyon gücüyle Türkiye aydınlatma pazarının en büyük üreticilerinden biri konumundadır. Sürekli gelişen teknolojik altyapımız, taviz vermediğimiz kalite standartlarımız ve her geçen gün büyüyen üretim hedeflerimizle; sadece ülkemizde değil, küresel ölçekte de dünya standartlarında bir değer yaratmaya tüm hızımızla devam ediyoruz.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-16">
          {STATS.map((stat, idx) => (
            <div key={idx} className="stat-item flex flex-col items-start border-l border-[var(--brand-red)]/40 pl-6 hover:border-[var(--brand-red)] transition-colors duration-300 group">
              <div className="text-4xl md:text-6xl font-bold text-[var(--global-text)] mb-3 tracking-tighter flex items-center group-hover:scale-105 transition-transform duration-300 origin-left">
                <span ref={(el) => { numberRefs.current[idx] = el; }} suppressHydrationWarning>
                  {stat.value.toLocaleString('tr-TR')}{stat.suffix}
                </span>
              </div>
              <div className="text-[var(--global-text)] opacity-60 text-sm md:text-base font-semibold tracking-wider uppercase group-hover:opacity-100 transition-opacity duration-300">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
