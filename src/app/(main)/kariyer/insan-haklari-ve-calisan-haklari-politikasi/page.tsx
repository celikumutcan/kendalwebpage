"use client";

import React from "react";
import { useLanguage } from "@/app/i18n/LanguageProvider";

export default function HumanRightsPage() {
  const { t } = useLanguage();
  const paragraphs = (t as any).career?.human_rights as string[];
  const title = (t as any).career?.links?.human_rights_title || "İnsan Hakları ve Çalışan Hakları Politikası";

  if (!paragraphs) return null;

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto bg-white/5 p-8 md:p-12 rounded-2xl border border-white/10">
        <h1 className="text-3xl md:text-5xl font-bold mb-10 text-[var(--brand-red)]">
          {title}
        </h1>

        <div className="space-y-6 text-white/90 leading-relaxed">
          {paragraphs.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
