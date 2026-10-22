---
name: hargaku-web-in-action
description: Panduan lengkap membangun HargaKu, website indeks harga kebutuhan pokok untuk lomba Web In Action (Multimedia In Action 2026, UPN Veteran Jakarta). Gunakan skill ini setiap kali mengerjakan HargaKu: desain halaman, skema database, impor data harga, logika Cek Harga Wajar, fitur Lapor Harga, peta harga, README, PDF first draft, atau materi pitch. Aktif saat user menyebut HargaKu, harga pangan, Cek Harga Wajar, Lapor Harga, PIHPS, Panel Harga, HAP/HET, atau Web In Action.
---

# HargaKu — Skill Proyek Web In Action (MIA 2026)

Working name: **HargaKu** · Tagline: *"Tahu harga, beli tenang, jual adil."*
Nama dan tagline masih boleh diganti tim; jangan hardcode di banyak tempat, simpan di satu file konfigurasi.

---

## 1. Tujuan produk

Website publik yang membantu pembeli dan pedagang kecil menjawab: **"Harga ini wajar atau tidak?"**

Tiga lapis harga yang ditampilkan:
1. **Harga acuan resmi** (HAP/HET, Badan Pangan Nasional)
2. **Harga rata-rata pasar** (PIHPS Nasional BI dan Panel Harga Bapanas)
3. **Harga laporan warga** (crowdsourcing level pasar)

Insight utama = **selisih antar lapisan** + status kewajaran.

Konteks lomba:
- Cabang: Web In Action (WIA), MIA 2026, tema "From Visionaries to Architects of Change", tagline "Dream It. Build It. Change It."
- Subtema utama: **Data-Driven Decision Support**. Elemen tambahan: **Civic Reporting & Accountability** (Lapor Harga).
- Tim 1–3 orang, wajib website yang fungsional, responsif, dan menyelesaikan masalah nyata.

---

## 2. Aturan keras (jangan dilanggar)

1. **Jangan mengarang data.** Angka harga, HAP/HET, daftar pasar, dan koordinat harus berasal dari sumber yang dicatat. Kalau belum ada, pakai data simulasi.
2. **Data simulasi wajib berlabel jelas** di UI ("Data simulasi untuk demo") dan di README.
3. **Jangan pakai kata "real-time"** di UI atau pitch untuk data resmi. Gunakan "harga terkini" atau "diperbarui harian", plus timestamp.
4. **Jangan hardcode HAP/HET dari ingatan.** Angka berubah lewat peraturan. Simpan di tabel `reference_prices` dengan kolom sumber, tanggal berlaku, dan tautan dokumen.
5. **Setiap angka di UI punya sumber dan tanggal pembaruan.**
6. **"Wajar" adalah indikator bantu**, bukan penentu harga. Tulis begitu di UI.
7. **Jangan menyebut nama pedagang perorangan.** Data ditampilkan agregat per pasar.
8. **Privasi pelapor**: tidak wajib data pribadi sensitif; hapus metadata EXIF/lokasi presisi dari foto; rate limit.
9. **Jangan menambah fitur di luar scope** tanpa persetujuan tim. Utamakan fitur yang jalan end-to-end daripada banyak fitur setengah jadi.
10. **Verifikasi ketentuan penggunaan data** (PIHPS/Panel Harga) sebelum membuat scraper atau integrasi otomatis. Kalau tidak jelas, gunakan ekspor manual atau data simulasi berlabel.
11. Karya harus **orisinal**; boleh memakai AI dan referensi selama ide tidak menjiplak dan tidak plagiat (ketentuan guidebook).

---

## 3. Scope dan fase

### Fase A — First Draft (19 Okt – 1 Nov 2026)
Wajib jalan:
- Landing page
- Dashboard Harga (kartu komoditas, harga terkini, status vs HAP/HET, tren 30 hari)
- Cek Harga Wajar
- Tentang & Sumber Data
- Repo GitHub publik + README.md
- PDF first draft (maks. 10 halaman, maks. 10 MB)

### Fase B — Revisi (8–10 Nov 2026)
- Lapor Harga (form, foto, validasi, moderasi sederhana)
- Peta Harga per pasar
- Alert dan tren ("harga cabai naik X% minggu ini")
- Kalkulator keranjang belanja (pasar A vs pasar B)
- Polesan responsif, aksesibilitas, mode ringan

### Fase C — Roadmap (hanya dijual di pitch, tidak dibangun)
- Bot WhatsApp
- Prediksi harga
- Mode Pedagang lanjutan (rekomendasi rentang harga jual, notifikasi kulakan)
- Kemitraan Disperindag / Satgas Pangan
- Ekspansi kota

Tanggal penting: First Draft ±1–2 Nov (guidebook tidak konsisten, konfirmasi ke panitia) · Feedback 7 Nov · Konsultasi 8 Nov · Final Submission 11 Nov · Pengumuman finalis 21 Nov · Final onsite 28 Nov.

---

## 4. Wilayah, komoditas, dan sumber data

**Wilayah pilot:** Kota Bogor.
Daftar pasar kandidat (verifikasi nama resmi dan koordinat sebelum dipakai): Pasar Anyar, Pasar Bogor (Kebon Kembang), Pasar Gunung Batu, Pasar Merdeka, serta pasar lain yang dikonfirmasi tim.

**Komoditas (12–15, final setelah cek ketersediaan data):**
beras medium, beras premium, gula pasir, minyak goreng curah, MinyaKita, tepung terigu, telur ayam ras, daging ayam ras, daging sapi, cabai merah keriting, cabai rawit merah, bawang merah, bawang putih, dan 2–3 sayuran harian (tomat, kol, kentang).

**Sumber data, urut prioritas:**

| # | Sumber | Kegunaan | Catatan |
|---|---|---|---|
| 1 | Ketetapan HAP/HET Badan Pangan Nasional | Harga acuan | Ambil dari dokumen resmi terbaru, simpan tautan |
| 2 | PIHPS Nasional (Bank Indonesia) | Harga pasar tradisional per kota | Survei harian; sampel terbatas; cakupan kota dan komoditas perlu dicek |
| 3 | Panel Harga Pangan Bapanas | Pembanding provinsi/nasional | Rata-rata agregat |
| 4 | Laporan warga (Lapor Harga) | Level pasar, komoditas yang tak tercakup sumber resmi | Wajib validasi |
| 5 | Disperindag Kota Bogor | Opsional, data pemantauan lokal | Butuh kontak atau surat |
| 6 | Dataset simulasi | Fallback demo | Wajib berlabel |

Sumber ini tercatat di tabel `data_sources` dan ditampilkan di halaman "Tentang & Sumber Data".

---

## 5. Sitemap

```
/                       Landing
/harga                  Dashboard Harga (daftar komoditas)
/harga/[komoditas]      Detail komoditas (tren, perbandingan pasar, status)
/cek                    Cek Harga Wajar
/peta                   Peta Harga per pasar            (Fase B)
/lapor                  Lapor Harga                     (Fase B)
/keranjang              Kalkulator keranjang belanja    (Fase B)
/tentang                Tentang & Sumber Data
/admin                  Moderasi laporan (sederhana)    (Fase B)
```

---

## 6. Fitur dan perilaku detail

### 6.1 Landing
- Hero: masalah dalam satu kalimat + tombol "Cek Harga Sekarang".
- Tiga manfaat (pembeli, pedagang, transparansi).
- Cuplikan dashboard dan satu contoh Cek Harga Wajar.
- Link sumber data dan tanggal pembaruan terakhir.

### 6.2 Dashboard Harga
- Kartu per komoditas: harga terkini (Rp/satuan), perubahan 7 hari (%), badge status vs HAP/HET, sparkline 30 hari.
- Filter: pasar, kategori (beras, protein, bumbu, sayur, minyak/gula).
- Pencarian komoditas.
- Footer tiap kartu: sumber + tanggal pembaruan + label kepercayaan.

### 6.3 Detail Komoditas
- Grafik tren 30 hari (garis) dengan penanda HAP/HET.
- Perbandingan antar pasar (bar).
- Daftar laporan terbaru (agregat, tanpa nama pedagang).

### 6.4 Cek Harga Wajar (fitur jualan utama)
Input: komoditas, jumlah, satuan, pasar, harga yang ditawarkan (Rp).
Output: status, selisih (Rp dan %), harga pembanding, sumber pembanding, tingkat kepercayaan, posisi terhadap HAP/HET, dan saran singkat.

Algoritma:
1. Normalisasi harga ke satuan standar (Rp/kg atau Rp/liter atau Rp/butir sesuai komoditas).
2. Tentukan **harga pembanding** dengan prioritas:
   - median laporan warga terverifikasi pasar yang sama, 7 hari terakhir, minimal 3 laporan → kepercayaan **Tinggi**
   - jika kurang: harga PIHPS kota → **Sedang**
   - jika tidak ada: Panel Harga provinsi → **Rendah**
   - jika semua tidak ada: tampilkan "Data belum cukup" (jangan menebak)
3. `selisih_pct = (harga_ditawarkan − harga_pembanding) / harga_pembanding × 100`
4. Status (ambang awal, simpan di konfigurasi agar bisa dikalibrasi):
   - `|selisih| ≤ 10%` → **Wajar**
   - `10% < selisih ≤ 25%` → **Agak mahal**
   - `selisih > 25%` → **Terlalu mahal**
   - `selisih < −15%` → **Jauh lebih murah dari biasanya** (cek kualitas, takaran, kesegaran)
5. Tambahkan catatan jika harga melewati HET (untuk komoditas ber-HET).
6. Tampilkan disclaimer: "Indikator bantu berdasarkan data yang tersedia."

Contoh uji (angka ilustrasi, bukan data riil): harga pembanding Rp30.000/kg, ditawarkan Rp32.000 → selisih +6,7% → Wajar. Ditawarkan Rp40.000 → +33,3% → Terlalu mahal.

### 6.5 Lapor Harga (Fase B)
Form: komoditas, pasar, harga, satuan, tanggal/jam (default sekarang), foto (opsional tapi meningkatkan bobot), catatan.
Validasi:
- harga masuk akal terhadap rentang komoditas (batas bawah/atas konfigurabel), kalau di luar → tahan untuk moderasi
- rate limit per perangkat/akun (mis. maks. 10 laporan per hari)
- hapus EXIF foto, kompres gambar
- cegah duplikat (komoditas + pasar + harga + rentang waktu pendek dari sumber sama)

Pemrosesan:
- agregasi memakai **median**, outlier dibuang dengan MAD (mis. > 3 MAD dari median)
- bobot laporan: berfoto > tanpa foto; reputasi pelapor meningkatkan bobot
- laporan baru bisa tampil sebagai "belum terverifikasi" sampai lolos ambang

### 6.6 Peta Harga (Fase B)
- Leaflet + OpenStreetMap; marker per pasar dengan warna berdasarkan indeks harga relatif (murah / sedang / mahal) untuk komoditas terpilih.
- Popup: nama pasar, harga terkini komoditas, jumlah laporan, tanggal pembaruan.
- Pilihan komoditas lewat dropdown. Fallback tabel untuk koneksi lambat.

### 6.7 Alert & Tren (Fase B)
- Hitung perubahan 7 hari per komoditas; tandai lonjakan bila > ambang (mis. 15%) atau z-score tinggi terhadap 30 hari.
- Tampilkan di dashboard sebagai banner: "Cabai rawit merah naik X% dalam 7 hari" (angka dari data, bukan contoh).

### 6.8 Keranjang Belanja (Fase B)
- Pengguna memilih komoditas + jumlah → total estimasi di tiap pasar → pasar termurah dan selisih hemat.

### 6.9 Mode Ringan
- Tanpa peta/gambar berat, tabel sederhana, ukuran halaman kecil; bisa dipicu toggle atau deteksi koneksi lambat.

---

## 7. Skema database (PostgreSQL, boleh PostGIS untuk pasar)

```sql
CREATE TABLE markets (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  city TEXT NOT NULL DEFAULT 'Kota Bogor',
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,
  source_note TEXT
);

CREATE TABLE commodities (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  unit TEXT NOT NULL,            -- 'kg' | 'liter' | 'butir' | 'ikat'
  min_plausible NUMERIC,         -- batas bawah validasi (Rp/unit)
  max_plausible NUMERIC          -- batas atas validasi (Rp/unit)
);

CREATE TABLE data_sources (
  id SERIAL PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,     -- 'PIHPS' | 'BAPANAS_PANEL' | 'WARGA' | 'SIMULASI' | 'DISPERINDAG'
  name TEXT NOT NULL,
  url TEXT,
  is_simulated BOOLEAN NOT NULL DEFAULT FALSE,
  notes TEXT
);

CREATE TABLE price_observations (
  id BIGSERIAL PRIMARY KEY,
  commodity_id INT REFERENCES commodities(id),
  market_id INT REFERENCES markets(id),      -- NULL untuk agregat kota/provinsi
  scope TEXT NOT NULL,                       -- 'market' | 'city' | 'province' | 'national'
  price NUMERIC NOT NULL,                    -- Rp per unit standar
  observed_on DATE NOT NULL,
  source_id INT REFERENCES data_sources(id),
  fetched_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE reference_prices (               -- HAP/HET
  id SERIAL PRIMARY KEY,
  commodity_id INT REFERENCES commodities(id),
  type TEXT NOT NULL,                        -- 'HAP' | 'HET'
  min_price NUMERIC,
  max_price NUMERIC,
  valid_from DATE NOT NULL,
  doc_url TEXT NOT NULL,
  doc_title TEXT
);

CREATE TABLE reports (                        -- laporan warga
  id BIGSERIAL PRIMARY KEY,
  commodity_id INT REFERENCES commodities(id),
  market_id INT REFERENCES markets(id),
  price NUMERIC NOT NULL,
  reported_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  photo_url TEXT,
  note TEXT,
  reporter_id UUID,                          -- anonim/ringan
  status TEXT NOT NULL DEFAULT 'pending',    -- 'pending' | 'accepted' | 'rejected'
  weight NUMERIC DEFAULT 1,
  flag_reason TEXT
);

CREATE TABLE reporters (
  id UUID PRIMARY KEY,
  reputation NUMERIC DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX ON price_observations (commodity_id, market_id, observed_on DESC);
CREATE INDEX ON reports (commodity_id, market_id, reported_at DESC);
```

Seed awal: `markets`, `commodities`, `data_sources`, `reference_prices` (dengan tautan dokumen), dan observasi (resmi atau simulasi berlabel).

---

## 8. Arsitektur dan tech stack (default, sesuaikan dengan keahlian tim)

- **Frontend:** React + Vite + Tailwind CSS, Recharts (grafik), Leaflet (peta).
- **Backend:** Node.js + Express, atau Supabase (PostgreSQL) bila ingin cepat.
- **Database:** PostgreSQL (PostGIS opsional).
- **Deploy:** Vercel/Netlify untuk frontend, Render/Railway/Supabase untuk backend/DB. Pastikan ada **URL publik** untuk demo dan **alternatif offline** untuk final.
- **Struktur repo:**

```
hargaku/
├─ README.md
├─ SKILL.md
├─ docs/            # sitemap, wireframe, catatan sumber data
├─ data/            # seed, CSV simulasi (berlabel), skrip impor
├─ server/          # API, logika harga pembanding, validasi laporan
└─ web/             # React app
```

Endpoint inti (contoh):
- `GET /api/commodities`
- `GET /api/prices?commodity=&market=&from=&to=`
- `GET /api/compare?commodity=&market=` → harga pembanding + kepercayaan
- `POST /api/check` → hasil Cek Harga Wajar
- `POST /api/reports` (Fase B)
- `GET /api/markets`
- `GET /api/alerts` (Fase B)

---

## 9. Panduan desain

- Prinsip: **jelas, ramah orang awam, cepat**. Satu tujuan utama per layar.
- Status warna **tidak boleh jadi satu-satunya penanda** (tambahkan ikon dan teks) demi aksesibilitas.
- Palet: pilih satu warna utama hangat-segar (nuansa pasar) + netral; kontras teks minimal WCAG AA.
- Tipografi: satu font sans yang terbaca di HP; angka harga besar dan tebal.
- Komponen: `PriceCard`, `StatusBadge`, `TrendSparkline`, `SourceFooter`, `MarketSelect`, `CheckForm`, `ResultPanel`.
- Mobile-first; uji di lebar 360 px. Target sentuh min. 44 px.
- Bahasa UI: Indonesia santai tapi sopan, tanpa jargon.
- Setiap halaman punya state **loading, kosong, dan error** yang informatif.

---

## 10. Kualitas, pengujian, dan Definition of Done

Fitur dianggap selesai jika:
- [ ] Jalan end-to-end di URL publik dan di Chrome/Edge/Firefox
- [ ] Responsif (360 px, 768 px, desktop)
- [ ] Ada loading/empty/error state
- [ ] Angka punya sumber dan tanggal
- [ ] Data simulasi berlabel
- [ ] Logika Cek Harga Wajar lolos uji unit untuk kasus: wajar, agak mahal, terlalu mahal, jauh lebih murah, data tidak cukup, outlier laporan
- [ ] Tidak ada rahasia (API key/password) di repo
- [ ] README dan dokumentasi sumber data terbarui

Uji prioritas: fungsi `computeReferencePrice`, `classifyPrice`, `aggregateReports` (median + MAD), validasi form lapor, normalisasi satuan.

---

## 11. Checklist deliverable lomba

### First Draft (ikuti guidebook; konfirmasi tanggal 1 atau 2 Nov ke panitia)
**README.md** berisi:
- Judul + deskripsi 1–2 kalimat
- Tech stack
- Cara menjalankan (clone → install → run)
- Progress saat ini

**PDF** (maks. 10 halaman, maks. 10 MB; ikuti format nama dari guidebook dan konfirmasi ke panitia karena ada inkonsistensi tahun), memuat:
- Konsep singkat (latar belakang, tujuan, masalah)
- Sitemap
- Wireframe/mockup tampilan utama
- Penjelasan fitur utama
- Screenshot minimal 2 halaman (wajib landing page + 1 halaman lain)

### Final Submission (11 Nov)
- Proposal PDF (maks. 30 halaman)
- Surat keterangan orisinalitas karya bermaterai Rp10.000
- Video pitching maks. 5 menit di YouTube publik: perkenalan anggota (nama dan peran), demo fitur utama, rencana pengembangan, deskripsi YouTube menarik
- Semua dikumpulkan lewat mia2026.com dengan folder Google Drive akses publik

### Final onsite (28 Nov, bila lolos 10 besar)
- Pitch deck .pptx/.pdf maks. 15 slide: Cover → Latar Belakang & Masalah → Tujuan & Manfaat → Solusi/Fitur Utama → Demo Website → Rencana Pengembangan → Kesimpulan
- 10 menit presentasi + 5 menit tanya jawab; bahasa Indonesia atau Inggris
- Laptop berisi file presentasi dan prototipe siap jalan, backup di Google Drive, prototipe online + cadangan offline
- Hadir 30 menit sebelum acara

---

## 12. Pemetaan ke kriteria penilaian

| Kriteria | Bobot penyisihan | Bukti dari HargaKu |
|---|---|---|
| Orisinalitas ide & konsep | 20% | Cek Harga Wajar, crowdsourcing level pasar, Mode Pedagang |
| Fungsionalitas | 25% | Fitur inti jalan semua, responsif, mode ringan |
| Desain & estetika | 20% | Kartu harga dengan status jelas, bukan tabel padat |
| Konten & informasi | 20% | Sumber dan tanggal di setiap angka, halaman sumber data |
| Kesesuaian tema & subtema | 15% | Data-Driven Decision Support + Civic Reporting |

Final: Orisinalitas 15% · Fungsionalitas & UX 25% · Desain & kreativitas visual 20% · Presentasi & komunikasi 20% (sesuai tabel guidebook; total bobot di dokumen perlu dikonfirmasi).

---

## 13. Posisi terhadap platform lain (untuk pitch)

- **PIHPS Nasional (BI):** pemantauan harga harian; sampel terbatas (dua pasar utama per kota/kab, dua pedagang per komoditas); tidak ada input warga; bukan untuk keputusan belanja.
- **Panel Harga Bapanas:** agregat nasional/provinsi vs HAP/HET; tidak turun ke pasar.
- **Pemda/Disperindag:** pemantauan lokal, sebagian besar offline atau lewat rilis berita.
- **HargaKu:** lapisan terjemahan + aksi di atas data resmi, plus input warga di level pasar. **Kami memakai dan merujuk data resmi, bukan menggantikannya.**

---

## 14. Narasi dan pertanyaan juri

Alur pitch: Hook ("harga wajar sekilo telur hari ini?") → masalah → celah data resmi → solusi → **demo live Cek Harga Wajar** → Lapor Harga → peta → perbandingan platform → roadmap → penutup ("harga transparan, pasar lebih adil").

Jawaban siap pakai:
- *Bedanya dengan PIHPS?* Mereka memantau data, kami membantu keputusan: jawaban instan, level pasar, input warga, mode pedagang. Kami memakai data mereka.
- *Bagaimana laporan warga dijaga akurasinya?* Median + filter outlier, foto bukti, rate limit, reputasi, dan label jumlah laporan serta kepercayaan.
- *Data boleh dipakai?* Sumber disebutkan, tanggal pembaruan tampil, bagian simulasi diberi label.
- *Siapa pengguna?* Pembeli rumah tangga, pedagang kecil, pengelola pasar, dan Disperindag sebagai mitra potensial.
- *Apa arti "wajar"?* Dekat dengan harga pembanding dari data; indikator bantu, ambang bisa dikalibrasi.

---

## 15. Risiko dan mitigasi

| Risiko | Mitigasi |
|---|---|
| Kualitas crowdsourcing | Median, MAD, rate limit, foto, reputasi, moderasi |
| Akses/legalitas data | Cek ketentuan, ekspor manual, data simulasi berlabel |
| Klaim berlebihan ("real-time") | Pakai "diperbarui harian" + timestamp |
| Scope melebar | Satu kota, 12–15 komoditas, fitur inti dulu |
| Dianggap duplikat PIHPS | Tekankan level pasar, jawaban instan, input warga |
| Privasi pelapor | Anonim/ringan, hapus EXIF, tanpa data sensitif |
| Waktu mepet | Kunci Fase A dulu, Fase B setelah feedback mentor |

---

## 16. Cara kerja agent saat memakai skill ini

Saat diminta membantu HargaKu:
1. **Baca skill ini dulu**, lalu tentukan fase (A, B, C) dan fitur yang disentuh.
2. **Pertahankan scope**: kerjakan yang diminta, jangan menambah fitur atau refactor di luar permintaan.
3. **Jangan mengarang data atau sumber.** Kalau data belum ada, pakai seed simulasi berlabel dan beri tahu user.
4. **Tulis kode lengkap dan siap tempel** (file utuh, bukan potongan), dengan path file yang jelas dan cara menjalankan.
5. Sebelum mengubah file yang ada, baca isinya; jangan menimpa pekerjaan anggota tim.
6. Setelah selesai, laporkan singkat: apa yang dibuat, file yang berubah, cara mengujinya, dan hal yang belum terverifikasi.
7. Jika ada keputusan yang mengubah arah (wilayah, komoditas, sumber data, nama), **tanyakan dulu** dan catat di `docs/decisions.md`.
8. Hentikan dan minta konfirmasi sebelum tindakan destruktif (hapus data, reset database, force push).

---

## 17. Pertanyaan terbuka (selesaikan bersama tim)

- Ketentuan penggunaan dan akses data PIHPS/Panel Harga: API, ekspor, atau manual?
- Daftar final pasar Kota Bogor dan koordinatnya
- Komoditas final (cek cakupan terigu dan sayuran)
- Nama dan tagline final
- Tanggal pasti First Draft (1 atau 2 Nov) dan format nama file PDF
- Hasil Technical Meeting: apakah ada studi kasus atau ketentuan karya WIA tambahan
- Pembagian peran 3 orang: UI/frontend, backend/data, riset/pitch
