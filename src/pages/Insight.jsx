import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

const CHART_POINTS = [
  { year: 2024, value: 30 },
  { year: 2025, value: 45 },
  { year: 2026, value: 65, highlight: true },
  { year: 2027, value: 80 },
  { year: 2028, value: 100 },
];

const DEEP_METRICS = [
  { icon: "inventory_2", iconColor: "text-tertiary-600", name: "Perputaran Stok", current: "4.2x", projected: "4.8x", projectedColor: "text-tertiary-600", cost: 1 },
  { icon: "group_add", iconColor: "text-slate-500", name: "Biaya Akuisisi Pelanggan", current: "Rp 12.400", projected: "Rp 14.100", projectedColor: "text-rose-500", cost: 2 },
  { icon: "electric_bolt", iconColor: "text-rose-500", name: "Biaya Operasional", current: "Rp 2.100.000", projected: "Rp 3.200.000", projectedColor: "text-rose-500", cost: 1 },
];

export default function Insight() {
  const navigate = useNavigate();
  const { triggerSimulation, openProfileModal } = useApp();

  function analyzeMetric(metric) {
    triggerSimulation(metric.cost, () => {
      window.alert(
        `Analisis Mendalam Sukses!\n\nHasil proyeksi detail untuk ${metric.name} telah diperbarui dengan akurasi 98.7%.`
      );
    });
  }

  return (
    <div className="max-w-lg mx-auto lg:max-w-none space-y-6">
      <div>
        <h1 className="text-xl lg:text-2xl font-bold text-slate-900">Optimasi Keuangan</h1>
        <p className="text-slate-500 text-sm mt-0.5">Analisis & prediksi keuangan bisnis Anda</p>
      </div>

      {/* Health score card */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-5 lg:p-6 text-white flex items-center justify-between relative overflow-hidden">
        <div className="absolute right-[-10%] top-[-40%] w-40 h-40 bg-white/10 rounded-full blur-2xl" />
        <div className="relative z-10">
          <p className="text-xs text-primary-100 font-semibold uppercase tracking-wide">Kondisi Keuangan</p>
          <p className="text-2xl font-bold mt-1">Sehat</p>
          <p className="text-sm text-primary-100 mt-0.5">Skor: 82/100</p>
        </div>
        <div className="w-14 h-14 rounded-full bg-white/15 flex items-center justify-center relative z-10">
          <span className="material-symbols-outlined text-2xl icon-fill">favorite</span>
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-12 lg:gap-6 space-y-6 lg:space-y-0">
        {/* Left column (desktop) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Ringkasan Keuangan */}
          <section>
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-bold text-base text-slate-850">Ringkasan Keuangan</h2>
              <button className="text-primary-600 text-sm font-semibold hover:underline">Lihat Detail</button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="premium-card rounded-2xl p-4">
                <p className="text-xs text-slate-500">Total Pemasukan</p>
                <p className="text-base font-extrabold text-slate-850 mt-1 font-mono">Rp 85.000.000</p>
                <p className="text-xs font-bold text-tertiary-600 mt-1">↑ 10.2%</p>
              </div>
              <div className="premium-card rounded-2xl p-4">
                <p className="text-xs text-slate-500">Total Pengeluaran</p>
                <p className="text-base font-extrabold text-slate-850 mt-1 font-mono">Rp 56.250.000</p>
                <p className="text-xs font-bold text-rose-500 mt-1">↓ 3.1%</p>
              </div>
              <div className="premium-card rounded-2xl p-4">
                <p className="text-xs text-slate-500">Laba Bersih</p>
                <p className="text-base font-extrabold text-slate-850 mt-1 font-mono">Rp 28.750.000</p>
                <p className="text-xs font-bold text-tertiary-600 mt-1">↑ 12.1%</p>
              </div>
              <div className="premium-card rounded-2xl p-4">
                <p className="text-xs text-slate-500">Cash Flow</p>
                <p className="text-base font-extrabold text-secondary-600 mt-1">Positif</p>
                <p className="text-xs text-tertiary-600 font-bold mt-1">Aman</p>
              </div>
            </div>
          </section>

          {/* 5-year projection chart */}
          <section className="premium-card rounded-2xl p-5">
            <h3 className="text-sm font-bold text-slate-800 mb-1">Prediksi Keuangan</h3>
            <p className="text-xs text-slate-400 mb-4">5 Tahun ke Depan</p>

            <div className="relative h-36 lg:h-48 flex items-end">
              <svg viewBox="0 0 300 100" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                <polyline
                  points={CHART_POINTS.map((p, i) => `${i * 75},${100 - p.value}`).join(" ")}
                  fill="none"
                  stroke="#673dcd"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {CHART_POINTS.map((p, i) => (
                  <circle
                    key={p.year}
                    cx={i * 75}
                    cy={100 - p.value}
                    r={p.highlight ? 5 : 3.5}
                    fill={p.highlight ? "#673dcd" : "white"}
                    stroke="#673dcd"
                    strokeWidth="2"
                  />
                ))}
              </svg>
              <div className="absolute left-1/2 -translate-x-1/2 -top-2 bg-slate-900 text-white text-[10px] font-bold px-2.5 py-1.5 rounded-lg whitespace-nowrap">
                2026 · Rp 650.000.000
              </div>
            </div>
            <div className="flex justify-between mt-2">
              {CHART_POINTS.map((p) => (
                <span key={p.year} className="text-[10px] text-slate-400 font-medium">
                  {p.year}
                </span>
              ))}
            </div>
          </section>

          {/* Early warning */}
          <div className="bg-rose-50 border border-rose-200/80 p-4 rounded-2xl flex items-start gap-3">
            <div className="bg-rose-600 text-white p-1.5 rounded-lg flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-base">warning</span>
            </div>
            <div className="flex-grow">
              <h3 className="font-bold text-rose-900 text-sm">Proyeksi arus kas negatif dalam 3 bulan</h3>
              <p className="text-xs text-rose-700 mt-1 leading-relaxed">
                Pengeluaran melebihi proyeksi pendapatan Q3. Coba jalankan simulasi strategi baru.
              </p>
              <button
                onClick={() => navigate("/simulasi")}
                className="mt-2.5 bg-rose-600 hover:bg-rose-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
              >
                Buka Simulator
              </button>
            </div>
          </div>
        </div>

        {/* Right column (desktop) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Deep-dive metrics */}
          <section className="premium-card rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-slate-100">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Analisis Mendalam</h3>
            </div>
            <div className="divide-y divide-slate-100">
              {DEEP_METRICS.map((m) => (
                <div
                  key={m.name}
                  onClick={() => analyzeMetric(m)}
                  className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`material-symbols-outlined text-[18px] ${m.iconColor}`}>{m.icon}</span>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{m.name}</p>
                      <p className="text-xs text-slate-400 font-mono">
                        {m.current} → <span className={m.projectedColor}>{m.projected}</span>
                      </p>
                    </div>
                  </div>
                  <span className="bg-amber-100 text-amber-800 font-bold px-2 py-1 rounded-lg text-[10px] font-mono shrink-0">
                    {m.cost} Koin
                  </span>
                </div>
              ))}
            </div>
          </section>

          <div className="premium-card rounded-2xl p-5 flex items-center justify-between gap-3">
            <div>
              <h4 className="font-bold text-sm text-slate-800">Butuh koin lagi?</h4>
              <p className="text-xs text-slate-500 mt-0.5">Top up atau dapatkan koin gratis dengan mengundang teman Anda.</p>
            </div>
            <button
              onClick={() => openProfileModal("wallet")}
              className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-xl font-bold text-xs whitespace-nowrap transition-all shrink-0"
            >
              Dapatkan Koin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
