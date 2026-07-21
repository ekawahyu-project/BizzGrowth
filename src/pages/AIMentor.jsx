import { useEffect, useRef, useState } from "react";
import { useApp } from "../context/AppContext";

const PRESETS = {
  1: {
    label: "🚨 Atasi Cashflow Negatif Q3",
    query: "Bagaimana mendeteksi & mencegah arus kas negatif 3 bulan ke depan?",
    response: (
      <>
        Analisis model finansial Anda menunjukkan bahwa pada Q3 mendatang, tingginya biaya utilitas operasional dan
        pelunasan piutang yang lambat dapat menyebabkan arus kas negatif.
        <br />
        <br />
        <strong>Rekomendasi dari Alpet AI:</strong>
        <br />
        1. <strong>Negosiasi Pembayaran Supplier:</strong> Minta perpanjangan tenggat pembayaran termin supplier dari
        30 hari menjadi 45 hari.
        <br />
        2. <strong>Biaya Non-Esensial:</strong> Pangkas biaya langganan software non-esensial dan evaluasi tagihan
        operasional listrik.
        <br />
        3. <strong>Uang Muka Pembelian:</strong> Terapkan kebijakan pembayaran deposit (DP) minimum 50% untuk pesanan
        grosir guna menjaga modal lancar.
      </>
    ),
    tasks: [
      "Negosiasi termin pembayaran supplier menjadi 45 hari",
      "Pangkas biaya utilitas & langganan non-esensial",
      "Terapkan DP minimum 50% untuk pesanan grosir",
    ],
  },
  2: {
    label: "🏷️ Promosi Akhir Tahun",
    query: "Bagaimana cara membuat promosi akhir tahun tanpa merusak margin?",
    response: (
      <>
        Promosi diskon langsung sering kali mengikis keuntungan bersih. Pendekatan alternatif yang terstruktur
        sangat dianjurkan.
        <br />
        <br />
        <strong>Rekomendasi dari Alpet AI:</strong>
        <br />
        1. <strong>Paket Bundling Produk:</strong> Gabungkan produk berputar cepat dengan produk lambat untuk
        menaikkan nilai transaksi rata-rata.
        <br />
        2. <strong>Nilai Minimum Belanja:</strong> Hanya berikan diskon apabila pelanggan menyentuh nilai belanja
        tertentu (misalnya, diskon 10% minimal beli Rp 150.000).
        <br />
        3. <strong>Akses Awal Pelanggan Loyal:</strong> Sediakan penawaran khusus terbatas (flash sale) untuk
        pelanggan terdaftar guna mempertahankan retensi.
      </>
    ),
    tasks: [
      "Buat paket produk bundling akhir tahun",
      "Rancang syarat minimum belanja untuk diskon",
      "Kirim newsletter akses awal untuk pelanggan loyal",
    ],
  },
  3: {
    label: "🚀 Prioritas: Cabang vs Online?",
    query: "Buka cabang baru atau perluas pemasaran online terlebih dahulu?",
    response: (
      <>
        Strategi ekspansi ideal harus menyesuaikan dengan likuiditas keuangan Anda saat ini. Mengingat omset bulanan
        berada di skala Mikro, memperluas cabang fisik memiliki risiko tinggi karena modal yang terserap besar.
        <br />
        <br />
        <strong>Rekomendasi dari Alpet AI:</strong>
        <br />
        1. <strong>Go Marketplace:</strong> Buka channel online di 2 marketplace nasional (Tokopedia/Shopee) untuk
        menguji sebaran wilayah pelanggan potensial.
        <br />
        2. <strong>Unggah Produk Unggulan:</strong> Pastikan mengunggah setidaknya 5 produk dengan deskripsi dan
        visual premium.
        <br />
        3. <strong>Riset Geografis Cabang:</strong> Catat kota asal pembeli online Anda; jika pengiriman ke area
        tertentu sangat tinggi, jadikan area itu prioritas utama untuk pembukaan outlet fisik di masa depan.
      </>
    ),
    tasks: [
      "Daftar toko di Shopee dan Tokopedia",
      "Unggah 5 produk unggulan dengan deskripsi SEO",
      "Catat kota asal pembeli online untuk riset cabang baru",
    ],
  },
};

function ChatBubble({ sender, children }) {
  const isUser = sender === "user";
  return (
    <div className={`flex items-start gap-3 max-w-[85%] ${isUser ? "ml-auto flex-row-reverse" : ""}`}>
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs border ${
          isUser ? "bg-slate-200 text-slate-700 border-slate-300" : "bg-primary-100 text-primary-700 border-primary-200"
        }`}
      >
        <span className="material-symbols-outlined text-base">{isUser ? "person" : "smart_toy"}</span>
      </div>
      <div
        className={`px-4 py-3.5 rounded-2xl shadow-sm text-sm leading-relaxed ${
          isUser
            ? "bg-primary-600 text-white rounded-tr-none"
            : "bg-white text-slate-800 rounded-tl-none border border-slate-200/85"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export default function AIMentor() {
  const { showToast, tokens, useToken, buyTokens } = useApp();
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      content: (
        <>
          <p>
            Halo! Saya <strong>Alpet AI</strong>, mentor bisnis virtual Anda. Berdasarkan data keuangan Anda, saya
            siap membantu mengoptimalkan strategi penjualan dan meminimalkan risiko bisnis.
          </p>
          <p className="mt-2">Pilih salah satu topik rekomendasi di bawah atau ketikkan pertanyaan Anda sendiri.</p>
        </>
      ),
    },
  ]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  function respond(userText, presetId) {
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      const preset = presetId && PRESETS[presetId];
      const aiContent = preset ? (
        <p>{preset.response}</p>
      ) : (
        <p>
          Terima kasih atas pertanyaannya mengenai: "<em>{userText}</em>". Sebagai rekomendasi awal untuk
          berskala <strong>Mikro/Kecil</strong>, fokuslah pada pencatatan harian arus kas terlebih dahulu. Anda bisa
          menggunakan <strong>Simulator Bisnis</strong> kami untuk menguji skenario dampak kenaikan harga sebelum
          diterapkan di lapangan.
        </p>
      );
      const newTasks = preset
        ? preset.tasks
        : [
            "Tinjau laba rugi bulanan di modul Insight",
            "Simulasikan kenaikan harga 10% di Simulasi Bisnis",
            "Catat masukan (feedback) dari 5 pelanggan pertama Anda",
          ];

      setMessages((prev) => [...prev, { sender: "ai", content: aiContent }]);
      setTasks(newTasks.map((t, i) => ({ id: `task-${Date.now()}-${i}`, text: t, checked: false })));
    }, 1400);
  }

  function sendPreset(id) {
    if (!useToken()) return;
    setMessages((prev) => [...prev, { sender: "user", content: <p>{PRESETS[id].query}</p> }]);
    respond(PRESETS[id].query, id);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    if (!useToken()) return;
    setMessages((prev) => [...prev, { sender: "user", content: <p>{text}</p> }]);
    setInput("");
    respond(text, null);
  }

  function toggleTask(id) {
    setTasks((prev) => {
      const updated = prev.map((t) => (t.id === id ? { ...t, checked: !t.checked } : t));
      const toggled = updated.find((t) => t.id === id);
      if (toggled?.checked) showToast("Tugas berhasil diselesaikan!", "success");
      return updated;
    });
  }

  function resetChat() {
    if (!window.confirm("Reset seluruh percakapan dan Rencana Aksi?")) return;
    setMessages(messages.slice(0, 1));
    setTasks([]);
    showToast("Obrolan berhasil di-reset.", "success");
  }

  function exportPlan() {
    if (tasks.length === 0) return;
    let content = "BIZGROWTH - RENCANA AKSI BISNIS\n========================================\n\n";
    tasks.forEach((t, i) => {
      content += `${i + 1}. ${t.checked ? "[SELESAI]" : "[BELUM SELESAI]"} ${t.text}\n`;
    });
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "BizGrowth_Rencana_Aksi.txt";
    a.click();
    URL.revokeObjectURL(url);
    showToast("Rencana Aksi berhasil diunduh!", "success");
  }

  return (
    <div>
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-bold text-2xl md:text-3xl text-slate-900 leading-tight">AI Mentor Bisnis</h1>
          <p className="text-slate-500 text-sm mt-1">
            Konsultasikan strategi, operasional, dan keuangan Anda secara interaktif.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div
            className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl border shadow-sm text-xs font-bold ${
              tokens > 0
                ? "bg-primary-50 border-primary-200 text-primary-700"
                : "bg-rose-50 border-rose-200 text-rose-600"
            }`}
          >
            <span className="material-symbols-outlined text-sm icon-fill">bolt</span>
            {tokens} Token
          </div>
          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl border border-slate-200/80 shadow-sm self-start md:self-auto">
            <div className="w-2.5 h-2.5 bg-primary-500 rounded-full animate-pulse" />
            <div className="text-left">
              <p className="text-xs font-bold text-slate-800">Alpet AI</p>
              <p className="text-xs text-slate-400 font-medium">Konsultan Virtual • Aktif</p>
            </div>
          </div>
        </div>
      </div>

      {tokens <= 0 && (
        <div className="mb-6 bg-rose-50 border border-rose-200 rounded-2xl p-4 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-rose-600 icon-fill">bolt</span>
            </div>
            <div>
              <p className="font-bold text-rose-700 text-sm">Token Habis</p>
              <p className="text-xs text-rose-600">Tukar koin untuk lanjut chat dengan Alpet AI.</p>
            </div>
          </div>
          <button
            onClick={buyTokens}
            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm icon-fill">payments</span>
            Tukar 1 Koin = 5 Token
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Chat window */}
        <div className="lg:col-span-8 flex flex-col premium-card rounded-2xl overflow-hidden min-h-[500px] h-[calc(100vh-220px)]">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center border border-primary-200 text-primary-700 font-bold shadow-sm">
                <span className="material-symbols-outlined">smart_toy</span>
              </div>
              <div>
                <h3 className="font-bold text-slate-850 text-base">Konsultasi Virtual</h3>
                <p className="text-xs font-semibold text-primary-600 uppercase tracking-wider">
                  Tersedia Kapan Saja
                </p>
              </div>
            </div>
            <button
              onClick={resetChat}
              className="p-2 hover:bg-slate-200/60 rounded-xl text-slate-400 hover:text-slate-600 transition-colors flex items-center gap-1.5 text-sm font-semibold"
            >
              <span className="material-symbols-outlined text-base">restart_alt</span>
              <span className="hidden sm:inline">Reset Obrolan</span>
            </button>
          </div>

          <div ref={scrollRef} className="flex-grow p-6 overflow-y-auto space-y-4 bg-slate-50/30 custom-scrollbar">
            {messages.map((m, i) => (
              <ChatBubble key={i} sender={m.sender}>
                {m.content}
              </ChatBubble>
            ))}
            {typing && (
              <div className="flex items-start gap-3 max-w-[80%]">
                <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 shrink-0 border border-primary-200 text-xs">
                  <span className="material-symbols-outlined text-base">smart_toy</span>
                </div>
                <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-none border border-slate-200/80 shadow-sm flex items-center gap-1.5 h-10">
                  <span className="w-2 h-2 bg-slate-400 rounded-full typing-dot" />
                  <span className="w-2 h-2 bg-slate-400 rounded-full typing-dot" />
                  <span className="w-2 h-2 bg-slate-400 rounded-full typing-dot" />
                </div>
              </div>
            )}
          </div>

          <div className="px-6 py-3 border-t border-slate-100 bg-slate-50/50 overflow-x-auto flex gap-2 shrink-0 custom-scrollbar">
            {Object.entries(PRESETS).map(([id, p]) => (
              <button
                key={id}
                onClick={() => sendPreset(id)}
                disabled={tokens <= 0}
                className="px-4 py-2.5 bg-white hover:bg-primary-50 hover:border-primary-300 text-slate-700 hover:text-primary-700 border border-slate-200 rounded-xl text-sm font-semibold whitespace-nowrap transition-all shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {p.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t border-slate-100 bg-white flex gap-3 shrink-0 items-center">
            <div className="flex-grow relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                autoComplete="off"
                disabled={tokens <= 0}
                placeholder={tokens <= 0 ? "Token habis — tukar koin dulu untuk lanjut chat" : "Tanyakan saran bisnis di sini..."}
                className="w-full pl-4 pr-10 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-sm text-slate-850 transition-all disabled:bg-slate-50 disabled:text-slate-400"
              />
            </div>
            <button
              type="submit"
              disabled={tokens <= 0}
              className="bg-primary-600 hover:bg-primary-700 active:scale-95 text-white w-12 h-12 rounded-xl flex items-center justify-center transition-all shadow-md shadow-primary-600/15 shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <span className="material-symbols-outlined text-lg">send</span>
            </button>
          </form>
        </div>

        {/* Action plan */}
        <div className="lg:col-span-4 flex flex-col premium-card rounded-2xl overflow-hidden h-[calc(100vh-220px)] lg:h-auto">
          <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2 shrink-0">
            <span className="material-symbols-outlined text-primary-600 icon-fill text-xl">assignment_turned_in</span>
            <div>
              <h3 className="font-bold text-slate-850 text-base">Rencana Aksi</h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Rekomendasi tugas untuk kemajuan bisnis Anda</p>
            </div>
          </div>

          <div className="flex-grow p-5 overflow-y-auto space-y-3 custom-scrollbar">
            {tasks.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-14 h-14 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <span className="material-symbols-outlined text-3xl">assignment_late</span>
                </div>
                <div>
                  <p className="font-bold text-sm text-slate-700">Rencana Aksi Kosong</p>
                  <p className="text-xs text-slate-400 max-w-[220px] mx-auto mt-1 leading-relaxed">
                    Ajukan pertanyaan bisnis di kolom obrolan untuk memicu rekomendasi tugas.
                  </p>
                </div>
              </div>
            ) : (
              tasks.map((item) => (
                <label
                  key={item.id}
                  className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer select-none ${
                    item.checked ? "bg-slate-50 border-slate-200/60 opacity-60" : "bg-white border-slate-200 hover:shadow-sm"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => toggleTask(item.id)}
                    className="mt-0.5 rounded text-primary-600 focus:ring-primary-500 border-slate-300 w-4.5 h-4.5 cursor-pointer"
                  />
                  <span className={`text-sm font-medium text-slate-700 leading-relaxed ${item.checked ? "line-through text-slate-400" : ""}`}>
                    {item.text}
                  </span>
                </label>
              ))
            )}
          </div>

          <div className="p-4 border-t border-slate-100 bg-slate-50/50 shrink-0">
            <button
              onClick={exportPlan}
              disabled={tasks.length === 0}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="material-symbols-outlined text-base">download</span>
              <span>Unduh Rencana Aksi</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
