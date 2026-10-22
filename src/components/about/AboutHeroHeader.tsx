import Link from 'next/link';
import { ArrowRight, Sparkle } from '@phosphor-icons/react/dist/ssr';

export function AboutHeroHeader() {
  return (
    <div className="flex flex-col gap-6 pb-4">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[12px] text-[#6E6D67]">
        <Link href="/" className="hover:text-[#1B1A18] transition-colors">
          Beranda
        </Link>
        <span>/</span>
        <span className="text-[#1B1A18] font-medium">Tentang &amp; Sumber Data</span>
      </nav>

      {/* Main Headline & Eyebrow */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white outline outline-1 outline-[#E5E3DE] shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#FF7714]" />
          <span className="text-[11px] font-bold text-[#1B1A18] uppercase tracking-wider">
            Transparansi Pangan Publik · Kota Bogor
          </span>
        </div>

        <h1 className="text-[34px] sm:text-[44px] lg:text-[48px] font-medium text-[#1B1A18] leading-[1.12] tracking-tight">
          Tentang HargaKu &amp; Integritas Data
        </h1>

        <p className="text-[15px] sm:text-[16px] text-[#6E6D67] max-w-[760px] leading-[1.6]">
          HargaKu adalah instrumen transparansi harga komoditas pangan independen untuk inisiatif{' '}
          <strong className="text-[#1B1A18] font-semibold">Web In Action (WIA 2026, UPN Veteran Jakarta)</strong>. 
          Dirancang untuk membantu warga belanja cerdas tanpa kecemasan, melindungi privasi pedagang tradisional, dan menyajikan data berbasis metodologi statistik yang akuntabel.
        </p>
      </div>

      {/* Quick Jump Anchor Pills */}
      <div className="flex flex-wrap items-center gap-2.5 pt-2">
        <a
          href="#sumber-data"
          className="px-3.5 py-1.5 rounded-full bg-white hover:bg-[#FAF9F5] outline outline-1 outline-[#E5E3DE] text-[12px] font-medium text-[#1B1A18] transition-colors"
        >
          Sumber Data Resmi
        </a>
        <a
          href="#metodologi"
          className="px-3.5 py-1.5 rounded-full bg-white hover:bg-[#FAF9F5] outline outline-1 outline-[#E5E3DE] text-[12px] font-medium text-[#1B1A18] transition-colors"
        >
          Metodologi 3 Lapis &amp; MAD
        </a>
        <a
          href="#etika-pedagang"
          className="px-3.5 py-1.5 rounded-full bg-white hover:bg-[#FAF9F5] outline outline-1 outline-[#E5E3DE] text-[12px] font-medium text-[#1B1A18] transition-colors"
        >
          Etika Perlindungan Lapak
        </a>
        <a
          href="#tim-pengembang"
          className="px-3.5 py-1.5 rounded-full bg-white hover:bg-[#FAF9F5] outline outline-1 outline-[#E5E3DE] text-[12px] font-medium text-[#1B1A18] transition-colors"
        >
          Tim WIA 2026
        </a>
      </div>
    </div>
  );
}
