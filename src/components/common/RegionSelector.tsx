'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useRegion } from '@/lib/store/region-store';
import { ISLAND_TABS } from '@/lib/mock/regions.data';
import { IslandCorridor } from '@/types';
import { MapPin, CaretDown, Check, MagnifyingGlass, X } from '@phosphor-icons/react';

interface Props {
  className?: string;
  variant?: 'pill' | 'compact' | 'card';
}

export function RegionSelector({ className = '', variant = 'pill' }: Props) {
  const { selectedRegion, setSelectedRegion, allRegions } = useRegion();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIsland, setSelectedIsland] = useState<'ALL' | IslandCorridor>('ALL');
  const popoverRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Focus search input when popover opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    } else {
      setSearchQuery('');
      setSelectedIsland('ALL');
    }
  }, [isOpen]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Filtered regions based on search & active island tab
  const filteredRegions = useMemo(() => {
    return allRegions.filter((r) => {
      const matchesIsland =
        selectedIsland === 'ALL' || r.island === selectedIsland;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        r.name.toLowerCase().includes(q) ||
        Boolean(r.province && r.province.toLowerCase().includes(q)) ||
        r.islandName.toLowerCase().includes(q);
      return matchesIsland && matchesSearch;
    });
  }, [allRegions, selectedIsland, searchQuery]);

  return (
    <div ref={popoverRef} className={`relative inline-block text-left ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center gap-1.5 transition-all select-none cursor-pointer ${
          variant === 'compact'
            ? 'px-2.5 py-1 rounded-full bg-white outline outline-1 outline-[#E5E3DE] hover:outline-[#1B1A18] text-[12px] font-semibold text-[#1B1A18] shadow-2xs'
            : variant === 'card'
            ? 'w-full px-3.5 py-2.5 rounded-[12px] bg-white outline outline-1 outline-[#E5E3DE] hover:outline-[#1B1A18] text-[13px] font-semibold text-[#1B1A18] justify-between shadow-2xs'
            : 'w-[145px] sm:w-[155px] px-3 py-1.5 rounded-full bg-white/90 hover:bg-[#FAF9F5] outline outline-1 outline-[#E5E3DE] hover:outline-[#1B1A18] text-[13px] font-semibold text-[#1B1A18] justify-between shadow-2xs'
        }`}
        aria-label="Pilih Wilayah & Pulau Acuan Pangan"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-1.5 min-w-0">
          <MapPin size={14} weight="fill" className="text-[#FF7714] shrink-0" />
          <span className="truncate text-left">{selectedRegion.name}</span>
        </span>
        <CaretDown
          size={12}
          weight="bold"
          className={`text-[#8C8B85] transition-transform duration-200 shrink-0 ml-1 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Popover Menu with Search & Island Filter */}
      {isOpen && (
        <div className="absolute right-0 sm:right-auto sm:left-0 mt-2 w-[310px] sm:w-[350px] rounded-[18px] bg-white outline outline-1 outline-[#E5E3DE] shadow-[0_16px_40px_rgba(0,0,0,0.1)] z-50 p-2.5 text-left animate-in fade-in zoom-in-95 duration-150">
          {/* Header */}
          <div className="px-2 pt-1 pb-2">
            <p className="text-[10px] font-bold text-[#FF7714] tracking-wider uppercase">
              Acuan Pangan · Koridor Pulau
            </p>
            <p className="text-[12px] font-medium text-[#6E6D67] mt-0.5">
              Disesuaikan biaya logistik laut &amp; supply-demand antar-pulau
            </p>
          </div>

          {/* Mini Search Bar */}
          <div className="relative px-1 mb-2">
            <MagnifyingGlass
              size={13}
              weight="bold"
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C8B85]"
            />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Cari provinsi atau pulau..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-7 py-1.5 rounded-[8px] bg-[#FAF9F5] outline outline-1 outline-[#E5E3DE] text-[12px] text-[#1B1A18] placeholder:text-[#8C8B85] focus:outline-[#1B1A18] transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-[#8C8B85] hover:text-[#1B1A18]"
              >
                <X size={12} weight="bold" />
              </button>
            )}
          </div>

          {/* Quick Island Filter Chips */}
          <div className="flex items-center gap-1 overflow-x-auto pb-2 px-1 scrollbar-none">
            {ISLAND_TABS.map((tab) => {
              const active = selectedIsland === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedIsland(tab.id)}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-medium whitespace-nowrap transition-colors shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#1B1A18] text-white shadow-2xs'
                      : 'bg-[#FAF9F5] hover:bg-[#F4F3F0] text-[#6E6D67] outline outline-1 outline-[#E5E3DE]'
                  }`}
                >
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className={`ml-1 text-[9px] font-bold ${active ? 'text-[#EEF773]' : 'text-[#8C8B85]'}`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* List of Regions */}
          <div className="py-1 px-1 max-h-[240px] overflow-y-auto space-y-1">
            {filteredRegions.length === 0 ? (
              <div className="py-6 text-center text-[12px] text-[#8C8B85]">
                Tidak ditemukan provinsi &quot;{searchQuery}&quot;
              </div>
            ) : (
              filteredRegions.map((region) => {
                const isSelected = region.id === selectedRegion.id;
                return (
                  <button
                    key={region.id}
                    type="button"
                    onClick={() => {
                      setSelectedRegion(region);
                      setIsOpen(false);
                    }}
                    className={`w-full px-3 py-2 rounded-[10px] flex items-center justify-between transition-colors text-left cursor-pointer border ${
                      isSelected
                        ? 'bg-[#FAF9F5] border-[#1B1A18] shadow-2xs'
                        : 'border-transparent hover:bg-[#FAF9F5]'
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className="text-[13px] font-semibold text-[#1B1A18] flex items-center gap-1.5">
                        {region.name}
                        {isSelected && (
                          <Check size={13} weight="bold" className="text-[#FF7714]" />
                        )}
                      </span>
                      <span className="text-[11px] text-[#8C8B85]">
                        {region.islandName} · {region.logisticsCostPct === 0 ? 'Sentra Produksi' : 'Jalur Kargo Laut'}
                      </span>
                    </div>

                    <div className="flex flex-col items-end">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-[4px] border ${
                          region.logisticsCostPct === 0
                            ? 'bg-white border-[#E5E3DE] text-[#1B1A18]'
                            : 'bg-[#FFF3ED] border-[#FFD8C2] text-[#B53D0A]'
                        }`}
                      >
                        {region.logisticsCostPct === 0
                          ? 'Harga Dasar'
                          : `+${region.logisticsCostPct}% Ongkir Kapal`}
                      </span>
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Educational Footer */}
          <div className="p-2 border-t border-[#E5E3DE] mt-1 bg-[#FAF9F5] rounded-[10px]">
            <p className="text-[11px] text-[#6E6D67] leading-[15px]">
              Toleransi ongkir kapal otomatis dihitung untuk menjaga transparansi harga wajar di seluruh wilayah.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
