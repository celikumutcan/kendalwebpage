"use client";

import { useState } from "react";
import { Loader } from "@/components/loader/Loader";
import { Hero } from "@/components/sections/Hero";
import { AboutUs } from "@/components/sections/AboutUs";
import { OurBrands } from "@/components/sections/OurBrands";

import { CompanyStats } from "@/components/sections/CompanyStats";
import { GlobalPresence } from "@/components/sections/GlobalPresence";
import { CompanyVideo } from "@/components/sections/CompanyVideo";
import { NewsTicker } from "@/components/sections/NewsTicker";
import { NewsPreview } from "@/components/sections/NewsPreview";

import { Certifications } from "@/components/sections/Certifications";
import { CatalogCTA } from "@/components/sections/CatalogCTA";
import { ApertureTransition } from "@/components/shared/ApertureTransition";

export function HomeClient() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="relative w-full">
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}

      <div className={`transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <NewsTicker />
        <Hero />
        <AboutUs />
        <OurBrands />

        <CompanyStats />
        <CatalogCTA />
        <CompanyVideo />
        <GlobalPresence />
        <NewsPreview />
        <Certifications />
      </div>
    </main>
  );
}
