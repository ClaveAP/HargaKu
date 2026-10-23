'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  TrendDown,
  TrendUp,
  Minus,
  MagnifyingGlass,
  ArrowRight,
} from '@phosphor-icons/react';
import { COMMODITIES, type CommodityRow } from './commodity-table-data';
import { useLiveCatalog } from '@/lib/store/use-live-catalog';

export function ClayCommodityTableSection() {
  const { commodities: liveCommodities, markets: liveMarkets, dailyPrices } = useLiveCatalog();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState('');

  const displayList: CommodityRow[] = useMemo(() => {
    if (liveCommodities.length === 0) return COMMODITIES;

    return liveCommodities.map((c) => {
      let cheapestMarketName = liveMarkets[0]?.name || 'Pasar Anyar';
      let cheapestPrice = c.currentAvgPrice;

      const pricesForC = liveMarkets
        .map((m) => ({
          market: m,
          record: dailyPrices[`${m.id}_${c.id}`],
        }))
        .filter((item) => item.record && item.record.price > 0);

      if (pricesForC.length > 0) {
        pricesForC.sort((a, b) => a.record.price - b.record.price);
        cheapestMarketName = pricesForC[0].market.name;
        cheapestPrice = pricesForC[0].record.price;
      }

      let categoryKey: 'beras' | 'cabai' | 'daging' | 'minyak' = 'cabai';
      if (c.category === 'BERAS') categoryKey = 'beras';
      else if (c.category === 'DAGING_TELUR') categoryKey = 'daging';
      else if (c.category === 'MINYAK_GULA') categoryKey = 'minyak';

      const trendType: 'down' | 'stable' | 'up' =
        c.changePercentage < 0 ? 'down' : c.changePercentage > 0 ? 'up' : 'stable';
      const statusText =
        c.statusVsHap === 'BELOW_HAP'
          ? 'Murah'
          : c.statusVsHap === 'ABOVE_HAP'
          ? 'Agak Mahal'
          : 'Wajar';

      return {
        name: c.name,
        category: categoryKey,
        sub: 'Pantauan harian pasar',
        hapPrice: `Rp ${c.hapHetPrice.toLocaleString('id-ID')} / ${c.unit}`,
        avgPrice: `Rp ${c.currentAvgPrice.toLocaleString('id-ID')} / ${c.unit}`,
        cheapestMarket: cheapestMarketName,
        cheapestPrice: `Rp ${cheapestPrice.toLocaleString('id-ID')} / ${c.unit}`,
        trend: `${c.changePercentage > 0 ? '+' : ''}${c.changePercentage}%`,
        trendType,
        status: statusText,
      };
    });
  }, [liveCommodities, liveMarkets, dailyPrices]);

  const filtered = displayList.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.cheapestMarket.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section
      id="tabel-komoditas"
      className="w-full bg-[#FAF9F5] py-20 px-4 sm:px-8 lg:px-12 border-b border-[#E5E3DE]/70"
    >
      <div className="max-w-[1240px] mx-auto flex flex-col gap-8">
        {/* Header Row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="flex flex-col gap-4">
            <div className="inline-flex items-center px-3.5 py-1.5 bg-white outline outline-1 outline-[#E5E3DE] rounded-full text-[12px] font-medium text-[#1B1A18] w-fit shadow-xs">
              <span>Buku Transparansi Komoditas</span>
            </div>

            <h2 className="text-[32px] sm:text-[40px] font-medium text-[#1B1A18] leading-[1.15] tracking-tight max-w-[640px] text-balance">
              Pantauan harga komoditas pokok hari ini.
            </h2>
          </div>

          <p className="text-[14px] sm:text-[15px] text-[#6E6D67] leading-[1.6] max-w-[480px]">
            Data diagregasikan langsung dari survei harga harian lapak pasar tradisional terverifikasi dan standar acuan zonasi pangan Bapanas.
          </p>
        </div>

        {/* Filter Controls: Category Chips + Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'Semua Komoditas' },
              { id: 'cabai', label: 'Cabai & Bawang' },
              { id: 'beras', label: 'Beras & Pokok' },
              { id: 'daging', label: 'Protein & Daging' },
              { id: 'minyak', label: 'Minyak Goreng' },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-[8px] text-[12px] transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#1B1A18] text-white font-semibold shadow-xs'
                    : 'bg-white text-[#6E6D67] font-medium outline outline-1 outline-[#E5E3DE] hover:text-[#1B1A18] hover:bg-[#F4F3F0]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="w-full sm:w-[280px] flex items-center gap-2 px-3.5 py-2 bg-white outline outline-1 outline-[#E5E3DE] rounded-[8px]">
            <MagnifyingGlass size={15} className="text-[#8C8B85]" weight="bold" />
            <input
              type="text"
              placeholder="Cari komoditas atau pasar..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full bg-transparent text-[12px] text-[#1B1A18] placeholder-[#8C8B85] outline-none"
            />
          </div>
        </div>

        {/* Open Commodity Ledger Sheet */}
        <div className="w-full bg-white outline outline-1 outline-[#E5E3DE] rounded-[16px] overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <div className="min-w-[820px]">
              {/* Table Header */}
              <div className="grid grid-cols-12 px-6 py-3.5 bg-[#F4F3F0] border-b border-[#E5E3DE] text-[11px] font-bold text-[#8C8B85] uppercase tracking-wider">
                <div className="col-span-3">Komoditas Pokok</div>
                <div className="col-span-2">Acuan HAP Bapanas</div>
                <div className="col-span-2">Rata-Rata Kota</div>
                <div className="col-span-3">Pasar Termurah Saat Ini</div>
                <div className="col-span-1">Tren 7 Hari</div>
                <div className="col-span-1 text-right">Status</div>
              </div>

              {/* Rows */}
              <div className="divide-y divide-[#E5E3DE]">
                {filtered.map((c) => (
                  <div
                    key={c.name}
                    className="grid grid-cols-12 px-6 py-4 items-center transition-colors hover:bg-[#FAF9F5]"
                  >
                    <div className="col-span-3 flex flex-col">
                      <span className="text-[14px] font-medium text-[#1B1A18]">
                        {c.name}
                      </span>
                      <span className="text-[11px] text-[#8C8B85]">{c.sub}</span>
                    </div>

                    <div className="col-span-2 text-[13px] text-[#6E6D67] tabular-nums">
                      {c.hapPrice}
                    </div>

                    <div className="col-span-2 text-[13px] font-semibold text-[#1B1A18] tabular-nums">
                      {c.avgPrice}
                    </div>

                    <div className="col-span-3 flex flex-col">
                      <span className="text-[13px] font-semibold text-[#1B1A18]">
                        {c.cheapestMarket}
                      </span>
                      <span className="text-[12px] font-bold text-[#1B1A18] tabular-nums">
                        {c.cheapestPrice}
                      </span>
                    </div>

                    <div className="col-span-1">
                      <div className="inline-flex items-center gap-1 text-[12px] font-medium tabular-nums text-[#1B1A18]">
                        {c.trendType === 'down' && <TrendDown size={13} weight="bold" />}
                        {c.trendType === 'up' && <TrendUp size={13} weight="bold" className="text-[#B45309]" />}
                        {c.trendType === 'stable' && <Minus size={13} weight="bold" className="text-[#8C8B85]" />}
                        <span>{c.trend}</span>
                      </div>
                    </div>

                    <div className="col-span-1 flex justify-end">
                      <span
                        className={`px-2.5 py-1 rounded-[6px] text-[10px] font-semibold ${
                          c.status === 'Agak Mahal'
                            ? 'bg-[#FEF3C7] text-[#92400E] outline outline-1 outline-[#FDE68A]'
                            : 'bg-[#F4F3F0] text-[#1B1A18] outline outline-1 outline-[#E5E3DE]'
                        }`}
                      >
                        {c.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Table Footer */}
          <div className="px-6 py-4 bg-[#FAF9F5] border-t border-[#E5E3DE] flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-[#6E6D67]">
            <span>Menampilkan data terverifikasi pasar tradisional · Diperbarui tiap 06:00 WIB</span>
            <Link
              href="/dashboard"
              className="text-[#1B1A18] font-semibold hover:underline inline-flex items-center gap-1"
            >
              <span>Buka Seluruh 24 Komoditas Pangan</span>
              <ArrowRight size={13} weight="bold" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
