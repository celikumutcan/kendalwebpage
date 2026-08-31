'use client';

import gsap from 'gsap';
import React, { useEffect, useRef, useState } from 'react';

interface GlobalPreloaderProps {
  onComplete: () => void;
}

const CURSOR_END_X = 45;
const CURSOR_END_Y = 101;

const CursorIcon = () => (
  <svg
    width="60"
    height="65"
    viewBox="0 0 24 26"
    xmlns="http://www.w3.org/2000/svg"
    className="drop-shadow-[0_2px_5px_rgba(0,0,0,0.4)]"
  >
    <polygon
      points="2,2 2,22 8,17 11,24 15,22 12,15 20,15"
      fill="#ffffff"
      stroke="#1a1a1a"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
  </svg>
);

const SwitchIcon = () => (
  <svg
    width="100"
    height="150"
    viewBox="0 0 80 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]"
  >
    <rect
      x="5"
      y="5"
      width="70"
      height="110"
      rx="8"
      stroke="rgba(255,255,255,0.4)"
      strokeWidth="2"
      fill="rgba(10,10,12,0.9)"
    />
    <rect
      className="switch-toggle"
      x="25"
      y="65"
      width="30"
      height="40"
      rx="4"
      fill="rgba(255,255,255,0.15)"
      stroke="rgba(255,255,255,0.6)"
      strokeWidth="1"
    />
  </svg>
);

export function GlobalPreloader({ onComplete }: GlobalPreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        cursorRef.current,
        { x: 220, y: 260, opacity: 0 },
        {
          x: CURSOR_END_X,
          y: CURSOR_END_Y,
          opacity: 1,
          duration: 1.5,
          ease: 'power2.out',
        },
      );

      tl.to(cursorRef.current, {
        scale: 0.85,
        duration: 0.12,
        ease: 'power1.in',
        transformOrigin: '8% 8%',
      })
        .to(
          '.switch-toggle',
          {
            y: 6,
            fill: 'rgba(255,255,255,1)',
            duration: 0.12,
            ease: 'power1.in',
          },
          '<',
        )
        .to(cursorRef.current, {
          scale: 1,
          duration: 0.18,
          ease: 'power1.out',
          transformOrigin: '8% 8%',
        })
        .to('.switch-toggle', { y: 0, duration: 0.18, ease: 'power1.out' }, '<')
        .fromTo(
          rippleRef.current,
          { scale: 0.3, opacity: 0.9 },
          { scale: 2.4, opacity: 0, duration: 0.45, ease: 'power1.out' },
          '<',
        );

      tl.to(flashRef.current, { opacity: 1, duration: 0.25 }).to(
        [cursorRef.current, '.switch-container'],
        { opacity: 0, duration: 0.12 },
        '<',
      );

      // Reveal begins here: the actual page (already cream underneath) is
      // let through as this whole overlay fades out. Parent's hero-content
      // reveal is kicked off in lockstep via onComplete.
      tl.call(onComplete);
      tl.to(
        containerRef.current,
        { opacity: 0, duration: 0.5, ease: 'power2.out' },
        '+=0.05',
      ).call(() => setMounted(false));
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 overflow-hidden pointer-events-none"
    >
      <div className="absolute inset-0 bg-black" />

      <div className="relative w-full h-full flex items-center justify-center px-4">
        <div className="relative">
          <div className="switch-container">
            <SwitchIcon />
          </div>
          <div
            ref={cursorRef}
            className="absolute top-0 left-0"
            style={{ opacity: 0 }}
          >
            <CursorIcon />
          </div>
          <div
            ref={rippleRef}
            className="absolute rounded-full border-2 border-white pointer-events-none"
            style={{ width: 16, height: 16, left: 42, top: 98, opacity: 0 }}
          />
        </div>
      </div>

      <div ref={flashRef} className="absolute inset-0 bg-white opacity-0" />
    </div>
  );
}
