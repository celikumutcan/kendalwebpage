"use client";

import React from "react";
import { useLanguage } from "@/app/i18n/LanguageProvider";

export default function MissionVisionPage() {
  const { t, language } = useLanguage();
  
  const missionData = (t as any).mission_page || {
    title: "Misyon",
    content: "Kendal Elektrik olarak, aydınlatma sektöründe yenilikçi, güvenilir ve sürdürülebilir çözümler sunarak müşterilerimize, ortaklarımıza ve topluma değer katmayı hedefliyoruz. Ar-Ge ve üretim yeteneklerimizle, hem Türkiye'de hem de küresel olarak en yüksek kalite ve performansa sahip aydınlatma ürünleri geliştirerek sektöre öncülük eden bir marka olmaya kararlıyız."
  };
  
  const visionData = (t as any).vision_page || {
    title: "Vizyon",
    content: "2026 yılına kadar, müşteri memnuniyeti ve operasyonel mükemmellikte uluslararası standartları belirleyen lider bir aydınlatma markası olarak küresel pazarda güçlü bir konuma ulaşmak. Bu vizyonla, sürdürülebilirlik, yenilikçilik ve güvenilirlik temelleri üzerinde büyümeyi ve etkili çözümler sunarak ve teknolojik gelişmelerle ilerleyerek sektörde öne çıkmayı hedefliyoruz."
  };

  const pageTitle = language === 'en' ? "Mission and Vision" : "Misyon ve Vizyon";

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 text-[var(--brand-red)] text-center">
          {pageTitle}
        </h1>
        
        <div className="flex flex-col gap-10">
          <div className="bg-white/5 p-8 md:p-12 rounded-2xl border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
            <h2 className="text-2xl font-semibold mb-4 text-white">
              {missionData.title}
            </h2>
            <p className="text-white/80 leading-relaxed text-lg text-justify">
              {missionData.content}
            </p>
          </div>
          
          <div className="bg-white/5 p-8 md:p-12 rounded-2xl border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
            <h2 className="text-2xl font-semibold mb-4 text-white">
              {visionData.title}
            </h2>
            <p className="text-white/80 leading-relaxed text-lg text-justify">
              {visionData.content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
