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
      const sections = ["brands", "retail", "projects", "company-video", "catalog"];
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

  const navGroups = [
    {
      label: (t as any).nav?.group_corporate || "Kurumsal",
      links: [
        { id: "mission_vision", href: "/misyon-ve-vizyon", label: (t as any).nav?.mission_vision || "Misyon ve Vizyon" },
        { id: "career", href: "/kariyer", label: (t as any).nav?.career || "Kariyer" },
      ]
    },
    {
      label: (t as any).nav?.group_brands || "Markalar & Pazarlar",
      links: [
        { id: "retail", href: "/zincir-marketler", label: (t as any).nav?.retail || "Zincir Marketler" },
      ]
    },
    {
      label: (t as any).nav?.group_media || "Medya & Referanslar",
      links: [
        { id: "news", href: "/haberler", label: (t as any).nav?.news || "Haberler" },
        { id: "projects", href: "/projeler", label: t.nav.projects || "Referanslar" },
      ]
    }
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-40 px-4 md:px-6 py-4 flex items-center justify-between bg-black/60 backdrop-blur-md text-white border-b border-white/5 transition-colors duration-300">
      <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
        <Image src={getAssetPath("/images/kendal-logo.svg")} alt="Kendal Elektrik Logo" width={160} height={48} className="h-8 md:h-10 w-auto object-contain" />
      </Link>

      <div className="hidden lg:flex items-center gap-8 text-sm flex-1 justify-center h-full">
        {navGroups.map((group, gIdx) => (
          <div key={gIdx} className="group relative py-2 cursor-pointer">
            <div className="flex items-center gap-1 hover:opacity-100 opacity-80 transition-opacity">
              {group.label}
              <svg className="w-4 h-4 opacity-70 group-hover:rotate-180 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            
            {/* Dropdown Menu */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 min-w-[220px]">
              <div className="bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-2xl flex flex-col gap-1">
                {group.links.map((link) => (
                  <Link
                    key={link.id}
                    href={isHome && link.href.startsWith("/#") ? link.href.substring(1) : link.href}
                    target={(link as any).external ? "_blank" : undefined}
                    rel={(link as any).external ? "noopener noreferrer" : undefined}
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
                    className={`block px-4 py-2.5 rounded-xl hover:bg-white/10 transition-colors ${
                      (activeSection === link.id || pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href) && link.href.length > 2))
                        ? "bg-[var(--brand-red)]/20 text-[var(--brand-red)] font-medium"
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
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