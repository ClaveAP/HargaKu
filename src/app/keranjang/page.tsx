import { Metadata } from 'next';
import { CartHeader } from '@/components/cart/CartHeader';
import { CartContainer } from '@/components/cart/CartContainer';

export const metadata: Metadata = {
  title: 'Kalkulator & Keranjang Belanja · HargaKu',
  description:
    'Simulasi belanja dapur mingguan di pasar-pasar tradisional untuk menemukan pasar paling hemat di wilayah Anda.',
};

export default function KeranjangPage() {
  return (
    <div className="w-full px-4 sm:px-8 lg:px-12 py-10 sm:py-14">
      <div className="max-w-[1240px] mx-auto space-y-8">
        <CartHeader />
        <CartContainer />
      </div>
    </div>
  );
}
