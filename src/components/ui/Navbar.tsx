"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/app/i18n/LanguageProvider";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { getAssetPath } from "@/utils/basePath";

// Main Navbar fixed to top
export const Navbar = () => {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "products", "why-us", "production", "global", "projects"];
      let current = "";
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { id: "about", href: "/#about", label: t.nav.about },
    { id: "products", href: "/#products", label: t.nav.products },
    { id: "why-us", href: "/#why-us", label: t.nav.why_us },
    { id: "production", href: "/#production", label: (t as any).nav?.production || "Üretim" },
    { id: "global", href: "/#global", label: t.nav.global },
    { id: "projects", href: "/#projects", label: t.nav.projects || "Referanslar" },
    { id: "career", href: "/kariyer", label: (t as any).nav?.career || "Kariyer" },
    { id: "sanalpos", href: "https://sanalpos.kendalelektrik.com.tr/", label: (t as any).nav?.sanalpos || "Sanal Pos", external: true },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-40 px-4 md:px-6 py-4 flex items-center justify-between bg-black/60 backdrop-blur-md text-white border-b border-white/5 transition-colors duration-300">
      <Link href="/" className="font-bold text-xl tracking-tight flex items-center gap-2 hover:opacity-80 transition-opacity">
        <Image src={getAssetPath("/kendal-icon.png")} alt="Kendal Logo" width={28} height={28} className="object-contain" />
        <div className="hidden sm:block">
          KENDAL ELEKTRİK
        </div>
      </Link>
      
      <div className="hidden lg:flex items-center gap-8 text-sm flex-1 justify-center">
        {navLinks.map((link) => (
          <Link 
            key={link.id}
            href={link.href} 
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
            className={`relative pb-1 hover:opacity-100 transition-opacity ${
              activeSection === link.id ? "opacity-100 font-medium" : "opacity-60"
            }`}
          >
            {link.label}
            {activeSection === link.id && !link.external && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--brand-red)] rounded-full" />
            )}
          </Link>
        ))}
      </div>
      
      <div className="flex items-center gap-4 ml-auto lg:ml-0">
        <LanguageSwitcher />
        <a 
          href="https://b2b.kendalelektrik.com.tr:38282/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-xs sm:text-sm font-medium border border-white/20 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 hover:bg-[var(--brand-red)] hover:border-[var(--brand-red)] hover:text-white transition-all duration-300"
        >
          {(t as any).nav?.dealer || "Online Bayi Girişi"}
        </a>
      </div>
    </nav>
  );
};
