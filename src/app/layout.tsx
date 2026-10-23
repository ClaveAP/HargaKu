import type { Metadata } from 'next';
import './globals.css';
import { roobert, clayDisplay } from '@/app/fonts';
import { PublicLayoutWrapper } from '@/components/layout/PublicLayoutWrapper';

export const metadata: Metadata = {
  title: 'HargaKu — Tahu Harga Wajar Pasar Sebelum Melangkah Belanja',
  description:
    'Platform transparansi komoditas pangan dengan standarisasi acuan nasional Bapanas terkalibrasi daerah. Cek tren harga riil dari rumah sebelum melangkah belanja dan deteksi potensi mark-up pedagang di lapak pasar.',
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
