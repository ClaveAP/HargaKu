export interface MarketData {
  id: string;
  name: string;
  shortName: string;
  distance: string;
  address: string;
  specialty: string;
  hours: string;
  bestTime: string;
  topPrices: Array<{
    item: string;
    price: string;
    badge: string;
    isCheapest?: boolean;
  }>;
}

export const BOGOR_MARKETS: MarketData[] = [
  {
    id: 'kebon-kembang',
    name: 'Pasar Kebon Kembang',
    shortName: 'Kebon Kembang',
    distance: '1.2 km dari Stasiun Bogor',
    address: 'Jl. Dewi Sartika, Bogor Tengah',
    specialty: 'Sentra Grosir & Eceran Cabai, Tomat, dan Sayur Mayur',
    hours: '04:00 – 14:00 WIB',
    bestTime: '06:00 – 08:30 WIB (Pasokan baru bongkar muat)',
    topPrices: [
      { item: 'Cabai Merah Keriting', price: 'Rp 48.000 / kg', badge: 'Termurah Kota', isCheapest: true },
      { item: 'Bawang Merah Brebes', price: 'Rp 34.000 / kg', badge: 'Wajar' },
      { item: 'Beras Medium IR-64', price: 'Rp 13.500 / kg', badge: 'Termurah', isCheapest: true },
    ],
  },
  {
    id: 'pasar-anyar',
    name: 'Pasar Anyar',
    shortName: 'Pasar Anyar',
    distance: '1.8 km dari Tugu Kujang',
    address: 'Jl. Pabaton, Bogor Tengah',
    specialty: 'Sentra Bumbu Dapur Kering, Bawang, dan Rempah',
    hours: '04:30 – 15:00 WIB',
    bestTime: '07:00 – 09:30 WIB (Paling lengkap)',
    topPrices: [
      { item: 'Bawang Merah Brebes', price: 'Rp 33.000 / kg', badge: 'Termurah Kota', isCheapest: true },
      { item: 'Minyak Goreng Curah', price: 'Rp 16.000 / kg', badge: 'Termurah', isCheapest: true },
      { item: 'Cabai Rawit Merah', price: 'Rp 62.000 / kg', badge: 'Wajar' },
    ],
  },
  {
    id: 'sukasari',
    name: 'Pasar Bogor (Sukasari)',
    shortName: 'Sukasari',
    distance: '2.4 km dari Kebun Raya',
    address: 'Jl. Siliwangi, Bogor Timur',
    specialty: 'Sentra Daging Sapi Murni, Unggas, dan Ikan Olahan',
    hours: '03:30 – 12:00 WIB',
    bestTime: '05:00 – 07:30 WIB (Daging potong segar)',
    topPrices: [
      { item: 'Daging Sapi Murni', price: 'Rp 134.000 / kg', badge: 'Termurah Kota', isCheapest: true },
      { item: 'Daging Ayam Broiler', price: 'Rp 36.000 / kg', badge: 'Wajar' },
      { item: 'Telur Ayam Ras', price: 'Rp 27.500 / kg', badge: 'Wajar' },
    ],
  },
  {
    id: 'gunung-batu',
    name: 'Pasar Gunung Batu',
    shortName: 'Gunung Batu',
    distance: '3.1 km Barat Kota',
    address: 'Jl. Gunung Batu, Bogor Barat',
    specialty: 'Sentra Hasil Bumi Tradisional & Sayuran Dataran Tinggi',
    hours: '05:00 – 14:00 WIB',
    bestTime: '06:30 – 09:00 WIB',
    topPrices: [
      { item: 'Kentang Dieng', price: 'Rp 18.000 / kg', badge: 'Termurah', isCheapest: true },
      { item: 'Wortel Brastagi', price: 'Rp 14.000 / kg', badge: 'Wajar' },
      { item: 'Cabai Merah Keriting', price: 'Rp 53.000 / kg', badge: 'Tinggi' },
    ],
  },
  {
    id: 'jambu-dua',
    name: 'Pasar Jambu Dua',
    shortName: 'Jambu Dua',
    distance: '3.8 km Utara Kota',
    address: 'Jl. Pajajaran Utara, Bogor Utara',
    specialty: 'Sentra Ikan Basah, Sayur Segar, dan Sembako Harian',
    hours: '04:00 – 14:30 WIB',
    bestTime: '06:00 – 08:30 WIB',
    topPrices: [
      { item: 'Ikan Kembung Segar', price: 'Rp 38.000 / kg', badge: 'Termurah', isCheapest: true },
      { item: 'Minyak Goreng Curah', price: 'Rp 16.500 / kg', badge: 'Wajar' },
      { item: 'Bawang Putih Honan', price: 'Rp 39.000 / kg', badge: 'Wajar' },
    ],
  },
];
