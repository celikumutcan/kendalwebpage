import type { Metadata } from 'next';
import { HrPolicyClient } from './HrPolicyClient';

export const metadata: Metadata = {
  title: 'İnsan Kaynakları Politikamız | Kendal Elektrik',
  description:
    "Kendal Elektrik'in insan kaynakları vizyonu, misyonu, eğitim ve iş sağlığı-güvenliği politikaları.",
  alternates: { canonical: '/kariyer/insan-kaynaklari-politikamiz' },
};

export default function HrPolicyPage() {
  return <HrPolicyClient />;
}
