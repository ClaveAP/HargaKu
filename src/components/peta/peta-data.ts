export interface PetaMarketPrice {
  marketId: string;
  name: string;
  shortName: string;
  district: string;
  address: string;
  latitude: number;
  longitude: number;
  xPercent: number; // coordinate percentage on SVG map fallback
  yPercent: number;
  price: number;
  regionalAvgPrice?: number;
  diffPercent: number; // deviation from city average
  status: 'cheaper' | 'average' | 'expensive';
  stock?: 'Melimpah' | 'Cukup' | 'Terbatas';
  reportsCount: number;
  lastUpdated: string;
  googleMapsUrl: string;
}

export interface PetaCommodityOption {
  id: string;
  name: string;
  unit: string;
  cityAvgPrice: number;
  markets: Record<string, Omit<PetaMarketPrice, 'marketId' | 'name' | 'shortName' | 'district' | 'address' | 'latitude' | 'longitude' | 'xPercent' | 'yPercent' | 'googleMapsUrl' | 'regionalAvgPrice'>>;
}

export const PETA_MARKETS_INFO = [
  {
    id: 'sukasari',
    name: 'Pasar Sukasari',
    shortName: 'Pasar Sukasari',
    district: 'Sentra Wilayah Timur',
    address: 'Sentra Sayur & Bumbu Wilayah Timur',
    latitude: -6.602123,
    longitude: 106.800123,
    xPercent: 62,
    yPercent: 74,
    googleMapsUrl: 'https://maps.google.com/?q=Pasar+Sukasari',
  },
  {
    id: 'kebon-kembang',
    name: 'Pasar Kebon Kembang',
    shortName: 'Pasar Kebon Kembang',
    district: 'Sentra Wilayah Pusat',
    address: 'Pusat Distribusi Sayur & Pangan',
    latitude: -6.591234,
    longitude: 106.792345,
    xPercent: 44,
    yPercent: 46,
    googleMapsUrl: 'https://maps.google.com/?q=Pasar+Kebon+Kembang',
  },
  {
    id: 'pasar-anyar',
    name: 'Pasar Anyar',
    shortName: 'Pasar Anyar',
    district: 'Sentra Wilayah Pusat',
    address: 'Pusat Perdagangan Pangan Terpadu',
    latitude: -6.590123,
    longitude: 106.791123,
    xPercent: 49,
    yPercent: 38,
    googleMapsUrl: 'https://maps.google.com/?q=Pasar+Anyar',
  },
  {
    id: 'gunung-batu',
    name: 'Pasar Gunung Batu',
    shortName: 'Pasar Gn. Batu',
    district: 'Sentra Wilayah Barat',
    address: 'Sentra Komoditas Sembako Barat',
    latitude: -6.594512,
    longitude: 106.778945,
    xPercent: 24,
    yPercent: 54,
    googleMapsUrl: 'https://maps.google.com/?q=Pasar+Gunung+Batu',
  },
  {
    id: 'jambu-dua',
    name: 'Pasar Jambu Dua',
    shortName: 'Pasar Jambu Dua',
    district: 'Sentra Wilayah Utara',
    address: 'Sentra Daging & Unggas Utara',
    latitude: -6.572112,
    longitude: 106.804123,
    xPercent: 68,
    yPercent: 20,
    googleMapsUrl: 'https://maps.google.com/?q=Pasar+Jambu+Dua',
  },
];

export const PETA_COMMODITIES: PetaCommodityOption[] = [
  {
    id: 'cabai-rawit-merah',
    name: 'Cabai Rawit Merah',
    unit: 'kg',
    cityAvgPrice: 60400,
    markets: {
      sukasari: {
        price: 58000,
        diffPercent: -4.0,
        status: 'cheaper',
        stock: 'Melimpah',
        reportsCount: 12,
        lastUpdated: '06:00 WIB',
      },
      'jambu-dua': {
        price: 59500,
        diffPercent: -1.5,
        status: 'average',
        stock: 'Cukup',
        reportsCount: 11,
        lastUpdated: '06:00 WIB',
      },
      'gunung-batu': {
        price: 60500,
        diffPercent: 0.2,
        status: 'average',
        stock: 'Cukup',
        reportsCount: 9,
        lastUpdated: '05:30 WIB',
      },
      'pasar-anyar': {
        price: 61000,
        diffPercent: 1.0,
        status: 'average',
        stock: 'Melimpah',
        reportsCount: 18,
        lastUpdated: '06:00 WIB',
      },
      'kebon-kembang': {
        price: 63500,
        diffPercent: 5.1,
        status: 'expensive',
        stock: 'Terbatas',
        reportsCount: 14,
        lastUpdated: '06:00 WIB',
      },
    },
  },
  {
    id: 'bawang-merah',
    name: 'Bawang Merah Brebes',
    unit: 'kg',
    cityAvgPrice: 34000,
    markets: {
      'pasar-anyar': {
        price: 33000,
        diffPercent: -2.9,
        status: 'cheaper',
        stock: 'Melimpah',
        reportsCount: 15,
        lastUpdated: '06:00 WIB',
      },
      'kebon-kembang': {
        price: 34000,
        diffPercent: 0.0,
        status: 'average',
        stock: 'Melimpah',
        reportsCount: 12,
        lastUpdated: '06:00 WIB',
      },
      sukasari: {
        price: 34500,
        diffPercent: 1.5,
        status: 'average',
        stock: 'Cukup',
        reportsCount: 8,
        lastUpdated: '06:00 WIB',
      },
      'jambu-dua': {
        price: 35000,
        diffPercent: 2.9,
        status: 'average',
        stock: 'Cukup',
        reportsCount: 10,
        lastUpdated: '06:00 WIB',
      },
      'gunung-batu': {
        price: 36000,
        diffPercent: 5.9,
        status: 'expensive',
        stock: 'Terbatas',
        reportsCount: 7,
        lastUpdated: '05:30 WIB',
      },
    },
  },
  {
    id: 'daging-sapi',
    name: 'Daging Sapi Murni',
    unit: 'kg',
    cityAvgPrice: 137000,
    markets: {
      sukasari: {
        price: 134000,
        diffPercent: -2.2,
        status: 'cheaper',
        stock: 'Melimpah',
        reportsCount: 14,
        lastUpdated: '05:00 WIB',
      },
      'pasar-anyar': {
        price: 136000,
        diffPercent: -0.7,
        status: 'average',
        stock: 'Cukup',
        reportsCount: 10,
        lastUpdated: '06:00 WIB',
      },
      'kebon-kembang': {
        price: 138000,
        diffPercent: 0.7,
        status: 'average',
        stock: 'Cukup',
        reportsCount: 9,
        lastUpdated: '06:00 WIB',
      },
      'jambu-dua': {
        price: 139000,
        diffPercent: 1.5,
        status: 'average',
        stock: 'Terbatas',
        reportsCount: 6,
        lastUpdated: '06:00 WIB',
      },
      'gunung-batu': {
        price: 140000,
        diffPercent: 2.2,
        status: 'expensive',
        stock: 'Terbatas',
        reportsCount: 5,
        lastUpdated: '05:30 WIB',
      },
    },
  },
  {
    id: 'beras-medium',
    name: 'Beras Medium IR-64',
    unit: 'kg',
    cityAvgPrice: 13900,
    markets: {
      'kebon-kembang': {
        price: 13500,
        diffPercent: -2.9,
        status: 'cheaper',
        stock: 'Melimpah',
        reportsCount: 21,
        lastUpdated: '06:00 WIB',
      },
      'pasar-anyar': {
        price: 13700,
        diffPercent: -1.4,
        status: 'average',
        stock: 'Melimpah',
        reportsCount: 16,
        lastUpdated: '06:00 WIB',
      },
      'gunung-batu': {
        price: 13900,
        diffPercent: 0.0,
        status: 'average',
        stock: 'Cukup',
        reportsCount: 11,
        lastUpdated: '05:30 WIB',
      },
      sukasari: {
        price: 14100,
        diffPercent: 1.4,
        status: 'average',
        stock: 'Cukup',
        reportsCount: 9,
        lastUpdated: '06:00 WIB',
      },
      'jambu-dua': {
        price: 14200,
        diffPercent: 2.2,
        status: 'expensive',
        stock: 'Cukup',
        reportsCount: 8,
        lastUpdated: '06:00 WIB',
      },
    },
  },
  {
    id: 'minyak-goreng',
    name: 'Minyak Goreng Curah',
    unit: 'kg',
    cityAvgPrice: 16300,
    markets: {
      'pasar-anyar': {
        price: 16000,
        diffPercent: -1.8,
        status: 'cheaper',
        stock: 'Melimpah',
        reportsCount: 19,
        lastUpdated: '06:00 WIB',
      },
      'kebon-kembang': {
        price: 16200,
        diffPercent: -0.6,
        status: 'average',
        stock: 'Melimpah',
        reportsCount: 13,
        lastUpdated: '06:00 WIB',
      },
      sukasari: {
        price: 16400,
        diffPercent: 0.6,
        status: 'average',
        stock: 'Cukup',
        reportsCount: 10,
        lastUpdated: '06:00 WIB',
      },
      'jambu-dua': {
        price: 16500,
        diffPercent: 1.2,
        status: 'average',
        stock: 'Cukup',
        reportsCount: 12,
        lastUpdated: '06:00 WIB',
      },
      'gunung-batu': {
        price: 16800,
        diffPercent: 3.1,
        status: 'expensive',
        stock: 'Terbatas',
        reportsCount: 8,
        lastUpdated: '05:30 WIB',
      },
    },
  },
];
