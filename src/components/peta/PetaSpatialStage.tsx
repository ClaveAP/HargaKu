'use client';

import Link from 'next/link';
import {
  NavigationArrow,
  Storefront,
  ArrowSquareOut,
  Clock,
  ShieldCheck,
  Check,
} from '@phosphor-icons/react';
import { PetaMarketPrice } from './peta-data';
import { formatRupiah } from '@/lib/utils';

interface Props {
  markets: PetaMarketPrice[];
  selectedMarketId: string;
  onSelectMarket: (id: string) => void;
  commodityName: string;
  commoditySlug: string;
  visualIndicator: string;
}

export function PetaSpatialStage({
  markets,
  selectedMarketId,
  onSelectMarket,
  commodityName,
  commoditySlug,
  visualIndicator,
}: Props) {
  const selectedMarket =
    markets.find((m) => m.marketId === selectedMarketId) || markets[0];

  return (
    <div className="relative w-full rounded-[24px] bg-[#FAF9F5] outline outline-1 outline-[#E5E3DE] overflow-hidden min-h-[520px] sm:min-h-[580px] flex flex-col justify-between p-4 sm:p-6 shadow-xs">
      {/* Background SVG Grid & Bogor Geographical Landmarks */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="peta-grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="#E5E3DE"
              strokeWidth="0.8"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#peta-grid)" />

        {/* Ciliwung River abstraction */}
        <path
          d="M 280 -20 Q 340 160 380 260 T 430 480 Q 450 560 490 680"
          fill="none"
          stroke="#DCE5ED"
          strokeWidth="10"
          strokeLinecap="round"
        />
        {/* Cisadane River abstraction */}
        <path
          d="M 90 -20 Q 130 180 150 320 T 170 520 Q 180 620 200 700"
          fill="none"
          stroke="#E2ECF2"
          strokeWidth="8"
          strokeLinecap="round"
        />
        {/* Kebun Raya Bogor green abstraction */}
        <ellipse
          cx="48%"
          cy="53%"
          rx="68"
          ry="54"
          fill="#EEF5EB"
          stroke="#D4E3CE"
          strokeWidth="1.5"
        />
        <text
          x="48%"
          y="54%"
          textAnchor="middle"
          className="text-[10px] font-bold fill-[#52794D] tracking-wide"
        >
          KEBUN RAYA BOGOR
        </text>

        {/* Major Ring Roads */}
        <path
          d="M 120 280 L 680 340"
          stroke="#EBEAE5"
          strokeWidth="2.5"
          strokeDasharray="4 4"
        />
        <path
          d="M 380 80 L 460 620"
          stroke="#EBEAE5"
          strokeWidth="2.5"
          strokeDasharray="4 4"
        />
      </svg>

      {/* Top Map Bar: Legend & Active View Mode */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-[14px] outline outline-1 outline-[#E5E3DE] shadow-xs">
        <div className="flex items-center gap-2 text-[12px] text-[#6E6D67]">
          <span className="font-semibold text-[#1B1A18]">Wilayah Kota Bogor:</span>
          <span>5 Titik Pasar Pantauan TPID</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold text-[#8E8D86]">
            Indikator Aktif:
          </span>
          <span className="text-[11px] font-bold text-[#1B1A18] bg-[#FAF9F5] px-2.5 py-1 rounded-full outline outline-1 outline-[#E5E3DE]">
            {visualIndicator === 'price' ? 'Harga Terkini Lapak' : 'Ketersediaan Stok'}
          </span>
        </div>
      </div>

      {/* Interactive Map Pins */}
      <div className="relative z-10 w-full h-[360px] sm:h-[400px]">
        {markets.map((m) => {
          const isSelected = m.marketId === selectedMarketId;
          const isCheapest = m.status === 'cheaper';
          const isExpensive = m.status === 'expensive';

          return (
            <div
              key={m.marketId}
              style={{
                left: `${m.xPercent}%`,
                top: `${m.yPercent}%`,
                transform: 'translate(-50%, -50%)',
              }}
              className="absolute cursor-pointer transition-all duration-200"
              onClick={() => onSelectMarket(m.marketId)}
            >
              <div
                className={`flex flex-col items-center group ${
                  isSelected ? 'scale-110 z-30' : 'hover:scale-105 z-20'
                }`}
              >
                {/* Floating Price Pill Tag */}
                <div
                  className={`px-2.5 py-1 rounded-[8px] text-[11px] font-bold tabular-nums whitespace-nowrap shadow-sm mb-1.5 transition-all outline ${
                    isSelected
                      ? 'bg-[#1B1A18] text-white outline-[#1B1A18] ring-2 ring-[#1B1A18]/20'
                      : isCheapest
                      ? 'bg-[#EEF773] text-[#1B1A18] outline-[#1B1A18]'
                      : isExpensive
                      ? 'bg-[#FEE2E2] text-[#991B1B] outline-[#FECACA]'
                      : 'bg-white text-[#1B1A18] outline-[#E5E3DE]'
                  }`}
                >
                  <span className="hidden sm:inline mr-1 text-[10px] font-medium opacity-80">
                    {m.shortName}:
                  </span>
                  <span>{formatRupiah(m.price)}</span>
                </div>

                {/* Marker Button */}
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                    isSelected
                      ? 'bg-[#1B1A18] text-white shadow-md ring-4 ring-[#1B1A18]/15'
                      : isCheapest
                      ? 'bg-[#EEF773] text-[#1B1A18] outline outline-2 outline-[#1B1A18]'
                      : 'bg-white text-[#1B1A18] outline outline-1 outline-[#E5E3DE] shadow-xs'
                  }`}
                >
                  <Storefront size={18} weight={isSelected ? 'fill' : 'bold'} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Market Detail Popup Drawer / Box */}
      {selectedMarket && (
        <div className="relative z-20 bg-white rounded-[18px] outline outline-1 outline-[#E5E3DE] p-4 sm:p-5 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4 animate-in fade-in duration-200">
          <div className="flex flex-col gap-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[12px] font-semibold text-[#8E8D86] uppercase tracking-wide">
                {selectedMarket.district}
              </span>
              <span className="w-1 h-1 rounded-full bg-[#D1CFCA]" />
              <span className="text-[12px] text-[#6E6D67]">{selectedMarket.address}</span>
            </div>

            <div className="flex flex-wrap items-baseline gap-3">
              <h2 className="text-[20px] sm:text-[22px] font-bold text-[#1B1A18] tracking-tight">
                {selectedMarket.name}
              </h2>
              <div className="flex items-center gap-1.5">
                <span className="text-[22px] sm:text-[26px] font-bold text-[#1B1A18] tabular-nums tracking-tight">
                  {formatRupiah(selectedMarket.price)}
                </span>
                <span className="text-[13px] text-[#6E6D67]">/ kg</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-0.5">
              {selectedMarket.status === 'cheaper' && (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#EEF773] text-[#1B1A18] outline outline-1 outline-[#1B1A18]">
                  Termurah {selectedMarket.diffPercent}% vs Rerata Kota
                </span>
              )}
              {selectedMarket.status === 'average' && (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#F4F3F0] text-[#1B1A18] outline outline-1 outline-[#E5E3DE]">
                  Wajar ({selectedMarket.diffPercent > 0 ? `+${selectedMarket.diffPercent}%` : `${selectedMarket.diffPercent}%`})
                </span>
              )}
              {selectedMarket.status === 'expensive' && (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#FEE2E2] text-[#991B1B] outline outline-1 outline-[#FECACA]">
                  Tinggi (+{selectedMarket.diffPercent}%)
                </span>
              )}
              <span className="text-[12px] text-[#6E6D67]">
                Stok: <strong className="text-[#1B1A18] font-semibold">{selectedMarket.stock}</strong>
              </span>
              <span className="text-[12px] text-[#6E6D67]">
                · {selectedMarket.reportsCount} Laporan Warga
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-[#E5E3DE]">
            <a
              href={selectedMarket.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-4 rounded-[10px] bg-white outline outline-1 outline-[#E5E3DE] hover:bg-[#FAF9F5] text-[13px] font-semibold text-[#1B1A18] flex items-center gap-2 transition-colors shadow-xs"
            >
              <NavigationArrow size={16} weight="bold" />
              <span>Rute Maps</span>
            </a>
            <Link
              href={`/komoditas/${commoditySlug}`}
              className="py-2.5 px-4 rounded-[10px] bg-[#1B1A18] hover:bg-[#32312E] text-white text-[13px] font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <span>Detail Harga</span>
              <ArrowSquareOut size={16} weight="bold" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
