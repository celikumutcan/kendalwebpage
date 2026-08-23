"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import Link from "next/link";

export const CookieConsentBanner = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("kendal-cookie-consent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("kendal-cookie-consent", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 bg-black/90 backdrop-blur-md border-t border-[var(--brand-red)] p-4 shadow-[0_-5px_20px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-white/80 text-sm md:text-base">
          {(t as any).cookies?.message || "We use cookies to ensure you get the best experience on our website."}
          <Link href="/gizlilik-cerez-politikasi" className="ml-2 text-[var(--brand-red)] hover:underline whitespace-nowrap">
            Gizlilik ve Çerez Politikası
          </Link>
        </p>
        <button
          onClick={handleAccept}
          className="bg-[var(--brand-red)] hover:bg-[var(--brand-red-deep)] text-white px-6 py-2 rounded-full font-semibold transition-colors shrink-0"
        >
          {(t as any).cookies?.accept || "Accept"}
        </button>
      </div>
    </div>
  );
};
