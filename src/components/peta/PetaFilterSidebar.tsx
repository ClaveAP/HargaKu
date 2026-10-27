'use client';

import { CommoditySummary } from '@/types';
import { CaretDown, Table, SquaresFour } from '@phosphor-icons/react';

interface Props {
  commodities: CommoditySummary[];
  selectedCommodityId: string;
  onCommodityChange: (id: string) => void;
  isLightMode: boolean;
  onToggleLightMode: () => void;
}

export function PetaFilterSidebar({
  commodities,
  selectedCommodityId,
  onCommodityChange,
  isLightMode,
  onToggleLightMode,
}: Props) {
  return (
    <div className="bg-white rounded-[18px] outline outline-1 outline-[#E5E3DE] p-5 sm:p-6 shadow-xs flex flex-col justify-between gap-6">
      <div className="flex flex-col gap-5">
        <h3 className="text-[16px] font-bold text-[#1B1A18] tracking-tight">
          Filter Pantauan
        </h3>

        {/* Komoditas Pilihan */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-semibold text-[#1B1A18]">
            Komoditas Pilihan
          </label>
          <div className="relative">
            <select
              value={selectedCommodityId}
              onChange={(e) => onCommodityChange(e.target.value)}
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

        {/* Kategori Indeks Relatif Legend */}
        <div className="flex flex-col gap-2 pt-2 border-t border-[#E5E3DE]">
          <span className="text-[12px] font-bold text-[#1B1A18]">
            Kategori Indeks Relatif
          </span>

          <div className="flex flex-col gap-2.5 text-[12px]">
            {/* Murah */}
            <div className="flex items-start gap-2.5">
              <span className="w-3 h-3 rounded-full bg-[#EEF773] outline outline-1 outline-[#1B1A18] shrink-0 mt-0.5" />
              <div className="flex flex-col">
                <span className="font-semibold text-[#1B1A18]">
                  Lebih murah dari rerata kota
                </span>
                <span className="text-[11px] text-[#8E8D86]">
                  Pasar Sukasari
                </span>
              </div>
            </div>

            {/* Rerata */}
            <div className="flex items-start gap-2.5">
              <span className="w-3 h-3 rounded-full bg-[#F4F3F0] outline outline-1 outline-[#E5E3DE] shrink-0 mt-0.5" />
              <div className="flex flex-col">
                <span className="font-semibold text-[#1B1A18]">
                  Sekitar rata-rata kota
                </span>
                <span className="text-[11px] text-[#8E8D86]">
                  Pasar Gn. Batu, Pasar Jambu Dua
                </span>
              </div>
            </div>

            {/* Mahal */}
            <div className="flex items-start gap-2.5">
              <span className="w-3 h-3 rounded-full bg-[#FEE2E2] outline outline-1 outline-[#FECACA] shrink-0 mt-0.5" />
              <div className="flex flex-col">
                <span className="font-semibold text-[#1B1A18]">
                  Lebih mahal dari rerata kota
                </span>
                <span className="text-[11px] text-[#8E8D86]">
                  Pasar Anyar, Kebon Kembang
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mode Ringan Toggle Button */}
      <button
        type="button"
        onClick={onToggleLightMode}
        className={`w-full py-2.5 px-4 rounded-[10px] outline outline-1 text-[12px] font-semibold flex items-center justify-center gap-2 transition-all ${
          isLightMode
            ? 'bg-[#1B1A18] text-white outline-[#1B1A18] shadow-xs'
            : 'bg-[#FAF9F5] text-[#1B1A18] outline-[#E5E3DE] hover:bg-white'
        }`}
      >
        {isLightMode ? (
          <>
            <SquaresFour size={15} weight="bold" />
            <span>Tampilkan Peta Visual</span>
          </>
        ) : (
          <>
            <Table size={15} weight="bold" />
            <span>Mode Ringan (Tabel Langsung)</span>
          </>
        )}
      </button>
    </div>
  );
}
