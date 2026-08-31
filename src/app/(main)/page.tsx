import type { Metadata } from 'next';
import { HomeClient } from './HomeClient';

export const metadata: Metadata = {
  title: "Kendal Elektrik | 1997'den Beri Aydınlatma ve Elektrik Üreticisi",
  description:
    "Kendal Elektrik, 1997'den bu yana yerli üretim LED aydınlatma armatürleri, elektrik ekipmanları ve vantilatör ürünleri geliştiren, K2 ve Vanti markalarının sahibi Türkiye merkezli üreticidir.",
  alternates: { canonical: '/' },
};

export default function Home() {
  return <HomeClient />;
}
