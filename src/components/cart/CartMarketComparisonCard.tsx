'use client';

import {
  NavigationArrow,
  CheckCircle,
  PiggyBank,
  Buildings,
  ArrowRight,
} from '@phosphor-icons/react';
import { CartItem, CART_MARKETS } from './cart-data';
import { formatRupiah } from '@/lib/utils';

interface Props {
  items: CartItem[];
}

export function CartMarketComparisonCard({ items }: Props) {
  // Calculate total price for each market
  const marketCalculations = CART_MARKETS.map((market) => {
    const total = items.reduce((sum, item) => {
      const priceInMarket =
        item.pricesByMarket[market.id] || item.avgPricePerUnit;
      return sum + item.quantity * priceInMarket;
    }, 0);

    return {
      ...market,
      total,
    };
  });

  // Sort from lowest total to highest
  const sortedMarkets = [...marketCalculations].sort((a, b) => a.total - b.total);
  const cheapestMarket = sortedMarkets[0];
  const mostExpensiveMarket = sortedMarkets[sortedMarkets.length - 1];
  const maxSavings = mostExpensiveMarket ? mostExpensiveMarket.total - cheapestMarket.total : 0;
  const savingsPercent = mostExpensiveMarket && mostExpensiveMarket.total > 0
    ? Math.round((maxSavings / mostExpensiveMarket.total) * 100)
    : 0;

  return (
    <div className="flex flex-col gap-6">
      {/* 5-Market Ranking Card */}
      <div className="bg-white rounded-[24px] outline outline-1 outline-[#E5E3DE] p-5 sm:p-7 shadow-xs flex flex-col gap-5">
        <div className="flex items-center justify-between pb-3 border-b border-[#E5E3DE]">
          <div className="flex items-center gap-2.5">
            <Buildings size={20} weight="bold" className="text-[#1B1A18]" />
            <h2 className="text-[17px] font-bold text-[#1B1A18] tracking-tight">
              Komparasi Total di 5 Pasar
            </h2>
          </div>
          <span className="text-[11px] font-bold text-[#15803D] bg-[#DCFCE7] px-2.5 py-0.5 rounded-full outline outline-1 outline-[#86EFAC]">
            Live Rerata Lapak
          </span>
        </div>

        {/* List of 5 Markets with Bar Comparison */}
        <div className="flex flex-col gap-3.5">
          {sortedMarkets.map((m, idx) => {
            const isCheapest = idx === 0;
            const diffWithCheapest = m.total - cheapestMarket.total;

            return (
              <div
                key={m.id}
                className={`p-4 rounded-[16px] outline outline-1 transition-all ${
                  isCheapest
                    ? 'bg-[#FAF9F5] outline-[#1B1A18] ring-1 ring-[#1B1A18]/10'
                    : 'bg-white outline-[#E5E3DE]'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 ${
                        isCheapest
                          ? 'bg-[#EEF773] text-[#1B1A18] outline outline-1 outline-[#1B1A18]'
                          : 'bg-[#F4F3F0] text-[#6E6D67]'
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[14px] font-bold text-[#1B1A18]">
                          {m.name}
                        </span>
                        {isCheapest && (
                          <span className="px-2 py-0.2 rounded text-[10px] font-bold bg-[#EEF773] text-[#1B1A18] outline outline-1 outline-[#1B1A18]">
                            Paling Hemat
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-[#8E8D86]">
                        {m.district}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[16px] font-bold text-[#1B1A18] tabular-nums block">
                      {formatRupiah(m.total)}
                    </span>
                    {isCheapest ? (
                      <span className="text-[11px] font-semibold text-[#15803D]">
                        Biaya Terendah
                      </span>
                    ) : (
                      <span className="text-[11px] text-[#8E8D86] tabular-nums">
                        +{formatRupiah(diffWithCheapest)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Savings Callout Card */}
      {cheapestMarket && maxSavings > 0 && (
        <div className="bg-[#FFF3ED] rounded-[20px] outline outline-1 outline-[#FFD9C7] p-5 sm:p-6 shadow-xs flex flex-col gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#FF7714] text-white flex items-center justify-center shrink-0 shadow-xs">
              <PiggyBank size={20} weight="fill" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-bold text-[#FF7714] uppercase tracking-wider">
                Rekomendasi Hemat Belanja
              </span>
              <h3 className="text-[16px] font-bold text-[#1B1A18] tracking-tight">
                Potensi Hemat hingga {formatRupiah(maxSavings)} ({savingsPercent}%)
              </h3>
              <p className="text-[12px] text-[#6E6D67] leading-relaxed">
                Dengan berbelanja di <strong>{cheapestMarket.name}</strong>, kamu dapat menghemat hingga {formatRupiah(maxSavings)} untuk total daftar belanjaanmu dibandingkan pasar dengan harga tertinggi.
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-[#FFD9C7]/70 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-[11px] text-[#8E8D86]">
              Estimasi berbasis pembaruan lapak pukul 06:00 WIB
            </span>
            <a
              href={cheapestMarket.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto py-2 px-4 rounded-[10px] bg-[#1B1A18] hover:bg-[#32312E] text-white text-[12px] font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
            >
              <span>Rute ke {cheapestMarket.name}</span>
              <NavigationArrow size={14} weight="bold" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
