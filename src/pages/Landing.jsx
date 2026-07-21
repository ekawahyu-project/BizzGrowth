import { useState } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";

const FEATURES = [
  {
    icon: "model_training",
    tint: "bg-primary-100 text-primary-600",
    title: "Simulator Bisnis",
    desc: "Uji strategi harga, promosi, dan ekspansi secara virtual sebelum diterapkan ke dunia nyata dan lihat dampaknya ke profit serta risiko dalam hitungan detik.",
  },
  {
    icon: "account_balance_wallet",
    tint: "bg-secondary-100 text-secondary-600",
    title: "Optimasi Keuangan",
    desc: "Pantau kesehatan keuangan, deteksi dini potensi arus kas negatif, dan dapatkan proyeksi 5 tahun ke depan dari data bisnis Anda sendiri.",
  },
  {
    icon: "public",
    tint: "bg-tertiary-100 text-tertiary-600",
    title: "Ekspansi Pasar",
    desc: "Cek skor kesiapan ekspor produk Anda dan temukan negara tujuan paling potensial berdasarkan permintaan & daya saing.",
  },
  {
    icon: "smart_toy",
    tint: "bg-amber-100 text-amber-600",
    title: "AI Business Mentor",
    desc: "Konsultasikan strategi kapan saja lewat chat dan dapatkan saran konkret, bukan teori umum, langsung dari data bisnis Anda.",
  },
];

const PROBLEMS = [
  "Belum menemukan strategi & potensi tepat untuk menaikkan keputusan bisnis hanya berdasarkan intuisi dan pengalaman relasi.",
  "Tidak semua pemilik bisnis punya fundamental bisnis yang kuat, seperti pemahaman manajemen, pemasaran, dan keuangan.",
  "Jasa konsultan profesional biayanya tidak sedikit dan tidak terjangkau untuk bisnis dengan modal terbatas.",
];

const STEPS = [
  { n: "01", title: "Daftar", desc: "Buat akun dalam 1 menit." },
  { n: "02", title: "Atur Skenario", desc: "Masukkan data bisnis Anda disertai harga, HPP, pemasukan, pengeluaran, strategi yang mau diuji." },
  { n: "03", title: "Dapat Rekomendasi AI", desc: "Lihat proyeksi profit, risiko, dan saran konkret sebelum Anda ambil keputusan sungguhan." },
];

function NavLink({ href, children }) {
  return (
    <a href={href} className="text-sm font-semibold text-slate-600 hover:text-primary-700 transition-colors">
      {children}
    </a>
  );
}

export default function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <div className="bg-aurora">
        <span className="blob" />
      </div>

      {/* Top nav */}
      <header className="relative z-20 sticky top-0 bg-white/80 backdrop-blur-xl border-b border-slate-200/60">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary-600 flex items-center justify-center p-1.5 shrink-0">
              <img src="/logo.png" alt="BizGrowth" className="w-full h-full object-contain" />
            </div>
            <span className="font-bold text-slate-900 text-lg">BizGrowth</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <NavLink href="#fitur">Fitur</NavLink>
            <NavLink href="#cara-kerja">Cara Kerja</NavLink>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle compact />
            <Link to="/login" className="text-sm font-bold text-slate-700 hover:text-primary-700 px-4 py-2 transition-colors">
              Masuk
            </Link>
            <Link
              to="/register"
              className="btn-glow bg-primary-600 hover:bg-primary-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all shadow-md shadow-primary-600/20"
            >
              Daftar
            </Link>
          </div>

          <div className="flex md:hidden items-center gap-1">
            <ThemeToggle compact />
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-600 hover:bg-slate-100 dark:hover:bg-white/10"
            >
              <span className="material-symbols-outlined">{menuOpen ? "close" : "menu"}</span>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white px-5 py-4 space-y-3 animate-fade-in-up">
            <a href="#fitur" onClick={() => setMenuOpen(false)} className="block text-sm font-semibold text-slate-700">
              Fitur
            </a>
            <a href="#cara-kerja" onClick={() => setMenuOpen(false)} className="block text-sm font-semibold text-slate-700">
              Cara Kerja
            </a>
            <div className="flex flex-col gap-2 pt-2">
              <Link to="/login" className="text-center text-sm font-bold text-slate-700 border border-slate-200 rounded-xl py-2.5">
                Masuk
              </Link>
              <Link to="/register" className="text-center text-sm font-bold text-white bg-primary-600 rounded-xl py-2.5">
                Daftar
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative z-10 max-w-6xl mx-auto px-5 pt-16 pb-20 md:pt-24 md:pb-28 text-center overflow-hidden">
        <div className="landing-dots" />
        <div
          className="landing-glow w-72 h-72 -top-10 left-[8%] opacity-40"
          style={{ background: "radial-gradient(circle, #a37ef0, transparent 70%)" }}
        />
        <div
          className="landing-glow w-80 h-80 top-10 right-[5%] opacity-30"
          style={{ background: "radial-gradient(circle, #6889ff, transparent 70%)" }}
        />
        <div
          className="landing-glow w-64 h-64 bottom-0 left-1/2 -translate-x-1/2 opacity-20"
          style={{ background: "radial-gradient(circle, #49e08d, transparent 70%)" }}
        />
        <div className="relative z-10">
          <span className="inline-flex items-center gap-1.5 bg-primary-50 text-primary-700 text-xs font-bold px-3 py-1.5 rounded-full border border-primary-100 mb-6">
            <span className="material-symbols-outlined text-sm icon-fill">auto_awesome</span>
            Partner Bisnis Anda
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight max-w-3xl mx-auto">
            Uji Coba Keputusan Bisnis Anda,{" "}
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Sebelum Ambil Risiko Nyata
            </span>
          </h1>
          <p className="text-slate-500 text-base md:text-lg mt-5 max-w-2xl mx-auto leading-relaxed">
            BizGrowth membantu pemilik bisnis mensimulasikan strategi harga, promosi, dan ekspansi secara virtual serta
            lengkap dengan analisis keuangan dan konsultasi AI, tanpa perlu biaya konsultan mahal.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
            <Link
              to="/register"
              className="btn-glow w-full sm:w-auto bg-primary-600 hover:bg-primary-700 text-white font-bold px-7 py-3.5 rounded-2xl transition-all shadow-lg shadow-primary-600/25 active:scale-95"
            >
              Mulai Sekarang
            </Link>
            <a
              href="#fitur"
              className="w-full sm:w-auto text-slate-700 font-bold px-7 py-3.5 rounded-2xl border-2 border-slate-200 hover:border-primary-300 hover:text-primary-700 transition-all text-center"
            >
              Lihat Fitur
            </a>
          </div>
        </div>
      </section>

      {/* Problem framing */}
      <section className="relative z-10 max-w-5xl mx-auto px-5 pb-20">
        <div className="premium-card rounded-3xl p-6 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-xs font-bold text-rose-500 uppercase tracking-widest">Masalah yang sering dihadapi bisnis</span>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mt-2 mb-4">
                Bisnis sulit berkembang bukan karena kurang usaha
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                Banyak pemilik bisnis kesulitan mempertahankan bisnisnya karena keputusan diambil hanya berdasarkan
                intuisi, tanpa alat bantu untuk menguji dampaknya lebih dulu.
              </p>
            </div>
            <ul className="space-y-3">
              {PROBLEMS.map((p) => (
                <li key={p} className="flex gap-3 items-start bg-rose-50 border border-rose-100 rounded-xl p-4">
                  <span className="material-symbols-outlined text-rose-500 shrink-0">error</span>
                  <span className="text-sm text-slate-600 leading-relaxed">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="fitur" className="relative z-10 max-w-6xl mx-auto px-5 pb-20 scroll-mt-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-primary-600 uppercase tracking-widest">Fitur Utama</span>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-2">
            Satu Platform, Empat Modul Penting untuk Bisnis Anda
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {FEATURES.map((f) => (
            <div key={f.title} className="premium-card rounded-2xl p-6">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${f.tint}`}>
                <span className="material-symbols-outlined text-[26px]">{f.icon}</span>
              </div>
              <h3 className="font-bold text-slate-800 mb-1.5">{f.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="cara-kerja" className="relative z-10 max-w-5xl mx-auto px-5 pb-20 scroll-mt-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-primary-600 uppercase tracking-widest">Cara Kerja</span>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-2">Mulai dalam 3 Langkah Sederhana</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map((s) => (
            <div key={s.n} className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-primary-600 text-white font-extrabold text-lg flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary-600/25">
                {s.n}
              </div>
              <h3 className="font-bold text-slate-800 mb-1.5">{s.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed max-w-xs mx-auto">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 max-w-5xl mx-auto px-5 pb-24">
        <div className="bg-gradient-to-br from-primary-600 to-secondary-600 rounded-3xl p-10 md:p-14 text-center text-white relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-56 h-56 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -left-10 -bottom-10 w-56 h-56 bg-white/10 rounded-full blur-3xl" />
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Siap Uji Strategi Bisnis Anda?</h2>
            <p className="text-primary-100 max-w-xl mx-auto mb-7">
              Daftar sekarang, dapat koin awal gratis, dan mulai simulasikan keputusan bisnis Anda hari ini juga.
            </p>
            <Link
              to="/register"
              className="inline-block bg-white text-primary-700 font-bold px-8 py-3.5 rounded-2xl hover:bg-primary-50 transition-all shadow-lg active:scale-95"
            >
              Daftar Sekarang
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-200/60 bg-white/60 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-5 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-primary-600 flex items-center justify-center p-1">
              <img src="/logo.png" alt="BizGrowth" className="w-full h-full object-contain" />
            </div>
            <span className="font-bold text-slate-800 text-sm">BizGrowth</span>
          </div>
          <p className="text-xs text-slate-400 text-center">
            © 2026 BizGrowth · Partner Bisnis
          </p>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-xs font-semibold text-slate-500 hover:text-primary-700">
              Masuk
            </Link>
            <Link to="/register" className="text-xs font-semibold text-slate-500 hover:text-primary-700">
              Daftar
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}