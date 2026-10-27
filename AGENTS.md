# AGENTS.md — Autonomous AI Engineering System & Router

Dokumen ini adalah konstitusi teknis **MANDATORI** yang mengikat seluruh AI coding assistant (Antigravity, Cursor, Claude Code, Copilot, dll.) dan engineer manusia saat bekerja di repositori **HargaKu**.

---

## 1. Quick Directory Router (Single Source of Truth)

Untuk efisiensi context window dan token AI, **dilarang menumpuk penjelasan panjang di AGENTS.md**. Gunakan tabel penunjuk rujukan resmi di bawah ini:

| Kebutuhan Informasi / Aturan | Dokumen Acuan Wajib | Keterangan Singkat |
| :--- | :--- | :--- |
| **Visi, Fitur, & Alur Produk** | [`docs/PRD.md`](docs/PRD.md) | Persona, alur 3 lapis harga, cakupan 21 provinsi (64 pasar), fase lomba. |
| **Batas Ruang Lingkup & Hal Terlarang** | [`docs/NON_GOALS.md`](docs/NON_GOALS.md) | Anti-scope creep, fitur/library yang dilarang pada MVP. |
| **Struktur Database, Tabel, & Relasi** | [`docs/SCHEMA.md`](docs/SCHEMA.md) | Skema PostgreSQL: komoditas, pasar, harga resmi, laporan warga. |
| **Kontrak REST API & Payload** | [`docs/API_SPEC.md`](docs/API_SPEC.md) | Endpoints, query params, format envelope response standar. |
| **Design Tokens, Font, Warna, & UI** | [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md) | Font dari `fonts/clay.com`, warna status harga, 5 status UI. |
| **Environment Variables** | [`docs/ENV_SPEC.md`](docs/ENV_SPEC.md) | Kamus environment variable frontend & backend. |
| **Jebakan Bug & Solusi Teruji** | [`docs/PITFALLS.md`](docs/PITFALLS.md) | Masalah outlier harga, sanitasi EXIF, serialisasi Rupiah. |
| **Kriteria Uji & Definition of Done** | [`docs/TEST_MATRIX.md`](docs/TEST_MATRIX.md) | Test case logika Cek Harga Wajar, validasi lapor, checklist QA. |
| **Memori Kerja & Status Sprint** | [`STATE.md`](STATE.md) | Status aktif task hari ini, fitur selesai, dan blocker. |
| **Arsitektur & Keputusan Desain** | [`docs/adr/`](docs/adr/) | Architecture Decision Records (ADR). |

---

## 2. Aturan Emas Rekayasa (The Core Golden Rules)

### A. Spec-Driven Gate: "No Code Before Spec" (HARD GATE)
1. **DILARANG KERAS** menulis, mengubah, atau menghapus kode bisnis jika perubahannya belum tercatat pada dokumen spesifikasi di `docs/`.
2. Jika ada perubahan logika, alur UI, field database, atau endpoint: AI **WAJIB** memperbarui file `.md` terkait terlebih dahulu atau dalam siklus edit yang sama.

### B. Auto-Sync Living Documentation (Mandatory)
* Jika di tengah pengerjaan pengguna meminta perubahan (misal: mengganti font, mengubah palet warna, mengganti batas toleransi harga wajar, atau mengubah schema), AI **WAJIB otomatis meng-update file `.md` terkait** (misal [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md) atau [`docs/PRD.md`](docs/PRD.md)) seketika tanpa perlu diingatkan manual.

### C. Context7 Gate: Wajib Cek Dokumentasi Resmi Saat Setup Library
* Sebelum menginstal, mengonfigurasi, atau memodifikasi dependensi/framework/SDK baru (Next.js, Tailwind v4, Prisma, Leaflet, Shadcn, dll.):
  * AI **WAJIB** mengecek dokumentasi resmi terkini via **Context7 MCP** (`resolve-library-id` dan `query-docs`).
  * Dilarang menebak sintaks konfigurasi berdasarkan memori usang (*stale training weights*).

### D. Batas Ukuran File & Targeted Patching (Anti-God-File)
* **Soft limit**: Maksimal **200–250 baris** per file. **Hard limit**: **350 baris**. Jika membengkak, pisahkan sub-komponen, hooks, atau utilitas.
* **Targeted Surgical Edits**: Dilarang melakukan blind overwrite (menimpa seluruh file besar secara ceroboh). Selalu pertahankan komentar dan fungsi yang tidak bersalah.
* **Strict TypeScript**: Zero `any`. Semua DTO dan model harus memiliki tipe data eksplisit.

### E. Integritas Data Publik HargaKu
1. **Anti-Hoax & Transparansi**: Dilarang mengarang angka harga. Data resmi (PIHPS/Bapanas) wajib mencantumkan tanggal dan sumber.
2. **Label Data Simulasi**: Jika menggunakan dataset demo/mock, wajib diberi label visual yang jelas di UI: *"Data simulasi untuk demo"*.
3. **Privasi & Netralitas**:
   * Jangan menyebut nama toko/pedagang individu (data selalu diagregasi per pasar).
   * Sanitasi foto bukti laporan warga (wajib strip metadata EXIF / koordinat presisi perangkat).

### F. Kode Bersih Tanpa AI-Slop (`antislop-code`)
1. **Hygiene Komentar**: Dilarang menulis komentar bergaya AI-slop (seperti banner separator `// ========`, ALL CAPS, narasi alur step-by-step `// Step 1: ...`, komentar pengulang yang sudah jelas dari nama variabel/fungsi, atau emoji dekoratif seperti `// 🚀 Performance`).
2. **Prinsip "Why, Not What"**: Komentar hanya boleh ditulis jika menjelaskan alasan bisnis yang tidak kasat mata, batasan keamanan, atau mitigasi bug (maksimal 1–2 baris singkat). Jangan pernah menyentuh/mengubah kode yang bekerja hanya demi merapikan komentar.

### G. Frontend-First & Backend-Ready Fetcher Layer
1. **Larangan Hardcode Data di Komponen UI**: Seluruh pengambilan data wajib dipisahkan ke dalam API fetcher layer (`src/lib/api/` atau `src/features/*/api/`) dengan DTO TypeScript ketat sesuai [`docs/API_SPEC.md`](docs/API_SPEC.md).
2. **Mock Adapter Siap Tukar**: Sediakan fallback data simulasi/mock yang strukturnya 100% identik dengan payload response API backend.
3. **Plug-and-Play Backend**: Saat backend resmi aktif, perubahan hanya terjadi pada URL endpoint atau konfigurasi environment (`NEXT_PUBLIC_API_URL` / toggle `NEXT_PUBLIC_USE_MOCK`), tanpa perlu mengubah kode komponen antarmuka.

---

## 3. Definition of Done (DoD)

Sebuah task hanya boleh dinyatakan selesai jika:
1. Kode telah diimplementasikan sesuai dokumen spesifikasi di `docs/`.
2. File dokumentasi terkait (termasuk [`STATE.md`](STATE.md) dan [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md) jika ada perubahan visual) telah sinkron.
3. Typecheck dan build check lulus 100% tanpa error (`npm run build` / linting clean).
