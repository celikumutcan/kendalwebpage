"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import Link from "next/link";
import { getAssetPath } from "@/lib/basePath";

// Main Footer
export const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer id="iletisim" className="w-full bg-black text-gray-400 py-16 px-6 border-t-2 border-[var(--brand-red)]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        
        {/* Company Info */}
        <div className="md:col-span-1 text-center flex flex-col items-center">
          <Link href="/" className="mb-6 self-center hover:opacity-80 transition-opacity flex justify-center w-full">
            <Image 
              src={getAssetPath("/images/kendal-logo.svg")} 
              alt="Kendal Elektrik Logo" 
              width={200} 
              height={60} 
              className="h-10 md:h-12 w-auto object-contain mx-auto" 
            />
          </Link>
          <p className="text-sm leading-relaxed mb-4">
            {(t as any).footer?.company}
          </p>
          <a 
            href="https://www.google.com/maps/search/?api=1&query=Selimpaşa+Org.+San.+Böl.+5008+Sokak+No:6+Selimpaşa+Silivri/İSTANBUL" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm opacity-60 hover:opacity-100 hover:text-[var(--brand-red)] transition-colors inline-block"
          >
            Adres: {(t as any).footer?.address}
          </a>
        </div>

        {/* Contact */}
        <div className="text-center flex flex-col items-center md:justify-self-center">
          <h4 className="text-white font-semibold mb-6 text-center w-full">{(t as any).footer?.contact_title}</h4>
          <ul className="space-y-3 text-sm">
            <li>
              <span className="opacity-60 block text-xs mb-1">{(t as any).footer?.phone_label || "İletişim Hattı"}</span>
              <a href={`tel:${(t as any).footer?.phone}`} className="hover:text-[var(--brand-red)] transition-colors">
                {(t as any).footer?.phone}
              </a>
            </li>
            <li>
              <span className="opacity-60 block text-xs mb-1">{(t as any).footer?.sales_phone_label || "Satış Destek Hattı"}</span>
              <a href={`tel:${(t as any).footer?.sales_phone}`} className="hover:text-[var(--brand-red)] transition-colors">
                {(t as any).footer?.sales_phone}
              </a>
            </li>
            <li>
              <span className="opacity-60 block text-xs mb-1">{(t as any).footer?.support_phone_label || "Teknik Servis Hattı"}</span>
              <a href={`tel:${(t as any).footer?.support_phone}`} className="hover:text-[var(--brand-red)] transition-colors">
                {(t as any).footer?.support_phone}
              </a>
            </li>
            <li className="pt-2">
              <a href="mailto:info@kendalelektrik.com.tr" className="hover:text-[var(--brand-red)] transition-colors">
                {(t as any).footer?.email}
              </a>
            </li>
          </ul>
        </div>


        {/* Legal & Social */}
        <div className="text-center flex flex-col items-center">
          <h4 className="text-white font-semibold mb-6 text-center w-full">{(t as any).footer?.legal_title}</h4>
          <ul className="space-y-3 text-sm mb-8">
            <li>
              <Link href="/kvkk" className="hover:text-[var(--brand-red)] transition-colors">
                {(t as any).footer?.legal?.kvkk}
              </Link>
            </li>
            <li>
              <Link href="/gizlilik-cerez-politikasi" className="hover:text-[var(--brand-red)] transition-colors">
                {(t as any).footer?.legal?.privacy}
              </Link>
            </li>
          </ul>
          
          <div className="flex gap-4">
            {/* LinkedIn */}
            <a href="https://www.linkedin.com/company/kendal-elektrik-ayd%C4%B1nlatma-a-%C5%9F/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[var(--brand-red)] transition-colors" aria-label="LinkedIn">
              <svg fill="currentColor" viewBox="0 0 24 24" className="w-7 h-7"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            {/* Instagram */}
            <a href="https://www.instagram.com/k2.ledsystem/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[var(--brand-red)] transition-colors" aria-label="Instagram">
              <svg fill="currentColor" viewBox="0 0 24 24" className="w-7 h-7"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path></svg>
            </a>
          </div>
        </div>

      </div>
      
      <div className="pt-8 border-t border-white/10 text-center text-xs opacity-50">
        <p>&copy; {currentYear} {(t as any).footer?.rights}</p>
      </div>
    </footer>
  );
};
