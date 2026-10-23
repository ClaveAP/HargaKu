import { Market } from '@/types';
import { JAWA_MARKETS } from './markets-jawa.data';
import { OUTER_MARKETS } from './markets-outer.data';

export const MOCK_MARKETS: Market[] = [...JAWA_MARKETS, ...OUTER_MARKETS];

export function getMarketsByRegion(regionId: string): Market[] {
  const filtered = MOCK_MARKETS.filter((m) => m.regionId === regionId);
  if (filtered.length > 0) return filtered;
  // Fallback to top Jawa markets if region has no specific markets
  return JAWA_MARKETS.slice(0, 4);
}
