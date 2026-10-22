'use client';

export function PriceCheckHeader() {
  return (
    <div className="flex flex-col gap-2.5 pb-2">
      <div className="flex items-center gap-2">
        <span className="text-[11px] font-bold text-[#FF7714] uppercase tracking-wider">
          Validasi Harga Belanja · Kota Bogor
        </span>
      </div>

      <h1 className="text-[32px] sm:text-[40px] font-medium text-[#1B1A18] leading-[1.12] tracking-tight">
        Cek Harga Wajar
      </h1>

      <p className="text-[14px] sm:text-[15px] text-[#6E6D67] max-w-[680px] leading-[1.5]">
        Masukkan harga yang ditawarkan di lapak, sistem akan memvalidasi kewajaran
        harga secara instan berdasarkan 3 lapis data resmi.
      </p>
    </div>
  );
}
