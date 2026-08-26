"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { getAssetPath } from "@/lib/basePath";

interface VantiPreloaderProps {
  ready: boolean;
}

export function VantiPreloader({ ready }: VantiPreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    if (!ready) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: () => setMounted(false) });

      tl.to(logoRef.current, {
        opacity: 0,
        scale: 1.08,
        duration: 0.35,
        ease: "power2.in",
      })
        .to(
          topRef.current,
          { y: "-100%", duration: 1, ease: "expo.inOut" },
          "-=0.05"
        )
        .to(bottomRef.current, { y: "100%", duration: 1, ease: "expo.inOut" }, "<")
        .to(containerRef.current, { autoAlpha: 0, duration: 0.1 });
    }, containerRef);

    return () => ctx.revert();
  }, [ready]);

  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 overflow-hidden pointer-events-none"
    >
      <div
        ref={topRef}
        className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-br from-teal-100 to-sky-200 pointer-events-auto"
      />
      <div
        ref={bottomRef}
        className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-br from-teal-100 to-sky-200 pointer-events-auto"
      />
      <div
        ref={logoRef}
        className="absolute inset-0 flex items-center justify-center"
      >
        <img
          src={getAssetPath("/images/brands/vanti-logo.svg")}
          alt="Vanti"
          className="h-16 md:h-20 opacity-90 animate-pulse drop-shadow-md"
        />
      </div>
    </div>
  );
}
