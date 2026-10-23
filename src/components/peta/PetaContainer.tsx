'use client';

import { useState } from 'react';
import { PETA_COMMODITIES, PetaMarketPrice } from './peta-data';
import { PetaFilterSidebar } from './PetaFilterSidebar';
import { PetaSpatialStage } from './PetaSpatialStage';
import { PetaMarketRankTable } from './PetaMarketRankTable';
import { CommoditySummary } from '@/types';
import { useRegion } from '@/lib/store/region-store';
import { getMarketsByRegion } from '@/lib/mock/markets.data';

interface Props {
  initialCommodities: CommoditySummary[];
}

export function PetaContainer({ initialCommodities }: Props) {
  const { selectedRegion } = useRegion();
  const [selectedCommodityId, setSelectedCommodityId] = useState<string>(
    PETA_COMMODITIES[0].id
  );
  const [selectedMarketId, setSelectedMarketId] = useState<string>('');
  const [visualIndicator, setVisualIndicator] = useState<string>('price');
  const [isLightMode, setIsLightMode] = useState<boolean>(false);

  // Get dynamic markets for currently selected region
  const currentRegionMarkets = getMarketsByRegion(selectedRegion.id);

  // Active commodity configuration
  const activeCommodity =
    PETA_COMMODITIES.find((c) => c.id === selectedCommodityId) ||
    PETA_COMMODITIES[0];

  // Adjust base price with island logistics factor
  const baseRegionalPrice = Math.round(
    (activeCommodity.cityAvgPrice * (1 + (selectedRegion.logisticsCostPct || 0) / 100)) / 100
  ) * 100;

  // Build unified markets list with price details
  const marketsWithPrice: PetaMarketPrice[] = currentRegionMarkets.map((info, idx) => {
    // Natural market spread: -4% to +4% across different stalls/markets in the province
    const variationMultiplier = idx === 0 ? 0.96 : idx === 1 ? 0.99 : idx === 2 ? 1.02 : 1.04;
    const computedPrice = Math.round((baseRegionalPrice * variationMultiplier) / 100) * 100;
    const diffPercent = Math.round(((computedPrice - baseRegionalPrice) / baseRegionalPrice) * 1000) / 10;
    const status = diffPercent < -2 ? ('cheaper' as const) : diffPercent > 2 ? ('expensive' as const) : ('average' as const);

    return {
      marketId: info.id,
      name: info.name,
      shortName: info.name.replace('Pasar ', '').split(' (')[0],
      district: info.district,
      address: `${info.district}, ${info.city}`,
      latitude: info.latitude,
      longitude: info.longitude,
      xPercent: 50,
      yPercent: 50,
      price: computedPrice,
      diffPercent,
      status,
      stock: idx % 2 === 0 ? 'Melimpah' : 'Cukup',
      reportsCount: 6 + (idx * 3),
      lastUpdated: '06:00 WIB',
      googleMapsUrl: `https://maps.google.com/?q=${encodeURIComponent(`${info.name} ${info.city}`)}`,
    };
  });

  const activeMarketId =
    marketsWithPrice.find((m) => m.marketId === selectedMarketId)?.marketId ||
    marketsWithPrice[0]?.marketId ||
    '';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
      {/* Left Column: Filter Sidebar */}
      <div className="lg:col-span-4 xl:col-span-3 lg:sticky lg:top-[96px]">
        <PetaFilterSidebar
          commodities={initialCommodities}
          selectedCommodityId={selectedCommodityId}
          onCommodityChange={setSelectedCommodityId}
          visualIndicator={visualIndicator}
          onVisualIndicatorChange={setVisualIndicator}
          isLightMode={isLightMode}
          onToggleLightMode={() => setIsLightMode(!isLightMode)}
        />
      </div>

      {/* Right Column: Spatial Map & Ranking Table */}
      <div className="lg:col-span-8 xl:col-span-9 flex flex-col gap-6">
        {!isLightMode ? (
          <>
            <PetaSpatialStage
              markets={marketsWithPrice}
              selectedMarketId={activeMarketId}
              onSelectMarket={setSelectedMarketId}
              commodityName={activeCommodity.name}
              commoditySlug={activeCommodity.id}
              visualIndicator={visualIndicator}
            />
            <PetaMarketRankTable
              markets={marketsWithPrice}
              selectedMarketId={activeMarketId}
              onSelectMarket={setSelectedMarketId}
              commodityName={activeCommodity.name}
            />
          </>
        ) : (
          <>
            <PetaMarketRankTable
              markets={marketsWithPrice}
              selectedMarketId={activeMarketId}
              onSelectMarket={setSelectedMarketId}
              commodityName={activeCommodity.name}
            />
            <div className="p-4 rounded-[14px] bg-white outline outline-1 outline-[#E5E3DE] text-[13px] text-[#6E6D67] flex items-center justify-between">
              <span>Mode Ringan aktif untuk menghemat kuota dan mempermudah pembacaan data.</span>
              <button
                type="button"
                onClick={() => setIsLightMode(false)}
                className="text-[12px] font-bold text-[#1B1A18] underline hover:no-underline"
              >
                Kembalikan Peta Visual
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
