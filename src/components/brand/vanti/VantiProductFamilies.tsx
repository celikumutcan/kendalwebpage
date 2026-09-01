'use client';

import Image from 'next/image';
import Link from 'next/link';
import { type CSSProperties, useMemo } from 'react';
import type { Product } from '@/data/products';
import { getAssetPath, getBrandUrunlerHref } from '@/lib/basePath';

interface VantiProductFamiliesProps {
  label: string;
  title: string;
  allProducts: Product[];
  language: string;
}

interface FamilyDef {
  key: string;
  nameTr: string;
  nameEn: string;
  query: string;
  productId: string;
}

const FAMILIES: FamilyDef[] = [
  {
    key: 'tavan',
    nameTr: 'Tavan Vantilatörleri',
    nameEn: 'Ceiling Fans',
    query: 'tavan vanti',
    productId: 'KCF306',
  },
  {
    key: 'sanayi',
    nameTr: 'Sanayi Tipi Vantilatörler',
    nameEn: 'Industrial Fans',
    query: 'sanayi',
    productId: 'KCF291',
  },
  {
    key: 'ayakli',
    nameTr: 'Ayaklı Vantilatörler',
    nameEn: 'Stand Fans',
    query: 'ayakl',
    productId: 'KCF272L',
  },
  {
    key: 'duvar',
    nameTr: 'Duvar Tipi Vantilatörler',
    nameEn: 'Wall Fans',
    query: 'duvar ti',
    productId: 'KCF299D',
  },
  {
    key: 'masaustu',
    nameTr: 'Masaüstü Fanlar',
    nameEn: 'Desktop Fans',
    query: 'masaüstü',
    productId: 'KCF295',
  },
  {
    key: 'sarjli',
    nameTr: 'Şarjlı El Vantilatörleri',
    nameEn: 'Rechargeable Hand Fans',
    query: 'şarj',
    productId: 'KCF700',
  },
  {
    key: 'banyo',
    nameTr: 'Banyo Aspiratörleri',
    nameEn: 'Bathroom Extractor Fans',
    query: 'banyo',
    productId: 'KSP120',
  },
];

export function VantiProductFamilies({
  label,
  title,
  allProducts,
  language,
}: VantiProductFamiliesProps) {
  const lang = language === 'en' ? 'en' : 'tr';
  const catalogBase = getBrandUrunlerHref('vanti');

  const families = useMemo(() => {
    return FAMILIES.map((f) => {
      const q = f.query.toLowerCase();
      const count = allProducts.filter((p) => {
        const model = (p.model || '').toLowerCase();
        const name = (p.name?.tr || '').toLowerCase();
        return model.includes(q) || name.includes(q);
      }).length;
      const rep = allProducts.find((p) => p.id === f.productId);
      return { ...f, count, image: rep?.image };
    }).filter((f) => f.count > 0 && f.image);
  }, [allProducts]);

  if (families.length === 0) return null;

  const duration = Math.max(22, families.length * 6);
  const loopFamilies = [...families, ...families];

  return (
    <section
      className="reveal-text relative z-10 w-full py-12 md:py-16 overflow-hidden"
      style={{ '--accent': '#0f766e' } as CSSProperties}
    >
      <div className="mb-10 md:mb-14 px-6 md:px-16 lg:px-24">
        <div className="inline-flex flex-col gap-4 bg-white/60 backdrop-blur-xl border border-white/70 shadow-[0_8px_32px_rgba(0,0,0,0.08)] rounded-[2rem] px-6 py-5 md:px-9 md:py-7">
          <h3 className="font-semibold tracking-[0.2em] uppercase text-sm md:text-base text-teal-700 flex items-center gap-4">
            <span className="w-12 h-[2px] rounded-full bg-teal-600 block"></span>
            {label}
          </h3>
          <h2 className="text-3xl md:text-5xl font-bold leading-tight text-teal-950">
            {title}
          </h2>
        </div>
      </div>

      <div className="k2-marquee-pause relative">
        <div className="k2-marquee-fade-mask overflow-hidden motion-reduce:overflow-x-auto">
          <div
            className="k2-marquee-track flex w-max gap-4 md:gap-5 px-6 md:px-16 lg:px-24"
            style={{ animationDuration: `${duration}s` }}
          >
            {loopFamilies.map((f, i) => (
              <Link
                key={`${f.key}-${i}`}
                href={`${catalogBase}?q=${encodeURIComponent(f.query)}`}
                tabIndex={i < families.length ? 0 : -1}
                aria-hidden={i >= families.length}
                className="group shrink-0 flex items-center gap-4 rounded-2xl p-3 pr-6 md:pr-7 min-w-[270px] sm:min-w-[310px] bg-white border border-black/5 shadow-sm hover:shadow-[0_20px_40px_-20px_rgba(15,118,110,0.35)] hover:-translate-y-1 transition-all duration-300"
              >
                <span className="relative shrink-0 w-20 h-20 rounded-xl overflow-hidden bg-zinc-50">
                  <Image
                    src={getAssetPath('/images/' + f.image)}
                    alt=""
                    fill
                    sizes="80px"
                    className="object-contain p-2.5 transition-transform duration-500 ease-out group-hover:scale-110"
                    loading="lazy"
                  />
                </span>
                <div className="min-w-0 flex-1">
                  <h4 className="font-bold text-base md:text-lg leading-snug text-teal-950 truncate">
                    {lang === 'en' ? f.nameEn : f.nameTr}
                  </h4>
                  <p className="text-xs text-teal-700/60 font-medium mt-0.5">
                    {f.count}{' '}
                    {lang === 'en'
                      ? f.count === 1
                        ? 'Product'
                        : 'Products'
                      : 'Ürün'}
                  </p>
                </div>
                <svg
                  className="w-4 h-4 shrink-0 text-zinc-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-teal-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
