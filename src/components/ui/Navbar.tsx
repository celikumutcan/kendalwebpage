"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/app/i18n/LanguageProvider";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { getAssetPath } from "@/utils/basePath";
import { useLenis } from "@/components/engine/SmoothScrollProvider";

// Main Navbar fixed to top
export const Navbar = () => {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState("");
  const pathname = usePathname();
  const isHome = pathname === "/";
  const lenis = useLenis();

  // Tracks which section is currently in view to highlight the matching nav link
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "stats", "retail", "global", "projects", "company-video"];
      let current = "";
      let maxTop = -Infinity;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.top > maxTop) {
            maxTop = rect.top;
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

  // Scrolls to the matching section when landing on the homepage with a hash in the URL
  useEffect(() => {
    if (isHome && typeof window !== "undefined" && window.location.hash && lenis) {
      const targetId = window.location.hash.substring(1);

      const timer = setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          (window as any).isProgrammaticScroll = true;
          document.body.classList.add('disable-cv');
          const trueY = el.getBoundingClientRect().top + window.scrollY - 80;

          lenis.scrollTo(trueY, {
            force: true,
            duration: 1.5,
            onComplete: () => {
              document.body.classList.remove('disable-cv');
              (window as any).isProgrammaticScroll = false;
              window.dispatchEvent(new CustomEvent('scroll-refresh'));
            }
          });
        }
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isHome, lenis, pathname]);

  const navLinks: { id: string; href: string; label: any; external?: boolean }[] = [
    { id: "about", href: "/#about", label: t.nav.about },
    { id: "news", href: "/haberler", label: (t as any).nav?.news || "Haberler" },
    { id: "stats", href: "/#stats", label: (t as any).nav?.production || "Üretim ve İhracat" },
    { id: "retail", href: "/zincir-marketler", label: (t as any).nav?.retail || "Zincir Marketler" },
    { id: "global", href: "/#global", label: t.nav.global },
    { id: "projects", href: "/projeler", label: t.nav.projects || "Referanslar" },
    { id: "company-video", href: "/#company-video", label: (t as any).nav?.video || "Tanıtım Filmi" },
    { id: "career", href: "/kariyer", label: (t as any).nav?.career || "Kariyer" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-40 px-4 md:px-6 py-4 flex items-center justify-between bg-black/60 backdrop-blur-md text-white border-b border-white/5 transition-colors duration-300">
      <Link href="/" className="font-bold text-xl tracking-tight flex items-center gap-2 hover:opacity-80 transition-opacity">
        <Image src={getAssetPath("/kendal-icon.png")} alt="Kendal Logo" width={28} height={28} className="w-7 h-7 object-contain min-w-[28px]" />
        <div className="hidden sm:block">
          KENDAL ELEKTRİK
        </div>
      </Link>

      <div className="hidden lg:flex items-center gap-8 text-sm flex-1 justify-center">
        {navLinks.map((link) => (
          <Link
            key={link.id}
            href={isHome && link.href.startsWith("/#") ? link.href.substring(1) : link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
            scroll={link.href.startsWith("/#") ? false : true}
            onClick={(e) => {
              if (isHome && link.href.startsWith("/#")) {
                e.preventDefault();
                const targetId = link.href.substring(2);
                const el = document.getElementById(targetId);
                if (el) {
                  window.history.pushState(null, '', `/#${targetId}`);

                  if (lenis) {
                    (window as any).isProgrammaticScroll = true;
                    document.body.classList.add('disable-cv');
                    const trueY = el.getBoundingClientRect().top + window.scrollY - 80;

                    lenis.scrollTo(trueY, {
                      force: true,
                      duration: 1.5,
                      onComplete: () => {
                        document.body.classList.remove('disable-cv');
                        (window as any).isProgrammaticScroll = false;
                        window.dispatchEvent(new CustomEvent('scroll-refresh'));
                      }
                    });
                  } else {
                    const y = el.getBoundingClientRect().top + window.scrollY - 80;
                    window.scrollTo({ top: y, behavior: "smooth" });
                  }
                }
              }
            }}
            className={`relative pb-1 hover:opacity-100 transition-opacity ${activeSection === link.id ? "opacity-100 font-medium" : "opacity-60"
              }`}
          >
            {link.label}
            {activeSection === link.id && !link.external && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--brand-red)] rounded-full" />
            )}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-2 sm:gap-4 ml-auto lg:ml-0">
        <LanguageSwitcher />
        <a
          href="https://sanalpos.kendalelektrik.com.tr/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex text-xs sm:text-sm font-medium border border-white/20 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 hover:bg-[var(--brand-red)] hover:border-[var(--brand-red)] hover:text-white transition-all duration-300 whitespace-nowrap"
        >
          {(t as any).nav?.sanalpos || "Sanal Pos"}
        </a>
        <a
          href="https://b2b.kendalelektrik.com.tr:38282/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex text-xs sm:text-sm font-medium border border-white/20 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 hover:bg-[var(--brand-red)] hover:border-[var(--brand-red)] hover:text-white transition-all duration-300 whitespace-nowrap"
        >
          {(t as any).nav?.dealer || "B2B Girişi"}
        </a>
      </div>
    </nav>
  );
};