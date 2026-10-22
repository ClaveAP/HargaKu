'use client';

import { NavigationArrow, CheckCircle, Warning } from '@phosphor-icons/react';
import { PetaMarketPrice } from './peta-data';
import { formatRupiah } from '@/lib/utils';

interface Props {
  markets: PetaMarketPrice[];
  selectedMarketId: string;
  onSelectMarket: (id: string) => void;
  commodityName: string;
}

export function PetaMarketRankTable({
  markets,
  selectedMarketId,
  onSelectMarket,
  commodityName,
}: Props) {
  // Sort markets from lowest price to highest
  const sortedMarkets = [...markets].sort((a, b) => a.price - b.price);

  return (
    <div className="bg-white rounded-[20px] outline outline-1 outline-[#E5E3DE] p-5 sm:p-6 shadow-xs flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#E5E3DE]">
        <div>
          <h2 className="text-[17px] font-bold text-[#1B1A18] tracking-tight">
            Urutan Harga 5 Pasar · {commodityName}
          </h2>
          <p className="text-[12px] text-[#6E6D67]">
            Data terurut dari pasar yang paling hemat hingga yang tertinggi di Kota Bogor.
          </p>
        </div>
        <span className="text-[11px] font-semibold text-[#8E8D86] bg-[#FAF9F5] px-2.5 py-1 rounded-full outline outline-1 outline-[#E5E3DE] w-fit">
          5 Pasar Aktif
        </span>
      </div>

      <div className="overflow-x-auto -mx-5 sm:mx-0 px-5 sm:px-0">
        <table className="w-full text-left border-collapse min-w-[620px]">
          <thead>
            <tr className="border-b border-[#E5E3DE] text-[11px] font-bold text-[#8E8D86] uppercase tracking-wider">
              <th className="py-2.5 pr-4">Peringkat & Pasar</th>
              <th className="py-2.5 px-4 text-right">Harga Lapak / kg</th>
              <th className="py-2.5 px-4 text-center">Selisih vs Rerata</th>
              <th className="py-2.5 px-4 text-center">Stok</th>
              <th className="py-2.5 px-4 text-right">Laporan Warga</th>
              <th className="py-2.5 pl-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F4F3F0] text-[13px]">
            {sortedMarkets.map((m, idx) => {
              const isSelected = m.marketId === selectedMarketId;
              const isCheapest = idx === 0;

              return (
                <tr
                  key={m.marketId}
                  className={`transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#FAF9F5]'
                      : 'hover:bg-[#FCFBF8]'
                  }`}
                  onClick={() => onSelectMarket(m.marketId)}
                >
                  {/* Rank & Market */}
                  <td className="py-3.5 pr-4">
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 ${
                          isCheapest
                            ? 'bg-[#EEF773] text-[#1B1A18] outline outline-1 outline-[#1B1A18]'
                            : 'bg-[#F4F3F0] text-[#6E6D67]'
                        }`}
                      >
                        {idx + 1}
                      </span>
                      <div>
                        <div className="font-bold text-[#1B1A18] flex items-center gap-1.5">
                          <span>{m.name}</span>
                          {isCheapest && (
                            <span className="text-[10px] font-bold bg-[#EEF773] text-[#1B1A18] px-1.5 py-0.2 rounded outline outline-1 outline-[#1B1A18]">
                              Termurah
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-[#8E8D86]">
                          {m.district} · {m.address}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="py-3.5 px-4 text-right font-bold text-[#1B1A18] tabular-nums text-[14px]">
                    {formatRupiah(m.price)}
                  </td>

                  {/* Deviation */}
                  <td className="py-3.5 px-4 text-center">
                    {m.diffPercent < 0 ? (
                      <span className="inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#F4F3F0] text-[#1B1A18] outline outline-1 outline-[#E5E3DE] tabular-nums">
                        {m.diffPercent}%
                      </span>
                    ) : m.diffPercent === 0 ? (
                      <span className="inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#F4F3F0] text-[#6E6D67] tabular-nums">
                        Sama (0%)
                      </span>
                    ) : (
                      <span className="inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#FEE2E2] text-[#991B1B] tabular-nums">
                        +{m.diffPercent}%
                      </span>
                    )}
                  </td>

                  {/* Stock */}
                  <td className="py-3.5 px-4 text-center">
                    <span className="text-[12px] font-medium text-[#1B1A18]">
                      {m.stock}
                    </span>
                  </td>

                  {/* Reports Count */}
                  <td className="py-3.5 px-4 text-right text-[12px] text-[#6E6D67] tabular-nums">
                    <span>{m.reportsCount} lap.</span>
                    <span className="block text-[10px] text-[#8E8D86]">
                      {m.lastUpdated}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 pl-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectMarket(m.marketId);
                        }}
                        className={`px-2.5 py-1.5 rounded-[8px] text-[11px] font-semibold outline outline-1 transition-colors ${
                          isSelected
                            ? 'bg-[#1B1A18] text-white outline-[#1B1A18]'
                            : 'bg-white text-[#1B1A18] outline-[#E5E3DE] hover:bg-[#FAF9F5]'
                        }`}
                      >
                        {isSelected ? 'Terpilih' : 'Pilih'}
                      </button>
                      <a
                        href={m.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        title="Buka di Google Maps"
                        className="p-1.5 rounded-[8px] text-[#6E6D67] hover:text-[#1B1A18] hover:bg-[#FAF9F5] transition-colors"
                      >
                        <NavigationArrow size={14} weight="bold" />
                      </a>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
