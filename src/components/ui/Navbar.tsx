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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileGroup, setOpenMobileGroup] = useState<number | null>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const lenis = useLenis();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

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

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, linkHref: string) => {
    if (isHome && linkHref.startsWith("/#")) {
      e.preventDefault();
      const targetId = linkHref.substring(2);
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
    
    // Close mobile menu if open
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  const navGroups = [
    {
      label: (t as any).nav?.group_corporate || "Kurumsal",
      links: [
        { id: "mission_vision", href: "/misyon-ve-vizyon", label: (t as any).nav?.mission_vision || "Misyon ve Vizyon" },
        { id: "production", href: "/uretim", label: (t as any).nav?.production || "Üretim" },
        { id: "career", href: "/kariyer", label: (t as any).nav?.career || "Kariyer" },
        { id: "news", href: "/haberler", label: (t as any).nav?.news || "Haberler" },
      ]
    },
    {
      label: (t as any).nav?.brands || "Markalarımız",
      links: [
        { 
          id: "brand_k2", 
          href: process.env.NODE_ENV === "production" ? "/brand/k2" : "http://k2.localhost:3000", 
          external: process.env.NODE_ENV !== "production", // We want it to behave like an external link in dev to trigger full navigation to subdomain
          label: (
            <div className="flex items-center gap-3">
              <div className="bg-white rounded p-1 w-16 h-10 flex items-center justify-center shrink-0 relative group-hover:scale-105 transition-transform">
                <Image src={getAssetPath("/images/brands/k2-logo.svg")} alt="K2" fill sizes="64px" className="object-contain p-1.5" />
              </div>
              <span className="font-semibold tracking-wide">K2</span>
            </div>
          )
        },
        { 
          id: "brand_vanti", 
          href: process.env.NODE_ENV === "production" ? "/brand/vanti" : "http://vanti.localhost:3000", 
          external: process.env.NODE_ENV !== "production",
          label: (
            <div className="flex items-center gap-3">
              <div className="bg-white rounded p-1 w-16 h-10 flex items-center justify-center shrink-0 relative group-hover:scale-105 transition-transform">
                <Image src={getAssetPath("/images/brands/vanti-logo.svg")} alt="Vanti" fill sizes="64px" className="object-contain p-1.5" />
              </div>
              <span className="font-semibold tracking-wide">Vanti</span>
            </div>
          )
        },
        { 
          id: "brand_global", 
          href: "#", 
          isStatic: true,
          label: (
            <div className="flex items-center gap-3">
              <div className="bg-white rounded p-1 w-16 h-10 flex items-center justify-center shrink-0 relative">
                <Image src={getAssetPath("/images/brands/global-logo.svg")} alt="Global" fill sizes="64px" className="object-contain p-1.5" />
              </div>
              <span className="font-semibold tracking-wide">Global</span>
            </div>
          )
        }
      ]
    },
    {
      label: "Hizmet Ağımız",
      links: [
        { id: "projects", href: "/projeler", label: t.nav.projects || "Referanslar" },
        { id: "retail", href: "/zincir-marketler", label: (t as any).nav?.retail || "Zincir Marketler" },
      ]
    }
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 px-4 md:px-6 py-4 flex items-center justify-between bg-black/60 backdrop-blur-md text-white border-b border-white/5 transition-colors duration-300">
        <Link href="/" className="relative flex items-center hover:opacity-80 transition-opacity z-50">
        <Image src={getAssetPath("/images/kendal-logo.svg")} alt="Kendal Elektrik Logo" width={160} height={48} priority className="h-8 md:h-10 w-auto object-contain" />
      </Link>

      {/* Desktop Menu */}
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
                {group.links.map((link) => {
                  const isActive = activeSection === link.id || pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href) && link.href.length > 2);
                  const className = `block px-4 py-2.5 rounded-xl transition-colors ${(link as any).isStatic ? 'cursor-default text-white' : 'hover:bg-white/10 text-white/80 hover:text-white'} ${isActive && !(link as any).isStatic ? 'bg-[var(--brand-red)]/20 text-[var(--brand-red)] font-medium' : ''}`;
                  
                  if ((link as any).isStatic) {
                    return (
                      <div key={link.id} className={className}>
                        {link.label}
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={link.id}
                      href={isHome && link.href.startsWith("/#") ? link.href.substring(1) : link.href}
                      target={(link as any).external ? "_blank" : undefined}
                      rel={(link as any).external ? "noopener noreferrer" : undefined}
                      scroll={link.href.startsWith("/#") ? false : true}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className={className}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
        
        {/* Direct Link for Contact */}
        <div className="group relative py-2 cursor-pointer">
          <Link 
            href="/#iletisim" 
            onClick={(e) => handleLinkClick(e, "/#iletisim")} 
            className="flex items-center gap-1 hover:opacity-100 opacity-80 transition-opacity"
          >
            İletişim
          </Link>
        </div>
      </div>

      <div className="relative flex items-center gap-2 sm:gap-4 ml-auto lg:ml-0 z-50">
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
        
        {/* Mobile Menu Toggle Button */}
        <button 
          className="lg:hidden p-2 -mr-2 text-white/80 hover:text-white transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Mobile Menu"
        >
          {isMobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 top-[64px] md:top-[72px] bg-black/95 backdrop-blur-xl z-40 transition-all duration-300 ease-in-out lg:hidden overflow-y-auto ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto translate-x-0" : "opacity-0 pointer-events-none translate-x-10"
        }`}
      >
        <div className="flex flex-col p-6 gap-6 pb-32 pt-8">
          {navGroups.map((group, gIdx) => (
            <div key={gIdx} className="border-b border-white/10 pb-4">
              <button 
                onClick={() => setOpenMobileGroup(openMobileGroup === gIdx ? null : gIdx)}
                className="flex items-center justify-between w-full text-lg font-medium text-white mb-2"
              >
                {group.label}
                <svg 
                  className={`w-5 h-5 transition-transform duration-300 ${openMobileGroup === gIdx ? 'rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ${openMobileGroup === gIdx ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}
              >
                <div className="flex flex-col gap-3 pl-4 border-l border-white/20">
                  {group.links.map((link) => {
                    const isActive = activeSection === link.id || pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href) && link.href.length > 2);
                    const className = `text-base py-2 block transition-colors ${(link as any).isStatic ? 'cursor-default text-white' : 'text-white/70 hover:text-white'} ${isActive && !(link as any).isStatic ? 'text-[var(--brand-red)] font-medium' : ''}`;
                    
                    if ((link as any).isStatic) {
                      return (
                        <div key={link.id} className={className}>
                          {link.label}
                        </div>
                      );
                    }

                    return (
                      <Link
                        key={link.id}
                        href={isHome && link.href.startsWith("/#") ? link.href.substring(1) : link.href}
                        target={(link as any).external ? "_blank" : undefined}
                        rel={(link as any).external ? "noopener noreferrer" : undefined}
                        scroll={link.href.startsWith("/#") ? false : true}
                        className={className}
                        onClick={(e) => handleLinkClick(e, link.href)}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
          
          <div className="border-b border-white/10 pb-4">
             <Link href="/#iletisim" onClick={(e) => handleLinkClick(e, "/#iletisim")} className="flex items-center justify-between w-full text-lg font-medium text-white mb-2 hover:text-[var(--brand-red)] transition-colors">
                İletişim
             </Link>
          </div>
          
          <div className="flex flex-col gap-4 mt-4 sm:hidden">
             <a
              href="https://sanalpos.kendalelektrik.com.tr/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center text-sm font-medium border border-white/20 rounded-full px-4 py-3 hover:bg-[var(--brand-red)] hover:border-[var(--brand-red)] hover:text-white transition-all duration-300"
            >
              {(t as any).nav?.sanalpos || "Sanal Pos"}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};