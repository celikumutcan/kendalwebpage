"use client";

import React, { useRef } from "react";
import { useLanguage } from "@/app/i18n/LanguageProvider";
import { gsap } from "@/lib/gsapConfig";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";

// Why Us section: Staggered grid of icons and value props
export const WhyUs = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".why-item");
      
      gsap.fromTo(
        items,
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
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const features = [
    { title: t.why_us.item1_title, desc: t.why_us.item1_desc, icon: "💡" },
    { title: t.why_us.item2_title, desc: t.why_us.item2_desc, icon: "🏆" },
    { title: t.why_us.item3_title, desc: t.why_us.item3_desc, icon: "🏭" },
    { title: t.why_us.item4_title, desc: t.why_us.item4_desc, icon: "🌍" },
    { title: (t as any).why_us.item5_title, desc: (t as any).why_us.item5_desc, icon: "📜" },
  ];

  return (
    <section
      id="why-us"
      ref={containerRef}
      className="w-full bg-black text-white py-32 px-6"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
          {t.why_us.title}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="why-item p-8 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.08] transition-colors"
            >
              <div className="text-4xl mb-6 opacity-80">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
