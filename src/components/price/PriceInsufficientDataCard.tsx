'use client';

import Link from 'next/link';
import { WarningCircle, MegaphoneSimple } from '@phosphor-icons/react';

export function PriceInsufficientDataCard() {
  return (
    <div className="bg-white rounded-[18px] outline outline-1 outline-[#E5E3DE] p-6 sm:p-7 shadow-xs flex flex-col justify-between gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1.5">
          <WarningCircle size={14} weight="bold" className="text-[#8C8B85]" />
          <span className="text-[10px] font-bold text-[#78716C] uppercase tracking-wider">
            Edge Case State
          </span>
        </div>

        <h3 className="text-[15px] font-bold text-[#1B1A18] tracking-tight">
          State: Data Belum Cukup
        </h3>

        <p className="text-[12px] text-[#6E6D67] leading-[19px]">
          Belum ada data pembanding yang cukup untuk komoditas dan pasar ini. HargaKu tidak
          pernah menebak-nebak angka harga. Bantu laporkan harga lapak yang Anda terima untuk
          melengkapi referensi bersama sesama warga Bogor.
        </p>
      </div>

      <div className="pt-2">
        <Link
          href="/lapor"
          className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-[8px] bg-[#FF7714] text-white text-[12px] font-semibold hover:bg-[#B53D0A] shadow-xs transition-colors"
        >
          <MegaphoneSimple size={14} weight="bold" />
          <span>Bantu Lapor Harga Lapak</span>
        </Link>
      </div>
    </div>
  );
}
