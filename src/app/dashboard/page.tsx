import { fetchCommodities } from '@/lib/api/commodities.api';
import { CommodityDashboardView } from '@/components/dashboard/CommodityDashboardView';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';

export default async function DashboardPage() {
  const commodities = await fetchCommodities();

  return (
    <div className="w-full px-4 sm:px-8 lg:px-12 py-10 sm:py-14">
      <div className="max-w-[1240px] mx-auto space-y-8">
        <DashboardHeader lastUpdatedText="22 Okt 2026, 06:00 WIB" />
        <CommodityDashboardView initialCommodities={commodities} />
      </div>
    </div>
  );
}
