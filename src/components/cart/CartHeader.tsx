'use client';

import { useRegion } from '@/lib/store/region-store';

export function CartHeader() {
  const { selectedRegion } = useRegion();

  return (
    <div className="flex flex-col gap-2 pb-2">
      <h1 className="text-[32px] sm:text-[40px] font-medium text-[#1B1A18] leading-[1.12] tracking-tight">
        Kalkulator &amp; Estimasi Keranjang Belanja
      </h1>

      <p className="text-[14px] sm:text-[15px] text-[#6E6D67] max-w-[700px] leading-[1.5]">
        Rencanakan kebutuhan pangan mingguan dari rumah. Sistem otomatis menghitung
        total estimasi belanja di pasar tradisional {selectedRegion.name} untuk menemukan rute paling hemat sebelum berangkat.
      </p>
    </div>
  );
}
