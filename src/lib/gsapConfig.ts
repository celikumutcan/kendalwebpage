import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect"; // We will create this

// Register ScrollTrigger globally
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Global defaults for GSAP animations
export const GSAP_DEFAULTS = {
  ease: "power3.out",
  duration: 1.2,
};

// Common ScrollTrigger settings
export const ST_DEFAULTS = {
  start: "top 85%",
  toggleActions: "play none none reverse",
};

export { gsap, ScrollTrigger };
