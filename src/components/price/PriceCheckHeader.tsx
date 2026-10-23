'use client';

import { useRegion } from '@/lib/store/region-store';

export function PriceCheckHeader() {
  const { selectedRegion } = useRegion();

  return (
    <div className="flex flex-col gap-2.5 pb-2">
      <div className="flex items-center gap-2">
        <span className="text-[11px] font-bold text-[#FF7714] uppercase tracking-wider">
          Deteksi Mark-up &amp; Validasi Belanja · {selectedRegion.name} ({selectedRegion.islandName}{selectedRegion.logisticsCostPct > 0 ? ` +${selectedRegion.logisticsCostPct}%` : ''})
        </span>
      </div>

      <h1 className="text-[32px] sm:text-[40px] font-medium text-[#1B1A18] leading-[1.12] tracking-tight">
        Cek Harga Wajar &amp; Deteksi Mark-up
      </h1>

      <p className="text-[14px] sm:text-[15px] text-[#6E6D67] max-w-[720px] leading-[1.5]">
        Tameng belanja pangan cerdas. Cek acuan resmi sebelum ke pasar atau masukkan harga yang ditawarkan pedagang di lapak—sistem langsung memvalidasi kewajaran harga dan mendeteksi mark-up sepihak secara objektif.
      </p>
    </div>
  );
}
