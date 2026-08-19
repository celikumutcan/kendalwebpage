"use client";

import { useLanguage } from "@/app/i18n/LanguageProvider";
import Image from "next/image";
import Link from "next/link";
import { getAssetPath } from "@/utils/basePath";

const brands = [
  {
    name: "K2",
    logo: "/images/brands/k2-logo.svg",
    href: process.env.NODE_ENV === "production" ? "/brand/k2" : "http://k2.localhost:3000",
  },
  {
    name: "Vanti",
    logo: "/images/brands/vanti-logo.svg",
    href: process.env.NODE_ENV === "production" ? "/brand/vanti" : "http://vanti.localhost:3000",
  },
  {
    name: "Global",
    logo: "/images/brands/global-logo.svg",
    href: process.env.NODE_ENV === "production" ? "/brand/global" : "http://global.localhost:3000",
  },
];

export const OurBrands = () => {
  const { language } = useLanguage();

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-900 mb-4">
            {language === "tr" ? "Markalarımız" : "Our Brands"}
          </h2>
          <p className="text-base md:text-lg text-zinc-500 max-w-2xl mx-auto font-medium leading-relaxed">
            {language === "tr"
              ? "Sektörün öncü markalarıyla hayatınızı aydınlatıyor ve ferahlatıyoruz."
              : "Illuminating and refreshing your life with industry-leading brands."}
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 lg:gap-16">
          {brands.map((brand) => (
            <Link
              key={brand.name}
              href={brand.href}
              className="flex items-center justify-center p-4 w-32 h-20 md:w-48 md:h-28 bg-zinc-50 rounded-2xl border border-zinc-100 hover:border-zinc-300 transition-colors"
            >
              <div className="relative w-full h-full p-2">
                <Image
                  src={getAssetPath(brand.logo)}
                  alt={brand.name}
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
