import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full bg-[#FAF9F5] border-t border-[#E5E3DE] py-16 px-4 sm:px-8 lg:px-12">
      <div className="max-w-[1240px] mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 pb-12 border-b border-[#E5E3DE]">
          {/* Brand Info */}
          <div className="max-w-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-[6px] bg-[#EEF773] outline outline-[1.5px] outline-[#1B1A18] -outline-offset-[0.75px] flex items-center justify-center font-bold text-[13px] text-[#1B1A18]">
                H
              </div>
              <div className="flex items-baseline">
                <span className="font-bold text-[18px] text-[#1B1A18]">
                  HargaKu
                </span>
                <span className="font-bold text-[20px] text-[#FF7714]">.</span>
              </div>
            </div>
            <p className="text-[13px] leading-[20px] text-[#6E6D67]">
              Platform transparansi harga komoditas pangan tradisional berbasis data terverifikasi.
              Membantu warga belanja cerdas dan mendukung stabilitas harga pangan Kota Bogor.
            </p>
            <div className="text-[12px] text-[#8C8B85]">
              © 2026 HargaKu. Kolaborasi Terbuka WIA 2026.
            </div>
          </div>

          {/* Link Columns */}
          <div className="flex flex-wrap gap-12 sm:gap-16">
            {/* Menu Utama (100% Publik) */}
            <div className="space-y-3 min-w-[140px]">
              <div className="text-[11px] font-bold text-[#1B1A18] uppercase tracking-wider">
                Menu Utama
              </div>
              <ul className="space-y-2 text-[13px] text-[#6E6D67]">
                <li>
                  <Link href="/dashboard" className="hover:text-[#1B1A18] transition-colors">
                    Harga Komoditas
                  </Link>
                </li>
                <li>
                  <Link href="/cek-harga" className="hover:text-[#1B1A18] transition-colors">
                    Cek Harga Wajar
                  </Link>
                </li>
                <li>
                  <Link href="/peta" className="hover:text-[#1B1A18] transition-colors">
                    Peta Pasar
                  </Link>
                </li>
                <li>
                  <Link href="/lapor" className="hover:text-[#1B1A18] transition-colors">
                    Lapor Harga
                  </Link>
                </li>
                <li>
                  <Link href="/keranjang" className="hover:text-[#1B1A18] transition-colors">
                    Keranjang Belanja
                  </Link>
                </li>
                <li>
                  <Link href="/tentang" className="hover:text-[#1B1A18] transition-colors">
                    Tentang HargaKu
                  </Link>
                </li>
              </ul>
            </div>

            {/* Sumber Data (Khusus Website Resmi Eksternal) */}
            <div className="space-y-3 min-w-[140px]">
              <div className="text-[11px] font-bold text-[#1B1A18] uppercase tracking-wider">
                Sumber Data Resmi
              </div>
              <ul className="space-y-2 text-[13px] text-[#6E6D67]">
                <li>
                  <a
                    href="https://www.bi.go.id/hargapangan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#1B1A18] transition-colors inline-flex items-center gap-1"
                  >
                    <span>PIHPS Bank Indonesia</span>
                    <span className="text-[11px] text-[#8E8D86]">↗</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://panelharga.badanpangan.go.id"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#1B1A18] transition-colors inline-flex items-center gap-1"
                  >
                    <span>Panel Harga Bapanas</span>
                    <span className="text-[11px] text-[#8E8D86]">↗</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://badanpangan.go.id"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#1B1A18] transition-colors inline-flex items-center gap-1"
                  >
                    <span>Badan Pangan Nasional</span>
                    <span className="text-[11px] text-[#8E8D86]">↗</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://opendata.kotabogor.go.id"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#1B1A18] transition-colors inline-flex items-center gap-1"
                  >
                    <span>Open Data Kota Bogor</span>
                    <span className="text-[11px] text-[#8E8D86]">↗</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Pilot Kota Bogor */}
            <div className="space-y-3 min-w-[140px]">
              <div className="text-[11px] font-bold text-[#1B1A18] uppercase tracking-wider">
                Pasar Pilot Bogor
              </div>
              <ul className="space-y-2 text-[13px] text-[#6E6D67]">
                <li>
                  <Link href="/peta" className="hover:text-[#1B1A18] transition-colors">
                    Pasar Sukasari
                  </Link>
                </li>
                <li>
                  <Link href="/peta" className="hover:text-[#1B1A18] transition-colors">
                    Pasar Anyar
                  </Link>
                </li>
                <li>
                  <Link href="/peta" className="hover:text-[#1B1A18] transition-colors">
                    Pasar Kebon Kembang
                  </Link>
                </li>
                <li>
                  <Link href="/peta" className="hover:text-[#1B1A18] transition-colors">
                    Pasar Gunung Batu
                  </Link>
                </li>
                <li>
                  <Link href="/peta" className="hover:text-[#1B1A18] transition-colors">
                    Pasar Jambu Dua
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footnote */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[12px] text-[#8C8B85]">
          <div>Inisiatif transparansi pangan publik — Tanpa bias komersial.</div>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/tentang#etika-pedagang" className="hover:text-[#1B1A18] transition-colors">
              Privasi &amp; Sanitasi EXIF
            </Link>
            <span>·</span>
            <Link href="/tentang#etika-pedagang" className="hover:text-[#1B1A18] transition-colors">
              Etika &amp; Ketentuan Layanan
            </Link>
            <span>·</span>
            <Link
              href="/admin"
              className="text-[#8C8B85] hover:text-[#1B1A18] transition-colors underline decoration-[#E5E3DE] underline-offset-2"
              title="Dashboard Moderasi Internal TPID Kota Bogor"
            >
              Portal Petugas TPID
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
