import { useApp } from "../../context/AppContext";

export default function LogoutModal() {
  const { logoutModalOpen, closeLogoutModal, logout } = useApp();
  if (!logoutModalOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[110] flex items-center justify-center p-4"
      onClick={closeLogoutModal}
    >
      <div
        className="glass-modal rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl p-6 text-center animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-14 h-14 bg-rose-100 text-rose-700 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="material-symbols-outlined text-[28px]">logout</span>
        </div>
        <h3 className="font-bold text-slate-800 text-lg">Keluar dari Akun?</h3>
        <p className="text-sm text-slate-500 mt-1">
          Anda harus masuk kembali untuk menguji simulasi dan berkonsultasi dengan Alpet AI.
        </p>
        <div className="grid grid-cols-2 gap-3 mt-6">
          <button
            onClick={closeLogoutModal}
            className="py-2.5 border border-slate-200 hover:bg-slate-100 text-slate-600 font-semibold rounded-xl text-sm transition-all"
          >
            Batal
          </button>
          <button
            onClick={logout}
            className="py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-sm transition-all shadow-md shadow-rose-600/15"
          >
            Keluar
          </button>
        </div>
      </div>
    </div>
  );
}
