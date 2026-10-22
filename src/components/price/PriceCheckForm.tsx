'use client';

import { CommoditySummary, Market } from '@/types';
import { CaretDown } from '@phosphor-icons/react';

export interface TakaranUnit {
  id: string;
  label: string;
  gramMultiplier: number; // e.g. ons is 100g, 1kg is 1000g
}

export const TAKARAN_UNITS: TakaranUnit[] = [
  { id: 'ons', label: 'Ons (100 gram)', gramMultiplier: 100 },
  { id: 'quarter', label: '1/4 kg (250 gram)', gramMultiplier: 250 },
  { id: 'half', label: '1/2 kg (500 gram)', gramMultiplier: 500 },
  { id: 'kg', label: '1 kg (Standar)', gramMultiplier: 1000 },
  { id: 'liter', label: 'Liter', gramMultiplier: 1000 },
];

interface Props {
  commodities: CommoditySummary[];
  markets: Market[];
  selectedCommodityId: string;
  onCommodityChange: (id: string) => void;
  takaranAmount: number;
  onTakaranAmountChange: (amount: number) => void;
  selectedUnitId: string;
  onUnitChange: (unitId: string) => void;
  selectedMarketId: string;
  onMarketChange: (marketId: string) => void;
  rawPriceInput: string;
  onPriceInputChange: (price: string) => void;
  normalizedPricePerKg: number;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
}

export function PriceCheckForm({
  commodities,
  markets,
  selectedCommodityId,
  onCommodityChange,
  takaranAmount,
  onTakaranAmountChange,
  selectedUnitId,
  onUnitChange,
  selectedMarketId,
  onMarketChange,
  rawPriceInput,
  onPriceInputChange,
  normalizedPricePerKg,
  onSubmit,
  loading,
}: Props) {
  return (
    <div className="bg-white rounded-[18px] outline outline-1 outline-[#E5E3DE] p-6 sm:p-7 shadow-xs flex flex-col gap-6">
      <h2 className="text-[18px] font-bold text-[#1B1A18] tracking-tight">
        Data Belanja Lapak
      </h2>

      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        {/* Pilih Komoditas */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-semibold text-[#1B1A18]">
            Pilih Komoditas
          </label>
          <div className="relative">
            <select
              value={selectedCommodityId}
              onChange={(e) => onCommodityChange(e.target.value)}
              className="w-full appearance-none pl-3.5 pr-8 py-2.5 rounded-[10px] bg-white outline outline-1 outline-[#E5E3DE] text-[13px] text-[#1B1A18] font-medium shadow-xs focus:outline-[#1B1A18] cursor-pointer"
            >
              {commodities.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            <CaretDown
              size={13}
              weight="bold"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C8B85] pointer-events-none"
            />
          </div>
        </div>

        {/* Takaran Split Row */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
          <div className="sm:col-span-4 flex flex-col gap-1.5">
            <label className="text-[13px] font-semibold text-[#1B1A18]">
              Jumlah Takaran
            </label>
            <input
              type="number"
              min={1}
              max={100}
              value={takaranAmount}
              onChange={(e) => onTakaranAmountChange(Math.max(1, parseInt(e.target.value, 10) || 1))}
              className="w-full px-3.5 py-2.5 rounded-[10px] bg-white outline outline-1 outline-[#E5E3DE] text-[14px] text-[#1B1A18] font-bold shadow-xs focus:outline-[#1B1A18]"
            />
          </div>

          <div className="sm:col-span-8 flex flex-col gap-1.5">
            <label className="text-[13px] font-semibold text-[#1B1A18]">
              Satuan Lapak
            </label>
            <div className="relative">
              <select
                value={selectedUnitId}
                onChange={(e) => onUnitChange(e.target.value)}
                className="w-full appearance-none pl-3.5 pr-8 py-2.5 rounded-[10px] bg-white outline outline-1 outline-[#E5E3DE] text-[13px] text-[#1B1A18] font-medium shadow-xs focus:outline-[#1B1A18] cursor-pointer"
              >
                {TAKARAN_UNITS.map((unit) => (
                  <option key={unit.id} value={unit.id}>
                    {unit.label}
                  </option>
                ))}
              </select>
              <CaretDown
                size={13}
                weight="bold"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C8B85] pointer-events-none"
              />
            </div>
          </div>
        </div>

        {/* Pasar Tradisional */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-semibold text-[#1B1A18]">
            Pasar Tradisional
          </label>
          <div className="relative">
            <select
              value={selectedMarketId}
              onChange={(e) => onMarketChange(e.target.value)}
              className="w-full appearance-none pl-3.5 pr-8 py-2.5 rounded-[10px] bg-white outline outline-1 outline-[#E5E3DE] text-[13px] text-[#1B1A18] font-medium shadow-xs focus:outline-[#1B1A18] cursor-pointer"
            >
              {markets.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
            <CaretDown
              size={13}
              weight="bold"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C8B85] pointer-events-none"
            />
          </div>
        </div>

        {/* Harga Pedagang */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-[13px] font-semibold text-[#1B1A18]">
              Harga yang Ditawarkan Pedagang (Rp)
            </label>
            {normalizedPricePerKg > 0 && (
              <span className="text-[12px] font-medium text-[#78716C] tabular-nums">
                ≈ Rp {normalizedPricePerKg.toLocaleString('id-ID')}/kg
              </span>
            )}
          </div>
          <input
            type="text"
            value={rawPriceInput}
            onChange={(e) => onPriceInputChange(e.target.value)}
            placeholder="Rp 15.000"
            className="w-full px-3.5 py-2.5 rounded-[10px] bg-white outline outline-1 outline-[#E5E3DE] text-[14px] text-[#1B1A18] font-bold shadow-xs focus:outline-[#1B1A18]"
          />
        </div>

        {/* Action Button */}
        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full py-3 px-5 rounded-[10px] bg-[#1B1A18] text-white text-[13px] font-semibold hover:bg-black active:translate-y-[1px] shadow-xs transition-all disabled:opacity-50"
        >
          {loading ? 'Menghitung Validasi...' : 'Cek Kewajaran Harga Sekarang'}
        </button>

        <p className="text-[11px] text-[#8E8D86] text-center leading-[16px] pt-1">
          Tanpa daftar akun. Seluruh takaran otomatis dinormalisasi ke satuan acuan standar (Rp/kg, Rp/liter).
        </p>
      </form>
    </div>
  );
}
