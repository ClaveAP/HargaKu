import { Metadata } from 'next';
import { fetchCommodities } from '@/lib/api/commodities.api';
import { PetaHeader } from '@/components/peta/PetaHeader';
import { PetaContainer } from '@/components/peta/PetaContainer';

export const metadata: Metadata = {
  title: 'Peta Harga Pasar Tradisional · HargaKu',
  description:
    'Peta interaktif sebaran harga komoditas pangan pokok di 5 pasar tradisional Kota Bogor.',
};

export default async function PetaPage() {
  const commodities = await fetchCommodities();

  return (
    <div className="w-full px-4 sm:px-8 lg:px-12 py-10 sm:py-14">
      <div className="max-w-[1240px] mx-auto space-y-8">
        <PetaHeader />
        <PetaContainer initialCommodities={commodities} />
      </div>
    </div>
  );
}
