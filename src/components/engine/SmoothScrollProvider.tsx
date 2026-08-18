"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsapConfig";

export const LenisContext = createContext<Lenis | null>(null);

// Returns the shared Lenis instance from context
export const useLenis = () => useContext(LenisContext);

// Creates and provides a single Lenis smooth-scroll instance to the whole app
export const SmoothScrollProvider = ({ children }: { children: React.ReactNode }) => {
  const lenisRef = useRef<Lenis | null>(null);
  const [lenisState, setLenisState] = useState<Lenis | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;
    setLenisState(lenis);

    let ticking = false;
    lenis.on("scroll", () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          ScrollTrigger.update();
          ticking = false;
        });
        ticking = true;
      }
    });

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      setLenisState(null);
    };
  }, []);

  return <LenisContext.Provider value={lenisState}>{children}</LenisContext.Provider>;
};