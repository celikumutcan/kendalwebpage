import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projeler | Kendal Elektrik",
  description: "Kendal Elektrik'in yer aldığı prestijli projeler ve referans çalışmalarımız.",
  openGraph: {
    title: "Projeler | Kendal Elektrik",
    description: "Kendal Elektrik'in yer aldığı prestijli projeler ve referans çalışmalarımız.",
    url: "/projeler",
  },
  alternates: {
    canonical: "/projeler",
  }
};

export default function ProjelerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
