"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import tr from "./tr.json";
import en from "./en.json";

type Language = "tr" | "en";
type Dictionary = typeof tr;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Dictionary;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Provides language context and translation dictionary
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("tr");

  useEffect(() => {
    const savedLang = localStorage.getItem("kendal-language") as Language;
    if (savedLang === "tr" || savedLang === "en") {
      setLanguage(savedLang);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("kendal-language", lang);
  };

  const dictionaries: Record<Language, Dictionary> = {
    tr,
    en,
  };

  const t = dictionaries[language];

  useEffect(() => {
    // Dynamically update the html lang attribute for SEO and accessibility
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
