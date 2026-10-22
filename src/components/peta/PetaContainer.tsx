'use client';

import { useState } from 'react';
import {
  PETA_COMMODITIES,
  PETA_MARKETS_INFO,
  PetaMarketPrice,
} from './peta-data';
import { PetaFilterSidebar } from './PetaFilterSidebar';
import { PetaSpatialStage } from './PetaSpatialStage';
import { PetaMarketRankTable } from './PetaMarketRankTable';
import { CommoditySummary } from '@/types';

interface Props {
  initialCommodities: CommoditySummary[];
}

export function PetaContainer({ initialCommodities }: Props) {
  const [selectedCommodityId, setSelectedCommodityId] = useState<string>(
    PETA_COMMODITIES[0].id
  );
  const [selectedMarketId, setSelectedMarketId] = useState<string>('sukasari');
  const [visualIndicator, setVisualIndicator] = useState<string>('price');
  const [isLightMode, setIsLightMode] = useState<boolean>(false);

  // Active commodity configuration
  const activeCommodity =
    PETA_COMMODITIES.find((c) => c.id === selectedCommodityId) ||
    PETA_COMMODITIES[0];

  // Build unified markets list with price details
  const marketsWithPrice: PetaMarketPrice[] = PETA_MARKETS_INFO.map((info) => {
    const marketData = activeCommodity.markets[info.id] || {
      price: activeCommodity.cityAvgPrice,
      diffPercent: 0,
      status: 'average' as const,
      stock: 'Cukup' as const,
      reportsCount: 5,
      lastUpdated: '06:00 WIB',
    };

    return {
      marketId: info.id,
      name: info.name,
      shortName: info.shortName,
      district: info.district,
      address: info.address,
      xPercent: info.xPercent,
      yPercent: info.yPercent,
      price: marketData.price,
      diffPercent: marketData.diffPercent,
      status: marketData.status,
      stock: marketData.stock,
      reportsCount: marketData.reportsCount,
      lastUpdated: marketData.lastUpdated,
      googleMapsUrl: info.googleMapsUrl,
    };
  });

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
              selectedMarketId={selectedMarketId}
              onSelectMarket={setSelectedMarketId}
              commodityName={activeCommodity.name}
              commoditySlug={activeCommodity.id}
              visualIndicator={visualIndicator}
            />
            <PetaMarketRankTable
              markets={marketsWithPrice}
              selectedMarketId={selectedMarketId}
              onSelectMarket={setSelectedMarketId}
              commodityName={activeCommodity.name}
            />
          </>
        ) : (
          <>
            <PetaMarketRankTable
              markets={marketsWithPrice}
              selectedMarketId={selectedMarketId}
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
