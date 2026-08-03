"use client";

import React, { createContext, useContext, useState, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsapConfig";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import * as THREE from "three";

interface LightTemperatureContextType {
  getProgress: () => number;
}

const LightTemperatureContext = createContext<LightTemperatureContextType>({
  getProgress: () => 0,
});

export const LightTemperatureProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const progressRef = useRef(0);
  const colorCool = useRef(new THREE.Color("#d8e4ff"));
  const colorWarm = useRef(new THREE.Color("#ffb347"));
  const currentColor = useRef(new THREE.Color());

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Removed global background and text color transition to keep the site in a consistent dark theme
      ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          progressRef.current = p;

          // Update CSS custom property for progress (used by LightCore/Globe)
          document.documentElement.style.setProperty("--light-temp", p.toString());

          // Interpolate accent color
          currentColor.current.lerpColors(colorCool.current, colorWarm.current, p);
          document.documentElement.style.setProperty(
            "--accent-current",
            `#${currentColor.current.getHexString()}`
          );
        },
      });
      
      // Initial set
      document.documentElement.style.setProperty("--light-temp", "0");
      document.documentElement.style.setProperty("--accent-current", "#d8e4ff");
    });

    return () => ctx.revert();
  }, []);

  return (
    <LightTemperatureContext.Provider value={{ getProgress: () => progressRef.current }}>
      {children}
    </LightTemperatureContext.Provider>
  );
};

export const useLightTemperature = () => useContext(LightTemperatureContext);
