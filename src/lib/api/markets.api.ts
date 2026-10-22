import { Market, ApiResponse } from '@/types';
import { apiClient, IS_MOCK } from './client';
import { MOCK_MARKETS } from '../mock/markets.data';

export async function fetchMarkets(): Promise<Market[]> {
  if (IS_MOCK) {
    return MOCK_MARKETS;
  }

  const res = await apiClient<ApiResponse<Market[]>>('/markets');
  return res.data;
}
