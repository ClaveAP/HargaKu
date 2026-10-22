'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  MapPin,
  Clock,
  NavigationArrow,
  ArrowRight,
  Storefront,
} from '@phosphor-icons/react';
import { BOGOR_MARKETS, type MarketData } from './market-map-data';

export function ClayMarketMapSection() {
  const [activeMarket, setActiveMarket] = useState<MarketData>(BOGOR_MARKETS[0]);

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
              <span>Spasial 5 Pasar Tradisional</span>
            </div>

            <h2 className="text-[32px] sm:text-[40px] font-medium text-[#1B1A18] leading-[1.15] tracking-tight max-w-[640px] text-balance">
              Bandingkan sentra pangan terdekat sebelum berangkat belanja.
            </h2>
          </div>

          <p className="text-[14px] sm:text-[15px] text-[#6E6D67] leading-[1.6] max-w-[480px]">
            Setiap pasar di Kota Bogor memiliki spesialisasi komoditas dan jadwal pasokan terbaik.
            Pilih pasar untuk melihat rute, jam buka, dan harga unggulan riil hari ini.
          </p>
        </div>

        {/* 5-Market Interactive Selector Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {BOGOR_MARKETS.map((market) => {
            const isSelected = activeMarket.id === market.id;
            return (
              <button
                key={market.id}
                type="button"
                onClick={() => setActiveMarket(market)}
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
          {/* Left: Map Preview with Live Callout */}
          <div className="lg:col-span-7 relative rounded-[20px] outline outline-1 outline-[#E5E3DE] overflow-hidden min-h-[360px] sm:min-h-[420px] bg-cover bg-center flex flex-col justify-between p-6 shadow-xs"
            style={{ backgroundImage: "url('/images/peta-pasar-clay.jpg')" }}
          >
            {/* Active Marker Pin Overlay */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/95 backdrop-blur-xs outline outline-1 outline-[#1B1A18]/15 rounded-full text-[12px] font-semibold text-[#1B1A18] shadow-sm w-fit">
              <MapPin size={16} weight="fill" className="text-[#FF7714]" />
              <span>Lokasi Terpilih: {activeMarket.name}</span>
            </div>

            {/* Bottom Floating Card */}
            <div className="p-4 bg-white/95 backdrop-blur-xs outline outline-1 outline-[#E5E3DE] rounded-[14px] flex items-center justify-between text-[12px] shadow-sm">
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
