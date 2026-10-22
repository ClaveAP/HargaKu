'use client';

import Link from 'next/link';

interface Props {
  commodityName: string;
}

export function CommodityBreadcrumb({ commodityName }: Props) {
  return (
    <nav className="flex items-center gap-2 text-[13px] text-[#6E6D67]">
      <Link href="/dashboard" className="hover:text-[#1B1A18] transition-colors">
        Harga
      </Link>
      <span className="text-[#A8A29E] font-bold">›</span>
      <Link href="/dashboard" className="hover:text-[#1B1A18] transition-colors">
        Detail Komoditas
      </Link>
      <span className="text-[#A8A29E] font-bold">›</span>
      <span className="font-semibold text-[#1B1A18]">{commodityName}</span>
    </nav>
  );
}
