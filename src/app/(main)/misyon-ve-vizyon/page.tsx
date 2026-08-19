import { Metadata } from "next";
import { MissionVisionClient } from "./MissionVisionClient";

export const metadata: Metadata = {
  title: "Misyon ve Vizyon | Kendal Elektrik",
  description: "Kendal Elektrik'in aydınlatma sektöründeki misyonu ve 2026 hedeflerini yansıtan vizyonu.",
  alternates: { canonical: "/misyon-ve-vizyon" },
};

export default function MissionVisionPage() {
  return <MissionVisionClient />;
}
