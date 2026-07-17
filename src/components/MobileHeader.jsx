import { useApp } from "../context/AppContext";

export default function MobileHeader({ onMenuClick }) {
  const { coins, openProfileModal } = useApp();

  return (
    <header className="flex lg:hidden items-center justify-between h-16 px-4 fixed top-0 w-full z-40 bg-white/85 backdrop-blur-xl border-b border-slate-200/60">
      <div className="flex items-center gap-2">
        <button onClick={onMenuClick} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 shrink-0">
          <span className="material-symbols-outlined">menu</span>
        </button>
        <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center p-1 shrink-0">
          <img src="/logo.png" alt="BizGrowth" className="w-full h-full object-contain" />
        </div>
        <div className="leading-tight">
          <p className="font-bold text-slate-900 text-sm">BizGrowth</p>
          <p className="text-[10px] text-slate-400 font-medium">AI Partner Bisnis UMKM</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div
          onClick={() => openProfileModal("wallet")}
          className="flex items-center gap-1 bg-amber-50 hover:bg-amber-100 px-2.5 py-1 rounded-full border border-amber-200/70 text-xs cursor-pointer transition-colors"
        >
          <span className="material-symbols-outlined text-amber-500 text-sm icon-fill">payments</span>
          <span className="font-bold text-amber-700 font-mono">{coins}</span>
        </div>
        <button className="relative w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors">
          <span className="material-symbols-outlined text-lg">notifications</span>
          <span className="absolute top-1.5 right-2 w-1.5 h-1.5 bg-rose-500 rounded-full" />
        </button>
      </div>
    </header>
  );
}
