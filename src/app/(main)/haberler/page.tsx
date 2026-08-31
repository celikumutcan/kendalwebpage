import type { Metadata } from 'next';
import { HaberlerListesiClient } from './HaberlerListesiClient';

export const metadata: Metadata = {
  title: 'Kurumsal Haberler | Kendal Elektrik',
  description:
    'Kendal Elektrik dünyasından en güncel gelişmeler, ürün lansmanları, fuar katılımları ve kurumsal haberler.',
  alternates: { canonical: '/haberler' },
};

export default function HaberlerListesiPage() {
  return <HaberlerListesiClient />;
}
