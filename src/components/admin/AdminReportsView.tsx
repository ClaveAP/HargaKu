'use client';

import React, { useState } from 'react';
import { useAdminStore } from '@/lib/store/admin-store';
import { AdminMetricCards } from './AdminMetricCards';
import { AdminReportQueue } from './AdminReportQueue';
import { AdminReportInspector } from './AdminReportInspector';

export function AdminReportsView() {
  const { reports, approveReport, rejectReport, requestReportInfo } =
    useAdminStore();

  const [selectedReportId, setSelectedReportId] = useState<string>(
    reports[0]?.id || ''
  );
  const [activeTab, setActiveTab] = useState<
    'ALL' | 'PENDING' | 'ANOMALY' | 'APPROVED' | 'REJECTED'
  >('ALL');

  const selectedReport =
    reports.find((r) => r.id === selectedReportId) || reports[0];

  const pendingCount = reports.filter((r) => r.status === 'PENDING').length;
  const anomalyCount = reports.filter((r) => r.status === 'ANOMALY').length;
  const approvedCount = reports.filter((r) => r.status === 'APPROVED').length;
  const rejectedCount = reports.filter((r) => r.status === 'REJECTED').length;

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="bg-white border border-[#E5E3DE] rounded-[24px] p-6 shadow-sm">
        <span className="text-xs font-bold uppercase tracking-wider text-[#FF7714]">
          Partisipasi Pangan Warga
        </span>
        <h1 className="text-2xl font-medium tracking-tight text-[#1B1A18] mt-0.5">
          Portal Moderasi Laporan Warga
        </h1>
        <p className="text-sm text-[#706E6A]">
          Tinjau nota transaksi belanja warga, saring anomali statistik MAD, dan berikan persetujuan untuk acuan Lapis 3.
        </p>
      </div>

      <AdminMetricCards
        pendingCount={pendingCount}
        anomalyCount={anomalyCount}
        approvedCount={approvedCount}
        rejectedCount={rejectedCount}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Report Queue List */}
        <div className="lg:col-span-5 xl:col-span-5">
          <AdminReportQueue
            reports={reports}
            selectedReportId={selectedReportId}
            onSelectReport={setSelectedReportId}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>

        {/* Right Column: Selected Report Detail Inspector */}
        <div className="lg:col-span-7 xl:col-span-7">
          {selectedReport ? (
            <AdminReportInspector
              report={selectedReport}
              onApprove={approveReport}
              onReject={(id) => rejectReport(id)}
              onRequestMoreInfo={(id) =>
                requestReportInfo(id, 'Butuh verifikasi fisik timbangan')
              }
            />
          ) : (
            <div className="bg-white rounded-[24px] border border-[#E5E3DE] p-8 text-center text-sm text-[#706E6A]">
              Tidak ada laporan warga yang dipilih.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
