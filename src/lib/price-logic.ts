import type { PriceCheckResult, PriceCheckStatus, ConfidenceLevel } from '../types/index.ts';

export function evaluatePrice(
  offeredPrice: number,
  comparisonPrice: number,
  layers: {
    lapis1HapHet: number;
    lapis2OfficialAvg: number;
    lapis3CitizenMedian: number;
  },
  confidenceLevel: ConfidenceLevel = 'HIGH',
  confidenceReason = 'Dihitung dari kombinasi survei pasar resmi dan median laporan warga Kota Bogor.'
): PriceCheckResult {
  const diffPercentage = Number(
    (((offeredPrice - comparisonPrice) / comparisonPrice) * 100).toFixed(2)
  );

  let status: PriceCheckStatus;
  let statusLabel: string;
  let statusBadgeColor: 'emerald' | 'amber' | 'rose' | 'blue';
  let advice: string;

  if (diffPercentage < -15) {
    status = 'MUCH_CHEAPER';
    statusLabel = 'Jauh Lebih Murah';
    statusBadgeColor = 'blue';
    advice =
      'Harga ini jauh di bawah rata-rata pasar. Pastikan memeriksa kesegaran mutu pangan dan ketepatan takaran timbangan.';
  } else if (diffPercentage <= 10) {
    status = 'FAIR';
    statusLabel = 'Wajar';
    statusBadgeColor = 'emerald';
    advice =
      'Harga ini wajar dan sejalan dengan rata-rata transaksi harian di pasar Kota Bogor.';
  } else if (diffPercentage <= 25) {
    status = 'SLIGHTLY_EXPENSIVE';
    statusLabel = 'Agak Mahal';
    statusBadgeColor = 'amber';
    advice =
      'Harga sedikit lebih tinggi (+10% hingga +25%) dari rata-rata. Pertimbangkan menawar atau membandingkan kios terdekat.';
  } else {
    status = 'OVERPRICED';
    statusLabel = 'Terlalu Mahal';
    statusBadgeColor = 'rose';
    advice =
      'Harga melampaui toleransi wajar (> +25%). Disarankan mengecek kios lain atau pasar alternatif di sekitar.';
  }

  return {
    offeredPrice,
    comparisonPrice,
    diffPercentage,
    status,
    statusLabel,
    statusBadgeColor,
    advice,
    confidenceLevel,
    confidenceReason,
    layers,
  };
}

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  })
    .format(amount)
    .replace('Rp', 'Rp ');
}

