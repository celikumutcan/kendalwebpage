"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useLanguage } from "@/app/i18n/LanguageProvider";
import { gsap } from "@/lib/gsapConfig";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";

export const Production = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const prod = (t as any).production;

  useIsomorphicLayoutEffect(() => {
    if (!prod) return;
    const ctx = gsap.context(() => {
      // Fade in text blocks and images
      const elements = gsap.utils.toArray(".prod-reveal");
      gsap.fromTo(
        elements,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );

      // Stat counters animation
      const statElements = gsap.utils.toArray(".stat-num");
      statElements.forEach((el: any) => {
        const targetValue = parseFloat(el.getAttribute("data-value"));
        const suffix = el.getAttribute("data-suffix") || "";
        const obj = { val: 0 };

        gsap.to(obj, {
          val: targetValue,
          duration: 2.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
          },
          onUpdate: () => {
            el.innerHTML = Math.round(obj.val) + suffix;
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [prod]);

  if (!prod) return null;

  return (
    <section
      id="production"
      ref={containerRef}
      className="w-full bg-[#050505] text-white py-32 px-6 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-[var(--brand-red)] prod-reveal">
          {prod.title}
        </h2>

        {/* Top Section: Image left, Text right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden prod-reveal group">
            <Image
              src="/images/production/uretim-1.jpg"
              alt="Kendal Elektrik Üretim Tesisi 1"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
          </div>
          <div className="space-y-6 prod-reveal text-white/90 leading-relaxed text-lg">
            <p>{prod.text1}</p>
          </div>
        </div>

        {/* Stats Section */}
        <div 
          ref={statsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 prod-reveal"
        >
          {/* Stat 1 */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:border-[var(--brand-red)] transition-colors">
            <div 
              className="stat-num text-5xl md:text-6xl font-bold text-[var(--brand-red)] mb-4"
              data-value="60"
              data-suffix="M+"
            >
              0M+
            </div>
            <div className="text-white/70 font-medium tracking-wide">
              {prod.stat1_label}
            </div>
          </div>
          
          {/* Stat 2 */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:border-[var(--brand-red)] transition-colors">
            <div 
              className="stat-num text-5xl md:text-6xl font-bold text-[var(--brand-red)] mb-4"
              data-value="200"
              data-suffix=""
            >
              0
            </div>
            <div className="text-white/70 font-medium tracking-wide">
              {prod.stat2_label}
            </div>
          </div>

          {/* Stat 3 */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:border-[var(--brand-red)] transition-colors">
            <div 
              className="stat-num text-5xl md:text-6xl font-bold text-[var(--brand-red)] mb-4"
              data-value="97"
              data-suffix="/100"
            >
              0/100
            </div>
            <div className="text-white/70 font-medium tracking-wide">
              {prod.stat3_label}
            </div>
          </div>
        </div>

        {/* Bottom Section: Text left, Image right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 prod-reveal text-white/90 leading-relaxed text-lg lg:order-1 order-2">
            <p>{prod.text2}</p>
            <p>{prod.text3}</p>
          </div>
          <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden prod-reveal group lg:order-2 order-1">
            <Image
              src="/images/production/uretim-2.jpg"
              alt="Kendal Elektrik Üretim Tesisi 2"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
          </div>
        </div>
      </div>
    </section>
  );
};
