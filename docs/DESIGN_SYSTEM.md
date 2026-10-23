# DESIGN_SYSTEM.md — Clay.com Foundations Design System

Dokumen ini adalah acuan resmi (**Design System & UI Guidelines**) untuk seluruh antarmuka proyek **HargaKu**, disinkronkan langsung dari kanvas desain Figma/Pencil resmi: **"Design System — Clay.com Foundations"** (Node `Q0Rb5J` di `HargaKu.pen`).

> [!IMPORTANT]
> **Aturan Wajib (Auto-Sync & No AI-Slop)**: Seluruh kode styling di antarmuka publik HargaKu wajib merujuk secara ketat pada token warna, tipografi Roobert, dan varian komponen di dokumen ini. Dilarang menggunakan styling Tailwind generik bawaan (seperti Slate/Zinc generik atau font sans fallback sistem) bila tidak ditentukan di sini.

---

## 1. Brand Identity & Filosofi Visual

* **Karakter Visual**: **Clean Minimalist Premium SaaS (Clay.com Signature Aesthetic)**.
  * **Warm Stone Canvas**: Latar belakang tidak menggunakan putih silau (#FFFFFF) melainkan warm off-white `#FAF9F5` / `#F4F3F0`.
  * **Iconic Clay Orange (`#FF7714`)**: Aksen brand utama yang vibrant, modern, dan memberikan energi pada titik aksi utama.
  * **Electric Lime (`#EEF773`)**: Signature hero pill & badge accent yang dipadukan dengan teks hitam pekat `#1B1A18`.
  * **Deep Charcoal Typography (`#1B1A18`)**: Kontras tinggi tanpa menjadi pitch black murni, dipadukan dengan warna secondary `#6E6D67` / `#78716C`.
  * **Hairline Borders (`#E5E3DE`)**: Garis batas ultra-halus 1px yang memisahkan modul-modul kartu bento secara anggun.
  * **Generous Curvature**: Radius terukur (`rounded-[8px]` untuk kontrol kecil, `rounded-[12px]` untuk tombol/input, `rounded-[20px]` untuk card panggung).

---

## 2. Color Palette & Token Swatches (Sesuai Node `FXBc0`)

### 2.1. Neutrals & Canvas
| Token Name | Hex Code | CSS Variable | Penggunaan |
| :--- | :--- | :--- | :--- |
| **Clay Canvas** | `#FAF9F5` | `--color-clay-canvas` | Latar utama halaman web / body background |
| **Clay Warm Stone** | `#F4F3F0` | `--color-clay-warm` | Top bar container, chip takaran inactive, bento box |
| **Clay Surface** | `#FFFFFF` | `--color-clay-surface` | Kartu putih terangkat (elevated card), input, dropdown |
| **Clay Border** | `#E5E3DE` | `--color-clay-border` | Garis batas 1px pada seluruh container, kartu, dan input |
| **Clay Dark Card** | `#1B1A18` / `#242321` | `--color-clay-dark` | Kartu gelap panggung bento & footer background |
| **Clay Text Dark** | `#1B1A18` | `--color-clay-text` | Warna teks judul, angka nominal tebal, ikon utama |
| **Clay Text Muted** | `#6E6D67` / `#78716C`| `--color-clay-muted` | Paragraf penjelasan, label deskriptif, subtitle |

### 2.2. Brand Accents
| Token Name | Hex Code | CSS Variable | Penggunaan |
| :--- | :--- | :--- | :--- |
| **Clay Orange Primary** | `#FF7714` | `--color-clay-orange` | Tombol CTA utama (B1), dot aksen brand, focus state |
| **Clay Orange Dark** | `#B53D0A` | `--color-clay-orange-dark` | Hover state tombol CTA, outline penegas |
| **Clay Orange Light** | `#FFF3ED` | `--color-clay-orange-light`| Chip takaran aktif (selected), highlight badge wajar |
| **Clay Electric Lime** | `#EEF773` | `--color-clay-lime` | Badge icon "H" navbar, tombol signature hero (B2) |
| **Clay Forest Deep** | `#14532D` | `--color-clay-forest` | Teks status harga wajar |

### 2.3. Semantic Status Kewajaran Harga (Node `M0TDz` & Anti-AI-Slop Refinement)
Formula deviasi harga resmi Bapanas/PIHPS menentukan 4 pill status tanpa warna hijau slop generik:
| Status | Rentang Deviasi | Background | Teks | Border / Outline |
| :--- | :--- | :--- | :--- | :--- |
| **Harga Wajar** | -10% s.d. +10% | `#F4F3F0` (Warm Stone) | `#1B1A18` | `#E5E3DE` |
| **Agak Mahal** | +10% s.d. +25% | `#FEF3C7` (Soft Amber) | `#92400E` | `#FDE68A` |
| **Terlalu Mahal** | > +25% | `#FEE2E2` (Soft Rose) | `#991B1B` | `#FECACA` |
| **Murah / Termurah** | < -10% Rerata | `#EEF773` (Clay Lime) | `#1B1A18` | `#1B1A18` / `#DCE6AF` |

---

## 3. Typography Hierarchy (Roobert Only, Node `YxnO0`)

Seluruh antarmuka **MANDATORI** menggunakan font **Roobert** (`Roobertvf` variable font) dari direktori `fonts/clay.com/`.

```css
@font-face {
  font-family: 'Roobertvf';
  src: url('/fonts/clay.com/647b16174b38dc95.woff2') format('woff2');
  font-display: swap;
  font-weight: 300 900;
}
```

### Type Scale
| Tingkat | Ukuran / Line-Height | Weight | Warna | Penggunaan di HargaKu |
| :--- | :--- | :--- | :--- | :--- |
| **Display Hero** | 50px–54px / 1.12 | Medium (500) | `#1B1A18` | Headline utama hero landing page (`tracking-tight`) |
| **Heading 1** | 36px–38px / 1.2 | Medium (500) | `#1B1A18` | Judul panggung section utama |
| **Heading 2** | 24px–26px / 1.25 | Medium (500) | `#1B1A18` | Sub-headline fitur & nama pasar modal |
| **Heading 3** | 16px–18px / 1.3 | SemiBold (600) | `#1B1A18` | Judul kartu komoditas (Cabai Rawit Merah) |
| **Body Large** | 15px–16px / 1.5 | Normal (400) | `#6E6D67` | Deskripsi sub-hero & narasi pengantar |
| **Body Regular** | 13px–14px / 1.5 | Normal (400)/500 | `#1B1A18` / `#6E6D67` | Teks navigasi, label formulir, data tabel |
| **Caption / Micro** | 11px–12px / 1.4 | SemiBold (600) | `#78716C` / `#1B1A18` | Timestamp pembaruan data, tag pasar, chip |
| **Tabular Figures**| Class `.tabular-nums` | Inherit | — | **Wajib** pada seluruh nominal Rupiah |

### 3.2. Standar Ikonografi (Phosphor Icons Only)
* Seluruh ikon di antarmuka **MANDATORI** menggunakan keluarga ikon **Phosphor Icons** (`@phosphor-icons/react`).
* **DILARANG KERAS** menggunakan emoji (seperti 🔍, 📍, 🛒) atau ikon generik tanpa standar di dalam elemen UI profesional.
* Pilihan weight ikon standar: `regular` untuk navigasi/kontrol form, `bold` untuk indikator status/arah tren, dan `fill` untuk pin lokasi / badge aktif.

---

## 4. Master Components & Button Variants (Node `vLjdy` & `QGRMx`)

### 4.1. Buttons
* **B1 Primary (Clay Orange)**: `bg-[#FF7714] text-white rounded-[12px] px-5 py-2.5 font-bold text-[13px] hover:bg-[#B53D0A] transition-colors shadow-sm`
* **B2 Signature Hero (Clay Lime)**: `bg-[#EEF773] text-[#1B1A18] outline outline-1 outline-[#1B1A18] -outline-offset-1 rounded-[8px] px-[18px] py-[9px] font-semibold text-[13px] hover:bg-[#d8e25d] transition-colors`
* **B3 Dark Charcoal**: `bg-[#1B1A18] text-white rounded-[12px] px-5 py-2.5 font-semibold text-[13px] hover:bg-black transition-colors`
* **B4 Secondary Outline**: `bg-[#F4F3F0] border border-[#E5E3DE] text-[#1B1A18] rounded-[12px] px-5 py-2.5 font-medium text-[13px] hover:bg-[#eae8e3] transition-colors`

### 4.2. Form Inputs & Takaran Chips (Node `G2DESt` & `M0TDz`)
* **Search / Text Input**: Tinggi 44px–48px, `bg-white border border-[#E5E3DE] rounded-[8px] sm:rounded-[12px] px-4 text-[13px] text-[#1B1A18] placeholder-[#8C8B85] focus:outline-none focus:border-[#FF7714]`
* **Takaran Chips (Kg, Ons, dsb.)**:
  * Active: `bg-[#FFF3ED] text-[#FF7714] border border-[#FF7714] rounded-[8px] px-3 py-1.5 font-semibold text-[13px]`
  * Inactive: `bg-[#F4F3F0] text-[#6E6D67] border border-[#E5E3DE] rounded-[8px] px-3 py-1.5 font-medium text-[13px] hover:bg-[#ebe9e4]`

### 4.4. Hero Section 2-Column Split Architecture
* **Layout Kiri (Narrative & Conversion)**:
  * Eyebrow badge status live dengan pulsing dot.
  * Headline display hero `font-medium` (500) `text-[42px] sm:text-[52px]` dengan `tracking-tight`.
  * Sub-headline `text-[16px]` penjelasan nilai produk.
  * Tombol CTA utama (Clay Lime B2 atau Clay Orange B1) + Tombol sekunder dengan ikon Phosphor.
  * Strip metrik kepercayaan (*Proof points*: Pasar-pasar tradisional terdaftar, update harian 06:00 WIB, inisiatif data publik gratis).
* **Layout Kanan (Live Interactive Instrument)**:
  * Kartu elevated white `bg-white rounded-[24px] outline outline-1 outline-[#E5E3DE] shadow-[0_12px_40px_rgba(0,0,0,0.06)]`.
  * Header pemilih komoditas cepat & toggle tab instrumen (Kalkulator Takaran vs. Komparasi Antar Pasar).
  * Komponen kalkulator takaran langsung berinteraksi dengan dataset pasar real-time tanpa reload.



---

## 5. Master Navbar & Footer Spec (Node `D0aYEW` & `gHczi`)

* **Master Navbar**:
  * Background: `#FAF9F5` dengan border-bottom 1px `#E5E3DE`.
  * Brand Identity: Kotak 28x28px Lime `#EEF773` dengan border hitam 1.5px & huruf "H" bold, diikuti teks `HargaKu` (`#1B1A18`) + `.` (`#FF7714`).
  * Links: "Harga", "Cek Harga", "Peta", "Lapor Harga", "Keranjang", "Tentang".
  * Action: Tombol B2 Signature Hero "Cek Harga".
* **Master Footer**:
  * Background: `#FAF9F5` dengan border-top 1px `#E5E3DE`.
  * Grid: Kolom Brand Info (Logo, deskripsi Bogor, copyright 2026), Transparansi Data, Fitur Warga, dan Legal/Kontak.

---

## 6. Admin Portal Component Specs & Integrity Rules

### 6.1. Filter Koridor Wilayah (Island Corridor Tabs)
* **Kategori Tab**: `Semua Wilayah`, `Jawa`, `Sumatera`, `Kalimantan`, `Sulawesi`, `Bali-Nusra`, `Maluku-Papua`.
* **Layout**: `flex flex-wrap items-center gap-1.5`. Dilarang menggunakan overflow slider sempit yang memotong stroke teks atau memicu gesture swipe yang menelan aksi klik pengguna.
* **Token Tab**:
  * Aktif: `bg-[#1B1A18] text-white border-[#1B1A18] shadow-xs`.
  * Inaktif: `bg-white text-[#706E6A] border-[#E5E3DE] hover:bg-[#FAF9F5] hover:text-[#1B1A18]`.

### 6.2. Pagination Kontrol Data Tabel & Interactive Ellipsis
* **Limit Standar**: 10 item per halaman (`ITEMS_PER_PAGE = 10`) untuk mencegah tabel data panjang tak terbatas.
* **Komponen**: `AdminPagination.tsx`.
* **State Reset**: Mengubah pencarian teks atau filter wilayah pulau wajib mengembalikan halaman ke `page 1`.
* **Tombol Nomor Halaman**: `w-8 h-8 rounded-xl font-semibold border text-xs`.
* **Interactive Ellipsis Popover (`...`)**: Jika jumlah halaman melampaui batas (misal: `1 2 3 ... 7`), tombol `...` dapat diklik untuk memunculkan bubble popover interaktif (`PILIH HALAMAN`) yang berisi tombol nomor halaman tersembunyi (`4, 5, 6`), sehingga pengguna dapat langsung melompat ke halaman manapun tanpa harus menekan tombol satu per satu. Popup dilengkapi backdrop click-outside untuk menutup secara otomatis.

### 6.3. Stroke & Border Integrity (Anti-Clipping Rule)
* **Larangan Penggunaan `outline outline-1`**: `outline` pada elemen bersudut lengkung (`rounded-[16px]`, `rounded-[24px]`) menyebabkan artefak visual terpotong di tepi container scroll (`overflow-y-auto` / `overflow-x-auto`).
* **Standar Wajib**: Selalu gunakan `border border-[#E5E3DE]` atau `border border-[#1B1A18]` dengan padding kontainer minimal `p-1` agar garis batas 100% utuh dan tidak terpotong subpixel.

### 6.4. Tabel Data Admin & Alokasi Kolom Bebas Sesak (Anti-Crowding & Anti-Clipping Aksi)
* **Penyederhanaan Kolom Pasar Tradisional**: Menghapus kolom "Sentra Spesialisasi" dari tabel utama untuk mencegah kepadatan visual (*visual crowding*). Detail spesialisasi tetap dapat dikelola via modal form edit.
* **Alokasi Lebar Kolom Tabel Pasar (`table-fixed`)**:
  * `Pasar & Wilayah`: `w-[36%] min-w-[220px]`
  * `Titik GPS`: `w-[24%] min-w-[170px]`
  * `Jam Operasional`: `w-[20%] min-w-[140px]`
  * `Status Peta`: `w-[10%] min-w-[90px]`
  * `Aksi`: `w-[10%] min-w-[100px] text-right pr-6`
* **Jarak Aman Kolom Aksi (`pr-6`)**: Seluruh cell dan header kolom "Aksi" wajib memiliki padding kanan minimal `pr-6` (24px) agar tombol `[Edit]` dan `[Hapus]` memiliki ruang bernapas yang cukup dan garis tepi (*border stroke*) tidak pernah terpotong oleh batas kontainer kartu ber-`overflow-hidden`.


