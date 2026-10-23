import type {
  AdminCommodity,
  AdminMarket,
  DailyPriceRecord,
  AdminReport,
  AdminUserProfile,
  AdminState,
} from '../types/admin.ts';
import { MOCK_MARKETS } from '../mock/markets.data.ts';

export const DEFAULT_ADMIN_USER: AdminUserProfile = {
  id: 'admin_01',
  name: 'Admin',
  fullName: 'Admin',
  email: 'admin@hargaku.id',
  role: 'Administrator',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80',
  lastLogin: '23 Okt 2026, 06:00 WIB',
};

export const INITIAL_ADMIN_REPORTS: AdminReport[] = [
  {
    id: 'REP-2026-0891',
    commodityName: 'Cabai Rawit Merah',
    marketName: 'Pasar Anyar',
    reportedPrice: 23750,
    unit: '1/4 kg',
    normalizedPricePerKg: 95000,
    officialHapPrice: 57000,
    cityAvgPrice: 60400,
    diffPercent: 57.3,
    submittedAt: '22 Okt, 07:15 WIB',
    hasPhoto: true,
    photoUrl: '/images/nota-sample.jpg',
    citizenNotes: 'Beli di lapak bumbu seberang tangga utama, pedagang bilang pasokan telat datang.',
    status: 'ANOMALY',
    anomalyReason: 'Deviasi +57.3% melampaui ambang batas toleransi MAD (+25%). Perlu konfirmasi visual nota.',
    exifSanitized: true,
  },
  {
    id: 'REP-2026-0892',
    commodityName: 'Bawang Merah Brebes',
    marketName: 'Pasar Kebon Kembang',
    reportedPrice: 34000,
    unit: '1 kg',
    normalizedPricePerKg: 34000,
    officialHapPrice: 36500,
    cityAvgPrice: 34000,
    diffPercent: 0.0,
    submittedAt: '22 Okt, 07:32 WIB',
    hasPhoto: true,
    photoUrl: '/images/nota-sample.jpg',
    citizenNotes: 'Kualitas bagus, baru bongkar muat dari truk Brebes.',
    status: 'PENDING',
    exifSanitized: true,
  },
  {
    id: 'REP-2026-0893',
    commodityName: 'Daging Sapi Murni',
    marketName: 'Pasar Sukasari',
    reportedPrice: 67000,
    unit: '1/2 kg',
    normalizedPricePerKg: 134000,
    officialHapPrice: 140000,
    cityAvgPrice: 137000,
    diffPercent: -2.2,
    submittedAt: '22 Okt, 07:45 WIB',
    hasPhoto: false,
    citizenNotes: 'Daging paha belakang segar.',
    status: 'PENDING',
    exifSanitized: true,
  },
  {
    id: 'REP-2026-0894',
    commodityName: 'Beras Medium IR-64',
    marketName: 'Pasar Gunung Batu',
    reportedPrice: 13900,
    unit: '1 kg',
    normalizedPricePerKg: 13900,
    officialHapPrice: 13500,
    cityAvgPrice: 13900,
    diffPercent: 0.0,
    submittedAt: '22 Okt, 08:05 WIB',
    hasPhoto: true,
    citizenNotes: 'Harga standar tidak ada kenaikan.',
    status: 'APPROVED',
    exifSanitized: true,
  },
  {
    id: 'REP-2026-0895',
    commodityName: 'Minyak Goreng Curah',
    marketName: 'Pasar Jambu Dua',
    reportedPrice: 5000,
    unit: '1 liter',
    normalizedPricePerKg: 5000,
    officialHapPrice: 15700,
    cityAvgPrice: 16300,
    diffPercent: -69.3,
    submittedAt: '22 Okt, 08:20 WIB',
    hasPhoto: false,
    citizenNotes: 'Spam input percobaan angka acak.',
    status: 'REJECTED',
    anomalyReason: 'Harga Rp 5.000/liter terindikasi anomali spam (jauh di bawah HET Rp 15.700).',
    exifSanitized: true,
  },
];

export const INITIAL_COMMODITIES: AdminCommodity[] = [
  {
    id: 'cabai-merah-keriting',
    name: 'Cabai Merah Keriting',
    slug: 'cabai-merah-keriting',
    category: 'CABAI_BAWANG',
    unit: 'kg',
    hapHetPrice: 40000,
    tolerancePercentage: 10,
    isActive: true,
  },
  {
    id: 'bawang-merah-brebes',
    name: 'Bawang Merah Brebes',
    slug: 'bawang-merah-brebes',
    category: 'CABAI_BAWANG',
    unit: 'kg',
    hapHetPrice: 36500,
    tolerancePercentage: 10,
    isActive: true,
  },
  {
    id: 'cabai-rawit-merah',
    name: 'Cabai Rawit Merah',
    slug: 'cabai-rawit-merah',
    category: 'CABAI_BAWANG',
    unit: 'kg',
    hapHetPrice: 57000,
    tolerancePercentage: 10,
    isActive: true,
  },
  {
    id: 'daging-sapi-murni',
    name: 'Daging Sapi Murni',
    slug: 'daging-sapi-murni',
    category: 'DAGING',
    unit: 'kg',
    hapHetPrice: 140000,
    tolerancePercentage: 10,
    isActive: true,
  },
  {
    id: 'daging-ayam-broiler',
    name: 'Daging Ayam Broiler',
    slug: 'daging-ayam-broiler',
    category: 'DAGING',
    unit: 'kg',
    hapHetPrice: 36750,
    tolerancePercentage: 10,
    isActive: true,
  },
  {
    id: 'minyak-goreng-curah',
    name: 'Minyak Goreng Curah',
    slug: 'minyak-goreng-curah',
    category: 'MINYAK',
    unit: 'liter',
    hapHetPrice: 15700,
    tolerancePercentage: 10,
    isActive: true,
  },
  {
    id: 'beras-medium-ir64',
    name: 'Beras Medium IR-64',
    slug: 'beras-medium-ir64',
    category: 'BERAS',
    unit: 'kg',
    hapHetPrice: 14500,
    tolerancePercentage: 10,
    isActive: true,
  },
  {
    id: 'telur-ayam-ras',
    name: 'Telur Ayam Ras',
    slug: 'telur-ayam-ras',
    category: 'DAGING',
    unit: 'kg',
    hapHetPrice: 28000,
    tolerancePercentage: 10,
    isActive: true,
  },
];

export const INITIAL_MARKETS: AdminMarket[] = MOCK_MARKETS.map((m) => ({
  id: m.id,
  regionId: m.regionId || 'reg_jabar',
  name: m.name,
  slug: m.slug,
  city: m.city,
  district: m.district,
  address: `${m.name}, ${m.district}, ${m.city}`,
  latitude: m.latitude,
  longitude: m.longitude,
  operatingHours: '04:00 – 14:00 WIB',
  specialty: 'Sentra Pangan Tradisional',
  isActive: m.isActive,
}));

function generateInitialDailyPrices(): Record<string, DailyPriceRecord> {
  const records: Record<string, DailyPriceRecord> = {};
  const today = '2026-10-23';

  for (const m of INITIAL_MARKETS) {
    for (const c of INITIAL_COMMODITIES) {
      const charCodeSum = (m.id + c.id).split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
      const variancePct = ((charCodeSum % 15) - 6) / 100;
      const basePrice = Math.round((c.hapHetPrice * (1 + variancePct)) / 100) * 100;
      const prevPrice = Math.round((c.hapHetPrice * (1 + variancePct - 0.02)) / 100) * 100;

      records[`${m.id}_${c.id}`] = {
        marketId: m.id,
        commodityId: c.id,
        price: basePrice,
        previousPrice: prevPrice,
        recordedDate: today,
      };
    }
  }

  return records;
}

export const INITIAL_DAILY_PRICES: Record<string, DailyPriceRecord> = generateInitialDailyPrices();

export const INITIAL_ADMIN_STATE: AdminState = {
  currentUser: DEFAULT_ADMIN_USER,
  commodities: INITIAL_COMMODITIES,
  markets: INITIAL_MARKETS,
  dailyPrices: INITIAL_DAILY_PRICES,
  reports: INITIAL_ADMIN_REPORTS,
};
