import { PriceCheckRequest, PriceCheckResult, ApiResponse } from '@/types';
import { apiClient, IS_MOCK } from './client';
import { MOCK_COMMODITY_SUMMARIES } from '../mock/commodities.data';
import { evaluatePrice } from '../price-logic';

export async function submitPriceCheck(
  request: PriceCheckRequest
): Promise<PriceCheckResult> {
  if (IS_MOCK) {
    const commodity = MOCK_COMMODITY_SUMMARIES.find(
      (c) => c.id === request.commodityId
    ) || MOCK_COMMODITY_SUMMARIES[0];

    const lapis1HapHet = commodity.hapHetPrice;
    const lapis2OfficialAvg = commodity.currentAvgPrice;
    const lapis3CitizenMedian = Math.round(commodity.currentAvgPrice * 1.01);

    const comparisonPrice = lapis3CitizenMedian || lapis2OfficialAvg;

    return evaluatePrice(request.offeredPrice, comparisonPrice, {
      lapis1HapHet,
      lapis2OfficialAvg,
      lapis3CitizenMedian,
    });
  }

  const res = await apiClient<ApiResponse<PriceCheckResult>>('/price-check', {
    method: 'POST',
    body: JSON.stringify(request),
  });

  return res.data;
}
