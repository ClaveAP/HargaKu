# HargaKu — Rangkuman Ide Web In Action (MIA 2026)

> Nama kerja: **HargaKu** · Tagline: *"Tahu harga, beli tenang, jual adil."*
> Subtema utama: **Data-Driven Decision Support** (+ elemen **Civic Reporting & Accountability** dari fitur lapor harga)
> Status: draf diskusi, nama dan tagline masih bisa diganti tim.

---

## 1. Ringkasan satu paragraf

HargaKu adalah website publik yang membantu pembeli dan pedagang kecil menjawab satu pertanyaan sederhana: **"Harga ini wajar atau tidak?"**. Data harga pangan sebenarnya sudah ada di platform pemerintah, tapi tersaji untuk analis, bukan untuk ibu-ibu di pasar atau pedagang sayur. HargaKu menyederhanakan data itu, menambahkan **laporan harga dari warga** di level pasar, lalu mengubahnya menjadi jawaban langsung lewat fitur **Cek Harga Wajar**, peta harga antar pasar, keranjang belanja multi-wilayah dengan ekspor WhatsApp, dan peringatan lonjakan harga. Cakupan: **Nasional (21 Provinsi, 6 Koridor Pulau, 64 Sentra Pasar Tradisional)**, 12–15 komoditas pokok.

---

## 2. Masalah yang diangkat

### 2.1 Dari sisi pembeli
- Tidak punya acuan harga saat belanja. Harga bisa beda antar pasar dan antar pedagang, dan pembeli sulit tahu apakah dirinya dipatok terlalu mahal.
- Informasi harga resmi ada, tapi tampilannya berupa tabel dan grafik yang tidak ramah orang awam.
- Tidak ada cara mudah membandingkan "belanja di pasar A atau pasar B, mana yang lebih hemat?".

### 2.2 Dari sisi pedagang kecil
- Kalah informasi: tidak tahu harga kulakan atau harga jual di pasar sekitar, sehingga sulit menentukan harga jual yang bersaing tapi tetap untung.
- Lonjakan harga (cabai, bawang, telur, minyak) sering diketahui terlambat.

### 2.3 Dari sisi data dan pengawasan
- Data resmi mewakili sampel kecil. Di PIHPS Nasional, survei hanya mencakup **dua pasar tradisional utama per kota/kabupaten** dan **dua pedagang per komoditas**, jadi harga di pasar lain atau pasar kecil tidak terlihat.
- Tidak ada kanal sederhana bagi warga untuk **melaporkan harga yang janggal** (misalnya harga di atas HET atau lonjakan mendadak).
- Data publik jarang diterjemahkan menjadi insight yang bisa ditindaklanjuti (selisih terhadap harga acuan, tren, perbandingan pasar).

---

## 3. Platform yang sudah ada dan celahnya

| Platform | Apa yang sudah dilakukan | Celah yang bisa kita isi |
|---|---|---|
| **PIHPS Nasional** (Bank Indonesia) | Harga pangan strategis harian dari pasar tradisional, pasar modern, pedagang besar, dan produsen. Survei pagi hari, publikasi sekitar siang. Tampilan tren pendek (7 titik data terakhir). | Sampel terbatas (2 pasar utama per kota/kab). Orientasi ke pemantauan ekonomi, bukan ke keputusan belanja harian. Tidak ada input warga. |
| **Panel Harga Pangan** (Badan Pangan Nasional) | Rata-rata harga tingkat konsumen dan produsen, dibandingkan dengan HAP/HET. Sering dikutip media saat harga naik. | Fokus agregat nasional dan provinsi. Tidak turun ke level pasar tempat orang benar-benar belanja. |
| **Pemda / Disperindag** (contoh Kota Bogor) | Pemantauan harga rutin di pasar tradisional kota, dan pernah ada papan teks berjalan harga di Pasar Bogor. | Informasi sebagian besar offline atau lewat rilis berita. Kemungkinan tidak ada versi digital interaktif untuk warga. *(Sumber lama, verifikasi kondisi terbaru.)* |
| **Grup WhatsApp / media sosial** | Warga saling kabar harga secara informal. | Tidak terstruktur, tidak terverifikasi, tidak bisa dibandingkan. |

**Posisi HargaKu:** bukan pengganti PIHPS atau Panel Harga, tapi **lapisan "terjemahan + aksi"** di atasnya. Data resmi jadi fondasi, laporan warga mengisi celah level pasar, dan hasil akhirnya berupa jawaban yang langsung bisa dipakai.

---

## 4. Konsep inti: tiga lapis harga

Website tidak menentukan "harga seharusnya". Website menampilkan tiga lapis dan **selisih di antaranya** sebagai insight:

1. **Harga acuan resmi** — HAP/HET dari Badan Pangan Nasional.
2. **Harga rata-rata pasar** — dari data resmi (PIHPS dan Panel Harga).
3. **Harga laporan warga** — crowdsourcing di level pasar, dengan foto bukti dan validasi.

Istilah yang dipakai: **"harga terkini / diperbarui harian"**, bukan "real-time", karena data resmi umumnya harian.

---

## 5. Kenapa ide ini kuat (dipetakan ke kriteria juri)

| Kriteria (bobot penyisihan) | Argumen HargaKu |
|---|---|
| **Orisinalitas ide & konsep (20%)** | Pembeda ada di tiga hal yang tidak dilakukan platform resmi: *Cek Harga Wajar* (jawaban instan), *crowdsourcing level pasar*, dan *Mode Pedagang*. Bukan sekadar menampilkan ulang data. |
| **Fungsionalitas (25%)** | Fitur sedikit tapi semuanya jalan end-to-end: dashboard, cek harga, lapor harga, peta. Responsif dan ada mode ringan untuk HP low-end. |
| **Desain & estetika (20%)** | Bahasa visual sederhana: kartu harga dengan status warna (wajar / agak mahal / terlalu mahal), bukan tabel padat. |
| **Konten & informasi (20%)** | Setiap angka punya sumber, tanggal pembaruan, dan label kepercayaan data. Halaman "Tentang & Sumber Data" yang jujur. |
| **Kesesuaian tema (15%)** | Data-Driven Decision Support (insight dari data publik, perbandingan antar pasar, tren) plus Civic Reporting (lapor harga janggal). Dua kaki dalam satu produk. |

Kekuatan tambahan:
- **Dampak mudah dijelaskan**: semua juri pernah belanja ke pasar.
- **Demo mudah dan memuaskan**: Cek Harga Wajar bisa dijalankan live dalam 30 detik.
- **Lokal tapi bisa diskalakan**: pilot Kota Bogor, arsitektur siap diperluas ke Jabodetabek dan kota lain.
- **Dua sisi pengguna**: pembeli dan pedagang, jadi value proposition lebih luas.

---

## 6. Keputusan yang diusulkan

### 6.1 Wilayah fokus: **Kota Bogor**
Alasan: skup realistis untuk dua minggu pengerjaan, tim punya akses ke lapangan untuk validasi, ada pasar-pasar besar yang jelas (misalnya Pasar Anyar, Pasar Bogor/Kebon Kembang, Pasar Gunung Batu, Pasar Merdeka; **verifikasi daftar final dan koordinatnya**), dan secara visual cocok dengan peta interaktif. Cadangan: Jabodetabek, tapi risiko scope melebar.

### 6.2 Sumber data (urut prioritas)
1. **Harga acuan HAP/HET** dari ketetapan Badan Pangan Nasional (ambil angka terbaru saat build, jangan hardcode dari ingatan).
2. **PIHPS Nasional** (BI) untuk harga pasar tradisional kota yang tersedia.
3. **Panel Harga Pangan Bapanas** untuk rata-rata provinsi/nasional sebagai pembanding.
4. **Laporan warga** (fitur Lapor Harga) untuk level pasar dan komoditas yang tidak tercakup sumber resmi (misalnya sebagian sayuran dan terigu; **cek cakupan komoditas** di PIHPS/Panel Harga).
5. **Data Disperindag Kota Bogor** bila bisa diperoleh (opsional, surat atau kontak langsung).
6. **Fallback**: dataset simulasi realistis yang **diberi label jelas "data simulasi untuk demo"**.

> ⚠️ Belum terverifikasi: apakah ada API resmi atau ketentuan penggunaan data yang mengizinkan pengambilan otomatis. Tim harus mengeceknya sebelum membangun integrasi. Kalau tidak jelas, pakai ekspor manual atau data simulasi berlabel, dan tulis jujur di pitch.

### 6.3 Komoditas (12–15)
Beras medium, beras premium, gula pasir, minyak goreng (curah dan MinyaKita), tepung terigu, telur ayam ras, daging ayam ras, daging sapi, cabai merah keriting, cabai rawit merah, bawang merah, bawang putih, serta 2–3 sayuran harian (misalnya tomat, kol, kentang). Final setelah cek ketersediaan data.

---

## 7. Fitur dan pembagian fase

### Fase Draft (19 Okt – 1 Nov) — wajib jalan
- Landing page (masalah, solusi, CTA)
- **Dashboard Harga**: kartu komoditas, harga terkini, status vs HAP/HET, tren 30 hari
- **Cek Harga Wajar**: input komoditas, jumlah/satuan, pasar, harga ditawarkan → hasil status + selisih + tingkat kepercayaan
- Halaman **Tentang & Sumber Data**
- README.md dan PDF first draft sesuai syarat guidebook

### Fase Revisi (8–10 Nov) — berdasarkan feedback mentor
- **Lapor Harga** (form, foto, validasi dasar, moderasi sederhana)
- **Peta Harga** per pasar (marker atau heatmap)
- **Alert & tren**: "harga cabai naik X% minggu ini"
- **Kalkulator keranjang belanja**: total belanja pasar A vs pasar B
- Polesan responsif, aksesibilitas, mode ringan

### Roadmap (dijual di pitch, tidak dibangun)
- Bot WhatsApp untuk cek harga
- Prediksi harga jangka pendek
- Mode Pedagang lanjutan (rekomendasi rentang harga jual, notifikasi kulakan)
- Kemitraan resmi dengan Disperindag / Satgas Pangan
- Ekspansi ke kota lain

---

## 8. Cara kerja Cek Harga Wajar (logika awal)

1. Hitung **harga pembanding** untuk komoditas dan pasar yang dipilih, dengan prioritas:
   - median laporan warga terverifikasi di pasar itu (7 hari terakhir, minimal 3 laporan) → kepercayaan **Tinggi**
   - jika tidak cukup: PIHPS kota → **Sedang**
   - jika tidak ada: Panel Harga provinsi → **Rendah**
2. Hitung selisih persentase harga yang ditawarkan terhadap harga pembanding.
3. Beri status (ambang awal, **perlu dikalibrasi dengan data**):
   - dalam ±10%: **Wajar**
   - +10% s.d. +25%: **Agak mahal**
   - di atas +25%: **Terlalu mahal**
   - di bawah −15%: **Jauh lebih murah dari biasanya** (cek kualitas, takaran, atau kesegaran)
4. Tampilkan juga posisi terhadap HAP/HET bila ada.

---

## 9. Risiko dan mitigasi

| Risiko | Mitigasi |
|---|---|
| **Kualitas data crowdsourcing** (salah input, iseng, manipulasi) | Pakai median, buang outlier (mis. berbasis MAD), batasi laporan per user per hari, foto bukti, skor reputasi, tampilkan jumlah laporan dan tingkat kepercayaan. |
| **Ketersediaan dan legalitas data resmi** | Cek ketentuan sumber. Siapkan data simulasi berlabel. Selalu cantumkan sumber dan tanggal. |
| **Klaim "real-time" yang tidak akurat** | Gunakan "diperbarui harian" dan tampilkan timestamp. |
| **Scope melebar** | Satu kota, 12–15 komoditas, fitur inti dulu. Sisanya roadmap. |
| **"Ini cuma duplikat PIHPS"** | Tekankan lapisan baru: level pasar, jawaban instan, input warga, mode pedagang. |
| **Privasi pelapor** | Jangan wajibkan data pribadi sensitif. Akun ringan atau anonim dengan rate limit. Hapus metadata foto (EXIF/lokasi presisi). |
| **Saling tuding pedagang tertentu** | Tampilkan data agregat per pasar, bukan menyebut nama pedagang. |

---

## 10. Narasi pitch (alur 10 menit)

1. **Hook**: "Berapa harga wajar sekilo telur hari ini di pasar dekat rumah Anda? Hampir tidak ada yang bisa menjawab dengan pasti."
2. **Masalah**: harga beda antar pasar, pembeli tanpa acuan, pedagang kecil kalah informasi, data resmi sulit dipahami dan sampelnya terbatas.
3. **Celah**: data pemerintah ada, tapi belum jadi keputusan sehari-hari.
4. **Solusi**: HargaKu, tiga lapis harga + Cek Harga Wajar + Lapor Harga + Peta.
5. **Demo live**: Cek Harga Wajar → Lapor Harga → lihat peta berubah.
6. **Keunggulan**: dibanding platform sejenis (tabel perbandingan).
7. **Roadmap**: WhatsApp bot, prediksi, kemitraan Disperindag.
8. **Penutup**: "Harga yang transparan membuat pasar lebih adil bagi pembeli dan pedagang."

Urutan slide final mengikuti guidebook: Cover → Latar Belakang & Masalah → Tujuan & Manfaat → Solusi/Fitur → Demo → Rencana Pengembangan → Kesimpulan (maks. 15 slide, 10 menit + 5 menit tanya jawab).

---

## 11. Antisipasi pertanyaan juri

| Pertanyaan | Arah jawaban |
|---|---|
| "Bedanya dengan PIHPS?" | PIHPS untuk pemantauan data, kami untuk keputusan: jawaban instan, level pasar, input warga, mode pedagang. Kami memakai data resmi, bukan bersaing dengannya. |
| "Bagaimana memastikan laporan warga benar?" | Median + outlier filter, foto bukti, rate limit, reputasi, label jumlah laporan dan kepercayaan. |
| "Dari mana datanya, boleh dipakai?" | Sumber resmi disebutkan, tanggal pembaruan ditampilkan. Bagian yang simulasi diberi label jelas. |
| "Siapa yang mau pakai?" | Pembeli rumah tangga, pedagang kecil, pengelola pasar, dan Disperindag sebagai mitra. |
| "Kenapa harga bisa 'wajar' menurut kalian?" | Wajar = dekat dengan harga pembanding dari data. Ini indikator bantu, bukan penentu harga. Ambang bisa dikalibrasi. |
| "Model bisnis / keberlanjutan?" | Dampak sosial dulu. Peluang: kemitraan pemda, dashboard untuk pengelola pasar, data agregat anonim. |

---

## 12. Rencana kerja tim (3 orang, saran)

| Peran | Fokus |
|---|---|
| **A — Frontend/UI** | Desain sistem, landing, dashboard, Cek Harga Wajar, responsif |
| **B — Backend/Data** | Skema database, impor data, API, logika harga pembanding, validasi laporan |
| **C — Riset/Konten/Pitch** | Verifikasi sumber data, daftar pasar dan komoditas, PDF draft, naskah pitch, video |

Timeline kunci: Build It 19 Okt – 1 Nov · First Draft ±1–2 Nov · Feedback 7 Nov · Konsultasi 8 Nov · Revisi 8–10 Nov · Final Submission 11 Nov · Pengumuman finalis 21 Nov · Final onsite 28 Nov.

---

## 13. Daftar verifikasi sebelum mulai coding

- [ ] Pastikan tim sudah berstatus **Terverifikasi** di dashboard mia2026.com (pendaftaran batch 2 ditutup 16 Oktober).
- [ ] Konfirmasi ke panitia tanggal First Draft (guidebook menulis 1 dan 2 November) dan beberapa typo tahun di dokumen (mis. "FDSMIA2025", "7 November 2025").
- [ ] Ikuti dan catat hasil **Technical Meeting** (studi kasus dan ketentuan karya WIA bisa memengaruhi arah).
- [ ] Cek cakupan komoditas dan kota di PIHPS dan Panel Harga; cek ketentuan penggunaan datanya.
- [ ] Tentukan daftar pasar Kota Bogor + koordinat.
- [ ] Putuskan nama final, tagline, dan stack teknologi.
- [ ] Siapkan akun GitHub publik dan README sejak hari pertama.

---

## 14. Sumber rujukan yang dipakai dalam diskusi

- Bank Indonesia, siaran pers dan FAQ PIHPS Nasional (cakupan pasar, metode survei, jadwal publikasi)
- Badan Pangan Nasional, Panel Harga Pangan (rata-rata harga konsumen, HAP/HET)
- Pemberitaan Antara tentang pemantauan harga pasar dan papan teks berjalan harga di Kota Bogor (artikel lama, perlu verifikasi kondisi saat ini)
- Guidebook Web In Action MIA 2026 (kriteria penilaian, timeline, ketentuan draft dan final)
