"use client";

import React, { useRef } from "react";
import { useLanguage } from "@/app/i18n/LanguageProvider";
import { gsap } from "@/lib/gsapConfig";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";

export const NewsTicker = () => {
  const { t } = useLanguage();
  const trackRef = useRef<HTMLDivElement>(null);

  // Use type assertion since we know it's an array of strings in JSON
  const newsItems = (t as any).news?.items as string[] || [];

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (trackRef.current && newsItems.length > 0) {
        gsap.to(trackRef.current, {
          xPercent: -50,
          repeat: -1,
          duration: 30,
          ease: "linear",
        });
      }
    }, trackRef);

    return () => ctx.revert();
  }, [newsItems.length]);

  if (newsItems.length === 0) return null;

  return (
    <div className="w-full bg-white/5 border-b border-white/10 py-2 overflow-hidden text-xs md:text-sm font-medium tracking-wide text-white/70 backdrop-blur-sm relative z-30 pt-20">
      <div className="flex w-max" ref={trackRef}>
        {/* Double array for seamless loop */}
        {[...newsItems, ...newsItems].map((item, idx) => (
          <div key={idx} className="flex items-center px-8">
            <span className="w-1.5 h-1.5 rounded-full bg-white/40 mr-4 inline-block" />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};
