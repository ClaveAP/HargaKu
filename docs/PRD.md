# Product Requirements Document (PRD) — HargaKu

Dokumen ini mendefinisikan visi produk, persona pengguna, arsitektur modul fitur, dan kriteria sukses fungsional platform **HargaKu** untuk kompetisi **Web In Action (Multimedia In Action 2026, UPN Veteran Jakarta)**.

---

## 1. Executive Summary & Problem Statement

### 1.1. Latar Belakang Masalah
* **Pembeli Pasar Tradisional**: Sering tidak memiliki acuan harga objektif saat berbelanja. Informasi harga pangan resmi dari pemerintah (PIHPS Bank Indonesia dan Panel Harga Bapanas) ada di internet, namun disajikan dalam format tabel agregat makro/analis ekonomi yang sulit dipahami orang awam. Akibatnya, pembeli rentan dipatok harga terlalu mahal dan tidak tahu pasar mana yang lebih hemat.
* **Pedagang Kecil / Sayur Keliling**: Mengalami asimetri informasi; sulit mengetahui dinamika harga kulakan grosir atau harga eceran di pasar sekitar, sehingga rentan kalah bersaing atau terlambat mengantisipasi lonjakan harga komoditas (misal cabai, bawang, telur).
* **Keterbatasan Data Resmi**: PIHPS hanya menyurvei 2 pasar utama per kota/kabupaten dengan 2 pedagang per komoditas. Harga di pasar-pasar lingkungan lainnya tidak terpotret, dan tidak ada kanal bagi warga untuk berpartisipasi melaporkan harga riil di lapangan.

### 1.2. Solusi: Konsep Tiga Lapis Harga
HargaKu tidak menentukan "harga seharusnya", melainkan menyajikan 3 lapisan data objektif:
1. **Lapis 1 — Harga Acuan Resmi**: HAP (Harga Acuan Penjualan) & HET (Harga Eceran Tertinggi) dari Badan Pangan Nasional.
2. **Lapis 2 — Rata-Rata Pasar Resmi**: Survei harian resmi dari PIHPS BI dan Panel Harga Bapanas.
3. **Lapis 3 — Laporan Partisipatif Warga**: Harga riil di level pasar yang dilaporkan warga (*crowdsourcing*) dengan bukti foto terverifikasi.

Nilai tambah utama HargaKu adalah menghitung **selisih/deviasi antar lapisan** untuk memberikan rekomendasi langsung (*Data-Driven Decision Support*) kepada pembeli dan pedagang.

### 1.3. Wilayah Pilot & Komoditas Utama
* **Wilayah Fokus**: **Kota Bogor** (Pasar Anyar, Pasar Bogor/Kebon Kembang, Pasar Gunung Batu, Pasar Merdeka).
* **12–15 Komoditas Strategis**:
  1. Beras Medium
  2. Beras Premium
  3. Minyak Goreng Curah
  4. Minyak Goreng Kemasan (MinyaKita)
  5. Gula Pasir
  6. Telur Ayam Ras
  7. Daging Ayam Ras
  8. Daging Sapi Murni
  9. Cabai Merah Keriting
  10. Cabai Rawit Merah
  11. Bawang Merah
  12. Bawang Putih Honan / Kating
  13. Tomat Sayur
  14. Kol / Kubis

---

## 2. Target Personas & User Journeys

### Persona 1: Bu Retno (Ibu Rumah Tangga / Pembeli Cerdas)
* **Profil**: Berusia 38 tahun, rutin belanja kebutuhan dapur ke pasar tradisional 2–3 kali seminggu menggunakan smartphone entry/mid-range.
* **Goals**: Mengetahui harga wajar bahan pokok hari ini sebelum berangkat belanja, membandingkan apakah Pasar Anyar atau Pasar Merdeka lebih murah, dan memastikan tidak terkena *mark-up* pedagang nakal.
* **Key Flow**:
  1. Membuka HargaKu via HP.
  2. Mengakses **Cek Harga Wajar**, memilih komoditas "Cabai Rawit Merah", pasar "Pasar Anyar", dan memasukkan harga penawaran "Rp 65.000 / kg".
  3. Melihat status instan: **"Wajar (Selisih +3% dari rata-rata pasar)"** dengan acuan HAP Rp 57.000.
  4. Merasa tenang saat bertransaksi di pasar.

### Persona 2: Pak Jajang (Pedagang Sayur Keliling / Warung)
* **Profil**: Pedagang sayur berusia 45 tahun yang kulakan setiap subuh dan berjualan keliling perumahan.
* **Goals**: Mengetahui tren kenaikan harga cabai/bawang 7–30 hari ke depan, memantau harga di pasar-pasar induk, serta menentukan harga jual eceran yang kompetitif namun tetap untung.
* **Key Flow**:
  1. Membuka **Dashboard Harga**.
  2. Memeriksa komoditas yang sedang bergejolak (alert merah kenaikan >10% minggu ini).
  3. Membuka **Peta Harga** untuk mengecek perbandingan harga kulakan antar pasar.

### Persona 3: Tim Admin / Moderator HargaKu
* **Profil**: Administrator platform & relawan pemerhati harga pangan.
* **Goals**: Memoderasi kiriman laporan harga dari warga agar data tetap kredibel dan bebas dari manipulasi/spam.
* **Key Flow**:
  1. Login ke panel `/admin`.
  2. Meninjau antrean laporan warga: memvalidasi bukti foto struk/nota/papan harga.
  3. Mengubah status laporan menjadi `APPROVED` atau `REJECTED`.

---

## 3. Scope & Modul Fitur

### Modul 1: Landing Page & Edukasi Publik (Fase A)
* Hero section dengan slogan *"Tahu harga, beli tenang, jual adil."*
* Widget interaktif cuplikan komoditas teratas & status harga hari ini.
* Penjelasan 3 lapis harga secara visual dan bersahabat.
* Call-to-action cepat ke fitur Cek Harga Wajar.

### Modul 2: Dashboard Harga & Tren Pasar (Fase A)
* Grid kartu komoditas dengan indikator harga harian, tanggal pembaruan (*"Diperbarui: DD MMM YYYY"*), dan selisih terhadap HAP/HET.
* Grafik tren pergerakan harga 7–30 hari terakhir.
* Filter berdasarkan kategori pangan (Beras, Cabai/Bawang, Daging/Telur, Minyak/Gula).

### Modul 3: Cek Harga Wajar (Fase A — Fitur Inti)
* Form input sederhana: Pilih Komoditas ➔ Pilih Pasar ➔ Masukkan Harga Penawaran.
* **Logika Kalkulasi & Indikator Status**:
  1. **Harga Pembanding**:
     * Prioritas 1: Median laporan warga terverifikasi (7 hari terakhir, min. 3 laporan) ➔ Tingkat Kepercayaan: **Tinggi**.
     * Prioritas 2: Data resmi PIHPS Kota Bogor ➔ Tingkat Kepercayaan: **Sedang**.
     * Prioritas 3: Panel Harga Bapanas Jawa Barat ➔ Tingkat Kepercayaan: **Rendah**.
  2. **Klasifikasi Status**:
     * Deviasi dalam rentang `[-10% s.d. +10%]`: **Wajar** (Badge Hijau).
     * Deviasi `[+10% s.d. +25%]`: **Agak Mahal** (Badge Kuning/Oranye).
     * Deviasi `> +25%`: **Terlalu Mahal** (Badge Merah).
     * Deviasi `< -15%`: **Jauh Lebih Murah** (Badge Biru — Beri saran cek kesegaran/takaran timbangan).

### Modul 4: Halaman Tentang & Sumber Data (Fase A)
* Pernyataan transparansi metodologi data.
* Sumber resmi yang dirujuk (tautan ke PIHPS BI dan Badan Pangan Nasional).
* Label penegasan data simulasi demo bila diperlukan.

### Modul 5: Lapor Harga Warga / Crowdsourcing (Fase B)
* Form pelaporan harga warga di kios pasar tertentu.
* Unggah foto bukti (nota/kios/papan harga).
* **Keamanan & Privasi**: Penghapusan metadata EXIF dan lokasi presisi perangkat secara otomatis di backend; enkripsi hash IP untuk pencegahan spam (*rate limiting*).
* Status moderasi: `PENDING`, `APPROVED`, `REJECTED`.

### Modul 6: Peta Harga Antar-Pasar (Fase B)
* Peta interaktif (Leaflet) Kota Bogor dengan titik-titik pasar tradisional.
* Visualisasi harga komoditas terpilih per pasar (mana yang hijau/termurah, mana yang merah/termahal).

### Modul 7: Kalkulator Keranjang Belanja (Fase B)
* Pengguna dapat memilih beberapa bahan belanjaan sekaligus (misal: 1 kg beras, 0.5 kg telur, 250 gr cabai).
* Sistem mengalkulasi total perkiraan belanja di Pasar A vs Pasar B.

### Modul 8: Portal Admin Moderasi & CRUD Dashboard Terpadu (Fase B)
* **Tata Letak Sidebar SaaS**: Konsol kerja terpadu bagi administrator & petugas TPID Disperindag.
* **Modul Moderasi Laporan Warga**: Peninjauan antrean laporan warga, inspeksi foto nota berlabel *EXIF Sanitized*, pendeteksian anomali statistik MAD, dan aksi persetujuan/penolakan.
* **CRUD Master Komoditas Pangan**: Tambah, edit, aktifkan/nonaktifkan komoditas, penyesuaian harga acuan HAP/HET Bapanas, dan pengaturan ambang batas toleransi.
* **CRUD Pasar Tradisional**: Tambah, edit, kelola titik koordinat peta GPS Leaflet, jam operasional bongkar muat, dan komoditas sentra unggulan pasar.
* **Fast-Entry Entri Harga Resmi Harian**: Matriks input cepat harga survei resmi harian (06:00 WIB) per pasar untuk memperbarui data rata-rata kota yang langsung tampil di website publik.
* **Ringkasan Kesehatan Data**: Monitoring kelengkapan input harga harian dan antrean moderasi.
* **Profil Petugas & Manajemen Sesi**: Dropdown identitas akun, NIP, instansi Disperindag Kota Bogor, modal profil & keamanan kata sandi, dan mekanisme logout/keluar aman.

---

## 4. Pembagian Fase Pengerjaan (Milestones Lomba)

| Fase | Target Tanggal | Deliverables Utama |
| :--- | :--- | :--- |
| **Fase A (Draft Wajib)** | 19 Okt – 1 Nov 2026 | Landing Page, Dashboard Harga, Cek Harga Wajar, Halaman Tentang/Sumber Data, README & first draft PDF. |
| **Fase B (Revisi Mentor)** | 8 – 10 Nov 2026 | Fitur Lapor Harga, Peta Harga Pasar, Keranjang Belanja, Portal Moderasi, polesan UI mobile. |
| **Roadmap (Masa Depan)** | Pasca Lomba | Integrasi Bot WhatsApp Cek Harga, notifikasi lonjakan harga kulakan pedagang, kemitraan Disperindag. |

---

## 5. Non-Functional Requirements (NFR)
1. **Mobile First & Low Latency**: Loading awal < 1.5 detik pada jaringan 4G smartphone standar.
2. **Kejujuran Data**: Dilarang menggunakan istilah "real-time" untuk data survei harian; wajib menyertakan label sumber dan tanggal.
3. **Data Anonymity**: Tidak mempublikasikan identitas pelapor warga dan tidak mempublikasikan nama kios pedagang individual.
