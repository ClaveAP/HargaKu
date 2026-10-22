'use client';

import {
  Hourglass,
  WarningCircle,
  CheckCircle,
  Prohibit,
} from '@phosphor-icons/react';

interface Props {
  pendingCount: number;
  anomalyCount: number;
  approvedCount: number;
  rejectedCount: number;
}

export function AdminMetricCards({
  pendingCount,
  anomalyCount,
  approvedCount,
  rejectedCount,
}: Props) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Menunggu */}
      <div className="p-4 sm:p-5 rounded-[18px] bg-white outline outline-1 outline-[#E5E3DE] shadow-xs flex flex-col justify-between gap-3">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-semibold text-[#8E8D86]">
            Menunggu Review
          </span>
          <Hourglass size={18} weight="bold" className="text-[#8E8D86]" />
        </div>
        <span className="text-[26px] sm:text-[30px] font-bold text-[#1B1A18] tabular-nums tracking-tight">
          {pendingCount}
        </span>
      </div>

      {/* 2. Anomali */}
      <div className="p-4 sm:p-5 rounded-[18px] bg-[#FFF3ED] outline outline-1 outline-[#FFD9C7] shadow-xs flex flex-col justify-between gap-3">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-bold text-[#FF7714]">
            Peringatan Anomali
          </span>
          <WarningCircle size={18} weight="bold" className="text-[#FF7714]" />
        </div>
        <span className="text-[26px] sm:text-[30px] font-bold text-[#FF7714] tabular-nums tracking-tight">
          {anomalyCount}
        </span>
      </div>

      {/* 3. Disetujui */}
      <div className="p-4 sm:p-5 rounded-[18px] bg-white outline outline-1 outline-[#E5E3DE] shadow-xs flex flex-col justify-between gap-3">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-semibold text-[#8E8D86]">
            Disetujui Hari Ini
          </span>
          <CheckCircle size={18} weight="bold" className="text-[#15803D]" />
        </div>
        <span className="text-[26px] sm:text-[30px] font-bold text-[#1B1A18] tabular-nums tracking-tight">
          {approvedCount}
        </span>
      </div>

      {/* 4. Dieliminasi */}
      <div className="p-4 sm:p-5 rounded-[18px] bg-white outline outline-1 outline-[#E5E3DE] shadow-xs flex flex-col justify-between gap-3">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-semibold text-[#8E8D86]">
            Dieliminasi / Spam
          </span>
          <Prohibit size={18} weight="bold" className="text-[#991B1B]" />
        </div>
        <span className="text-[26px] sm:text-[30px] font-bold text-[#991B1B] tabular-nums tracking-tight">
          {rejectedCount}
        </span>
      </div>
    </div>
  );
}
