'use client';

import {
  ShieldCheck,
  CheckCircle,
  Prohibit,
  WarningCircle,
  FileText,
  Camera,
  Question,
} from '@phosphor-icons/react';
import { AdminReport } from './admin-data';
import { formatRupiah } from '@/lib/utils';

interface Props {
  report: AdminReport;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onRequestMoreInfo: (id: string) => void;
}

export function AdminReportInspector({
  report,
  onApprove,
  onReject,
  onRequestMoreInfo,
}: Props) {
  return (
    <div className="bg-white rounded-[24px] outline outline-1 outline-[#E5E3DE] p-5 sm:p-7 shadow-xs flex flex-col gap-6">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E5E3DE]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold text-[#8E8D86]">
              {report.id}
            </span>
            <span className="w-1 h-1 rounded-full bg-[#D1CFCA]" />
            <span className="text-[11px] text-[#6E6D67]">{report.submittedAt}</span>
          </div>
          <h2 className="text-[20px] sm:text-[22px] font-bold text-[#1B1A18] tracking-tight mt-0.5">
            {report.commodityName}
          </h2>
          <span className="text-[12px] text-[#6E6D67]">{report.marketName}</span>
        </div>

        {/* Status Pill */}
        <div>
          {report.status === 'ANOMALY' && (
            <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#FFF3ED] text-[#FF7714] outline outline-1 outline-[#FFD9C7] flex items-center gap-1.5">
              <WarningCircle size={14} weight="bold" />
              <span>Peringatan Anomali Statistik</span>
            </span>
          )}
          {report.status === 'PENDING' && (
            <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#FAF9F5] text-[#1B1A18] outline outline-1 outline-[#E5E3DE]">
              Menunggu Keputusan
            </span>
          )}
          {report.status === 'APPROVED' && (
            <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#DCFCE7] text-[#15803D] outline outline-1 outline-[#86EFAC] flex items-center gap-1.5">
              <CheckCircle size={14} weight="bold" />
              <span>Telah Disetujui Masuk Konsensus</span>
            </span>
          )}
          {report.status === 'REJECTED' && (
            <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#FEE2E2] text-[#991B1B] outline outline-1 outline-[#FECACA] flex items-center gap-1.5">
              <Prohibit size={14} weight="bold" />
              <span>Ditolak / Dieliminasi</span>
            </span>
          )}
        </div>
      </div>

      {/* Anomaly Diagnosis Banner */}
      {report.anomalyReason && (
        <div className="p-4 rounded-[16px] bg-[#FFF3ED] outline outline-1 outline-[#FFD9C7] flex items-start gap-3 text-[12px]">
          <WarningCircle size={20} weight="fill" className="text-[#FF7714] shrink-0 mt-0.5" />
          <div className="flex flex-col gap-0.5">
            <span className="font-bold text-[#FF7714]">Diagnosa Algoritma MAD:</span>
            <p className="text-[#6E6D67] leading-relaxed">{report.anomalyReason}</p>
          </div>
        </div>
      )}

      {/* 3-Layer Comparison Ledger */}
      <div className="flex flex-col gap-2">
        <span className="text-[12px] font-bold text-[#1B1A18] uppercase tracking-wider">
          Komparasi 3 Lapis Harga
        </span>
        <div className="bg-[#FAF9F5] rounded-[16px] outline outline-1 outline-[#E5E3DE] p-4 divide-y divide-[#E5E3DE] text-[13px]">
          <div className="flex items-center justify-between pb-2.5">
            <span className="text-[#6E6D67]">Lapis 1: HAP Bapanas</span>
            <span className="font-bold text-[#1B1A18] tabular-nums">
              {formatRupiah(report.officialHapPrice)} / kg
            </span>
          </div>
          <div className="flex items-center justify-between py-2.5">
            <span className="text-[#6E6D67]">Lapis 2: Rerata Kota PIHPS BI</span>
            <span className="font-bold text-[#1B1A18] tabular-nums">
              {formatRupiah(report.cityAvgPrice)} / kg
            </span>
          </div>
          <div className="flex items-center justify-between pt-2.5">
            <div className="flex flex-col">
              <span className="font-bold text-[#1B1A18]">Lapis 3: Laporan Warga Lapak</span>
              <span className="text-[11px] text-[#8E8D86]">
                Trans: {formatRupiah(report.reportedPrice)} / {report.unit}
              </span>
            </div>
            <div className="text-right">
              <span className="font-bold text-[#1B1A18] tabular-nums text-[15px] block">
                {formatRupiah(report.normalizedPricePerKg)} / kg
              </span>
              <span
                className={`text-[11px] font-bold tabular-nums ${
                  report.diffPercent > 20
                    ? 'text-[#991B1B]'
                    : report.diffPercent < 0
                    ? 'text-[#15803D]'
                    : 'text-[#6E6D67]'
                }`}
              >
                {report.diffPercent > 0 ? `+${report.diffPercent}%` : `${report.diffPercent}%`} vs Rerata Kota
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Photo Proof Simulation */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-bold text-[#1B1A18] uppercase tracking-wider">
            Bukti Foto Lapak
          </span>
          <span className="text-[11px] font-bold text-[#15803D] flex items-center gap-1">
            <ShieldCheck size={14} weight="bold" />
            <span>EXIF Sanitized: No GPS Metadata</span>
          </span>
        </div>

        {report.hasPhoto ? (
          <div className="relative rounded-[16px] bg-[#F4F3F0] outline outline-1 outline-[#E5E3DE] p-6 flex flex-col items-center justify-center text-center gap-2 min-h-[140px]">
            <Camera size={32} weight="bold" className="text-[#8E8D86]" />
            <div className="flex flex-col gap-0.5">
              <span className="text-[13px] font-bold text-[#1B1A18]">
                Nota Belanja &amp; Label Lapak
              </span>
              <span className="text-[11px] text-[#8E8D86]">
                File JPG · 1.2 MB · GPS distrip di browser
              </span>
            </div>
            <span className="mt-1 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-white text-[#15803D] outline outline-1 outline-[#86EFAC]">
              SANITY CHECK: PASSED
            </span>
          </div>
        ) : (
          <div className="p-4 rounded-[14px] bg-[#FAF9F5] outline outline-1 outline-[#E5E3DE] text-[12px] text-[#8E8D86] text-center">
            Pelapor tidak menyertakan foto (Laporan murni nilai transaksi).
          </div>
        )}
      </div>

      {/* Citizen Notes */}
      {report.citizenNotes && (
        <div className="p-3.5 rounded-[14px] bg-[#FAF9F5] outline outline-1 outline-[#E5E3DE] flex flex-col gap-1 text-[12px]">
          <span className="font-semibold text-[#8E8D86]">Catatan Warga Pelapor:</span>
          <p className="text-[#1B1A18] italic">&ldquo;{report.citizenNotes}&rdquo;</p>
        </div>
      )}

      {/* Decision Action Buttons */}
      <div className="pt-3 border-t border-[#E5E3DE] flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => onApprove(report.id)}
          className="flex-1 py-2.5 px-4 rounded-[12px] bg-[#EEF773] hover:bg-[#E5EE65] outline outline-2 outline-[#1B1A18] text-[#1B1A18] text-[13px] font-bold flex items-center justify-center gap-1.5 shadow-[2px_2px_0px_#1B1A18] active:translate-x-[1px] active:translate-y-[1px] transition-all"
        >
          <CheckCircle size={16} weight="bold" />
          <span>Setujui Laporan</span>
        </button>

        <button
          type="button"
          onClick={() => onReject(report.id)}
          className="flex-1 py-2.5 px-4 rounded-[12px] bg-white outline outline-1 outline-[#FECACA] hover:bg-[#FEE2E2] text-[#991B1B] text-[13px] font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
        >
          <Prohibit size={16} weight="bold" />
          <span>Tolak Laporan</span>
        </button>

        <button
          type="button"
          onClick={() => onRequestMoreInfo(report.id)}
          className="py-2.5 px-3 rounded-[12px] bg-[#FAF9F5] outline outline-1 outline-[#E5E3DE] hover:bg-white text-[#1B1A18] text-[13px] font-semibold flex items-center justify-center gap-1 transition-colors shadow-xs"
          title="Tandai Butuh Investigasi"
        >
          <Question size={16} weight="bold" />
          <span className="hidden sm:inline">Investigasi</span>
        </button>
      </div>
    </div>
  );
}
