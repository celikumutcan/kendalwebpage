import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Haberler | Kendal Elektrik',
  description:
    "Kendal Elektrik'ten güncel kurumsal haberler, fuar katılımları ve ürün lansmanları.",
  openGraph: {
    title: 'Haberler | Kendal Elektrik',
    description:
      "Kendal Elektrik'ten güncel kurumsal haberler, fuar katılımları ve ürün lansmanları.",
    url: '/haberler',
  },
  alternates: {
    canonical: '/haberler',
  },
};

export default function HaberlerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
