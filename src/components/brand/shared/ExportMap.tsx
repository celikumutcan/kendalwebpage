"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const ExportMapInner = dynamic(() => import("./ExportMapInner"), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-[980/480] rounded-[2rem] bg-zinc-500/10 border border-zinc-500/20 animate-pulse" />
  ),
});

interface ExportMapProps {
  eyebrow: string;
  title: string;
  hint: string;
  language: string;
  accent: string;
  theme?: "dark" | "light";
}

export function ExportMap({ eyebrow, title, hint, language, accent, theme = "dark" }: ExportMapProps) {
  const isDark = theme === "dark";
  const placeholderClass = isDark
    ? "bg-black/55 backdrop-blur-xl border-white/10"
    : "bg-white/70 backdrop-blur-xl border-white/50";
  const hintColor = isDark ? "text-white/35" : "text-zinc-500";
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

  const textBgClass = isDark
    ? "bg-black/40 backdrop-blur-xl border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
    : "bg-white/50 backdrop-blur-xl border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.1)]";

  return (
    <section className="reveal-text relative z-10 w-full py-12 md:py-16 px-6 md:px-24">
      <div className="flex justify-center mb-10 md:mb-14">
        <div className={`text-center max-w-2xl p-8 md:p-10 rounded-[2.5rem] border ${textBgClass}`}>
          <h3
            className="font-semibold tracking-widest mb-4 uppercase text-sm md:text-base"
            style={{ color: accent }}
          >
            {eyebrow}
          </h3>
          <h2 className="text-3xl md:text-5xl font-bold leading-tight">{title}</h2>
        </div>
      </div>

      <div ref={wrapperRef} className="max-w-[90rem] mx-auto">
        {shouldLoad ? (
          <ExportMapInner language={language} accent={accent} theme={theme} />
        ) : (
          <div className={`w-full aspect-[980/480] rounded-[2rem] ${placeholderClass}`} />
        )}
      </div>

      <p className={`text-center ${hintColor} text-xs md:text-sm mt-6`}>{hint}</p>
    </section>
  );
}
