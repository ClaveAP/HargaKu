import {
  Scales,
  ChartBar,
  ShieldCheck,
  CheckCircle,
  WarningCircle,
  Info,
} from '@phosphor-icons/react/dist/ssr';

export function AboutMethodologySection() {
  return (
    <section id="metodologi" className="space-y-6 scroll-mt-24">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-1 border-b border-[#E5E3DE]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Scales size={18} weight="bold" className="text-[#FF7714]" />
            <span className="text-[11px] font-bold text-[#FF7714] uppercase tracking-wider">
              Algoritma &amp; Statistik
            </span>
          </div>
          <h2 className="text-[22px] sm:text-[24px] font-medium text-[#1B1A18] tracking-tight">
            Metodologi 3 Lapis Harga &amp; Filter Anomali MAD
          </h2>
        </div>
        <div className="text-[12px] text-[#6E6D67]">
          Standar evaluasi harga objektif dan tahan manipulasi
        </div>
      </div>

      {/* 3 Lapis Penentuan Harga Acuan */}
      <div className="bg-white rounded-[24px] outline outline-1 outline-[#E5E3DE] p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <h3 className="text-[18px] font-bold text-[#1B1A18]">
            1. Hirarki Penentuan Harga Pembanding (Fallback Waterfall)
          </h3>
          <p className="text-[13px] text-[#6E6D67] mt-1 leading-relaxed">
            HargaKu menggunakan sistem bertingkat adaptif. Jika data tingkat lokal belum mencukupi batas minimum, sistem otomatis berpindah ke acuan lapis berikutnya tanpa halusinasi data.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-[16px] bg-[#FAF9F5] outline outline-1 outline-[#E5E3DE] space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#1B1A18] bg-white px-2 py-0.5 rounded-full outline outline-1 outline-[#E5E3DE]">
                Lapis 1 · Prioritas Utama
              </span>
              <span className="text-[11px] font-bold text-[#15803D]">
                Akurasi 95%
              </span>
            </div>
            <h4 className="text-[14px] font-bold text-[#1B1A18]">
              Median Laporan Warga Lapak
            </h4>
            <p className="text-[12px] text-[#6E6D67] leading-relaxed">
              Dihitung dari nilai tengah (median) minimal 3 laporan terverifikasi struk/nota di pasar spesifik dalam 7 hari terakhir.
            </p>
          </div>

          <div className="p-4 rounded-[16px] bg-[#FAF9F5] outline outline-1 outline-[#E5E3DE] space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6E6D67] bg-white px-2 py-0.5 rounded-full outline outline-1 outline-[#E5E3DE]">
                Lapis 2 · Fallback 1
              </span>
              <span className="text-[11px] font-bold text-[#1B1A18]">
                Akurasi 80%
              </span>
            </div>
            <h4 className="text-[14px] font-bold text-[#1B1A18]">
              Rerata Kota PIHPS BI
            </h4>
            <p className="text-[12px] text-[#6E6D67] leading-relaxed">
              Digunakan jika laporan warga lapak belum mencapai kuorum 3 laporan, mengacu pada survei resmi harian pedagang Kota Bogor.
            </p>
          </div>

          <div className="p-4 rounded-[16px] bg-[#FAF9F5] outline outline-1 outline-[#E5E3DE] space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6E6D67] bg-white px-2 py-0.5 rounded-full outline outline-1 outline-[#E5E3DE]">
                Lapis 3 · Fallback 2
              </span>
              <span className="text-[11px] font-bold text-[#6E6D67]">
                Acuan Plafon
              </span>
            </div>
            <h4 className="text-[14px] font-bold text-[#1B1A18]">
              HAP Resmi Bapanas
            </h4>
            <p className="text-[12px] text-[#6E6D67] leading-relaxed">
              Batas plafon regulasi nasional pemerintah sebagai jangkar batas atas toleransi ketika komoditas mengalami anomali pasokan.
            </p>
          </div>
        </div>

        {/* Formula MAD Explainer */}
        <div className="p-5 rounded-[18px] bg-[#FAF9F5] outline outline-1 outline-[#E5E3DE] space-y-3">
          <div className="flex items-center gap-2">
            <ChartBar size={18} weight="bold" className="text-[#FF7714]" />
            <h4 className="text-[14px] font-bold text-[#1B1A18]">
              2. Mengapa Memakai Median Absolute Deviation (MAD), Bukan Rata-Rata (Mean)?
            </h4>
          </div>
          <p className="text-[13px] text-[#6E6D67] leading-relaxed">
            Rata-rata aritmatika biasa (<code className="text-[#1B1A18] font-mono bg-white px-1.5 py-0.5 rounded text-[12px]">Mean</code>) sangat rapuh terhadap angka ekstrem (contoh: jika ada pengguna jahil menginput harga cabai Rp 1.000.000, rata-rata pasar akan rusak seketika). 
            HargaKu menerapkan <strong className="text-[#1B1A18]">Median &amp; Deteksi MAD</strong>:
          </p>
          <div className="p-3 bg-white rounded-[12px] outline outline-1 outline-[#E5E3DE] font-mono text-[12px] text-[#1B1A18] overflow-x-auto">
            MAD = median(|x_i - median(X)|) &rarr; Batas Toleransi Anomali: deviasi &gt; 3 x MAD atau deviasi &gt; 300% HAP otomatis ditandai
          </div>
        </div>

        {/* 4 Status Bands */}
        <div className="space-y-3 pt-2">
          <h4 className="text-[14px] font-bold text-[#1B1A18]">
            3. Klasifikasi Status Kewajaran Harga
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-[14px] bg-[#FAF9F5] outline outline-1 outline-[#E5E3DE] space-y-1">
              <span className="inline-block px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#DCFCE7] text-[#15803D]">
                Wajar (Fair)
              </span>
              <div className="text-[12px] font-semibold text-[#1B1A18]">
                Rentang -10% s.d. +10%
              </div>
              <p className="text-[11px] text-[#6E6D67]">
                Harga berada dalam dinamika pasokan normal pasar harian.
              </p>
            </div>

            <div className="p-3.5 rounded-[14px] bg-[#FAF9F5] outline outline-1 outline-[#E5E3DE] space-y-1">
              <span className="inline-block px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#FFF3ED] text-[#FF7714]">
                Agak Mahal
              </span>
              <div className="text-[12px] font-semibold text-[#1B1A18]">
                Rentang +10% s.d. +25%
              </div>
              <p className="text-[11px] text-[#6E6D67]">
                Harga di atas rata-rata. Warga disarankan menawar sewajarnya.
              </p>
            </div>

            <div className="p-3.5 rounded-[14px] bg-[#FAF9F5] outline outline-1 outline-[#E5E3DE] space-y-1">
              <span className="inline-block px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#FFE4E6] text-[#BE123C]">
                Terlalu Mahal
              </span>
              <div className="text-[12px] font-semibold text-[#1B1A18]">
                Deviasi &gt; +25%
              </div>
              <p className="text-[11px] text-[#6E6D67]">
                Potensi lonjakan drastis. Disarankan cek kios lain atau pasar sebelah.
              </p>
            </div>

            <div className="p-3.5 rounded-[14px] bg-[#FAF9F5] outline outline-1 outline-[#E5E3DE] space-y-1">
              <span className="inline-block px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#EFF6FF] text-[#1D4ED8]">
                Jauh Lebih Murah
              </span>
              <div className="text-[12px] font-semibold text-[#1B1A18]">
                Deviasi &lt; -15%
              </div>
              <p className="text-[11px] text-[#6E6D67]">
                Harga sangat miring. Disarankan periksa kesegaran &amp; akurasi timbangan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
