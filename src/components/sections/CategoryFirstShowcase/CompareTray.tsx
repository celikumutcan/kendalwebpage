'use client';

import Image from 'next/image';
import type { Product } from '@/data/products';
import { getAssetPath } from '@/lib/basePath';
import { MAX_COMPARE } from './helpers';

interface CompareTexts {
  tray_hint: string;
  clear: string;
  compare_button: string;
}

interface CompareTrayProps {
  compareItems: { product: Product; url: string }[];
  language: string;
  isK2: boolean;
  brandName: string;
  compareTexts: CompareTexts;
  onToggleCompare: (product: Product) => void;
  onClear: () => void;
  onOpenCompare: () => void;
}

export function CompareTray({
  compareItems,
  language,
  isK2,
  brandName,
  compareTexts,
  onToggleCompare,
  onClear,
  onOpenCompare,
}: CompareTrayProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[150] flex justify-center px-4 pb-4 pointer-events-none">
      <div className="pointer-events-auto bg-white/95 backdrop-blur-xl rounded-[1.75rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-zinc-100 ring-1 ring-black/[0.02] px-4 py-3 flex items-center gap-4 max-w-[calc(100vw-2rem)] overflow-x-auto animate-in slide-in-from-bottom-4 fade-in duration-300">
        <div className="flex items-center gap-2 flex-shrink-0">
          {compareItems.map(({ product }) => {
            const name =
              product.name[language as keyof typeof product.name] ||
              product.name.tr;
            return (
              <div
                key={product.id}
                className="relative w-12 h-12 rounded-lg overflow-hidden border border-zinc-200 bg-white flex-shrink-0"
                title={name}
              >
                <Image
                  src={getAssetPath('/images/' + product.image)}
                  alt={name}
                  fill
                  sizes="48px"
                  className="object-contain p-1"
                />
                <button
                  onClick={() => onToggleCompare(product)}
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-zinc-800 text-white flex items-center justify-center"
                >
                  <svg
                    className="w-2.5 h-2.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            );
          })}
          {Array.from({ length: MAX_COMPARE - compareItems.length }).map(
            (_, i) => (
              <div
                key={`empty-${i}`}
                className="w-12 h-12 rounded-lg border border-dashed border-zinc-200 flex-shrink-0"
              />
            ),
          )}
        </div>

        {compareItems.length < 2 && (
          <div className="hidden sm:block text-xs text-zinc-400 max-w-[160px] flex-shrink-0">
            {compareTexts.tray_hint}
          </div>
        )}

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={onClear}
            className="px-4 py-2.5 rounded-full text-sm font-bold text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100 transition-colors"
          >
            {compareTexts.clear}
          </button>
          <button
            onClick={onOpenCompare}
            disabled={compareItems.length < 2}
            className={`px-5 py-2.5 rounded-full text-sm font-bold text-white transition-all duration-300 shadow-lg ${
              compareItems.length < 2
                ? 'bg-zinc-300 cursor-not-allowed shadow-none'
                : isK2
                  ? 'bg-orange-600 hover:bg-orange-700 shadow-orange-600/25 hover:-translate-y-0.5'
                  : brandName === 'vanti'
                    ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/25 hover:-translate-y-0.5'
                    : 'bg-zinc-900 hover:bg-zinc-800 shadow-zinc-900/25 hover:-translate-y-0.5'
            }`}
          >
            {compareTexts.compare_button} ({compareItems.length})
          </button>
        </div>
      </div>
    </div>
  );
}
