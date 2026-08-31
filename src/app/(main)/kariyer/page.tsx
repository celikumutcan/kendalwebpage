import type { Metadata } from 'next';
import { KariyerClient } from './KariyerClient';

export const metadata: Metadata = {
  title: 'Kariyer | Kendal Elektrik',
  description:
    'Kendal Elektrik ailesine katılın. İnsan kaynakları politikamız, temel ilkelerimiz ve çalışan hakları politikamız hakkında bilgi edinin.',
  alternates: { canonical: '/kariyer' },
};

export default function KariyerPage() {
  return <KariyerClient />;
}
