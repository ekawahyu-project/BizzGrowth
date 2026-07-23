import { useEffect, useState } from "react";
import { useApp } from "../../context/AppContext";

const CATEGORIES = [
  "Makanan & Minuman",
  "Ritel & Dagang",
  "Fashion & Pakaian",
  "Jasa / Pelayanan",
  "Pertanian / Produksi",
  "Lainnya",
];

const SCALES = [
  { value: "Mikro", label: "Mikro (Omset < Rp 300jt/tahun)" },
  { value: "Kecil", label: "Kecil (Omset Rp 300jt - 2.5M/tahun)" },
  { value: "Menengah", label: "Menengah (Omset Rp 2.5M - 50M/tahun)" },
];

const COIN_BUNDLES = [
  { coins: 1, price: "Rp 4.999" },
  { coins: 3, price: "Rp 14.499" },
  { coins: 5, price: "Rp 23.999" },
  { coins: 10, price: "Rp 47.999" },
  { coins: 20, price: "Rp 94.999" },
  { coins: 50, price: "Rp 228.999" },
];

export default function ProfileModal() {
  const {
    profileModal,
    closeProfileModal,
    switchProfileTab,
    profile,
    saveProfile,
    coins,
    invitedFriends,
    setInvitedFriends,
    addCoins,
    showToast,
  } = useApp();

  const [form, setForm] = useState(profile);

  useEffect(() => {
    if (profileModal.open) setForm(profile);
  }, [profileModal.open, profile]);

  if (!profileModal.open) return null;
  const tab = profileModal.tab;

  function handleSubmit(e) {
    e.preventDefault();
    saveProfile(form);
    closeProfileModal();
  }

  function handleInvite() {
    setInvitedFriends((n) => n + 1);
    addCoins(2, "Undang Teman");
  }

  return (
    <div
      className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[110] flex items-center justify-center p-4"
      onClick={closeProfileModal}
    >
      <div
        className="glass-modal rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-scale-in max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header + Tabs */}
        <div className="px-6 pt-5 pb-0 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div className="flex gap-1">
            <button
              onClick={() => switchProfileTab("profile")}
              className={`px-4 py-2.5 text-sm font-bold border-b-2 transition-all ${
                tab === "profile" ? "border-primary-600 text-primary-700" : "border-transparent text-slate-400"
              }`}
            >
              Profil Bisnis
            </button>
            <button
              onClick={() => switchProfileTab("wallet")}
              className={`px-4 py-2.5 text-sm font-bold border-b-2 transition-all ${
                tab === "wallet" ? "border-primary-600 text-primary-700" : "border-transparent text-slate-400"
              }`}
            >
              Dompet & Misi
            </button>
          </div>
          <button onClick={closeProfileModal} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 mb-2">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="p-6 overflow-y-auto custom-scrollbar">
          {tab === "profile" && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Nama Lengkap Pemilik
                </label>
                <input
                  required
                  value={form.owner || ""}
                  onChange={(e) => setForm({ ...form, owner: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-sm text-slate-800 transition-all"
                  placeholder="Eka Wahyu"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Nama Usaha / Brand
                </label>
                <input
                  required
                  value={form.business || ""}
                  onChange={(e) => setForm({ ...form, business: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-sm text-slate-800 transition-all"
                  placeholder="KPC"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Kategori Bidang
                  </label>
                  <select
                    value={form.category || CATEGORIES[0]}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-sm text-slate-800 bg-white transition-all"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Skala Bisnis
                  </label>
                  <select
                    value={form.scale || "Mikro"}
                    onChange={(e) => setForm({ ...form, scale: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-sm text-slate-800 bg-white transition-all"
                  >
                    {SCALES.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Nomor Handphone (WhatsApp)
                </label>
                <input
                  type="tel"
                  value={form.phone || ""}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-sm text-slate-800 transition-all"
                  placeholder="Contoh: 081234567890"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-2.5 rounded-xl text-sm transition-all shadow-md shadow-primary-600/10"
                >
                  Simpan Profil
                </button>
              </div>
            </form>
          )}

          {tab === "wallet" && (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-2xl text-white relative overflow-hidden shadow-lg border border-slate-800 flex items-center justify-between">
                <div className="space-y-1 z-10">
                  <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                    Saldo Koin Saat Ini
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-amber-400 text-3xl icon-fill">payments</span>
                    <span className="font-bold text-3xl font-mono">{coins} Koin</span>
                  </div>
                </div>
                <div className="absolute right-4 bottom-[-15px] opacity-10 text-white z-0">
                  <span className="material-symbols-outlined text-[100px]">payments</span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-850 text-sm uppercase tracking-wider mb-3">
                  Dapatkan Koin Gratis
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-100 rounded-xl">
                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined icon-fill">group_add</span>
                      </div>
                      <div>
                        <p className="font-bold text-xs text-slate-800">Undang Teman</p>
                        <p className="text-[10px] text-slate-500">Berhasil mendaftar di SimulaBiz</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right flex flex-col items-end">
                        <span className="text-xs font-bold text-amber-600 font-mono">+2 Koin</span>
                        <span className="text-[8px] text-slate-400 font-semibold uppercase">
                          {invitedFriends} diundang
                        </span>
                      </div>
                      <button
                        onClick={handleInvite}
                        className="px-4 py-1.5 bg-primary-600 hover:bg-primary-700 text-white rounded-full text-xs font-semibold shadow-sm transition-all"
                      >
                        Undang
                      </button>
                    </div>
                  </div>

                  <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl flex flex-col gap-3">
                    <div>
                      <p className="font-bold text-xs text-slate-800">Kode Referral Anda</p>
                      <p className="text-[10px] text-slate-500 mb-2">Bagikan ke teman, dapatkan +2 Koin saat mereka mendaftar.</p>
                      <div className="flex items-center gap-2">
                        <code className="px-3 py-1.5 bg-white border border-slate-200 text-slate-800 rounded-lg text-sm font-mono flex-grow text-center tracking-widest font-bold">
                          {form.phone ? form.phone.slice(-6).padEnd(6, '0') : "SB1234"}
                        </code>
                        <button 
                          onClick={() => {
                            navigator.clipboard.writeText(form.phone ? form.phone.slice(-6).padEnd(6, '0') : "SB1234");
                            showToast("Kode disalin!", "success");
                          }}
                          className="px-3 py-1.5 bg-primary-100 hover:bg-primary-200 text-primary-700 rounded-lg text-xs font-semibold transition-colors"
                        >
                          Salin
                        </button>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-200">
                      <p className="font-bold text-xs text-slate-800 mb-2">Masukkan Kode Teman</p>
                      <div className="flex items-center gap-2">
                        <input 
                          type="text" 
                          placeholder="Contoh: SB1234" 
                          className="flex-grow px-3 py-1.5 border border-slate-200 rounded-lg text-sm outline-none focus:border-primary-500 font-mono uppercase"
                          id="refCode"
                        />
                        <button 
                          className="px-4 py-1.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-all whitespace-nowrap"
                          onClick={() => {
                            const input = document.getElementById('refCode');
                            if(input.value.length >= 4) {
                              addCoins(5, "Kode Referral");
                              showToast("Kode referral berhasil digunakan! +5 Koin", "success");
                              input.value = "";
                            } else {
                              showToast("Kode referral tidak valid", "error");
                            }
                          }}
                        >
                          Klaim
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-850 text-sm uppercase tracking-wider mb-3">
                  Beli Paket Koin
                </h4>
                <div className="grid grid-cols-3 gap-3">
                  {COIN_BUNDLES.map((b) => (
                    <button
                      key={b.coins}
                      onClick={() => {
                        addCoins(b.coins, `Top-up ${b.coins} Koin`);
                        showToast(`Pembayaran ${b.price} berhasil disimulasikan`, "success");
                      }}
                      className="flex flex-col items-center gap-1 p-3.5 bg-slate-50 hover:bg-primary-50 border border-slate-150 hover:border-primary-300 rounded-xl transition-all"
                    >
                      <span className="material-symbols-outlined text-amber-500 icon-fill text-xl">payments</span>
                      <span className="font-bold text-sm text-slate-800">{b.coins} Koin</span>
                      <span className="text-[10px] text-slate-500 font-mono">{b.price}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-850 text-sm uppercase tracking-wider mb-3">
                  Paket Bundling Spesial
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-4 bg-gradient-to-br from-primary-50 to-indigo-50 border border-primary-200 rounded-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 bg-rose-500 text-white text-[9px] font-bold px-2 py-1 rounded-bl-lg rounded-tr-xl z-10">HEMAT 20%</div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="material-symbols-outlined text-primary-600 icon-fill text-xl">workspace_premium</span>
                        <span className="font-bold text-sm text-slate-800">Starter Pack</span>
                      </div>
                      <p className="text-[10px] text-slate-600 mb-3">15 Koin + Bebas Akses Simulator 1 Bulan</p>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-slate-400 line-through">Rp 85.000</span>
                          <span className="text-sm font-bold text-primary-700">Rp 68.000</span>
                        </div>
                        <button onClick={() => { addCoins(15, "Starter Pack"); showToast("Pembelian Starter Pack berhasil", "success"); }} className="px-4 py-1.5 bg-primary-600 hover:bg-primary-700 text-white text-xs font-semibold rounded-lg transition-colors">Beli</button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 bg-rose-500 text-white text-[9px] font-bold px-2 py-1 rounded-bl-lg rounded-tr-xl z-10">POPULER</div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="material-symbols-outlined text-amber-600 icon-fill text-xl">stars</span>
                        <span className="font-bold text-sm text-slate-800">Pro Business</span>
                      </div>
                      <p className="text-[10px] text-slate-600 mb-3">50 Koin + Mentor AI Prioritas</p>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-slate-400 line-through">Rp 250.000</span>
                          <span className="text-sm font-bold text-amber-700">Rp 199.000</span>
                        </div>
                        <button onClick={() => { addCoins(50, "Pro Business"); showToast("Pembelian Pro Business berhasil", "success"); }} className="px-4 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-lg transition-colors">Beli</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
