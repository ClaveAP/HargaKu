import Link from 'next/link';

interface TableRow {
  name: string;
  quality: string;
  lowestMarket: string;
  lowestPrice: string;
  cityAvg: string;
  trend: string;
  trendType: 'down' | 'up' | 'flat';
  status: string;
  statusBadge: string;
}

const ROWS: TableRow[] = [
  {
    name: 'Cabai Merah Keriting',
    quality: 'Kualitas super',
    lowestMarket: 'Pasar Kebon Kembang',
    lowestPrice: 'Rp 48.000 / kg',
    cityAvg: 'Rp 51.200 / kg',
    trend: '-3.2%',
    trendType: 'down',
    status: 'Wajar & Murah',
    statusBadge: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  },
  {
    name: 'Bawang Merah Brebes',
    quality: 'Kering panen sedang',
    lowestMarket: 'Pasar Anyar',
    lowestPrice: 'Rp 34.000 / kg',
    cityAvg: 'Rp 36.500 / kg',
    trend: '+2.1%',
    trendType: 'up',
    status: 'Wajar',
    statusBadge: 'bg-gray-100 text-gray-700 border-gray-200',
  },
  {
    name: 'Daging Sapi Murni',
    quality: 'Paha belakang segar',
    lowestMarket: 'Pasar Sukasari',
    lowestPrice: 'Rp 135.000 / kg',
    cityAvg: 'Rp 138.000 / kg',
    trend: '0.0% Stabil',
    trendType: 'flat',
    status: 'Wajar',
    statusBadge: 'bg-gray-100 text-gray-700 border-gray-200',
  },
  {
    name: 'Minyak Goreng Curah',
    quality: 'Standar SNI Minyakita',
    lowestMarket: 'Pasar Jambu Dua',
    lowestPrice: 'Rp 15.500 / liter',
    cityAvg: 'Rp 16.000 / liter',
    trend: '0.0% Stabil',
    trendType: 'flat',
    status: 'Wajar',
    statusBadge: 'bg-gray-100 text-gray-700 border-gray-200',
  },
  {
    name: 'Telur Ayam Ras',
    quality: 'Segar peternak lokal',
    lowestMarket: 'Pasar Kebon Kembang',
    lowestPrice: 'Rp 27.500 / kg',
    cityAvg: 'Rp 28.200 / kg',
    trend: '-1.5%',
    trendType: 'down',
    status: 'Murah',
    statusBadge: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  },
  {
    name: 'Beras Medium (IR 64)',
    quality: 'Pulen Cianjur',
    lowestMarket: 'Pasar Gunung Batu',
    lowestPrice: 'Rp 13.000 / kg',
    cityAvg: 'Rp 13.500 / kg',
    trend: '0.0% Stabil',
    trendType: 'flat',
    status: 'Wajar',
    statusBadge: 'bg-gray-100 text-gray-700 border-gray-200',
  },
];

export function MarketTableStage() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="rounded-3xl bg-[#F0F9FF] border border-[#BAE6FD]/70 p-6 sm:p-12">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-[11px] font-bold text-sky-800 uppercase tracking-wider">
            Pantauan Komoditas Strategis
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-950 mt-2 tracking-tight">
            Harga Terkini Komoditas Pokok Pasar Wilayah
          </h2>
          <p className="text-xs sm:text-sm text-sky-900/80 mt-2 leading-relaxed">
            Pantauan langsung dari pasar-pasar tradisional utama: Pasar Kebon Kembang, Pasar Anyar, Pasar Sukasari, Pasar Gunung Batu, dan Pasar Jambu Dua.
          </p>
        </div>

        <div className="mt-8 bg-white rounded-2xl border border-sky-100 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50/70 border-b border-gray-100 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Komoditas</th>
                  <th className="py-3 px-4">Pasar Termurah</th>
                  <th className="py-3 px-4">Rata-Rata Kota</th>
                  <th className="py-3 px-4 text-center">Tren 7 Hari</th>
                  <th className="py-3 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {ROWS.map((row) => (
                  <tr key={row.name} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-gray-900">
                      <div>{row.name}</div>
                      <div className="text-[10px] text-gray-400 font-normal">{row.quality}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-emerald-800 tabular-nums">{row.lowestPrice}</div>
                      <div className="text-[10px] text-gray-500">{row.lowestMarket}</div>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-gray-900 tabular-nums">
                      {row.cityAvg}
                    </td>
                    <td className="py-3.5 px-4 text-center tabular-nums">
                      <span
                        className={`inline-flex items-center gap-1 font-semibold text-[11px] ${
                          row.trendType === 'down'
                            ? 'text-emerald-700'
                            : row.trendType === 'up'
                            ? 'text-amber-700'
                            : 'text-gray-600'
                        }`}
                      >
                        {row.trendType === 'down' && '📉'}
                        {row.trendType === 'up' && '📈'}
                        {row.trendType === 'flat' && '➖'}
                        {row.trend}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold border ${row.statusBadge}`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-gray-50/60 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
            <span>Menampilkan 6 komoditas strategis. Total 32 komoditas terpantau harian.</span>
            <Link
              href="/dashboard"
              className="font-bold text-gray-900 hover:text-emerald-700 transition-colors"
            >
              Buka Data Lengkap di Dashboard →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
