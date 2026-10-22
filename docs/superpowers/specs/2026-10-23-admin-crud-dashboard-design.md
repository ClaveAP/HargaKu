# Spesifikasi Desain: Admin CRUD Dashboard & Moderasi (/admin)

- **Tanggal**: 2026-10-23
- **Status**: Disetujui (Approved)
- **Konteks**: Ekspansi portal `/admin` dari sekadar antrean moderasi laporan warga menjadi **Dashboard Admin & CRUD Terpadu** untuk mengelola seluruh data website publik HargaKu.

---

## 1. Latar Belakang & Tujuan
Halaman `/admin` sebelumnya hanya menyediakan antrean peninjauan laporan warga (*citizen report queue*). Agar platform HargaKu dapat dioperasikan secara mandiri oleh tim administrator atau petugas Disperindag/TPID, `/admin` diperluas menjadi konsol admin SaaS profesional yang memiliki kemampuan CRUD penuh terhadap:
1. **Katalog Komoditas Pangan** (Tambah/edit harga acuan HAP, kategori, satuan, status aktif).
2. **Pasar Tradisional** (Tambah/edit pasar, titik koordinat peta, alamat, jam operasional).
3. **Entri Harga Resmi Harian** (Input harga harian resmi per komoditas per pasar pukul 06:00 WIB).
4. **Moderasi Laporan Warga** (Penyaringan anomali MAD, validasi foto struk, keputusan Setujui/Tolak).
5. **Ringkasan Metrik Sistem** (Status sinkronisasi data harian dan kesehatan sistem).

---

## 2. Struktur Tata Letak (Layout)
Layout mengadopsi standar **SaaS Sidebar Navigation** yang konsisten dengan desain Clay.com Foundations:
- Kanvas: Warm Stone Canvas (`#FAF9F5` / `#F4F3F0`)
- Teks Utama: Deep Charcoal (`#1B1A18`)
- Border: Hairline Border (`#E5E3DE`)
- Aksen: Clay Orange (`#FF7714`) & Electric Lime (`#EEF773`)

### Komponen Layout
1. **`AdminTopbar.tsx`**: Header ringkas dengan logo mini `H.`, indikator status live sync, dan nama petugas.
2. **`AdminSidebar.tsx`**: Sidebar navigasi kiri (240px) dengan menu modul taktil, badge hitungan pending, dan tombol reset data default.
3. **`AdminContainer.tsx`**: Orchestrator utama yang mengatur modul aktif (`overview` | `reports` | `commodities` | `markets` | `daily-prices`).

---

## 3. Spesifikasi Modul & Antarmuka CRUD

### 3.1. Modul Ringkasan (`AdminOverviewView.tsx`)
- Kartu metrik: Total Komoditas Aktif, Pasar Terdaftar, Laporan Menunggu Review, Kelengkapan Entri Harga Hari Ini.
- Indikator peringatan jika ada pasar atau komoditas yang belum diinput harga hariannya.
- Log aktivitas terbaru admin.

### 3.2. Modul Katalog Komoditas (`AdminCommoditiesView.tsx` + `CommodityFormModal.tsx`)
- Tabel data komoditas dengan kolom: Nama & slug, Kategori, Satuan, HAP/HET Bapanas, Ambang Toleransi, Status Aktif (toggle switch), dan Aksi (Edit, Hapus).
- Modal Form Tambah/Edit dengan validasi ketat, auto-slug, dan pilihan kategori.

### 3.3. Modul Pasar Tradisional (`AdminMarketsView.tsx` + `MarketFormModal.tsx`)
- Tabel data pasar tradisional Bogor: Nama pasar, Kecamatan, Koordinat GPS (`lat`, `lng`), Jam bongkar muat, Komoditas spesialisasi, Status Aktif, dan Aksi.
- Modal Form Tambah/Edit dengan input presisi koordinat Leaflet.

### 3.4. Modul Entri Harga Resmi Harian (`AdminDailyPricesView.tsx`)
- Fast-entry matrix berbasis tabel per pasar:
  - Tab pemilih 5 pasar.
  - Baris komoditas dengan harga acuan HAP, harga kemarin, dan input harga hari ini (Rp).
  - Kalkulasi deviasi otomatis secara instan.
  - Tombol simpan massal (*batch save*) dengan feedback visual sukses.

### 3.5. Modul Moderasi Laporan Warga (`AdminReportsView.tsx`)
- Mempertahankan alur split dua kolom yang sudah ada (`AdminReportQueue` + `AdminReportInspector`), diintegrasikan sebagai sub-view modul.

---

## 4. Manajemen State & Sinkronisasi Website Publik
- **`src/lib/store/admin-store.tsx`**:
  - React Context + Custom Hook `useAdminStore()` yang mengelola state komoditas, pasar, harga resmi, dan laporan warga.
  - Menggunakan browser `localStorage` (`hargaku_admin_store_v1`) agar perubahan CRUD persisten saat berpindah halaman atau me-refresh tab.
  - Memiliki fallback data bawaan (`INITIAL_COMMODITIES`, `INITIAL_MARKETS`, dll.) jika `localStorage` masih kosong.
  - Menyediakan fungsi `resetToDefaultData()` untuk kemudahan pengujian demo.
- **Sinkronisasi Publik**:
  - Data yang diubah/ditambah di panel admin langsung terefleksi pada komponen publik yang mengonsumsi data via store/fetcher adapter.

---

## 5. Kepatuhan Aturan Rekayasa (AGENTS.md)
1. **Spec-Driven Gate**: Diperbarui terlebih dahulu di `docs/API_SPEC.md`, `docs/PRD.md`, dan dokumen desain ini sebelum implementasi.
2. **Anti-God-File**: Semua file sub-komponen dirancang di bawah 250 baris.
3. **Strict TypeScript**: 100% typed, zero `any`.
4. **Anti-Slop UI & Code**: Tanpa badge pulsing AI-slop, komentar kode ringkas berprinsip *Why, Not What*, warna konsisten Clay Foundations.
