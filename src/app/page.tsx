"use client";

import { useState } from "react";
import { Loader } from "@/components/loader/Loader";
import { Hero } from "@/components/sections/Hero";
import { AboutUs } from "@/components/sections/AboutUs";

import { CompanyStats } from "@/components/sections/CompanyStats";
import { GlobalPresence } from "@/components/sections/GlobalPresence";
import { CompanyVideo } from "@/components/sections/CompanyVideo";
import { NewsTicker } from "@/components/sections/NewsTicker";
import { BrandsStrip } from "@/components/sections/BrandsStrip";

import { Certifications } from "@/components/sections/Certifications";
import { CatalogCTA } from "@/components/sections/CatalogCTA";
import { ApertureTransition } from "@/components/shared/ApertureTransition";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="relative w-full">
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      
      {/* Hide the content behind opacity until loader finishes (optional) or just let it render behind loader */}
      <div className={`transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <NewsTicker />
        <Hero />
        <AboutUs />

        <CompanyStats />
        <Certifications />
        <CatalogCTA />
        <CompanyVideo />
        <GlobalPresence />
        <BrandsStrip />
      </div>
    </main>
  );
}
