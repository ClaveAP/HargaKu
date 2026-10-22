import { ClayHeroSection } from '@/components/landing/ClayHeroSection';
import { ClaySupplyChainSection } from '@/components/landing/ClaySupplyChainSection';
import { ClayMarketMapSection } from '@/components/landing/ClayMarketMapSection';
import { ClayCommodityTableSection } from '@/components/landing/ClayCommodityTableSection';
import { ClayClosingCtaSection } from '@/components/landing/ClayClosingCtaSection';

export default function HomePage() {
  return (
    <div className="w-full flex flex-col items-center bg-[#FAF9F5]">
      <ClayHeroSection />
      <ClaySupplyChainSection />
      <ClayMarketMapSection />
      <ClayCommodityTableSection />
      <ClayClosingCtaSection />
    </div>
  );
}
