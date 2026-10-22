export function SupplyChainStages() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="rounded-3xl bg-[#FFF7ED] border border-[#FFEDD5] p-6 sm:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-[11px] font-bold text-orange-600 uppercase tracking-wider">
                Transparansi Tiga Tingkat Harga
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-950 mt-2 tracking-tight leading-tight">
                Ketahui margin harga dari petani hingga ke lapak pasar.
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-3 leading-relaxed">
                Harga pangan sering melonjak bukan karena kelangkaan pasokan, melainkan rantai distribusi yang tidak terlihat. HargaKu memetakan 3 lapisan harga secara terbuka agar masyarakat dan pedagang tahu batas toleransi harga yang sehat.
              </p>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-white/80 border border-orange-100 flex items-start gap-3">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-orange-100 text-orange-800 shrink-0 mt-0.5">
                  01 · HULU
                </span>
                <div>
                  <h3 className="text-xs font-bold text-gray-900">Tingkat Produsen / Petani</h3>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    Harga dasar panen langsung dari sentra pertanian Jawa Barat &amp; nasional.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/80 border border-orange-100 flex items-start gap-3">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-orange-100 text-orange-800 shrink-0 mt-0.5">
                  02 · GROSIR
                </span>
                <div>
                  <h3 className="text-xs font-bold text-gray-900">Pasar Induk TU Kemang</h3>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    Titik konsolidasi komoditas sebelum masuk ke pedagang lapak eceran kota.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/80 border border-orange-100 flex items-start gap-3">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 shrink-0 mt-0.5">
                  03 · ECERAN
                </span>
                <div>
                  <h3 className="text-xs font-bold text-gray-900">Lapak 5 Pasar Tradisional</h3>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    Harga riil yang dihadapi pembeli di Pasar Anyar, Kebon Kembang, Sukasari, dll.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-white rounded-2xl border border-orange-100/80 p-5 sm:p-7 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-gray-950">Struktur Margin Rantai Pasok</h3>
                <span className="text-[11px] text-gray-400">Cabai Merah Keriting</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-orange-50 text-orange-700">
                Data Hari Ini
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-100">
                <div>
                  <div className="font-bold text-gray-900">Petani Sentra Cianjur</div>
                  <div className="text-[11px] text-gray-500">HPP benih, pupuk &amp; tenaga kerja panen</div>
                </div>
                <div className="font-extrabold text-gray-950 text-sm tabular-nums">
                  Rp 35.000 / kg
                </div>
              </div>

              <div className="text-[11px] text-gray-500 px-3 py-1 font-medium bg-gray-50/50 rounded flex items-center gap-1.5">
                <span>+ Rp 7.000 / kg (Logistik antar-kota, susut panen &amp; margin grosir +20.0%)</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-100">
                <div>
                  <div className="font-bold text-gray-900">Pasar Induk TU Kemang (Grosir)</div>
                  <div className="text-[11px] text-gray-500">Harga kulak pedagang lapak eceran kota</div>
                </div>
                <div className="font-extrabold text-gray-950 text-sm tabular-nums">
                  Rp 42.000 / kg
                </div>
              </div>

              <div className="text-[11px] text-gray-500 px-3 py-1 font-medium bg-gray-50/50 rounded flex items-center gap-1.5">
                <span>+ Rp 6.000 / kg (Operasional lapak, sewa, sortir &amp; laba bersih eceran +14.3%)</span>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-lg bg-emerald-50/80 border border-emerald-200">
                <div>
                  <div className="font-bold text-emerald-950">Konsumen Akhir (Pasar Kebon Kembang)</div>
                  <div className="text-[11px] text-emerald-800">Harga transaksi eceran terverifikasi di lapak</div>
                </div>
                <div className="font-black text-emerald-900 text-sm tabular-nums">
                  Rp 48.000 / kg
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200/80 space-y-1">
              <div className="text-[11px] font-extrabold text-emerald-900 uppercase tracking-wider">
                Status: Margin Sehat &amp; Wajar
              </div>
              <p className="text-[11px] text-emerald-800 leading-relaxed">
                Akumulasi margin rantai pasok 37.1% berada dalam zona toleransi aman TPID Kota Bogor (maksimal 40%).
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
