"use client";

import React, { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsapConfig";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";

export const GsapContext = ({ children }: { children: React.ReactNode }) => {
  const ctx = useRef<ReturnType<typeof gsap.context> | null>(null);

  useIsomorphicLayoutEffect(() => {
    ctx.current = gsap.context(() => {
    });

    const sections = document.querySelectorAll("section");
    const handleContentVisibilityChange = (event: Event) => {
      const cvEvent = event as Event & { skipped?: boolean };
      if (!cvEvent.skipped && !(window as any).isProgrammaticScroll) {
        ScrollTrigger.refresh();
      }
    };

    const handleForceRefresh = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('scroll-refresh', handleForceRefresh);

    sections.forEach((section) => {
      section.addEventListener("contentvisibilityautostatechange", handleContentVisibilityChange);
    });

    return () => {
      sections.forEach((section) => {
        section.removeEventListener("contentvisibilityautostatechange", handleContentVisibilityChange);
      });
      window.removeEventListener('scroll-refresh', handleForceRefresh);
      ctx.current?.revert();
    };
  }, []);

  return <>{children}</>;
};