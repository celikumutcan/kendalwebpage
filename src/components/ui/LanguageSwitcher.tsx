"use client";

import React from "react";
import { useLanguage } from "@/app/i18n/LanguageProvider";

// Toggles between TR and EN languages
export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2 text-sm font-medium">
      <button
        onClick={() => setLanguage("tr")}
        className={`transition-opacity ${language === "tr" ? "font-bold opacity-100" : "opacity-60 hover:opacity-100"}`}
      >
        TR
      </button>
      <span className="opacity-40">|</span>
      <button
        onClick={() => setLanguage("en")}
        className={`transition-opacity ${language === "en" ? "font-bold opacity-100" : "opacity-60 hover:opacity-100"}`}
      >
        EN
      </button>
    </div>
  );
};
