'use client';

import Image from 'next/image';
import React from 'react';
import { getAssetPath } from '@/lib/basePath';
import { useLanguage } from '@/lib/i18n/LanguageProvider';

export function MissionVisionClient() {
  const { t, language } = useLanguage();

  const missionData = (t as any).mission_page || {
    title: 'Misyon',
    content:
      "Kendal Elektrik olarak, aydınlatma sektöründe yenilikçi, güvenilir ve sürdürülebilir çözümler sunarak müşterilerimize, ortaklarımıza ve topluma değer katmayı hedefliyoruz. Ar-Ge ve üretim yeteneklerimizle, hem Türkiye'de hem de küresel olarak en yüksek kalite ve performansa sahip aydınlatma ürünleri geliştirerek sektöre öncülük eden bir marka olmaya kararlıyız.",
  };

  const visionData = (t as any).vision_page || {
    title: 'Vizyon',
    content:
      '2026 yılına kadar, müşteri memnuniyeti ve operasyonel mükemmellikte uluslararası standartları belirleyen lider bir aydınlatma markası olarak küresel pazarda güçlü bir konuma ulaşmak. Bu vizyonla, sürdürülebilirlik, yenilikçilik ve güvenilirlik temelleri üzerinde büyümeyi ve etkili çözümler sunarak ve teknolojik gelişmelerle ilerleyerek sektörde öne çıkmayı hedefliyoruz.',
  };

  const pageTitle =
    language === 'en' ? 'Mission and Vision' : 'Misyon ve Vizyon';

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#050505]">
      <div className="w-full lg:w-[55%] flex flex-col justify-center px-8 md:px-16 lg:px-24 py-32 relative z-10">
        <div className="mb-20">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white opacity-90 tracking-tight">
            {pageTitle}
          </h1>
          <div className="h-1.5 w-16 bg-[var(--brand-red)] mt-8 rounded-full"></div>
        </div>

        <div className="flex flex-col gap-16">
          <div className="group relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md -z-10"></div>
            <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8">
              <div className="flex-shrink-0 w-16 h-16 bg-[var(--brand-red)]/10 border border-[var(--brand-red)]/30 rounded-2xl flex items-center justify-center group-hover:bg-[var(--brand-red)] transition-colors duration-500 shadow-[0_0_20px_rgba(255,0,0,0.1)] group-hover:shadow-[0_0_25px_rgba(255,0,0,0.3)]">
                <svg
                  className="w-8 h-8 text-[var(--brand-red)] group-hover:text-white transition-colors duration-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-4 text-white tracking-tight">
                  {missionData.title}
                </h2>
                <p className="text-gray-300 leading-relaxed text-lg font-light text-justify">
                  {missionData.content}
                </p>
              </div>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md -z-10"></div>
            <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8">
              <div className="flex-shrink-0 w-16 h-16 bg-[var(--brand-red)]/10 border border-[var(--brand-red)]/30 rounded-2xl flex items-center justify-center group-hover:bg-[var(--brand-red)] transition-colors duration-500 shadow-[0_0_20px_rgba(255,0,0,0.1)] group-hover:shadow-[0_0_25px_rgba(255,0,0,0.3)]">
                <svg
                  className="w-8 h-8 text-[var(--brand-red)] group-hover:text-white transition-colors duration-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-4 text-white tracking-tight">
                  {visionData.title}
                </h2>
                <p className="text-gray-300 leading-relaxed text-lg font-light text-justify">
                  {visionData.content}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-[45%] relative min-h-[400px] lg:min-h-screen bg-[#050505]">
        <Image
          src={getAssetPath('/images/factory-bg.webp')}
          alt="Factory Building"
          fill
          className="object-contain object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#050505] via-transparent to-transparent opacity-100 w-full h-32 lg:h-full lg:w-48"></div>
      </div>
    </div>
  );
}
