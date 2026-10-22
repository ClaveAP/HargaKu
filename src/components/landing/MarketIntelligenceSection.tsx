import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, MapPin } from 'lucide-react';

const MARKETS = [
  {
    name: 'Pasar Kebon Kembang',
    spec: 'Sentra Sayur Mayur & Cabai',
    distance: '1.2 km dari pusat kota',
    leadCommodity: 'Cabai Rp 48.000 / kg',
  },
  {
    name: 'Pasar Anyar',
    spec: 'Sentra Bumbu Dapur & Bawang Brebes',
    distance: '1.8 km dari pusat kota',
    leadCommodity: 'Bawang Rp 34.000 / kg',
  },
  {
    name: 'Pasar Bogor (Sukasari)',
    spec: 'Sentra Daging Sapi & Unggas Segar',
    distance: '2.4 km dari pusat kota',
    leadCommodity: 'Daging Rp 135.000 / kg',
  },
  {
    name: 'Pasar Gunung Batu',
    spec: 'Sentra Beras & Sembako Murah',
    distance: '3.1 km dari pusat kota',
    leadCommodity: 'Beras Rp 13.000 / kg',
  },
];

export function MarketIntelligenceSection() {
  return (
    <section id="peta-pasar" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 border-t border-zinc-100">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden border border-zinc-200/80 bg-zinc-50 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
            <Image
              src="/images/peta-pasar-clay.jpg"
              alt="Model Topografi Pasar Tradisional Kota Bogor"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 450px"
            />
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-950">
              Bandingkan harga pasar terdekat sebelum berangkat belanja.
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed">
              Tiap pasar di Kota Bogor memiliki dinamika pasokan yang berbeda. Pantau sebaran harga komoditas strategis secara spasial untuk menentukan rute belanja yang paling hemat waktu dan ongkos.
            </p>
          </div>

          <div className="space-y-2.5">
            {MARKETS.map((m) => (
              <div
                key={m.name}
                className="flex items-center justify-between p-3.5 rounded-xl border border-zinc-200/80 bg-white hover:border-zinc-300 transition-colors text-xs"
              >
                <div className="space-y-0.5">
                  <div className="font-semibold text-zinc-950 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
                    <span>{m.name}</span>
                  </div>
                  <div className="text-[11px] text-zinc-500 pl-5">
                    {m.spec} · {m.distance}
                  </div>
                </div>

                <div className="text-[11px] font-semibold text-zinc-900 px-2.5 py-1 rounded-md bg-zinc-50 border border-zinc-200/60 tabular-nums">
                  {m.leadCommodity}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-medium transition-colors shadow-xs"
            >
              <span>Eksplorasi Perbandingan Pasar di Dashboard</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
