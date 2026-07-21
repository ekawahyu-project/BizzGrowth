# BizGrowth — AI Business Simulator untuk UMKM

Platform simulasi keputusan bisnis, intelijen keuangan, dan konsultasi AI untuk pelaku UMKM Indonesia. Dibangun sebagai React SPA (Vite + React Router + Tailwind CSS).

## Struktur Halaman & Navigasi

| Route | Halaman | Akses |
|---|---|---|
| `/` | **Landing page** (info produk, fitur, cara kerja) | Publik. Kalau sudah login, otomatis lempar ke `/beranda` |
| `/login`, `/register` | Autentikasi | Publik |
| `/beranda` | Dashboard: ringkasan bisnis + modul utama | Perlu login |
| `/simulasi` | Simulator strategi (alur: daftar → atur parameter bisnis → hasil) | Perlu login |
| `/insight` | Optimasi Keuangan: skor kesehatan, ringkasan, proyeksi 5 tahun, early warning | Perlu login |
| `/ekspansi` | Kesiapan Pasar Global: skor ekspor, negara potensial, laporan analisis lengkap | Perlu login |
| `/mentor` | AI Business Mentor (chat berbasis token) | Perlu login |
| `/profil` | Profil, dompet koin, manajemen produk, pengaturan akun | Perlu login |

**Navigasi konsisten sidebar-only** — tidak ada navbar atas atau bottom tab bar. Desktop: sidebar kiri persisten. Mobile: top bar minimal (hamburger + brand + koin + notifikasi), tombol hamburger membuka drawer berisi menu sidebar yang sama.

Halaman yang butuh login dijaga oleh `ProtectedRoute` — kalau belum/tidak login (termasuk setelah logout), diarahkan ke `/` (Landing), bukan langsung ke form login.

## Model Bisnis (Koin & Token)

### Biaya Simulasi (Koin)
| Aktivitas | Biaya |
|---|---|
| Simulasi Sederhana (harga & promosi) | 1 Koin |
| Simulasi Ekspansi (cabang/marketplace) | 3 Koin |
| Simulasi Ekspor Global | 5 Koin |
| Analisis Mendalam per metrik (Insight) | 1–2 Koin |
| Laporan Analisis Lengkap (Ekspansi) | 2 Koin |

### Top-up Koin
1 Koin/Rp5.000 · 3/Rp14.500 · 5/Rp24.000 · 10/Rp48.000 · 20/Rp95.000 · 50/Rp229.000 — diatur di `src/components/modals/ProfileModal.jsx`.

### Koin Gratis
Cuma dari program **Undang Teman UMKM** (+2 Koin/teman berhasil daftar).

### Token AI Mentor
Setiap pesan chat = 1 Token. User baru dapat **5 token gratis**. Kalau habis, bisa ditukar dari koin: **1 Koin = 5 Token** (tombol muncul otomatis di halaman AI Mentor saat token = 0).

## Manajemen Produk

Halaman Profil punya section "Manajemen Produk" (tambah/hapus produk + harga opsional). Produk yang didaftarkan di sini otomatis muncul sebagai pilihan saat mengatur strategi **Bundling Produk** atau **Buy 1 Get 1/3** di halaman Simulasi — jadi tidak perlu ketik manual nama produk berulang kali.

## Simulator Bisnis — Alur Detail

`/simulasi` punya 3 tahap:
1. **Daftar** — kartu ajakan + riwayat simulasi terakhir
2. **Atur Simulasi** — input data bisnis riil: harga jual saat ini, HPP per unit, pemasukan & pengeluaran rata-rata/bulan, keuntungan bulan lalu (opsional), kerugian bulan lalu (opsional, terpisah dari keuntungan biar tidak perlu isi minus), Break Even Point, penyesuaian harga (slider % yang tersinkron dua arah dengan input Rp harga baru), strategi promosi (multi-select, termasuk pemilihan produk untuk Bundling/Buy 1 Get 1/3), dan skala strategi (Sederhana/Ekspansi/Ekspor — menentukan biaya koin)
3. **Hasil** — proyeksi dihitung dari input yang dimasukkan (bukan angka acak): margin lama vs baru, estimasi perubahan permintaan (asumsi elastisitas sederhana), estimasi pendapatan & laba, status aman/berisiko dibanding BEP, serta rekomendasi AI kontekstual

## Struktur Folder

```
src/
├── main.jsx / App.jsx          # Entry point & routing (termasuk RootRoute untuk Landing vs redirect)
├── index.css                   # Tailwind + sistem warna + dark mode overrides
├── nav.js                      # Konfigurasi menu sidebar
├── context/AppContext.jsx      # State global: auth, profil, koin, token, produk, toast, modal, tema
├── components/
│   ├── Layout.jsx / Sidebar.jsx / MobileHeader.jsx / MobileDrawer.jsx
│   ├── ThemeToggle.jsx         # Saklar mode gelap/terang (ada varian compact untuk navbar)
│   ├── ProtectedRoute.jsx
│   └── modals/ (ProfileModal, LogoutModal, InsufficientCoinsModal)
└── pages/
    ├── Landing.jsx             # Halaman publik sebelum login
    ├── Login.jsx / Register.jsx
    ├── Beranda.jsx
    ├── Simulasi.jsx
    ├── Insight.jsx
    ├── Ekspansi.jsx
    ├── AIMentor.jsx
    └── Profil.jsx
```

## Menjalankan Secara Lokal

Butuh **Node.js 18+**.

```bash
npm install
npm run dev
```

Buka `http://localhost:5173`.

## Build & Deploy

```bash
npm run build
```

Deploy ke Vercel:
```bash
vercel --prod
```

`vercel.json` sudah berisi rewrite rule supaya refresh di route manapun (misal `/simulasi`) tidak 404 — semua request diarahkan ke `index.html` dan React Router yang menangani routing di sisi client.

## Catatan Gambar

Halaman Simulasi (bagian Ekspansi) memakai `public/BukaCabang.jpg`, `public/EkspansiMarketplace.jpg`, `public/EksporGlobal.jpg` — pastikan file-file ini ada di folder `public/` (nama harus persis sama) sebelum `npm run dev`/`npm run build`.

## Riwayat Perbaikan Penting

- **Race condition di `deductCoins` dan `useToken`**: kode lama membaca hasil pengecekan saldo dari dalam callback `setState` yang asinkron, lalu langsung `return` sebelum callback-nya sempat jalan — akibatnya saldo tetap terpotong tapi fungsi pemanggil (simulasi/chat) selalu dianggap gagal. Sudah diperbaiki dengan membaca nilai state langsung dari scope komponen.