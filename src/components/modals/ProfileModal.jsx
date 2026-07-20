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
  { coins: 1, price: "Rp 5.000" },
  { coins: 3, price: "Rp 14.500" },
  { coins: 5, price: "Rp 24.000" },
  { coins: 10, price: "Rp 48.000" },
  { coins: 20, price: "Rp 95.000" },
  { coins: 50, price: "Rp 229.000" },
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
    addCoins(2, "Undang Teman UMKM");
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
                  placeholder="Kopi Kenangan Rakyat"
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
                        <p className="font-bold text-xs text-slate-800">Undang Teman UMKM</p>
                        <p className="text-[10px] text-slate-500">Berhasil mendaftar di BizGrowth</p>
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
