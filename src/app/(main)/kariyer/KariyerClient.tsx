'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { getAssetPath } from '@/lib/basePath';
import { useLanguage } from '@/lib/i18n/LanguageProvider';

// Ana sayfadaki CompanyStats verileriyle aynı kaynak (yeni içerik değil, mevcut rakamların kariyer bağlamında tekrarı).
const CAREER_STATS = [
  { value: '29', label: 'Yıllık Tecrübe' },
  { value: '350+', label: 'İstihdam' },
];

export function KariyerClient() {
  const { t } = useLanguage();

  const career = (t as any).career;

  const links = [
    {
      href: '/kariyer/insan-kaynaklari-politikamiz',
      title: career?.links?.hr_policy_title || 'İnsan Kaynakları Politikamız',
      desc:
        career?.links?.hr_policy_desc ||
        'Kurumumuzun vizyonu, misyonu ve insan kaynakları stratejileri.',
    },
    {
      href: '/kariyer/temel-ilkelerimiz',
      title: career?.links?.principles_title || 'Temel İlkelerimiz',
      desc:
        career?.links?.principles_desc ||
        'Kendal Elektrik ailesi olarak benimsediğimiz temel insan kaynakları prensipleri.',
    },
    {
      href: '/kariyer/insan-haklari-ve-calisan-haklari-politikasi',
      title:
        career?.links?.human_rights_title ||
        'İnsan Hakları ve Çalışan Hakları Politikası',
      desc:
        career?.links?.human_rights_desc ||
        'Evrensel değerlere, eşitliğe ve işçi haklarına verdiğimiz önem.',
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#050505] text-white flex flex-col justify-center pt-28 pb-10 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute left-1/2 top-[-10%] -translate-x-1/2 w-[750px] h-[500px] bg-indigo-500/45 blur-[130px] rounded-[100%]" />
        <div className="absolute left-1/2 bottom-[-10%] -translate-x-1/2 w-[750px] h-[500px] bg-rose-500/35 blur-[130px] rounded-[100%]" />
        <div className="absolute right-[10%] top-1/3 w-[500px] h-[500px] bg-orange-400/20 blur-[140px] rounded-[100%]" />
      </div>

      <div className="relative z-10 max-w-[90rem] mx-auto w-full">
        {/* Hero: foto + başlık */}
        <div className="flex flex-col md:flex-row md:justify-center md:items-center gap-8 md:gap-16 mb-8 md:mb-10">
          <div className="order-2 md:order-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
              {career?.title || 'Kariyer'}
            </h1>
            <p className="text-gray-400 text-lg mb-6">
              {career?.subtitle || 'Kendal Elektrik Ailesine Katılın'}
            </p>

            <div className="flex justify-center md:justify-start gap-5 md:gap-6">
              {CAREER_STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white/5 border border-white/10 rounded-2xl px-8 py-6 min-w-[160px]"
                >
                  <div className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs md:text-sm text-white/60 uppercase tracking-wide mt-2">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="order-1 md:order-2 relative w-full aspect-[16/9] rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            style={{ maxWidth: 520, aspectRatio: '3 / 2' }}
          >
            <Image
              src={getAssetPath('/images/kariyer-arge.webp')}
              alt="Kendal Elektrik Ar-Ge ekibi"
              fill
              sizes="(max-width: 768px) 100vw, 520px"
              className="object-cover"
              quality={80}
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>
        </div>

        {/* Politika sayfaları */}
        <div className="grid gap-6 md:grid-cols-3">
          {links.map((link) => (
            <Link
              href={link.href}
              key={link.href}
              className="group block h-full cursor-pointer"
            >
              <div className="h-full bg-white/5 p-6 rounded-2xl border border-white/10 shadow-[0_0_0_rgba(0,0,0,0)] transition-all duration-300 group-hover:bg-white/10 group-hover:border-[var(--brand-red)] group-hover:-translate-y-1 group-hover:shadow-[0_12px_30px_rgba(0,0,0,0.4)]">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h2 className="text-lg font-semibold text-white">
                    {link.title}
                  </h2>
                  <svg
                    className="w-5 h-5 shrink-0 mt-0.5 text-white/40 transition-all duration-300 group-hover:text-[var(--brand-red)] group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
                <p className="text-white/70 text-sm leading-relaxed">
                  {link.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
