'use client';

import { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import {
  MapPin,
  Clock,
  NavigationArrow,
  ArrowRight,
  Storefront,
} from '@phosphor-icons/react';
import { type MarketData } from './market-map-data';
import { useRegion } from '@/lib/store/region-store';
import { getMarketsByRegion } from '@/lib/mock/markets.data';
import { formatRupiah } from '@/lib/utils';

const LeafletMarketMap = dynamic(
  () => import('@/components/common/LeafletMarketMap'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[380px] bg-[#FAF9F5] flex items-center justify-center text-[#8C8B85] text-[13px] font-medium animate-pulse">
        Memuat Peta Spasial Pasar...
      </div>
    ),
  }
);

export function ClayMarketMapSection() {
  const { selectedRegion } = useRegion();
  const [selectedMarketId, setSelectedMarketId] = useState<string>('');

  const regionMarkets = getMarketsByRegion(selectedRegion.id);

  // Dynamic regional market data
  const regionalMarkets: MarketData[] = regionMarkets.map((m, idx) => ({
    id: m.id,
    name: m.name,
    shortName: m.name.replace('Pasar ', '').split(' (')[0],
    distance: `Sentra Wilayah ${m.city}`,
    address: `${m.name}, ${m.district}, ${m.city}`,
    latitude: m.latitude,
    longitude: m.longitude,
    specialty:
      idx === 0
        ? 'Sentra Grosir & Eceran Sayuran Segar, Bumbu, dan Bahan Pokok'
        : idx === 1
        ? 'Sentra Daging Potong Segar, Unggas, dan Ikan Laut'
        : 'Sentra Sembako, Beras Pilihan, dan Komoditas Pokok',
    hours: idx === 0 ? '04:00 – 14:00 WIB' : '05:00 – 15:00 WIB',
    bestTime: '06:00 – 08:30 WIB (Pasokan baru bongkar muat)',
    topPrices: [
      {
        item: 'Cabai Merah Keriting',
        price:
          formatRupiah(
            Math.round(
              (48000 *
                (1 + (selectedRegion.logisticsCostPct || 0) / 100) *
                (idx === 0 ? 0.96 : 1.02)) /
                100
            ) * 100
          ) + ' / kg',
        badge: idx === 0 ? 'Termurah' : 'Wajar',
        isCheapest: idx === 0,
      },
      {
        item: 'Bawang Merah',
        price:
          formatRupiah(
            Math.round(
              (34000 *
                (1 + (selectedRegion.logisticsCostPct || 0) / 100) *
                (idx === 1 ? 0.95 : 1.0)) /
                100
            ) * 100
          ) + ' / kg',
        badge: idx === 1 ? 'Termurah' : 'Wajar',
        isCheapest: idx === 1,
      },
      {
        item: 'Beras Medium',
        price:
          formatRupiah(
            Math.round(
              (13500 * (1 + (selectedRegion.logisticsCostPct || 0) / 100)) /
                100
            ) * 100
          ) + ' / kg',
        badge: 'Wajar',
      },
    ],
  }));

  const activeMarket =
    regionalMarkets.find((m) => m.id === selectedMarketId) ||
    regionalMarkets[0] || {
      id: 'default',
      name: `Pasar Sentral ${selectedRegion.name}`,
      shortName: selectedRegion.name,
      distance: 'Pusat Kota',
      address: `Kawasan Niaga Pangan ${selectedRegion.name}`,
      latitude: selectedRegion.latitude || -6.2,
      longitude: selectedRegion.longitude || 106.8,
      specialty: 'Sentra Pangan Terpadu',
      hours: '05:00 – 15:00 WIB',
      bestTime: '06:00 – 08:30 WIB',
      topPrices: [],
    };

  const mapItems = regionalMarkets.map((m) => ({
    id: m.id,
    name: m.name,
    shortName: m.shortName,
    latitude: m.latitude,
    longitude: m.longitude,
    priceText: m.topPrices[0]?.price.split('/')[0].trim(),
    address: m.address,
    specialty: m.specialty,
  }));

  const mapCenter: [number, number] = [
    activeMarket.latitude || selectedRegion.latitude || -6.2,
    activeMarket.longitude || selectedRegion.longitude || 106.8,
  ];

  return (
    <section
      id="peta-pasar"
      className="w-full bg-[#FAF9F5] py-20 px-4 sm:px-8 lg:px-12 border-b border-[#E5E3DE]/70"
    >
      <div className="max-w-[1240px] mx-auto flex flex-col gap-10">
        {/* Header Row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="flex flex-col gap-4">
            <div className="inline-flex items-center px-3.5 py-1.5 bg-white outline outline-1 outline-[#E5E3DE] rounded-full text-[12px] font-medium text-[#1B1A18] w-fit shadow-xs">
              <span>Terminal Spasial Pasar · {selectedRegion.name}</span>
            </div>

            <h2 className="text-[32px] sm:text-[40px] font-medium text-[#1B1A18] leading-[1.15] tracking-tight max-w-[640px] text-balance">
              Bandingkan sentra pangan terdekat sebelum berangkat belanja.
            </h2>
          </div>

          <p className="text-[14px] sm:text-[15px] text-[#6E6D67] leading-[1.6] max-w-[480px]">
            Setiap pasar memiliki spesialisasi komoditas dan jadwal pasokan terbaik.
            Bandingkan pasar di {selectedRegion.name} untuk menemukan rute, jam buka, dan harga unggulan paling hemat hari ini.
          </p>
        </div>

        {/* Regional Market Interactive Selector Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {regionalMarkets.map((market) => {
            const isSelected = activeMarket.id === market.id;
            return (
              <button
                key={market.id}
                type="button"
                onClick={() => setSelectedMarketId(market.id)}
                className={`px-4 py-2 rounded-[8px] text-[13px] transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#1B1A18] text-white font-semibold shadow-xs'
                    : 'bg-white text-[#6E6D67] font-medium outline outline-1 outline-[#E5E3DE] hover:text-[#1B1A18] hover:bg-[#F4F3F0]'
                }`}
              >
                {market.shortName}
              </button>
            );
          })}
        </div>

        {/* 2-Column Split: Visual Map & Live Terminal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Interactive Leaflet Map Stage */}
          <div className="lg:col-span-7 relative rounded-[20px] outline outline-1 outline-[#E5E3DE] overflow-hidden min-h-[380px] sm:min-h-[440px] flex flex-col justify-between p-4 sm:p-5 shadow-xs bg-[#FAF9F5]">
            <div className="absolute inset-0 z-0">
              <LeafletMarketMap
                markets={mapItems}
                activeMarketId={activeMarket.id}
                onSelectMarket={(id) => {
                  setSelectedMarketId(id);
                }}
                center={mapCenter}
                zoom={13}
                className="w-full h-full"
              />
            </div>

            {/* Active Marker Pin Overlay */}
            <div className="relative z-10 pointer-events-none inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/95 backdrop-blur-xs outline outline-1 outline-[#1B1A18]/15 rounded-full text-[12px] font-semibold text-[#1B1A18] shadow-sm w-fit">
              <MapPin size={16} weight="fill" className="text-[#FF7714]" />
              <span>Lokasi Terpilih: {activeMarket.name}</span>
            </div>

            {/* Bottom Floating Card */}
            <div className="relative z-10 p-4 bg-white/95 backdrop-blur-xs outline outline-1 outline-[#E5E3DE] rounded-[14px] flex items-center justify-between text-[12px] shadow-sm">
              <div className="flex items-center gap-2 text-[#6E6D67]">
                <NavigationArrow size={14} weight="bold" className="text-[#1B1A18]" />
                <span>{activeMarket.distance}</span>
              </div>
              <span className="font-semibold text-[#1B1A18]">
                {activeMarket.address}
              </span>
            </div>
          </div>

          {/* Right: Live Market Terminal */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-7 bg-white outline outline-1 outline-[#E5E3DE] rounded-[20px] shadow-xs gap-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-bold text-[#8C8B85] uppercase tracking-wider">
                  Profil Pasar Tradisional
                </span>
                <h3 className="text-[22px] font-medium text-[#1B1A18]">
                  {activeMarket.name}
                </h3>
              </div>

              <div className="p-3 bg-[#FAF9F5] outline outline-1 outline-[#E5E3DE] rounded-[10px] flex flex-col gap-1 text-[12px]">
                <span className="font-semibold text-[#1B1A18]">
                  {activeMarket.specialty}
                </span>
                <span className="text-[#6E6D67] flex items-center gap-1.5 mt-1">
                  <Clock size={13} weight="bold" />
                  <span>Buka: {activeMarket.hours} · Terbaik: {activeMarket.bestTime}</span>
                </span>
              </div>

              {/* Top Commodity Prices at this Market */}
              <div className="flex flex-col gap-2 pt-1">
                <span className="text-[11px] font-bold text-[#8C8B85] uppercase tracking-wider">
                  Komoditas Unggulan Hari Ini
                </span>

                {activeMarket.topPrices.map((item) => (
                  <div
                    key={item.item}
                    className="flex items-center justify-between p-3 bg-[#FAF9F5] outline outline-1 outline-[#E5E3DE] rounded-[8px] text-[12px]"
                  >
                    <span className="font-medium text-[#1B1A18]">{item.item}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#1B1A18] tabular-nums">
                        {item.price}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-[4px] text-[10px] font-semibold ${
                          item.isCheapest
                            ? 'bg-[#EEF773] text-[#1B1A18] outline outline-1 outline-[#1B1A18]/25'
                            : 'bg-white text-[#6E6D67] outline outline-1 outline-[#E5E3DE]'
                        }`}
                      >
                        {item.badge}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-[8px] bg-[#1B1A18] text-white text-[13px] font-medium hover:bg-black transition-colors"
            >
              <span>Buka Data Seluruh Lapak Pasar Ini</span>
              <ArrowRight size={14} weight="bold" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
