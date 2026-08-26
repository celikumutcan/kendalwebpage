"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const DealerMapInner = dynamic(() => import("./DealerMapInner"), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-[900/420] rounded-[2rem] bg-zinc-500/10 border border-zinc-500/20 animate-pulse" />
  ),
});

interface DealerMapProps {
  eyebrow: string;
  title: string;
  hint: string;
  badge: string;
  dealerLabel: string;
  language: string;
  accent: string;
  theme?: "dark" | "light";
}

export function DealerMap({ eyebrow, title, hint, badge, dealerLabel, language, accent, theme = "dark" }: DealerMapProps) {
  const isDark = theme === "dark";
  const placeholderClass = isDark
    ? "bg-black/55 backdrop-blur-xl border-white/10"
    : "bg-white/70 backdrop-blur-xl border-white/50";
  const hintColor = isDark ? "text-white/35" : "text-zinc-500";
  const badgeClass = isDark
    ? "bg-white/10 border-white/15 text-white"
    : "bg-white border-black/5 text-zinc-900 shadow-sm";
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const node = wrapperRef.current;
    if (!node || shouldLoad) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [shouldLoad]);

  return (
    <section className="reveal-text relative z-10 w-full py-20 md:py-28 px-6 md:px-24">
      <div className="mb-10 md:mb-14 text-center max-w-2xl mx-auto">
        <h3 className="font-semibold tracking-widest mb-4 uppercase text-sm md:text-base" style={{ color: accent }}>
          {eyebrow}
        </h3>
        <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-6">{title}</h2>
        <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs md:text-sm font-bold uppercase tracking-wide ${badgeClass}`}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent }} />
          {badge}
        </span>
      </div>

      <div ref={wrapperRef} className="max-w-7xl mx-auto">
        {shouldLoad ? (
          <DealerMapInner language={language} accent={accent} theme={theme} dealerLabel={dealerLabel} />
        ) : (
          <div className={`w-full aspect-[900/420] rounded-[2rem] ${placeholderClass}`} />
        )}
      </div>

      <p className={`text-center ${hintColor} text-xs md:text-sm mt-6`}>{hint}</p>
    </section>
  );
}
