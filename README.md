# SimulaBiz — AI Business Simulator untuk Bisnis

Platform simulasi keputusan bisnis, intelijen keuangan, dan konsultasi AI untuk Bisnis. Dibangun sebagai React SPA (Vite + React Router + Tailwind CSS).

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

## Model Bisnis (Koin, Token & Referral)

### Biaya Simulasi (Koin)
| Aktivitas | Biaya |
|---|---|
| Simulasi Sederhana (harga & promosi) | 1 Koin |
| Simulasi Ekspansi (cabang/marketplace) | 3 Koin |
| Simulasi Ekspor Global | 5 Koin |
| Analisis Mendalam per metrik (Insight) | 1–2 Koin |
| Laporan Analisis Lengkap (Ekspansi) | 2 Koin |

### Top-up Koin & Paket Bundling Spesial
1. **Paket Koin Standar**: 1 Koin/Rp4.999 · 3/Rp14.499 · 5/Rp23.999 · 10/Rp47.999 · 20/Rp94.999 · 50/Rp228.999
2. **Paket Bundling Spesial**:
   - **Starter Pack** (Rp29.000 / 7 Koin): Hemat 20% + Bebas Akses Simulator 1 Bulan.
   - **Pro Business** (Rp79.000 / 20 Koin): Pilihan Populer + Mentor AI Prioritas.
   *(Diatur di `src/components/modals/ProfileModal.jsx`)*

### Program Referral & Kode Unik
- **Kode Referral Sendiri**: Pengguna dapat melihat dan menyalin (*copy to clipboard*) kode referral unik milik akun sendiri di tab Dompet & Misi modal Profil.
- **Klaim Kode Referral Teman**: Kolom input kode referral teman di bawah bagian top-up untuk mendapatkan +5 Koin gratis otomatis setelah klaim valid.
- **Undang Teman UMKM**: Berbagi kode referral untuk mendapatkan bonus Koin tambahan.

### Token AI Mentor
Setiap pesan chat = 1 Token. User baru dapat **5 token gratis**. Kalau habis, bisa ditukar dari koin: **1 Koin = 5 Token** (tombol muncul otomatis di halaman AI Mentor saat token = 0).

## Fitur Analisis Mendalam & Laporan Konsultan AI (Dinamis Data Profil)

Laporan Analisis di `/insight` (Optimasi Keuangan) dan `/ekspansi` (Kesiapan Pasar Global) **terintegrasi secara dinamis** dengan data Keuangan Bisnis yang diisi oleh pengguna pada Profil:
- **Perhitungan Dinamis**: Skor Kesiapan, Sub-skor, Margin, dan Status Risiko dihitung langsung dari data Pemasukan, Pengeluaran, BEP, dan Margin Keuangan riil dari `healthMetrics`.
- **Format Laporan Konsultan Keuangan Lengkap**:
  - **Rincian Skor Kesiapan** (visual progress bar per kategori)
  - **Estimasi Efisiensi Biaya / Logistik** (angka efisiensi & proyeksi riil)
  - **Temuan Utama & Rekomendasi Strategis** (paragraf analisis terstruktur + rekomendasi taktis)
  - **Langkah Selanjutnya** (SOP aksi nyata berbasis prioritas)
  - **Ekspor & Download**: Fitur unduh laporan lengkap sebagai file `.txt` atau cetak.

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
├── context/AppContext.jsx      # State global: auth, profil, koin, token, produk, keuangan (healthMetrics), toast, modal, tema
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
    ├── Insight.jsx             # Optimasi Keuangan & Laporan Analisis Mendalam Dinamis
    ├── Ekspansi.jsx            # Kesiapan Pasar Global & Laporan Analisis Lengkap Dinamis
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

## Riwayat Perbaikan & Pembaruan Penting

- **Integrasi Analisis Dinamis**: Fitur *Analisis Mendalam* di Insight dan *Laporan Lengkap* di Ekspansi kini mengambil dan memproses data keuangan riil dari Profil pengguna (`healthMetrics`).
- **Sistem Referral & Kode Unik**: Menambahkan tampilan Kode Referral Akun Pengguna + tombol *Copy*, serta form Klaim Kode Referral Teman (+5 Koin).
- **Paket Bundling Koin**: Penambahan opsi Paket Bundling Spesial (*Starter Pack* dan *Pro Business*) pada modal top-up dompet koin.
- **Race condition di `deductCoins` dan `useToken`**: kode lama membaca hasil pengecekan saldo dari dalam callback `setState` yang asinkron — sudah diperbaiki dengan membaca nilai state langsung dari scope komponen.