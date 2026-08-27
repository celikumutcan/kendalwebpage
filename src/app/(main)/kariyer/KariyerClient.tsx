"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function KariyerClient() {
  const { t } = useLanguage();

  const career = (t as any).career;

  const links = [
    {
      href: "/kariyer/insan-kaynaklari-politikamiz",
      title: career?.links?.hr_policy_title || "İnsan Kaynakları Politikamız",
      desc: career?.links?.hr_policy_desc || "Kurumumuzun vizyonu, misyonu ve insan kaynakları stratejileri.",
    },
    {
      href: "/kariyer/temel-ilkelerimiz",
      title: career?.links?.principles_title || "Temel İlkelerimiz",
      desc: career?.links?.principles_desc || "Kendal Elektrik ailesi olarak benimsediğimiz temel insan kaynakları prensipleri.",
    },
    {
      href: "/kariyer/insan-haklari-ve-calisan-haklari-politikasi",
      title: career?.links?.human_rights_title || "İnsan Hakları ve Çalışan Hakları Politikası",
      desc: career?.links?.human_rights_desc || "Evrensel değerlere, eşitliğe ve işçi haklarına verdiğimiz önem.",
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#050505] text-white pt-32 pb-24 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute left-1/2 top-[-10%] -translate-x-1/2 w-[600px] h-[400px] bg-indigo-600/30 blur-[120px] rounded-[100%]" />
        <div className="absolute left-1/2 bottom-[-10%] -translate-x-1/2 w-[600px] h-[400px] bg-rose-600/20 blur-[120px] rounded-[100%]" />
      </div>
      <div className="relative z-10 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[var(--brand-red)] text-center">
          {career?.title || "Kariyer"}
        </h1>
        <p className="text-gray-400 text-center mb-12 text-lg">
          {career?.subtitle || "Kendal Elektrik Ailesine Katılın"}
        </p>

        <div className="space-y-6">
          {links.map((link, idx) => (
            <Link href={link.href} key={idx} className="block">
              <div className="bg-white/5 p-8 rounded-2xl border border-white/10 transition-all duration-300 hover:bg-white/10 hover:border-[var(--brand-red)] hover:shadow-[0_0_15px_rgba(227,0,15,0.2)] group">
                <h2 className="text-2xl font-semibold text-white mb-2 group-hover:text-[var(--brand-red)] transition-colors">
                  {link.title}
                </h2>
                <p className="text-white/70 leading-relaxed">
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
