'use client';

import Link from 'next/link';
import {
  ArrowRight,
  MegaphoneSimple,
  ShieldCheck,
  Receipt,
  CheckCircle,
} from '@phosphor-icons/react';

export function ClayClosingCtaSection() {
  return (
    <section className="w-full bg-[#FAF9F5] py-20 px-4 sm:px-8 lg:px-12 border-b border-[#E5E3DE]/70">
      <div className="max-w-[1240px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left: Narrative & Action */}
        <div className="w-full lg:w-[54%] flex flex-col items-start gap-6">
          <h2 className="text-[32px] sm:text-[40px] lg:text-[44px] font-medium text-[#1B1A18] leading-[1.12] tracking-tight text-balance">
            Punya struk belanja atau info harga lapak pagi ini?
          </h2>

          <p className="text-[15px] sm:text-[16px] text-[#6E6D67] leading-[1.6] max-w-[540px]">
            Transparansi pangan terwujud karena warga saling berbagi fakta harga riil di lapangan.
            Kirimkan foto timbangan atau nominal yang Anda bayar di pasar tradisional wilayah Anda
            untuk membantu ribuan keluarga belanja lebih hemat.
          </p>

          {/* Privacy Guarantee Strip */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-[12px] text-[#6E6D67] pt-1">
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={16} weight="bold" className="text-[#1B1A18]" />
              <span>EXIF GPS Otomatis Dihapus</span>
            </div>
            <span className="hidden sm:inline text-[#8C8B85]">·</span>
            <div className="flex items-center gap-1.5">
              <CheckCircle size={16} weight="bold" className="text-[#1B1A18]" />
              <span>Privasi Nama Lapak Dilindungi</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <Link
              href="/lapor"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-[8px] bg-[#EEF773] text-[#1B1A18] outline outline-1 outline-[#1B1A18] text-[13px] font-semibold shadow-[0_2px_0_#1B1A18] hover:bg-[#dce663] active:translate-y-[1px] transition-all"
            >
              <MegaphoneSimple size={15} weight="bold" />
              <span>Laporkan Harga Pedagang</span>
            </Link>

            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-[8px] bg-white text-[#1B1A18] outline outline-1 outline-[#E5E3DE] text-[13px] font-medium hover:bg-[#F4F3F0] transition-colors"
            >
              <span>Buka Dashboard Pantauan</span>
              <ArrowRight size={14} weight="bold" />
            </Link>
          </div>
        </div>

        {/* Right: Authentic Verified Citizen Receipt Mockup */}
        <div className="w-full lg:w-[42%] max-w-[440px]">
          <div className="w-full bg-white outline outline-1 outline-[#E5E3DE] rounded-[20px] p-6 sm:p-7 shadow-xs flex flex-col gap-4">
            {/* Receipt Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E3DE]">
              <div className="flex items-center gap-2">
                <Receipt size={18} weight="bold" className="text-[#1B1A18]" />
                <span className="text-[12px] font-bold text-[#1B1A18] uppercase tracking-wider">
                  Bukti Laporan Warga
                </span>
              </div>
              <span className="px-2 py-0.5 rounded-[4px] bg-[#F4F3F0] text-[10px] font-semibold text-[#1B1A18] outline outline-1 outline-[#E5E3DE]">
                #BGR-2026-0891
              </span>
            </div>

            {/* Receipt Details */}
            <div className="flex flex-col gap-3 text-[13px]">
              <div className="flex justify-between items-baseline">
                <span className="text-[#6E6D67]">Lokasi Transaksi:</span>
                <span className="font-semibold text-[#1B1A18]">Pasar Kebon Kembang</span>
              </div>

              <div className="flex justify-between items-baseline">
                <span className="text-[#6E6D67]">Komoditas:</span>
                <span className="font-semibold text-[#1B1A18]">Cabai Merah Keriting</span>
              </div>

              <div className="flex justify-between items-baseline">
                <span className="text-[#6E6D67]">Takaran Dibeli:</span>
                <span className="text-[#1B1A18]">1/2 Kg (500 gram)</span>
              </div>

              <div className="flex justify-between items-baseline p-3 bg-[#FAF9F5] outline outline-1 outline-[#E5E3DE] rounded-[8px]">
                <span className="font-medium text-[#6E6D67]">Nominal Dibayar:</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-[16px] font-bold text-[#1B1A18] tabular-nums">
                    Rp 24.000
                  </span>
                  <span className="text-[11px] text-[#6E6D67]">≈ Rp 48.000/kg</span>
                </div>
              </div>
            </div>

            {/* Receipt Verification Tag */}
            <div className="pt-3 border-t border-[#E5E3DE] flex items-center justify-between text-[11px]">
              <span className="text-[#8C8B85]">Status Verifikasi:</span>
              <span className="px-2 py-0.5 rounded-[4px] bg-[#EEF773] text-[#1B1A18] font-semibold outline outline-1 outline-[#1B1A18]/25">
                Konsensus Wajar TPID (07:15 WIB)
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
