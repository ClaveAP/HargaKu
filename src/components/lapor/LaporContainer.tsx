'use client';

import { useState } from 'react';
import { CommoditySummary, Market } from '@/types';
import { LaporFormCard } from './LaporFormCard';
import { LaporVerificationCard } from './LaporVerificationCard';
import { LaporSuccessCard } from './LaporSuccessCard';
import { submitCitizenReport } from '@/lib/api/reports.api';

interface Props {
  commodities: CommoditySummary[];
  markets: Market[];
}

interface SubmittedReportState {
  reportId: string;
  commodityName: string;
  marketName: string;
  pricePerUnit: number;
  unitLabel: string;
  normalizedPricePerKg: number;
  hasPhoto: boolean;
}

export function LaporContainer({ commodities, markets }: Props) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedReport, setSubmittedReport] =
    useState<SubmittedReportState | null>(null);

  const handleSubmit = async (data: {
    commodityId: string;
    marketId: string;
    price: number;
    unit: string;
    normalizedPrice: number;
    purchaseDate: string;
    photoFile: File | null;
    notes: string;
  }) => {
    setIsSubmitting(true);
    try {
      const res = await submitCitizenReport({
        commodityId: data.commodityId,
        marketId: data.marketId,
        reportedPrice: data.price,
        unit: data.unit,
        purchaseDate: data.purchaseDate,
        photoFile: data.photoFile,
        notes: data.notes,
      });

      const matchedCommodity = commodities.find(
        (c) => c.id === data.commodityId
      );
      const matchedMarket = markets.find((m) => m.id === data.marketId);

      setSubmittedReport({
        reportId: res.data.reportId,
        commodityName: matchedCommodity?.name || 'Komoditas Pangan',
        marketName: matchedMarket?.name || 'Pasar Bogor',
        pricePerUnit: data.price,
        unitLabel: data.unit,
        normalizedPricePerKg: data.normalizedPrice,
        hasPhoto: !!data.photoFile,
      });
    } catch {
      // In case of simulated error
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Column: Form or Success */}
      <div className="lg:col-span-7 xl:col-span-7">
        {submittedReport ? (
          <LaporSuccessCard
            reportId={submittedReport.reportId}
            commodityName={submittedReport.commodityName}
            marketName={submittedReport.marketName}
            pricePerUnit={submittedReport.pricePerUnit}
            unitLabel={submittedReport.unitLabel}
            normalizedPricePerKg={submittedReport.normalizedPricePerKg}
            hasPhoto={submittedReport.hasPhoto}
            onReset={() => setSubmittedReport(null)}
          />
        ) : (
          <LaporFormCard
            commodities={commodities}
            markets={markets}
            isSubmitting={isSubmitting}
            onSubmit={handleSubmit}
          />
        )}
      </div>

      {/* Right Column: Verification Pipeline & Security Guarantees */}
      <div className="lg:col-span-5 xl:col-span-5">
        <LaporVerificationCard />
      </div>
    </div>
  );
}
