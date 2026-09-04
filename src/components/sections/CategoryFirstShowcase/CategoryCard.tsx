'use client';

import Image from 'next/image';
import { getAssetPath } from '@/lib/basePath';

interface CategoryCardProps {
  alt: string;
  displayName: string;
  sampleImage: string;
  index?: number;
  brandName: string;
  onClick: () => void;
}

// Product photos vary wildly in quality/background across the catalog — the
// radial mask on the image fades hard edges into the card, and the blurred
// color blob behind it gives every tile the same soft, considered look
// regardless of how the source photo was shot.
export function CategoryCard({
  alt,
  displayName,
  sampleImage,
  index = 0,
  brandName,
  onClick,
}: CategoryCardProps) {
  const isK2 = brandName === 'k2';
  const isVanti = brandName === 'vanti';

  const accentGradient = isK2
    ? 'from-orange-400 to-amber-500'
    : isVanti
      ? 'from-blue-400 to-cyan-500'
      : 'from-amber-300 to-yellow-400';
  const blobClass = isK2
    ? 'bg-orange-200/40'
    : isVanti
      ? 'bg-blue-200/40'
      : 'bg-amber-200/50';
  const arrowBg = isK2
    ? 'bg-orange-500 group-hover:bg-orange-600 text-white'
    : isVanti
      ? 'bg-blue-600 group-hover:bg-blue-700 text-white'
      : 'bg-[#FFDA51] group-hover:bg-[#f0c93e] text-zinc-900';
  const ringHover = isK2
    ? 'hover:ring-orange-200'
    : isVanti
      ? 'hover:ring-blue-200'
      : 'hover:ring-amber-200';

  return (
    <button
      onClick={onClick}
      style={{ animationDelay: `${Math.min(index, 8) * 60}ms` }}
      className={`animate-in fade-in slide-in-from-bottom-3 fill-mode-both group relative flex flex-col overflow-hidden rounded-[1.75rem] bg-white ring-1 ring-zinc-100 ${ringHover} shadow-sm hover:shadow-[0_24px_50px_-20px_rgba(0,0,0,0.22)] hover:-translate-y-1.5 transition-all duration-300 ease-out text-left`}
    >
      <span
        className={`absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r ${accentGradient}`}
      />

      <div className="relative aspect-[4/3] bg-gradient-to-b from-zinc-50 to-white overflow-hidden">
        <div
          className={`absolute w-2/3 h-2/3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 ${blobClass}`}
        />
        <Image
          src={getAssetPath('/images/' + sampleImage)}
          alt={alt}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
          style={{
            maskImage:
              'radial-gradient(ellipse 70% 70% at 50% 52%, black 55%, transparent 100%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 70% 70% at 50% 52%, black 55%, transparent 100%)',
          }}
          className="relative z-10 object-contain object-center p-2 sm:p-3 scale-[1.22] transition-transform duration-700 ease-out group-hover:scale-[1.3]"
        />
      </div>

      <div className="flex items-center justify-between gap-2 sm:gap-3 px-3.5 py-3 sm:px-5 sm:py-4 border-t border-zinc-50">
        <h3 className="font-bold text-zinc-900 leading-snug text-[13px] sm:text-base line-clamp-2">
          {displayName}
        </h3>
        <span
          className={`flex-shrink-0 w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shadow-sm transition-all duration-300 group-hover:translate-x-0.5 ${arrowBg}`}
        >
          <svg
            className="w-3 h-3 sm:w-4 sm:h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </span>
      </div>
    </button>
  );
}
