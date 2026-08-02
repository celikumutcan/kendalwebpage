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
        className={`transition-colors ${language === "tr" ? "text-white" : "text-gray-500 hover:text-white"}`}
      >
        TR
      </button>
      <span className="text-gray-700">|</span>
      <button
        onClick={() => setLanguage("en")}
        className={`transition-colors ${language === "en" ? "text-white" : "text-gray-500 hover:text-white"}`}
      >
        EN
      </button>
    </div>
  );
};
