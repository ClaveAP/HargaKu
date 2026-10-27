'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import {
  NavigationArrow,
  ArrowSquareOut,
} from '@phosphor-icons/react';
import { PetaMarketPrice } from './peta-data';
import { formatRupiah } from '@/lib/utils';

const LeafletMarketMap = dynamic(
  () => import('@/components/common/LeafletMarketMap'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[460px] bg-[#FAF9F5] flex items-center justify-center text-[#8C8B85] text-[13px] font-medium animate-pulse">
        Memuat Peta Spasial Pasar Tradisional...
      </div>
    ),
  }
);

interface Props {
  markets: PetaMarketPrice[];
  selectedMarketId: string;
  onSelectMarket: (id: string) => void;
  commodityName: string;
  commoditySlug: string;
}

export function PetaSpatialStage({
  markets,
  selectedMarketId,
  onSelectMarket,
  commoditySlug,
}: Props) {
  const selectedMarket =
    markets.find((m) => m.marketId === selectedMarketId) || markets[0];

  const mapItems = markets.map((m) => ({
    id: m.marketId,
    name: m.name,
    shortName: m.shortName,
    latitude: m.latitude,
    longitude: m.longitude,
    priceText: formatRupiah(m.price),
    status: m.status,
    address: m.address,
  }));

  const mapCenter: [number, number] = selectedMarket && selectedMarket.latitude
    ? [selectedMarket.latitude, selectedMarket.longitude]
    : markets[0] && markets[0].latitude
    ? [markets[0].latitude, markets[0].longitude]
    : [-6.208763, 106.845599];

  return (
    <div className="relative w-full rounded-[24px] bg-[#FAF9F5] outline outline-1 outline-[#E5E3DE] overflow-hidden min-h-[560px] sm:min-h-[620px] flex flex-col justify-between p-3.5 sm:p-5 shadow-xs">
      {/* Interactive Leaflet Map Canvas (Full Stage Background) */}
      <div className="absolute inset-0 z-0">
        <LeafletMarketMap
          markets={mapItems}
          activeMarketId={selectedMarketId}
          onSelectMarket={onSelectMarket}
          center={mapCenter}
          zoom={13}
          className="w-full h-full"
        />
      </div>

      {/* Top Floating Control Bar: Legend & Active View Mode */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-[14px] outline outline-1 outline-[#E5E3DE] shadow-sm max-w-fit">
        <div className="flex items-center gap-2 text-[12px] text-[#6E6D67]">
          <span className="font-semibold text-[#1B1A18]">Pantauan Spasial:</span>
          <span>Titik Pasar &amp; Lapak Terpetakan</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold text-[#8E8D86]">
            Indikator:
          </span>
          <span className="text-[11px] font-bold text-[#15803D] bg-[#F4FDF4] px-2 py-0.5 rounded-full outline outline-1 outline-[#DCFCE7]">
            Harga Terkini Lapak
          </span>
        </div>
      </div>

      {/* Spacer to let user interact with map in center */}
      <div className="pointer-events-none flex-1 min-h-[180px]" />

      {/* Bottom Floating Market Card */}
      {selectedMarket && (
        <div className="relative z-10 bg-white/95 backdrop-blur-md rounded-[18px] outline outline-1 outline-[#E5E3DE] p-4 sm:p-5 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4 animate-in fade-in duration-200">
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
                  Termurah {selectedMarket.diffPercent}% vs Rerata Wilayah
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
                Rerata: <strong className="text-[#1B1A18] font-semibold">{formatRupiah(selectedMarket.regionalAvgPrice ?? selectedMarket.price)}</strong>
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
