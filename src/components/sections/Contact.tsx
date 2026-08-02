"use client";

import React, { useRef } from "react";
import { useLanguage } from "@/app/i18n/LanguageProvider";
import { gsap } from "@/lib/gsapConfig";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";

// Contact section: Calm, bright closing
export const Contact = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Transition background from black to white as user scrolls in
      gsap.fromTo(
        sectionRef.current,
        { backgroundColor: "#000000", color: "#ffffff" },
        {
          backgroundColor: "#ffffff",
          color: "#000000",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "top center",
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted (frontend-only simulation)");
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="w-full py-32 px-6 transition-colors"
    >
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-12">
          {t.contact.title}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder={t.contact.name}
              required
              className="w-full p-4 bg-black/5 border border-black/10 rounded-lg focus:outline-none focus:border-black/50 transition-colors"
            />
            <input
              type="email"
              placeholder={t.contact.email}
              required
              className="w-full p-4 bg-black/5 border border-black/10 rounded-lg focus:outline-none focus:border-black/50 transition-colors"
            />
          </div>
          <textarea
            placeholder={t.contact.message}
            rows={5}
            required
            className="w-full p-4 bg-black/5 border border-black/10 rounded-lg focus:outline-none focus:border-black/50 transition-colors resize-none"
          ></textarea>
          <button
            type="submit"
            className="self-center bg-[var(--brand-red)] text-white px-10 py-4 rounded-full font-semibold hover:bg-[var(--brand-red-deep)] transition-colors shadow-lg shadow-black/10"
          >
            {t.contact.submit}
          </button>
        </form>
        <p className="mt-12 text-sm opacity-60">
          {t.contact.address}
        </p>
      </div>
    </section>
  );
};
