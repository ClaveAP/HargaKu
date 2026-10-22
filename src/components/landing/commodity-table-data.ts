export interface CommodityRow {
  name: string;
  category: 'cabai' | 'beras' | 'daging' | 'minyak';
  sub: string;
  hapPrice: string;
  avgPrice: string;
  cheapestMarket: string;
  cheapestPrice: string;
  trend: string;
  trendType: 'down' | 'stable' | 'up';
  status: string;
}

export const COMMODITIES: CommodityRow[] = [
  {
    name: 'Cabai Merah Keriting',
    category: 'cabai',
    sub: 'Kualitas super segar',
    hapPrice: 'Rp 40.000 / kg',
    avgPrice: 'Rp 51.200 / kg',
    cheapestMarket: 'Pasar Kebon Kembang',
    cheapestPrice: 'Rp 48.000 / kg',
    trend: '-4.2%',
    trendType: 'down',
    status: 'Wajar',
  },
  {
    name: 'Bawang Merah Brebes',
    category: 'cabai',
    sub: 'Sedang & kering panen',
    hapPrice: 'Rp 36.500 / kg',
    avgPrice: 'Rp 35.000 / kg',
    cheapestMarket: 'Pasar Anyar',
    cheapestPrice: 'Rp 33.000 / kg',
    trend: '-2.8%',
    trendType: 'down',
    status: 'Wajar',
  },
  {
    name: 'Cabai Rawit Merah',
    category: 'cabai',
    sub: 'Pedas segar Brebes/Garut',
    hapPrice: 'Rp 57.000 / kg',
    avgPrice: 'Rp 62.000 / kg',
    cheapestMarket: 'Pasar Sukasari',
    cheapestPrice: 'Rp 58.000 / kg',
    trend: '+8.5%',
    trendType: 'up',
    status: 'Agak Mahal',
  },
  {
    name: 'Daging Sapi Murni',
    category: 'daging',
    sub: 'Has dalam paha belakang',
    hapPrice: 'Rp 140.000 / kg',
    avgPrice: 'Rp 137.000 / kg',
    cheapestMarket: 'Pasar Sukasari',
    cheapestPrice: 'Rp 134.000 / kg',
    trend: '-1.5%',
    trendType: 'down',
    status: 'Wajar',
  },
  {
    name: 'Daging Ayam Broiler',
    category: 'daging',
    sub: 'Ayam ras karkas segar',
    hapPrice: 'Rp 36.750 / kg',
    avgPrice: 'Rp 37.500 / kg',
    cheapestMarket: 'Pasar Kebon Kembang',
    cheapestPrice: 'Rp 36.000 / kg',
    trend: '0.0%',
    trendType: 'stable',
    status: 'Wajar',
  },
  {
    name: 'Minyak Goreng Curah',
    category: 'minyak',
    sub: 'HET resmi kemasan/curah',
    hapPrice: 'Rp 15.700 / lt',
    avgPrice: 'Rp 16.800 / lt',
    cheapestMarket: 'Pasar Anyar',
    cheapestPrice: 'Rp 16.000 / lt',
    trend: '+1.8%',
    trendType: 'up',
    status: 'Wajar',
  },
  {
    name: 'Beras Medium IR-64',
    category: 'beras',
    sub: 'Pulen lokal Cianjur',
    hapPrice: 'Rp 14.500 / kg',
    avgPrice: 'Rp 14.200 / kg',
    cheapestMarket: 'Pasar Kebon Kembang',
    cheapestPrice: 'Rp 13.500 / kg',
    trend: '-1.8%',
    trendType: 'down',
    status: 'Wajar',
  },
];
