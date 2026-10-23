import { Region, ApiResponse } from '@/types';
import { apiClient, IS_MOCK } from './client';
import { MOCK_REGIONS } from '../mock/regions.data';

export async function fetchRegions(): Promise<Region[]> {
  if (IS_MOCK) {
    return MOCK_REGIONS;
  }

  const res = await apiClient<ApiResponse<Region[]>>('/regions');
  return res.data;
}
