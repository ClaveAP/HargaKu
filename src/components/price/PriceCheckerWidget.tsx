'use client';

import { useState, useEffect } from 'react';
import { Market, CommoditySummary } from '@/types';
import { fetchMarkets } from '@/lib/api/markets.api';
import { fetchCommodities } from '@/lib/api/commodities.api';
import { PriceCheckerContainer } from './PriceCheckerContainer';

interface Props {
  initialCommoditySlug?: string;
  initialMarketId?: string;
  compact?: boolean;
}

export function PriceCheckerWidget({
  initialCommoditySlug,
  initialMarketId,
}: Props) {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [commodities, setCommodities] = useState<CommoditySummary[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function load() {
      try {
        const [m, c] = await Promise.all([fetchMarkets(), fetchCommodities()]);
        setMarkets(m);
        setCommodities(c);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading || commodities.length === 0) {
    return (
      <div className="w-full p-8 text-center bg-white rounded-[18px] outline outline-1 outline-[#E5E3DE] text-[13px] text-[#8C8B85]">
        Memuat data acuan harga pasar...
      </div>
    );
  }

  return (
    <PriceCheckerContainer
      initialCommodities={commodities}
      initialMarkets={markets}
      initialCommoditySlug={initialCommoditySlug}
      initialMarketId={initialMarketId}
    />
  );
}
