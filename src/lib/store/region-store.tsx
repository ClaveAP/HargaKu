'use client';

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Region, Market } from '@/types';
import { MOCK_REGIONS, DEFAULT_REGION } from '@/lib/mock/regions.data';
import { MOCK_MARKETS } from '@/lib/mock/markets.data';

interface RegionContextValue {
  selectedRegion: Region;
  setSelectedRegion: (region: Region) => void;
  allRegions: Region[];
  regionMarkets: Market[];
  calculateRegionalPrice: (baseNationalPrice: number) => number;
}

const RegionContext = createContext<RegionContextValue | undefined>(undefined);

const STORAGE_KEY = 'hargaku_active_region_id';

export function RegionProvider({ children }: { children: React.ReactNode }) {
  const [selectedRegion, setSelectedRegionState] = useState<Region>(DEFAULT_REGION);

  // Sync with localStorage on client mount
  useEffect(() => {
    try {
      const savedId = localStorage.getItem(STORAGE_KEY);
      if (savedId) {
        const found = MOCK_REGIONS.find((r) => r.id === savedId || r.slug === savedId);
        if (found) {
          setSelectedRegionState(found);
        }
      }
    } catch {
      // LocalStorage access may fail in restricted/iframe environments
    }
  }, []);

  const setSelectedRegion = (region: Region) => {
    setSelectedRegionState(region);
    try {
      localStorage.setItem(STORAGE_KEY, region.id);
    } catch {
      // ignore storage errors
    }
  };

  const regionMarkets = useMemo(() => {
    const list = MOCK_MARKETS.filter((m) => m.regionId === selectedRegion.id);
    return list.length > 0 ? list : MOCK_MARKETS.filter((m) => m.regionId === 'reg_jabar');
  }, [selectedRegion]);

  const calculateRegionalPrice = (baseNationalPrice: number): number => {
    return Math.round(baseNationalPrice * selectedRegion.disparityIndex);
  };

  return (
    <RegionContext.Provider
      value={{
        selectedRegion,
        setSelectedRegion,
        allRegions: MOCK_REGIONS,
        regionMarkets,
        calculateRegionalPrice,
      }}
    >
      {children}
    </RegionContext.Provider>
  );
}

export function useRegion() {
  const context = useContext(RegionContext);
  if (!context) {
    throw new Error('useRegion must be used within a RegionProvider');
  }
  return context;
}
