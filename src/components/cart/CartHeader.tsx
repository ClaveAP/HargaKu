'use client';

export function CartHeader() {
  return (
    <div className="flex flex-col gap-2.5 pb-2">
      <div className="flex items-center gap-2">
        <span className="text-[11px] font-bold text-[#FF7714] uppercase tracking-wider">
          Simulasi Belanja Dapur · Kota Bogor
        </span>
      </div>

      <h1 className="text-[32px] sm:text-[40px] font-medium text-[#1B1A18] leading-[1.12] tracking-tight">
        Kalkulator & Estimasi Keranjang Belanja
      </h1>

      <p className="text-[14px] sm:text-[15px] text-[#6E6D67] max-w-[700px] leading-[1.5]">
        Rencanakan kebutuhan pangan mingguan keluargamu. Sistem kami otomatis menghitung
        total biaya di 5 pasar tradisional Kota Bogor untuk menemukan rute paling hemat.
      </p>
    </div>
  );
}
