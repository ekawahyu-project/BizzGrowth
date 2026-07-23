import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

const DEEP_METRICS = [
  { icon: "inventory_2", iconColor: "text-tertiary-600", name: "Perputaran Stok", current: "4.2x", projected: "4.8x", projectedColor: "text-tertiary-600", cost: 1 },
  { icon: "group_add", iconColor: "text-slate-500", name: "Biaya Akuisisi Pelanggan", current: "Rp 12.400", projected: "Rp 14.100", projectedColor: "text-rose-500", cost: 2 },
  { icon: "electric_bolt", iconColor: "text-rose-500", name: "Biaya Operasional", current: "Rp 2.100.000", projected: "Rp 3.200.000", projectedColor: "text-rose-500", cost: 1 },
];

const REPORT_DATA = {
  "Perputaran Stok": {
    scores: [
      { label: "Rasio Stok Bergerak", value: 88 },
      { label: "Akurasi Pencatatan", value: 80 },
      { label: "Kapasitas Gudang", value: 71 },
      { label: "Kepatuhan FIFO", value: 64 },
    ],
    tableTitle: "Estimasi Efisiensi Biaya",
    tableData: [
      { icon: "warehouse", title: "Biaya Penyimpanan", subtitle: "Berpotensi turun 15%", value: "-Rp 450.000" },
      { icon: "trending_up", title: "Pencairan Modal", subtitle: "Dari stok mati (dead stock)", value: "+Rp 2.100.000" },
      { icon: "inventory_2", title: "Laba Kotor", subtitle: "Optimalisasi perputaran", value: "+Rp 1.200.000" },
    ],
    temuanText: "Analisis mendalam menunjukkan adanya penumpukan modal kerja pada inventory sebesar 22% di atas batas ideal industri. Tingkat perputaran saat ini (4.2x) mengindikasikan pergerakan barang lebih lambat dari tren pasar (5.5x), yang berisiko meningkatkan biaya penyimpanan dan depresiasi nilai barang.",
    rekomendasiList: [
      { title: "Restrukturisasi Inventory:", desc: "Terapkan teknik Product Bundling untuk SKU yang bergerak lambat (slow-moving) dengan produk terlaris (hero products) untuk mendongkrak pencairan stok hingga 15% dalam kuartal ini." },
      { title: "Optimasi Sistem:", desc: "Transisi ke sistem pencatatan inventaris otomatis dengan metode First-In First-Out (FIFO) yang ketat. Ini diproyeksikan akan memperbaiki perputaran menjadi 4.8x per tahun." },
      { title: "Negosiasi Supplier:", desc: "Tinjau ulang MOQ (Minimum Order Quantity) dengan pemasok utama untuk pembelian dalam lot yang lebih kecil (Just-in-Time) guna menjaga likuiditas kas." }
    ],
    steps: [
      "Lakukan audit fisik gudang secara menyeluruh akhir pekan ini.",
      "Identifikasi 5 produk paling lambat laku dan siapkan paket bundling promo.",
      "Hubungi supplier utama untuk menegosiasikan skema pemesanan mingguan."
    ]
  },
  "Biaya Akuisisi Pelanggan": {
    scores: [
      { label: "Retensi Pelanggan (CRR)", value: 82 },
      { label: "Conversion Rate", value: 75 },
      { label: "ROAS Iklan Berbayar", value: 60 },
      { label: "Jangkauan Organik", value: 50 },
    ],
    tableTitle: "Proyeksi Marketing",
    tableData: [
      { icon: "group_add", title: "Target CAC Baru", subtitle: "Setelah optimasi", value: "Rp 10.500/pax" },
      { icon: "loyalty", title: "Target LTV", subtitle: "Lifetime Value per pelanggan", value: "Rp 350.000" },
      { icon: "campaign", title: "Penghematan Iklan", subtitle: "Re-alokasi budget", value: "Rp 1.500.000" },
    ],
    temuanText: "Terdapat lonjakan Customer Acquisition Cost (CAC) yang diproyeksikan naik dari Rp 12.400 ke Rp 14.100. Kenaikan ini sejalan dengan inflasi tarif iklan digital (CPM) dan saturasi audiens di channel pemasaran saat ini. Return on Ad Spend (ROAS) menunjukkan tren penurunan 12% dalam 3 bulan terakhir.",
    rekomendasiList: [
      { title: "Fokus pada Retensi:", desc: "Mengakuisisi pelanggan baru 5x lebih mahal dari mempertahankan yang lama. Alihkan 20% budget iklan untuk program Loyalty/Referral untuk meningkatkan Customer Lifetime Value (CLV)." },
      { title: "Diversifikasi Channel:", desc: "Kurangi ketergantungan pada iklan berbayar. Mulai bangun aset pemasaran organik yang kuat, seperti optimalisasi SEO lokal atau pemasaran konten video pendek (TikTok/Reels) minimal 3x seminggu." },
      { title: "Segmentasi Ulang:", desc: "Lakukan analisis kohort pada data pelanggan untuk menargetkan ulang (retargeting) segmen spesifik dengan konversi tertinggi (lookalike audiences) agar konversi iklan lebih efisien." }
    ],
    steps: [
      "Rancang skema reward program referral (misal: Diskon 20% untuk pengajak & diajak).",
      "Evaluasi dan matikan kampanye iklan berbayar yang memiliki ROAS di bawah 2.0x.",
      "Buat content calendar bulanan untuk sosial media."
    ]
  },
  "Biaya Operasional": {
    scores: [
      { label: "Produktivitas Staf", value: 85 },
      { label: "Rasio Fixed Cost", value: 70 },
      { label: "Negosiasi Supplier", value: 60 },
      { label: "Efisiensi Utilitas", value: 55 },
    ],
    tableTitle: "Proyeksi Penghematan Operasional",
    tableData: [
      { icon: "electric_bolt", title: "Efisiensi Listrik & Air", subtitle: "Penghematan 15%", value: "Rp 300.000/bln" },
      { icon: "soup_kitchen", title: "Bahan Baku (Hedging)", subtitle: "Kunci harga lama", value: "Rp 500.000/bln" },
      { icon: "schedule", title: "Optimasi Jam Shift", subtitle: "Penyesuaian jam sepi", value: "Rp 800.000/bln" },
    ],
    temuanText: "Proyeksi menunjukkan potensi pembengkakan OPEX (Operational Expenditure) yang signifikan menjadi Rp 3.200.000. Faktor pendorong utama adalah eskalasi biaya utilitas (listrik/air) yang tidak proporsional dengan peningkatan volume penjualan, serta inefisiensi pada rantai pasok bahan baku dasar.",
    rekomendasiList: [
      { title: "Audit Utilitas & Overhead:", desc: "Lakukan pengetatan dan audit menyeluruh terhadap pengeluaran tetap bulanan. Implementasikan kebijakan hemat energi di luar jam operasional puncak untuk memotong beban utilitas sebesar 10-15%." },
      { title: "Hedging Bahan Baku:", desc: "Fluktuasi harga pasar menekan margin. Direkomendasikan untuk mengunci harga lama melalui kontrak jangka panjang dengan pemasok kunci, atau mencari second-source supplier untuk kompetisi harga." },
      { title: "Otomatisasi Proses:", desc: "Evaluasi alur kerja operasional. Kurangi jam lembur dengan mengotomatiskan tugas-tugas repetitif menggunakan software manajemen bisnis terintegrasi untuk meningkatkan output per kapita." }
    ],
    steps: [
      "Review tagihan utilitas 3 bulan terakhir untuk mencari anomali penggunaan.",
      "Terapkan SOP baru penghematan energi di toko/kantor mulai besok.",
      "Buat janji temu dengan supplier utama untuk membahas kontrak jangka panjang."
    ]
  }
};

function formatRp(n) {
  return "Rp " + Math.round(n).toLocaleString("id-ID");
}

export default function Insight() {
  const navigate = useNavigate();
  const { triggerSimulation, openProfileModal, healthMetrics, showToast } = useApp();
  const hm = healthMetrics;
  const [analyzedMetrics, setAnalyzedMetrics] = useState({});
  const [activeMetric, setActiveMetric] = useState(null);
  const [reportState, setReportState] = useState("idle");

  function analyzeMetric(metric) {
    if (analyzedMetrics[metric.name]) {
      setActiveMetric(metric.name);
      setReportState("done");
      // Scroll to bottom smoothly
      setTimeout(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }), 100);
      return;
    }
    
    triggerSimulation(metric.cost, () => {
      setAnalyzedMetrics(prev => ({ ...prev, [metric.name]: true }));
      setActiveMetric(metric.name);
      setReportState("loading");
      showToast(`Menganalisis ${metric.name}...`, "success");
      
      // Scroll to bottom smoothly to see the loading state
      setTimeout(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }), 100);
      
      setTimeout(() => {
        setReportState("done");
      }, 1500);
    });
  }

  // Normalize projection values to 0-100 for the SVG chart's y-scale
  const projValues = hm.hasData ? hm.projection.map((p) => p.value) : [];
  const maxVal = projValues.length ? Math.max(...projValues, 1) : 1;
  const minVal = projValues.length ? Math.min(...projValues, 0) : 0;
  const range = maxVal - minVal || 1;
  const chartPoints = hm.hasData
    ? hm.projection.map((p) => ({ ...p, norm: ((p.value - minVal) / range) * 80 + 10 }))
    : [];

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
          <p className="text-2xl font-bold mt-1">{hm.hasData ? hm.scoreLabel : "Belum Ada Data"}</p>
          <p className="text-sm text-primary-100 mt-0.5">{hm.hasData ? `Skor: ${hm.score}/100` : "Isi data di Profil dulu"}</p>
        </div>
        <div className="w-14 h-14 rounded-full bg-white/15 flex items-center justify-center relative z-10">
          <span className="material-symbols-outlined text-2xl icon-fill">favorite</span>
        </div>
      </div>

      {!hm.hasData && (
        <div className="premium-card rounded-2xl p-6 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined">monitoring</span>
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">Data keuangan belum diisi</p>
              <p className="text-xs text-slate-500">
                Isi pemasukan, pengeluaran, dan BEP di Profil supaya halaman ini bisa menghitung kondisi bisnis Anda.
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
      )}

      <div className="lg:grid lg:grid-cols-12 lg:gap-6 space-y-6 lg:space-y-0">
        {/* Left column (desktop) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Ringkasan Keuangan */}
          <section>
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-bold text-base text-slate-850">Ringkasan Keuangan</h2>
              <button onClick={() => navigate("/profil")} className="text-primary-600 text-sm font-semibold hover:underline">
                Ubah Data
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="premium-card rounded-2xl p-4">
                <p className="text-xs text-slate-500">Total Pemasukan</p>
                <p className="text-base font-extrabold text-slate-850 mt-1 font-mono">
                  {hm.hasData ? formatRp(hm.pemasukan) : "-"}
                </p>
              </div>
              <div className="premium-card rounded-2xl p-4">
                <p className="text-xs text-slate-500">Total Pengeluaran</p>
                <p className="text-base font-extrabold text-slate-850 mt-1 font-mono">
                  {hm.hasData ? formatRp(hm.pengeluaran) : "-"}
                </p>
              </div>
              <div className="premium-card rounded-2xl p-4">
                <p className="text-xs text-slate-500">Laba Bersih</p>
                <p className={`text-base font-extrabold mt-1 font-mono ${hm.hasData && hm.laba < 0 ? "text-rose-500" : "text-slate-850"}`}>
                  {hm.hasData ? formatRp(hm.laba) : "-"}
                </p>
                {hm.hasData && (
                  <p className="text-xs font-bold text-slate-400 mt-1">{(hm.marginRatio * 100).toFixed(1)}% margin</p>
                )}
              </div>
              <div className="premium-card rounded-2xl p-4">
                <p className="text-xs text-slate-500">Cash Flow</p>
                <p className="text-base font-extrabold text-secondary-600 mt-1">
                  {!hm.hasData ? "-" : hm.cashFlowStatus === "positive" ? "Positif" : hm.cashFlowStatus === "flat" ? "Netral" : "Negatif"}
                </p>
                {hm.hasData && (
                  <p className={`text-xs font-bold mt-1 ${hm.cashFlowStatus === "positive" ? "text-tertiary-600" : "text-rose-500"}`}>
                    {hm.cashFlowStatus === "positive" ? "Aman" : hm.cashFlowStatus === "flat" ? "Pas-pasan" : "Waspada"}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* 5-year projection chart */}
          <section className="premium-card rounded-2xl p-5">
            <h3 className="text-sm font-bold text-slate-800 mb-1">Prediksi Laba Tahunan</h3>
            <p className="text-xs text-slate-400 mb-4">
              5 Tahun ke Depan · asumsi pertumbuhan {hm.hasData ? hm.growth : 0}%/tahun dari laba bulan ini x 12
            </p>

            {!hm.hasData ? (
              <div className="h-36 lg:h-48 flex items-center justify-center text-center">
                <p className="text-sm text-slate-400">Isi data keuangan dulu untuk melihat proyeksi</p>
              </div>
            ) : (
              <>
                <div className="relative h-36 lg:h-48 flex items-end">
                  <svg viewBox="0 0 300 100" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                    <polyline
                      points={chartPoints.map((p, i) => `${i * 75},${100 - p.norm}`).join(" ")}
                      fill="none"
                      stroke="#673dcd"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {chartPoints.map((p, i) => (
                      <circle
                        key={p.year}
                        cx={i * 75}
                        cy={100 - p.norm}
                        r={p.highlight ? 5 : 3.5}
                        fill={p.highlight ? "#673dcd" : "white"}
                        stroke="#673dcd"
                        strokeWidth="2"
                      />
                    ))}
                  </svg>
                  {chartPoints[2] && (
                    <div className="absolute left-1/2 -translate-x-1/2 -top-2 bg-slate-900 text-white text-[10px] font-bold px-2.5 py-1.5 rounded-lg whitespace-nowrap">
                      {chartPoints[2].year} · {formatRp(chartPoints[2].value)}
                    </div>
                  )}
                </div>
                <div className="flex justify-between mt-2">
                  {chartPoints.map((p) => (
                    <span key={p.year} className="text-[10px] text-slate-400 font-medium">
                      {p.year}
                    </span>
                  ))}
                </div>
              </>
            )}
          </section>

          {/* Early warning — only shown when the numbers actually indicate risk */}
          {hm.hasData && (hm.cashFlowStatus === "negative" || hm.riskLevel === "Tinggi") && (
            <div className="bg-rose-50 border border-rose-200/80 p-4 rounded-2xl flex items-start gap-3">
              <div className="bg-rose-600 text-white p-1.5 rounded-lg flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-base">warning</span>
              </div>
              <div className="flex-grow">
                <h3 className="font-bold text-rose-900 text-sm">
                  {hm.cashFlowStatus === "negative" ? "Pengeluaran bulanan melebihi pemasukan" : "Bisnis berada di zona risiko tinggi"}
                </h3>
                <p className="text-xs text-rose-700 mt-1 leading-relaxed">
                  Berdasarkan data yang Anda masukkan, kondisi keuangan saat ini perlu perhatian. Coba jalankan
                  simulasi strategi baru untuk mencari opsi perbaikan.
                </p>
                <button
                  onClick={() => navigate("/simulasi")}
                  className="mt-2.5 bg-rose-600 hover:bg-rose-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                >
                  Buka Simulator
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right column (desktop) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Deep-dive metrics */}
          <section className="premium-card rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-slate-100">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Analisis Mendalam</h3>
            </div>
            <div className="divide-y divide-slate-100">
              {DEEP_METRICS.map((m) => {
                const isAnalyzed = analyzedMetrics[m.name];
                return (
                  <div key={m.name} className="flex flex-col border-b border-slate-100 last:border-0">
                    <div
                      onClick={() => analyzeMetric(m)}
                      className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors group"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={`material-symbols-outlined text-[18px] ${m.iconColor}`}>{m.icon}</span>
                        <div>
                          <p className="text-sm font-semibold text-slate-800 group-hover:text-primary-600 transition-colors">{m.name}</p>
                          <p className="text-xs text-slate-400 font-mono">
                            {m.current} → <span className={m.projectedColor}>{m.projected}</span>
                          </p>
                        </div>
                      </div>
                      {!isAnalyzed ? (
                        <span className="bg-amber-100 text-amber-800 font-bold px-2 py-1 rounded-lg text-[10px] font-mono shrink-0">
                          {m.cost} Koin
                        </span>
                      ) : (
                        <span className="bg-primary-100 text-primary-700 font-bold px-2 py-1 rounded-lg text-[10px] shrink-0 flex items-center gap-1">
                          <span className="material-symbols-outlined text-[12px]">check_circle</span>
                          Dianalisis
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <div className="premium-card rounded-2xl p-5 flex items-center justify-between gap-3">
            <div>
              <h4 className="font-bold text-sm text-slate-800">Butuh koin lagi?</h4>
              <p className="text-xs text-slate-500 mt-0.5">Undang teman untuk dapat koin gratis.</p>
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

      {/* ---------------- FULL ANALYSIS REPORT ---------------- */}
      {reportState === "loading" && (
        <div className="premium-card rounded-2xl p-10 text-center text-slate-400 mt-6 border border-primary-100 bg-primary-50/30">
          <span className="material-symbols-outlined text-4xl mb-2 block animate-spin text-primary-500">
            progress_activity
          </span>
          <p className="font-semibold text-slate-600 text-sm">AI Konsultan sedang menyusun laporan untuk {activeMetric}...</p>
        </div>
      )}

      {reportState === "done" && activeMetric && REPORT_DATA[activeMetric] && (
        <section className="space-y-5 animate-fade-in-up mt-8 pt-4 border-t-2 border-dashed border-slate-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary-600 icon-fill text-2xl">description</span>
              <h2 className="font-bold text-xl text-slate-900">Laporan Analisis Lengkap: {activeMetric}</h2>
            </div>
            <button
              onClick={() => setReportState("idle")}
              className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <div className="lg:grid lg:grid-cols-2 lg:gap-5 space-y-5 lg:space-y-0">
            {/* Sub-scores */}
            <div className="premium-card rounded-2xl p-5">
              <h3 className="text-sm font-bold text-slate-800 mb-4">Rincian Skor Kesiapan</h3>
              <div className="space-y-3">
                {REPORT_DATA[activeMetric].scores.map((s) => (
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

            {/* Logistics/Estimation table */}
            <div className="premium-card rounded-2xl overflow-hidden">
              <div className="p-4 border-b border-slate-100 bg-slate-50">
                <h3 className="text-sm font-bold text-slate-800">{REPORT_DATA[activeMetric].tableTitle}</h3>
              </div>
              <div className="divide-y divide-slate-100">
                {REPORT_DATA[activeMetric].tableData.map((d) => (
                  <div key={d.title} className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-primary-600 icon-fill text-lg">{d.icon}</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">{d.title}</p>
                        <p className="text-xs text-slate-400">{d.subtitle}</p>
                      </div>
                    </div>
                    <span className={`text-sm font-bold font-mono shrink-0 ${d.value.startsWith('+') ? 'text-tertiary-600' : d.value.startsWith('-') ? 'text-amber-600' : 'text-primary-700'}`}>{d.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Detail Temuan & Rekomendasi */}
          <div className="premium-card rounded-2xl p-5 space-y-5">
            <div>
              <h4 className="font-bold text-slate-800 flex items-center gap-1.5 mb-2 text-sm">
                <span className="material-symbols-outlined text-[18px] text-amber-500">search_insights</span> 
                Temuan Utama
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {REPORT_DATA[activeMetric].temuanText}
              </p>
            </div>
            <div>
              <h4 className="font-bold text-slate-800 flex items-center gap-1.5 mb-2 text-sm">
                <span className="material-symbols-outlined text-[18px] text-primary-500">lightbulb</span> 
                Rekomendasi Strategis
              </h4>
              <ul className="list-disc pl-4 space-y-2 text-xs text-slate-600 marker:text-primary-400">
                {REPORT_DATA[activeMetric].rekomendasiList.map((rek, idx) => (
                  <li key={idx}>
                    <span className="font-bold text-slate-700">{rek.title}</span> {rek.desc}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Next steps */}
          <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white border border-indigo-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-indigo-400 icon-fill text-xl">checklist</span>
              <h3 className="font-bold text-indigo-100 text-base">Langkah Selanjutnya</h3>
            </div>
            <ul className="space-y-3">
              {REPORT_DATA[activeMetric].steps.map((step, i) => (
                <li key={step} className="flex gap-3 text-sm text-indigo-50">
                  <span className="font-bold text-indigo-400 shrink-0">{i + 1}.</span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-3 lg:max-w-md pt-2">
            <button
              onClick={() => setReportState("idle")}
              className="py-3.5 rounded-xl font-semibold text-sm text-slate-700 bg-white border-2 border-slate-200 hover:bg-slate-50 transition-colors shadow-sm"
            >
              Tutup Laporan
            </button>
            <button
              onClick={() => showToast("Laporan Analisis berhasil diunduh!", "success")}
              className="py-3.5 rounded-xl font-bold text-sm bg-primary-600 text-white shadow-lg shadow-primary-600/20 hover:bg-primary-700 active:scale-95 transition-all flex items-center justify-center gap-1.5"
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