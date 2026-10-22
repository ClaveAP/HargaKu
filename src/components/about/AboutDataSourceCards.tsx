import { Database, ArrowSquareOut, Buildings, Bank, UsersFour, ChartLineUp } from '@phosphor-icons/react/dist/ssr';

interface DataSourceItem {
  id: string;
  name: string;
  institution: string;
  badge: string;
  badgeClass: string;
  role: string;
  cadence: string;
  description: string;
  linkText: string;
  href: string;
  icon: typeof Buildings;
}

const DATA_SOURCES: DataSourceItem[] = [
  {
    id: 'bapanas',
    name: 'Badan Pangan Nasional (Bapanas)',
    institution: 'Republik Indonesia',
    badge: 'Pemerintah Pusat',
    badgeClass: 'bg-[#FFF3ED] text-[#FF7714] outline-[#FFD9C7]',
    role: 'Lapis 1: Harga Acuan Penjualan (HAP) & HET',
    cadence: 'Regulasi Berkala (Perbadan No. 11/2022 & Update 2024)',
    description:
      'Penetapan ambang batas harga acuan di tingkat produsen dan konsumen sebagai patokan resmi stabilitas pangan nasional dan pencegahan inflasi.',
    linkText: 'Kunjungi Panel Harga Bapanas',
    href: 'https://panelharga.badanpangan.go.id',
    icon: Buildings,
  },
  {
    id: 'pihps',
    name: 'PIHPS Nasional (Bank Indonesia)',
    institution: 'Bank Sentral Republik Indonesia',
    badge: 'Bank Sentral',
    badgeClass: 'bg-[#FAF9F5] text-[#1B1A18] outline-[#E5E3DE]',
    role: 'Lapis 2: Rerata Harian Pasar Tradisional Kota Bogor',
    cadence: 'Pembaruan Harian Pukul 06:00 – 09:00 WIB',
    description:
      'Survei harga harian terstandar langsung dari pasar-pasar tradisional strategis untuk mengukur tekanan inflasi pangan bergejolak (volatile foods).',
    linkText: 'Kunjungi PIHPS Nasional',
    href: 'https://www.bi.go.id/hargapangan',
    icon: Bank,
  },
  {
    id: 'crowdsourcing',
    name: 'Laporan Lapak Warga (Crowdsourcing)',
    institution: 'Komunitas Warga & Pembeli Cerdas Bogor',
    badge: 'Partisipasi Publik',
    badgeClass: 'bg-[#EEF773]/30 text-[#1B1A18] outline-[#D4DE4B]',
    role: 'Lapis 3: Harga Riil di Kios Lapak Harian',
    cadence: 'Real-time Terverifikasi Konsensus 7 Hari',
    description:
      'Laporan langsung dari struk belanja dan timbangan warga yang difilter melalui sanitasi EXIF dan algoritma Median Absolute Deviation (MAD).',
    linkText: 'Coba Fitur Lapor Warga',
    href: '/lapor',
    icon: UsersFour,
  },
  {
    id: 'tpid',
    name: 'TPID & Disperindagkop Kota Bogor',
    institution: 'Pemerintah Kota Bogor',
    badge: 'Pemerintah Daerah',
    badgeClass: 'bg-[#FAF9F5] text-[#1B1A18] outline-[#E5E3DE]',
    role: 'Konteks Wilayah: Distribusi & Sentra 5 Pasar',
    cadence: 'Mingguan & Pemantauan Khusus Hari Besar',
    description:
      'Data zonasi distribusi pangan, pasokan dari Pasar Induk TU Kemang, serta data intervensi operasi pasar murah untuk wilayah Kota Bogor.',
    linkText: 'Lihat Peta 5 Pasar',
    href: '/peta',
    icon: ChartLineUp,
  },
];

export function AboutDataSourceCards() {
  return (
    <section id="sumber-data" className="space-y-5 scroll-mt-24">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-1 border-b border-[#E5E3DE]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Database size={18} weight="bold" className="text-[#FF7714]" />
            <span className="text-[11px] font-bold text-[#FF7714] uppercase tracking-wider">
              Katalog Integritas
            </span>
          </div>
          <h2 className="text-[22px] sm:text-[24px] font-medium text-[#1B1A18] tracking-tight">
            Sumber Data Resmi yang Dirujuk
          </h2>
        </div>
        <div className="text-[12px] text-[#6E6D67]">
          4 pilar data terintegrasi tanpa manipulasi sepihak
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {DATA_SOURCES.map((source) => {
          const Icon = source.icon;
          const isExternal = source.href.startsWith('http');

          return (
            <div
              key={source.id}
              className="p-6 rounded-[24px] bg-white outline outline-1 outline-[#E5E3DE] flex flex-col justify-between gap-5 shadow-xs hover:outline-[#1B1A18]/30 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full outline outline-1 ${source.badgeClass}`}
                  >
                    {source.badge}
                  </span>
                  <div className="w-8 h-8 rounded-[8px] bg-[#FAF9F5] outline outline-1 outline-[#E5E3DE] flex items-center justify-center text-[#1B1A18]">
                    <Icon size={18} weight="bold" />
                  </div>
                </div>

                <div>
                  <h3 className="text-[17px] font-bold text-[#1B1A18] leading-snug">
                    {source.name}
                  </h3>
                  <p className="text-[12px] font-medium text-[#FF7714] mt-0.5">
                    {source.role}
                  </p>
                </div>

                <div className="p-2.5 rounded-[12px] bg-[#FAF9F5] outline outline-1 outline-[#E5E3DE] text-[11px] text-[#6E6D67]">
                  <span className="font-semibold text-[#1B1A18]">Pembaruan: </span>
                  {source.cadence}
                </div>

                <p className="text-[13px] text-[#6E6D67] leading-relaxed">
                  {source.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E5E3DE]">
                <a
                  href={source.href}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#1B1A18] hover:text-[#FF7714] transition-colors"
                >
                  <span>{source.linkText}</span>
                  <ArrowSquareOut size={14} weight="bold" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
