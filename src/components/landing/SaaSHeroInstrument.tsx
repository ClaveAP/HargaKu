'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, TrendingDown, ArrowUpRight } from 'lucide-react';

interface Preset {
  name: string;
  category: string;
  defaultPrice: number;
  multiplier: number;
  cityAvg: number;
  hapPrice: number;
  markets: Array<{ name: string; price: number; diff: string; isLowest?: boolean }>;
}

const PRESETS: Record<string, Preset> = {
  'Cabai Merah': {
    name: 'Cabai Merah Keriting',
    category: 'Cabai & Bawang',
    defaultPrice: 12000,
    multiplier: 4,
    cityAvg: 51200,
    hapPrice: 40000,
    markets: [
      { name: 'Pasar Kebon Kembang', price: 48000, diff: '-6.2%', isLowest: true },
      { name: 'Pasar Sukasari', price: 50000, diff: '-2.3%' },
      { name: 'Pasar Anyar', price: 51000, diff: '-0.4%' },
      { name: 'Pasar Gunung Batu', price: 53000, diff: '+3.5%' },
      { name: 'Pasar Jambu Dua', price: 54000, diff: '+5.4%' },
    ],
  },
  'Bawang Merah': {
    name: 'Bawang Merah Brebes',
    category: 'Cabai & Bawang',
    defaultPrice: 8500,
    multiplier: 4,
    cityAvg: 36500,
    hapPrice: 36500,
    markets: [
      { name: 'Pasar Anyar', price: 34000, diff: '-6.8%', isLowest: true },
      { name: 'Pasar Kebon Kembang', price: 35500, diff: '-2.7%' },
      { name: 'Pasar Sukasari', price: 36500, diff: '0.0%' },
      { name: 'Pasar Jambu Dua', price: 38000, diff: '+4.1%' },
      { name: 'Pasar Gunung Batu', price: 38500, diff: '+5.5%' },
    ],
  },
  'Beras Medium': {
    name: 'Beras Medium (IR 64)',
    category: 'Beras',
    defaultPrice: 13000,
    multiplier: 1,
    cityAvg: 13500,
    hapPrice: 12500,
    markets: [
      { name: 'Pasar Gunung Batu', price: 13000, diff: '-3.7%', isLowest: true },
      { name: 'Pasar Kebon Kembang', price: 13200, diff: '-2.2%' },
      { name: 'Pasar Anyar', price: 13500, diff: '0.0%' },
      { name: 'Pasar Sukasari', price: 13800, diff: '+2.2%' },
      { name: 'Pasar Jambu Dua', price: 14000, diff: '+3.7%' },
    ],
  },
  'Daging Sapi': {
    name: 'Daging Sapi Murni',
    category: 'Daging & Telur',
    defaultPrice: 34000,
    multiplier: 4,
    cityAvg: 138000,
    hapPrice: 140000,
    markets: [
      { name: 'Pasar Sukasari', price: 135000, diff: '-2.2%', isLowest: true },
      { name: 'Pasar Anyar', price: 137000, diff: '-0.7%' },
      { name: 'Pasar Kebon Kembang', price: 138000, diff: '0.0%' },
      { name: 'Pasar Gunung Batu', price: 140000, diff: '+1.4%' },
      { name: 'Pasar Jambu Dua', price: 142000, diff: '+2.9%' },
    ],
  },
};

const UNITS = [
  { label: '100g (1 Ons)', mult: 10 },
  { label: '250g (1/4 Kg)', mult: 4 },
  { label: '500g (1/2 Kg)', mult: 2 },
  { label: '1 Kg', mult: 1 },
];

export function SaaSHeroInstrument() {
  const [activeTab, setActiveTab] = useState('Cabai Merah');
  const [rawPrice, setRawPrice] = useState('12000');
  const [multiplier, setMultiplier] = useState(4);

  const preset = PRESETS[activeTab] || PRESETS['Cabai Merah'];
  const numericPrice = parseInt(rawPrice.replace(/\D/g, ''), 10) || 0;
  const perKgPrice = numericPrice * multiplier;
  const diffFromAvg = ((perKgPrice - preset.cityAvg) / preset.cityAvg) * 100;
  const isFair = Math.abs(diffFromAvg) <= 10;
  const isLower = diffFromAvg < -10;

  const handleSelectTab = (key: string) => {
    setActiveTab(key);
    const p = PRESETS[key];
    if (p) {
      setRawPrice(p.defaultPrice.toString());
      setMultiplier(p.multiplier);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto rounded-2xl border border-zinc-200/90 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.03),0_12px_36px_-6px_rgba(0,0,0,0.05)] overflow-hidden">
      <div className="px-5 py-3.5 border-b border-zinc-100 bg-zinc-50/60 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {Object.keys(PRESETS).map((key) => {
            const isSelected = activeTab === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => handleSelectTab(key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-white text-zinc-950 font-semibold shadow-xs border border-zinc-200/80'
                    : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/70'
                }`}
              >
                {key}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 text-[11px] text-zinc-500">
          <span>Acuan HAP Bapanas:</span>
          <span className="font-semibold text-zinc-900 tabular-nums">
            Rp {preset.hapPrice.toLocaleString('id-ID')} / kg
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-zinc-100">
        <div className="lg:col-span-6 p-6 sm:p-7 space-y-6">
          <div>
            <div className="text-[11px] font-semibold text-zinc-600 uppercase tracking-wider">
              Kalkulator Takaran Pasar
            </div>
            <h3 className="text-base font-semibold text-zinc-950 mt-1">
              {preset.name}
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5">
              Masukkan harga tawaran pedagang untuk konversi instan ke Rp/kg:
            </p>
          </div>

          <div className="space-y-3">
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-xs font-semibold text-zinc-500">Rp</span>
              <input
                type="text"
                inputMode="numeric"
                value={numericPrice ? numericPrice.toLocaleString('id-ID') : ''}
                onChange={(e) => setRawPrice(e.target.value.replace(/\D/g, ''))}
                className="w-full pl-10 pr-16 py-2.5 rounded-lg border border-zinc-200 bg-zinc-50/50 text-sm font-semibold tabular-nums text-zinc-950 focus:bg-white focus:outline-none focus:ring-1 focus:ring-zinc-400"
              />
              <span className="absolute right-3.5 top-2.5 text-xs text-zinc-600 font-medium">IDR</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              {UNITS.map((u) => {
                const active = multiplier === u.mult;
                return (
                  <button
                    key={u.label}
                    type="button"
                    onClick={() => setMultiplier(u.mult)}
                    className={`py-1.5 px-2 rounded-md text-xs font-medium border transition-colors ${
                      active
                        ? 'bg-zinc-900 text-white border-zinc-900 shadow-2xs'
                        : 'bg-white text-zinc-600 border-zinc-200/80 hover:bg-zinc-50'
                    }`}
                  >
                    {u.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-4 rounded-xl border border-zinc-200/80 bg-zinc-50/40 space-y-2">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-[11px] text-zinc-500 font-medium">Hasil Konversi Riil:</span>
                <div className="text-2xl font-bold text-zinc-950 tabular-nums">
                  Rp {perKgPrice.toLocaleString('id-ID')}{' '}
                  <span className="text-xs font-normal text-zinc-500">/ kg</span>
                </div>
              </div>
              <span
                className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${
                  isLower
                    ? 'bg-blue-50 text-blue-700 border-blue-200'
                    : isFair
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    : 'bg-amber-50 text-amber-800 border-amber-200'
                }`}
              >
                {isLower ? 'Jauh Lebih Murah' : isFair ? 'Harga Wajar' : 'Di Atas Rata-rata'}
              </span>
            </div>

            <p className="text-xs text-zinc-600 leading-relaxed pt-1">
              {Math.abs(diffFromAvg).toFixed(1)}% {diffFromAvg <= 0 ? 'lebih hemat' : 'lebih tinggi'} dibandingkan rata-rata wilayah (Rp {preset.cityAvg.toLocaleString('id-ID')}/kg).
            </p>
          </div>
        </div>

        <div className="lg:col-span-6 p-6 sm:p-7 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[11px] font-semibold text-zinc-600 uppercase tracking-wider">
                Sebaran Pasar Wilayah
              </div>
              <h4 className="text-xs text-zinc-500 mt-0.5">
                Survei harian terverifikasi per pasar
              </h4>
            </div>
            <span className="text-xs font-semibold text-zinc-900 tabular-nums">
              Rata-rata: Rp {preset.cityAvg.toLocaleString('id-ID')}
            </span>
          </div>

          <div className="divide-y divide-zinc-100 border border-zinc-100 rounded-xl overflow-hidden">
            {preset.markets.map((m, i) => (
              <div
                key={m.name}
                className="flex items-center justify-between px-3.5 py-2.5 bg-white hover:bg-zinc-50/70 transition-colors text-xs"
              >
                <div className="flex items-center gap-2">
                  <span className="text-zinc-500 font-mono text-[11px] w-3">{i + 1}</span>
                  <span className="font-medium text-zinc-800">{m.name}</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <span className="font-semibold text-zinc-950 tabular-nums">
                    Rp {m.price.toLocaleString('id-ID')}
                  </span>
                  <span
                    className={`text-[11px] font-medium tabular-nums px-1.5 py-0.5 rounded ${
                      m.isLowest
                        ? 'bg-emerald-50 text-emerald-800 font-semibold'
                        : 'text-zinc-500'
                    }`}
                  >
                    {m.diff}
                  </span>
                  {m.isLowest && (
                    <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      Termurah
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 flex items-center justify-between text-xs">
            <span className="text-zinc-500">Butuh analisis pasar mendalam?</span>
            <Link
              href="/dashboard"
              className="font-medium text-zinc-950 hover:text-emerald-700 inline-flex items-center gap-1 transition-colors"
            >
              <span>Buka Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
