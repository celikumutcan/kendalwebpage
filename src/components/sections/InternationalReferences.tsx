"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useLanguage } from "@/app/i18n/LanguageProvider";
import { gsap } from "@/lib/gsapConfig";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";

const INT_REFERENCES = [
  {
    id: "elbi",
    name: "Elbi",
    country: "Romania",
    logo: "/images/references/international/elbi-logo.png",
  },
  {
    id: "maktrade",
    name: "MakTrade",
    country: "Serbia",
    logo: "/images/references/international/maktrade-logo.png",
  },
  {
    id: "novatex",
    name: "Novatex",
    country: "Albania",
    logo: "/images/references/international/novatex-logo.png",
  },
  {
    id: "smitcommerce",
    name: "Smit Commerce",
    country: "Croatia",
    logo: "/images/references/international/smitcommerce-logo.png",
  },
];

export const InternationalReferences = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Title fade up
      gsap.from(".int-ref-title", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });

      // Cards stagger fade up
      gsap.from(".int-ref-card", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="international-references"
      ref={containerRef}
      className="w-full bg-transparent py-24 md:py-32 px-6 border-t border-[var(--global-text)]/5"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center int-ref-title">
          <h2 className="text-3xl md:text-5xl font-bold text-[var(--global-text)] opacity-90 tracking-tight">
            {(t as any).international_references?.title || "Yurtdışındaki Referanslarımız"}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {INT_REFERENCES.map((item) => (
            <div
              key={item.id}
              className="int-ref-card bg-white rounded-xl border border-gray-200/50 p-8 flex flex-col items-center justify-center text-center transition-transform duration-300 hover:scale-[1.03] hover:shadow-xl group"
            >
              <div className="relative w-full h-24 mb-6">
                <Image
                  src={item.logo}
                  alt={`${item.name} Logo`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-contain transition-opacity duration-300 group-hover:opacity-90"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">{item.name}</h3>
              <p className="text-gray-500 font-medium">{item.country}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

