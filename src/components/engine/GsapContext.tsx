"use client";

import React, { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsapConfig";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";

// Registers ScrollTrigger (already done in config, but acts as a global GSAP context)
// Provides cleanup on unmount for global animations if needed
export const GsapContext = ({ children }: { children: React.ReactNode }) => {
  const ctx = useRef<ReturnType<typeof gsap.context> | null>(null);

  useIsomorphicLayoutEffect(() => {
    // Create a global context
    ctx.current = gsap.context(() => {
      // Global animations or setup could go here
    });

    // `content-visibility: auto` sections skip rendering while off-screen,
    // so ScrollTrigger measures them using a placeholder size on page load.
    // When the browser actually renders a section for the first time (as the
    // user scrolls near it), its real size may differ from that placeholder.
    // Refresh ScrollTrigger at that exact moment so scroll-linked animations
    // (counters, reveal-on-scroll effects) use correct start/end positions
    // instead of appearing to fire late or jump.
    const sections = document.querySelectorAll("section");
    const handleContentVisibilityChange = (event: Event) => {
      const cvEvent = event as Event & { skipped?: boolean };
      if (!cvEvent.skipped) {
        ScrollTrigger.refresh();
      }
    };

    sections.forEach((section) => {
      section.addEventListener("contentvisibilityautostatechange", handleContentVisibilityChange);
    });

    return () => {
      sections.forEach((section) => {
        section.removeEventListener("contentvisibilityautostatechange", handleContentVisibilityChange);
      });
      // Cleanup all GSAP animations registered in this context
      ctx.current?.revert();
    };
  }, []);

  return <>{children}</>;
};