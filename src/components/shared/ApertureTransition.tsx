'use client';

import React, { useRef } from 'react';
import { gsap } from '@/lib/gsapConfig';
import { useIsomorphicLayoutEffect } from '@/lib/useIsomorphicLayoutEffect';

export const ApertureTransition = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const obj = { radius: 150 };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      tl.to(obj, {
        radius: 0,
        duration: 1,
        ease: 'power2.in',
        onUpdate: () => {
          if (overlayRef.current) {
            overlayRef.current.style.background = `radial-gradient(circle at 50% 50%, transparent ${obj.radius}vw, black ${obj.radius + 5}vw)`;
          }
        },
      }).to(obj, {
        radius: 150,
        duration: 1,
        ease: 'power2.out',
        onUpdate: () => {
          if (overlayRef.current) {
            overlayRef.current.style.background = `radial-gradient(circle at 50% 50%, transparent ${obj.radius}vw, black ${obj.radius + 5}vw)`;
          }
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-[50vh] relative z-40 pointer-events-none"
    >
      <div
        ref={overlayRef}
        className="fixed inset-0 pointer-events-none z-50"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, transparent 150vw, black 155vw)',
        }}
      />
    </div>
  );
};
