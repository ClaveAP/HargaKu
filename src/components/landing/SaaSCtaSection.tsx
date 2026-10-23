import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export function SaaSCtaSection() {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <div className="rounded-3xl border border-zinc-200/90 bg-gradient-to-b from-zinc-50/80 to-white p-8 sm:p-14 space-y-6 shadow-xs">
        <div className="space-y-3 max-w-2xl mx-auto">
          <h2 className="font-display text-2xl sm:text-4xl font-semibold tracking-tight text-zinc-950">
            Wujudkan transparansi pangan dari meja belanja kita.
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed">
            Akses seluruh data pergerakan harga komoditas di pasar-pasar tradisional secara terbuka, atau bagikan temuan harga riil dari lapak pedagang untuk membantu sesama pembeli.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-semibold shadow-xs transition-colors"
          >
            <span>Buka Dashboard Sekarang</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
          </Link>
          <Link
            href="/cek-harga"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white hover:bg-zinc-50 border border-zinc-200 text-zinc-800 text-xs font-medium transition-colors"
          >
            <span>Uji Coba Cek Harga Wajar</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
