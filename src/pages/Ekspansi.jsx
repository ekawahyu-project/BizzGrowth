import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

const COUNTRIES = [
  { flag: "🇲🇾", name: "Malaysia", score: 85 },
  { flag: "🇸🇬", name: "Singapura", score: 82 },
  { flag: "🇸🇦", name: "Arab Saudi", score: 78 },
];

const EXPORT_SCORE = 76;

const SUB_SCORES = [
  { label: "Kualitas Produk", value: 88 },
  { label: "Kapasitas Produksi", value: 64 },
  { label: "Kepatuhan Regulasi", value: 71 },
  { label: "Daya Saing Harga", value: 80 },
];

const LOGISTICS = [
  { flag: "🇲🇾", name: "Malaysia", cost: "Rp 18.000/kg", time: "3-5 hari", tariff: "5%" },
  { flag: "🇸🇬", name: "Singapura", cost: "Rp 22.000/kg", time: "2-4 hari", tariff: "0%" },
  { flag: "🇸🇦", name: "Arab Saudi", cost: "Rp 65.000/kg", time: "10-14 hari", tariff: "12%" },
];

const PRIORITY_RANK = [
  {
    rank: 1,
    name: "Singapura",
    flag: "🇸🇬",
    reason: "Bea masuk 0%, waktu kirim tercepat, dan daya beli tinggi untuk produk UMKM premium.",
  },
  {
    rank: 2,
    name: "Malaysia",
    flag: "🇲🇾",
    reason: "Kedekatan budaya & bahasa mempermudah pemasaran, biaya logistik paling rendah.",
  },
  {
    rank: 3,
    name: "Arab Saudi",
    flag: "🇸🇦",
    reason: "Potensi besar tapi butuh sertifikasi halal formal & waktu kirim lebih lama.",
  },
];

const NEXT_STEPS = [
  "Urus sertifikasi halal & BPOM ekspor (estimasi 3-4 minggu)",
  "Siapkan kemasan tahan lama untuk pengiriman 10+ hari",
  "Hubungi 2-3 calon distributor di Singapura sebagai prioritas utama",
  "Uji coba kirim sampel produk dalam jumlah kecil sebelum kontrak besar",
];

export default function Ekspansi() {
  const navigate = useNavigate();
  const { triggerSimulation, profile, showToast } = useApp();
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [analysisState, setAnalysisState] = useState("idle"); // idle | loading | done

  const circumference = 2 * Math.PI * 15.9155;
  const dash = (EXPORT_SCORE / 100) * circumference;

  function viewFullAnalysis() {
    triggerSimulation(2, () => {
      setAnalysisState("loading");
      setTimeout(() => setAnalysisState("done"), 1400);
    });
  }

  function downloadReport() {
    let content = `LAPORAN KESIAPAN PASAR GLOBAL — ${profile.business || "Bisnis Anda"}\n`;
    content += "=".repeat(50) + "\n\n";
    content += `Skor Kesiapan Ekspor: ${EXPORT_SCORE}/100 (Siap Ekspor)\n\n`;
    content += "SUB-SKOR\n";
    SUB_SCORES.forEach((s) => (content += `- ${s.label}: ${s.value}/100\n`));
    content += "\nESTIMASI BIAYA & LOGISTIK\n";
    LOGISTICS.forEach(
      (l) => (content += `- ${l.name}: ${l.cost}, ${l.time}, bea masuk ${l.tariff}\n`)
    );
    content += "\nPRIORITAS EKSPANSI\n";
    PRIORITY_RANK.forEach((p) => (content += `${p.rank}. ${p.name} — ${p.reason}\n`));
    content += "\nLANGKAH SELANJUTNYA\n";
    NEXT_STEPS.forEach((s, i) => (content += `${i + 1}. ${s}\n`));

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Laporan_Kesiapan_Ekspor.txt";
    a.click();
    URL.revokeObjectURL(url);
    showToast("Laporan berhasil diunduh!", "success");
  }

  return (
    <div className="max-w-lg mx-auto lg:max-w-none space-y-6">
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate("/beranda")}
          className="lg:hidden w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-600"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div>
          <h1 className="text-lg lg:text-2xl font-bold text-slate-900">Kesiapan Pasar Global</h1>
          <p className="text-slate-500 text-xs lg:text-sm">Cek potensi ekspor produk Anda</p>
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-12 lg:gap-6 space-y-6 lg:space-y-0">
        {/* Left column (desktop) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="premium-card rounded-2xl p-4 flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-100 to-amber-50 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-amber-600 text-2xl">inventory_2</span>
            </div>
            <div>
              <p className="text-xs text-slate-400">Produk Anda</p>
              <p className="font-bold text-slate-800">{profile.business || "Kopi Kenangan Rakyat"}</p>
            </div>
          </div>

          <section className="premium-card rounded-2xl p-6">
            <h3 className="text-sm font-bold text-slate-800 mb-4">Skor Kesiapan Ekspor</h3>
            <div className="flex items-center gap-5">
              <div className="relative w-24 h-24 shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#f1f5f9"
                    strokeWidth="3.5"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#673dcd"
                    strokeDasharray={`${dash}, 100`}
                    strokeLinecap="round"
                    strokeWidth="3.5"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-bold text-xl text-slate-800 font-mono">{EXPORT_SCORE}</span>
                  <span className="text-[9px] text-slate-400">/100</span>
                </div>
              </div>
              <div>
                <p className="font-bold text-primary-700 text-sm mb-1">Siap Ekspor</p>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Produk Anda memiliki potensi bagus untuk pasar internasional.
                </p>
                <button
                  onClick={() => setShowRecommendation((v) => !v)}
                  className="text-primary-600 text-xs font-bold mt-2 hover:underline"
                >
                  Lihat Rekomendasi
                </button>
              </div>
            </div>
            {showRecommendation && (
              <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 animate-fade-in-up">
                {[
                  "Sertifikasi halal & BPOM untuk syarat ekspor dasar.",
                  "Kemasan tahan lama untuk pengiriman jarak jauh.",
                  "Cari mitra distributor lokal di negara tujuan.",
                ].map((tip) => (
                  <div key={tip} className="flex gap-2 text-xs text-slate-600">
                    <span className="material-symbols-outlined text-tertiary-600 text-sm icon-fill shrink-0">
                      check_circle
                    </span>
                    {tip}
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Right column (desktop) */}
        <div className="lg:col-span-7 space-y-6">
          <section>
            <h3 className="font-bold text-base text-slate-850 mb-3">Negara Potensial</h3>
            <p className="text-xs text-slate-400 -mt-2 mb-3">Berdasarkan permintaan & daya saing</p>
            <div className="premium-card rounded-2xl overflow-hidden divide-y divide-slate-100">
              {COUNTRIES.map((c) => (
                <div
                  key={c.name}
                  className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{c.flag}</span>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{c.name}</p>
                      <p className="text-xs text-slate-400">Skor {c.score}/100</p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-slate-300">chevron_right</span>
                </div>
              ))}
            </div>
          </section>

          {analysisState === "idle" && (
            <button
              onClick={viewFullAnalysis}
              className="btn-glow w-full bg-primary-600 hover:bg-primary-700 text-white py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              Lihat Analisis Lengkap
              <span className="flex items-center gap-1 bg-white/20 rounded-full px-2 py-0.5 text-xs">
                <span className="material-symbols-outlined text-xs icon-fill">payments</span>2 Koin
              </span>
            </button>
          )}

          {analysisState === "loading" && (
            <div className="premium-card rounded-2xl p-10 text-center text-slate-400">
              <span className="material-symbols-outlined text-4xl mb-2 block animate-spin text-primary-500">
                progress_activity
              </span>
              <p className="font-semibold text-slate-600 text-sm">AI sedang menyusun laporan lengkap...</p>
            </div>
          )}
        </div>
      </div>

      {/* ---------------- FULL ANALYSIS REPORT ---------------- */}
      {analysisState === "done" && (
        <section className="space-y-5 animate-fade-in-up">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary-600 icon-fill">description</span>
            <h2 className="font-bold text-lg text-slate-900">Laporan Analisis Lengkap</h2>
          </div>

          <div className="lg:grid lg:grid-cols-2 lg:gap-5 space-y-5 lg:space-y-0">
            {/* Sub-scores */}
            <div className="premium-card rounded-2xl p-5">
              <h3 className="text-sm font-bold text-slate-800 mb-4">Rincian Skor Kesiapan</h3>
              <div className="space-y-3">
                {SUB_SCORES.map((s) => (
                  <div key={s.label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-semibold text-slate-600">{s.label}</span>
                      <span className="font-bold text-primary-600">{s.value}/100</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"
                        style={{ width: `${s.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Logistics table */}
            <div className="premium-card rounded-2xl overflow-hidden">
              <div className="p-4 border-b border-slate-100">
                <h3 className="text-sm font-bold text-slate-800">Estimasi Biaya & Logistik</h3>
              </div>
              <div className="divide-y divide-slate-100">
                {LOGISTICS.map((l) => (
                  <div key={l.name} className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">{l.flag}</span>
                      <div>
                        <p className="text-sm font-bold text-slate-800">{l.name}</p>
                        <p className="text-xs text-slate-400">{l.time} • Bea masuk {l.tariff}</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-primary-700 font-mono shrink-0">{l.cost}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Priority ranking */}
          <div className="premium-card rounded-2xl p-5">
            <h3 className="text-sm font-bold text-slate-800 mb-4">Rekomendasi Prioritas Ekspansi</h3>
            <div className="space-y-3">
              {PRIORITY_RANK.map((p) => (
                <div key={p.name} className="flex gap-3 p-3 rounded-xl bg-slate-50">
                  <div className="w-7 h-7 rounded-full bg-primary-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                    {p.rank}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      {p.flag} {p.name}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{p.reason}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next steps */}
          <div className="bg-primary-50 border border-primary-100 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-primary-600 icon-fill text-lg">checklist</span>
              <h3 className="font-bold text-slate-800 text-sm">Langkah Selanjutnya</h3>
            </div>
            <ul className="space-y-2">
              {NEXT_STEPS.map((step, i) => (
                <li key={step} className="flex gap-2.5 text-sm text-slate-700">
                  <span className="font-bold text-primary-600 shrink-0">{i + 1}.</span>
                  {step}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-3 lg:max-w-md">
            <button
              onClick={() => setAnalysisState("idle")}
              className="py-3 rounded-xl font-semibold text-sm text-primary-700 border-2 border-primary-200 hover:bg-primary-50 transition-colors"
            >
              Tutup Laporan
            </button>
            <button
              onClick={downloadReport}
              className="py-3 rounded-xl font-bold text-sm bg-primary-600 text-white shadow-lg shadow-primary-600/20 hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-base">download</span>
              Unduh Laporan
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
