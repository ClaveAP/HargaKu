import { fetchCommodities } from '@/lib/api/commodities.api';
import { fetchMarkets } from '@/lib/api/markets.api';
import { PriceCheckHeader } from '@/components/price/PriceCheckHeader';
import { PriceCheckerContainer } from '@/components/price/PriceCheckerContainer';

interface Props {
  searchParams?: Promise<{
    commodity?: string;
    market?: string;
  }>;
}

export default async function CekHargaPage({ searchParams }: Props) {
  const resolvedParams = searchParams ? await searchParams : {};
  const [commodities, markets] = await Promise.all([
    fetchCommodities(),
    fetchMarkets(),
  ]);

  return (
    <div className="w-full px-4 sm:px-8 lg:px-12 py-10 sm:py-14">
      <div className="max-w-[1240px] mx-auto space-y-8">
        <PriceCheckHeader />
        <PriceCheckerContainer
          initialCommodities={commodities}
          initialMarkets={markets}
          initialCommoditySlug={resolvedParams.commodity}
          initialMarketId={resolvedParams.market}
        />
      </div>
    </div>
  );
}
