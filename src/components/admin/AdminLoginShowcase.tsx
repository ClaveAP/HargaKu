'use client';

import React from 'react';
import {
  Storefront,
  Lightning,
  ShieldCheck,
  CheckCircle,
} from '@phosphor-icons/react';

export function AdminLoginShowcase() {
  const highlights = [
    {
      icon: Storefront,
      iconBg: 'bg-[#EEF773] text-[#1B1A18]',
      title: '64 Sentra Pasar Tradisional Terhubung',
      desc: 'Pemantauan serempak 64 sentra pasar tradisional di seluruh koridor wilayah nusantara.',
    },
    {
      icon: Lightning,
      iconBg: 'bg-[#FFF3ED] text-[#FF7714]',
      title: 'Survei Pagi 06:00 WIB',
      desc: 'Matriks harga terkalibrasi dengan panel resmi Bapanas dan PIHPS Bank Indonesia.',
    },
    {
      icon: ShieldCheck,
      iconBg: 'bg-[#DCFCE7] text-[#15803D]',
      title: 'Filter Anomali Statistik MAD',
      desc: 'Deteksi otomatis deviasi ekstrem >25% dan sanitasi metadata EXIF foto struk warga.',
    },
  ];

  return (
    <div className="relative w-full h-full bg-[#1B1A18] text-white p-8 sm:p-12 lg:p-14 flex flex-col justify-between overflow-hidden">
      {/* Subtle Radial Glow */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#EEF773]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#FF7714]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Decorative Dot Grid */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle, #FFFFFF 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Top Brand Header */}
      <div className="relative z-10 space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#EEF773] border-1.5 border-white flex items-center justify-center font-bold text-base text-[#1B1A18] shadow-[2px_2px_0px_rgba(255,255,255,0.2)]">
            H.
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm tracking-tight text-white">
              HargaKu Console
            </span>
            <span className="text-[10px] text-[#A8A29E] tracking-wider uppercase">
              TIM PENGAWAS &amp; PEMANTAU PASAR
            </span>
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2A2926] border border-[#3E3C38] text-[11px] font-semibold text-[#EEF773]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EEF773] inline-block" />
            Portal Pengawas Pangan Daerah
          </span>
          <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-white leading-tight">
            Pusat Kendali &amp; Stabilitas Harga Pangan Daerah
          </h2>
          <p className="text-xs sm:text-sm text-[#A8A29E] leading-relaxed max-w-md">
            Satu pintu masuk untuk memperbarui harga resmi komoditas pasar harian, memoderasi laporan nota belanja warga, dan mengawal transparansi pangan.
          </p>
        </div>
      </div>

      {/* Center 3 Bento Feature Highlights */}
      <div className="relative z-10 my-8 space-y-3 max-w-lg">
        {highlights.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="p-3.5 rounded-2xl bg-[#242320]/80 border border-[#33312D] backdrop-blur-xs flex items-start gap-3.5"
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${item.iconBg}`}
              >
                <Icon size={18} weight="bold" />
              </div>
              <div className="space-y-0.5 min-w-0">
                <span className="font-semibold text-xs text-white">
                  {item.title}
                </span>
                <p className="text-[11px] text-[#A8A29E] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Security Footer */}
      <div className="relative z-10 pt-4 border-t border-[#2E2C29] flex items-center justify-between text-xs text-[#706E6A]">
        <div className="flex items-center gap-1.5 text-[#A8A29E]">
          <CheckCircle size={15} weight="fill" className="text-[#EEF773]" />
          <span className="text-[11px]">Sesi Dilindungi Enkripsi Token JWT</span>
        </div>
        <span className="text-[10px] font-mono text-[#706E6A]">v1.2 Produksi Terverifikasi</span>
      </div>
    </div>
  );
}
