import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

const MODULES = [
  { icon: "model_training", title: "Simulator Bisnis", to: "/simulasi", tint: "bg-primary-100 text-primary-600" },
  { icon: "account_balance_wallet", title: "Optimasi Keuangan", to: "/insight", tint: "bg-secondary-100 text-secondary-600" },
  { icon: "public", title: "Ekspansi Pasar", to: "/ekspansi", tint: "bg-tertiary-100 text-tertiary-600" },
  { icon: "troubleshoot", title: "What-If Analysis", to: "/simulasi", tint: "bg-amber-100 text-amber-600" },
];

export default function Beranda() {
  const { profile, coins } = useApp();
  const navigate = useNavigate();
  const firstName = (profile.owner || "Eka Wahyu").split(" ")[0];

  return (
    <div className="space-y-6">
      {/* Welcome / AI Mentor banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 to-primary-800 rounded-3xl p-6 text-white">
        <div className="absolute right-[-10%] top-[-30%] w-56 h-56 bg-white/10 rounded-full blur-3xl" />
        <div className="relative z-10">
          <h1 className="text-xl font-bold mb-1">Halo, {firstName}! 👋</h1>
          <p className="text-white/85 mb-5 text-sm">
            Yuk cek kesehatan bisnis Anda hari ini.
          </p>
          <div
            onClick={() => navigate("/mentor")}
            className="glass-card rounded-2xl p-3.5 flex items-center gap-3 group cursor-pointer transition-all hover:scale-[1.02]"
          >
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-white icon-fill text-lg">smart_toy</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-white">Alpet AI</p>
              <p className="text-xs text-white/80">Tanya apa saja tentang bisnismu</p>
            </div>
            <span className="material-symbols-outlined text-white group-hover:translate-x-1 transition-transform">
              chevron_right
            </span>
          </div>
        </div>
      </section>

      {/* Ringkasan Bisnis */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-base text-slate-850">Ringkasan Bisnis</h2>
          <button onClick={() => navigate("/insight")} className="text-primary-600 text-sm font-semibold hover:underline">
            Lihat Semua
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="premium-card rounded-2xl p-4">
            <p className="text-xs text-slate-500 font-medium">Prediksi Profit (30 Hari)</p>
            <p className="text-lg font-extrabold text-slate-850 mt-1.5 font-mono">Rp 24.750.000</p>
            <p className="text-xs font-bold text-tertiary-600 mt-1 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">north_east</span>
              12.4% vs 30 hari lalu
            </p>
          </div>
          <div className="premium-card rounded-2xl p-4">
            <p className="text-xs text-slate-500 font-medium">Skor Kesehatan</p>
            <div className="flex items-baseline gap-1 mt-1.5">
              <span className="text-lg font-extrabold text-primary-600 font-mono">82</span>
              <span className="text-xs text-slate-400">/ 100</span>
            </div>
            <span className="inline-block mt-1.5 px-2 py-0.5 bg-tertiary-100 text-tertiary-700 text-[10px] font-bold rounded-full">
              Baik
            </span>
          </div>
          <div className="premium-card rounded-2xl p-4">
            <p className="text-xs text-slate-500 font-medium">Cash Flow</p>
            <p className="text-lg font-extrabold text-secondary-600 mt-1.5">Aman</p>
            <p className="text-xs text-tertiary-600 font-bold mt-1">Positif</p>
          </div>
          <div className="premium-card rounded-2xl p-4">
            <p className="text-xs text-slate-500 font-medium">Risiko Bisnis</p>
            <p className="text-lg font-extrabold text-rose-500 mt-1.5">Rendah</p>
            <p className="text-xs text-slate-400 mt-1">2 risiko terdeteksi</p>
          </div>
        </div>
      </section>

      {/* Modul Utama */}
      <section>
        <h2 className="font-bold text-base text-slate-850 mb-3">Modul Utama</h2>
        <div className="grid grid-cols-2 gap-3">
          {MODULES.map((m) => (
            <div
              key={m.title}
              onClick={() => navigate(m.to)}
              className="premium-card rounded-2xl p-5 text-center group cursor-pointer"
            >
              <div className={`w-12 h-12 rounded-2xl mx-auto flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform ${m.tint}`}>
                <span className="material-symbols-outlined text-[26px]">{m.icon}</span>
              </div>
              <p className="text-sm font-bold text-slate-800">{m.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Coin balance strip */}
      <div
        onClick={() => navigate("/profil")}
        className="premium-card rounded-2xl p-4 flex items-center justify-between cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-amber-500 icon-fill text-2xl">payments</span>
          <div>
            <p className="text-sm font-bold text-slate-800">{coins} Koin tersedia</p>
            <p className="text-xs text-slate-500">Gunakan untuk menjalankan simulasi bisnis</p>
          </div>
        </div>
        <span className="material-symbols-outlined text-slate-400">chevron_right</span>
      </div>
    </div>
  );
}
