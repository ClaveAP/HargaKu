'use client';

import React from 'react';
import type { AdminCommodity, DailyPriceRecord } from '@/lib/types/admin';
import { Lightning, ArrowUp, ArrowDown, Minus } from '@phosphor-icons/react';

interface DailyPriceTableProps {
  currentMarketName: string;
  activeCommodities: AdminCommodity[];
  dailyPrices: Record<string, DailyPriceRecord>;
  selectedMarketId: string;
  inputs: Record<string, string>;
  onPriceChange: (commodityId: string, val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function DailyPriceTable({
  currentMarketName,
  activeCommodities,
  dailyPrices,
  selectedMarketId,
  inputs,
  onPriceChange,
  onSubmit,
}: DailyPriceTableProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="bg-white border border-[#E5E3DE] rounded-[24px] shadow-sm overflow-hidden">
        <div className="px-6 py-4 bg-[#FAF9F5] border-b border-[#E5E3DE] flex items-center justify-between">
          <span className="text-xs font-semibold text-[#1B1A18]">
            Daftar Komoditas di {currentMarketName}
          </span>
          <span className="text-xs text-[#706E6A]">
            {activeCommodities.length} bahan pokok dipantau
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#FAF9F5]/50 border-b border-[#E5E3DE] text-xs font-semibold text-[#706E6A] uppercase tracking-wider">
              <tr>
                <th className="px-5 py-3">Komoditas &amp; Satuan</th>
                <th className="px-5 py-3">Acuan HAP Bapanas</th>
                <th className="px-5 py-3">Harga Kemarin</th>
                <th className="px-5 py-3 w-56">Input Harga Hari Ini (Rp)</th>
                <th className="px-5 py-3 text-right">Selisih vs HAP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E3DE]">
              {activeCommodities.map((c) => {
                const key = `${selectedMarketId}_${c.id}`;
                const record = dailyPrices[key];
                const currentVal = parseInt(inputs[c.id] || '0', 10);
                const diffHap =
                  currentVal > 0
                    ? Math.round(((currentVal - c.hapHetPrice) / c.hapHetPrice) * 100)
                    : 0;

                return (
                  <tr key={c.id} className="hover:bg-[#FAF9F5]/60 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="font-medium text-[#1B1A18]">{c.name}</div>
                      <div className="text-xs text-[#A8A29E]">Satuan: per {c.unit}</div>
                    </td>
                    <td className="px-5 py-3.5 text-xs font-mono text-[#706E6A]">
                      Rp {c.hapHetPrice.toLocaleString('id-ID')}
                    </td>
                    <td className="px-5 py-3.5 text-xs font-mono text-[#706E6A]">
                      {record?.previousPrice
                        ? `Rp ${record.previousPrice.toLocaleString('id-ID')}`
                        : `Rp ${record?.price?.toLocaleString('id-ID') || c.hapHetPrice.toLocaleString('id-ID')}`}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#706E6A]">
                          Rp
                        </span>
                        <input
                          type="number"
                          value={inputs[c.id] || ''}
                          onChange={(e) => onPriceChange(c.id, e.target.value)}
                          placeholder={c.hapHetPrice.toString()}
                          className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-[#E5E3DE] bg-[#FAF9F5] focus:bg-white text-sm font-semibold text-[#1B1A18] focus:outline-[#1B1A18]"
                        />
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      {currentVal > 0 ? (
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                            diffHap > 10
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : diffHap < -10
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          }`}
                        >
                          {diffHap > 0 ? (
                            <ArrowUp size={11} weight="bold" />
                          ) : diffHap < 0 ? (
                            <ArrowDown size={11} weight="bold" />
                          ) : (
                            <Minus size={11} weight="bold" />
                          )}
                          <span>{diffHap > 0 ? `+${diffHap}%` : `${diffHap}%`}</span>
                        </span>
                      ) : (
                        <span className="text-xs text-[#A8A29E]">-</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="submit"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#EEF773] text-[#1B1A18] border border-[#1B1A18] text-xs font-bold shadow-[2px_2px_0px_#1B1A18] hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer"
        >
          <Lightning size={16} weight="bold" />
          <span>Simpan &amp; Publikasikan Harga Pasar Ini</span>
        </button>
      </div>
    </form>
  );
}
