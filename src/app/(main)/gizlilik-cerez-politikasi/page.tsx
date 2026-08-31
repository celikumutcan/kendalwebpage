import React from 'react';
import { PrivacyContent } from './PrivacyContent';

export const metadata = {
  title: 'Gizlilik ve Çerez Politikası | Kendal Elektrik',
  description: 'Kendal Elektrik Gizlilik ve Çerez Politikası.',
  alternates: { canonical: '/gizlilik-cerez-politikasi' },
};

export default function PrivacyCookiesPage() {
  return <PrivacyContent />;
}
