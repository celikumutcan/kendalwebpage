import React from "react";
import { Metadata } from "next";
import { Projects } from "@/components/sections/Projects";

export const metadata: Metadata = {
  title: "Projelerimiz | Kendal Elektrik",
  description: "Türkiye'nin dört bir yanında Kendal Elektrik kalitesiyle aydınlattığımız zincir mağaza, AVM ve kurumsal projeleri keşfedin.",
  alternates: { canonical: "/projeler" },
};

export default function ProjelerPage() {
  return (
    <div className="min-h-screen bg-[#050505] pt-0 pb-0">
      <Projects />
    </div>
  );
}
