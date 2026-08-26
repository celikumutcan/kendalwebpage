"use client";

import React, { useRef } from "react";
import { gsap } from "@/lib/gsapConfig";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

// Reusable text-split-reveal component (words)
export const SplitText = ({
  text,
  className = "",
  delay = 0,
  stagger = 0.05,
}: SplitTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray(".split-word") as HTMLElement[];
      
      gsap.fromTo(
        words,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: stagger,
          delay: delay,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [text, delay, stagger]);

  const words = text.split(" ");

  return (
    <div ref={containerRef} className={`${className} flex flex-wrap`}>
      {words.map((word, i) => (
        <div key={i} className="overflow-hidden mr-[0.25em] pb-[0.1em]">
          <span className="split-word inline-block">{word}</span>
        </div>
      ))}
    </div>
  );
};
