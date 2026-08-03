"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useLanguage } from "@/app/i18n/LanguageProvider";
import { gsap } from "@/lib/gsapConfig";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";

const REFERENCE_DATA = [
  // En Prestijli / Bilinen Markalar (Öne Çıkanlar)
  { id: "ref-20", name: "Fethiye & Hasan Gümüşdağ Camii", location: "Küçükçekmece – İstanbul" },
  { id: "ref-30", name: "Levi's", location: "Beyoğlu – İstanbul" },
  { id: "ref-24", name: "Hard Rock Cafe", location: "Beyoğlu – İstanbul" },
  { id: "ref-43", name: "Volkswagen", location: "Çorlu – Tekirdağ" },
  { id: "ref-16", name: "Ducati", location: "Ataşehir – İstanbul" },
  { id: "ref-42", name: "Vitra", location: "Nişantaşı – İstanbul" },
  { id: "ref-15", name: "City’s Mahalle", location: "İstanbul" },
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
  
  // Borusan Oto Grubu
  { id: "ref-06", name: "Borusan Oto", location: "Adana" },
  { id: "ref-07", name: "Borusan Oto", location: "Ataşehir – İstanbul" },
  { id: "ref-08", name: "Borusan Oto", location: "Avcılar – İstanbul" },
  { id: "ref-09", name: "Borusan Oto", location: "Çatalca – İstanbul" },
  { id: "ref-10", name: "Borusan Oto", location: "Samandıra – İstanbul" },

  // AVM ve Zincirler / Diğer Önemli Projeler
  { id: "ref-13", name: "Capitol AVM", location: "İstanbul" },
  { id: "ref-35", name: "Meydan AVM", location: "Ümraniye – İstanbul" },
  { id: "ref-26", name: "İpekyolu Emar AVM", location: "İstanbul" },
  { id: "ref-38", name: "Sport In Street Atlaspark AVM", location: "İstanbul" },
  { id: "ref-31", name: "Love My Body Vadistanbul AVM", location: "İstanbul" },
  { id: "ref-14", name: "Çetinkaya Varlıbaş AVM", location: "Trabzon" },
  { id: "ref-03", name: "Altınyıldız Axis AVM", location: "İstanbul" },
  { id: "ref-23", name: "Gastronometro", location: "Güneşli – İstanbul" },
  { id: "ref-34", name: "Met Global", location: "Şişli – İstanbul" },
  
  // Diğer Kurumsal Projeler
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

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (trackRef.current) {
        gsap.to(trackRef.current, {
          xPercent: -50,
          repeat: -1,
          duration: 200, // Yavaşlatılmış hız (120'den 200'e çıkarıldı)
          ease: "linear",
        });
      }

      gsap.from(".ref-title", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="w-full bg-[#050505] py-32 overflow-hidden border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center ref-title">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
          {(t as any).references?.title || "Türkiye'nin Dört Bir Yanında"}
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          {(t as any).references?.subtitle || "81 ilde sayısız projeyi aydınlatmaya devam ediyoruz."}
        </p>
      </div>

      <div className="flex w-[max-content]" ref={trackRef}>
        {[...REFERENCE_DATA, ...REFERENCE_DATA].map((item, idx) => {
          const isPriority = idx < 4;
          return (
            <div
              key={idx}
              className="flex-shrink-0 relative w-[75vw] sm:w-[45vw] md:w-[35vw] lg:w-[25vw] aspect-[4/3] mx-4 rounded-xl overflow-hidden group border border-white/5"
            >
              <Image
                src={`/images/references/turkiye/${item.id}.jpg`}
                alt={`${item.name} - ${item.location}`}
                fill
                sizes="(max-width: 768px) 75vw, (max-width: 1024px) 35vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority={isPriority}
                loading={isPriority ? "eager" : "lazy"}
              />
              <div className="absolute inset-0 bg-black/10 transition-colors duration-500" />
              
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent opacity-100 flex flex-col justify-end p-5 pointer-events-none">
                <h4 className="text-white font-medium text-lg leading-tight mb-1">{item.name}</h4>
                <p className="text-white/70 text-sm">{item.location}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
