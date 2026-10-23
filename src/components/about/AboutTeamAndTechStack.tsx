import Link from 'next/link';
import {
  Code,
  GraduationCap,
  Sparkle,
  ArrowRight,
  ChartLineUp,
} from '@phosphor-icons/react/dist/ssr';

export function AboutTeamAndTechStack() {
  return (
    <section id="tim-pengembang" className="space-y-6 scroll-mt-24">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-1 border-b border-[#E5E3DE]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <GraduationCap size={18} weight="bold" className="text-[#FF7714]" />
            <span className="text-[11px] font-bold text-[#FF7714] uppercase tracking-wider">
              Inisiatif Kolaboratif
            </span>
          </div>
          <h2 className="text-[22px] sm:text-[24px] font-medium text-[#1B1A18] tracking-tight">
            Tim Pengembang &amp; Arsitektur Sistem
          </h2>
        </div>
        <div className="text-[12px] text-[#6E6D67]">
          Karya mahasiswa untuk kompetisi Web In Action (WIA 2026)
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Team Card */}
        <div className="p-6 rounded-[24px] bg-white outline outline-1 outline-[#E5E3DE] space-y-4 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[12px] bg-[#EEF773] outline outline-[1.5px] outline-[#1B1A18] flex items-center justify-center font-bold text-[18px] text-[#1B1A18]">
              H
            </div>
            <div>
              <h3 className="text-[16px] font-bold text-[#1B1A18]">
                Tim Inovasi HargaKu
              </h3>
              <p className="text-[12px] text-[#6E6D67]">
                UPN Veteran Jakarta
              </p>
            </div>
          </div>

          <p className="text-[13px] text-[#6E6D67] leading-relaxed">
            Dikembangkan oleh mahasiswa berdedikasi dalam bidang rekayasa perangkat lunak dan sains data publik untuk kompetisi nasional <strong>Web In Action (WIA 2026)</strong>.
          </p>

          <div className="pt-2 border-t border-[#E5E3DE] space-y-2">
            <div className="flex items-center justify-between text-[12px]">
              <span className="text-[#6E6D67]">Kategori Lomba</span>
              <span className="font-semibold text-[#1B1A18]">Web Application</span>
            </div>
            <div className="flex items-center justify-between text-[12px]">
              <span className="text-[#6E6D67]">Cakupan Observasi &amp; Validasi</span>
              <span className="font-semibold text-[#1B1A18]">Pasar Tradisional Nasional</span>
            </div>
            <div className="flex items-center justify-between text-[12px]">
              <span className="text-[#6E6D67]">Lisensi</span>
              <span className="font-semibold text-[#1B1A18]">Open Source (MIT)</span>
            </div>
          </div>
        </div>

        {/* Tech Stack Card */}
        <div className="lg:col-span-2 p-6 rounded-[24px] bg-white outline outline-1 outline-[#E5E3DE] flex flex-col justify-between gap-5 shadow-xs">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Code size={18} weight="bold" className="text-[#1B1A18]" />
              <h3 className="text-[16px] font-bold text-[#1B1A18]">
                Arsitektur &amp; Tumpukan Teknologi Modern
              </h3>
            </div>

            <p className="text-[13px] text-[#6E6D67] leading-relaxed">
              HargaKu dibangun dengan arsitektur frontend-first yang terintegrasi secara modular dengan skema basis data relasional standar PostgreSQL &amp; Prisma ORM.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-3 rounded-[12px] bg-[#FAF9F5] outline outline-1 outline-[#E5E3DE]">
                <div className="text-[11px] text-[#8E8D86] font-medium">Framework</div>
                <div className="text-[13px] font-bold text-[#1B1A18]">Next.js 16 (App Router)</div>
              </div>
              <div className="p-3 rounded-[12px] bg-[#FAF9F5] outline outline-1 outline-[#E5E3DE]">
                <div className="text-[11px] text-[#8E8D86] font-medium">Language</div>
                <div className="text-[13px] font-bold text-[#1B1A18]">Strict TypeScript</div>
              </div>
              <div className="p-3 rounded-[12px] bg-[#FAF9F5] outline outline-1 outline-[#E5E3DE]">
                <div className="text-[11px] text-[#8E8D86] font-medium">Styling</div>
                <div className="text-[13px] font-bold text-[#1B1A18]">Tailwind CSS v4</div>
              </div>
              <div className="p-3 rounded-[12px] bg-[#FAF9F5] outline outline-1 outline-[#E5E3DE]">
                <div className="text-[11px] text-[#8E8D86] font-medium">Design Tokens</div>
                <div className="text-[13px] font-bold text-[#1B1A18]">Clay.com Foundations</div>
              </div>
              <div className="p-3 rounded-[12px] bg-[#FAF9F5] outline outline-1 outline-[#E5E3DE]">
                <div className="text-[11px] text-[#8E8D86] font-medium">Database Layer</div>
                <div className="text-[13px] font-bold text-[#1B1A18]">PostgreSQL &amp; Prisma</div>
              </div>
              <div className="p-3 rounded-[12px] bg-[#FAF9F5] outline outline-1 outline-[#E5E3DE]">
                <div className="text-[11px] text-[#8E8D86] font-medium">Typography</div>
                <div className="text-[13px] font-bold text-[#1B1A18]">Roobert Variable Font</div>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-[#E5E3DE] flex flex-col sm:flex-row items-center gap-3">
            <Link
              href="/cek-harga"
              className="w-full sm:w-auto h-11 px-5 rounded-[12px] bg-[#EEF773] hover:bg-[#E2EB65] outline outline-[1.5px] outline-[#1B1A18] text-[#1B1A18] text-[13px] font-bold flex items-center justify-center gap-2 transition-all shadow-[0_2px_0_#1B1A18]"
            >
              <span>Mulai Cek Harga Wajar</span>
              <ArrowRight size={15} weight="bold" />
            </Link>
            <Link
              href="/dashboard"
              className="w-full sm:w-auto h-11 px-5 rounded-[12px] bg-[#FAF9F5] hover:bg-white outline outline-1 outline-[#E5E3DE] text-[#1B1A18] text-[13px] font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <ChartLineUp size={16} weight="bold" />
              <span>Pantau Dashboard 12 Komoditas</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
