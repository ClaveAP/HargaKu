# Admin Login & Route Protection Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Membangun rute login mandiri `/admin/login` dengan form autentikasi Clay.com Foundations, kredensial demo 1-klik untuk pengujian juri, layanan sesi aman (`AdminAuthService`), serta proteksi rute (*route guard*) yang mengalihkan akses tidak terotorisasi ke `/admin/login`.

**Architecture:** Menggunakan modul autentikasi terisolasi (`src/lib/auth/admin-auth.ts`) yang menyimpan token sesi di `localStorage` / cookie (`hargaku_admin_session`). Rute `/admin/login` didesain mandiri di luar layout website publik via `PublicLayoutWrapper`. Halaman `/admin` dilindungi oleh `AdminAuthGuard` yang memeriksa validitas token sebelum merender konsol admin.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript (Strict, Zero `any`), Tailwind CSS v4, `@phosphor-icons/react`.

**Spec:** [`docs/superpowers/specs/2026-10-23-admin-login-design.md`](file:///Users/admin/code/HargaKu/docs/superpowers/specs/2026-10-23-admin-login-design.md)

## Global Constraints
- **Spec-Driven Gate**: Patuh pada `docs/API_SPEC.md` Section 4.1 dan `docs/PRD.md`.
- **Anti-God-File**: Soft limit ≤ 200–250 baris per file, Hard limit ≤ 350 baris.
- **Strict TypeScript**: Zero `any`. Seluruh interface DTO didefinisikan eksplisit.
- **Anti-Slop UI & Code**: Estetika konsisten Clay Foundations (Warm Stone `#F4F3F0`, Deep Charcoal `#1B1A18`, Electric Lime `#EEF773`, Hairline Border `#E5E3DE`).
- **Testing & Build**: Wajib lulus `npm test`, `npm run typecheck`, dan `npm run build`.

---

### Task 1: Layanan Autentikasi Admin & Sesi (`src/lib/auth/admin-auth.ts`)

**Files:**
- Create: `src/lib/auth/admin-auth.ts`
- Create: `scripts/verify-admin-auth.mjs`

**Interfaces:**
- Produces:
  - `LoginCredentials`: `{ email: string; password: string; rememberMe?: boolean }`
  - `AuthSession`: `{ token: string; user: AdminUserProfile; expiresAt: number }`
  - `loginAdmin(creds)`: `Promise<{ success: boolean; error?: string; session?: AuthSession }>`
  - `logoutAdmin()`: `void`
  - `getAdminSession()`: `AuthSession | null`
  - `isAuthenticatedAdmin()`: `boolean`
  - `DEMO_ADMIN_CREDENTIALS`: `{ email: 'admin@hargaku.id', password: 'adminBogor2026!' }`

- [ ] **Step 1: Tulis unit test untuk auth service**
  Buat pengujian di `scripts/verify-admin-auth.mjs` untuk memvalidasi: login sukses dengan kredensial demo, login gagal dengan password salah, penyimpanan sesi, dan fungsi logout.
- [ ] **Step 2: Jalankan test dan pastikan gagal**
  Jalankan `node --experimental-strip-types scripts/verify-admin-auth.mjs`.
- [ ] **Step 3: Implementasikan `src/lib/auth/admin-auth.ts`**
  Bangun fungsi `loginAdmin`, `logoutAdmin`, `getAdminSession`, dan `isAuthenticatedAdmin` dengan fallback mock yang siap dihubungkan ke backend PostgreSQL/JWT.
- [ ] **Step 4: Jalankan test dan pastikan 100% lulus**
  Jalankan `node --experimental-strip-types scripts/verify-admin-auth.mjs`.

---

### Task 2: Halaman Login Mandiri (`/admin/login`)

**Files:**
- Create: `src/components/admin/AdminLoginForm.tsx`
- Create: `src/app/admin/login/page.tsx`

**Interfaces:**
- Consumes: `loginAdmin`, `DEMO_ADMIN_CREDENTIALS`
- Produces: Halaman login responsif dengan input email kedinasan, input kata sandi dengan toggle mata, checkbox remember me, tombol 1-klik "Isi Akun Demo", dan penanganan pesan error.

- [ ] **Step 1: Buat `AdminLoginForm.tsx`**
  - Form kartu elevated white dengan radius 24px, logo brand `H.`, dan badge `ADMIN TPID BOGOR`.
  - Input email dan password dengan ikon Phosphor (`EnvelopeSimple`, `LockKey`, `Eye`, `EyeSlash`).
  - Tombol aksi taktil B2 Electric Lime: `[ Masuk ke Konsol Admin ]`.
  - Kartu Demo Quick-Fill: Tombol 1-klik yang otomatis mengisi `admin@hargaku.id` / `adminBogor2026!`.
  - Ukuran file < 220 baris.
- [ ] **Step 2: Buat `src/app/admin/login/page.tsx`**
  - Halaman login server component dengan metadata: `Login Admin TPID · HargaKu`.
  - Background kanvas warm stone penuh (`min-h-screen flex items-center justify-center p-4`).
  - Ukuran file < 40 baris.

---

### Task 3: Proteksi Rute Admin (`AdminAuthGuard.tsx`)

**Files:**
- Create: `src/components/admin/AdminAuthGuard.tsx`
- Modify: `src/app/admin/page.tsx`
- Modify: `src/components/admin/AdminTopbar.tsx`

**Interfaces:**
- Consumes: `isAuthenticatedAdmin()`, `logoutAdmin()`
- Produces: Komponen pembungkus yang memverifikasi status login sebelum merender dashboard admin.

- [ ] **Step 1: Buat `AdminAuthGuard.tsx`**
  - Memeriksa sesi via `isAuthenticatedAdmin()`.
  - Jika belum login: Menampilkan loading spinner taktil singkat lalu melakukan `router.replace('/admin/login')`.
  - Jika sudah login: Merender `{children}`.
  - Ukuran file < 80 baris.
- [ ] **Step 2: Pasang `AdminAuthGuard` di `src/app/admin/page.tsx`**
  - Bungkus `<AdminContainer />` di dalam `<AdminAuthGuard>`.
- [ ] **Step 3: Hubungkan aksi logout di `AdminTopbar.tsx` dan `AdminSidebar.tsx`**
  - Panggil `logoutAdmin()` dan redirect ke `/admin/login`.

---

### Task 4: Verifikasi Menyeluruh, Typecheck, Build, & Dokumentasi

**Files:**
- Modify: `STATE.md`
- Modify: `package.json` (tambahkan `scripts/verify-admin-auth.mjs` ke `npm test`)

- [ ] **Step 1: Jalankan unit testing**
  `npm test` untuk memastikan semua test cases lulus.
- [ ] **Step 2: Jalankan typecheck**
  `npm run typecheck` untuk memastikan zero TypeScript errors.
- [ ] **Step 3: Jalankan production build**
  `npm run build` untuk memverifikasi kompilasi rute `/admin/login` dan `/admin`.
- [ ] **Step 4: Perbarui `STATE.md`**
  Sinkronisasi status pengerjaan sistem login admin.
