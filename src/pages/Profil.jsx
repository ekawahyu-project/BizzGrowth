import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

const EARN_TASKS = [
  { icon: "person_add", title: "Bonus Pengguna Baru", reward: "+3 Koin" },
  { icon: "badge", title: "Lengkapi Profil", reward: "+1 Koin" },
  { icon: "database", title: "Hubungkan Data Penjualan", reward: "+1 Koin" },
  { icon: "group", title: "Undang Teman UMKM", reward: "+2 Koin / teman" },
];

const SETTINGS_ROWS = [
  {
    icon: "business",
    color: "bg-blue-50 text-blue-600",
    title: "Informasi Bisnis",
    desc: "Kelola legalitas dan detail pajak usaha",
    action: "profile",
  },
  {
    icon: "account_balance",
    color: "bg-purple-50 text-purple-600",
    title: "Sumber Data Terhubung",
    desc: "Kelola 1 rekening bank dan 2 API marketplace",
    action: "wallet",
  },
  {
    icon: "inventory_2",
    color: "bg-amber-50 text-amber-600",
    title: "Langganan / Paket Koin",
    desc: "Saat ini: Basic SME (Gratis Selamanya)",
    badge: "AKTIF",
    action: "wallet",
  },
  {
    icon: "support_agent",
    color: "bg-primary-50 text-primary-600",
    title: "Bantuan & Dukungan Virtual",
    desc: "Dapatkan saran ahli atau bantuan teknis",
    action: "mentor",
  },
];

export default function Profil() {
  const { profile, coins, avatarInitials, openProfileModal, openLogoutModal } = useApp();
  const navigate = useNavigate();

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-bold text-2xl md:text-3xl text-slate-900 leading-tight">Profil & Pengaturan</h1>
        <p className="text-slate-500 text-sm mt-1">Kelola informasi bisnis, koin, dan preferensi akun Anda.</p>
      </div>

      {/* Hero card */}
      <section className="premium-card rounded-2xl p-6 mb-6 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
        <div
          className="absolute -top-10 -right-10 w-48 h-48 rounded-full opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle, #8a5ce8, transparent)" }}
        />
        <div
          className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle, #f59e0b, transparent)" }}
        />

        <div className="relative shrink-0">
          <div className="w-24 h-24 rounded-full border-4 border-primary-400/60 p-1 shadow-xl bg-gradient-to-br from-primary-50 to-white">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-3xl font-bold">
              {avatarInitials}
            </div>
          </div>
          <div className="absolute bottom-0 right-0 bg-tertiary-600 text-white rounded-full p-1 border-2 border-white shadow-md">
            <span className="material-symbols-outlined text-sm icon-fill">verified</span>
          </div>
        </div>

        <div className="text-center md:text-left flex-grow z-10">
          <h2 className="font-bold text-2xl text-slate-900">{profile.owner || "Eka Wahyu"}</h2>
          <p className="text-slate-500 flex items-center justify-center md:justify-start gap-1.5 mt-0.5">
            <span className="material-symbols-outlined text-primary-600 text-base">storefront</span>
            <span className="font-medium">{profile.business || "Cysec ID"}</span>
          </p>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mt-3">
            <Badge icon="check_circle" color="tertiary">
              Terverifikasi
            </Badge>
            <Badge icon="payments" color="amber">
              {coins} Koin
            </Badge>
            <Badge icon="trending_up" color="blue" noFill>
              Growth Phase
            </Badge>
          </div>
        </div>

        <div className="z-10">
          <button
            onClick={() => openProfileModal("profile")}
            className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all shadow-md shadow-primary-600/20 active:scale-95"
          >
            <span className="material-symbols-outlined text-base">edit</span>
            Edit Profil
          </button>
        </div>
      </section>

      {/* Manajemen Produk */}
      <ProductManager />

      {/* Bento grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mb-5">
        <section className="md:col-span-8 premium-card rounded-2xl overflow-hidden">
          <div
            className="p-6 flex justify-between items-center text-white relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #d97706, #b45309)" }}
          >
            <div className="absolute -right-6 -top-6 opacity-15">
              <span className="material-symbols-outlined text-[100px] icon-fill">payments</span>
            </div>
            <div className="z-10">
              <p className="text-xs font-bold uppercase tracking-widest opacity-80">Saldo Koin Saat Ini</p>
              <h3 className="font-bold text-3xl flex items-center gap-2 mt-1">
                <span className="material-symbols-outlined text-3xl icon-fill">token</span>
                <span className="font-mono">{coins} Koin</span>
              </h3>
              <p className="text-xs opacity-70 mt-1">Gunakan koin untuk menjalankan simulasi bisnis</p>
            </div>
            <div className="flex flex-col gap-2 z-10">
              <button
                onClick={() => openProfileModal("wallet")}
                className="bg-white text-amber-700 hover:bg-amber-50 font-bold text-xs px-4 py-2 rounded-xl shadow-md transition-all active:scale-95"
              >
                TOP UP
              </button>
              <button
                onClick={() => openProfileModal("wallet")}
                className="text-white/80 hover:text-white font-semibold text-xs text-center underline transition-colors"
              >
                Riwayat
              </button>
            </div>
          </div>

          <div className="p-5">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">
              Cara Dapatkan Koin Gratis
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {EARN_TASKS.map((task) => (
                <div
                  key={task.title}
                  onClick={() => openProfileModal("wallet")}
                  className="flex items-center gap-3 p-3.5 bg-slate-50 rounded-xl border border-transparent hover:border-primary-200 hover:bg-primary-50/50 transition-all cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm text-primary-600 group-hover:scale-105 transition-transform border border-slate-100">
                    <span className="material-symbols-outlined icon-fill">{task.icon}</span>
                  </div>
                  <div>
                    <p className="font-bold text-sm text-slate-800">{task.title}</p>
                    <p className="text-amber-600 font-bold text-xs font-mono">{task.reward}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="md:col-span-4 premium-card rounded-2xl p-5 flex flex-col gap-4">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Ringkasan Bisnis</h4>
          <div className="space-y-3 flex-grow">
            <InfoRow label="Status Kesehatan" value="Growth Phase" valueColor="text-tertiary-600" />
            <InfoRow label="Verifikasi" value="Terverifikasi" icon="check_circle" />
            <InfoRow label="Skala" value={profile.scale || "Mikro"} />
            <InfoRow label="Kategori" value={profile.category || "Makanan & Minuman"} />
          </div>
          <div className="mt-auto pt-4 border-t border-dashed border-slate-200">
            <div className="flex justify-between items-center mb-2">
              <p className="text-xs text-slate-500 font-medium">Milestone Simulasi</p>
              <span className="text-xs font-bold text-tertiary-600">4/5 Selesai</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: "80%", background: "linear-gradient(90deg, #006a3b, #00864c)" }}
              />
            </div>
            <p className="text-[10px] text-slate-400 mt-1.5 font-medium">80% menuju Expansion Pack</p>
          </div>
        </section>
      </div>

      {/* Settings */}
      <section className="premium-card rounded-2xl overflow-hidden mb-5">
        <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/50">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Pengaturan Akun</h3>
        </div>
        <div className="divide-y divide-slate-100">
          {SETTINGS_ROWS.map((row) => (
            <button
              key={row.title}
              onClick={() => {
                if (row.action === "mentor") navigate("/mentor");
                else if (row.action) openProfileModal(row.action);
              }}
              className="w-full flex items-center justify-between px-5 py-4 hover:bg-slate-50/70 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl ${row.color} flex items-center justify-center group-hover:scale-105 transition-transform`}>
                  <span className="material-symbols-outlined">{row.icon}</span>
                </div>
                <div className="text-left">
                  <p className="font-bold text-slate-800 text-sm">{row.title}</p>
                  <p className="text-xs text-slate-500">{row.desc}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {row.badge && (
                  <span className="text-[10px] font-bold bg-tertiary-100 text-tertiary-700 px-2 py-0.5 rounded-full">
                    {row.badge}
                  </span>
                )}
                <span className="material-symbols-outlined text-slate-300 group-hover:text-slate-500 transition-colors">
                  chevron_right
                </span>
              </div>
            </button>
          ))}

          <button
            onClick={openLogoutModal}
            className="w-full flex items-center justify-between px-5 py-4 hover:bg-rose-50/80 transition-colors group"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600 group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined">logout</span>
              </div>
              <div className="text-left">
                <p className="font-bold text-rose-600 text-sm">Keluar dari Akun</p>
                <p className="text-xs text-slate-500">Keluar dengan aman dari sesi ini</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-rose-300 group-hover:text-rose-500 transition-colors">
              chevron_right
            </span>
          </button>
        </div>
      </section>

      <div className="text-center py-4 text-xs text-slate-400 font-medium">
        BizGrowth v2.0.0 (React) · Platform UMKM Indonesia · © 2026
      </div>
    </div>
  );
}

function Badge({ icon, color, children, noFill }) {
  const colors = {
    tertiary: "bg-tertiary-100 text-tertiary-700 border-tertiary-200/60",
    amber: "bg-amber-50 text-amber-700 border-amber-200/60",
    blue: "bg-blue-50 text-blue-700 border-blue-200/60",
  };
  return (
    <span className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full border ${colors[color]}`}>
      <span className={`material-symbols-outlined text-sm ${noFill ? "" : "icon-fill"}`}>{icon}</span>
      {children}
    </span>
  );
}

function InfoRow({ label, value, valueColor = "text-slate-800", icon }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-slate-100">
      <span className="text-sm text-slate-500">{label}</span>
      <span className={`flex items-center gap-1 text-sm font-bold ${valueColor}`}>
        {icon && <span className="material-symbols-outlined text-tertiary-600 icon-fill text-base">{icon}</span>}
        {value}
      </span>
    </div>
  );
}

function ProductManager() {
  const { products, addProduct, removeProduct } = useApp();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  function handleAdd(e) {
    e.preventDefault();
    if (!name.trim()) return;
    addProduct(name, price);
    setName("");
    setPrice("");
  }

  return (
    <section className="premium-card rounded-2xl overflow-hidden mb-5">
      <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2">
        <span className="material-symbols-outlined text-primary-600">inventory_2</span>
        <div>
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Manajemen Produk</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Semua produk UMKM Anda — nanti bisa dipilih langsung saat mengatur strategi promosi/bundling di Simulasi.
          </p>
        </div>
      </div>

      <div className="p-5 space-y-3">
        {products.length === 0 && (
          <p className="text-sm text-slate-400 text-center py-4">Belum ada produk. Tambahkan di bawah ini.</p>
        )}
        {products.map((p) => (
          <div key={p.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
            <div>
              <p className="text-sm font-bold text-slate-800">{p.name}</p>
              {p.price ? (
                <p className="text-xs text-primary-600 font-mono font-semibold">
                  Rp {Number(p.price).toLocaleString("id-ID")}
                </p>
              ) : (
                <p className="text-xs text-slate-400">Harga belum diisi</p>
              )}
            </div>
            <button
              onClick={() => removeProduct(p.id)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-rose-500 hover:bg-rose-50 transition-colors shrink-0"
            >
              <span className="material-symbols-outlined text-lg">delete</span>
            </button>
          </div>
        ))}

        <form onSubmit={handleAdd} className="flex flex-col sm:flex-row gap-2 pt-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nama produk baru"
            className="flex-grow px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-sm"
          />
          <div className="relative sm:w-40">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">Rp</span>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value.replace(/[^0-9]/g, ""))}
              placeholder="Harga (opsional)"
              className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-sm"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl text-sm transition-all shrink-0 flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-lg">add</span>
            Tambah
          </button>
        </form>
      </div>
    </section>
  );
}
