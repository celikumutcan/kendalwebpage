'use client';

import type React from 'react';

// Lightweight radial-glow "aperture" effect for the Hero background — no
// WebGL/Three.js. The previous React Three Fiber implementation pulled in
// ~1MB of minified three.js just to render a single full-screen shader
// plane; parsing/executing that on first Hero mount blocked the main
// thread for 1-1.6s (measured on both dev and production builds — not a
// dev-server artifact). This reproduces the same read (small pulsing core
// that "opens up" into a wide glow as the user scrolls, color shifting
// cool -> warm) with a couple of stacked CSS radial-gradients:
//   - the scroll-driven "aperture" grow is a `transform: scale()` written
//     directly onto `glowRef` by Hero.tsx's existing ScrollTrigger onUpdate
//     (GPU-composited, no repaint per frame — same pattern used elsewhere
//     in this codebase, e.g. LightTemperatureProvider's CSS var writes).
//   - the color comes from the site-wide `--accent-current` variable that
//     LightTemperatureProvider already maintains, so no extra per-frame
//     color computation is needed here.
//   - the gentle pulse is a plain CSS `@keyframes` animation (also
//     compositor-only), independent of the scroll-driven scale.
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
