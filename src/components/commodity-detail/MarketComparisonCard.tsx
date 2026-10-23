'use client';

import { useRegion } from '@/lib/store/region-store';

interface MarketPriceItem {
  name: string;
  price: number;
  badge: 'Paling Hemat' | 'Wajar' | 'Agak Mahal' | 'Tertinggi';
}

const MARKET_PRICES: MarketPriceItem[] = [
  { name: 'Pasar Sukasari', price: 58000, badge: 'Paling Hemat' },
  { name: 'Pasar Gunung Batu', price: 59500, badge: 'Wajar' },
  { name: 'Pasar Jambu Dua', price: 61000, badge: 'Wajar' },
  { name: 'Pasar Anyar', price: 62500, badge: 'Agak Mahal' },
  { name: 'Pasar Kebon Kembang', price: 64000, badge: 'Tertinggi' },
];

export function MarketComparisonCard() {
  const { selectedRegion, calculateRegionalPrice } = useRegion();
  const maxPrice = calculateRegionalPrice(65000);

  return (
    <div className="bg-white rounded-[18px] outline outline-1 outline-[#E5E3DE] p-5 sm:p-6 shadow-xs flex flex-col justify-between gap-5">
      <div className="flex flex-col gap-0.5">
        <h3 className="text-[16px] font-bold text-[#1B1A18] tracking-tight">
          Perbandingan Pasar di {selectedRegion.name}
        </h3>
        <p className="text-[12px] text-[#6E6D67]">
          Harga rerata lapak hari ini (22 Okt 2026)
        </p>
      </div>

      {/* 5 Markets Horizontal Bar List */}
      <div className="flex flex-col gap-3.5">
        {MARKET_PRICES.map((m) => {
          const adjustedPrice = calculateRegionalPrice(m.price);
          const widthPercent = Math.round((adjustedPrice / maxPrice) * 100);

          let badgeStyle = 'bg-[#F4F3F0] text-[#1B1A18] outline-[#E5E3DE]';
          if (m.badge === 'Paling Hemat') {
            badgeStyle = 'bg-[#EEF773] text-[#1B1A18] outline-[#1B1A18]';
          } else if (m.badge === 'Agak Mahal') {
            badgeStyle = 'bg-[#FEF3C7] text-[#92400E] outline-[#FDE68A]';
          } else if (m.badge === 'Tertinggi') {
            badgeStyle = 'bg-[#FEE2E2] text-[#991B1B] outline-[#FECACA]';
          }

          return (
            <div key={m.name} className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-[13px]">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[#1B1A18]">{m.name}</span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-[4px] outline outline-1 ${badgeStyle}`}
                  >
                    {m.badge}
                  </span>
                </div>

                <span className="font-bold text-[#1B1A18] tabular-nums">
                  Rp {adjustedPrice.toLocaleString('id-ID')}/kg
                </span>
              </div>

              {/* Bar line */}
              <div className="w-full h-2 rounded-full bg-[#FAF9F5] outline outline-1 outline-[#E5E3DE]/60 overflow-hidden flex">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${widthPercent}%`,
                    backgroundColor:
                      m.badge === 'Paling Hemat'
                        ? '#EEF773'
                        : m.badge === 'Tertinggi'
                        ? '#EF4444'
                        : m.badge === 'Agak Mahal'
                        ? '#F59E0B'
                        : '#1B1A18',
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-[11px] text-[#78716C] leading-[16px] pt-2 border-t border-[#E5E3DE]">
        Berdasarkan 24 laporan terverifikasi + survei harian PIHPS.
      </p>
    </div>
  );
}
