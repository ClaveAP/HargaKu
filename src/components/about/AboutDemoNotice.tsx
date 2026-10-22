import { ShieldCheck, Info } from '@phosphor-icons/react/dist/ssr';

export function AboutDemoNotice() {
  return (
    <div className="p-5 sm:p-6 rounded-[24px] bg-[#FFF3ED] outline outline-1 outline-[#FFD9C7] flex flex-col sm:flex-row items-start gap-4 shadow-xs">
      <div className="w-10 h-10 rounded-full bg-[#FF7714] text-white flex items-center justify-center shrink-0 shadow-xs">
        <ShieldCheck size={22} weight="bold" />
      </div>
      <div className="space-y-1.5">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-[15px] font-bold text-[#1B1A18]">
            Pernyataan Keterbukaan Data Prototipe (WIA 2026)
          </h2>
          <span className="text-[10px] font-bold text-[#FF7714] uppercase tracking-wider bg-white px-2 py-0.5 rounded-full outline outline-1 outline-[#FFD9C7]">
            Fase Penjurian
          </span>
        </div>
        <p className="text-[13px] text-[#6E6D67] leading-relaxed">
          Selama masa evaluasi dan demonstrasi penjurian lomba, angka fluktuasi harga yang ditampilkan mengacu pada struktur harga survei resmi Badan Pangan Nasional (Bapanas) dan PIHPS Bank Indonesia, dikombinasikan dengan dataset simulasi crowdsourcing terkontrol untuk 5 pasar tradisional pilot Kota Bogor (<strong>Pasar Sukasari, Pasar Anyar, Pasar Kebon Kembang, Pasar Gunung Batu, dan Pasar Jambu Dua</strong>).
        </p>
      </div>
    </div>
  );
}
