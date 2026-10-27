'use client';

import { useMemo } from 'react';
import { useAdminStore } from './admin-store';
import type { CommoditySummary, Market, CommodityCategory } from '@/types';
import type { CommodityPreset } from '@/components/landing/hero-data';
import type { MarketPriceRank } from '@/components/landing/ClayMarketRankings';
import type { AdminCommodity, AdminMarket } from '@/lib/types/admin';

function mapAdminCategoryToPublic(category: string): CommodityCategory {
  switch (category) {
    case 'BERAS':
      return 'BERAS';
    case 'CABAI_BAWANG':
      return 'CABAI_BAWANG';
    case 'DAGING':
      return 'DAGING_TELUR';
    case 'MINYAK':
      return 'MINYAK_GULA';
    case 'SAYUR':
      return 'SAYURAN';
    default:
      return 'CABAI_BAWANG';
  }
}

export function useLiveCatalog(selectedRegionId?: string) {
  const { commodities, markets, dailyPrices, reports, isLoaded } = useAdminStore();

  const activeMarkets = useMemo(() => {
    return markets.filter((m) => m.isActive);
  }, [markets]);

  const targetMarkets = useMemo(() => {
    if (!selectedRegionId) return activeMarkets;
    const filtered = activeMarkets.filter((m) => m.regionId === selectedRegionId);
    return filtered.length > 0 ? filtered : activeMarkets;
  }, [activeMarkets, selectedRegionId]);

  const activeCommodities = useMemo(() => {
    return commodities.filter((c) => c.isActive);
  }, [commodities]);

  // Transform AdminCommodity[] into dynamic CommoditySummary[]
  const liveCommodities = useMemo<CommoditySummary[]>(() => {
    return activeCommodities.map((c: AdminCommodity) => {
      // Find prices across all active markets
      const priceEntries: Array<{ market: AdminMarket; price: number; prevPrice?: number }> = [];

      for (const m of activeMarkets) {
        const record = dailyPrices[`${m.id}_${c.id}`];
        if (record && record.price > 0) {
          priceEntries.push({
            market: m,
            price: record.price,
            prevPrice: record.previousPrice,
          });
        }
      }

      let currentAvgPrice = c.hapHetPrice;
      let previousAvgPrice = c.hapHetPrice;
      let changePercentage = 0;
      let lowestMarketName = activeMarkets[0]?.name || 'Pasar Anyar';
      let lowestPrice = c.hapHetPrice;

      if (priceEntries.length > 0) {
        const sumCurrent = priceEntries.reduce((acc, curr) => acc + curr.price, 0);
        currentAvgPrice = Math.round(sumCurrent / priceEntries.length);

        const sumPrev = priceEntries.reduce((acc, curr) => acc + (curr.prevPrice || curr.price), 0);
        previousAvgPrice = Math.round(sumPrev / priceEntries.length);

        if (previousAvgPrice > 0 && currentAvgPrice !== previousAvgPrice) {
          changePercentage =
            Math.round(((currentAvgPrice - previousAvgPrice) / previousAvgPrice) * 1000) / 10;
        }

        const sorted = [...priceEntries].sort((a, b) => a.price - b.price);
        lowestMarketName = sorted[0].market.name;
        lowestPrice = sorted[0].price;
      }

      const diffVsHap = currentAvgPrice - c.hapHetPrice;
      let statusVsHap: 'BELOW_HAP' | 'EQUAL_HAP' | 'ABOVE_HAP' = 'EQUAL_HAP';
      if (diffVsHap > c.hapHetPrice * 0.05) statusVsHap = 'ABOVE_HAP';
      else if (diffVsHap < -c.hapHetPrice * 0.05) statusVsHap = 'BELOW_HAP';

      return {
        id: c.id,
        name: c.name,
        slug: c.slug,
        category: mapAdminCategoryToPublic(c.category),
        unit: c.unit,
        imageUrl: c.imageUrl || '/images/commodities/default.png',
        currentAvgPrice,
        previousAvgPrice,
        changePercentage,
        hapHetPrice: c.hapHetPrice,
        statusVsHap,
        lastUpdated: '06:00 WIB',
        sparkline: [previousAvgPrice, (previousAvgPrice + currentAvgPrice) / 2, currentAvgPrice],
        source: 'PIHPS',
      };
    });
  }, [activeCommodities, activeMarkets, dailyPrices]);

  // Transform AdminMarket[] into public Market[]
  const liveMarkets = useMemo<Market[]>(() => {
    return activeMarkets.map((m: AdminMarket) => ({
      id: m.id,
      regionId: m.regionId,
      name: m.name,
      slug: m.slug,
      city: m.city || 'Nasional',
      district: m.district,
      address: m.address,
      latitude: m.latitude,
      longitude: m.longitude,
      operatingHours: m.operatingHours,
      isSentra: true,
      isActive: m.isActive,
      description: m.specialty,
    }));
  }, [activeMarkets]);

  // Dynamic presets for Landing Page Hero
  const livePresets = useMemo<CommodityPreset[]>(() => {
    return activeCommodities.slice(0, 6).map((c: AdminCommodity) => {
      const priceEntries: Array<{ marketName: string; price: number }> = [];

      for (const m of targetMarkets) {
        const record = dailyPrices[`${m.id}_${c.id}`];
        const price = record && record.price > 0 ? record.price : c.hapHetPrice;
        priceEntries.push({ marketName: m.name, price });
      }

      const avgPrice =
        priceEntries.length > 0
          ? Math.round(priceEntries.reduce((acc, p) => acc + p.price, 0) / priceEntries.length)
          : c.hapHetPrice;

      // Sort by price ascending
      priceEntries.sort((a, b) => a.price - b.price);

      // Limit to top 5 markets for hero ranking display to prevent layout stretching
      const topEntries = priceEntries.slice(0, 5);

      const ranks: MarketPriceRank[] = topEntries.map((item, idx) => {
        const diffPercent =
          avgPrice > 0 ? Math.round(((item.price - avgPrice) / avgPrice) * 1000) / 10 : 0;

        let badge = { label: 'Wajar', bg: '#F4F3F0', text: '#1B1A18' };
        if (idx === 0) {
          badge = { label: 'Termurah', bg: '#EEF773', text: '#1B1A18' };
        } else if (diffPercent > 10) {
          badge = { label: 'Tinggi', bg: '#FEF3C7', text: '#92400E' };
        }

        return {
          rank: idx + 1,
          marketName: item.marketName,
          price: item.price,
          diffPercent,
          badge,
        };
      });

      const cheapest = topEntries[0] || {
        marketName: targetMarkets[0]?.name || 'Pasar Anyar',
        price: c.hapHetPrice,
      };

      return {
        id: c.id,
        name: c.name,
        shortName: c.name.split(' ')[0] + ' ' + (c.name.split(' ')[1] || ''),
        averagePrice: avgPrice,
        cheapestMarket: cheapest.marketName,
        cheapestPrice: cheapest.price,
        ranks,
      };
    });
  }, [activeCommodities, targetMarkets, dailyPrices]);

  return {
    isLoaded,
    commodities: liveCommodities,
    markets: liveMarkets,
    presets: livePresets,
    rawCommodities: activeCommodities,
    rawMarkets: activeMarkets,
    dailyPrices,
    reports,
  };
}
