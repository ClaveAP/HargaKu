'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';

interface CommodityPreset {
  name: string;
  defaultPrice: number;
  unitWeightMultiplier: number;
  cityAvg: number;
  markets: Array<{ name: string; price: number; diff: string; tag: string; tagColor: string }>;
}

const PRESETS: Record<string, CommodityPreset> = {
  'Cabai Merah Keriting': {
    name: 'Cabai Merah Keriting',
    defaultPrice: 12000,
    unitWeightMultiplier: 4,
    cityAvg: 51200,
    markets: [
      { name: 'Pasar Kebon Kembang', price: 48000, diff: '-6.2%', tag: 'Termurah', tagColor: 'bg-emerald-50 text-emerald-800' },
      { name: 'Pasar Bogor (Sukasari)', price: 50000, diff: '-2.3%', tag: 'Wajar', tagColor: 'bg-gray-100 text-gray-700' },
      { name: 'Pasar Anyar', price: 51000, diff: '-0.4%', tag: 'Wajar', tagColor: 'bg-gray-100 text-gray-700' },
      { name: 'Pasar Gunung Batu', price: 53000, diff: '+3.5%', tag: 'Tinggi', tagColor: 'bg-amber-50 text-amber-800' },
      { name: 'Pasar Jambu Dua', price: 54000, diff: '+5.4%', tag: 'Tertinggi', tagColor: 'bg-rose-50 text-rose-800' },
    ],
  },
  'Bawang Merah': {
    name: 'Bawang Merah',
    defaultPrice: 9000,
    unitWeightMultiplier: 4,
    cityAvg: 36500,
    markets: [
      { name: 'Pasar Anyar', price: 34000, diff: '-6.8%', tag: 'Termurah', tagColor: 'bg-emerald-50 text-emerald-800' },
      { name: 'Pasar Kebon Kembang', price: 35500, diff: '-2.7%', tag: 'Wajar', tagColor: 'bg-gray-100 text-gray-700' },
      { name: 'Pasar Bogor (Sukasari)', price: 36500, diff: '0.0%', tag: 'Wajar', tagColor: 'bg-gray-100 text-gray-700' },
      { name: 'Pasar Jambu Dua', price: 38000, diff: '+4.1%', tag: 'Tinggi', tagColor: 'bg-amber-50 text-amber-800' },
      { name: 'Pasar Gunung Batu', price: 38500, diff: '+5.5%', tag: 'Tertinggi', tagColor: 'bg-rose-50 text-rose-800' },
    ],
  },
  'Daging Sapi': {
    name: 'Daging Sapi',
    defaultPrice: 34000,
    unitWeightMultiplier: 4,
    cityAvg: 138000,
    markets: [
      { name: 'Pasar Bogor (Sukasari)', price: 135000, diff: '-2.2%', tag: 'Termurah', tagColor: 'bg-emerald-50 text-emerald-800' },
      { name: 'Pasar Anyar', price: 137000, diff: '-0.7%', tag: 'Wajar', tagColor: 'bg-gray-100 text-gray-700' },
      { name: 'Pasar Kebon Kembang', price: 138000, diff: '0.0%', tag: 'Wajar', tagColor: 'bg-gray-100 text-gray-700' },
      { name: 'Pasar Gunung Batu', price: 140000, diff: '+1.4%', tag: 'Wajar', tagColor: 'bg-gray-100 text-gray-700' },
      { name: 'Pasar Jambu Dua', price: 142000, diff: '+2.9%', tag: 'Tinggi', tagColor: 'bg-amber-50 text-amber-800' },
    ],
  },
  'Minyak Curah': {
    name: 'Minyak Curah',
    defaultPrice: 16000,
    unitWeightMultiplier: 1,
    cityAvg: 16000,
    markets: [
      { name: 'Pasar Jambu Dua', price: 15500, diff: '-3.1%', tag: 'Termurah', tagColor: 'bg-emerald-50 text-emerald-800' },
      { name: 'Pasar Anyar', price: 15800, diff: '-1.2%', tag: 'Wajar', tagColor: 'bg-gray-100 text-gray-700' },
      { name: 'Pasar Kebon Kembang', price: 16000, diff: '0.0%', tag: 'Wajar', tagColor: 'bg-gray-100 text-gray-700' },
      { name: 'Pasar Gunung Batu', price: 16200, diff: '+1.2%', tag: 'Wajar', tagColor: 'bg-gray-100 text-gray-700' },
      { name: 'Pasar Bogor (Sukasari)', price: 16500, diff: '+3.1%', tag: 'Tinggi', tagColor: 'bg-amber-50 text-amber-800' },
    ],
  },
};

const TAKARAN_OPTIONS = [
  { label: '1 Ons (100g)', multiplier: 10 },
  { label: '1/4 Kg (250g)', multiplier: 4 },
  { label: '1/2 Kg (500g)', multiplier: 2 },
  { label: '1 Kg (1000g)', multiplier: 1 },
];

export function ClayHeroCalculator() {
  const [selectedKey, setSelectedKey] = useState<string>('Cabai Merah Keriting');
  const [inputPrice, setInputPrice] = useState<string>('12000');
  const [multiplier, setMultiplier] = useState<number>(4);

  const preset = PRESETS[selectedKey] || PRESETS['Cabai Merah Keriting'];
  const numericPrice = parseInt(inputPrice.replace(/\D/g, ''), 10) || 0;
  const convertedPerKg = numericPrice * multiplier;
  const diffPercent = ((convertedPerKg - preset.cityAvg) / preset.cityAvg) * 100;
  const isCheaper = diffPercent < 0;

  const handleSelectPreset = (key: string) => {
    setSelectedKey(key);
    const p = PRESETS[key];
    if (p) {
      setInputPrice(p.defaultPrice.toString());
      setMultiplier(p.unitWeightMultiplier);
    }
  };

  return (
    <div
      data-ui="clay-hero-card"
      className="max-w-4xl mx-auto bg-white rounded-2xl border border-gray-100 shadow-[0_10px_35px_rgba(0,0,0,0.05)] p-5 sm:p-7 space-y-6"
    >
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Cari bahan pangan (cth: Cabai Merah Keriting, Beras, Daging)..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 bg-gray-50/70 text-xs sm:text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {Object.keys(PRESETS).map((key) => {
            const isSelected = selectedKey === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => handleSelectPreset(key)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                  isSelected
                    ? 'bg-black text-white shadow-xs'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {key}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-2">
        <div className="lg:col-span-6 space-y-4">
          <div>
            <h2 className="text-sm font-bold text-gray-950">Kalkulator Takaran Pasar</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Masukkan harga penawaran pedagang dalam satuan apapun untuk konversi otomatis ke Rp/kg:
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <span className="absolute left-3.5 top-2.5 text-xs font-semibold text-gray-500">Rp</span>
              <input
                type="text"
                inputMode="numeric"
                value={numericPrice ? numericPrice.toLocaleString('id-ID') : ''}
                onChange={(e) => setInputPrice(e.target.value.replace(/\D/g, ''))}
                className="w-full pl-10 pr-12 py-2 rounded-lg border border-gray-200 bg-white text-sm font-bold tabular-nums text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
              <span className="absolute right-3.5 top-2.5 text-xs text-gray-400 font-semibold">IDR</span>
            </div>
            <span className="text-xs text-gray-500 whitespace-nowrap">untuk takaran:</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
            {TAKARAN_OPTIONS.map((opt) => {
              const active = multiplier === opt.multiplier;
              return (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => setMultiplier(opt.multiplier)}
                  className={`py-2 px-1 rounded-lg text-xs font-semibold border transition-colors ${
                    active
                      ? 'bg-[#EA580C] text-white border-[#EA580C] shadow-xs'
                      : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>

          <div className="p-4 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] space-y-2">
            <div className="flex items-baseline justify-between">
              <div className="text-xl sm:text-2xl font-black text-emerald-950 tabular-nums">
                Rp {convertedPerKg.toLocaleString('id-ID')}{' '}
                <span className="text-xs font-medium text-emerald-800">/ kg</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-emerald-800 shadow-xs uppercase tracking-wider">
                {isCheaper ? 'Harga Wajar & Murah' : 'Di Atas Rata-rata'}
              </span>
            </div>
            <p className="text-xs text-emerald-900 leading-relaxed">
              {Math.abs(diffPercent).toFixed(1)}% {isCheaper ? 'lebih murah' : 'lebih tinggi'} dibanding harga rata-rata Kota Bogor (Rp {preset.cityAvg.toLocaleString('id-ID')}/kg). Penawaran ini setara harga di {preset.markets[0].name}.
            </p>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-gray-950">
              Harga {preset.name} di 5 Pasar Bogor
            </h2>
            <span className="text-xs text-gray-500 tabular-nums">
              Rata-rata: Rp {preset.cityAvg.toLocaleString('id-ID')}
            </span>
          </div>

          <div className="space-y-1.5">
            {preset.markets.map((mkt, idx) => (
              <div
                key={mkt.name}
                className="flex items-center justify-between p-2.5 rounded-lg border border-gray-100 hover:border-gray-200 bg-white transition-colors text-xs"
              >
                <div className="font-medium text-gray-800">
                  <span className="text-gray-400 mr-1.5">{idx + 1}.</span>
                  {mkt.name}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-950 tabular-nums">
                    Rp {mkt.price.toLocaleString('id-ID')}
                  </span>
                  <span className="text-[11px] font-semibold text-gray-500 tabular-nums">
                    {mkt.diff}
                  </span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${mkt.tagColor}`}>
                    {mkt.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
