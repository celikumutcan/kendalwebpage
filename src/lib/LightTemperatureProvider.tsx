'use client';

import type React from 'react';
import { createContext, useContext } from 'react';
import { useIsomorphicLayoutEffect } from '@/lib/useIsomorphicLayoutEffect';

interface LightTemperatureContextType {
  getProgress: () => number;
}

const LightTemperatureContext = createContext<LightTemperatureContextType>({
  getProgress: () => 0,
});

// The accent light (the Globe's tint) used to warm
// from blue to orange as you scrolled the whole page, via a document-wide
// ScrollTrigger. That warm-up was removed by design — the light now stays
// a fixed cool blue everywhere, on every device — so this provider just
// sets the static CSS vars once and exposes a getProgress() that always
// reads 0, keeping Globe.tsx's existing lerp call (which reads it every
// frame) a harmless no-op instead of having to touch that call site too.
export const LightTemperatureProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  useIsomorphicLayoutEffect(() => {
    document.documentElement.style.setProperty('--light-temp', '0');
    document.documentElement.style.setProperty('--accent-current', '#6fa8ff');
  }, []);

  return (
    <LightTemperatureContext.Provider value={{ getProgress: () => 0 }}>
      {children}
    </LightTemperatureContext.Provider>
  );
};

export const useLightTemperature = () => useContext(LightTemperatureContext);
