"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useLanguage } from "@/app/i18n/LanguageProvider";
import { gsap } from "@/lib/gsapConfig";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import { getAssetPath } from "@/utils/basePath";

const REFERENCE_DATA = [
  { id: "ref-20", name: "Fethiye & Hasan Gümüşdağ Camii", location: "Küçükçekmece – İstanbul" },
  { id: "ref-30", name: "Levi's", location: "Beyoğlu – İstanbul" },
  { id: "ref-24", name: "Hard Rock Cafe", location: "Beyoğlu – İstanbul" },
  { id: "ref-43", name: "Volkswagen", location: "Çorlu – Tekirdağ" },
  { id: "ref-16", name: "Ducati", location: "Ataşehir – İstanbul" },
  { id: "ref-42", name: "Vitra", location: "Nişantaşı – İstanbul" },
  { id: "ref-15", name: "City's Mahalle", location: "İstanbul" },
  { id: "ref-33", name: "MEF Üniversitesi", location: "Maslak – İstanbul" },
  { id: "ref-12", name: "Çanakkale Seramik", location: "Çanakkale" },
  { id: "ref-32", name: "Mavi Jeans Akbatı AVM", location: "İstanbul" },
  { id: "ref-28", name: "Koton Meydan AVM", location: "İstanbul" },
  { id: "ref-11", name: "Camper", location: "Beyoğlu – İstanbul" },
  { id: "ref-41", name: "Triumph", location: "Ataşehir – İstanbul" },
  { id: "ref-21", name: "FLO", location: "Sultanbeyli – İstanbul" },
  { id: "ref-36", name: "Penti", location: "Kadıköy – İstanbul" },
  { id: "ref-22", name: "Flormar Akbatı AVM", location: "İstanbul" },
  { id: "ref-18", name: "E-Bebek Kadir Has AVM", location: "İstanbul" },
  { id: "ref-19", name: "Elle Capacity AVM", location: "İstanbul" },
  { id: "ref-27", name: "Koleksiyon Mobilya", location: "Ankara" },
  { id: "ref-06", name: "Borusan Oto", location: "Adana" },
  { id: "ref-07", name: "Borusan Oto", location: "Ataşehir – İstanbul" },
  { id: "ref-08", name: "Borusan Oto", location: "Avcılar – İstanbul" },
  { id: "ref-09", name: "Borusan Oto", location: "Çatalca – İstanbul" },
  { id: "ref-10", name: "Borusan Oto", location: "Samandıra – İstanbul" },
  { id: "ref-13", name: "Capitol AVM", location: "İstanbul" },
  { id: "ref-35", name: "Meydan AVM", location: "Ümraniye – İstanbul" },
  { id: "ref-26", name: "İpekyolu Emar AVM", location: "İstanbul" },
  { id: "ref-38", name: "Sport In Street Atlaspark AVM", location: "İstanbul" },
  { id: "ref-31", name: "Love My Body Vadistanbul AVM", location: "İstanbul" },
  { id: "ref-14", name: "Çetinkaya Varlıbaş AVM", location: "Trabzon" },
  { id: "ref-03", name: "Altınyıldız Axis AVM", location: "İstanbul" },
  { id: "ref-23", name: "Gastronometro", location: "Güneşli – İstanbul" },
  { id: "ref-34", name: "Met Global", location: "Şişli – İstanbul" },
  { id: "ref-25", name: "İmza Giyim – Merkez Ofis", location: "Küçükçekmece – İstanbul" },
  { id: "ref-29", name: "Kyocera", location: "Üsküdar – İstanbul" },
  { id: "ref-37", name: "Saray Alüminyum", location: "Güneşli – İstanbul" },
  { id: "ref-39", name: "Strada Kış Bahçesi", location: "Bahçeşehir – İstanbul" },
  { id: "ref-04", name: "Arıcıoğlu Otomotiv", location: "Beyoğlu – İstanbul" },
  { id: "ref-05", name: "Arıcıoğlu Otomotiv", location: "Esenler – İstanbul" },
  { id: "ref-17", name: "Duygum Tekstil", location: "Bakırköy – İstanbul" },
  { id: "ref-40", name: "Süpermarket", location: "Gebze – Kocaeli" },
  { id: "ref-01", name: "Açelya Trend", location: "Çerkezköy – Tekirdağ" },
  { id: "ref-02", name: "Aksesuar Group", location: "Florya – İstanbul" },
];

export const Projects = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Slower marquee for less CPU usage
      if (trackRef.current) {
        gsap.to(trackRef.current, {
          xPercent: -50,
          repeat: -1,
          duration: 300, // 200 → 300 (slower)
          ease: "linear",
        });
      }

      // Title reveal
      gsap.from(".ref-title", {
        opacity: 0,
        y: 30,
        filter: "blur(10px)",
        duration: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        }
      });

      // Cinematic illumination
      gsap.fromTo(overlayRef.current,
        { opacity: 0.95 },
        {
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 65%",
            end: "top 15%",
            scrub: true,
          }
        }
      );

      gsap.fromTo(".project-image",
        { filter: "grayscale(100%) brightness(0.3)" },
        {
          filter: "grayscale(0%) brightness(1)",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 65%",
            end: "top 15%",
            scrub: true,
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative w-full bg-transparent py-32 overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-[50vw] h-full pointer-events-none opacity-40 mix-blend-screen" style={{ background: 'radial-gradient(ellipse at -20% 50%, #8a2be2 0%, transparent 70%)' }} />
      <div className="absolute top-0 right-0 w-[50vw] h-full pointer-events-none opacity-30 mix-blend-screen" style={{ background: 'radial-gradient(ellipse at 120% 50%, #ff00ff 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-6 mb-24 text-center ref-title relative z-20">
        <h2 className="text-4xl md:text-6xl font-bold mb-6 text-[var(--global-text)] opacity-90 tracking-tight">
          {(t as any).references?.title || "Türkiye'nin Dört Bir Yanında"}
        </h2>
        <p className="text-[var(--global-text)] opacity-60 text-lg md:text-xl max-w-2xl mx-auto font-light">
          {(t as any).references?.subtitle || "81 ilde sayısız projeyi aydınlatmaya devam ediyoruz."}
        </p>
      </div>

      <div className="relative">
        <div ref={overlayRef} className="absolute inset-0 bg-[var(--global-bg)] z-10 pointer-events-none" />

        <div className="flex w-[max-content]" ref={trackRef}>
          {REFERENCE_DATA.map((item, idx) => {
            const isPriority = idx < 4;
            return (
              <div
                key={`${item.id}-${idx}`}
                className="flex-shrink-0 relative w-[75vw] sm:w-[45vw] md:w-[35vw] lg:w-[25vw] aspect-[4/3] mx-4 rounded-xl overflow-hidden group border border-white/5"
              >
                <Image
                  src={getAssetPath(`/images/references/turkiye/${item.id}.jpg`)}
                  alt={`${item.name} - ${item.location}`}
                  fill
                  sizes="(max-width: 768px) 75vw, (max-width: 1024px) 35vw, 25vw"
                  className="project-image object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ willChange: "filter" }}
                  priority={isPriority}
                  loading={isPriority ? "eager" : "lazy"}
                  quality={75}
                />

                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 flex flex-col justify-end p-6 pointer-events-none">
                  <h4 className="text-white font-bold text-xl md:text-2xl leading-tight mb-2 drop-shadow-md transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{item.name}</h4>
                  <p className="text-white/70 text-sm font-medium tracking-wide transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-75">{item.location}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};