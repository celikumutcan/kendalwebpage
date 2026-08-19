import React from "react";
import { KVKKContent } from "./KVKKContent";

export const metadata = {
  title: "KVKK Aydınlatma Metni | Kendal Elektrik",
  description: "Kendal Elektrik KVKK Aydınlatma Metni.",
  alternates: { canonical: "/kvkk" },
};

export default function KVKKPage() {
  return <KVKKContent />;
}
