'use client';

import { Clock } from '@phosphor-icons/react';
import { useRegion } from '@/lib/store/region-store';

interface Props {
  lastUpdatedText?: string;
}

export function DashboardHeader({
  lastUpdatedText = '22 Okt 2026, 06:00 WIB',
}: Props) {
  const { selectedRegion } = useRegion();

  return (
    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2">
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-[#FF7714] uppercase tracking-wider">
            Pantauan Pangan Harian · {selectedRegion.name} ({selectedRegion.islandName})
          </span>
        </div>

        <h1 className="text-[32px] sm:text-[40px] font-medium text-[#1B1A18] leading-[1.12] tracking-tight">
          Harga Pangan {selectedRegion.name}
        </h1>

        <p className="text-[14px] sm:text-[15px] text-[#6E6D67] max-w-[620px] leading-[1.5]">
          Cek tren harga pangan sebelum melangkah belanja. Dikalibrasi dari standar acuan nasional Bapanas dan survei harian pasar lokal {selectedRegion.name}.
        </p>
      </div>

      {/* Tactile Live Update Pill */}
      <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white outline outline-1 outline-[#E5E3DE] text-[12px] font-medium text-[#1B1A18] shadow-xs w-fit shrink-0">
        <Clock size={14} weight="bold" className="text-[#6E6D67]" />
        <span>Diperbarui: {lastUpdatedText}</span>
      </div>
    </div>
  );
}
