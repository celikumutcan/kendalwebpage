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

  useIsomorphicLayoutEffect(() => {
    ctx.current = gsap.context(() => {});

    const sections = document.querySelectorAll('section');

    // content-visibility toggles can fire in bursts while scrolling fast
    // (several sections flip skipped/rendered within the same frame or two),
    // and on a long single-page site a fast scroll can pass through several
    // of them over multiple seconds — longer than any reasonable debounce
    // window, so debouncing the cv-events alone still let several refreshes
    // fire mid-scroll (measured: ~4s of the ~7s total main-thread block on a
    // full-page scroll came from these). ScrollTrigger.refresh() is a
    // full-page synchronous layout recalculation (every trigger's position
    // gets re-measured), so what actually matters isn't "did visibility
    // change" but "has scrolling stopped" — positions only need to be correct
    // once the user is done moving, not on every intermediate frame. The
    // native `scroll` listener below re-arms the same debounce timer on every
    // scroll tick, so as long as the user keeps scrolling the timeout never
    // fires; it only lands ~150ms after the LAST scroll tick, i.e. once.
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
      if (!cvEvent.skipped && !(window as WindowWithProgrammaticScrollFlag).isProgrammaticScroll) {
        scheduleRefresh();
      }
    };

    const handleForceRefresh = () => {
      scheduleRefresh();
    };

    const handleScroll = () => {
      if ((window as WindowWithProgrammaticScrollFlag).isProgrammaticScroll) return;
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
