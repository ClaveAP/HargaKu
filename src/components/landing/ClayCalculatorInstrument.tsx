'use client';

import { useState } from 'react';
import { formatRupiah } from '@/lib/price-logic';

export interface TakaranOption {
  id: string;
  label: string;
  weightGrams: number;
  multiplier: number;
}

const TAKARAN_OPTIONS: TakaranOption[] = [
  { id: 'ons', label: '1 Ons (100g)', weightGrams: 100, multiplier: 10 },
  { id: 'quarter', label: '1/4 Kg (250g)', weightGrams: 250, multiplier: 4 },
  { id: 'half', label: '1/2 Kg (500g)', weightGrams: 500, multiplier: 2 },
  { id: 'kilo', label: '1 Kg (1000g)', weightGrams: 1000, multiplier: 1 },
];

interface Props {
  commodityName: string;
  averagePricePerKg: number;
}

export function ClayCalculatorInstrument({
  commodityName,
  averagePricePerKg,
}: Props) {
  const [selectedTakaran, setSelectedTakaran] = useState<TakaranOption>(
    TAKARAN_OPTIONS[1] // default 1/4 kg
  );
  const [rawInputPrice, setRawInputPrice] = useState<number>(12000);

  const pricePerKg = rawInputPrice * selectedTakaran.multiplier;
  const deviationPercent =
    ((pricePerKg - averagePricePerKg) / averagePricePerKg) * 100;

  const isCheaper = deviationPercent < -1;
  const isFair = deviationPercent >= -10 && deviationPercent <= 10;
  const isExpensive = deviationPercent > 10;

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="space-y-1">
        <h3 className="text-[16px] font-medium text-[#1B1A18]">
          Kalkulator Takaran Pasar
        </h3>
        <p className="text-[13px] text-[#6E6D67] leading-relaxed">
          Masukkan harga penawaran pedagang dalam satuan apapun untuk konversi
          otomatis ke Rp/kg:
        </p>
      </div>

      {/* Input Nominal Row */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="w-[220px] flex items-center justify-between p-[10px_16px] bg-[#FAF9F5] outline outline-[1.5px] outline-[#1B1A18] -outline-offset-[0.75px] rounded-[8px]">
          <input
            type="number"
            min={1000}
            step={500}
            value={rawInputPrice}
            onChange={(e) => setRawInputPrice(Number(e.target.value) || 0)}
            className="w-full font-bold text-[20px] text-[#1B1A18] bg-transparent outline-none tabular-nums"
          />
          <span className="text-[11px] font-semibold text-[#8C8B85] tracking-wider ml-2">
            IDR
          </span>
        </div>
        <span className="text-[13px] text-[#6E6D67]">untuk takaran:</span>
      </div>

      {/* Takaran Chips */}
      <div className="flex flex-wrap gap-2">
        {TAKARAN_OPTIONS.map((opt) => {
          const isActive = selectedTakaran.id === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => setSelectedTakaran(opt)}
              className={`px-3 py-1.5 rounded-[8px] text-[12px] transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#FFF3ED] text-[#FF7714] outline outline-[1.5px] outline-[#FF7714] -outline-offset-[0.75px] font-semibold shadow-xs'
                  : 'bg-white text-[#6E6D67] font-medium outline outline-1 outline-[#E5E3DE] -outline-offset-1 hover:text-[#1B1A18] hover:bg-[#FAF9F5]'
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      {/* Result Box (Clean Clay Neutral & Signature Lime) */}
      <div
        className={`w-full p-[18px] rounded-[12px] flex flex-col gap-2.5 transition-all ${
          isExpensive
            ? 'bg-[#FFF8F7] outline outline-1 outline-[#FCDAD7]'
            : 'bg-[#FAF9F5] outline outline-1 outline-[#E5E3DE]'
        }`}
      >
        <div className="w-full flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span
              className={`text-[26px] font-bold tabular-nums ${
                isExpensive ? 'text-[#991B1B]' : 'text-[#1B1A18]'
              }`}
            >
              {formatRupiah(pricePerKg)}
            </span>
            <span className="text-[13px] font-medium text-[#6E6D67]">
              / kg
            </span>
          </div>

          <div
            className={`flex items-center px-2.5 py-1 rounded-[6px] text-[11px] font-semibold tracking-wide ${
              isExpensive
                ? 'bg-[#FEF2F2] text-[#991B1B] outline outline-1 outline-[#FECACA]'
                : isCheaper
                ? 'bg-[#EEF773] text-[#1B1A18] outline outline-1 outline-[#1B1A18]/25'
                : 'bg-white text-[#1B1A18] outline outline-1 outline-[#E5E3DE]'
            }`}
          >
            <span>
              {isExpensive
                ? 'HARGA LEBIH TINGGI'
                : isCheaper
                ? 'HARGA WAJAR & HEMAT'
                : 'HARGA WAJAR'}
            </span>
          </div>
        </div>

        <p className="text-[12px] leading-[18px] text-[#6E6D67]">
          {deviationPercent < 0
            ? `${Math.abs(deviationPercent).toFixed(1)}% lebih hemat`
            : `${deviationPercent.toFixed(1)}% lebih tinggi`}{' '}
          dibanding harga rata-rata {commodityName} Kota Bogor (
          {formatRupiah(averagePricePerKg)}/kg). Penawaran ini mengacu pada pantauan harga lapak harian.
        </p>
      </div>
    </div>
  );
}
