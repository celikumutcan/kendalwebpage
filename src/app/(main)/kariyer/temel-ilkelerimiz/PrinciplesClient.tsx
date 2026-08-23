"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function PrinciplesClient() {
  const { t } = useLanguage();
  const principles = (t as any).career?.principles as string[];
  const title = (t as any).career?.links?.principles_title || "Temel İlkelerimiz";

  if (!principles) return null;

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto bg-white/5 p-8 md:p-12 rounded-2xl border border-white/10">
        <h1 className="text-3xl md:text-5xl font-bold mb-10 text-[var(--brand-red)]">
          {title}
        </h1>

        <div className="space-y-6 text-white/90 leading-relaxed">
          <ul className="list-disc pl-5 space-y-4">
            {principles.map((item, idx) => (
              <li key={idx} className="pl-2">{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
