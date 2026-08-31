import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Üretim | Kendal Elektrik',
  description:
    "Kendal Elektrik'in yıllık 100 milyon adet aydınlatma ürünü üretim kapasitesine sahip, yüksek otomasyonlu ve modern üretim tesisleri hakkında detaylı bilgi.",
  openGraph: {
    title: 'Üretim | Kendal Elektrik',
    description:
      "Kendal Elektrik'in yıllık 100 milyon adet aydınlatma ürünü üretim kapasitesine sahip, yüksek otomasyonlu ve modern üretim tesisleri hakkında detaylı bilgi.",
    url: '/uretim',
  },
  alternates: {
    canonical: '/uretim',
  },
};

export default function UretimLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
