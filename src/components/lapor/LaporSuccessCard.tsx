'use client';

import Link from 'next/link';
import {
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Clock,
  PlusCircle,
} from '@phosphor-icons/react';
import { formatRupiah } from '@/lib/utils';

interface Props {
  reportId: string;
  commodityName: string;
  marketName: string;
  pricePerUnit: number;
  unitLabel: string;
  normalizedPricePerKg: number;
  hasPhoto: boolean;
  onReset: () => void;
}

export function LaporSuccessCard({
  reportId,
  commodityName,
  marketName,
  pricePerUnit,
  unitLabel,
  normalizedPricePerKg,
  hasPhoto,
  onReset,
}: Props) {
  return (
    <div className="bg-white rounded-[24px] outline outline-1 outline-[#E5E3DE] p-6 sm:p-8 shadow-xs flex flex-col gap-6 animate-in fade-in duration-200">
      <div className="flex flex-col items-center text-center gap-3 py-2">
        <div className="w-14 h-14 rounded-full bg-[#EEF773] outline outline-2 outline-[#1B1A18] flex items-center justify-center text-[#1B1A18] shadow-sm">
          <CheckCircle size={32} weight="fill" />
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-bold text-[#FF7714] uppercase tracking-wider">
            Laporan Tersimpan
          </span>
          <h2 className="text-[24px] sm:text-[28px] font-bold text-[#1B1A18] tracking-tight">
            Terima Kasih Atas Kontribusimu!
          </h2>
          <p className="text-[13px] sm:text-[14px] text-[#6E6D67] max-w-[520px]">
            Data harga lapakmu telah dicatat dan masuk ke antrean verifikasi konsensus TPID &amp; Pemantau Pasar.
          </p>
        </div>
      </div>

      {/* Structured Ledger Card */}
      <div className="bg-[#FAF9F5] rounded-[16px] outline outline-1 outline-[#E5E3DE] p-5 flex flex-col gap-3 text-[13px]">
        <div className="flex items-center justify-between pb-3 border-b border-[#E5E3DE]">
          <span className="text-[#8E8D86] font-medium">Nomor Laporan</span>
          <span className="font-bold text-[#1B1A18] font-mono">{reportId}</span>
        </div>

        <div className="flex items-center justify-between pb-3 border-b border-[#E5E3DE]">
          <span className="text-[#8E8D86] font-medium">Komoditas & Pasar</span>
          <div className="text-right">
            <span className="font-bold text-[#1B1A18] block">{commodityName}</span>
            <span className="text-[11px] text-[#6E6D67]">{marketName}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pb-3 border-b border-[#E5E3DE]">
          <span className="text-[#8E8D86] font-medium">Harga Transaksi</span>
          <div className="text-right">
            <span className="font-bold text-[#1B1A18] block">
              {formatRupiah(pricePerUnit)} / {unitLabel}
            </span>
            <span className="text-[11px] text-[#8E8D86] font-mono">
              ≈ {formatRupiah(normalizedPricePerKg)} / kg
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pb-3 border-b border-[#E5E3DE]">
          <span className="text-[#8E8D86] font-medium">Bukti Foto</span>
          <span className="font-semibold text-[#1B1A18] flex items-center gap-1.5">
            <ShieldCheck size={16} weight="bold" className="text-[#15803D]" />
            <span>{hasPhoto ? 'Terunggah (EXIF Sanitized)' : 'Tanpa Foto (Pernyataan Riil)'}</span>
          </span>
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="text-[#8E8D86] font-medium">Status Validasi</span>
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FAF9F5] text-[#1B1A18] outline outline-1 outline-[#E5E3DE] flex items-center gap-1">
            <Clock size={12} weight="bold" />
            <span>Menunggu Moderasi (&lt; 30 menit)</span>
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
        <button
          type="button"
          onClick={onReset}
          className="w-full sm:w-auto flex-1 py-3 px-5 rounded-[12px] bg-[#FAF9F5] outline outline-1 outline-[#E5E3DE] hover:bg-white text-[13px] font-semibold text-[#1B1A18] flex items-center justify-center gap-2 transition-colors shadow-xs"
        >
          <PlusCircle size={16} weight="bold" />
          <span>Lapor Komoditas Lain</span>
        </button>

        <Link
          href="/peta"
          className="w-full sm:w-auto flex-1 py-3 px-5 rounded-[12px] bg-[#1B1A18] hover:bg-[#32312E] text-white text-[13px] font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs"
        >
          <MapPin size={16} weight="bold" />
          <span>Cek Peta Persebaran Pasar</span>
        </Link>
      </div>
    </div>
  );
}
