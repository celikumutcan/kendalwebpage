'use client';

import type React from 'react';
import { createContext, useContext, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap, ScrollTrigger } from '@/lib/gsapConfig';
import { useIsomorphicLayoutEffect } from '@/lib/useIsomorphicLayoutEffect';

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
  const colorCool = useRef(new THREE.Color('#6fa8ff'));
  const colorWarm = useRef(new THREE.Color('#ffb347'));
  const currentColor = useRef(new THREE.Color());
  const lastAppliedProgress = useRef(-1);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          progressRef.current = p;

          // This trigger spans the whole document, so onUpdate fires on
          // every scroll frame across the entire page. Writing CSS custom
          // properties on documentElement forces a style recalc, so we only
          // do it when progress has moved enough to actually change the
          // rendered color/temperature instead of on every single tick.
          const rounded = Math.round(p * 500) / 500;
          if (rounded === lastAppliedProgress.current) return;
          lastAppliedProgress.current = rounded;

          document.documentElement.style.setProperty(
            '--light-temp',
            rounded.toString(),
          );

          currentColor.current.lerpColors(
            colorCool.current,
            colorWarm.current,
            rounded,
          );
          document.documentElement.style.setProperty(
            '--accent-current',
            `#${currentColor.current.getHexString()}`,
          );
        },
      });

      document.documentElement.style.setProperty('--light-temp', '0');
      document.documentElement.style.setProperty('--accent-current', '#6fa8ff');
    });

    return () => ctx.revert();
  }, []);

  return (
    <LightTemperatureContext.Provider
      value={{ getProgress: () => progressRef.current }}
    >
      {children}
    </LightTemperatureContext.Provider>
  );
};

export const useLightTemperature = () => useContext(LightTemperatureContext);
