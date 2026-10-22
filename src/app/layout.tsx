import type { Metadata } from 'next';
import './globals.css';
import { roobert, clayDisplay } from '@/app/fonts';
import { PublicLayoutWrapper } from '@/components/layout/PublicLayoutWrapper';

export const metadata: Metadata = {
  title: 'HargaKu — Tahu Harga Wajar Pasar Sebelum Melangkah Belanja',
  description:
    'Platform transparansi komoditas pangan Kota Bogor. Bandingkan harga riil di 5 pasar tradisional, konversi takaran pedagang (ons, perempatan, kilo) secara instan, dan hindari spekulasi harga.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${roobert.variable} ${clayDisplay.variable}`}>
      <body className="min-h-screen flex flex-col font-sans bg-[#FAF9F5] text-[#1B1A18] antialiased selection:bg-[#EEF773] selection:text-[#1B1A18]">
        <PublicLayoutWrapper>{children}</PublicLayoutWrapper>
      </body>
    </html>
  );
}
