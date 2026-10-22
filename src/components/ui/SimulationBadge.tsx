'use client';

import Link from 'next/link';

const TICKER_ITEMS = [
  {
    type: 'badge' as const,
    text: 'DATA SIMULASI DEMO WIA 2026 · Mengacu Struktur PIHPS & Bapanas',
  },
  {
    name: 'Cabai Rawit Merah',
    price: 'Rp 58.000/kg',
    market: 'Pasar Sukasari',
    diff: '▼ -4.0%',
    isDown: true,
  },
  {
    name: 'Bawang Merah Brebes',
    price: 'Rp 33.000/kg',
    market: 'Pasar Anyar',
    diff: '▼ -2.9%',
    isDown: true,
  },
  {
    name: 'Beras Medium IR-64',
    price: 'Rp 13.500/kg',
    market: 'Kebon Kembang',
    diff: '▼ -2.9%',
    isDown: true,
  },
  {
    name: 'Daging Sapi Murni',
    price: 'Rp 134.000/kg',
    market: 'Pasar Sukasari',
    diff: '▼ -2.2%',
    isDown: true,
  },
  {
    name: 'Minyak Goreng Curah',
    price: 'Rp 16.000/kg',
    market: 'Pasar Anyar',
    diff: '▼ -1.8%',
    isDown: true,
  },
  {
    name: 'Daging Ayam Broiler',
    price: 'Rp 36.000/kg',
    market: 'Pasar Sukasari',
    diff: 'Wajar',
    isDown: false,
  },
  {
    name: 'Telur Ayam Ras',
    price: 'Rp 27.000/kg',
    market: 'Pasar Sukasari',
    diff: 'Wajar',
    isDown: false,
  },
  {
    type: 'info' as const,
    text: 'PANTAUAN PANGAN HARIAN · 5 PASAR KOTA BOGOR · UPDATE 06:00 WIB',
  },
];

function TickerTrack() {
  return (
    <div className="flex items-center gap-7 shrink-0 pr-7">
      {TICKER_ITEMS.map((item, idx) => {
        if (item.type === 'badge') {
          return (
            <Link
              key={idx}
              href="/tentang"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer group/badge"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#EEF773] animate-pulse shrink-0" />
              <span className="text-[#EEF773] font-bold uppercase tracking-wider text-[10px] whitespace-nowrap group-hover/badge:underline underline-offset-2">
                {item.text} ↗
              </span>
            </Link>
          );
        }

        if (item.type === 'info') {
          return (
            <div
              key={idx}
              className="flex items-center gap-2 text-[#8E8D86] text-[10px] font-semibold tracking-wider whitespace-nowrap"
            >
              <span className="text-[#55534E]">●</span>
              <span>{item.text}</span>
            </div>
          );
        }

        return (
          <div
            key={idx}
            className="flex items-center gap-2 text-[11px] whitespace-nowrap"
          >
            <span className="text-[#A8A7A1]">{item.name}:</span>
            <span className="font-bold text-[#F4F3F0] tabular-nums">
              {item.price}
            </span>
            <span className="text-[10px] text-[#8E8D86]">({item.market})</span>
            {item.diff && (
              <span
                className={`text-[10px] font-bold tabular-nums px-1.5 py-0.5 rounded ${
                  item.isDown
                    ? 'text-[#EEF773] bg-[#EEF773]/10 outline outline-1 outline-[#EEF773]/20'
                    : 'text-[#D1CFCA] bg-white/5'
                }`}
              >
                {item.diff}
              </span>
            )}
            <span className="text-[#3E3C38] select-none pl-1">/</span>
          </div>
        );
      })}
    </div>
  );
}

export function SimulationBadge() {
  return (
    <div
      role="status"
      aria-label="Live Commodity Price Ticker"
      className="relative w-full bg-[#1B1A18] text-[#F4F3F0] h-[34px] border-b border-[#2E2C29] flex items-center overflow-hidden group select-none cursor-default"
    >
      {/* Edge gradient masks for smooth fade-in and fade-out */}
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#1B1A18] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#1B1A18] to-transparent z-10 pointer-events-none" />

      {/* Infinite Seamless Running Tracks */}
      <div className="flex animate-ticker">
        <TickerTrack />
        <TickerTrack />
      </div>
    </div>
  );
}
