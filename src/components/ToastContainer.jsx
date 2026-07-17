import { useApp } from "../context/AppContext";

const STYLES = {
  success: { icon: "check_circle", bg: "bg-tertiary-600", ring: "border-tertiary-500/30" },
  warning: { icon: "info", bg: "bg-amber-500", ring: "border-amber-400/30" },
  error: { icon: "error", bg: "bg-rose-600", ring: "border-rose-500/30" },
};

export default function ToastContainer() {
  const { toasts, dismissToast } = useApp();

  return (
    <div className="fixed top-6 right-6 flex flex-col gap-2 z-[150] max-w-sm pointer-events-none">
      {toasts.map((t) => {
        const style = STYLES[t.type] || STYLES.success;
        return (
          <div
            key={t.id}
            className={`pointer-events-auto animate-scale-in flex items-center gap-2.5 ${style.bg} text-white px-4 py-3 rounded-xl shadow-lg border ${style.ring} text-sm font-semibold`}
            onClick={() => dismissToast(t.id)}
          >
            <span className="material-symbols-outlined text-lg icon-fill">{style.icon}</span>
            <span>{t.message}</span>
          </div>
        );
      })}
    </div>
  );
}
