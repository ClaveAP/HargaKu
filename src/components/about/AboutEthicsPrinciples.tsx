import {
  LockKey,
  ShieldCheck,
  Scales,
  Handshake,
  HandCoins,
} from '@phosphor-icons/react/dist/ssr';

interface PrincipleItem {
  number: string;
  title: string;
  description: string;
  icon: typeof LockKey;
  iconColor: string;
}

const PRINCIPLES: PrincipleItem[] = [
  {
    number: '01',
    title: 'Anti-Doxxing & Agregasi Lapak',
    description:
      'HargaKu secara tegas DILARANG menyebut nama individu pedagang, nomor kios spesifik, atau identitas pemilik lapak. Semua data disajikan murni secara agregat per pasar untuk mencegah perundungan atau stigma terhadap pedagang kecil.',
    icon: LockKey,
    iconColor: 'text-[#FF7714]',
  },
  {
    number: '02',
    title: 'Sanitasi Metadata EXIF Foto',
    description:
      'Setiap foto bukti struk belanja atau timbangan yang diunggah warga secara otomatis dibersihkan dari koordinat GPS, informasi kamera, dan metadata perangkat pribadi sebelum diproses di server.',
    icon: ShieldCheck,
    iconColor: 'text-[#15803D]',
  },
  {
    number: '03',
    title: 'Praduga Baik & Dinamika Pangan',
    description:
      'Kami memahami harga pangan bervariasi karena modal kulakan subuh, perbedaan kualitas barang (grade cabai/daging), dan biaya transportasi pedagang. HargaKu hadir sebagai kompas referensi, bukan alat memojokkan pedagang.',
    icon: Handshake,
    iconColor: 'text-[#1B1A18]',
  },
  {
    number: '04',
    title: 'Bukan Penentu Sepihak (Non-Coercive)',
    description:
      'Platform ini tidak memiliki wewenang memaksakan harga jual kepada pedagang pasar tradisional. HargaKu bertindak sebagai pemandu negosiasi sehat dan penyeimbang asimetri informasi antara pembeli dan penjual.',
    icon: Scales,
    iconColor: 'text-[#FF7714]',
  },
  {
    number: '05',
    title: 'Netralitas Publik Non-Komersial',
    description:
      'HargaKu tidak menerima penempatan sponsor dari kios tertentu, tidak mempromosikan tengkulak, dan bebas dari iklan komersial berbayar yang dapat membiaskan rekomendasi harga belanja warga.',
    icon: HandCoins,
    iconColor: 'text-[#1B1A18]',
  },
];

export function AboutEthicsPrinciples() {
  return (
    <section id="etika-pedagang" className="space-y-6 scroll-mt-24">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-1 border-b border-[#E5E3DE]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Scales size={18} weight="bold" className="text-[#FF7714]" />
            <span className="text-[11px] font-bold text-[#FF7714] uppercase tracking-wider">
              Piagam Perlindungan
            </span>
          </div>
          <h2 className="text-[22px] sm:text-[24px] font-medium text-[#1B1A18] tracking-tight">
            5 Prinsip Etika Perlindungan Lapak &amp; Privasi Warga
          </h2>
        </div>
        <div className="text-[12px] text-[#6E6D67]">
          Menjaga keharmonisan pasar tradisional dan martabat pedagang
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {PRINCIPLES.map((principle) => {
          const Icon = principle.icon;

          return (
            <div
              key={principle.number}
              className="p-6 rounded-[24px] bg-white outline outline-1 outline-[#E5E3DE] flex flex-col justify-between gap-4 shadow-xs hover:outline-[#1B1A18]/30 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-[10px] bg-[#FAF9F5] outline outline-1 outline-[#E5E3DE] flex items-center justify-center">
                    <Icon size={20} weight="bold" className={principle.iconColor} />
                  </div>
                  <span className="font-mono text-[13px] font-bold text-[#8E8D86]">
                    {principle.number}
                  </span>
                </div>

                <h3 className="text-[16px] font-bold text-[#1B1A18]">
                  {principle.title}
                </h3>

                <p className="text-[13px] text-[#6E6D67] leading-relaxed">
                  {principle.description}
                </p>
              </div>

              <div className="pt-2">
                <span className="text-[10px] font-semibold tracking-wider text-[#8E8D86] uppercase">
                  Standar Etika HargaKu
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
