"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/app/i18n/LanguageProvider";
import { LanguageSwitcher } from "./LanguageSwitcher";

// Main Navbar fixed to top
export const Navbar = () => {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "products", "why-us", "global", "contact"];
      let current = "";
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= (el.offsetTop - 150)) {
          current = section;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { id: "about", label: t.nav.about },
    { id: "products", label: t.nav.products },
    { id: "why-us", label: t.nav.why_us },
    { id: "global", label: t.nav.global },
    { id: "contact", label: t.nav.contact },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-40 px-6 py-4 flex items-center justify-between bg-black/60 backdrop-blur-md text-white border-b border-white/5 transition-colors duration-300">
      <div className="font-bold text-xl tracking-tight flex items-center gap-2">
        <Image src="/kendal-icon.png" alt="Kendal Logo" width={28} height={28} className="object-contain" />
        <div>
          <span className="text-[var(--brand-red)]">K</span>ENDAL
        </div>
      </div>
      <div className="hidden md:flex items-center gap-8 text-sm">
        {navLinks.map((link) => (
          <a 
            key={link.id}
            href={`#${link.id}`} 
            className={`relative pb-1 hover:opacity-100 transition-opacity ${
              activeSection === link.id ? "opacity-100 font-medium" : "opacity-60"
            }`}
          >
            {link.label}
            {activeSection === link.id && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--brand-red)] rounded-full" />
            )}
          </a>
        ))}
      </div>
      <div>
        <LanguageSwitcher />
      </div>
    </nav>
  );
};
