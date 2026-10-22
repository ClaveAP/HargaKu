'use client';

export function LaporHeader() {
  return (
    <div className="flex flex-col gap-2.5 pb-2">
      <div className="flex items-center gap-2">
        <span className="text-[11px] font-bold text-[#FF7714] uppercase tracking-wider">
          Partisipasi Warga · Kota Bogor
        </span>
      </div>

      <h1 className="text-[32px] sm:text-[40px] font-medium text-[#1B1A18] leading-[1.12] tracking-tight">
        Kirim Laporan Harga Lapak Pasar
      </h1>

      <p className="text-[14px] sm:text-[15px] text-[#6E6D67] max-w-[680px] leading-[1.5]">
        Bantu sesama warga Bogor mendapatkan transparansi harga riil di lapak tradisional.
        Bukti nota atau foto timbanganmu diverifikasi otomatis dan aman tanpa mengekspos identitas.
      </p>
    </div>
  );
}
