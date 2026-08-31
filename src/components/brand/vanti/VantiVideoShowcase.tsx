'use client';

import Link from 'next/link';
import { useState } from 'react';

interface VantiVideoShowcaseProps {
  videoIds: string[];
  playLabel: string;
  closeLabel?: string;
  label?: string;
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  productLinks?: Record<string, string>;
  productFallbackHref?: string;
}

export function VantiVideoShowcase({
  videoIds,
  playLabel,
  closeLabel,
  label,
  title,
  subtitle,
  ctaLabel,
  productLinks,
  productFallbackHref,
}: VantiVideoShowcaseProps) {
  const [playing, setPlaying] = useState<Record<number, boolean>>({});
  const isAnyPlaying = Object.values(playing).some(Boolean);

  const duration = Math.max(30, videoIds.length * 4.5);
  const loopVideos = [...videoIds, ...videoIds];

  return (
    <section className="reveal-text relative z-10 w-full py-16 md:py-24 overflow-hidden">
      {label && title && (
        <div className="flex justify-center px-6 mb-14 md:mb-20">
          <div className="rounded-[2rem] bg-gradient-to-br from-white/80 via-teal-200/50 to-white/30 p-px shadow-[0_30px_80px_-35px_rgba(15,118,110,0.5)]">
            <div className="relative flex flex-col items-center text-center max-w-2xl px-8 py-8 md:px-14 md:py-10 rounded-[calc(2rem-1px)] bg-[var(--page-bg,#f0f9ff)]/80 backdrop-blur-2xl">
              <span className="inline-flex items-center gap-3 font-semibold tracking-[0.3em] uppercase text-[11px] md:text-xs text-teal-600">
                <span className="h-px w-8 bg-gradient-to-r from-transparent via-teal-600/70 to-teal-600/70" />
                {label}
                <span className="h-px w-8 bg-gradient-to-l from-transparent via-teal-600/70 to-teal-600/70" />
              </span>
              <h2 className="mt-5 text-3xl md:text-5xl font-bold leading-[1.1] tracking-tight text-teal-900">
                {title}
              </h2>
              {subtitle && (
                <p className="mt-3.5 max-w-xl text-sm md:text-base text-teal-900/60">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="k2-marquee-pause relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 md:w-40 bg-gradient-to-r from-[var(--page-bg,#f0f9ff)] via-[var(--page-bg,#f0f9ff)]/80 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 md:w-40 bg-gradient-to-l from-[var(--page-bg,#f0f9ff)] via-[var(--page-bg,#f0f9ff)]/80 to-transparent z-10" />

        <div className="overflow-hidden motion-reduce:overflow-x-auto">
          <div
            className="k2-marquee-track flex w-max gap-5 md:gap-7 py-3"
            style={{
              animationDuration: `${duration}s`,
              ...(isAnyPlaying
                ? { animationPlayState: 'paused' as const }
                : {}),
            }}
          >
            {loopVideos.map((id, i) => {
              const isPlaying = playing[i];
              const href = productLinks?.[id] || productFallbackHref;

              return (
                <div
                  key={`${id}-${i}`}
                  className="group/card relative shrink-0 w-[210px] sm:w-[250px] md:w-[280px] aspect-[3/4] rounded-[1.75rem] overflow-hidden bg-zinc-900 p-px bg-gradient-to-br from-white/60 via-teal-200/30 to-transparent shadow-[0_25px_50px_-20px_rgba(15,118,110,0.5)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_32px_60px_-18px_rgba(15,118,110,0.55)]"
                >
                  {isPlaying ? (
                    <>
                      <iframe
                        src={`https://www.youtube.com/embed/${id}?autoplay=1&playsinline=1&rel=0&modestbranding=1&iv_load_policy=3`}
                        title="Vanti"
                        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setPlaying((p) => ({ ...p, [i]: false }))
                        }
                        aria-label={closeLabel || 'Kapat'}
                        className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md ring-1 ring-white/20 text-white flex items-center justify-center transition-colors duration-300 hover:bg-black/80"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2.5}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          viewBox="0 0 24 24"
                        >
                          <path d="M6 6l12 12M18 6L6 18" />
                        </svg>
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        tabIndex={i < videoIds.length ? 0 : -1}
                        aria-hidden={i >= videoIds.length}
                        onClick={() => setPlaying((p) => ({ ...p, [i]: true }))}
                        className="absolute inset-0 w-full h-full"
                        aria-label={playLabel}
                      >
                        <img
                          src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          className="absolute inset-0 w-full h-full object-cover scale-125 transition-transform duration-700 group-hover/card:scale-[1.35]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/20" />
                        <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/30 to-transparent" />
                        <span className="absolute inset-0 flex items-center justify-center">
                          <span className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/95 backdrop-blur-sm ring-1 ring-black/5 flex items-center justify-center shadow-[0_10px_30px_-8px_rgba(0,0,0,0.5)] transition-all duration-300 group-hover/card:scale-110 group-hover/card:bg-teal-600">
                            <svg
                              className="w-5 h-5 md:w-7 md:h-7 text-teal-800 translate-x-0.5 transition-colors duration-300 group-hover/card:text-white"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </span>
                        </span>
                      </button>

                      {href && ctaLabel && (
                        <Link
                          href={href}
                          tabIndex={i < videoIds.length ? 0 : -1}
                          aria-hidden={i >= videoIds.length}
                          className="absolute left-3 bottom-3 z-20 inline-flex w-fit items-center gap-1.5 rounded-full bg-teal-600 px-3.5 py-1.5 text-[11px] font-semibold tracking-wide text-white shadow-[0_6px_16px_-4px_rgba(15,118,110,0.6)] transition-all duration-300 hover:bg-teal-500 hover:-translate-y-0.5"
                        >
                          {ctaLabel}
                          <svg
                            className="w-3 h-3 transition-transform duration-300 group-hover/card:translate-x-0.5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            viewBox="0 0 24 24"
                          >
                            <path d="M7 17 17 7M9 7h8v8" />
                          </svg>
                        </Link>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
