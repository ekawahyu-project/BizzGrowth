import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useApp } from "../context/AppContext";

const HISTORY = [
  { title: "Strategi Diskon 10%", date: "20 Mei 2026 • Selesai", tag: "Menguntungkan", tagTint: "bg-tertiary-100 text-tertiary-700" },
  { title: "Buka Cabang di Surabaya", date: "18 Mei 2026 • Selesai", tag: "Berisiko", tagTint: "bg-rose-100 text-rose-600" },
  { title: "Naikkan Harga 15%", date: "15 Mei 2026 • Selesai", tag: "Menguntungkan", tagTint: "bg-tertiary-100 text-tertiary-700" },
];

const SCALE_OPTIONS = [
  { key: null, label: "Sederhana (Harga & Promosi)" },
  { key: "ekspansi", label: "Ekspansi (Cabang/Marketplace)" },
  { key: "ekspor", label: "Ekspor Global" },
];

const PROMO_OPTIONS = [
  "Diskon Persentase",
  "Bundling Produk",
  "Buy 1 Get 1",
  "Buy 1 Get 3",
  "Voucher/Kupon",
  "Tanpa Promosi Khusus",
];

function getSimCost(channelType) {
  if (!channelType) return 0;
  if (channelType === "ekspor") return 2;
  return 1;
}

function toNum(v) {
  const n = parseFloat(String(v).replace(/[^0-9.-]/g, ""));
  return isNaN(n) ? 0 : n;
}

function formatRp(n) {
  if (n === null || n === undefined || isNaN(n)) return "-";
  return "Rp " + Math.round(n).toLocaleString("id-ID");
}

export default function Simulasi() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { triggerSimulation, showToast, products } = useApp();

  const [view, setView] = useState("list"); // list | form | result

  // --- Data bisnis saat ini ---
  const [hargaAwal, setHargaAwal] = useState("");
  const [namaProduk, setNamaProduk] = useState("");
  const [hpp, setHpp] = useState("");
  const [pemasukan, setPemasukan] = useState("");
  const [pengeluaran, setPengeluaran] = useState("");
  const [keuntunganLalu, setKeuntunganLalu] = useState("");
  const [kerugianLalu, setKerugianLalu] = useState("");
  const [bep, setBep] = useState("");

  // --- Skenario baru ---
  const [pricePct, setPricePct] = useState(10);
  const [scaleType, setScaleType] = useState(null);
  const [promoStrategies, setPromoStrategies] = useState([]);
  const [bundledProductIds, setBundledProductIds] = useState([]);
  const [buyProductId, setBuyProductId] = useState("");
  const [getProductId, setGetProductId] = useState("");

  const [running, setRunning] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (params.get("new") === "1") setView("form");
  }, [params]);

  const hargaAwalNum = toNum(hargaAwal);
  const hargaBaru = hargaAwalNum > 0 ? Math.round(hargaAwalNum * (1 + pricePct / 100)) : null;

  function handleHargaBaruChange(val) {
    const num = toNum(val);
    if (hargaAwalNum > 0) {
      const pct = ((num - hargaAwalNum) / hargaAwalNum) * 100;
      setPricePct(Math.max(-50, Math.min(50, Math.round(pct * 10) / 10)));
    }
  }

  function togglePromo(p) {
    setPromoStrategies((prev) => (prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]));
  }

  function toggleBundledProduct(id) {
    setBundledProductIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  const cost = getSimCost(scaleType);

  function runSimulation() {
    triggerSimulation(cost, () => {
      setRunning(true);
      setTimeout(() => {
        setRunning(false);
        setResult(computeResult());
        setView("result");
      }, 1500);
    });
  }

  function computeResult() {
    const hppNum = toNum(hpp);
    const pemasukanNum = toNum(pemasukan);
    const pengeluaranNum = toNum(pengeluaran);
    const bepNum = toNum(bep);
    const untungRuguNum =
      keuntunganLalu === "" && kerugianLalu === "" ? null : toNum(keuntunganLalu) - toNum(kerugianLalu);

    const marginLama = hargaAwalNum > 0 ? hargaAwalNum - hppNum : null;
    const marginBaru = hargaBaru !== null ? hargaBaru - hppNum : null;

    // Asumsi elastisitas sederhana: tiap kenaikan harga 1% menurunkan permintaan ~0.6%
    // (dan sebaliknya untuk diskon) — ini estimasi ilustratif, bukan angka pasti.
    const demandChangePct = -0.6 * pricePct;
    const unitBulananEstimasi = hargaAwalNum > 0 && pemasukanNum > 0 ? pemasukanNum / hargaAwalNum : 100;
    const unitBaru = unitBulananEstimasi * (1 + demandChangePct / 100);

    const pendapatanBaru = hargaBaru !== null ? hargaBaru * unitBaru : null;
    const labaBaru = pendapatanBaru !== null && pengeluaranNum > 0 ? pendapatanBaru - pengeluaranNum : null;

    const marginDeltaPct =
      marginLama && marginLama !== 0 && marginBaru !== null ? ((marginBaru - marginLama) / marginLama) * 100 : null;

    const bepStatus =
      bepNum > 0 && pendapatanBaru !== null ? (pendapatanBaru >= bepNum ? "aman" : "risiko") : "unknown";

    const untungRuguDeltaPct =
      untungRuguNum && untungRuguNum !== 0 && labaBaru !== null ? ((labaBaru - untungRuguNum) / Math.abs(untungRuguNum)) * 100 : null;

    return {
      title: pricePct >= 0 ? `Kenaikan Harga ${pricePct}%` : `Diskon ${Math.abs(pricePct)}%`,
      namaProduk,
      hargaAwal: hargaAwalNum,
      hargaBaru,
      marginLama,
      marginBaru,
      marginDeltaPct,
      demandChangePct,
      unitBaru,
      pendapatanBaru,
      labaBaru,
      bepStatus,
      bepNum,
      untungRuguDeltaPct,
      promoStrategies,
      bundledProducts: products.filter((p) => bundledProductIds.includes(p.id)),
      buyProduct: products.find((p) => p.id === buyProductId) || null,
      getProduct: products.find((p) => p.id === getProductId) || null,
      scaleLabel: SCALE_OPTIONS.find((s) => s.key === scaleType)?.label ?? SCALE_OPTIONS[0].label,
    };
  }

  function openHistoryResult(h) {
    setResult({ title: h.title, fromHistory: true });
    setView("result");
  }

  return (
    <div className="max-w-lg mx-auto lg:max-w-none">
      {/* ---------------- LIST VIEW ---------------- */}
      {view === "list" && (
        <div className="space-y-6">
          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-slate-900">Simulator Bisnis</h1>
            <p className="text-slate-500 text-sm mt-0.5">Uji strategi sebelum diterapkan</p>
          </div>

          <div className="lg:grid lg:grid-cols-12 lg:gap-6 space-y-6 lg:space-y-0">
            <div className="lg:col-span-5">
              <div className="premium-card rounded-3xl p-6 text-center lg:sticky lg:top-6">
                <div className="w-full h-32 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center mb-5">
                  <span className="material-symbols-outlined text-primary-500 text-6xl">model_training</span>
                </div>
                <p className="font-bold text-slate-800 mb-1">
                  Simulasikan berbagai keputusan bisnis dan lihat dampaknya secara instan
                </p>
                <ul className="text-left space-y-2 mt-4">
                  {["Uji harga, promosi, ekspansi, dll", "Analisis profit & risiko", "Rekomendasi strategi terbaik"].map(
                    (t) => (
                      <li key={t} className="flex items-center gap-2 text-sm text-slate-600">
                        <span className="material-symbols-outlined text-tertiary-600 text-lg icon-fill">
                          check_circle
                        </span>
                        {t}
                      </li>
                    )
                  )}
                </ul>
                <button
                  onClick={() => setView("form")}
                  className="btn-glow w-full mt-6 bg-primary-600 hover:bg-primary-700 text-white py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  <span className="material-symbols-outlined">add</span>
                  Buat Simulasi Baru
                </button>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="flex justify-between items-center mb-3">
                <h2 className="font-bold text-base text-slate-850">Simulasi Terakhir</h2>
                <button className="text-primary-600 text-sm font-semibold hover:underline">Lihat Semua</button>
              </div>
              <div className="space-y-2.5">
                {HISTORY.map((h) => (
                  <div
                    key={h.title}
                    onClick={() => openHistoryResult(h)}
                    className="premium-card rounded-2xl p-4 cursor-pointer lg:flex lg:items-center lg:justify-between"
                  >
                    <div>
                      <div className="flex justify-between lg:justify-start lg:gap-3 items-start">
                        <p className="text-sm font-bold text-slate-800">{h.title}</p>
                        <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold shrink-0 ml-2 lg:hidden ${h.tagTint}`}>
                          {h.tag}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">{h.date}</p>
                    </div>
                    <span className={`hidden lg:inline-block text-[10px] px-2.5 py-1 rounded-full font-bold shrink-0 ${h.tagTint}`}>
                      {h.tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- FORM VIEW ---------------- */}
      {view === "form" && (
        <div className="space-y-6 max-w-2xl mx-auto">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setView("list")}
              className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-600 shrink-0"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <div>
              <h1 className="text-lg lg:text-xl font-bold text-slate-900">Atur Simulasi</h1>
              <p className="text-slate-500 text-xs">Sesuaikan variabel strategi Anda</p>
            </div>
          </div>

          {/* Data bisnis saat ini */}
          <div className="premium-card rounded-3xl p-6 space-y-5">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary-600 text-lg">store</span>
              <h3 className="font-bold text-sm text-slate-800">Data Bisnis Saat Ini</h3>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <TextField
                label="Nama Produk"
                value={namaProduk}
                onChange={setNamaProduk}
                placeholder="Contoh: Kopi Susu Gula Aren"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <RpField label="Harga Jual Saat Ini" value={hargaAwal} onChange={setHargaAwal} placeholder="Contoh: 25000" />
              <RpField label="Harga Pokok Produksi (HPP)" value={hpp} onChange={setHpp} placeholder="Contoh: 12000" />
              <RpField
                label="Pemasukan Rata-rata / Bulan"
                value={pemasukan}
                onChange={setPemasukan}
                placeholder="Contoh: 15000000"
              />
              <RpField
                label="Pengeluaran Rata-rata / Bulan"
                value={pengeluaran}
                onChange={setPengeluaran}
                placeholder="Contoh: 9000000"
              />
              <RpField
                label="Keuntungan Bulan Lalu"
                value={keuntunganLalu}
                onChange={setKeuntunganLalu}
                placeholder="Kosongkan jika tidak untung"
                optional
              />
              <RpField
                label="Kerugian Bulan Lalu"
                value={kerugianLalu}
                onChange={setKerugianLalu}
                placeholder="Kosongkan jika tidak rugi"
                optional
              />
              <RpField label="Break Even Point" value={bep} onChange={setBep} placeholder="Contoh: 10000000" />
            </div>
          </div>

          {/* Skenario baru */}
          <div className="premium-card rounded-3xl p-6 space-y-6">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary-600 text-lg">auto_awesome</span>
              <h3 className="font-bold text-sm text-slate-800">Skenario Baru</h3>
            </div>

            <div>
              <div className="flex justify-between items-end mb-2">
                <label className="text-sm font-semibold text-slate-700">Penyesuaian Harga (%)</label>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-slate-400">Harga baru:</span>
                  <div className="relative">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-semibold">
                      Rp
                    </span>
                    <input
                      value={hargaBaru !== null ? hargaBaru : ""}
                      onChange={(e) => handleHargaBaruChange(e.target.value)}
                      disabled={hargaAwalNum <= 0}
                      placeholder="isi harga awal dulu"
                      className="w-32 pl-7 pr-2 py-1 text-right text-sm font-bold text-primary-700 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none disabled:bg-slate-50 disabled:text-slate-400 disabled:placeholder:text-[10px]"
                    />
                  </div>
                </div>
              </div>
              <input
                type="range"
                min={-50}
                max={50}
                value={pricePct}
                onChange={(e) => setPricePct(parseInt(e.target.value))}
                className="w-full custom-slider"
                style={{ "--progress": `${((pricePct + 50) / 100) * 100}%` }}
              />
              <div className="flex justify-between text-xs text-slate-500 mt-2">
                <span>-50%</span>
                <span className="font-bold text-primary-600">{pricePct > 0 ? `+${pricePct}%` : `${pricePct}%`}</span>
                <span>+50%</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Strategi Promosi</label>
              <div className="flex flex-wrap gap-2">
                {PROMO_OPTIONS.map((p) => {
                  const active = promoStrategies.includes(p);
                  return (
                    <button
                      key={p}
                      type="button"
                      onClick={() => togglePromo(p)}
                      className={`px-3 py-2 rounded-full border-2 text-xs font-semibold transition-all ${
                        active ? "border-primary-600 bg-primary-50 text-primary-700" : "border-slate-200 text-slate-600"
                      }`}
                    >
                      {p}
                    </button>
                  );
                })}
              </div>
              {(promoStrategies.includes("Bundling Produk") ||
                promoStrategies.includes("Buy 1 Get 1") ||
                promoStrategies.includes("Buy 1 Get 3")) &&
                products.length === 0 && (
                  <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between gap-3 animate-fade-in-up">
                    <p className="text-xs text-amber-800">
                      Anda belum punya produk terdaftar. Tambahkan dulu di halaman Profil.
                    </p>
                    <button
                      type="button"
                      onClick={() => navigate("/profil")}
                      className="text-xs font-bold text-amber-900 underline shrink-0"
                    >
                      Ke Profil
                    </button>
                  </div>
                )}

              {promoStrategies.includes("Bundling Produk") && products.length > 0 && (
                <div className="mt-3 animate-fade-in-up">
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                    Pilih Produk yang Dibundling
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {products.map((p) => {
                      const active = bundledProductIds.includes(p.id);
                      return (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => toggleBundledProduct(p.id)}
                          className={`px-3 py-1.5 rounded-full border-2 text-xs font-semibold transition-all ${
                            active ? "border-primary-600 bg-primary-50 text-primary-700" : "border-slate-200 text-slate-600"
                          }`}
                        >
                          {p.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {(promoStrategies.includes("Buy 1 Get 1") || promoStrategies.includes("Buy 1 Get 3")) &&
                products.length > 0 && (
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 animate-fade-in-up">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5">Produk yang Dibeli</label>
                      <select
                        value={buyProductId}
                        onChange={(e) => setBuyProductId(e.target.value)}
                        className="w-full px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none text-sm bg-white"
                      >
                        <option value="">Pilih produk...</option>
                        {products.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5">Produk Gratis</label>
                      <select
                        value={getProductId}
                        onChange={(e) => setGetProductId(e.target.value)}
                        className="w-full px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none text-sm bg-white"
                      >
                        <option value="">Pilih produk...</option>
                        {products.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Skala Strategi</label>
              <div className="space-y-2">
                {SCALE_OPTIONS.map((c) => {
                  const active = scaleType === c.key;
                  return (
                    <button
                      key={c.label}
                      type="button"
                      onClick={() => setScaleType(c.key)}
                      className={`w-full py-3 px-4 rounded-xl border-2 text-left text-sm font-semibold transition-all ${
                        active ? "border-primary-600 bg-primary-50 text-primary-700" : "border-slate-200 text-slate-600"
                      }`}
                    >
                      {c.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              onClick={runSimulation}
              disabled={running}
              className="btn-glow w-full bg-primary-600 hover:bg-primary-700 text-white py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-70"
            >
              {running ? (
                <>
                  <span className="material-symbols-outlined animate-spin">refresh</span>
                  Memproses...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined">play_arrow</span>
                  Jalankan Simulasi
                  <span className="flex items-center gap-1 bg-white/20 rounded-full px-2 py-0.5 ml-1 text-xs">
                    {cost === 0 ? (
                      "Gratis"
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-xs icon-fill">payments</span>
                        {cost} Koin
                      </>
                    )}
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* ---------------- RESULT VIEW ---------------- */}
      {view === "result" && result && (
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setView("list")}
              className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-600 shrink-0"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <div>
              <h1 className="text-lg lg:text-xl font-bold text-slate-900">Hasil Simulasi</h1>
              <p className="text-slate-500 text-xs">
                {result.title}
                {result.namaProduk ? ` • ${result.namaProduk}` : ""}
              </p>
            </div>
          </div>

          {result.fromHistory ? (
            <div className="premium-card rounded-2xl p-6 text-center text-slate-400">
              <span className="material-symbols-outlined text-4xl mb-2 block">history</span>
              <p className="text-sm">Ini simulasi dari riwayat lama — data detailnya tidak disimpan ulang di sini.</p>
            </div>
          ) : (
            <>
              <div
                className={`premium-card rounded-2xl p-4 flex items-center gap-3 border-2 ${
                  result.bepStatus === "risiko"
                    ? "border-rose-200 bg-rose-50/40"
                    : "border-tertiary-200 bg-tertiary-50/40"
                }`}
              >
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${
                    result.bepStatus === "risiko" ? "bg-rose-100" : "bg-tertiary-100"
                  }`}
                >
                  <span
                    className={`material-symbols-outlined icon-fill ${
                      result.bepStatus === "risiko" ? "text-rose-600" : "text-tertiary-600"
                    }`}
                  >
                    {result.bepStatus === "risiko" ? "warning" : "check_circle"}
                  </span>
                </div>
                <div>
                  <p className={`font-bold text-sm ${result.bepStatus === "risiko" ? "text-rose-700" : "text-tertiary-700"}`}>
                    {result.bepStatus === "risiko"
                      ? "Berisiko di Bawah Break Even Point"
                      : result.bepStatus === "aman"
                      ? "Strategi Menguntungkan"
                      : "Estimasi Strategi"}
                  </p>
                  <p className="text-xs text-slate-500">
                    {result.bepStatus === "unknown"
                      ? "Isi Target BEP untuk analisis risiko yang lebih akurat"
                      : "Berdasarkan data yang Anda masukkan"}
                  </p>
                </div>
              </div>

              <div className="lg:grid lg:grid-cols-2 lg:gap-5 space-y-5 lg:space-y-0">
                <div className="premium-card rounded-2xl p-5">
                  <h3 className="text-sm font-bold text-slate-800 mb-3">Ringkasan Harga</h3>
                  <div className="divide-y divide-slate-100">
                    <ResultRow label="Harga Awal" value={formatRp(result.hargaAwal)} />
                    <ResultRow label="Harga Baru" value={formatRp(result.hargaBaru)} highlight />
                    <ResultRow
                      label="Margin per Unit (Lama → Baru)"
                      value={`${formatRp(result.marginLama)} → ${formatRp(result.marginBaru)}`}
                    />
                    {result.marginDeltaPct !== null && (
                      <ResultRow
                        label="Perubahan Margin"
                        value={`${result.marginDeltaPct >= 0 ? "+" : ""}${result.marginDeltaPct.toFixed(1)}%`}
                        tint={result.marginDeltaPct >= 0 ? "text-tertiary-600" : "text-rose-500"}
                      />
                    )}
                  </div>
                </div>

                <div className="premium-card rounded-2xl p-5">
                  <h3 className="text-sm font-bold text-slate-800 mb-3">Proyeksi Bulanan</h3>
                  <div className="divide-y divide-slate-100">
                    <ResultRow
                      label="Estimasi Perubahan Permintaan"
                      value={`${result.demandChangePct >= 0 ? "+" : ""}${result.demandChangePct.toFixed(1)}%`}
                      tint={result.demandChangePct >= 0 ? "text-tertiary-600" : "text-rose-500"}
                    />
                    <ResultRow label="Estimasi Pendapatan Baru" value={formatRp(result.pendapatanBaru)} highlight />
                    <ResultRow
                      label="Estimasi Laba Baru"
                      value={result.labaBaru !== null ? formatRp(result.labaBaru) : "Isi Pengeluaran untuk lihat"}
                    />
                    {result.bepNum > 0 && <ResultRow label="Target BEP" value={formatRp(result.bepNum)} />}
                  </div>
                </div>
              </div>

              {result.promoStrategies?.length > 0 && (
                <div className="premium-card rounded-2xl p-5">
                  <h3 className="text-sm font-bold text-slate-800 mb-3">Strategi Promosi Dipilih</h3>
                  <div className="flex flex-wrap gap-2">
                    {result.promoStrategies.map((p) => (
                      <span key={p} className="px-3 py-1.5 bg-primary-50 text-primary-700 rounded-full text-xs font-semibold">
                        {p}
                      </span>
                    ))}
                  </div>
                  {result.bundledProducts?.length > 0 && (
                    <p className="text-xs text-slate-500 mt-3">
                      <span className="font-semibold text-slate-700">Produk dibundling:</span>{" "}
                      {result.bundledProducts.map((p) => p.name).join(" + ")}
                    </p>
                  )}
                  {(result.buyProduct || result.getProduct) && (
                    <p className="text-xs text-slate-500 mt-3">
                      <span className="font-semibold text-slate-700">Beli:</span> {result.buyProduct?.name || "-"}{" "}
                      <span className="font-semibold text-slate-700">→ Gratis:</span> {result.getProduct?.name || "-"}
                    </p>
                  )}
                </div>
              )}

              <div className="bg-primary-50 border border-primary-100 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-primary-600 icon-fill text-lg">lightbulb</span>
                  <h3 className="font-bold text-slate-800 text-sm">Rekomendasi AI</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {result.bepStatus === "risiko"
                    ? "Estimasi pendapatan berada di bawah target BEP Anda. Pertimbangkan strategi promosi tambahan atau tinjau ulang besaran penyesuaian harga."
                    : "Strategi ini cocok dijalankan dalam 1–2 bulan. Kombinasikan dengan promosi bundling untuk hasil lebih optimal."}
                  {" "}Estimasi ini memakai asumsi elastisitas harga sederhana — gunakan sebagai gambaran awal, bukan angka pasti.
                </p>
              </div>
            </>
          )}

          <div className="grid grid-cols-2 gap-3 pb-2 lg:max-w-md">
            <button
              onClick={() => setView("form")}
              className="py-3 rounded-xl font-semibold text-sm text-primary-700 border-2 border-primary-200 hover:bg-primary-50 transition-colors"
            >
              Uji Strategi Lain
            </button>
            <button
              onClick={() => {
                showToast("Simulasi berhasil disimpan ke riwayat!", "success");
                setView("list");
              }}
              className="py-3 rounded-xl font-bold text-sm bg-primary-600 text-white shadow-lg shadow-primary-600/20 hover:opacity-90 active:scale-95 transition-all"
            >
              Simpan Simulasi
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function TextField({ label, value, onChange, placeholder }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-600 mb-1.5">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-sm"
      />
    </div>
  );
}

function RpField({ label, value, onChange, placeholder, optional }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-600 mb-1.5">
        {label} {optional && <span className="text-slate-400 font-normal">(opsional)</span>}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">Rp</span>
        <input
          type="text"
          inputMode="numeric"
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/[^0-9]/g, ""))}
          placeholder={placeholder}
          className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-sm"
        />
      </div>
    </div>
  );
}

function ResultRow({ label, value, tint = "text-slate-800", highlight }) {
  return (
    <div className="flex justify-between items-center py-2.5 gap-3">
      <span className="text-sm text-slate-500 shrink-0">{label}</span>
      <span className={`text-sm font-bold font-mono text-right ${highlight ? "text-primary-700" : tint}`}>{value}</span>
    </div>
  );
}
