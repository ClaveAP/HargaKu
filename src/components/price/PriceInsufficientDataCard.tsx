'use client';

import Link from 'next/link';
import { WarningCircle, MegaphoneSimple } from '@phosphor-icons/react';

interface Props {
  commodityName?: string;
  marketName?: string;
}

export function PriceInsufficientDataCard({ commodityName, marketName }: Props) {
  return (
    <div className="bg-white rounded-[18px] outline outline-1 outline-[#E5E3DE] p-6 sm:p-7 shadow-xs flex flex-col justify-between gap-4">
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center gap-1.5">
          <WarningCircle size={14} weight="bold" className="text-[#8C8B85]" />
          <span className="text-[10px] font-bold text-[#78716C] uppercase tracking-wider">
            Data Belum Cukup
          </span>
        </div>

        <h3 className="text-[18px] font-bold text-[#1B1A18] tracking-tight">
          Belum Ada Data Acuan
        </h3>

        <p className="text-[13px] text-[#6E6D67] leading-[20px]">
          Belum ada data pembanding resmi yang cukup untuk{' '}
          {commodityName ? <strong className="text-[#1B1A18]">{commodityName}</strong> : 'komoditas ini'}
          {marketName ? <> di <strong className="text-[#1B1A18]">{marketName}</strong></> : ''}.{' '}
          HargaKu tidak pernah mengarang angka harga. Jadilah yang pertama melaporkan harga riil lapak untuk melengkapi data bersama warga.
        </p>
      </div>

      <div className="pt-2">
        <Link
          href={`/lapor${commodityName ? `?commodity=${encodeURIComponent(commodityName)}` : ''}`}
          className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-[8px] bg-[#FF7714] text-white text-[12px] font-semibold hover:bg-[#B53D0A] shadow-xs transition-colors"
        >
          <MegaphoneSimple size={14} weight="bold" />
          <span>Lapor Harga Lapak Pertama</span>
        </Link>
      </div>
    </div>
  );
}
