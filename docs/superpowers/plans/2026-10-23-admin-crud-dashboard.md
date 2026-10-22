# Admin CRUD Dashboard & Moderasi Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Mengubah dan memperluas rute `/admin` dari sekadar antrean moderasi laporan warga menjadi **Dashboard Admin & CRUD Terpadu** berbasis tata letak Sidebar SaaS (Clay.com Foundations) untuk mengelola data website publik (Katalog Komoditas, Pasar Tradisional, Entri Harga Harian, dan Moderasi Laporan Warga) dengan state persisten di browser.

**Architecture:** Menggunakan centralized store React Context (`AdminStoreProvider`) dengan adapter persistensi `LocalStorage` (`hargaku_admin_store_v1`) dan fallback data inisial lengkap. Antarmuka admin disusun dengan layout Sidebar SaaS modular (`AdminTopbar`, `AdminSidebar`, dan 5 sub-views: `Overview`, `Reports`, `Commodities`, `Markets`, `DailyPrices`) di mana seluruh sub-komponen dirancang di bawah 250 baris sesuai aturan Anti-God-File.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript (Strict, Zero `any`), Tailwind CSS v4, `@phosphor-icons/react`, Vitest untuk unit testing logika store.

**Spec:** [`docs/superpowers/specs/2026-10-23-admin-crud-dashboard-design.md`](file:///Users/admin/code/HargaKu/docs/superpowers/specs/2026-10-23-admin-crud-dashboard-design.md)

## Global Constraints
- **Spec-Driven Gate**: Patuh pada `docs/API_SPEC.md` dan `docs/SCHEMA.md`.
- **Anti-God-File**: Soft limit ≤ 200–250 baris per file, Hard limit ≤ 350 baris.
- **Strict TypeScript**: Zero `any`. Seluruh interface DTO didefinisikan eksplisit.
- **Anti-Slop UI & Code**: Warna resmi Clay Foundations (Warm Stone `#FAF9F5`, Charcoal `#1B1A18`, Hairline Border `#E5E3DE`, Orange `#FF7714`, Electric Lime `#EEF773`). Tanpa banner comment dekoratif, tanpa pulsing green dot AI-slop.
- **Testing & Build**: Wajib lulus `npm test`, `npm run typecheck`, dan `npm run build`.

---

### Task 1: Type Definitions & Centralized Admin Store (`AdminStore`)

**Files:**
- Create: `src/lib/types/admin.ts`
- Create: `src/lib/store/admin-store.tsx`
- Create: `tests/admin-store.test.ts`

**Interfaces:**
- Produces:
  - `AdminCommodity`, `AdminMarket`, `DailyPriceEntry`, `AdminReport`
  - `useAdminStore()`: `{ commodities, markets, dailyPrices, reports, addCommodity, updateCommodity, deleteCommodity, addMarket, updateMarket, deleteMarket, updateDailyPrices, approveReport, rejectReport, requestReportInfo, resetToDefaultData }`

- [ ] **Step 1: Tulis unit test untuk AdminStore logic**
  Buat pengujian di `tests/admin-store.test.ts` untuk memverifikasi operasi CRUD: tambah komoditas baru, edit komoditas, toggle aktif pasar, update batch harga harian, dan approve/reject laporan.
- [ ] **Step 2: Jalankan test dan pastikan gagal**
  Jalankan `npm test -- tests/admin-store.test.ts` (harus gagal karena file belum ada).
- [ ] **Step 3: Definisikan tipe data di `src/lib/types/admin.ts`**
  Buat tipe lengkap dan enum kategori pangan serta status laporan.
- [ ] **Step 4: Implementasikan `src/lib/store/admin-store.tsx`**
  Sediakan state management dengan LocalStorage persistence (`hargaku_admin_store_v1`), inisialisasi default dari seed data Bogor riil, dan fungsi reducer/dispatcher yang aman (immutable update).
- [ ] **Step 5: Jalankan test dan pastikan 100% lulus**
  Jalankan `npm test -- tests/admin-store.test.ts`.

---

### Task 2: Admin Layout Shell (Topbar & Sidebar Navigation)

**Files:**
- Create: `src/components/admin/AdminTopbar.tsx`
- Create: `src/components/admin/AdminSidebar.tsx`
- Modify: `src/components/admin/AdminContainer.tsx`

**Interfaces:**
- Consumes: `useAdminStore()`, `AdminModule = 'overview' | 'reports' | 'commodities' | 'markets' | 'daily-prices'`
- Produces: Layout Sidebar SaaS responsif dengan navigasi taktil, badge indikator laporan pending, dan selector modul aktif.

- [ ] **Step 1: Buat `AdminTopbar.tsx`**
  Membuat header konsol admin dengan logo mini `H.`, status live sync terhubung, nama petugas admin, dan tombol kembali ke website publik. Ukuran file < 120 baris.
- [ ] **Step 2: Buat `AdminSidebar.tsx`**
  Membuat sidebar navigasi vertikal di kiri (240px desktop, collapsible drawer di mobile) dengan icon Phosphor, counter badge, serta tombol reset data default. Ukuran file < 160 baris.
- [ ] **Step 3: Hubungkan di `AdminContainer.tsx`**
  Membungkus dengan `AdminStoreProvider` dan mengontrol state `activeModule`.

---

### Task 3: Modul Ringkasan Sistem (`AdminOverviewView.tsx`)

**Files:**
- Create: `src/components/admin/AdminOverviewView.tsx`

**Interfaces:**
- Consumes: `useAdminStore()`, `setActiveModule(module: AdminModule)`
- Produces: Komponen Overview yang menampilkan status data harian, 4 kartu ringkasan, peringatan kelengkapan harga harian, dan pintasan cepat antar-modul.

- [ ] **Step 1: Implementasikan `AdminOverviewView.tsx`**
  - 4 Kartu Metrik: Komoditas Aktif, Pasar Terpantau, Laporan Menunggu, Status Entri Hari Ini.
  - Kartu Health Status: Notifikasi apakah 5 pasar telah terisi harga hariannya.
  - Pintasan aksi cepat (*Quick Actions*): Tombol langsung lompat ke *Entri Harga Harian* atau *Moderasi Laporan*.
  - Menjaga ukuran file < 200 baris.

---

### Task 4: Modul Katalog Komoditas CRUD (`AdminCommoditiesView.tsx` + `CommodityFormModal.tsx`)

**Files:**
- Create: `src/components/admin/CommodityFormModal.tsx`
- Create: `src/components/admin/AdminCommoditiesView.tsx`

**Interfaces:**
- Consumes: `useAdminStore()` (`commodities`, `addCommodity`, `updateCommodity`, `deleteCommodity`)
- Produces: Tabel manajemen komoditas lengkap dengan search input, filter kategori, toggle aktif taktil, dan form modal tambah/edit.

- [ ] **Step 1: Buat `CommodityFormModal.tsx`**
  Form modal tambah/edit komoditas: nama, kategori (Beras, Cabai & Bawang, Protein, Sayur, Minyak), satuan standar (`kg`, `liter`, dll.), harga HAP Bapanas, ambang toleransi %, dan toggle status aktif. Validasi angka non-negatif. Ukuran file < 220 baris.
- [ ] **Step 2: Buat `AdminCommoditiesView.tsx`**
  Tabel komoditas bergaris rambut (`#E5E3DE`), filter kategori, search bar, pill kategori, format rupiah, dan aksi edit/hapus. Ukuran file < 240 baris.

---

### Task 5: Modul Pasar Tradisional CRUD (`AdminMarketsView.tsx` + `MarketFormModal.tsx`)

**Files:**
- Create: `src/components/admin/MarketFormModal.tsx`
- Create: `src/components/admin/AdminMarketsView.tsx`

**Interfaces:**
- Consumes: `useAdminStore()` (`markets`, `addMarket`, `updateMarket`, `deleteMarket`)
- Produces: Tabel pasar tradisional Bogor lengkap dengan koordinat GPS, jam operasional, spesialisasi, dan modal form CRUD.

- [ ] **Step 1: Buat `MarketFormModal.tsx`**
  Form modal tambah/edit pasar: nama pasar, kecamatan di Kota Bogor, alamat lengkap, koordinat latitude & longitude (desimal presisi untuk peta Leaflet), jam operasional bongkar muat, dan komoditas sentra unggulan. Ukuran file < 220 baris.
- [ ] **Step 2: Buat `AdminMarketsView.tsx`**
  Tabel pasar tradisional dengan badge kecamatan, koordinat peta, jam operasional, toggle aktif, dan tombol edit/hapus. Ukuran file < 230 baris.

---

### Task 6: Modul Entri Harga Resmi Harian (`AdminDailyPricesView.tsx`)

**Files:**
- Create: `src/components/admin/AdminDailyPricesView.tsx`

**Interfaces:**
- Consumes: `useAdminStore()` (`markets`, `commodities`, `dailyPrices`, `updateDailyPrices`)
- Produces: Antarmuka *Fast-Entry Matrix* untuk menginput harga survei harian (06:00 WIB) per pasar secara massal dengan kalkulasi otomatis selisih/deviasi persentase terhadap harga sebelumnya.

- [ ] **Step 1: Implementasikan `AdminDailyPricesView.tsx`**
  - Tab pemilih pasar (Pasar Sukasari, Pasar Anyar, Pasar Kebon Kembang, Pasar Gunung Batu, Pasar Jambu Dua).
  - Matriks tabel baris komoditas dengan kolom: Komoditas, Acuan HAP, Harga Kemarin, dan Input Field Harga Hari Ini (Rp).
  - Indikator live perubahan (▲ / ▼ %) begitu admin mengetik nominal.
  - Tombol aksi utama "Simpan & Publikasikan Harga Hari Ini" dengan banner notifikasi sukses instan. Ukuran file < 240 baris.

---

### Task 7: Integrasi Modul Moderasi Laporan Warga (`AdminReportsView.tsx`)

**Files:**
- Create: `src/components/admin/AdminReportsView.tsx`
- Modify: `src/components/admin/AdminReportQueue.tsx`
- Modify: `src/components/admin/AdminReportInspector.tsx`
- Modify: `src/components/admin/AdminContainer.tsx`

**Interfaces:**
- Consumes: `useAdminStore()` (`reports`, `approveReport`, `rejectReport`, `requestReportInfo`)
- Produces: Modul peninjauan laporan warga yang terintegrasi dengan data dinamis dari store.

- [ ] **Step 1: Buat `AdminReportsView.tsx`**
  Mengorganisir `AdminReportQueue` (kiri) dan `AdminReportInspector` (kanan) ke dalam sub-view moderasi warga.
- [ ] **Step 2: Sambungkan `AdminReportQueue` dan `AdminReportInspector` ke `useAdminStore()`**
  Pastikan aksi setujui, tolak, dan minta bukti langsung mengubah status laporan di persistent store.
- [ ] **Step 3: Integrasikan seluruh 5 modul di `AdminContainer.tsx`**
  Sediakan conditional rendering yang rapi berdasarkan `activeModule`:
  - `'overview'` ➔ `<AdminOverviewView />`
  - `'reports'` ➔ `<AdminReportsView />`
  - `'commodities'` ➔ `<AdminCommoditiesView />`
  - `'markets'` ➔ `<AdminMarketsView />`
  - `'daily-prices'` ➔ `<AdminDailyPricesView />`

---

### Task 8: Verifikasi Menyeluruh, Typecheck, Build, & Dokumentasi

**Files:**
- Modify: `STATE.md`

- [ ] **Step 1: Jalankan unit testing**
  `npm test` untuk memastikan seluruh test logic lulus 100%.
- [ ] **Step 2: Jalankan typecheck**
  `npm run typecheck` untuk menjamin Zero TypeScript errors (Zero `any`).
- [ ] **Step 3: Jalankan production build**
  `npm run build` untuk memverifikasi kompilasi Next.js 16 seluruh rute sukses tanpa error.
- [ ] **Step 4: Perbarui `STATE.md`**
  Catat penyelesaian perluasan Admin CRUD Dashboard dan sinkronisasi dengan spek.
