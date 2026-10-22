import { Metadata } from 'next';
import { AboutHeroHeader } from '@/components/about/AboutHeroHeader';
import { AboutDemoNotice } from '@/components/about/AboutDemoNotice';
import { AboutDataSourceCards } from '@/components/about/AboutDataSourceCards';
import { AboutMethodologySection } from '@/components/about/AboutMethodologySection';
import { AboutEthicsPrinciples } from '@/components/about/AboutEthicsPrinciples';
import { AboutTeamAndTechStack } from '@/components/about/AboutTeamAndTechStack';

export const metadata: Metadata = {
  title: 'Tentang & Sumber Data Resmi · HargaKu',
  description:
    'Transparansi data pangan, metodologi evaluasi 3 lapis, filter anomali MAD, serta 5 prinsip etika perlindungan lapak pedagang pasar tradisional Kota Bogor.',
};

export default function TentangPage() {
  return (
    <div className="w-full bg-[#FAF9F5] py-10 sm:py-14 px-4 sm:px-8 lg:px-12">
      <div className="max-w-[1240px] mx-auto space-y-12">
        {/* Header & Breadcrumb */}
        <AboutHeroHeader />

        {/* Notice Banner: Demo Simulation */}
        <AboutDemoNotice />

        {/* 4 Official Data Sources */}
        <AboutDataSourceCards />

        {/* 3-Stage Valuation Methodology & MAD */}
        <AboutMethodologySection />

        {/* 5 Ethics & Merchant Protection Principles */}
        <AboutEthicsPrinciples />

        {/* Team & Architecture Stack */}
        <AboutTeamAndTechStack />
      </div>
    </div>
  );
}
