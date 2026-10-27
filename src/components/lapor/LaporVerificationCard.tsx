'use client';

import {
  ShieldCheck,
  Cpu,
  Users,
  Camera,
  CheckCircle,
  LockKey,
} from '@phosphor-icons/react';

export function LaporVerificationCard() {
  return (
    <div className="flex flex-col gap-6">
      {/* 3 Steps Pipeline Card */}
      <div className="bg-white rounded-[20px] outline outline-1 outline-[#E5E3DE] p-5 sm:p-6 shadow-xs flex flex-col gap-5">
        <div>
          <h2 className="text-[17px] font-bold text-[#1B1A18] tracking-tight">
            Bagaimana Laporanmu Diproses?
          </h2>
          <p className="text-[12px] text-[#6E6D67] mt-0.5">
            Setiap data yang masuk disaring ketat agar bebas dari spam, hoax, dan manipulasi pasar.
          </p>
        </div>

        <div className="flex flex-col gap-4 text-[13px]">
          {/* Step 1 */}
          <div className="flex items-start gap-3.5 p-3 rounded-[12px] bg-[#FAF9F5] outline outline-1 outline-[#E5E3DE]">
            <div className="w-7 h-7 rounded-full bg-[#1B1A18] text-white flex items-center justify-center shrink-0 text-[12px] font-bold">
              1
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="font-bold text-[#1B1A18]">
                Sanitasi EXIF & Privasi Otomatis
              </span>
              <p className="text-[12px] text-[#6E6D67] leading-relaxed">
                Metadata GPS koordinat perangkat dan nomor seri kamera dihapus bersih seketika di peramban sebelum file diunggah.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start gap-3.5 p-3 rounded-[12px] bg-[#FAF9F5] outline outline-1 outline-[#E5E3DE]">
            <div className="w-7 h-7 rounded-full bg-[#1B1A18] text-white flex items-center justify-center shrink-0 text-[12px] font-bold">
              2
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="font-bold text-[#1B1A18]">
                Deteksi Anomali Statistik (MAD)
              </span>
              <p className="text-[12px] text-[#6E6D67] leading-relaxed">
                Algoritma Median Absolute Deviation menyaring angka ekstrem yang melebihi batas wajar toleransi pasar (&gt; 2.5x deviasi).
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start gap-3.5 p-3 rounded-[12px] bg-[#FAF9F5] outline outline-1 outline-[#E5E3DE]">
            <div className="w-7 h-7 rounded-full bg-[#EEF773] text-[#1B1A18] outline outline-1 outline-[#1B1A18] flex items-center justify-center shrink-0 text-[12px] font-bold">
              3
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="font-bold text-[#1B1A18]">
                Agregasi Konsensus Warga 7 Hari
              </span>
              <p className="text-[12px] text-[#6E6D67] leading-relaxed">
                Hanya harga yang didukung minimal 3 laporan terverifikasi di pasar yang sama yang masuk ke indeks publik.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Photo Guidelines & Ethics Card */}
      <div className="bg-white rounded-[20px] outline outline-1 outline-[#E5E3DE] p-5 sm:p-6 shadow-xs flex flex-col gap-4">
        <h3 className="text-[15px] font-bold text-[#1B1A18] tracking-tight flex items-center gap-2">
          <Camera size={18} weight="bold" className="text-[#FF7714]" />
          <span>Panduan Bukti yang Sah</span>
        </h3>

        <ul className="flex flex-col gap-2.5 text-[12px] text-[#6E6D67]">
          <li className="flex items-start gap-2">
            <CheckCircle size={15} weight="fill" className="text-[#1B1A18] shrink-0 mt-0.5" />
            <span>Nota belanja / kertas kuitansi pasar dengan nominal dan tanggal.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle size={15} weight="fill" className="text-[#1B1A18] shrink-0 mt-0.5" />
            <span>Papan label harga komoditas yang terpasang di kios lapak.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle size={15} weight="fill" className="text-[#1B1A18] shrink-0 mt-0.5" />
            <span>Timbangan jarum atau digital yang memperlihatkan bobot komoditas.</span>
          </li>
        </ul>

        <div className="pt-3 border-t border-[#E5E3DE] flex items-start gap-2.5 text-[11px] text-[#8E8D86] leading-relaxed">
          <LockKey size={16} weight="bold" className="text-[#1B1A18] shrink-0 mt-0.5" />
          <span>
            <strong>Privasi Pedagang Dijamin:</strong> HargaKu tidak mencatat atau mempublikasikan nama toko/individu. Data hanya diagregasikan per pasar.
          </span>
        </div>
      </div>
    </div>
  );
}
