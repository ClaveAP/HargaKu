import Image from 'next/image';
import Link from 'next/link';

export function MarketMapStage() {
  return (
    <section id="peta" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="rounded-3xl bg-[#FEFCE8] border border-[#FEF08A]/70 p-6 sm:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm aspect-square rounded-2xl overflow-hidden bg-white shadow-sm border border-yellow-200/60">
              <Image
                src="/images/peta-pasar-clay.jpg"
                alt="Model 3D Clay Peta Sebaran Pasar Tradisional"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </div>
          </div>

          <div className="lg:col-span-7 space-y-5">
            <div>
              <span className="text-[11px] font-bold text-yellow-800 uppercase tracking-wider">
                Peta Pasar Tradisional
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-950 mt-2 tracking-tight leading-tight">
                Bandingkan harga pasar terdekat sebelum berangkat belanja.
              </h2>
              <p className="text-xs sm:text-sm text-gray-700 mt-2.5 leading-relaxed">
                Tiap pasar memiliki keunggulan pasokan yang berbeda. Pantau sebaran harga komoditas strategis secara spasial untuk menentukan rute belanja yang paling hemat waktu dan ongkos.
              </p>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/90 border border-yellow-200/80 shadow-2xs">
                <div>
                  <div className="font-bold text-gray-950">Pasar Kebon Kembang</div>
                  <div className="text-[11px] text-gray-500">Sentra Cabai &amp; Sayur Mayur · 1.2 km</div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0] tabular-nums">
                  Cabai Rp 48.000 / kg
                </span>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/90 border border-yellow-200/80 shadow-2xs">
                <div>
                  <div className="font-bold text-gray-950">Pasar Anyar</div>
                  <div className="text-[11px] text-gray-500">Sentra Bumbu Dapur &amp; Bawang Brebes · 1.8 km</div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-white text-gray-900 border border-gray-200 tabular-nums">
                  Bawang Rp 34.000 / kg
                </span>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/90 border border-yellow-200/80 shadow-2xs">
                <div>
                  <div className="font-bold text-gray-950">Pasar Sukasari</div>
                  <div className="text-[11px] text-gray-500">Sentra Daging Sapi &amp; Unggas Segar · 2.4 km</div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-white text-gray-900 border border-gray-200 tabular-nums">
                  Daging Rp 135.000 / kg
                </span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/cek-harga"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[#0F172A] hover:bg-black text-white text-xs sm:text-sm font-bold shadow-xs transition-colors"
              >
                Buka Peta Interaktif &amp; Rute Belanja →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
