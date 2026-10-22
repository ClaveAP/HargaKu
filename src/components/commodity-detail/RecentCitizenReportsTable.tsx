'use client';

import { ShieldCheck } from '@phosphor-icons/react';

interface ReportRow {
  marketLocation: string;
  price: string;
  time: string;
  proofType: string;
  status: 'Terverifikasi Warga' | 'Menunggu Moderasi';
}

const CITIZEN_REPORTS: ReportRow[] = [
  {
    marketLocation: 'Pasar Sukasari (Kios Sayur Timur)',
    price: 'Rp 58.000 /kg',
    time: '05:45 WIB (Hari ini)',
    proofType: 'Foto Nota & Timbangan',
    status: 'Terverifikasi Warga',
  },
  {
    marketLocation: 'Pasar Gunung Batu (Lapak Blok B)',
    price: 'Rp 59.500 /kg',
    time: '06:12 WIB (Hari ini)',
    proofType: 'Foto Timbangan Digital',
    status: 'Terverifikasi Warga',
  },
  {
    marketLocation: 'Pasar Anyar (Sentra Bumbu)',
    price: 'Rp 62.000 /kg',
    time: '06:30 WIB (Hari ini)',
    proofType: 'Foto Lapak Terbuka',
    status: 'Terverifikasi Warga',
  },
  {
    marketLocation: 'Pasar Kebon Kembang (Pintu 2)',
    price: 'Rp 64.000 /kg',
    time: '06:48 WIB (Hari ini)',
    proofType: 'Sedang Ditinjau Foto',
    status: 'Menunggu Moderasi',
  },
];

export function RecentCitizenReportsTable() {
  return (
    <div className="bg-white rounded-[18px] outline outline-1 outline-[#E5E3DE] p-6 sm:p-7 shadow-xs flex flex-col gap-6">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-[16px] font-bold text-[#1B1A18] tracking-tight">
            Laporan Terbaru Warga (Agregat per Pasar)
          </h3>
          <p className="text-[12px] text-[#6E6D67]">
            Transparansi harga riil lapak pedagang tanpa mengekspos identitas perorangan pedagang.
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF9F5] outline outline-1 outline-[#E5E3DE] text-[11px] font-semibold text-[#1B1A18] w-fit">
          <ShieldCheck size={14} weight="bold" className="text-[#FF7714]" />
          <span>Terverifikasi Sistem &amp; TPID</span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border-t border-[#E5E3DE]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E5E3DE] text-[11px] font-bold text-[#78716C] uppercase tracking-wider">
              <th className="py-3 px-3 sm:px-4">Pasar Tradisional</th>
              <th className="py-3 px-3">Harga Lapak</th>
              <th className="py-3 px-3">Waktu Lapor</th>
              <th className="py-3 px-3">Bukti Lapak</th>
              <th className="py-3 px-3 sm:px-4 text-right">Status Verifikasi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E3DE] text-[13px]">
            {CITIZEN_REPORTS.map((r, idx) => (
              <tr key={idx} className="hover:bg-[#FAF9F5] transition-colors">
                <td className="py-3 px-3 sm:px-4 font-bold text-[#1B1A18]">
                  {r.marketLocation}
                </td>
                <td className="py-3 px-3 font-bold text-[#1B1A18] tabular-nums">
                  {r.price}
                </td>
                <td className="py-3 px-3 text-[#6E6D67] text-[12px]">
                  {r.time}
                </td>
                <td className="py-3 px-3 text-[#6E6D67] text-[12px]">
                  {r.proofType}
                </td>
                <td className="py-3 px-3 sm:px-4 text-right">
                  <span
                    className={`inline-block text-[11px] font-bold px-2 py-0.5 rounded-[4px] outline outline-1 ${
                      r.status === 'Terverifikasi Warga'
                        ? 'bg-[#EEF773] text-[#1B1A18] outline-[#1B1A18]'
                        : 'bg-[#FEF3C7] text-[#92400E] outline-[#FDE68A]'
                    }`}
                  >
                    {r.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Ethics Note Footer */}
      <div className="pt-2 border-t border-[#E5E3DE] text-[12px] text-[#6E6D67] leading-[18px]">
        <strong className="text-[#1B1A18] font-semibold">Kode etik perlindungan pedagang:</strong> Nama toko dan identitas perseorangan pedagang tidak dicantumkan di platform publik. Seluruh data diverifikasi agregat oleh sistem dan relawan TPID demi transparansi pasar yang saling menghormati.
      </div>
    </div>
  );
}
