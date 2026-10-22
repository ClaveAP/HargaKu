# Spesifikasi Desain: Sistem Login & Autentikasi Admin (/admin/login)

- **Tanggal**: 2026-10-23
- **Status**: Disetujui
- **Konteks**: Menyediakan portal autentikasi terisolasi dan proteksi akses rute untuk konsol admin HargaKu (`/admin`).

---

## 1. Tujuan & Arsitektur
Halaman `/admin` wajib diproteksi agar hanya petugas Disperindag/TPID terotorisasi yang dapat mengakses dashboard dan memodifikasi data publik.
Sistem autentikasi terdiri dari:
1. **Rute Mandiri `/admin/login`**: Halaman login terisolasi (tanpa layout konsumen publik) dengan kartu masuk bertaraf Clay.com Foundations.
2. **Kredensial Demo 1-Klik**: Memudahkan evaluator/juri kompetisi WIA 2026 untuk menguji dashboard admin tanpa perlu mengingat kredensial (`admin@hargaku.id` / `adminBogor2026!`).
3. **Auth State & Storage**: Sesi disimpan menggunakan cookie/localStorage berlabel `hargaku_admin_session`.
4. **Route Guard**: Jika pengguna belum terautentikasi dan mencoba mengakses `/admin`, otomatis dialihkan ke `/admin/login`. Sebaliknya jika sudah login, akses ke `/admin/login` dialihkan ke `/admin`.

---

## 2. Antarmuka Pengguna (/admin/login)
- **Kanvas**: Warm Stone Canvas (`#F4F3F0`) terpusat (Full viewport height).
- **Kartu Autentikasi**: Elevated White Card (`#FFFFFF`) bergaris rambut (`#E5E3DE`), radius 24px, shadow halus.
- **Elemen Form**:
  - Logo `H.` Electric Lime + pill `ADMIN TPID BOGOR`.
  - Display headline: "Masuk Konsol Pengawas Pangan".
  - Input Email Kedinasan & Input Kata Sandi dengan toggle visibility.
  - Checkbox "Ingat sesi saya".
  - Tombol B2 Signature `[ Masuk ke Konsol Admin ]`.
  - Kartu Demo Quick-Fill: Tombol 1-klik yang otomatis mengisi data demo.
  - Tautan darurat kembali ke Website Publik.

---

## 3. Kontrak & Data Model
- `LoginCredentials`: `{ email: string; password: string; rememberMe?: boolean }`
- `AuthSession`: `{ token: string; user: AdminUserProfile; expiresAt: number }`
- Endpoint Mock/Real: `POST /api/v1/admin/auth/login` sesuai `docs/API_SPEC.md` Section 4.1.
