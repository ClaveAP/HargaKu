import { MarketPriceRank } from './ClayMarketRankings';

export interface CommodityPreset {
  id: string;
  name: string;
  shortName: string;
  averagePrice: number;
  cheapestMarket: string;
  cheapestPrice: number;
  ranks: MarketPriceRank[];
}

export const COMMODITY_PRESETS: CommodityPreset[] = [
  {
    id: 'cabai-merah',
    name: 'Cabai Merah Keriting',
    shortName: 'Cabai Merah',
    averagePrice: 51200,
    cheapestMarket: 'Pasar Kebon Kembang',
    cheapestPrice: 48000,
    ranks: [
      {
        rank: 1,
        marketName: 'Pasar Kebon Kembang',
        price: 48000,
        diffPercent: -6.2,
        badge: { label: 'Termurah', bg: '#EEF773', text: '#1B1A18' },
      },
      {
        rank: 2,
        marketName: 'Pasar Bogor (Sukasari)',
        price: 50000,
        diffPercent: -2.3,
        badge: { label: 'Wajar', bg: '#F4F3F0', text: '#1B1A18' },
      },
      {
        rank: 3,
        marketName: 'Pasar Anyar',
        price: 51000,
        diffPercent: -0.4,
        badge: { label: 'Wajar', bg: '#F4F3F0', text: '#1B1A18' },
      },
      {
        rank: 4,
        marketName: 'Pasar Gunung Batu',
        price: 53000,
        diffPercent: 3.5,
        badge: { label: 'Tinggi', bg: '#FEF3C7', text: '#92400E' },
      },
      {
        rank: 5,
        marketName: 'Pasar Jambu Dua',
        price: 54000,
        diffPercent: 5.4,
        badge: { label: 'Tertinggi', bg: '#FEE2E2', text: '#991B1B' },
      },
    ],
  },
  {
    id: 'bawang-merah',
    name: 'Bawang Merah Brebes',
    shortName: 'Bawang Merah',
    averagePrice: 35000,
    cheapestMarket: 'Pasar Anyar',
    cheapestPrice: 33000,
    ranks: [
      {
        rank: 1,
        marketName: 'Pasar Anyar',
        price: 33000,
        diffPercent: -5.7,
        badge: { label: 'Termurah', bg: '#EEF773', text: '#1B1A18' },
      },
      {
        rank: 2,
        marketName: 'Pasar Kebon Kembang',
        price: 34000,
        diffPercent: -2.9,
        badge: { label: 'Wajar', bg: '#F4F3F0', text: '#1B1A18' },
      },
      {
        rank: 3,
        marketName: 'Pasar Bogor',
        price: 35000,
        diffPercent: 0.0,
        badge: { label: 'Wajar', bg: '#F4F3F0', text: '#1B1A18' },
      },
      {
        rank: 4,
        marketName: 'Pasar Gunung Batu',
        price: 36000,
        diffPercent: 2.9,
        badge: { label: 'Wajar', bg: '#F4F3F0', text: '#1B1A18' },
      },
      {
        rank: 5,
        marketName: 'Pasar Sukasari',
        price: 37000,
        diffPercent: 5.7,
        badge: { label: 'Tinggi', bg: '#FEF3C7', text: '#92400E' },
      },
    ],
  },
  {
    id: 'daging-sapi',
    name: 'Daging Sapi Murni',
    shortName: 'Daging Sapi',
    averagePrice: 137000,
    cheapestMarket: 'Pasar Sukasari',
    cheapestPrice: 134000,
    ranks: [
      {
        rank: 1,
        marketName: 'Pasar Sukasari',
        price: 134000,
        diffPercent: -2.2,
        badge: { label: 'Termurah', bg: '#EEF773', text: '#1B1A18' },
      },
      {
        rank: 2,
        marketName: 'Pasar Anyar',
        price: 135000,
        diffPercent: -1.5,
        badge: { label: 'Wajar', bg: '#F4F3F0', text: '#1B1A18' },
      },
      {
        rank: 3,
        marketName: 'Pasar Bogor',
        price: 138000,
        diffPercent: 0.7,
        badge: { label: 'Wajar', bg: '#F4F3F0', text: '#1B1A18' },
      },
      {
        rank: 4,
        marketName: 'Pasar Kebon Kembang',
        price: 138000,
        diffPercent: 0.7,
        badge: { label: 'Wajar', bg: '#F4F3F0', text: '#1B1A18' },
      },
      {
        rank: 5,
        marketName: 'Pasar Gunung Batu',
        price: 140000,
        diffPercent: 2.2,
        badge: { label: 'Tinggi', bg: '#FEF3C7', text: '#92400E' },
      },
    ],
  },
  {
    id: 'minyak-curah',
    name: 'Minyak Goreng Curah',
    shortName: 'Minyak Curah',
    averagePrice: 16800,
    cheapestMarket: 'Pasar Anyar',
    cheapestPrice: 16000,
    ranks: [
      {
        rank: 1,
        marketName: 'Pasar Anyar',
        price: 16000,
        diffPercent: -4.8,
        badge: { label: 'Termurah', bg: '#EEF773', text: '#1B1A18' },
      },
      {
        rank: 2,
        marketName: 'Pasar Kebon Kembang',
        price: 16500,
        diffPercent: -1.8,
        badge: { label: 'Wajar', bg: '#F4F3F0', text: '#1B1A18' },
      },
      {
        rank: 3,
        marketName: 'Pasar Bogor',
        price: 17000,
        diffPercent: 1.2,
        badge: { label: 'Wajar', bg: '#F4F3F0', text: '#1B1A18' },
      },
      {
        rank: 4,
        marketName: 'Pasar Sukasari',
        price: 17000,
        diffPercent: 1.2,
        badge: { label: 'Wajar', bg: '#F4F3F0', text: '#1B1A18' },
      },
      {
        rank: 5,
        marketName: 'Pasar Gunung Batu',
        price: 17500,
        diffPercent: 4.2,
        badge: { label: 'Tinggi', bg: '#FEF3C7', text: '#92400E' },
      },
    ],
  },
];
