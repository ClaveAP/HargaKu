'use client';

import { Question } from '@phosphor-icons/react';

export function PriceMethodologyCard() {
  return (
    <div className="bg-white rounded-[18px] outline outline-1 outline-[#E5E3DE] p-6 sm:p-7 shadow-xs flex flex-col justify-between gap-5">
      <div className="flex items-center gap-2">
        <Question size={18} weight="bold" className="text-[#FF7714]" />
        <h3 className="text-[16px] font-bold text-[#1B1A18] tracking-tight">
          Bagaimana Status Kewajaran Dihitung?
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-[12px]">
        {/* Wajar */}
        <div className="flex flex-col gap-1 p-3 rounded-[10px] bg-[#FAF9F5] outline outline-1 outline-[#E5E3DE]/70">
          <span className="inline-block text-[11px] font-bold px-2 py-0.5 rounded-[4px] bg-[#F4F3F0] text-[#1B1A18] outline outline-1 outline-[#E5E3DE] w-fit">
            Wajar
          </span>
          <span className="text-[#6E6D67] leading-[18px]">
            Dalam rentang ±10% dari harga pembanding pasar saat ini.
          </span>
        </div>

        {/* Agak Mahal */}
        <div className="flex flex-col gap-1 p-3 rounded-[10px] bg-[#FAF9F5] outline outline-1 outline-[#E5E3DE]/70">
          <span className="inline-block text-[11px] font-bold px-2 py-0.5 rounded-[4px] bg-[#FEF3C7] text-[#92400E] outline outline-1 outline-[#FDE68A] w-fit">
            Agak Mahal
          </span>
          <span className="text-[#6E6D67] leading-[18px]">
            +10% sampai +25% di atas rata-rata pembanding pasar.
          </span>
        </div>

        {/* Terlalu Mahal */}
        <div className="flex flex-col gap-1 p-3 rounded-[10px] bg-[#FAF9F5] outline outline-1 outline-[#E5E3DE]/70">
          <span className="inline-block text-[11px] font-bold px-2 py-0.5 rounded-[4px] bg-[#FEE2E2] text-[#991B1B] outline outline-1 outline-[#FECACA] w-fit">
            Terlalu Mahal
          </span>
          <span className="text-[#6E6D67] leading-[18px]">
            Di atas +25% dari acuan rata-rata harga pasar saat ini.
          </span>
        </div>

        {/* Jauh Lebih Murah */}
        <div className="flex flex-col gap-1 p-3 rounded-[10px] bg-[#FAF9F5] outline outline-1 outline-[#E5E3DE]/70">
          <span className="inline-block text-[11px] font-bold px-2 py-0.5 rounded-[4px] bg-[#EEF773] text-[#1B1A18] outline outline-1 outline-[#1B1A18] w-fit">
            Jauh Lebih Murah
          </span>
          <span className="text-[#6E6D67] leading-[18px]">
            Di bawah -15% (cek kualitas bahan, kesegaran, &amp; anak timbangan).
          </span>
        </div>
      </div>

      <p className="text-[11px] text-[#8E8D86] leading-[16px] pt-1 border-t border-[#E5E3DE]">
        <strong className="text-[#1B1A18] font-semibold">Hirarki sumber pembanding:</strong> Laporan Warga Lapak (≥3 laporan, 7 hari) → Rerata Survei Pasar Resmi Daerah (PIHPS) → Standarisasi Nasional HAP/HET Bapanas (Zonasi Wilayah).
      </p>
    </div>
  );
}
