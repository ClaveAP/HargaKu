'use client';

import {
  ShieldCheck,
  Plant,
  Truck,
  Storefront,
} from '@phosphor-icons/react';
import { useRegion } from '@/lib/store/region-store';

export function ClaySupplyChainSection() {
  const { selectedRegion } = useRegion();

  return (
    <section
      id="rantai-pasok"
      className="w-full bg-[#FAF9F5] py-20 px-4 sm:px-8 lg:px-12 border-b border-[#E5E3DE]/70"
    >
      <div className="max-w-[1240px] mx-auto flex flex-col gap-10">
        {/* Header Row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="flex flex-col gap-4">
            <div className="inline-flex items-center px-3.5 py-1.5 bg-white outline outline-1 outline-[#E5E3DE] rounded-full text-[12px] font-medium text-[#1B1A18] w-fit shadow-xs">
              <span>Anatomi Rantai Pasok Pangan · {selectedRegion.name}</span>
            </div>

            <h2 className="text-[32px] sm:text-[40px] lg:text-[44px] font-medium text-[#1B1A18] leading-[1.12] tracking-tight max-w-[640px] text-balance">
              Dari sentra panen hingga ke timbangan meja lapak.
            </h2>
          </div>

          <p className="text-[14px] sm:text-[15px] text-[#6E6D67] leading-[1.6] max-w-[480px]">
            Harga komoditas sering melonjak bukan karena pasokan langka, melainkan
            rantai distribusi yang tidak transparan. HargaKu memetakan simpul
            pangan {selectedRegion.name} agar warga memahami pembagian margin yang sehat.
          </p>
        </div>

        {/* 3-Stage Supply Pipeline Stream */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
          {/* Stage 1: Petani */}
          <div className="flex flex-col justify-between p-6 rounded-[18px] bg-white outline outline-1 outline-[#E5E3DE] gap-6 shadow-xs">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#FF7714] uppercase tracking-wider px-2 py-0.5 rounded-[4px] bg-[#FFF3ED] outline outline-1 outline-[#FCC9AB]">
                  <Plant size={13} weight="bold" />
                  <span>01 · Hulu Petani</span>
                </span>
                <span className="text-[11px] font-medium text-[#8C8B85]">
                  Sentra Kebun Petani
                </span>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-[28px] font-bold text-[#1B1A18] tabular-nums">
                  Rp 35.000
                </span>
                <span className="text-[13px] text-[#8C8B85]">/ kg</span>
              </div>

              <p className="text-[13px] text-[#6E6D67] leading-[20px]">
                Harga dasar panen cabai merah dari petani. Mencakup biaya benih,
                pupuk subsidi, pemeliharaan lahan, dan ongkos petik buruh tani.
              </p>
            </div>

            <div className="pt-4 border-t border-[#E5E3DE] flex items-center justify-between text-[11px]">
              <span className="text-[#8C8B85]">Porsi dari harga akhir</span>
              <span className="font-semibold text-[#1B1A18]">72.9%</span>
            </div>
          </div>

          {/* Stage 2: Grosir Pasar Induk */}
          <div className="flex flex-col justify-between p-6 rounded-[18px] bg-white outline outline-1 outline-[#E5E3DE] gap-6 shadow-xs">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#1B1A18] uppercase tracking-wider px-2 py-0.5 rounded-[4px] bg-[#F4F3F0] outline outline-1 outline-[#E5E3DE]">
                  <Truck size={13} weight="bold" />
                  <span>02 · Grosir Dini Hari</span>
                </span>
                <span className="text-[11px] font-medium text-[#8C8B85]">
                  Pasar Induk Distribusi · 02:00 WIB
                </span>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-[28px] font-bold text-[#1B1A18] tabular-nums">
                  Rp 42.000
                </span>
                <span className="text-[13px] text-[#8C8B85]">/ kg</span>
              </div>

              <p className="text-[13px] text-[#6E6D67] leading-[20px]">
                Titik konsolidasi armada pickup antarkota. Tambahan +Rp 7.000/kg
                menutup ongkos bensin, susut bobot sayur selama transit, dan margin grosir.
              </p>
            </div>

            <div className="pt-4 border-t border-[#E5E3DE] flex items-center justify-between text-[11px]">
              <span className="text-[#8C8B85]">Selisih logistik &amp; grosir</span>
              <span className="font-semibold text-[#FF7714]">+14.6%</span>
            </div>
          </div>

          {/* Stage 3: Lapak Eceran Pasar */}
          <div className="flex flex-col justify-between p-6 rounded-[18px] bg-white outline outline-1 outline-[#E5E3DE] gap-6 shadow-xs">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#1B1A18] uppercase tracking-wider px-2 py-0.5 rounded-[4px] bg-[#EEF773] outline outline-1 outline-[#1B1A18]">
                  <Storefront size={13} weight="bold" />
                  <span>03 · Meja Lapak Eceran</span>
                </span>
                <span className="text-[11px] font-medium text-[#8C8B85]">
                  05:00 WIB s/d Siang
                </span>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-[28px] font-bold text-[#1B1A18] tabular-nums">
                  Rp 48.000
                </span>
                <span className="text-[13px] text-[#8C8B85]">/ kg</span>
              </div>

              <p className="text-[13px] text-[#6E6D67] leading-[20px]">
                Harga riil di meja pedagang pasar tradisional. Tambahan wajar +Rp 6.000/kg menutup biaya sewa kios harian, risiko susut mutu sayur, dan laba bersih pedagang.
              </p>
            </div>

            <div className="pt-4 border-t border-[#E5E3DE] flex items-center justify-between text-[11px]">
              <span className="text-[#8C8B85]">Margin eceran lapak</span>
              <span className="font-semibold text-[#1B1A18]">+12.5%</span>
            </div>
          </div>
        </div>

        {/* Margin Audit Bar (Educational Gauge) */}
        <div className="p-6 rounded-[18px] bg-white outline outline-1 outline-[#E5E3DE] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
          <div className="flex flex-col gap-2 max-w-[620px]">
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} weight="fill" className="text-[#FF7714]" />
              <span className="text-[13px] font-semibold text-[#1B1A18]">
                Evaluasi TPID: Akumulasi Margin 37.1% (Toleransi Maks. 40%)
              </span>
            </div>
            <p className="text-[12px] text-[#6E6D67] leading-[18px]">
              Penyebaran margin dari petani ke konsumen akhir terbukti proporsional tanpa lonjakan sepihak
              tengkulak. Bila akumulasi margin melebihi 40%, sistem otomatis memicu peringatan intervensi pasar.
            </p>
          </div>

          {/* Visual Percentage Strip */}
          <div className="w-full md:w-[360px] flex flex-col gap-2">
            <div className="w-full h-3 rounded-full bg-[#F4F3F0] outline outline-1 outline-[#E5E3DE] overflow-hidden flex">
              <div className="h-full bg-[#1B1A18]" style={{ width: '73%' }} title="Petani 72.9%" />
              <div className="h-full bg-[#FF7714]" style={{ width: '15%' }} title="Logistik 14.6%" />
              <div className="h-full bg-[#EEF773]" style={{ width: '12%' }} title="Lapak 12.5%" />
            </div>

            <div className="flex items-center justify-between text-[10px] text-[#6E6D67] font-medium">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1B1A18]" />
                <span>Petani 73%</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF7714]" />
                <span>Logistik 15%</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#EEF773] outline outline-[0.5px] outline-[#1B1A18]" />
                <span>Lapak 12%</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
