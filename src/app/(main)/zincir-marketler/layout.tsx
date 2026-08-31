import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Zincir Marketler | Kendal Elektrik',
  description:
    'Kendal Elektrik ürünlerini bulabileceğiniz zincir marketler ve perakende satış noktalarımız.',
  openGraph: {
    title: 'Zincir Marketler | Kendal Elektrik',
    description:
      'Kendal Elektrik ürünlerini bulabileceğiniz zincir marketler ve perakende satış noktalarımız.',
    url: '/zincir-marketler',
  },
  alternates: {
    canonical: '/zincir-marketler',
  },
};

export default function ZincirMarketlerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
