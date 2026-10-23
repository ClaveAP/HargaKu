# ENV_SPEC.md — Environment Variables Specification

Dokumen ini adalah spesifikasi resmi seluruh variabel lingkungan (**Environment Variables**) yang digunakan oleh aplikasi **HargaKu** di sisi frontend maupun backend.

> [!CAUTION]
> Dilarang keras melakukan commit file `.env` atau `.env.local` yang berisi nilai rahasia asli ke dalam repository git. Gunakan `.env.example` sebagai template referensi.

---

## 1. Daftar Variabel Lingkungan

| Nama Variabel | Wajib/Opsional | Scope | Deskripsi & Contoh Nilai |
| :--- | :--- | :--- | :--- |
| `DATABASE_URL` | **Wajib** | Backend / Server | Connection string PostgreSQL (contoh: `postgresql://user:pass@localhost:5432/hargaku_db?schema=public`) |
| `DIRECT_URL` | Opsional | Backend / Server | Direct database connection untuk Prisma migrations saat memakai serverless pooler (Neon/Supabase) |
| `NODE_ENV` | **Wajib** | Universal | `development`, `test`, atau `production` |
| `NEXT_PUBLIC_APP_URL` | **Wajib** | Universal / Client | URL root website HargaKu (contoh: `http://localhost:3000` atau `https://hargaku.id`) |
| `NEXT_PUBLIC_API_URL` | Opsional | Client | Base URL endpoint API backend (contoh: `/api/v1` atau `https://api.hargaku.id/api/v1`) |
| `NEXT_PUBLIC_USE_MOCK` | Opsional | Client | Toggle data mock simulasi untuk pengembangan frontend (`true` / `false`, Default: `true` saat backend belum aktif) |
| `JWT_SECRET` | **Wajib** | Backend / Server | Kunci rahasia minimal 32 karakter untuk menandatangani token sesi login admin/moderator |
| `UPLOAD_DIR` | Opsional | Backend / Server | Lokasi penyimpanan sementara foto laporan warga di filesystem lokal (`./public/uploads/reports`) |
| `RATE_LIMIT_MAX_REPORTS` | Opsional | Backend / Server | Batas maksimal laporan warga per hash IP per hari (Default: `10`) |
| `GEMINI_API_KEY` | Opsional | Backend / Server | API Key Google Gemini (AI Studio / Vertex AI) untuk powering endpoint Asisten Pangan AI (`POST /api/v1/assistant/chat`) |

---

## 2. File Template `.env.example`

Simpan file `.env.example` di root repository dengan format berikut:

```bash
# Database Connection (PostgreSQL)
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/hargaku?schema=public"

# Environment
NODE_ENV="development"

# App Public URL & API Fetcher Config
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_API_URL="/api/v1"
NEXT_PUBLIC_USE_MOCK="true"

# Admin Authentication Secret
JWT_SECRET="ganti_dengan_random_string_aman_minimal_32_karakter"

# Upload & Rate Limiting
UPLOAD_DIR="./public/uploads/reports"
RATE_LIMIT_MAX_REPORTS=10

# AI Assistant Integration (Backend Gemini Service)
GEMINI_API_KEY="AIzaSy_ganti_dengan_api_key_gemini_resmi"
```

---

## 3. Aturan Keamanan Variabel
1. Hanya variabel yang memiliki prefix `NEXT_PUBLIC_` yang boleh terekspos ke bundle browser client.
2. Variabel sensitif seperti `DATABASE_URL` dan `JWT_SECRET` **dilarang keras** menggunakan prefix `NEXT_PUBLIC_`.
