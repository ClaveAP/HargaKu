'use client';

import Link from 'next/link';
import { PriceCheckResult, CommoditySummary, Market } from '@/types';
import { ArrowRight, MegaphoneSimple } from '@phosphor-icons/react';

interface Props {
  result: PriceCheckResult;
  commodity: CommoditySummary;
  market?: Market;
  takaranAmount: number;
  takaranUnitLabel: string;
  rawPriceInput: string;
}

export function PriceEvaluationResultCard({
  result,
  commodity,
  market,
  takaranAmount,
  takaranUnitLabel,
  rawPriceInput,
}: Props) {
  // Determine badge and style
  let badgeStyle = 'bg-[#F4F3F0] text-[#1B1A18] outline-[#E5E3DE]';
  let titlePrefix = '';
  let adviceBoxStyle = 'bg-[#FAF9F5] outline-[#E5E3DE] text-[#6E6D67]';

  if (result.status === 'SLIGHTLY_EXPENSIVE') {
    badgeStyle = 'bg-[#FEF3C7] text-[#92400E] outline-[#FDE68A]';
    titlePrefix = '▲ ';
    adviceBoxStyle = 'bg-[#FFFBEB] outline-[#FDE68A] text-[#92400E]';
  } else if (result.status === 'OVERPRICED') {
    badgeStyle = 'bg-[#FEE2E2] text-[#991B1B] outline-[#FECACA]';
    titlePrefix = '▲ ';
    adviceBoxStyle = 'bg-[#FEF2F2] outline-[#FECACA] text-[#991B1B]';
  } else if (result.status === 'MUCH_CHEAPER') {
    badgeStyle = 'bg-[#EEF773] text-[#1B1A18] outline-[#1B1A18]';
    titlePrefix = '▼ ';
    adviceBoxStyle = 'bg-[#F7FEE7] outline-[#D9F99D] text-[#365314]';
  }

  const diffNominal = Math.abs(result.offeredPrice - result.comparisonPrice);
  const diffSignText =
    result.diffPercentage > 0
      ? `Rp ${diffNominal.toLocaleString('id-ID')}/kg lebih tinggi dari rata-rata pasar saat ini.`
      : result.diffPercentage < 0
      ? `Rp ${diffNominal.toLocaleString('id-ID')}/kg lebih hemat dari rata-rata pasar saat ini.`
      : `persis sama dengan rata-rata harga pasar saat ini.`;

  return (
    <div className="bg-white rounded-[18px] outline outline-1 outline-[#E5E3DE] p-6 sm:p-7 shadow-xs flex flex-col justify-between gap-6">
      <div className="flex flex-col gap-4">
        {/* Eyebrow & Status Header */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#78716C] uppercase tracking-wider">
              Hasil Evaluasi Kewajaran · {result.regionName || market?.city || 'Daerah'}
            </span>
            {result.markupDetected && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-[4px] bg-[#FEE2E2] text-[#991B1B] outline outline-1 outline-[#FECACA] uppercase">
                {result.markupLabel || 'Potensi Mark-up'}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="text-[28px] sm:text-[32px] font-bold text-[#1B1A18] tracking-tight">
              {titlePrefix}
              {result.statusLabel}
            </h3>

            <span
              className={`text-[11px] font-bold px-2.5 py-1 rounded-[6px] outline outline-1 ${badgeStyle}`}
            >
              {result.diffPercentage > 0 ? `+${result.diffPercentage}%` : `${result.diffPercentage}%`} Di Atas Acuan
            </span>
          </div>

          <p className="text-[13px] text-[#6E6D67] leading-[20px]">
            Harga yang ditawarkan {diffSignText}
          </p>
        </div>

        {/* Structured Metadata Key-Value List */}
        <div className="divide-y divide-[#E5E3DE] border-y border-[#E5E3DE] text-[12px] py-1">
          <div className="py-2.5 flex items-center justify-between gap-4">
            <span className="text-[#78716C]">Harga yang ditawarkan (normalisasi)</span>
            <span className="font-bold text-[#1B1A18] text-right">
              Rp {result.offeredPrice.toLocaleString('id-ID')} / kg{' '}
              <span className="font-normal text-[#8C8B85]">
                ({rawPriceInput} / {takaranAmount} {takaranUnitLabel.split(' ')[0]})
              </span>
            </span>
          </div>

          <div className="py-2.5 flex items-center justify-between gap-4">
            <span className="text-[#78716C]">Harga pembanding acuan daerah</span>
            <span className="font-bold text-[#1B1A18]">
              Rp {result.comparisonPrice.toLocaleString('id-ID')} / kg
            </span>
          </div>

          <div className="py-2.5 flex items-center justify-between gap-4">
            <span className="text-[#78716C]">Pasar rujukan &amp; sumber</span>
            <span className="font-medium text-[#6E6D67]">
              Laporan Warga · {market?.name || 'Pasar Lokal'} (8 laporan terverifikasi)
            </span>
          </div>

          <div className="py-2.5 flex items-center justify-between gap-4">
            <span className="text-[#78716C]">Standar HAP Nasional Bapanas</span>
            <span className="font-mono font-medium text-[#6E6D67]">
              Rp {(result.layers.lapis1NationalHap ?? result.layers.lapis1HapHet).toLocaleString('id-ID')} / kg
            </span>
          </div>

          <div className="py-2.5 flex items-center justify-between gap-4">
            <span className="text-[#78716C]">Acuan Disesuaikan ({result.regionName || 'Daerah'})</span>
            <span className="font-medium text-[#1B1A18] text-right">
              Rp {result.layers.lapis1HapHet.toLocaleString('id-ID')} / kg{' '}
              <span className="text-[11px] text-[#8C8B85] font-normal block sm:inline">
                ({result.offeredPrice > result.layers.lapis1HapHet ? 'Melebihi acuan pulau' : 'Sesuai acuan pulau'})
              </span>
            </span>
          </div>
        </div>

        {/* Dynamic Advice Callout */}
        <div className={`p-3.5 rounded-[10px] outline outline-1 text-[12px] leading-[18px] ${adviceBoxStyle}`}>
          <span className="font-semibold block mb-0.5">Saran Belanja:</span>
          {result.advice}
        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
        <Link
          href={`/lapor?commodity=${commodity.slug}&market=${market?.slug || ''}&price=${result.offeredPrice}`}
          className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-[8px] bg-white text-[#1B1A18] outline outline-1 outline-[#E5E3DE] hover:bg-[#F4F3F0] text-[12px] font-semibold transition-colors"
        >
          <MegaphoneSimple size={15} weight="bold" />
          <span>Lapor Harga Lapak Ini</span>
        </Link>

        <Link
          href={`/komoditas/${commodity.slug}`}
          className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-[8px] bg-[#EEF773] text-[#1B1A18] outline outline-1 outline-[#1B1A18] text-[12px] font-semibold hover:bg-[#dce663] transition-colors"
        >
          <span>Bandingkan Pasar Lain</span>
          <ArrowRight size={13} weight="bold" />
        </Link>
      </div>
    </div>
  );
}
