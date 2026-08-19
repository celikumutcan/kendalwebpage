import { Metadata } from "next";
import { UretimClient } from "./UretimClient";

export const metadata: Metadata = {
  title: "Üretim Tesisimiz | Kendal Elektrik",
  description: "Kendal Elektrik'in 2017'de faaliyete geçen 22.000 m² kapalı alana sahip modern üretim tesisini ve üretim aşamalarını keşfedin.",
  alternates: { canonical: "/uretim" },
};

export default function UretimPage() {
  return <UretimClient />;
}
