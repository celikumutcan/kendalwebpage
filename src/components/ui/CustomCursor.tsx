"use client";

import React, { useEffect, useRef } from "react";

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  // High performance mouse tracking (bypasses React state completely)
  useEffect(() => {
    // Only enable on desktop devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let isVisible = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (!cursorRef.current) return;
      
      // Show cursor only after first mouse move
      if (!isVisible) {
        cursorRef.current.style.opacity = "1";
        isVisible = true;
      }

      // 150px is half of the 300px width/height to perfectly center it
      // translate3d uses GPU acceleration and doesn't trigger layout reflows
      cursorRef.current.style.transform = `translate3d(${e.clientX - 150}px, ${e.clientY - 150}px, 0)`;
    };

    const handleMouseLeave = () => {
      if (!cursorRef.current) return;
      cursorRef.current.style.opacity = "0";
      isVisible = false;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseout", handleMouseLeave, { passive: true });
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-[300px] h-[300px] rounded-full pointer-events-none z-[90] mix-blend-screen will-change-transform transition-opacity duration-500 opacity-0 hidden md:block"
      style={{
        background: "radial-gradient(circle at center, rgba(255,255,255,0.06) 0%, rgba(227,0,15,0.02) 40%, transparent 70%)",
      }}
    />
  );
};
