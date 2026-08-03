"use client";

import React, { createContext, useContext, useState, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsapConfig";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import * as THREE from "three";

interface LightTemperatureContextType {
  progress: number;
}

const LightTemperatureContext = createContext<LightTemperatureContextType>({
  progress: 0,
});

export const LightTemperatureProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [progress, setProgress] = useState(0);
  const colorCool = useRef(new THREE.Color("#d8e4ff"));
  const colorWarm = useRef(new THREE.Color("#ffb347"));
  const currentColor = useRef(new THREE.Color());

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Background colors sequence: Darkness -> Dark Blue -> Dark Gray -> Neutral -> Warm White -> Soft Amber -> Bright White
      const bgColors = ['#000000', '#0a1128', '#1a1a1a', '#4a4a4a', '#f5f5f0', '#fff3e0', '#ffffff'];
      // Text colors: White on dark backgrounds, Dark Gray on light backgrounds
      const textColors = ['#ffffff', '#ffffff', '#ffffff', '#ffffff', '#171717', '#171717', '#171717'];

      const bgInterpolator = gsap.utils.interpolate(bgColors);
      const textInterpolator = gsap.utils.interpolate(textColors);

      ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          setProgress(p);

          // Update CSS custom property for progress
          document.documentElement.style.setProperty("--light-temp", p.toString());

          // Interpolate accent color
          currentColor.current.lerpColors(colorCool.current, colorWarm.current, p);
          document.documentElement.style.setProperty(
            "--accent-current",
            `#${currentColor.current.getHexString()}`
          );

          // Update global background and text
          document.documentElement.style.setProperty("--global-bg", bgInterpolator(p));
          document.documentElement.style.setProperty("--global-text", textInterpolator(p));
        },
      });
      
      // Initial set
      document.documentElement.style.setProperty("--light-temp", "0");
      document.documentElement.style.setProperty("--accent-current", "#d8e4ff");
      document.documentElement.style.setProperty("--global-bg", bgColors[0]);
      document.documentElement.style.setProperty("--global-text", textColors[0]);
    });

    return () => ctx.revert();
  }, []);

  return (
    <LightTemperatureContext.Provider value={{ progress }}>
      {children}
    </LightTemperatureContext.Provider>
  );
};

export const useLightTemperature = () => useContext(LightTemperatureContext);
