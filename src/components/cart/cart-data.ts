export interface CartItem {
  id: string;
  name: string;
  unit: string;
  quantity: number; // in unit (e.g. 2 for 2 kg)
  avgPricePerUnit: number;
  pricesByMarket: Record<string, number>; // marketId -> price per unit
}

export const INITIAL_CART_ITEMS: CartItem[] = [
  {
    id: 'beras-medium',
    name: 'Beras Medium IR-64',
    unit: 'kg',
    quantity: 5,
    avgPricePerUnit: 13900,
    pricesByMarket: {
      sukasari: 14100,
      'pasar-anyar': 13700,
      'kebon-kembang': 13500,
      'gunung-batu': 13900,
      'jambu-dua': 14200,
    },
  },
  {
    id: 'cabai-rawit-merah',
    name: 'Cabai Rawit Merah',
    unit: 'kg',
    quantity: 1,
    avgPricePerUnit: 60400,
    pricesByMarket: {
      sukasari: 58000,
      'pasar-anyar': 61000,
      'kebon-kembang': 63500,
      'gunung-batu': 60500,
      'jambu-dua': 59500,
    },
  },
  {
    id: 'bawang-merah',
    name: 'Bawang Merah Brebes',
    unit: 'kg',
    quantity: 1,
    avgPricePerUnit: 34000,
    pricesByMarket: {
      sukasari: 34500,
      'pasar-anyar': 33000,
      'kebon-kembang': 34000,
      'gunung-batu': 36000,
      'jambu-dua': 35000,
    },
  },
  {
    id: 'daging-ayam',
    name: 'Daging Ayam Broiler',
    unit: 'kg',
    quantity: 2,
    avgPricePerUnit: 36500,
    pricesByMarket: {
      sukasari: 36000,
      'pasar-anyar': 36500,
      'kebon-kembang': 37500,
      'gunung-batu': 37000,
      'jambu-dua': 36500,
    },
  },
  {
    id: 'minyak-goreng',
    name: 'Minyak Goreng Curah',
    unit: 'liter',
    quantity: 2,
    avgPricePerUnit: 16300,
    pricesByMarket: {
      sukasari: 16400,
      'pasar-anyar': 16000,
      'kebon-kembang': 16200,
      'gunung-batu': 16800,
      'jambu-dua': 16500,
    },
  },
];

export const AVAILABLE_COMMODITIES_TO_ADD = [
  {
    id: 'telur-ayam',
    name: 'Telur Ayam Ras',
    unit: 'kg',
    avgPricePerUnit: 27500,
    pricesByMarket: {
      sukasari: 27000,
      'pasar-anyar': 27500,
      'kebon-kembang': 28000,
      'gunung-batu': 28000,
      'jambu-dua': 27500,
    },
  },
  {
    id: 'daging-sapi',
    name: 'Daging Sapi Murni',
    unit: 'kg',
    avgPricePerUnit: 137000,
    pricesByMarket: {
      sukasari: 134000,
      'pasar-anyar': 136000,
      'kebon-kembang': 138000,
      'gunung-batu': 140000,
      'jambu-dua': 139000,
    },
  },
  {
    id: 'gula-pasir',
    name: 'Gula Pasir Konsumsi',
    unit: 'kg',
    avgPricePerUnit: 17500,
    pricesByMarket: {
      sukasari: 17500,
      'pasar-anyar': 17200,
      'kebon-kembang': 17500,
      'gunung-batu': 17800,
      'jambu-dua': 17600,
    },
  },
  {
    id: 'tomat-sayur',
    name: 'Tomat Sayur Segar',
    unit: 'kg',
    avgPricePerUnit: 12000,
    pricesByMarket: {
      sukasari: 11500,
      'pasar-anyar': 12000,
      'kebon-kembang': 11800,
      'gunung-batu': 12500,
      'jambu-dua': 12200,
    },
  },
];

export const CART_MARKETS = [
  { id: 'sukasari', name: 'Pasar Bogor (Sukasari)', district: 'Bogor Timur', mapsUrl: 'https://maps.google.com/?q=Pasar+Sukasari+Bogor' },
  { id: 'pasar-anyar', name: 'Pasar Anyar', district: 'Bogor Tengah', mapsUrl: 'https://maps.google.com/?q=Pasar+Anyar+Bogor' },
  { id: 'jambu-dua', name: 'Pasar Jambu Dua', district: 'Bogor Utara', mapsUrl: 'https://maps.google.com/?q=Pasar+Jambu+Dua+Bogor' },
  { id: 'gunung-batu', name: 'Pasar Gunung Batu', district: 'Bogor Barat', mapsUrl: 'https://maps.google.com/?q=Pasar+Gunung+Batu+Bogor' },
  { id: 'kebon-kembang', name: 'Pasar Kebon Kembang', district: 'Bogor Tengah', mapsUrl: 'https://maps.google.com/?q=Pasar+Kebon+Kembang+Bogor' },
];
