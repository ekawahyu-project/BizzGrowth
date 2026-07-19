import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Register() {
  const { loggedIn, register, showToast } = useApp();
  const navigate = useNavigate();
  const [owner, setOwner] = useState("");
  const [business, setBusiness] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (loggedIn) return <Navigate to="/beranda" replace />;

  function handleSubmit(e) {
    e.preventDefault();
    register(owner, business);
    showToast("Pendaftaran sukses! Anda mendapat bonus koin awal.", "success");
    navigate("/beranda");
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="bg-aurora"><span className="blob" /></div>
      <div className="w-full max-w-md glass-modal rounded-2xl shadow-2xl p-8 relative overflow-hidden animate-fade-in-up z-10">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary-500 via-primary-600 to-amber-500" />

        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-700/20 mx-auto mb-3 p-2.5">
            <img src="/logo.png" alt="BizGrowth Logo" className="w-full h-full object-contain" />
          </div>
          <h2 className="font-bold text-2xl text-slate-850">Buat Akun Baru</h2>
          <p className="text-xs text-slate-500 mt-1">Pusat Simulasi Keputusan &amp; Konsultasi AI Bisnis UMKM</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
              Nama Lengkap Pemilik
            </label>
            <input
              type="text"
              required
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-sm text-slate-800 transition-all"
              placeholder="Eka Wahyu"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
              Nama Usaha / Brand
            </label>
            <input
              type="text"
              required
              value={business}
              onChange={(e) => setBusiness(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-sm text-slate-800 transition-all"
              placeholder="Kopi Kenangan Rakyat"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
              Email Aktif
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-sm text-slate-800 transition-all"
              placeholder="nama@gmail.com"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
              Kata Sandi Baru
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-sm text-slate-800 transition-all"
              placeholder="Min. 6 karakter"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 rounded-xl text-xs transition-all shadow-md shadow-primary-600/10 uppercase tracking-wider"
          >
            Daftar &amp; Terima 4 Koin Bonus
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-6">
          Sudah punya akun?{" "}
          <Link to="/login" className="text-primary-700 font-bold hover:underline">
            Masuk di sini
          </Link>
        </p>
      </div>
    </div>
  );
}
