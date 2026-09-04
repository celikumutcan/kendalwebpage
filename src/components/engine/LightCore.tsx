'use client';

import type React from 'react';

// CSS-only radial-glow replacement for a prior R3F/Three.js version, which
// blocked the main thread 1-1.6s on first Hero mount just parsing three.js.
// Scroll-driven grow is a compositor-only `transform: scale()` written onto
// glowRef by Hero.tsx; color rides the shared `--accent-current` var.
export const LightCore = ({
  glowRef,
}: {
  glowRef: React.RefObject<HTMLDivElement | null>;
}) => (
  <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
    <div ref={glowRef} className="light-core-scale">
      <div className="light-core-glow" />
    </div>
  </div>
);
