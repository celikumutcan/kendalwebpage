"use client";

import React, { useRef } from "react";
import { useLanguage } from "@/app/i18n/LanguageProvider";
import { gsap } from "@/lib/gsapConfig";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";

export const Projects = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const wrapper = scrollWrapperRef.current;
      if (wrapper) {
        // Horizontal scroll animation
        gsap.to(wrapper, {
          x: () => -(wrapper.scrollWidth - window.innerWidth + 48), // 48 is for padding
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: () => `+=${wrapper.scrollWidth}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const projects = [1, 2, 3, 4, 5];

  return (
    <section
      id="projects"
      ref={containerRef}
      className="w-full bg-black text-white py-24 overflow-hidden"
    >
      <div className="pl-6 md:pl-12 mb-12">
        <h2 className="text-4xl md:text-5xl font-bold">{t.projects.title}</h2>
      </div>
      
      {/* Horizontal scrolling strip */}
      <div ref={scrollWrapperRef} className="flex gap-8 pl-6 md:pl-12 pr-12 w-max">
        {projects.map((proj, i) => (
          <div
            key={i}
            className="w-[80vw] max-w-[600px] aspect-[16/9] bg-white/[0.05] rounded-xl flex items-center justify-center border border-white/10 shrink-0"
          >
            <span className="text-white/20 font-bold text-2xl">Project Image {proj}</span>
          </div>
        ))}
      </div>
    </section>
  );
};
