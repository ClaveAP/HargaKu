# API_SPEC.md — RESTful API Contract Specification

Dokumen ini adalah kontrak resmi (**API Contract**) antara frontend dan backend pada platform **HargaKu**.

> [!IMPORTANT]
> **Aturan Wajib**: Backend dilarang mengubah signature endpoint, tipe field JSON, atau format response tanpa memperbarui dokumen ini terlebih dahulu. Frontend dilarang mengasumsikan field data yang belum tertulis di dokumen ini.

---

## 1. Standar Global & Konvensi API

| Aspek | Standar | Keterangan |
| :--- | :--- | :--- |
| **Base URL** | `/api/v1` | Seluruh endpoint wajib memiliki prefix versioning |
| **Protocol** | HTTPS / HTTP/2 | Format JSON payload |
| **Header Request Wajib** | `Content-Type: application/json`<br>`Accept: application/json` | Untuk request JSON standar |
| **Header Auth** | `Authorization: Bearer <jwt_token>` | Khusus rute private admin (`/api/v1/admin/*`) |
| **Naming Convention** | `camelCase` | Seluruh properti JSON request dan response |
| **Date Time Format** | ISO 8601 (`YYYY-MM-DDTHH:mm:ss.sssZ`) | Wajib dalam format UTC |

### 1.1. Frontend Fetcher & Mock Adapter Strategy
Untuk mempercepat pengerjaan frontend tanpa menunggu backend selesai dibangun:
* Seluruh pemanggilan API di frontend diisolasi di folder `src/lib/api/` (misal: `commodities.api.ts`, `price-check.api.ts`).
* Dilarang melakukan fetch langsung dengan hardcode URL di dalam komponen UI (`page.tsx` atau `components/`).
* Setiap fungsi fetcher memiliki adapter data simulasi (`mockAdapter`) yang aktif otomatis jika `NEXT_PUBLIC_USE_MOCK=true`.
* Ketika backend selesai didevelop, tim cukup mengubah `NEXT_PUBLIC_USE_MOCK=false` atau mengarahkan `NEXT_PUBLIC_API_URL` ke server backend tanpa perlu mengubah satu barispun kode di komponen UI frontend.

---

## 2. Standard Response Envelope

Semua response wajib dibungkus dalam format envelope konsisten:

### 2.1. Format Sukses (Single Object)
```json
{
  "success": true,
  "message": "Detail harga berhasil dimuat",
  "data": {
    "id": "cuid_123",
    "name": "Cabai Rawit Merah"
  }
}
```

### 2.2. Format Sukses (Paginated List)
```json
{
  "success": true,
  "message": "Daftar laporan warga berhasil diambil",
  "data": [ ... ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "totalItems": 48,
    "totalPages": 5,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

### 2.3. Format Error
```json
{
  "success": false,
  "message": "Input harga tidak valid",
  "errors": [
    {
      "field": "offeredPrice",
      "message": "Harga penawaran harus lebih besar dari 0"
    }
  ]
}
```

---

## 3. Daftar Endpoint Publik

### 3.1. `GET /api/v1/regions`
Mengambil daftar wilayah provinsi yang didukung oleh sistem dikelompokkan berdasarkan koridor 6 pulau, zonasi pangan Bapanas, dan estimasi biaya logistik laut.
* **Query Params**:
  * `island` (optional, string): Filter pulau (`JAWA`, `SUMATERA`, `KALIMANTAN`, `SULAWESI`, `BALI_NUSRA`, `MALUKU_PAPUA`).
  * `search` (optional, string): Pencarian nama provinsi atau pulau.
* **Response `data`**:
```json
[
  {
    "id": "reg_jabar",
    "name": "Jawa Barat",
    "slug": "jawa-barat",
    "island": "JAWA",
    "islandName": "Pulau Jawa",
    "zone": "ZONA_1",
    "logisticsCostPct": 0,
    "disparityIndex": 1.000,
    "isActive": true
  },
  {
    "id": "reg_kaltim",
    "name": "Kalimantan Timur",
    "slug": "kalimantan-timur",
    "island": "KALIMANTAN",
    "islandName": "Pulau Kalimantan",
    "zone": "ZONA_2",
    "logisticsCostPct": 12,
    "disparityIndex": 1.120,
    "isActive": true
  }
]
```

---

### 3.2. `GET /api/v1/commodities`
Mengambil daftar komoditas pangan yang dipantau beserta ringkasan harga rata-rata terkini pada wilayah terpilih.
* **Query Params**:
  * `region` (optional, string, default: `kota-bogor`): Slug wilayah kabupaten/kota.
  * `category` (optional, string): Filter kategori (`BERAS`, `CABAI_BAWANG`, dll.).
* **Response `data`**:
```json
[
  {
    "id": "com_01",
    "name": "Cabai Rawit Merah",
    "slug": "cabai-rawit-merah",
    "category": "CABAI_BAWANG",
    "unit": "kg",
    "imageUrl": "/images/commodities/cabai-rawit.png",
    "currentAvgPrice": 62500,
    "previousAvgPrice": 58000,
    "changePercentage": 7.76,
    "nationalHapPrice": 57000,
    "regionalAdjustedHap": 57000,
    "statusVsHap": "ABOVE_HAP",
    "lastUpdated": "2026-10-21T05:00:00.000Z"
  }
]
```

---

### 3.3. `GET /api/v1/commodities/:slug`
Mengambil data detail satu komoditas beserta riwayat pergerakan harga 30 hari di wilayah terpilih.
* **Query Params**:
  * `region` (optional, string, default: `kota-bogor`): Slug wilayah.
* **Response `data`**:
```json
{
  "id": "com_01",
  "name": "Cabai Rawit Merah",
  "slug": "cabai-rawit-merah",
  "unit": "kg",
  "category": "CABAI_BAWANG",
  "reference": {
    "nationalHapHet": 57000,
    "regionalAdjustedPrice": 57000,
    "zone": "ZONA_1",
    "type": "HAP",
    "legalDoc": "Perbadan No 17 Tahun 2023"
  },
  "currentPriceStats": {
    "regionName": "Kota Bogor",
    "cityAverage": 62500,
    "highestMarket": { "name": "Pasar Kebon Kembang", "price": 65000 },
    "lowestMarket": { "name": "Pasar Sukasari", "price": 58000 },
    "citizenReportsCount": 24
  },
  "priceHistory": [
    { "date": "2026-10-15", "avgPrice": 59000 },
    { "date": "2026-10-21", "avgPrice": 62500 }
  ]
}
```

---

### 3.4. `GET /api/v1/markets`
Mengambil daftar pasar tradisional pada wilayah terpilih untuk dropdown dan marker peta Leaflet.
* **Query Params**:
  * `region` (optional, string, default: `kota-bogor`): Slug wilayah kabupaten/kota.
* **Response `data`**:
```json
[
  {
    "id": "mkt_01",
    "name": "Pasar Anyar",
    "slug": "pasar-anyar",
    "city": "Kota Bogor",
    "district": "Bogor Tengah",
    "latitude": -6.591234,
    "longitude": 106.792345,
    "isActive": true
  }
]
```

---

### 3.5. `POST /api/v1/price-check` (Cek Harga Wajar & Evaluasi Disparitas)
Mengevaluasi apakah harga yang ditawarkan di pasar wajar atau terdapat disparitas harga berlebih.
* **Request Body**:
```json
{
  "commodityId": "com_01",
  "regionSlug": "kota-bogor",
  "marketId": "mkt_01",
  "offeredPrice": 75000
}
```
* **Response `data`**:
```json
{
  "offeredPrice": 75000,
  "comparisonPrice": 63000,
  "diffPercentage": 19.05,
  "status": "SLIGHTLY_EXPENSIVE",
  "statusLabel": "Agak Mahal",
  "statusBadgeColor": "amber",
  "advice": "Harga ini lebih tinggi 19% dari rata-rata pasar setempat. Cobalah menawar mendekati Rp 63.000/kg atau cek alternatif pasar terdekat.",
  "confidenceLevel": "HIGH",
  "confidenceReason": "Dihitung dari 5 laporan warga terverifikasi dalam 7 hari terakhir di Pasar Anyar.",
  "layers": {
    "lapis1NationalHap": 57000,
    "lapis1RegionalHap": 57000,
    "lapis2OfficialAvg": 64000,
    "lapis3CitizenMedian": 63000
  }
}
```
* **Nilai Status Kemungkinan**:
  * `FAIR` (Wajar, deviasi -10% s.d. +10%)
  * `SLIGHTLY_EXPENSIVE` (Agak Mahal, deviasi +10.01% s.d. +25%)
  * `OVERPRICED` (Terlalu Mahal, deviasi > +25%)
  * `MUCH_CHEAPER` (Jauh Lebih Murah, deviasi < -15%)

---

### 3.6. `POST /api/v1/reports` (Lapor Harga Warga)
Mengirimkan laporan harga baru dari warga di pasar.
* **Content-Type**: `multipart/form-data`
* **Form Fields**:
  * `commodityId` (string, wajib)
  * `marketId` (string, wajib)
  * `reportedPrice` (number, wajib)
  * `photo` (file image jpg/png/webp, opsional maks. 5MB)
  * `notes` (string, opsional maks. 200 karakter)
* **Response `data`**:
```json
{
  "reportId": "rep_987",
  "status": "PENDING",
  "message": "Terima kasih! Laporan Anda sedang ditinjau moderator dan akan segera memengaruhi acuan harga pasar."
}
```

---

### 3.7. `POST /api/v1/assistant/chat` (Konsultasi Asisten Pangan Cerdas)
Mengirimkan pesan obrolan belanja/anggaran dan menerima respons terstruktur berbasis data acuan wilayah aktif.
* **Request Body**:
```json
{
  "message": "Bawang merah 40rb per kilo di pasar kemahalan gak?",
  "regionId": "reg_jabar",
  "conversationHistory": [
    { "role": "user", "content": "..." },
    { "role": "assistant", "content": "..." }
  ]
}
```
* **Response `data`**:
```json
{
  "reply": "Bawang Merah Rp 40.000/kg tergolong Agak Mahal di Jawa Barat. Rata-rata acuan pasar harian saat ini adalah Rp 34.000/kg (terdapat indikasi mark-up sekitar +17.6%). Coba tawar mendekati Rp 34.000 - Rp 36.000 atau cek Pasar Anyar.",
  "intent": "PRICE_CHECK",
  "suggestedActions": [
    { "label": "Bandingkan Antar Pasar", "href": "/komoditas/bawang-merah" },
    { "label": "Hitung Keranjang Belanja", "href": "/keranjang" }
  ],
  "referencedCommodities": [
    {
      "id": "bawang-merah",
      "name": "Bawang Merah",
      "currentPrice": 34000,
      "status": "SLIGHTLY_EXPENSIVE"
    }
  ]
}
```

---

## 4. Daftar Endpoint Admin (Private)

### 4.1. `POST /api/v1/admin/auth/login`
Autentikasi admin & moderator.
* **Request Body**: `{ "email": "admin@hargaku.id", "password": "secretPassword" }`
* **Response `data`**: `{ "token": "jwt_token_here", "user": { "name": "Drs. Hendra Irawan, M.Si", "role": "TPID_OFFICER", "nip": "19820415 200801 1 007", "agency": "Disperindag & TPID Kota Bogor" } }`

### 4.2. `GET /api/v1/admin/auth/me`
Mengambil detail profil akun petugas admin yang sedang login.

### 4.3. `POST /api/v1/admin/auth/logout`
Mengakhiri sesi admin (invalidasi token sesi / cookie).

### 4.4. `PUT /api/v1/admin/auth/profile`
Memperbarui informasi nama, email, atau mengubah kata sandi petugas admin.

### 4.5. `GET /api/v1/admin/reports`
Menampilkan antrean laporan warga yang perlu dimoderasi.
* **Query Params**: `status=PENDING&page=1&limit=20`

### 4.3. `PATCH /api/v1/admin/reports/:id/status`
Menyetujui atau menolak laporan harga warga.
* **Request Body**:
```json
{
  "status": "APPROVED",
  "rejectionReason": null
}
```

---

### 4.4. `POST /api/v1/admin/commodities` (CRUD Komoditas)
Menambahkan komoditas pangan baru ke website publik.
* **Request Body**:
```json
{
  "name": "Bawang Merah Brebes Super",
  "slug": "bawang-merah-brebes-super",
  "category": "CABAI_BAWANG",
  "unit": "kg",
  "hapHetPrice": 42000,
  "tolerancePercentage": 10,
  "imageUrl": "/images/commodities/bawang-merah.png",
  "isActive": true
}
```

### 4.5. `PUT /api/v1/admin/commodities/:id`
Memperbarui metadata, satuan, status aktif, atau harga acuan HAP/HET komoditas.

### 4.6. `DELETE /api/v1/admin/commodities/:id`
Menonaktifkan (soft delete) komoditas dari daftar aktif publik.

---

### 4.7. `POST /api/v1/admin/markets` (CRUD Pasar Tradisional)
Menambahkan pasar tradisional baru ke daftar kota.
* **Request Body**:
```json
{
  "name": "Pasar Jambu Dua",
  "slug": "pasar-jambu-dua",
  "district": "Bogor Utara",
  "address": "Jl. A. Yani No. 1, Kota Bogor",
  "latitude": -6.5712,
  "longitude": 106.8041,
  "operatingHours": "04:00 - 15:00 WIB",
  "specialty": "Sentra Sayur Mayur & Buah",
  "isActive": true
}
```

### 4.8. `PUT /api/v1/admin/markets/:id`
Memperbarui informasi pasar tradisional atau titik koordinat GPS Leaflet.

### 4.9. `DELETE /api/v1/admin/markets/:id`
Menonaktifkan pasar dari pemantauan publik.

---

### 4.10. `POST /api/v1/admin/daily-prices` (Entri Cepat Harga Harian Resmi)
Menyimpan harga resmi survei harian (Lapis 1 & 2) secara massal (*batch*) per pasar.
* **Request Body**:
```json
{
  "marketId": "mkt_01",
  "recordedDate": "2026-10-23",
  "prices": [
    { "commodityId": "com_01", "price": 62000 },
    { "commodityId": "com_02", "price": 38000 }
  ]
}
```
* **Response `data`**:
```json
{
  "recordedDate": "2026-10-23",
  "updatedCount": 2,
  "message": "Harga resmi harian Pasar Anyar berhasil diperbarui dan dipublikasikan."
}
```
