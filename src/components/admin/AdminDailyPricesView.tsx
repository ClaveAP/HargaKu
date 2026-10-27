'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useAdminStore } from '@/lib/store/admin-store';
import { MOCK_REGIONS, ISLAND_TABS } from '@/lib/mock/regions.data';
import { DailyPriceTable } from './DailyPriceTable';
import {
  CheckCircle,
  Clock,
  MagnifyingGlass,
  MapPin,
  Storefront,
  X,
} from '@phosphor-icons/react';

export function AdminDailyPricesView() {
  const { markets, commodities, dailyPrices, updateDailyPrices } = useAdminStore();

  const activeMarkets = useMemo(() => markets.filter((m) => m.isActive), [markets]);
  const activeCommodities = useMemo(() => commodities.filter((c) => c.isActive), [commodities]);

  const regionMap = useMemo(() => new Map(MOCK_REGIONS.map((r) => [r.id, r])), []);

  const [selectedIsland, setSelectedIsland] = useState<string>('ALL');
  const [selectedMarketId, setSelectedMarketId] = useState<string>(
    activeMarkets[0]?.id || 'kebon-kembang'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [recordedDate, setRecordedDate] = useState<string>(() => {
    return new Date().toISOString().split('T')[0];
  });
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState<string>('');

  const searchBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchBoxRef.current && !searchBoxRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const islandFilteredMarkets = useMemo(() => {
    return activeMarkets.filter((m) => {
      const reg = m.regionId ? regionMap.get(m.regionId) : undefined;
      const island = reg?.island || 'JAWA';
      return selectedIsland === 'ALL' || island === selectedIsland;
    });
  }, [activeMarkets, selectedIsland, regionMap]);

  const searchResults = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return islandFilteredMarkets;
    return activeMarkets.filter((m) => {
      const reg = m.regionId ? regionMap.get(m.regionId) : undefined;
      const provName = reg?.name || '';
      const islandName = reg?.islandName || '';
      return (
        m.name.toLowerCase().includes(q) ||
        (m.city && m.city.toLowerCase().includes(q)) ||
        (m.district && m.district.toLowerCase().includes(q)) ||
        provName.toLowerCase().includes(q) ||
        islandName.toLowerCase().includes(q)
      );
    });
  }, [activeMarkets, searchQuery, islandFilteredMarkets, regionMap]);

  useEffect(() => {
    const nextInputs: Record<string, string> = {};
    for (const c of activeCommodities) {
      const key = `${selectedMarketId}_${c.id}`;
      const record = dailyPrices[key];
      if (record && record.price) {
        nextInputs[c.id] = record.price.toString();
      } else {
        nextInputs[c.id] = c.hapHetPrice.toString();
      }
    }
    setInputs(nextInputs);
    setSuccessMessage('');
  }, [selectedMarketId, recordedDate, activeCommodities, dailyPrices]);

  const handlePriceChange = (commodityId: string, val: string) => {
    setInputs((prev) => ({ ...prev, [commodityId]: val }));
  };

  const handleSelectMarket = (marketId: string) => {
    setSelectedMarketId(marketId);
    setSearchQuery('');
    setIsSearchOpen(false);
  };

  const handleSaveBatch = (e: React.FormEvent) => {
    e.preventDefault();
    const entries: Array<{ commodityId: string; price: number }> = [];

    for (const c of activeCommodities) {
      const val = inputs[c.id];
      const num = parseInt(val, 10);
      if (!isNaN(num) && num > 0) {
        entries.push({ commodityId: c.id, price: num });
      }
    }

    if (entries.length === 0) return;

    updateDailyPrices(selectedMarketId, recordedDate, entries);
    const marketObj = markets.find((m) => m.id === selectedMarketId);
    setSuccessMessage(
      `Harga resmi harian untuk ${marketObj?.name || 'Pasar'} berhasil disimpan dan dipublikasikan!`
    );
    setTimeout(() => setSuccessMessage(''), 4000);
  };

  const currentMarket = markets.find((m) => m.id === selectedMarketId) || activeMarkets[0];
  const currentRegion = currentMarket?.regionId ? regionMap.get(currentMarket.regionId) : undefined;

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white border border-[#E5E3DE] rounded-[24px] p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#FF7714]">
            Survei Pagi 06:00 WIB
          </span>
          <h1 className="text-2xl font-medium tracking-tight text-[#1B1A18] mt-0.5">
            Entri Cepat Harga Resmi Harian
          </h1>
          <p className="text-sm text-[#706E6A]">
            Perbarui data survei lapak pasar (Lapis 1 &amp; 2) yang menjadi patokan perhitungan harga wajar warga.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Clock size={16} className="text-[#A8A29E]" />
          <input
            type="date"
            value={recordedDate}
            onChange={(e) => setRecordedDate(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-[#E5E3DE] bg-[#FAF9F5] text-xs font-medium text-[#1B1A18]"
          />
        </div>
      </div>

      {/* Success Notification */}
      {successMessage && (
        <div className="p-4 rounded-2xl bg-[#DCFCE7] border border-[#BBF7D0] text-sm font-medium text-[#15803D] flex items-center gap-2">
          <CheckCircle size={18} weight="fill" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Search Bar & Koridor Wilayah Pulau Tabs */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-3">
        {/* Search Bar / Combobox */}
        <div ref={searchBoxRef} className="relative flex-1">
          <div className="relative">
            <MagnifyingGlass
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A8A29E]"
            />
            <input
              type="text"
              value={searchQuery}
              onFocus={() => setIsSearchOpen(true)}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              placeholder={`Cari pasar (sedang terpilih: ${currentMarket?.name || 'Pilih Pasar'})...`}
              className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-[#E5E3DE] bg-white text-sm text-[#1B1A18] focus:border-[#1B1A18] focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A8A29E] hover:text-[#1B1A18] cursor-pointer"
              >
                <X size={14} weight="bold" />
              </button>
            )}
          </div>

          {/* Autocomplete Dropdown List */}
          {isSearchOpen && (
            <div className="absolute top-full mt-1.5 left-0 right-0 z-30 bg-white border border-[#1B1A18] rounded-2xl shadow-[0_12px_32px_rgba(0,0,0,0.12)] max-h-64 overflow-y-auto p-1.5 space-y-1">
              {searchResults.length > 0 ? (
                searchResults.map((m) => {
                  const reg = m.regionId ? regionMap.get(m.regionId) : undefined;
                  const isSelected = m.id === selectedMarketId;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => handleSelectMarket(m.id)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-[#1B1A18] text-white'
                          : 'hover:bg-[#FAF9F5] text-[#1B1A18]'
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className="font-semibold">{m.name}</span>
                        <span className={isSelected ? 'text-white/80' : 'text-[#706E6A]'}>
                          {m.city || 'Nasional'} · {m.district}
                        </span>
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded-md text-[10px] font-medium ${
                          isSelected
                            ? 'bg-white/20 text-white'
                            : 'bg-[#FAF9F5] text-[#6E6D67] border border-[#E5E3DE]'
                        }`}
                      >
                        {reg?.islandName || 'Nasional'}
                      </span>
                    </button>
                  );
                })
              ) : (
                <div className="p-4 text-center text-xs text-[#706E6A]">
                  Tidak ada pasar yang cocok dengan pencarian &quot;{searchQuery}&quot;
                </div>
              )}
            </div>
          )}
        </div>

        {/* Koridor Wilayah Pulau Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 shrink-0">
          {ISLAND_TABS.map((tab) => {
            const isSelected = selectedIsland === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setSelectedIsland(tab.id);
                  setSearchQuery('');
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#1B1A18] text-white border-[#1B1A18] shadow-xs'
                    : 'bg-white text-[#706E6A] border-[#E5E3DE] hover:bg-[#FAF9F5] hover:text-[#1B1A18]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Akses Cepat Pasar Geser Horisontal (Scrollable / Swipeable tanpa tombol <>) */}
      <div className="bg-white border border-[#E5E3DE] rounded-[20px] p-4 flex flex-col gap-2 shadow-2xs">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-[#1B1A18]">
            Akses Cepat Pasar {selectedIsland !== 'ALL' ? `(Koridor ${selectedIsland})` : '(Semua Wilayah)'}:
          </span>
          <span className="text-[11px] text-[#A8A29E]">
            {islandFilteredMarkets.length} pasar · Geser ke samping untuk memilih pasar lain
          </span>
        </div>

        {/* Scrollable Track without <> buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1.5 pt-0.5 -mx-1 px-1 scrollbar-none">
          {islandFilteredMarkets.map((m) => {
            const isSelected = m.id === selectedMarketId;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => handleSelectMarket(m.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap border shrink-0 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#1B1A18] text-white border-[#1B1A18] shadow-xs'
                    : 'bg-[#FAF9F5] text-[#706E6A] border-[#E5E3DE] hover:bg-white hover:text-[#1B1A18]'
                }`}
              >
                {m.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Public Context Banner */}
      <div className="bg-white border border-[#E5E3DE] rounded-[20px] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FAF9F5] border border-[#E5E3DE] flex items-center justify-center text-[#FF7714] shrink-0">
            <Storefront size={20} weight="bold" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm font-bold text-[#1B1A18]">{currentMarket?.name}</h3>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#FAF9F5] border border-[#E5E3DE] text-[#4A4843]">
                <MapPin size={11} weight="fill" className="text-[#FF7714]" />
                {currentMarket?.city && currentRegion && currentMarket.city !== currentRegion.name
                  ? `${currentMarket.city} · ${currentRegion.name}`
                  : currentMarket?.city || currentRegion?.name || 'Nasional'}
              </span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                  currentRegion && currentRegion.logisticsCostPct > 0
                    ? 'bg-[#FFF3ED] border-[#FFD9C7] text-[#B53D0A]'
                    : 'bg-[#FAF9F5] border-[#E5E3DE] text-[#6E6D67]'
                }`}
              >
                {currentRegion && currentRegion.logisticsCostPct > 0
                  ? `+${currentRegion.logisticsCostPct}% Ongkir Kapal`
                  : 'Sentra Produksi (Acuan Nasional)'}
              </span>
            </div>
            <p className="text-xs text-[#706E6A] mt-1 leading-relaxed">
              Harga resmi pasar ini menjadi patokan wajar belanja warga di{' '}
              <strong className="text-[#1B1A18] font-semibold">
                {currentMarket?.city || currentRegion?.name || 'wilayah ini'}
              </strong>
              {currentRegion && currentRegion.logisticsCostPct > 0
                ? ` (disesuaikan dengan toleransi ongkir kapal laut +${currentRegion.logisticsCostPct}% antar-pulau).`
                : ' (mengacu langsung pada harga acuan pangan nasional tanpa beban ongkir laut).'}
            </p>
          </div>
        </div>
      </div>

      {/* Fast-Entry Matrix Table Component */}
      <DailyPriceTable
        currentMarketName={currentMarket?.name || 'Pasar'}
        activeCommodities={activeCommodities}
        dailyPrices={dailyPrices}
        selectedMarketId={selectedMarketId}
        inputs={inputs}
        onPriceChange={handlePriceChange}
        onSubmit={handleSaveBatch}
      />
    </div>
  );
}
