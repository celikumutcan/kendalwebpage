import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kariyer | Kendal Elektrik",
  description: "Kendal Elektrik kariyer fırsatları, insan kaynakları politikamız ve temel ilkelerimiz.",
  openGraph: {
    title: "Kariyer | Kendal Elektrik",
    description: "Kendal Elektrik kariyer fırsatları, insan kaynakları politikamız ve temel ilkelerimiz.",
    url: "/kariyer",
  },
};

export default function KariyerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
