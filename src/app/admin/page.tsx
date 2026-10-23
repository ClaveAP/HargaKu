import { Metadata } from 'next';
import { AdminAuthGuard } from '@/components/admin/AdminAuthGuard';
import { AdminContainer } from '@/components/admin/AdminContainer';

export const metadata: Metadata = {
  title: 'Admin Console & Moderasi TPID · HargaKu',
  description:
    'Pusat kendali data pangan publik: katalog komoditas, pasar tradisional, entri harga harian resmi, dan moderasi laporan warga.',
};

export default function AdminPage() {
  return (
    <div className="w-full min-h-screen bg-[#F4F3F0] p-3 sm:p-5 lg:p-6 flex flex-col">
      <div className="max-w-[1440px] w-full mx-auto flex-1 flex flex-col">
        <AdminAuthGuard>
          <AdminContainer />
        </AdminAuthGuard>
      </div>
    </div>
  );
}
