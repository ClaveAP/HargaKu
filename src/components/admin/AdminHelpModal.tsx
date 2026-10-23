'use client';

import React from 'react';
import {
  X,
  Question,
  BookOpen,
  ShieldCheck,
  Lightning,
  EnvelopeSimple,
} from '@phosphor-icons/react';

interface AdminHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminHelpModal({ isOpen, onClose }: AdminHelpModalProps) {
  if (!isOpen) return null;

  const faqs = [
    {
      icon: Lightning,
      title: 'Entri Harga Harian',
      desc: 'Petugas lapangan menginput harga rata-rata komoditas dari seluruh pasar tradisional terdaftar setiap pagi pukul 06:00 – 08:00 WIB melalui menu Entri Harga Harian. Data langsung tersinkronisasi ke website publik.',
    },
    {
      icon: ShieldCheck,
      title: 'Moderasi Laporan Warga (MAD)',
      desc: 'Sistem otomatis mendeteksi anomali jika harga yang dilaporkan warga deviasi >25% dari HAP/HET atau rata-rata pasar. Laporan anomali wajib diperiksa foto struk/notanya sebelum disetujui.',
    },
    {
      icon: BookOpen,
      title: 'Katalog Komoditas & Pasar',
      desc: 'Gunakan tab Katalog Komoditas untuk mengubah batas HAP/HET resmi dan tab Pasar Tradisional untuk memperbarui koordinat GPS peta atau jam operasional lapak.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-white border border-[#E5E3DE] rounded-[24px] shadow-2xl p-6 z-10 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-[#E5E3DE]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EEF773] border border-[#1B1A18] flex items-center justify-center text-[#1B1A18] shadow-[1px_1px_0px_#1B1A18]">
              <Question size={20} weight="bold" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-[#1B1A18]">
                Bantuan &amp; Panduan Admin
              </h2>
              <span className="text-xs text-[#706E6A]">
                SOP Pengelolaan Data HargaKu
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup modal"
            className="p-1.5 text-[#706E6A] hover:text-[#1B1A18] rounded-xl border border-[#E5E3DE] transition-colors"
          >
            <X size={18} weight="bold" />
          </button>
        </div>

        <div className="space-y-3">
          {faqs.map((faq) => {
            const Icon = faq.icon;
            return (
              <div
                key={faq.title}
                className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#E5E3DE] space-y-1.5"
              >
                <div className="flex items-center gap-2 font-semibold text-xs text-[#1B1A18]">
                  <Icon size={16} weight="bold" className="text-[#FF7714]" />
                  <span>{faq.title}</span>
                </div>
                <p className="text-xs text-[#706E6A] leading-relaxed">
                  {faq.desc}
                </p>
              </div>
            );
          })}
        </div>

        <div className="pt-2 border-t border-[#E5E3DE] flex items-center justify-between text-xs text-[#706E6A]">
          <div className="flex items-center gap-1.5">
            <EnvelopeSimple size={15} />
            <span>Kontak: support@hargaku.id</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-xl bg-[#1B1A18] text-white text-xs font-semibold hover:bg-black transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
