"use client";

import React, { useRef } from "react";
import { gsap } from "@/lib/gsapConfig";
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

    return () => {
      // Cleanup all GSAP animations registered in this context
      ctx.current?.revert();
    };
  }, []);

  return <>{children}</>;
};
