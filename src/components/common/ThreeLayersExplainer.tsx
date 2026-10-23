import { Scale, Building2, Users } from 'lucide-react';

export function ThreeLayersExplainer() {
  return (
    <section className="py-12 bg-white border-y border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full">
            Metodologi HargaKu
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Bagaimana HargaKu Menilai Kewajaran?
          </h2>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            HargaKu tidak menentukan &ldquo;harga mutlak&rdquo;, melainkan memadukan tiga lapisan data objektif untuk
            memberikan panduan belanja yang adil bagi pembeli dan pedagang.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="mt-4 font-bold text-gray-900 text-base">Lapis 1: Harga Acuan Pemerintah</h3>
              <p className="mt-2 text-xs sm:text-sm text-gray-600 leading-relaxed">
                HAP (Harga Acuan Penjualan) dan HET (Harga Eceran Tertinggi) resmi dari Badan Pangan Nasional sebagai batas batas kewajaran normatif.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-200/60 text-[11px] font-medium text-emerald-800">
              Sumber: Perbadan Bapanas RI
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="mt-4 font-bold text-gray-900 text-base">Lapis 2: Survei Pasar Resmi</h3>
              <p className="mt-2 text-xs sm:text-sm text-gray-600 leading-relaxed">
                Rata-rata survei berkala dari PIHPS Bank Indonesia dan Panel Bapanas di pasar-pasar tradisional daerah.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-200/60 text-[11px] font-medium text-blue-800">
              Sumber: PIHPS Bank Indonesia
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="mt-4 font-bold text-gray-900 text-base">Lapis 3: Laporan Riil Warga</h3>
              <p className="mt-2 text-xs sm:text-sm text-gray-600 leading-relaxed">
                Harga transaksi riil di level kios pasar yang dilaporkan masyarakat dan dihitung nilai tengahnya (median) untuk mencegah bias.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-emerald-200/60 text-[11px] font-medium text-emerald-800">
              Crowdsourcing Terverifikasi
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
