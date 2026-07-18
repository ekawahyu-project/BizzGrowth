# SimulaBiz AI (BizGrowth) — Mobile-App-Style Web Edition

Evolusi tampilan mengikuti konsep mockup: bottom navigation bar dengan FAB di tengah
(mobile), sidebar (desktop), kartu putih bersih dengan bayangan lembut, dan alur
navigasi bergaya aplikasi native (back-arrow per halaman).

- **Vite** + **React Router v6** — routing client-side instan
- **Tailwind CSS** — ungu (`#673dcd`) sebagai warna utama, hijau (`#006a3b`) untuk status
  positif, emas untuk koin — font **Inter**
- **React Context** — auth, profil, koin, toast, modal (localStorage-synced)

## Navigasi

- **Mobile**: top bar (brand + notifikasi) + bottom tab bar (Beranda, Simulasi, **+** FAB
  "Buat Simulasi Baru", Insight, Akun). Halaman "dalam" (Simulasi form/hasil, Ekspansi)
  punya tombol back sendiri di pojok kiri atas, mengikuti pola native-app.
- **Desktop**: sidebar kiri persisten dengan seluruh menu (termasuk Ekspansi Pasar & AI
  Mentor yang di mobile diakses lewat kartu modul/banner, bukan tab utama).

## Struktur Halaman

| Route | Halaman |
|---|---|
| `/login`, `/register` | Autentikasi |
| `/beranda` | Dashboard: ringkasan bisnis + modul utama |
| `/simulasi` | Simulator (alur: daftar → atur parameter → hasil) |
| `/insight` | Optimasi Keuangan: skor kesehatan, ringkasan, proyeksi 5 tahun |
| `/ekspansi` | Kesiapan Pasar Global: skor ekspor + negara potensial |
| `/mentor` | Alpet AI (chat) |
| `/profil` | Profil, dompet koin, pengaturan akun |

## Model Bisnis Koin

| Aktivitas | Koin |
|---|---|
| Simulasi Sederhana | Gratis |
| Simulasi Ekspansi | 1 Koin |
| Simulasi Ekspor | 2 Koin |
| Analisis Mendalam (per metrik) | 1–2 Koin |
| Lihat Analisis Lengkap Ekspor | 2 Koin |

Top-up: 1/Rp10rb, 3/Rp29rb, 5/Rp45rb, 10/Rp90rb, 20/Rp180rb, 50/Rp450rb (`src/components/modals/ProfileModal.jsx`).
