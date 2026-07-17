import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

const items = [
  { to: "/beranda", label: "Beranda", icon: "home" },
  { to: "/simulasi", label: "Simulasi", icon: "swap_horiz" },
];
const itemsRight = [
  { to: "/insight", label: "Insight", icon: "work" },
  { to: "/profil", label: "Akun", icon: "account_circle" },
];

export default function BottomNav() {
  const navigate = useNavigate();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-2 pt-2 pb-3 bg-white/90 backdrop-blur-xl border-t border-slate-200/70 z-40 shadow-[0_-4px_24px_rgba(103,61,205,0.08)]">
      {items.map((item) => (
        <NavItem key={item.to} {...item} />
      ))}

      <button
        onClick={() => navigate("/simulasi?new=1")}
        className="w-14 h-14 -mt-8 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-lg shadow-primary-600/40 flex items-center justify-center active:scale-90 transition-all border-4 border-white"
      >
        <span className="material-symbols-outlined text-2xl">add</span>
      </button>

      {itemsRight.map((item) => (
        <NavItem key={item.to} {...item} />
      ))}
    </nav>
  );
}

function NavItem({ to, label, icon }) {
  return (
    <NavLink to={to} className="flex flex-col items-center justify-center w-14 py-1 transition-all active:scale-95">
      {({ isActive }) => (
        <>
          <span
            className={`material-symbols-outlined text-[22px] ${
              isActive ? "text-primary-600 icon-fill" : "text-slate-400"
            }`}
          >
            {icon}
          </span>
          <span className={`text-[10px] font-semibold mt-0.5 ${isActive ? "text-primary-600" : "text-slate-400"}`}>
            {label}
          </span>
        </>
      )}
    </NavLink>
  );
}
