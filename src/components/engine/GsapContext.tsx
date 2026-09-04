'use client';

import type React from 'react';
import { useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsapConfig';
import { useIsomorphicLayoutEffect } from '@/lib/useIsomorphicLayoutEffect';

// Set by Navbar/ScrollToTop while they drive a programmatic lenis.scrollTo(),
// so scroll-position-derived side effects (like the refresh below) can tell
// that apart from a real user scroll.
type WindowWithProgrammaticScrollFlag = Window & {
  isProgrammaticScroll?: boolean;
};

export const GsapContext = ({ children }: { children: React.ReactNode }) => {
  const ctx = useRef<ReturnType<typeof gsap.context> | null>(null);

  // Debounces ScrollTrigger.refresh() (a full-page synchronous layout
  // recalc) to once ~150ms after scrolling stops, instead of once per
  // content-visibility toggle — a fast scroll can flip many sections'
  // visibility per second, and refreshing on each one measurably blocked
  // the main thread (~4s of ~7s on a full-page scroll).
  useIsomorphicLayoutEffect(() => {
    ctx.current = gsap.context(() => {});

    const sections = document.querySelectorAll('section');

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
      if (
        !cvEvent.skipped &&
        !(window as WindowWithProgrammaticScrollFlag).isProgrammaticScroll
      ) {
        scheduleRefresh();
      }
    };

    const handleForceRefresh = () => {
      scheduleRefresh();
    };

    const handleScroll = () => {
      if ((window as WindowWithProgrammaticScrollFlag).isProgrammaticScroll)
        return;
      scheduleRefresh();
    };

    window.addEventListener('scroll-refresh', handleForceRefresh);
    window.addEventListener('scroll', handleScroll, { passive: true });

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
      window.removeEventListener('scroll', handleScroll);
      ctx.current?.revert();
    };
  }, []);

  return <>{children}</>;
};
