import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

const MODULES = [
  { icon: "model_training", title: "Simulator Bisnis", to: "/simulasi", tint: "bg-primary-100 text-primary-600" },
  { icon: "account_balance_wallet", title: "Optimasi Keuangan", to: "/insight", tint: "bg-secondary-100 text-secondary-600" },
  { icon: "public", title: "Ekspansi Pasar", to: "/ekspansi", tint: "bg-tertiary-100 text-tertiary-600" },
  { icon: "troubleshoot", title: "What-If Analysis", to: "/simulasi", tint: "bg-amber-100 text-amber-600" },
];

export default function Beranda() {
  const { profile, coins, healthMetrics } = useApp();
  const navigate = useNavigate();
  const firstName = (profile.owner || "Eka Wahyu").split(" ")[0];

  const scoreTintClass = {
    tertiary: "bg-tertiary-100 text-tertiary-700",
    amber: "bg-amber-100 text-amber-700",
    rose: "bg-rose-100 text-rose-600",
    slate: "bg-slate-100 text-slate-500",
  }[healthMetrics.scoreTint];

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
              <p className="text-sm font-bold text-white">AI Mentor</p>
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

        {!healthMetrics.hasData ? (
          <div className="premium-card rounded-2xl p-6 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined">monitoring</span>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">Data keuangan belum diisi</p>
                <p className="text-xs text-slate-500">
                  Isi data pemasukan & pengeluaran di Profil supaya Skor Kesehatan bisa dihitung.
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate("/profil")}
              className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0"
            >
              Isi Data Sekarang
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <div className="premium-card rounded-2xl p-4">
              <p className="text-xs text-slate-500 font-medium">Estimasi Laba Bulanan</p>
              <p className="text-lg font-extrabold text-slate-850 mt-1.5 font-mono">
                Rp {healthMetrics.laba.toLocaleString("id-ID")}
              </p>
              <p className={`text-xs font-bold mt-1 flex items-center gap-1 ${healthMetrics.laba >= 0 ? "text-tertiary-600" : "text-rose-500"}`}>
                <span className="material-symbols-outlined text-[14px]">
                  {healthMetrics.laba >= 0 ? "north_east" : "south_east"}
                </span>
                {(healthMetrics.marginRatio * 100).toFixed(1)}% margin dari pemasukan
              </p>
            </div>
            <div className="premium-card rounded-2xl p-4">
              <p className="text-xs text-slate-500 font-medium">Skor Kesehatan</p>
              <div className="flex items-baseline gap-1 mt-1.5">
                <span className="text-lg font-extrabold text-primary-600 font-mono">{healthMetrics.score}</span>
                <span className="text-xs text-slate-400">/ 100</span>
              </div>
              <span className={`inline-block mt-1.5 px-2 py-0.5 text-[10px] font-bold rounded-full ${scoreTintClass}`}>
                {healthMetrics.scoreLabel}
              </span>
            </div>
            <div className="premium-card rounded-2xl p-4">
              <p className="text-xs text-slate-500 font-medium">Cash Flow</p>
              <p className="text-lg font-extrabold text-secondary-600 mt-1.5">
                {healthMetrics.cashFlowStatus === "positive" ? "Aman" : healthMetrics.cashFlowStatus === "flat" ? "Pas-pasan" : "Waspada"}
              </p>
              <p className={`text-xs font-bold mt-1 ${healthMetrics.cashFlowStatus === "positive" ? "text-tertiary-600" : "text-rose-500"}`}>
                {healthMetrics.cashFlowStatus === "positive" ? "Positif" : healthMetrics.cashFlowStatus === "flat" ? "Netral" : "Negatif"}
              </p>
            </div>
            <div className="premium-card rounded-2xl p-4">
              <p className="text-xs text-slate-500 font-medium">Risiko Bisnis</p>
              <p
                className={`text-lg font-extrabold mt-1.5 ${
                  healthMetrics.riskLevel === "Rendah"
                    ? "text-tertiary-600"
                    : healthMetrics.riskLevel === "Sedang"
                    ? "text-amber-600"
                    : "text-rose-500"
                }`}
              >
                {healthMetrics.riskLevel}
              </p>
              <p className="text-xs text-slate-400 mt-1">Berdasarkan margin & jarak ke BEP</p>
            </div>
          </div>
        )}
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