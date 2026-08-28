"use client";

import { useState } from "react";

interface VantiVideoShowcaseProps {
  videoIds: string[];
  playLabel: string;
  label?: string;
  title?: string;
}

export function VantiVideoShowcase({ videoIds, playLabel, label, title }: VantiVideoShowcaseProps) {
  const [playing, setPlaying] = useState<Record<number, boolean>>({});

  const duration = Math.max(30, videoIds.length * 4.5);
  const loopVideos = [...videoIds, ...videoIds];

  return (
    <section className="reveal-text relative z-10 w-full py-12 md:py-16 overflow-hidden">
      {label && title && (
        <div className="flex justify-center px-6 mb-10 md:mb-14">
          <div className="text-center max-w-2xl p-8 md:p-10 rounded-[2.5rem] border bg-white/50 backdrop-blur-xl border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
            <h3 className="font-medium tracking-[0.2em] mb-4 uppercase text-sm md:text-base text-teal-700">{label}</h3>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight text-teal-950">{title}</h2>
          </div>
        </div>
      )}

      <div className="k2-marquee-pause relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 md:w-32 bg-gradient-to-r from-[var(--page-bg,#f0f9ff)] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 md:w-32 bg-gradient-to-l from-[var(--page-bg,#f0f9ff)] to-transparent z-10" />

        <div className="overflow-hidden motion-reduce:overflow-x-auto">
          <div
            className="k2-marquee-track flex w-max gap-4 md:gap-6"
            style={{ animationDuration: `${duration}s` }}
          >
            {loopVideos.map((id, i) => (
              <div
                key={`${id}-${i}`}
                className="relative shrink-0 w-[210px] sm:w-[250px] md:w-[280px] aspect-[9/16] rounded-2xl md:rounded-[1.75rem] overflow-hidden bg-black shadow-[0_8px_24px_rgba(0,0,0,0.15)]"
              >
                {playing[i] ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${id}?autoplay=1&playsinline=1&rel=0&modestbranding=1&iv_load_policy=3`}
                    title="Vanti"
                    allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                ) : (
                  <button
                    type="button"
                    tabIndex={i < videoIds.length ? 0 : -1}
                    aria-hidden={i >= videoIds.length}
                    onClick={() => setPlaying((p) => ({ ...p, [i]: true }))}
                    className="group absolute inset-0 w-full h-full"
                    aria-label={playLabel}
                  >
                    <img
                      src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
                      alt=""
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-5 h-5 md:w-7 md:h-7 text-teal-800 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </span>
                    </span>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
