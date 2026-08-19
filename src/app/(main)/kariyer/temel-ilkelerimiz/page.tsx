import { Metadata } from "next";
import { PrinciplesClient } from "./PrinciplesClient";

export const metadata: Metadata = {
  title: "Temel İlkelerimiz | Kendal Elektrik",
  description: "Kendal Elektrik ailesi olarak insan kaynakları alanında benimsediğimiz temel ilkeler.",
  alternates: { canonical: "/kariyer/temel-ilkelerimiz" },
};

export default function PrinciplesPage() {
  return <PrinciplesClient />;
}
