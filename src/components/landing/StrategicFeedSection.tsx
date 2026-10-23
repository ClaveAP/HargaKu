import Link from 'next/link';
import { ArrowRight, TrendingDown, TrendingUp, Minus } from 'lucide-react';

interface FeedRow {
  name: string;
  category: string;
  lowestMarket: string;
  lowestPrice: string;
  cityAvg: string;
  trend: string;
  trendType: 'down' | 'up' | 'flat';
  status: string;
  statusBadge: string;
}

const FEED_DATA: FeedRow[] = [
  {
    name: 'Cabai Merah Keriting',
    category: 'Cabai & Bawang',
    lowestMarket: 'Pasar Kebon Kembang',
    lowestPrice: 'Rp 48.000 / kg',
    cityAvg: 'Rp 51.200 / kg',
    trend: '-3.2%',
    trendType: 'down',
    status: 'Wajar & Murah',
    statusBadge: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
  },
  {
    name: 'Bawang Merah Brebes',
    category: 'Cabai & Bawang',
    lowestMarket: 'Pasar Anyar',
    lowestPrice: 'Rp 34.000 / kg',
    cityAvg: 'Rp 36.500 / kg',
    trend: '+2.1%',
    trendType: 'up',
    status: 'Wajar',
    statusBadge: 'bg-zinc-100 text-zinc-700 border-zinc-200/80',
  },
  {
    name: 'Daging Sapi Murni',
    category: 'Daging & Telur',
    lowestMarket: 'Pasar Sukasari',
    lowestPrice: 'Rp 135.000 / kg',
    cityAvg: 'Rp 138.000 / kg',
    trend: '0.0%',
    trendType: 'flat',
    status: 'Wajar',
    statusBadge: 'bg-zinc-100 text-zinc-700 border-zinc-200/80',
  },
  {
    name: 'Minyak Goreng Curah',
    category: 'Minyak & Gula',
    lowestMarket: 'Pasar Jambu Dua',
    lowestPrice: 'Rp 15.500 / liter',
    cityAvg: 'Rp 16.000 / liter',
    trend: '0.0%',
    trendType: 'flat',
    status: 'Wajar',
    statusBadge: 'bg-zinc-100 text-zinc-700 border-zinc-200/80',
  },
  {
    name: 'Telur Ayam Ras',
    category: 'Daging & Telur',
    lowestMarket: 'Pasar Kebon Kembang',
    lowestPrice: 'Rp 27.500 / kg',
    cityAvg: 'Rp 28.200 / kg',
    trend: '-1.5%',
    trendType: 'down',
    status: 'Murah',
    statusBadge: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
  },
  {
    name: 'Beras Medium (IR 64)',
    category: 'Beras',
    lowestMarket: 'Pasar Gunung Batu',
    lowestPrice: 'Rp 13.000 / kg',
    cityAvg: 'Rp 13.500 / kg',
    trend: '0.0%',
    trendType: 'flat',
    status: 'Wajar',
    statusBadge: 'bg-zinc-100 text-zinc-700 border-zinc-200/80',
  },
];

export function StrategicFeedSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 border-t border-zinc-100">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-950">
            Pantauan Langsung Komoditas Pokok.
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            Survei harian terverifikasi dari pasar-pasar tradisional utama di wilayah Anda.
          </p>
        </div>

        <Link
          href="/dashboard"
          className="text-xs font-semibold text-zinc-950 hover:text-emerald-700 inline-flex items-center gap-1.5 transition-colors"
        >
          <span>Buka Semua Komoditas</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="rounded-2xl border border-zinc-200/90 bg-white shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-50/80 border-b border-zinc-200/70 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-5">Komoditas</th>
                <th className="py-3 px-5">Pasar Termurah</th>
                <th className="py-3 px-5">Rata-Rata Kota</th>
                <th className="py-3 px-5 text-center">Tren 7 Hari</th>
                <th className="py-3 px-5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {FEED_DATA.map((row) => (
                <tr key={row.name} className="hover:bg-zinc-50/60 transition-colors">
                  <td className="py-4 px-5 font-semibold text-zinc-900">
                    <div>{row.name}</div>
                    <div className="text-[11px] text-zinc-500 font-normal">{row.category}</div>
                  </td>
                  <td className="py-4 px-5">
                    <div className="font-semibold text-emerald-800 tabular-nums">{row.lowestPrice}</div>
                    <div className="text-[11px] text-zinc-500">{row.lowestMarket}</div>
                  </td>
                  <td className="py-4 px-5 font-semibold text-zinc-950 tabular-nums">
                    {row.cityAvg}
                  </td>
                  <td className="py-4 px-5 text-center tabular-nums">
                    <span
                      className={`inline-flex items-center gap-1 font-medium text-[11px] ${
                        row.trendType === 'down'
                          ? 'text-emerald-700'
                          : row.trendType === 'up'
                          ? 'text-amber-700'
                          : 'text-zinc-500'
                      }`}
                    >
                      {row.trendType === 'down' && <TrendingDown className="w-3 h-3 text-emerald-600" />}
                      {row.trendType === 'up' && <TrendingUp className="w-3 h-3 text-amber-600" />}
                      {row.trendType === 'flat' && <Minus className="w-3 h-3 text-zinc-400" />}
                      <span>{row.trend}</span>
                    </span>
                  </td>
                  <td className="py-4 px-5 text-right">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${row.statusBadge}`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-5 py-3.5 bg-zinc-50/50 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500">
          <span>Menampilkan 6 komoditas unggulan. Seluruh 12 komoditas diperbarui setiap subuh.</span>
          <Link
            href="/dashboard"
            className="font-medium text-zinc-900 hover:text-emerald-700 transition-colors"
          >
            Lihat Tabel Lengkap →
          </Link>
        </div>
      </div>
    </section>
  );
}
