# ADR 0001: Pencatatan Keputusan Arsitektur Menggunakan Architectural Decision Records (ADR)

- **Status**: Diterima (Accepted)
- **Tanggal**: 2026-10-21
- **Proyek**: HargaKu (Web In Action 2026)
- **Pengambil Keputusan**: Tim Pengembang HargaKu & AI Assistant

---

## 1. Konteks & Masalah
Saat membangun platform transparansi harga pangan **HargaKu** di bawah tenggat waktu kompetisi Web In Action (MIA 2026), berbagai keputusan arsitektur (seperti pemilihan framework Next.js fullstack, skema database PostgreSQL dengan Prisma, kalkulasi deviasi persentase wajar, dan metode anonimasi laporan warga) harus memiliki jejak audit yang jelas.

Tanpa pencatatan terstruktur, AI agent atau anggota tim di masa mendatang berisiko mengubah pola kode atau memicu regresi karena tidak memahami alasan di balik keputusan awal.

---

## 2. Keputusan yang Diambil
Kami memutuskan untuk menggunakan **Architectural Decision Records (ADR)** yang disimpan di folder `docs/adr/` dengan format penomoran: `XXXX-judul-singkat.md`.

Setiap keputusan besar terkait:
1. Pemilihan tech stack inti (Next.js, Tailwind v4, Prisma, PostgreSQL).
2. Formula atau toleransi persentase status kewajaran harga (±10%, +25%, <-15%).
3. Mekanisme keamanan data warga (sanitasi EXIF foto, hash IP rate limit).
4. Penanganan integrasi sumber data pemerintah (PIHPS BI, Bapanas, atau data simulasi berlabel).

**Wajib** didokumentasikan di folder `docs/adr/`.

---

## 3. Konsekuensi
* **Positif**: Seluruh anggota tim dan AI asisten memiliki konteks yang konsisten, mencegah over-engineering, dan mempermudah presentasi teknis kepada dewan juri.
* **Trade-off**: Perlu meluangkan waktu sejenak untuk mencatat ADR setiap kali ada perubahan arsitektural penting.
