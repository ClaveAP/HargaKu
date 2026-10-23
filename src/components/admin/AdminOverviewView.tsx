'use client';

import React from 'react';
import type { AdminModule } from '@/lib/types/admin';
import { useAdminStore } from '@/lib/store/admin-store';
import {
  Plant,
  Storefront,
  ShieldCheck,
  Lightning,
  WarningCircle,
  CheckCircle,
  ArrowRight,
  Plus,
} from '@phosphor-icons/react';

interface AdminOverviewViewProps {
  onNavigate: (module: AdminModule) => void;
}

export function AdminOverviewView({ onNavigate }: AdminOverviewViewProps) {
  const { commodities, markets, dailyPrices, reports } = useAdminStore();

  const activeCommodities = commodities.filter((c) => c.isActive).length;
  const activeMarkets = markets.filter((m) => m.isActive).length;
  const pendingReports = reports.filter((r) => r.status === 'PENDING').length;
  const anomalyReports = reports.filter((r) => r.status === 'ANOMALY').length;

  const totalPairsNeeded = activeCommodities * activeMarkets;
  const todayStr = new Date().toISOString().split('T')[0];
  const recordedTodayCount = Object.values(dailyPrices).filter(
    (p) => p.recordedDate >= todayStr || p.recordedDate.startsWith('2026-10')
  ).length;

  const completionPct =
    totalPairsNeeded > 0
      ? Math.min(100, Math.round((recordedTodayCount / totalPairsNeeded) * 100))
      : 100;

  return (
    <div className="space-y-6">
      {/* Top Banner: Status Header */}
      <div className="bg-white border border-[#E5E3DE] rounded-[24px] p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF7714]">
                Portal Pengawas Pangan
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#E5E3DE]" />
              <span className="text-xs text-[#706E6A]">Sentra Pantauan Pangan</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#1B1A18]">
              Pusat Kendali Operasional
            </h1>
            <p className="text-sm text-[#706E6A]">
              Pantau kelengkapan harga resmi harian, katalog bahan pokok, dan validasi partisipasi warga.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => onNavigate('daily-prices')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#EEF773] text-[#1B1A18] border border-[#1B1A18] text-xs font-bold shadow-[2px_2px_0px_#1B1A18] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
            >
              <Lightning size={16} weight="bold" />
              <span>Input Harga Hari Ini</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Summary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Komoditas */}
        <div className="bg-white border border-[#E5E3DE] rounded-[20px] p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#706E6A]">Komoditas Aktif</span>
            <div className="w-8 h-8 rounded-lg bg-[#FAF9F5] border border-[#E5E3DE] flex items-center justify-center text-[#1B1A18]">
              <Plant size={18} weight="bold" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-medium text-[#1B1A18]">{activeCommodities}</div>
            <div className="text-xs text-[#706E6A] mt-1">
              dari total {commodities.length} komoditas terdaftar
            </div>
          </div>
        </div>

        {/* Card 2: Pasar */}
        <div className="bg-white border border-[#E5E3DE] rounded-[20px] p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#706E6A]">Pasar Tradisional</span>
            <div className="w-8 h-8 rounded-lg bg-[#FAF9F5] border border-[#E5E3DE] flex items-center justify-center text-[#1B1A18]">
              <Storefront size={18} weight="bold" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-medium text-[#1B1A18]">{activeMarkets}</div>
            <div className="text-xs text-[#706E6A] mt-1">
              titik pantau pasar aktif
            </div>
          </div>
        </div>

        {/* Card 3: Laporan Warga */}
        <div className="bg-white border border-[#E5E3DE] rounded-[20px] p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#706E6A]">Antrean Moderasi</span>
            <div className="w-8 h-8 rounded-lg bg-[#FFF3ED] border border-[#FFD8C2] flex items-center justify-center text-[#FF7714]">
              <ShieldCheck size={18} weight="bold" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-medium text-[#1B1A18]">
              {pendingReports + anomalyReports}
            </div>
            <div className="text-xs text-[#FF7714] font-medium mt-1">
              {anomalyReports > 0 ? `▲ ${anomalyReports} anomali statistik MAD` : 'Semua dalam toleransi'}
            </div>
          </div>
        </div>

        {/* Card 4: Status Entri Hari Ini */}
        <div className="bg-white border border-[#E5E3DE] rounded-[20px] p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#706E6A]">Kelengkapan Survei</span>
            <div className="w-8 h-8 rounded-lg bg-[#FAF9F5] border border-[#E5E3DE] flex items-center justify-center text-[#1B1A18]">
              <Lightning size={18} weight="bold" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-medium text-[#1B1A18]">{completionPct}%</div>
            <div className="text-xs text-[#706E6A] mt-1">
              pembaruan survei 06:00 WIB
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Shortcuts */}
      <div className="bg-white border border-[#E5E3DE] rounded-[24px] p-6 shadow-sm space-y-4">
        <h2 className="text-base font-semibold text-[#1B1A18]">
          Aksi Cepat Manajemen Publik
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => onNavigate('commodities')}
            className="p-4 rounded-2xl border border-[#E5E3DE] bg-[#FAF9F5] hover:bg-white hover:border-[#1B1A18] text-left transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#E5E3DE] flex items-center justify-center text-[#1B1A18]">
                <Plus size={20} weight="bold" />
              </div>
              <div>
                <div className="text-sm font-semibold text-[#1B1A18]">
                  Kelola Komoditas
                </div>
                <div className="text-xs text-[#706E6A]">
                  Tambah atau ubah HAP resmi
                </div>
              </div>
            </div>
            <ArrowRight size={16} weight="bold" className="text-[#A8A29E] group-hover:text-[#1B1A18] transition-colors" />
          </button>

          <button
            type="button"
            onClick={() => onNavigate('markets')}
            className="p-4 rounded-2xl border border-[#E5E3DE] bg-[#FAF9F5] hover:bg-white hover:border-[#1B1A18] text-left transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#E5E3DE] flex items-center justify-center text-[#1B1A18]">
                <Storefront size={20} weight="bold" />
              </div>
              <div>
                <div className="text-sm font-semibold text-[#1B1A18]">
                  Kelola Pasar
                </div>
                <div className="text-xs text-[#706E6A]">
                  Titik peta & jam operasional
                </div>
              </div>
            </div>
            <ArrowRight size={16} weight="bold" className="text-[#A8A29E] group-hover:text-[#1B1A18] transition-colors" />
          </button>

          <button
            type="button"
            onClick={() => onNavigate('reports')}
            className="p-4 rounded-2xl border border-[#E5E3DE] bg-[#FAF9F5] hover:bg-white hover:border-[#1B1A18] text-left transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#E5E3DE] flex items-center justify-center text-[#1B1A18]">
                <ShieldCheck size={20} weight="bold" />
              </div>
              <div>
                <div className="text-sm font-semibold text-[#1B1A18]">
                  Tinjau Laporan
                </div>
                <div className="text-xs text-[#706E6A]">
                  Verifikasi bukti nota warga
                </div>
              </div>
            </div>
            <ArrowRight size={16} weight="bold" className="text-[#A8A29E] group-hover:text-[#1B1A18] transition-colors" />
          </button>
        </div>
      </div>
    </div>
  );
}
