import Link from 'next/link';
import { CommoditySummary } from '@/types';
import { formatRupiah, formatPercent, formatDateWIB } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus, ArrowUpRight } from 'lucide-react';

interface Props {
  commodity: CommoditySummary;
}

export function CommodityCard({ commodity }: Props) {
  const isRising = commodity.changePercentage > 0;
  const isDropping = commodity.changePercentage < 0;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded-full">
              {commodity.category.replace('_', ' ')}
            </span>
            <h3 className="text-base font-bold text-gray-900 mt-1.5 line-clamp-1">
              {commodity.name}
            </h3>
          </div>
          <Link
            href={`/komoditas/${commodity.slug}`}
            className="text-gray-400 hover:text-emerald-700 p-1 rounded-md"
            aria-label={`Lihat detail ${commodity.name}`}
          >
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="mt-4 flex items-baseline justify-between">
          <div>
            <div className="text-2xl font-bold text-gray-900 tabular-nums">
              {formatRupiah(commodity.currentAvgPrice)}
            </div>
            <div className="text-xs text-gray-500">per {commodity.unit}</div>
          </div>

          <div
            className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-md tabular-nums ${
              isRising
                ? 'bg-rose-50 text-rose-700'
                : isDropping
                ? 'bg-emerald-50 text-emerald-700'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {isRising && <TrendingUp className="w-3.5 h-3.5" />}
            {isDropping && <TrendingDown className="w-3.5 h-3.5" />}
            {!isRising && !isDropping && <Minus className="w-3.5 h-3.5" />}
            <span>{formatPercent(commodity.changePercentage)}</span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-gray-100 text-xs text-gray-600 flex items-center justify-between">
          <span>Acuan HAP/HET:</span>
          <span className="font-semibold text-gray-800 tabular-nums">
            {formatRupiah(commodity.hapHetPrice)}
          </span>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100 text-[11px] text-gray-500 flex items-center justify-between">
        <span>Diperbarui: {formatDateWIB(commodity.lastUpdated)}</span>
        <Link
          href={`/cek-harga?komoditas=${commodity.slug}`}
          className="font-medium text-emerald-700 hover:text-emerald-800"
        >
          Cek Wajar →
        </Link>
      </div>
    </div>
  );
}
