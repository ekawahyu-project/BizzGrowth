import { useApp } from "../context/AppContext";

export default function ThemeToggle({ compact }) {
  const { darkMode, toggleDarkMode } = useApp();

  if (compact) {
    return (
      <button
        onClick={toggleDarkMode}
        aria-label="Ganti tema"
        className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors shrink-0"
      >
        <span className="material-symbols-outlined text-lg">{darkMode ? "dark_mode" : "light_mode"}</span>
      </button>
    );
  }

  return (
    <button
      onClick={toggleDarkMode}
      className="flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-500 hover:bg-primary-50 hover:text-primary-700 dark:hover:bg-primary-500/10 transition-all text-left"
    >
      <span className="flex items-center gap-3">
        <span className="material-symbols-outlined text-[20px]">{darkMode ? "dark_mode" : "light_mode"}</span>
        <span>{darkMode ? "Mode Gelap" : "Mode Terang"}</span>
      </span>
      <span className="theme-toggle" aria-hidden="true">
        <span className="knob" />
      </span>
    </button>
  );
}