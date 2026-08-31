'use client';

import type React from 'react';
import { useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsapConfig';
import { useIsomorphicLayoutEffect } from '@/lib/useIsomorphicLayoutEffect';

export const GsapContext = ({ children }: { children: React.ReactNode }) => {
  const ctx = useRef<ReturnType<typeof gsap.context> | null>(null);

  useIsomorphicLayoutEffect(() => {
    ctx.current = gsap.context(() => {});

    const sections = document.querySelectorAll('section');

    // content-visibility toggles can fire in bursts while scrolling fast
    // (several sections flip skipped/rendered within the same frame or two).
    // ScrollTrigger.refresh() is a full-page synchronous layout recalculation,
    // so calling it once per event stacks up forced reflows and shows up as
    // scroll stutter. Collapsing a burst into a single refresh after things
    // settle keeps the recalculation but removes the pile-up.
    let refreshTimeout: ReturnType<typeof setTimeout> | null = null;
    const scheduleRefresh = () => {
      if (refreshTimeout) clearTimeout(refreshTimeout);
      refreshTimeout = setTimeout(() => {
        refreshTimeout = null;
        ScrollTrigger.refresh();
      }, 150);
    };

    const handleContentVisibilityChange = (event: Event) => {
      const cvEvent = event as Event & { skipped?: boolean };
      if (!cvEvent.skipped && !(window as any).isProgrammaticScroll) {
        scheduleRefresh();
      }
    };

    const handleForceRefresh = () => {
      scheduleRefresh();
    };

    window.addEventListener('scroll-refresh', handleForceRefresh);

    sections.forEach((section) => {
      section.addEventListener(
        'contentvisibilityautostatechange',
        handleContentVisibilityChange,
      );
    });

    return () => {
      if (refreshTimeout) clearTimeout(refreshTimeout);
      sections.forEach((section) => {
        section.removeEventListener(
          'contentvisibilityautostatechange',
          handleContentVisibilityChange,
        );
      });
      window.removeEventListener('scroll-refresh', handleForceRefresh);
      ctx.current?.revert();
    };
  }, []);

  return <>{children}</>;
};
