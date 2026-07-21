import { NavLink } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { MAIN_NAV, CONSULT_NAV, ACCOUNT_NAV } from "../nav";
import ThemeToggle from "./ThemeToggle";

function NavItem({ to, label, icon, onNavigate }) {
  return (
    <NavLink
      to={to}
      onClick={onNavigate}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
          isActive
            ? "bg-primary-600 text-white shadow-md shadow-primary-600/25"
            : "text-slate-500 hover:bg-primary-50 hover:text-primary-700"
        }`
      }
    >
      {({ isActive }) => (
        <>
          <span className={`material-symbols-outlined text-[20px] ${isActive ? "icon-fill" : ""}`}>{icon}</span>
          <span>{label}</span>
        </>
      )}
    </NavLink>
  );
}

export default function MobileDrawer({ open, onClose }) {
  const { coins, openProfileModal, openLogoutModal } = useApp();

  return (
    <div
      className={`lg:hidden fixed inset-0 bg-slate-950/50 backdrop-blur-sm z-50 transition-opacity duration-300 ${
        open ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      <div
        className={`w-72 h-full bg-white flex flex-col shadow-2xl transform transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Brand */}
        <div className="h-16 flex items-center justify-between gap-3 px-5 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary-600 flex items-center justify-center p-1.5 shrink-0">
              <img src="/logo.png" alt="BizGrowth" className="w-full h-full object-contain" />
            </div>
            <div>
              <p className="font-bold text-slate-900 text-base leading-tight">BizGrowth</p>
              <p className="text-[10px] text-slate-400 font-medium leading-tight">Partner Bisnis</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 shrink-0">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Wallet card */}
        <div className="mx-4 mt-4 p-4 rounded-2xl bg-gradient-to-br from-primary-600 to-primary-700 text-white relative overflow-hidden shadow-lg shadow-primary-600/20 shrink-0">
          <div className="absolute -right-3 -bottom-3 opacity-15 float-soft">
            <span className="material-symbols-outlined text-[70px]">payments</span>
          </div>
          <span className="text-[10px] text-primary-100 font-semibold tracking-wider uppercase block relative z-10">
            Dompet Koin
          </span>
          <div className="flex items-center justify-between mt-1.5 relative z-10">
            <span className="font-bold text-lg font-mono">{coins.toLocaleString("id-ID")} Koin</span>
            <button
              onClick={() => {
                onClose();
                openProfileModal("wallet");
              }}
              className="btn-glow px-2.5 py-1 bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold rounded-lg text-[10px] uppercase tracking-wider transition-all"
            >
              Topup
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-grow px-3 mt-5 space-y-1 overflow-y-auto custom-scrollbar">
          {MAIN_NAV.map((item) => (
            <NavItem key={item.to} {...item} onNavigate={onClose} />
          ))}
          {CONSULT_NAV.map((item) => (
            <NavItem key={item.to} {...item} onNavigate={onClose} />
          ))}
          {ACCOUNT_NAV.map((item) => (
            <NavItem key={item.to} {...item} onNavigate={onClose} />
          ))}
        </nav>

        <div className="p-3 border-t border-slate-100 shrink-0 space-y-1">
          <ThemeToggle />
          <button
            onClick={() => {
              onClose();
              openLogoutModal();
            }}
            className="flex items-center gap-3 w-full px-3.5 py-2.5 rounded-xl text-sm font-semibold text-rose-500 hover:bg-rose-50 transition-all text-left"
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
            <span>Keluar</span>
          </button>
        </div>
      </div>
    </div>
  );
}
