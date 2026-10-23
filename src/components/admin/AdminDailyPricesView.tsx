'use client';

import React, { useState, useEffect } from 'react';
import { useAdminStore } from '@/lib/store/admin-store';
import {
  Lightning,
  CheckCircle,
  Clock,
  ArrowUp,
  ArrowDown,
  Minus,
} from '@phosphor-icons/react';

export function AdminDailyPricesView() {
  const { markets, commodities, dailyPrices, updateDailyPrices } = useAdminStore();

  const activeMarkets = markets.filter((m) => m.isActive);
  const activeCommodities = commodities.filter((c) => c.isActive);

  const [selectedMarketId, setSelectedMarketId] = useState<string>(
    activeMarkets[0]?.id || 'kebon-kembang'
  );
  const [recordedDate, setRecordedDate] = useState<string>('2026-10-23');
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState<string>('');

  // Sync inputs with current prices in store whenever market or date changes
  useEffect(() => {
    const nextInputs: Record<string, string> = {};
    for (const c of activeCommodities) {
      const key = `${selectedMarketId}_${c.id}`;
      const record = dailyPrices[key];
      if (record && record.price) {
        nextInputs[c.id] = record.price.toString();
      } else {
        // Fallback to sensible initial price near HAP
        nextInputs[c.id] = c.hapHetPrice.toString();
      }
    }
    setInputs(nextInputs);
    setSuccessMessage('');
  }, [selectedMarketId, recordedDate, activeCommodities.length]);

  const handlePriceChange = (commodityId: string, val: string) => {
    setInputs((prev) => ({ ...prev, [commodityId]: val }));
  };

  const handleSaveBatch = (e: React.FormEvent) => {
    e.preventDefault();
    const entries: Array<{ commodityId: string; price: number }> = [];

    for (const c of activeCommodities) {
      const val = inputs[c.id];
      const num = parseInt(val, 10);
      if (!isNaN(num) && num > 0) {
        entries.push({ commodityId: c.id, price: num });
      }
    }

    if (entries.length === 0) return;

    updateDailyPrices(selectedMarketId, recordedDate, entries);
    const marketObj = markets.find((m) => m.id === selectedMarketId);
    setSuccessMessage(
      `Harga resmi harian untuk ${marketObj?.name || 'Pasar'} berhasil disimpan dan dipublikasikan!`
    );
    setTimeout(() => setSuccessMessage(''), 4000);
  };

  const currentMarket = markets.find((m) => m.id === selectedMarketId);

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white border border-[#E5E3DE] rounded-[24px] p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#FF7714]">
            Survei Pagi 06:00 WIB
          </span>
          <h1 className="text-2xl font-medium tracking-tight text-[#1B1A18] mt-0.5">
            Entri Cepat Harga Resmi Harian
          </h1>
          <p className="text-sm text-[#706E6A]">
            Perbarui data survei lapak pasar (Lapis 1 & 2) yang menjadi patokan perhitungan harga wajar warga.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Clock size={16} className="text-[#A8A29E]" />
          <input
            type="date"
            value={recordedDate}
            onChange={(e) => setRecordedDate(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-[#E5E3DE] bg-[#FAF9F5] text-xs font-medium text-[#1B1A18]"
          />
        </div>
      </div>

      {/* Success Notification */}
      {successMessage && (
        <div className="p-4 rounded-2xl bg-[#DCFCE7] border border-[#BBF7D0] text-sm font-medium text-[#15803D] flex items-center gap-2">
          <CheckCircle size={18} weight="fill" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Market Selector Bar */}
      <div className="bg-white border border-[#E5E3DE] rounded-[20px] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[#1B1A18] shrink-0">Pilih Pasar:</span>
          <select
            value={selectedMarketId}
            onChange={(e) => setSelectedMarketId(e.target.value)}
            className="px-3.5 py-2 rounded-xl border border-[#E5E3DE] bg-[#FAF9F5] text-xs font-semibold text-[#1B1A18] focus:bg-white focus:outline-[#1B1A18] min-w-[220px]"
          >
            {activeMarkets.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name} ({m.city || 'Nasional'})
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] text-[#A8A29E] font-medium mr-1 hidden md:inline">Akses Cepat:</span>
          {activeMarkets.slice(0, 5).map((m) => {
            const isSelected = m.id === selectedMarketId;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setSelectedMarketId(m.id)}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-all shrink-0 ${
                  isSelected
                    ? 'bg-[#1B1A18] text-white border-[#1B1A18]'
                    : 'bg-[#FAF9F5] text-[#706E6A] border-[#E5E3DE] hover:bg-white'
                }`}
              >
                {m.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Fast-Entry Matrix Form */}
      <form onSubmit={handleSaveBatch} className="space-y-4">
        <div className="bg-white border border-[#E5E3DE] rounded-[24px] shadow-sm overflow-hidden">
          <div className="px-6 py-4 bg-[#FAF9F5] border-b border-[#E5E3DE] flex items-center justify-between">
            <span className="text-xs font-semibold text-[#1B1A18]">
              Daftar Komoditas di {currentMarket?.name}
            </span>
            <span className="text-xs text-[#706E6A]">
              {activeCommodities.length} bahan pokok dipantau
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#FAF9F5]/50 border-b border-[#E5E3DE] text-xs font-semibold text-[#706E6A] uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-3">Komoditas & Satuan</th>
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
                            onChange={(e) => handlePriceChange(c.id, e.target.value)}
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
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#EEF773] text-[#1B1A18] border border-[#1B1A18] text-xs font-bold shadow-[2px_2px_0px_#1B1A18] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
          >
            <Lightning size={16} weight="bold" />
            <span>Simpan & Publikasikan Harga Pasar Ini</span>
          </button>
        </div>
      </form>
    </div>
  );
}
