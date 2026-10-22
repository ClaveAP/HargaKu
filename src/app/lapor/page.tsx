import { Metadata } from 'next';
import { fetchCommodities } from '@/lib/api/commodities.api';
import { fetchMarkets } from '@/lib/api/markets.api';
import { LaporHeader } from '@/components/lapor/LaporHeader';
import { LaporContainer } from '@/components/lapor/LaporContainer';

export const metadata: Metadata = {
  title: 'Kirim Laporan Harga Lapak · HargaKu',
  description:
    'Laporkan harga pangan komoditas yang kamu temui di pasar tradisional Kota Bogor dengan privasi terjamin.',
};

export default async function LaporPage() {
  const [commodities, markets] = await Promise.all([
    fetchCommodities(),
    fetchMarkets(),
  ]);

  return (
    <div className="w-full px-4 sm:px-8 lg:px-12 py-10 sm:py-14">
      <div className="max-w-[1240px] mx-auto space-y-8">
        <LaporHeader />
        <LaporContainer commodities={commodities} markets={markets} />
      </div>
    </div>
  );
}
