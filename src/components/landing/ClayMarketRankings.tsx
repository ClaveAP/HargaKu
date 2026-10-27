'use client';

import { formatRupiah } from '@/lib/price-logic';

export interface MarketPriceRank {
  rank: number;
  marketName: string;
  price: number;
  diffPercent: number;
  badge: {
    label: string;
    bg: string;
    text: string;
  };
}

interface Props {
  commodityName: string;
  averagePrice: number;
  ranks: MarketPriceRank[];
}

export function ClayMarketRankings({
  commodityName,
  averagePrice,
  ranks,
}: Props) {
  // Cap at top 5 to prevent vertical layout stretching
  const displayedRanks = ranks.slice(0, 5);

  return (
    <div className="w-full flex flex-col gap-3.5">
      <div className="w-full flex items-center justify-between">
        <h3 className="text-[15px] font-medium text-[#1B1A18]">
          Sebaran Harga Lapak · {commodityName}
        </h3>
        <span className="text-[12px] font-semibold text-[#6E6D67] tabular-nums">
          Rata-rata: {formatRupiah(averagePrice)}
        </span>
      </div>

      <div className="w-full flex flex-col bg-[#FAF9F5] outline outline-1 outline-[#E5E3DE] -outline-offset-1 rounded-[10px] overflow-hidden">
        {displayedRanks.map((item, idx) => {
          const isLast = idx === displayedRanks.length - 1;
          const isPositive = item.diffPercent > 0;
          const isNegative = item.diffPercent < 0;

          return (
            <div
              key={item.marketName}
              className={`w-full flex items-center justify-between px-4 py-2.5 transition-colors hover:bg-white/60 ${
                !isLast ? 'border-b border-[#E5E3DE]' : ''
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-[12px] font-bold text-[#8C8B85] w-4">
                  {item.rank}.
                </span>
                <span className="text-[13px] font-medium text-[#1B1A18]">
                  {item.marketName}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[13px] font-bold text-[#1B1A18] tabular-nums">
                  {formatRupiah(item.price)}
                </span>
                <span
                  className={`text-[11px] font-semibold tabular-nums ${
                    isNegative
                      ? 'text-[#15803D]'
                      : isPositive
                      ? 'text-[#DC2626]'
                      : 'text-[#6E6D67]'
                  }`}
                >
                  {isNegative ? '' : '+'}
                  {item.diffPercent.toFixed(1)}%
                </span>
                <span
                  className="px-2 py-0.5 rounded-[5px] text-[10px] font-semibold outline outline-1 outline-black/10 -outline-offset-1"
                  style={{
                    backgroundColor: item.badge.bg,
                    color: item.badge.text,
                  }}
                >
                  {item.badge.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
