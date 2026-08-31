"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function HumanRightsClient() {
  const { t } = useLanguage();
  const paragraphs = (t as any).career?.human_rights as string[];
  const title = (t as any).career?.links?.human_rights_title || "İnsan Hakları ve Çalışan Hakları Politikası";

  if (!paragraphs) return null;

  return (
    <div className="relative min-h-screen bg-[#050505] text-white pt-32 pb-24 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -left-[15%] top-1/2 -translate-y-1/2 w-[400px] h-[600px] bg-purple-600/20 blur-[120px] rounded-[100%]" />
        <div className="absolute -right-[15%] top-1/2 -translate-y-1/2 w-[400px] h-[600px] bg-fuchsia-500/20 blur-[120px] rounded-[100%]" />
      </div>
      <div className="relative z-10 max-w-3xl mx-auto bg-white/5 p-8 md:p-12 rounded-2xl border border-white/10">
        <h1 className="text-3xl md:text-5xl font-bold mb-10 text-white text-center">
          {title}
        </h1>

        <div className="space-y-6 text-white/90 leading-relaxed text-justify">
          {paragraphs.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
