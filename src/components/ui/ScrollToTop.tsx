'use client';

import React, { useEffect, useState } from 'react';
import { useLenis } from '@/components/engine/SmoothScrollProvider';

export const ScrollToTop = ({
  colorClass = 'bg-[var(--brand-red)] hover:bg-[var(--brand-red-deep)] shadow-[0_0_15px_rgba(227,0,15,0.5)]',
}: {
  colorClass?: string;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const lenis = useLenis();

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    if (lenis) {
      (window as any).isProgrammaticScroll = true;
      lenis.scrollTo(0, {
        duration: 1.5,
        force: true,
        onComplete: () => {
          (window as any).isProgrammaticScroll = false;
          window.dispatchEvent(new CustomEvent('scroll-refresh'));
        },
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <button
      onClick={scrollToTop}
      aria-label="Yukarı Çık"
      className={`fixed bottom-6 right-6 z-50 p-3 rounded-full text-white transition-all duration-300 hover:scale-110 focus:outline-none ${colorClass} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={3}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 15.75l7.5-7.5 7.5 7.5"
        />
      </svg>
    </button>
  );
};
