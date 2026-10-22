import { Metadata } from 'next';
import { AdminLoginForm } from '@/components/admin/AdminLoginForm';
import { AdminLoginShowcase } from '@/components/admin/AdminLoginShowcase';

export const metadata: Metadata = {
  title: 'Masuk Konsol Admin TPID · HargaKu',
  description:
    'Portal autentikasi petugas Disperindag & TPID Kota Bogor untuk pengelolaan data komoditas dan moderasi.',
};

export default function AdminLoginPage() {
  return (
    <div className="w-full min-h-screen bg-[#F4F3F0] flex items-center justify-center p-3 sm:p-6 lg:p-8">
      {/* Split-Screen Bento Shell */}
      <div className="w-full max-w-5xl min-h-[640px] bg-white border border-[#E5E3DE] rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.06)] overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        {/* Left Column: Brand Showcase & Bento Highlights */}
        <div className="lg:col-span-7 hidden lg:block">
          <AdminLoginShowcase />
        </div>

        {/* Right Column: Login Form Container */}
        <div className="lg:col-span-5 bg-[#FAF9F5] p-6 sm:p-10 flex flex-col justify-center items-center">
          <AdminLoginForm />
        </div>
      </div>
    </div>
  );
}
