import Link from 'next/link';

export function ClayCtaSection() {
  return (
    <section id="lapor" className="max-w-4xl mx-auto px-4 sm:px-6 py-12 text-center space-y-6">
      <span className="text-[11px] font-bold text-orange-600 uppercase tracking-wider block">
        Transparansi Pangan Publik
      </span>
      <h2 className="text-3xl sm:text-4xl font-black text-gray-950 tracking-tight leading-tight">
        Wujudkan transparansi pangan dari meja belanja kita.
      </h2>
      <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto leading-relaxed">
        Akses seluruh data pergerakan harga komoditas di pasar-pasar tradisional tanpa biaya, atau laporkan perbedaan harga langsung dari lapak untuk membantu sesama pembeli.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <Link
          href="/dashboard"
          className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#E6F85E] hover:bg-[#d8ea4f] text-gray-950 font-black text-xs sm:text-sm shadow-xs transition-colors"
        >
          Buka Dashboard Sekarang →
        </Link>
        <Link
          href="/cek-harga"
          className="w-full sm:w-auto px-6 py-3 rounded-full bg-white hover:bg-gray-50 border border-gray-200 text-gray-800 font-bold text-xs sm:text-sm transition-colors"
        >
          Laporkan Harga Pedagang
        </Link>
      </div>
    </section>
  );
}
