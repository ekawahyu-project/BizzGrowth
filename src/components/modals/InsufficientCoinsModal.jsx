import { useApp } from "../../context/AppContext";

export default function InsufficientCoinsModal() {
  const { insufficientModal, closeInsufficientModal, openProfileModal } = useApp();
  if (!insufficientModal.open) return null;

  return (
    <div
      className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[110] flex items-center justify-center p-4"
      onClick={closeInsufficientModal}
    >
      <div
        className="glass-modal rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl p-6 text-center animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-14 h-14 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="material-symbols-outlined text-[28px] icon-fill">payments</span>
        </div>
        <h3 className="font-bold text-slate-800 text-lg">Koin Tidak Cukup!</h3>
        <p className="text-sm text-slate-500 mt-1">
          Simulasi ini membutuhkan <span className="font-bold text-slate-800">{insufficientModal.cost}</span> Koin.
          Kerjakan misi gratis atau top-up saldo koin Anda.
        </p>
        <div className="grid grid-cols-2 gap-3 mt-6">
          <button
            onClick={closeInsufficientModal}
            className="py-2.5 border border-slate-200 hover:bg-slate-100 text-slate-600 font-semibold rounded-xl text-sm transition-all"
          >
            Tutup
          </button>
          <button
            onClick={() => {
              closeInsufficientModal();
              openProfileModal("wallet");
            }}
            className="py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-md"
          >
            Dapatkan Koin
          </button>
        </div>
      </div>
    </div>
  );
}
