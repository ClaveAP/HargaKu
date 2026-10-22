'use client';

import { Info } from '@phosphor-icons/react';

export function StatusLegendCard() {
  return (
    <div className="w-full rounded-[16px] bg-white outline outline-1 outline-[#E5E3DE] p-5 sm:p-6 flex flex-col gap-4 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <span className="text-[13px] font-semibold text-[#1B1A18]">
          Indikator Status Harga Terhadap Acuan Resmi:
        </span>

        {/* 4 Status Badges Row */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center text-[11px] font-bold px-2.5 py-1 rounded-[4px] bg-[#F4F3F0] text-[#1B1A18] outline outline-1 outline-[#E5E3DE]">
            Wajar (Sesuai HAP ±5%)
          </span>

          <span className="inline-flex items-center text-[11px] font-bold px-2.5 py-1 rounded-[4px] bg-[#FEF3C7] text-[#92400E] outline outline-1 outline-[#FDE68A]">
            Agak Mahal (+5% s/d +15%)
          </span>

          <span className="inline-flex items-center text-[11px] font-bold px-2.5 py-1 rounded-[4px] bg-[#FEE2E2] text-[#991B1B] outline outline-1 outline-[#FECACA]">
            Terlalu Mahal (&gt; +15%)
          </span>

          <span className="inline-flex items-center text-[11px] font-bold px-2.5 py-1 rounded-[4px] bg-[#EEF773] text-[#1B1A18] outline outline-1 outline-[#1B1A18]">
            Murah (&gt; -10% Rerata)
          </span>
        </div>
      </div>

      <div className="pt-3 border-t border-[#E5E3DE] flex items-start gap-2.5">
        <Info size={16} weight="bold" className="text-[#8C8B85] shrink-0 mt-0.5" />
        <p className="text-[12px] text-[#6E6D67] leading-[18px]">
          Status dihitung berjenjang: <span className="font-medium text-[#1B1A18]">Laporan Warga Lapak → PIHPS Kota Bogor → Panel Harga Bapanas</span>.
          Indikator ini merupakan alat bantu keputusan belanja warga, bukan instrumen penentu harga lapak pedagang.
          Klik kartu komoditas untuk rincian tren historis dan perbandingan antar pasar.
        </p>
      </div>
    </div>
  );
}
