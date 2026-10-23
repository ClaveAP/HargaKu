'use client';

import { useState } from 'react';
import {
  MagnifyingGlass,
  WarningCircle,
  CheckCircle,
  Hourglass,
  Prohibit,
  Camera,
} from '@phosphor-icons/react';
import { AdminReport } from './admin-data';
import { formatRupiah } from '@/lib/utils';

interface Props {
  reports: AdminReport[];
  selectedReportId: string;
  onSelectReport: (id: string) => void;
  activeTab: 'ALL' | 'PENDING' | 'ANOMALY' | 'APPROVED' | 'REJECTED';
  onTabChange: (tab: 'ALL' | 'PENDING' | 'ANOMALY' | 'APPROVED' | 'REJECTED') => void;
}

export function AdminReportQueue({
  reports,
  selectedReportId,
  onSelectReport,
  activeTab,
  onTabChange,
}: Props) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredReports = reports.filter((r) => {
    if (activeTab === 'PENDING' && r.status !== 'PENDING') return false;
    if (activeTab === 'ANOMALY' && r.status !== 'ANOMALY') return false;
    if (activeTab === 'APPROVED' && r.status !== 'APPROVED') return false;
    if (activeTab === 'REJECTED' && r.status !== 'REJECTED') return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        r.id.toLowerCase().includes(q) ||
        r.commodityName.toLowerCase().includes(q) ||
        r.marketName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="bg-white rounded-[24px] border border-[#E5E3DE] p-5 shadow-xs flex flex-col gap-4">
      {/* Tabs */}
      <div className="grid grid-cols-5 gap-1 pb-2 border-b border-[#E5E3DE]">
        {(
          [
            { id: 'ALL', label: 'Semua' },
            { id: 'ANOMALY', label: 'Anomali' },
            { id: 'PENDING', label: 'Menunggu' },
            { id: 'APPROVED', label: 'Disetujui' },
            { id: 'REJECTED', label: 'Ditolak' },
          ] as const
        ).map((tab) => {
          const count =
            tab.id === 'ALL'
              ? reports.length
              : reports.filter((r) => r.status === tab.id).length;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`py-1.5 px-1 rounded-xl text-[11px] font-semibold transition-all border text-center flex flex-col items-center justify-center cursor-pointer ${
                isActive
                  ? 'bg-[#1B1A18] text-white border-[#1B1A18] shadow-xs'
                  : 'bg-[#FAF9F5] text-[#6E6D67] border-[#E5E3DE] hover:bg-white hover:text-[#1B1A18]'
              }`}
            >
              <span className="truncate">{tab.label}</span>
              <span className="opacity-75 tabular-nums text-[10px]">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Search Input */}
      <div className="relative">
        <MagnifyingGlass
          size={14}
          weight="bold"
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C8B85]"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari ID laporan, komoditas, atau pasar..."
          className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#FAF9F5] border border-[#E5E3DE] text-[12px] text-[#1B1A18] placeholder-[#8E8D86] shadow-xs focus:border-[#1B1A18] focus:outline-none"
        />
      </div>

      {/* Report Queue List */}
      <div className="flex flex-col gap-2.5 max-h-[580px] overflow-y-auto p-1 -m-1">
        {filteredReports.map((r) => {
          const isSelected = r.id === selectedReportId;

          return (
            <div
              key={r.id}
              onClick={() => onSelectReport(r.id)}
              className={`p-3.5 rounded-[16px] border cursor-pointer transition-all ${
                isSelected
                  ? 'bg-[#FAF9F5] border-[#1B1A18] shadow-xs'
                  : 'bg-white border-[#E5E3DE] hover:bg-[#FAF9F5]/60'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-[11px] font-mono font-bold text-[#8E8D86]">
                  {r.id}
                </span>

                {/* Status Badges */}
                {r.status === 'ANOMALY' && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FFF3ED] text-[#FF7714] border border-[#FFD9C7] flex items-center gap-1">
                    <WarningCircle size={11} weight="bold" />
                    <span>OUTLIER ({r.diffPercent > 0 ? `+${r.diffPercent}%` : `${r.diffPercent}%`})</span>
                  </span>
                )}
                {r.status === 'PENDING' && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FAF9F5] text-[#1B1A18] border border-[#E5E3DE] flex items-center gap-1">
                    <Hourglass size={11} weight="bold" />
                    <span>MENUNGGU</span>
                  </span>
                )}
                {r.status === 'APPROVED' && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#DCFCE7] text-[#15803D] border border-[#86EFAC] flex items-center gap-1">
                    <CheckCircle size={11} weight="bold" />
                    <span>DISETUJUI</span>
                  </span>
                )}
                {r.status === 'REJECTED' && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FEE2E2] text-[#991B1B] border border-[#FECACA] flex items-center gap-1">
                    <Prohibit size={11} weight="bold" />
                    <span>DITOLAK</span>
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-0.5">
                <h4 className="text-[13px] font-bold text-[#1B1A18] leading-snug">
                  {r.commodityName}
                </h4>
                <span className="text-[11px] text-[#6E6D67] truncate">
                  {r.marketName}
                </span>
              </div>

              <div className="flex items-center justify-between gap-2 mt-2 pt-2 border-t border-[#E5E3DE]/70 text-[11px]">
                <span className="font-bold text-[#1B1A18] tabular-nums">
                  {formatRupiah(r.reportedPrice)} / {r.unit}
                </span>

                <div className="flex items-center gap-2 text-[#8E8D86]">
                  {r.hasPhoto && (
                    <span className="flex items-center gap-0.5 text-[#15803D] font-semibold">
                      <Camera size={12} weight="bold" />
                      <span>Foto</span>
                    </span>
                  )}
                  <span>{r.submittedAt}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
