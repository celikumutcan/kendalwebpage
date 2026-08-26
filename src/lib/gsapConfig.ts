import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const GSAP_DEFAULTS = {
  ease: "power3.out",
  duration: 1.2,
};

export const ST_DEFAULTS = {
  start: "top 85%",
  toggleActions: "play none none reverse",
};

export { gsap, ScrollTrigger };
