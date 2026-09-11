import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'İletişim | Kendal Elektrik',
  description:
    'Kendal Elektrik iletişim bilgileri. Merkez adresimiz, iletişim hattı, satış ve teknik servis destek hatlarımız.',
  openGraph: {
    title: 'İletişim | Kendal Elektrik',
    description:
      'Kendal Elektrik iletişim bilgileri. Merkez adresimiz, iletişim hattı, satış ve teknik servis destek hatlarımız.',
    url: '/iletisim',
  },
  alternates: {
    canonical: '/iletisim',
  },
};

export default function IletisimLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
