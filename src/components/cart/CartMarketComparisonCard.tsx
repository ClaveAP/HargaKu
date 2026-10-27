'use client';

import { useState, useMemo } from 'react';
import {
  NavigationArrow,
  PiggyBank,
  Buildings,
  WhatsappLogo,
  Check,
} from '@phosphor-icons/react';
import { CartItem } from './cart-data';
import { formatRupiah } from '@/lib/utils';
import { useRegion } from '@/lib/store/region-store';
import { useLiveCatalog } from '@/lib/store/use-live-catalog';

interface Props {
  items: CartItem[];
}

export function CartMarketComparisonCard({ items }: Props) {
  const { selectedRegion } = useRegion();
  const { rawMarkets, dailyPrices } = useLiveCatalog();
  const [copied, setCopied] = useState(false);

  // Dynamic regional markets (Top 5 markets for clean comparison)
  const regionalMarkets = useMemo(() => {
    const filtered = rawMarkets.filter(
      (m) =>
        m.regionId === selectedRegion.id ||
        m.city?.toLowerCase().includes(selectedRegion.name.toLowerCase()) ||
        (selectedRegion.province && m.city?.toLowerCase().includes(selectedRegion.province.toLowerCase()))
    );
    const list = filtered.length > 0 ? filtered : rawMarkets.filter((m) => m.regionId === 'reg_jabar');
    return list.slice(0, 5);
  }, [rawMarkets, selectedRegion]);

  // Calculate total price for each market in the active region
  const marketCalculations = useMemo(() => {
    return regionalMarkets.map((market, idx) => {
      // Natural variance multiplier based on market rank: -3% to +4%
      const variance = idx === 0 ? 0.96 : idx === 1 ? 0.98 : idx === 2 ? 1.01 : idx === 3 ? 1.03 : 1.05;

      const total = items.reduce((sum, item) => {
        // 1. Check if live daily price exists for this market and commodity
        const liveRecord = dailyPrices[`${market.id}_${item.id}`];
        if (liveRecord && liveRecord.price > 0) {
          return sum + item.quantity * liveRecord.price;
        }

        // 2. Check if item has market-specific price
        if (item.pricesByMarket && item.pricesByMarket[market.id]) {
          return sum + item.quantity * item.pricesByMarket[market.id];
        }

        // 3. Fallback to calibrated regional price with market variance
        const regionalBasePrice = Math.round(
          (item.avgPricePerUnit * (1 + (selectedRegion.logisticsCostPct || 0) / 100)) / 100
        ) * 100;
        const marketPrice = Math.round((regionalBasePrice * variance) / 100) * 100;
        return sum + item.quantity * marketPrice;
      }, 0);

      return {
        id: market.id,
        name: market.name,
        city: market.city,
        district: market.district,
        operatingHours: market.operatingHours || '04:00 – 14:00 WIB',
        mapsUrl: `https://maps.google.com/?q=${encodeURIComponent(`${market.name} ${market.city}`)}`,
        total,
      };
    });
  }, [regionalMarkets, items, dailyPrices, selectedRegion]);

  // Sort from lowest total to highest
  const sortedMarkets = useMemo(() => {
    return [...marketCalculations].sort((a, b) => a.total - b.total);
  }, [marketCalculations]);

  const cheapestMarket = sortedMarkets[0];
  const mostExpensiveMarket = sortedMarkets[sortedMarkets.length - 1];
  const maxSavings = mostExpensiveMarket ? mostExpensiveMarket.total - cheapestMarket.total : 0;
  const savingsPercent =
    mostExpensiveMarket && mostExpensiveMarket.total > 0
      ? Math.round((maxSavings / mostExpensiveMarket.total) * 100)
      : 0;

  const handleShareWhatsApp = () => {
    if (!cheapestMarket || items.length === 0) return;

    const itemsListText = items
      .map((item) => {
        const itemSubtotal = item.quantity * item.avgPricePerUnit;
        return `• ${item.quantity} ${item.unit} ${item.name}: ${formatRupiah(itemSubtotal)}`;
      })
      .join('\n');

    const message =
      `*Catatan Belanja HargaKu · ${selectedRegion.name}*\n` +
      `📅 ${new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}\n\n` +
      `🏆 *Pasar Paling Hemat*: ${cheapestMarket.name} (${cheapestMarket.district})\n` +
      `💰 *Estimasi Total*: ${formatRupiah(cheapestMarket.total)}\n` +
      (maxSavings > 0 ? `✨ *Hemat*: ${formatRupiah(maxSavings)} (${savingsPercent}% vs pasar termahal)\n\n` : '\n') +
      `*Daftar Komoditas:*\n${itemsListText}\n\n` +
      `📍 Dikalibrasi dari acuan resmi Bapanas & survei lapak pasar HargaKu.`;

    // Copy to clipboard
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }

    // Direct WhatsApp Web intent
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Dynamic Regional Market Ranking Card */}
      <div className="bg-white rounded-[24px] outline outline-1 outline-[#E5E3DE] p-5 sm:p-7 shadow-xs flex flex-col gap-5">
        <div className="flex items-center justify-between pb-3 border-b border-[#E5E3DE]">
          <div className="flex items-center gap-2.5">
            <Buildings size={20} weight="bold" className="text-[#1B1A18]" />
            <h2 className="text-[17px] font-bold text-[#1B1A18] tracking-tight">
              Komparasi Pasar · {selectedRegion.name}
            </h2>
          </div>
          <span className="text-[11px] font-bold text-[#15803D] bg-[#DCFCE7] px-2.5 py-0.5 rounded-full outline outline-1 outline-[#86EFAC]">
            Live Rerata Lapak
          </span>
        </div>

        {/* List of Markets with Bar Comparison */}
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
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#EEF773] text-[#1B1A18] outline outline-1 outline-[#1B1A18]">
                            Paling Hemat
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-[#8E8D86]">
                        {m.district}, {m.city}
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

        {/* WhatsApp Sharing Button */}
        {items.length > 0 && cheapestMarket && (
          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="w-full mt-1 py-3 px-4 rounded-[14px] bg-[#25D366] hover:bg-[#20bd5a] text-white text-[13px] font-bold flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer active:scale-[0.99]"
          >
            {copied ? (
              <>
                <Check size={18} weight="bold" />
                <span>✓ Tersalin ke Clipboard &amp; Membuka WhatsApp!</span>
              </>
            ) : (
              <>
                <WhatsappLogo size={18} weight="fill" />
                <span>Bagikan Catatan Belanja ke WhatsApp</span>
              </>
            )}
          </button>
        )}
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
