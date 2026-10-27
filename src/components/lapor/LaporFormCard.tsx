'use client';

import { useState, useId } from 'react';
import {
  CaretDown,
  UploadSimple,
  Check,
  X,
  FileText,
  CalendarBlank,
} from '@phosphor-icons/react';
import { CommoditySummary, Market } from '@/types';
import { formatRupiah } from '@/lib/utils';

export interface TakaranUnitOption {
  label: string;
  ratioToKg: number;
}

export const TAKARAN_UNITS: TakaranUnitOption[] = [
  { label: '1 kg', ratioToKg: 1.0 },
  { label: '1/2 kg', ratioToKg: 0.5 },
  { label: '1/4 kg (2.5 ons)', ratioToKg: 0.25 },
  { label: '1 ons (100g)', ratioToKg: 0.1 },
  { label: '1 liter', ratioToKg: 1.0 },
  { label: '1 ikat / butir', ratioToKg: 1.0 },
];

interface Props {
  commodities: CommoditySummary[];
  markets: Market[];
  isSubmitting: boolean;
  onSubmit: (data: {
    commodityId: string;
    marketId: string;
    price: number;
    unit: string;
    normalizedPrice: number;
    purchaseDate: string;
    photoFile: File | null;
    notes: string;
  }) => void;
}

export function LaporFormCard({
  commodities,
  markets,
  isSubmitting,
  onSubmit,
}: Props) {
  const [selectedCommodityId, setSelectedCommodityId] = useState(
    commodities[0]?.id || 'cabai-rawit-merah'
  );
  const [selectedMarketId, setSelectedMarketId] = useState(
    markets[0]?.id || 'mkt_pasar_anyar'
  );
  const [priceInput, setPriceInput] = useState<string>('15000');
  const [selectedUnit, setSelectedUnit] = useState<TakaranUnitOption>(
    TAKARAN_UNITS[2] // 1/4 kg
  );
  const [purchaseDate, setPurchaseDate] = useState<'today' | 'yesterday'>('today');
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [notes, setNotes] = useState<string>('');
  const [hasAgreedEthics, setHasAgreedEthics] = useState<boolean>(true);
  const fileInputId = useId();

  // Price calculations
  const rawPrice = parseInt(priceInput.replace(/\D/g, ''), 10) || 0;
  const normalizedPrice = Math.round(rawPrice / selectedUnit.ratioToKg);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rawPrice <= 0 || !hasAgreedEthics) return;

    onSubmit({
      commodityId: selectedCommodityId,
      marketId: selectedMarketId,
      price: rawPrice,
      unit: selectedUnit.label,
      normalizedPrice,
      purchaseDate: purchaseDate === 'today' ? 'Hari ini' : 'Kemarin',
      photoFile,
      notes,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-[24px] outline outline-1 outline-[#E5E3DE] p-5 sm:p-7 shadow-xs flex flex-col gap-5"
    >
      <div className="flex items-center justify-between pb-2 border-b border-[#E5E3DE]">
        <h2 className="text-[17px] font-bold text-[#1B1A18] tracking-tight">
          Formulir Laporan Lapak
        </h2>
        <span className="text-[11px] font-semibold text-[#8E8D86] bg-[#FAF9F5] px-2.5 py-0.5 rounded-full outline outline-1 outline-[#E5E3DE]">
          Anonim & Terproteksi
        </span>
      </div>

      {/* Grid: Commodity & Market */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Commodity */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-semibold text-[#1B1A18]">
            Komoditas Pangan
          </label>
          <div className="relative">
            <select
              value={selectedCommodityId}
              onChange={(e) => setSelectedCommodityId(e.target.value)}
              className="w-full appearance-none pl-3.5 pr-8 py-2.5 rounded-[10px] bg-white outline outline-1 outline-[#E5E3DE] text-[13px] text-[#1B1A18] font-medium shadow-xs focus:outline-[#1B1A18] cursor-pointer"
            >
              {commodities.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
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

        {/* Market */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-semibold text-[#1B1A18]">
            Pasar Tradisional
          </label>
          <div className="relative">
            <select
              value={selectedMarketId}
              onChange={(e) => setSelectedMarketId(e.target.value)}
              className="w-full appearance-none pl-3.5 pr-8 py-2.5 rounded-[10px] bg-white outline outline-1 outline-[#E5E3DE] text-[13px] text-[#1B1A18] font-medium shadow-xs focus:outline-[#1B1A18] cursor-pointer"
            >
              {markets.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.district})
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

      {/* Unit Takaran Chips */}
      <div className="flex flex-col gap-2">
        <label className="text-[12px] font-semibold text-[#1B1A18]">
          Satuan Takaran Lapak
        </label>
        <div className="flex flex-wrap gap-2">
          {TAKARAN_UNITS.map((unit) => {
            const isSelected = selectedUnit.label === unit.label;
            return (
              <button
                key={unit.label}
                type="button"
                onClick={() => setSelectedUnit(unit)}
                className={`py-1.5 px-3 rounded-[8px] text-[12px] font-medium transition-all outline outline-1 ${
                  isSelected
                    ? 'bg-[#1B1A18] text-white outline-[#1B1A18] shadow-xs'
                    : 'bg-[#FAF9F5] text-[#1B1A18] outline-[#E5E3DE] hover:bg-white'
                }`}
              >
                {unit.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Input & Live Normalization */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
        <div className="sm:col-span-7 flex flex-col gap-1.5">
          <label className="text-[12px] font-semibold text-[#1B1A18]">
            Nominal yang Kamu Bayar
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[13px] font-bold text-[#8C8B85]">
              Rp
            </span>
            <input
              type="text"
              value={rawPrice > 0 ? rawPrice.toLocaleString('id-ID') : ''}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '');
                setPriceInput(val);
              }}
              placeholder="15.000"
              className="w-full pl-10 pr-4 py-2.5 rounded-[10px] bg-white outline outline-1 outline-[#E5E3DE] text-[15px] font-bold text-[#1B1A18] tabular-nums shadow-xs focus:outline-[#1B1A18]"
            />
          </div>
        </div>

        {/* Normalization Callout */}
        <div className="sm:col-span-5 p-3 rounded-[12px] bg-[#FAF9F5] outline outline-1 outline-[#E5E3DE] flex flex-col justify-center">
          <span className="text-[10px] font-semibold text-[#8E8D86] uppercase tracking-wider">
            Konversi Standar TPID
          </span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-[16px] font-bold text-[#1B1A18] tabular-nums">
              {formatRupiah(normalizedPrice)}
            </span>
            <span className="text-[11px] text-[#6E6D67]">/ kg</span>
          </div>
        </div>
      </div>

      {/* Tanggal Transaksi */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[12px] font-semibold text-[#1B1A18]">
          Waktu Pembelian
        </label>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setPurchaseDate('today')}
            className={`py-2 px-3.5 rounded-[8px] text-[12px] font-medium outline outline-1 flex items-center gap-1.5 transition-colors ${
              purchaseDate === 'today'
                ? 'bg-[#1B1A18] text-white outline-[#1B1A18]'
                : 'bg-[#FAF9F5] text-[#1B1A18] outline-[#E5E3DE]'
            }`}
          >
            <CalendarBlank size={14} weight="bold" />
            <span>Hari Ini</span>
          </button>
          <button
            type="button"
            onClick={() => setPurchaseDate('yesterday')}
            className={`py-2 px-3.5 rounded-[8px] text-[12px] font-medium outline outline-1 flex items-center gap-1.5 transition-colors ${
              purchaseDate === 'yesterday'
                ? 'bg-[#1B1A18] text-white outline-[#1B1A18]'
                : 'bg-[#FAF9F5] text-[#1B1A18] outline-[#E5E3DE]'
            }`}
          >
            <CalendarBlank size={14} weight="bold" />
            <span>Kemarin</span>
          </button>
        </div>
      </div>

      {/* Upload Bukti Foto */}
      <div className="flex flex-col gap-2">
        <label className="text-[12px] font-semibold text-[#1B1A18]">
          Foto Bukti Nota / Timbangan <span className="font-normal text-[#8E8D86]">(Opsional)</span>
        </label>

        {photoFile ? (
          <div className="p-3 rounded-[12px] bg-[#FAF9F5] outline outline-1 outline-[#E5E3DE] flex items-center justify-between">
            <div className="flex items-center gap-2 text-[12px] text-[#1B1A18] font-medium truncate">
              <FileText size={18} weight="bold" className="text-[#8E8D86] shrink-0" />
              <span className="truncate">{photoFile.name}</span>
              <span className="text-[10px] text-[#8E8D86]">({Math.round(photoFile.size / 1024)} KB)</span>
            </div>
            <button
              type="button"
              onClick={() => setPhotoFile(null)}
              className="p-1 rounded text-[#8E8D86] hover:text-[#991B1B]"
            >
              <X size={16} weight="bold" />
            </button>
          </div>
        ) : (
          <label
            htmlFor={fileInputId}
            className="border-2 border-dashed border-[#E5E3DE] hover:border-[#1B1A18] bg-[#FAF9F5] hover:bg-white rounded-[14px] p-5 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors text-center"
          >
            <UploadSimple size={24} weight="bold" className="text-[#8E8D86]" />
            <div className="flex flex-col gap-0.5">
              <span className="text-[13px] font-semibold text-[#1B1A18]">
                Unggah foto struk atau papan harga lapak
              </span>
              <span className="text-[11px] text-[#8E8D86]">
                JPG, PNG, atau WebP hingga 5MB. Koordinat GPS langsung distrip otomatis.
              </span>
            </div>
            <input
              id={fileInputId}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setPhotoFile(e.target.files[0]);
                }
              }}
              className="hidden"
            />
          </label>
        )}
      </div>

      {/* Catatan Tambahan */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[12px] font-semibold text-[#1B1A18]">
          Catatan Tambahan <span className="font-normal text-[#8E8D86]">(Opsional, maks 200 karakter)</span>
        </label>
        <textarea
          rows={2}
          maxLength={200}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Contoh: Kualitas segar baru datang dari Pasar Induk TU Kemang."
          className="w-full px-3.5 py-2.5 rounded-[10px] bg-white outline outline-1 outline-[#E5E3DE] text-[13px] text-[#1B1A18] placeholder-[#8E8D86] shadow-xs focus:outline-[#1B1A18]"
        />
      </div>

      {/* Ethics Checkbox */}
      <label className="flex items-start gap-2.5 cursor-pointer pt-1">
        <input
          type="checkbox"
          checked={hasAgreedEthics}
          onChange={(e) => setHasAgreedEthics(e.target.checked)}
          className="mt-0.5 rounded text-[#1B1A18] focus:ring-0 cursor-pointer"
        />
        <span className="text-[11px] text-[#6E6D67] leading-relaxed">
          Saya menyatakan data ini benar sesuai transaksi nyata dan tidak bertujuan mencemarkan nama baik pedagang lapak individu.
        </span>
      </label>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting || rawPrice <= 0 || !hasAgreedEthics}
        className="w-full py-3.5 px-6 rounded-[12px] bg-[#EEF773] hover:bg-[#E5EE65] outline outline-2 outline-[#1B1A18] text-[#1B1A18] font-bold text-[14px] flex items-center justify-center gap-2 shadow-[2px_2px_0px_#1B1A18] active:translate-x-[1px] active:translate-y-[1px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <span>Memverifikasi & Mengirim...</span>
        ) : (
          <span>Kirim Laporan Sekarang</span>
        )}
      </button>
    </form>
  );
}
