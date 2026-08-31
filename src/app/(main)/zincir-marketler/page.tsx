import type { Metadata } from 'next';
import React from 'react';
import { RetailPresence } from '@/components/sections/RetailPresence';

export const metadata: Metadata = {
  title: 'Zincir Marketlerdeki Ürünlerimiz | Kendal Elektrik',
  description:
    'Kendal Elektrik ürünlerini A101, BİM, Koçtaş, Avansas gibi zincir marketlerde ve satış noktalarında bulabilirsiniz.',
  alternates: { canonical: '/zincir-marketler' },
};

export default function ZincirMarketlerPage() {
  return (
    <div className="bg-[#050505] pt-0 pb-0">
      <RetailPresence />
    </div>
  );
}
