"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function HrPolicyClient() {
  const { t } = useLanguage();
  const policy = (t as any).career?.hr_policy;

  if (!policy) return null;

  return (
    <div className="relative min-h-screen bg-[#050505] text-white pt-32 pb-24 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -right-[10%] top-0 w-[500px] h-[500px] bg-emerald-600/20 blur-[120px] rounded-full" />
        <div className="absolute -left-[10%] bottom-0 w-[500px] h-[500px] bg-teal-500/20 blur-[120px] rounded-full" />
      </div>
      <div className="relative z-10 max-w-3xl mx-auto bg-white/5 p-8 md:p-12 rounded-2xl border border-white/10">
        <h1 className="text-3xl md:text-5xl font-bold mb-10 text-[var(--brand-red)] text-center">
          {policy.policy_title}
        </h1>

        <div className="space-y-10 text-white/90 leading-relaxed text-justify">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">{policy.vision_title}</h2>
            <p>{policy.vision_text}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">{policy.mission_title}</h2>
            <p>{policy.mission_text}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">{policy.policy_title}</h2>
            <p>{policy.policy_text}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">{policy.training_title}</h2>
            <p>{policy.training_text}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">{policy.health_safety_title}</h2>
            <p>{policy.health_safety_text}</p>
          </section>
        </div>
      </div>
    </div>
  );
}
