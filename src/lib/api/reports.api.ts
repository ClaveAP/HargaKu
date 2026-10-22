import { ApiResponse } from '@/types';

export interface SubmitReportPayload {
  commodityId: string;
  marketId: string;
  reportedPrice: number;
  unit: string;
  purchaseDate: string;
  photoFile?: File | null;
  notes?: string;
}

export interface SubmitReportResponse {
  reportId: string;
  status: 'PENDING' | 'APPROVED';
  commodityName: string;
  marketName: string;
  normalizedPrice: number;
  submittedAt: string;
  message: string;
}

export async function submitCitizenReport(
  payload: SubmitReportPayload
): Promise<ApiResponse<SubmitReportResponse>> {
  // Simulate network delay for realistic tactile feedback
  await new Promise((resolve) => setTimeout(resolve, 800));

  const reportId = `rep_${Date.now().toString().slice(-6)}`;

  return {
    success: true,
    message: 'Laporan warga berhasil dikirim dan diverifikasi awal.',
    data: {
      reportId,
      status: 'PENDING',
      commodityName: payload.commodityId,
      marketName: payload.marketId,
      normalizedPrice: payload.reportedPrice,
      submittedAt: new Date().toISOString(),
      message:
        'Terima kasih atas kontribusi panganmu! Laporanmu sedang diverifikasi algoritma MAD & konsensus moderator TPID.',
    },
  };
}
