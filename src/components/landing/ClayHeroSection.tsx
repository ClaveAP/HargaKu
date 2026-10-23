'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Storefront,
  Clock,
  ShieldCheck,
  Scales,
  ChartBar,
} from '@phosphor-icons/react';
import { COMMODITY_PRESETS, CommodityPreset } from './hero-data';
import { ClayCalculatorInstrument } from './ClayCalculatorInstrument';
import { ClayMarketRankings } from './ClayMarketRankings';
import { formatRupiah } from '@/lib/price-logic';
import { useRegion } from '@/lib/store/region-store';
import { useLiveCatalog } from '@/lib/store/use-live-catalog';

export function ClayHeroSection() {
  const { selectedRegion } = useRegion();
  const { presets: livePresets } = useLiveCatalog();
  const presets = livePresets.length > 0 ? livePresets : COMMODITY_PRESETS;

  const [selectedPresetId, setSelectedPresetId] = useState<string>(
    COMMODITY_PRESETS[0].id
  );
  const [activeTab, setActiveTab] = useState<'kalkulator' | 'komparasi'>(
    'kalkulator'
  );

  const activePreset =
    presets.find((p) => p.id === selectedPresetId) || presets[0] || COMMODITY_PRESETS[0];

  return (
    <section
      style={{ backgroundImage: "url('/images/hero-backdrop.jpg')" }}
      className="w-full min-h-[calc(100vh-104px)] lg:min-h-[calc(100dvh-104px)] relative bg-no-repeat bg-cover bg-center flex flex-col justify-center py-10 lg:py-14 px-4 sm:px-8 lg:px-12 border-b border-[#E5E3DE]/70 overflow-hidden"
    >
      <div className="max-w-[1240px] mx-auto w-full flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-12 xl:gap-14">
        {/* Left Column: Narrative & Conversion */}
        <div className="w-full lg:w-[48%] xl:w-[50%] flex flex-col items-start gap-6 lg:gap-7">
          {/* Eyebrow Badge (No Dot) */}
          <div className="inline-flex items-center px-3.5 py-1.5 bg-white outline outline-1 outline-[#E5E3DE] -outline-offset-1 rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
            <span className="text-[12px] font-medium text-[#1B1A18] tracking-tight">
              Transparansi Pangan Digital · {selectedRegion.name} ({selectedRegion.islandName})
            </span>
          </div>

          {/* Headline Display */}
          <h1 className="text-[36px] sm:text-[44px] lg:text-[48px] xl:text-[50px] font-medium text-[#1B1A18] leading-[1.12] tracking-tight max-w-[540px] text-balance">
            Tahu harga wajar pasar sebelum melangkah belanja.
          </h1>

          {/* Subtitle */}
          <p className="text-[15px] sm:text-[16px] text-[#6E6D67] leading-[1.6] max-w-[540px]">
            Platform acuan pangan nasional terkalibrasi daerah. Cek tren harga riil dari rumah sebelum berangkat belanja, dan deteksi potensi mark-up pedagang saat bertransaksi di {selectedRegion.name}.
          </p>

          {/* Dual CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <a
              href="#tabel-komoditas"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[8px] bg-[#EEF773] text-[#1B1A18] font-semibold text-[14px] outline outline-1 outline-[#1B1A18] shadow-[0_2px_0_#1B1A18] hover:bg-[#e4ee5e] active:translate-y-[1px] transition-all cursor-pointer"
            >
              <span>Mulai Cek Harga Wajar</span>
              <ArrowRight size={16} weight="bold" />
            </a>

            <a
              href="#peta-pasar"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-[8px] bg-white text-[#1B1A18] font-medium text-[14px] outline outline-1 outline-[#E5E3DE] hover:bg-[#F4F3F0] transition-colors cursor-pointer"
            >
              <Storefront size={16} weight="bold" />
              <span>Peta Pasar Wilayah</span>
            </a>
          </div>

          {/* Trust Proof Strip */}
          <div className="w-full pt-6 mt-2 border-t border-[#E5E3DE] grid grid-cols-3 gap-3 sm:gap-6">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5 text-[#1B1A18] font-medium text-[13px] sm:text-[14px]">
                <Storefront size={16} className="text-[#FF7714]" weight="fill" />
                <span>Pasar Rakyat</span>
              </div>
              <span className="text-[11px] sm:text-[12px] text-[#8C8B85] leading-tight">
                Pantauan harian lapak
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5 text-[#1B1A18] font-medium text-[13px] sm:text-[14px]">
                <Clock size={16} className="text-[#15803D]" weight="fill" />
                <span>06:00 WIB</span>
              </div>
              <span className="text-[11px] sm:text-[12px] text-[#8C8B85] leading-tight">
                Pembaruan harga harian
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5 text-[#1B1A18] font-medium text-[13px] sm:text-[14px]">
                <ShieldCheck size={16} className="text-[#2563EB]" weight="fill" />
                <span>HAP Bapanas</span>
              </div>
              <span className="text-[11px] sm:text-[12px] text-[#8C8B85] leading-tight">
                Acuan batas harga resmi
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Live Interactive Instrument */}
        <div className="w-full lg:w-[50%] xl:w-[48%] flex flex-col">
          <div className="w-full bg-white outline outline-1 outline-[#E5E3DE] -outline-offset-1 rounded-[24px] shadow-[0_12px_40px_rgba(0,0,0,0.06)] overflow-hidden">
            {/* Top Bar: Commodity Chips */}
            <div className="p-4 sm:p-5 bg-[#F4F3F0] border-b border-[#E5E3DE] flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#8C8B85] uppercase tracking-wider">
                  Pilih Komoditas
                </span>
                <span className="text-[11px] font-medium text-[#6E6D67]">
                  {selectedRegion.name} · Riil Hari Ini
                </span>
              </div>

              {/* Quick Preset Chips */}
              <div className="flex flex-wrap items-center gap-2">
                {presets.map((preset) => {
                  const isSelected = activePreset.id === preset.id;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => setSelectedPresetId(preset.id)}
                      className={`px-3 py-1.5 rounded-[8px] text-[12px] transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#1B1A18] text-white font-semibold shadow-xs'
                          : 'bg-white text-[#6E6D67] font-medium outline outline-1 outline-[#E5E3DE] -outline-offset-1 hover:text-[#1B1A18] hover:bg-[#FAF9F5]'
                      }`}
                    >
                      {preset.shortName}
                    </button>
                  );
                })}
              </div>

              {/* Instrument Tab Switcher */}
              <div className="grid grid-cols-2 p-1 bg-[#EBEAE5] rounded-[10px] gap-1">
                <button
                  type="button"
                  onClick={() => setActiveTab('kalkulator')}
                  className={`flex items-center justify-center gap-2 py-2 rounded-[8px] text-[12px] transition-all cursor-pointer ${
                    activeTab === 'kalkulator'
                      ? 'bg-white text-[#1B1A18] font-semibold shadow-xs'
                      : 'text-[#6E6D67] font-medium hover:text-[#1B1A18]'
                  }`}
                >
                  <Scales size={15} weight={activeTab === 'kalkulator' ? 'bold' : 'regular'} />
                  <span>Kalkulator Takaran</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('komparasi')}
                  className={`flex items-center justify-center gap-2 py-2 rounded-[8px] text-[12px] transition-all cursor-pointer ${
                    activeTab === 'komparasi'
                      ? 'bg-white text-[#1B1A18] font-semibold shadow-xs'
                      : 'text-[#6E6D67] font-medium hover:text-[#1B1A18]'
                  }`}
                >
                  <ChartBar size={15} weight={activeTab === 'komparasi' ? 'bold' : 'regular'} />
                  <span>Komparasi Antar Pasar</span>
                </button>
              </div>
            </div>

            {/* Instrument Content Area */}
            <div className="p-6 sm:p-7 bg-white">
              {activeTab === 'kalkulator' ? (
                <div className="flex flex-col gap-4">
                  <ClayCalculatorInstrument
                    commodityName={activePreset.name}
                    averagePricePerKg={activePreset.averagePrice}
                  />

                  {/* Context Micro-Bar */}
                  <div className="p-3 bg-[#FAF9F5] outline outline-1 outline-[#E5E3DE] -outline-offset-1 rounded-[10px] flex items-center justify-between text-[12px]">
                    <span className="text-[#6E6D67]">
                      Pasar termurah saat ini:{' '}
                      <strong className="text-[#1B1A18] font-semibold">
                        {activePreset.cheapestMarket}
                      </strong>
                    </span>
                    <span className="px-2 py-0.5 rounded-[5px] bg-[#EEF773] text-[#1B1A18] font-semibold tabular-nums text-[11px] outline outline-1 outline-[#1B1A18]/20">
                      {formatRupiah(activePreset.cheapestPrice)}/kg
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <ClayMarketRankings
                    commodityName={activePreset.name}
                    averagePrice={activePreset.averagePrice}
                    ranks={activePreset.ranks}
                  />

                  {/* Context Micro-Bar */}
                  <div className="p-3 bg-[#FAF9F5] outline outline-1 outline-[#E5E3DE] -outline-offset-1 rounded-[10px] flex items-center justify-between text-[12px]">
                    <span className="text-[#6E6D67]">
                      Rekomendasi hemat di:{' '}
                      <strong className="text-[#1B1A18] font-semibold">
                        {activePreset.cheapestMarket}
                      </strong>
                    </span>
                    <span className="px-2 py-0.5 rounded-[5px] bg-[#EEF773] text-[#1B1A18] font-semibold tabular-nums text-[11px] outline outline-1 outline-[#1B1A18]/20">
                      Hemat {formatRupiah(activePreset.ranks[activePreset.ranks.length - 1].price - activePreset.ranks[0].price)}/kg
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Proof Strip */}
            <div className="px-6 py-3.5 bg-[#FAF9F5] border-t border-[#E5E3DE] flex items-center justify-between text-[11px] text-[#8C8B85]">
              <span>Sumber: PIHPS &amp; Survei Warga Terverifikasi</span>
              <a
                href="#rantai-pasok"
                className="text-[#FF7714] font-medium hover:underline inline-flex items-center gap-1"
              >
                <span>Lihat Alur 3 Lapis</span>
                <ArrowRight size={12} weight="bold" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
