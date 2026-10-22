import { Scale, Building2, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function ThreeLayersSection() {
  return (
    <section id="rantai-pasok" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 border-t border-zinc-100">
      <div className="max-w-3xl space-y-3 mb-12 sm:mb-16">
        <h2 className="font-display text-2xl sm:text-4xl font-semibold tracking-tight text-zinc-950">
          Transparansi Tiga Lapis Harga.
        </h2>
        <p className="text-sm sm:text-base text-zinc-500 leading-relaxed">
          HargaKu tidak berspekulasi tentang harga yang seharusnya. Kami memetakan deviasi antar tiga lapisan data objektif untuk menghadirkan panduan belanja yang adil bagi pembeli dan pedagang.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl border border-zinc-200/80 bg-white hover:border-zinc-300 transition-all flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="w-9 h-9 rounded-lg bg-zinc-100 text-zinc-900 flex items-center justify-center">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] font-semibold text-zinc-600 uppercase tracking-wider">
                Lapis 1
              </div>
              <h3 className="text-base font-semibold text-zinc-950 mt-1">
                Harga Acuan Pemerintah
              </h3>
              <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
                Penetapan Harga Acuan Penjualan (HAP) dan Harga Eceran Tertinggi (HET) dari Badan Pangan Nasional sebagai pagar normatif harga komoditas.
              </p>
            </div>
          </div>
          <div className="pt-4 border-t border-zinc-100 text-[11px] text-zinc-600 font-mono">
            Sumber: Perbadan Bapanas RI
          </div>
        </div>

        <div className="p-6 rounded-2xl border border-zinc-200/80 bg-white hover:border-zinc-300 transition-all flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="w-9 h-9 rounded-lg bg-zinc-100 text-zinc-900 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] font-semibold text-zinc-600 uppercase tracking-wider">
                Lapis 2
              </div>
              <h3 className="text-base font-semibold text-zinc-950 mt-1">
                Survei Pasar Resmi
              </h3>
              <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
                Rata-rata survei berkala dari PIHPS Bank Indonesia dan Panel Pangan di pasar tradisional utama Kota Bogor untuk menangkap tren makro.
              </p>
            </div>
          </div>
          <div className="pt-4 border-t border-zinc-100 text-[11px] text-zinc-600 font-mono">
            Sumber: PIHPS Bank Indonesia
          </div>
        </div>

        <div className="p-6 rounded-2xl border border-zinc-200/80 bg-white hover:border-zinc-300 transition-all flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider">
                Lapis 3
              </div>
              <h3 className="text-base font-semibold text-zinc-950 mt-1">
                Laporan Partisipasi Warga
              </h3>
              <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
                Harga transaksi riil di kios pasar yang dilaporkan warga, dihitung nilai median (tengah) untuk meredam potensi manipulasi outlier ekstrem.
              </p>
            </div>
          </div>
          <div className="pt-4 border-t border-zinc-100 text-[11px] text-emerald-800 font-mono">
            Metode: Median MAD Terverifikasi
          </div>
        </div>
      </div>

      <div className="mt-8 p-6 sm:p-8 rounded-2xl border border-zinc-200/80 bg-zinc-50/50">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-zinc-950">
              Uji Deviasi &amp; Toleransi Harga Pasar
            </h4>
            <p className="text-xs text-zinc-500 max-w-xl">
              HargaKu mengklasifikasikan status harga: <span className="text-emerald-700 font-medium">Wajar (±10%)</span>, <span className="text-amber-700 font-medium">Agak Mahal (+10% s.d. +25%)</span>, <span className="text-rose-700 font-medium">Terlalu Mahal (&gt;+25%)</span>, dan <span className="text-blue-700 font-medium">Jauh Lebih Murah (&lt;-15%)</span>.
            </p>
          </div>

          <Link
            href="/cek-harga"
            className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-950 hover:text-emerald-700 shrink-0 transition-colors"
          >
            <span>Buka Kalkulator Cek Wajar</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
