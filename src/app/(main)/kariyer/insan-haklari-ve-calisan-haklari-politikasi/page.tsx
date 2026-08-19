import { Metadata } from "next";
import { HumanRightsClient } from "./HumanRightsClient";

export const metadata: Metadata = {
  title: "İnsan Hakları ve Çalışan Hakları Politikası | Kendal Elektrik",
  description: "Kendal Elektrik'in evrensel değerlere, eşitliğe ve işçi haklarına verdiği önemi anlatan insan hakları ve çalışan hakları politikası.",
  alternates: { canonical: "/kariyer/insan-haklari-ve-calisan-haklari-politikasi" },
};

export default function HumanRightsPage() {
  return <HumanRightsClient />;
}
