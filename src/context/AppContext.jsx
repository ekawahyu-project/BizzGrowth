import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const AppContext = createContext(null);

const DEFAULT_PROFILE = {
  owner: "Eka Wahyu",
  business: "Cysec ID",
  category: "Makanan & Minuman",
  scale: "Mikro",
  phone: "081234567890",
};

const LS_KEYS = {
  coins: "ugrow_coins",
  profile: "ugrow_profile_data",
  profileCompleted: "ugrow_profile_completed",
  salesConnected: "ugrow_sales_connected",
  surveyCompleted: "ugrow_survey_completed",
  invitedFriends: "ugrow_invited_friends",
  products: "ugrow_products",
  darkMode: "ugrow_dark_mode",
  tokens: "ugrow_tokens",
  finances: "ugrow_finances",
  loggedIn: "ugrow_logged_in",
};

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function AppProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(() => localStorage.getItem(LS_KEYS.loggedIn) === "true");
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem(LS_KEYS.darkMode);
    if (stored !== null) return stored === "true";
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const [tokens, setTokens] = useState(() => parseInt(localStorage.getItem(LS_KEYS.tokens) || "5", 10));
  const [finances, setFinances] = useState(() =>
    readJSON(LS_KEYS.finances, {
      pemasukanBulanan: "",
      pengeluaranBulanan: "",
      bep: "",
      keuntunganLalu: "",
      kerugianLalu: "",
      growthAssumption: 8, // % per tahun, asumsi default untuk proyeksi
    })
  );
  const [coins, setCoins] = useState(() => parseInt(localStorage.getItem(LS_KEYS.coins) || "3", 10));
  const [profile, setProfile] = useState(() => readJSON(LS_KEYS.profile, DEFAULT_PROFILE));
  const [profileCompleted, setProfileCompleted] = useState(
    () => localStorage.getItem(LS_KEYS.profileCompleted) === "true"
  );
  const [salesConnected, setSalesConnected] = useState(
    () => localStorage.getItem(LS_KEYS.salesConnected) === "true"
  );
  const [surveyCompleted, setSurveyCompleted] = useState(
    () => localStorage.getItem(LS_KEYS.surveyCompleted) === "true"
  );
  const [invitedFriends, setInvitedFriends] = useState(
    () => parseInt(localStorage.getItem(LS_KEYS.invitedFriends) || "0", 10)
  );
  const [products, setProducts] = useState(() =>
    readJSON(LS_KEYS.products, [
      { id: "p1", name: "Kopi Susu Gula Aren", price: 18000 },
      { id: "p2", name: "Roti Bakar Cokelat", price: 15000 },
    ])
  );

  const [toasts, setToasts] = useState([]);
  const [profileModal, setProfileModal] = useState({ open: false, tab: "profile" });
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [insufficientModal, setInsufficientModal] = useState({ open: false, cost: 0 });

  // Persist to localStorage whenever state changes
  useEffect(() => localStorage.setItem(LS_KEYS.coins, String(coins)), [coins]);
  useEffect(() => localStorage.setItem(LS_KEYS.profile, JSON.stringify(profile)), [profile]);
  useEffect(
    () => localStorage.setItem(LS_KEYS.profileCompleted, String(profileCompleted)),
    [profileCompleted]
  );
  useEffect(() => localStorage.setItem(LS_KEYS.salesConnected, String(salesConnected)), [salesConnected]);
  useEffect(() => localStorage.setItem(LS_KEYS.surveyCompleted, String(surveyCompleted)), [surveyCompleted]);
  useEffect(
    () => localStorage.setItem(LS_KEYS.invitedFriends, String(invitedFriends)),
    [invitedFriends]
  );
  useEffect(() => localStorage.setItem(LS_KEYS.products, JSON.stringify(products)), [products]);
  useEffect(() => localStorage.setItem(LS_KEYS.loggedIn, String(loggedIn)), [loggedIn]);
  useEffect(() => {
    localStorage.setItem(LS_KEYS.darkMode, String(darkMode));
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);
  useEffect(() => localStorage.setItem(LS_KEYS.tokens, String(tokens)), [tokens]);
  useEffect(() => localStorage.setItem(LS_KEYS.finances, JSON.stringify(finances)), [finances]);

  const showToast = useCallback((message, type = "success") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addCoins = useCallback(
    (amount, reason) => {
      setCoins((c) => c + amount);
      if (reason) showToast(`+${amount} Koin: ${reason}`, "success");
    },
    [showToast]
  );

  const deductCoins = useCallback(
    (amount, reason) => {
      if (coins < amount) return false;
      setCoins((c) => Math.max(0, c - amount));
      return true;
    },
    [coins]
  );

  const saveProfile = useCallback(
    (data) => {
      setProfile(data);
      if (!profileCompleted && data.owner && data.business && data.category && data.scale) {
        setProfileCompleted(true);
        addCoins(1, "Melengkapi Profil Bisnis");
      }
      showToast("Profil Bisnis berhasil disimpan!", "success");
    },
    [profileCompleted, addCoins, showToast]
  );

  // Runs a simulation: confirm coin cost, deduct, then call onConfirm; opens
  // the insufficient-coins modal automatically if balance is too low.
  const triggerSimulation = useCallback(
    (cost, onConfirm) => {
      if (coins >= cost) {
        const confirmed = window.confirm(`Gunakan ${cost} Koin untuk menjalankan simulasi?`);
        if (confirmed) {
          const ok = deductCoins(cost);
          if (ok) {
            showToast(`-${cost} Koin: Menjalankan Simulasi`, "warning");
            onConfirm && onConfirm();
          }
        }
      } else {
        setInsufficientModal({ open: true, cost });
      }
    },
    [coins, deductCoins, showToast]
  );

  // Consumes 1 token for an AI Mentor chat message. Returns true if a
  // token was available and spent, false if the user is out of tokens.
  const useToken = useCallback(() => {
    if (tokens <= 0) return false;
    setTokens((t) => Math.max(0, t - 1));
    return true;
  }, [tokens]);

  // Exchanges 1 Koin for 5 chat tokens.
  const buyTokens = useCallback(() => {
    if (coins < 1) {
      setInsufficientModal({ open: true, cost: 1 });
      return false;
    }
    setCoins((c) => c - 1);
    setTokens((t) => t + 5);
    showToast("+5 Token AI Mentor (ditukar 1 Koin)", "success");
    return true;
  }, [coins, showToast]);

  const updateFinances = useCallback((partial) => {
    setFinances((prev) => ({ ...prev, ...partial }));
  }, []);

  const addProduct = useCallback((name, price) => {
    if (!name || !name.trim()) return;
    setProducts((prev) => [
      ...prev,
      { id: `p${Date.now()}`, name: name.trim(), price: price ? Number(price) : null },
    ]);
  }, []);

  const removeProduct = useCallback((id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const login = useCallback(() => {
    setLoggedIn(true);
  }, []);

  const register = useCallback(
    (owner, business) => {
      const newProfile = { owner, business, category: "Makanan & Minuman", scale: "Mikro", phone: "" };
      setProfile(newProfile);
      setProfileCompleted(true);
      setCoins(4);
      setLoggedIn(true);
    },
    []
  );

  const logout = useCallback(() => {
    setLoggedIn(false);
    setLogoutModalOpen(false);
  }, []);

  const avatarInitials = useMemo(() => {
    const name = profile.owner || "Eka Wahyu";
    return (
      name
        .trim()
        .split(/\s+/)
        .map((w) => w[0])
        .join("")
        .substring(0, 2)
        .toUpperCase() || "EW"
    );
  }, [profile.owner]);

  // Derives Skor Kesehatan, Cash Flow, Risiko, and proyeksi 5 tahun from the
  // financial data the user entered in Profil. Single source of truth so
  // Beranda and Insight never show mismatched numbers.
  const healthMetrics = useMemo(() => {
    const pemasukan = parseFloat(finances.pemasukanBulanan) || 0;
    const pengeluaran = parseFloat(finances.pengeluaranBulanan) || 0;
    const bep = parseFloat(finances.bep) || 0;
    const keuntunganLalu = finances.keuntunganLalu === "" ? null : parseFloat(finances.keuntunganLalu) || 0;
    const kerugianLalu = finances.kerugianLalu === "" ? null : parseFloat(finances.kerugianLalu) || 0;
    const growth = parseFloat(finances.growthAssumption) || 0;

    const hasData = pemasukan > 0 || pengeluaran > 0;
    const laba = pemasukan - pengeluaran;
    const marginRatio = pemasukan > 0 ? laba / pemasukan : 0;

    // 1) Margin score (0-50)
    let marginScore = 0;
    if (marginRatio >= 0.3) marginScore = 50;
    else if (marginRatio >= 0.15) marginScore = 40;
    else if (marginRatio >= 0.05) marginScore = 30;
    else if (marginRatio >= 0) marginScore = 20;
    else if (marginRatio >= -0.1) marginScore = 10;

    // 2) Jarak aman dari Break Even Point (0-30, netral 15 kalau BEP belum diisi)
    let bepScore = 15;
    if (bep > 0 && pemasukan > 0) {
      const bepRatio = (pemasukan - bep) / bep;
      if (bepRatio >= 0.5) bepScore = 30;
      else if (bepRatio >= 0.2) bepScore = 22;
      else if (bepRatio >= 0) bepScore = 15;
      else if (bepRatio >= -0.2) bepScore = 7;
      else bepScore = 0;
    }

    // 3) Tren bulan lalu (0-20, netral 10 kalau belum diisi keduanya)
    let trendScore = 10;
    if (keuntunganLalu !== null && keuntunganLalu > 0) trendScore = 20;
    else if (kerugianLalu !== null && kerugianLalu > 0) trendScore = 0;

    const score = hasData ? Math.max(0, Math.min(100, Math.round(marginScore + bepScore + trendScore))) : null;

    let scoreLabel = "Belum Ada Data";
    let scoreTint = "slate";
    if (score !== null) {
      if (score >= 75) { scoreLabel = "Sangat Sehat"; scoreTint = "tertiary"; }
      else if (score >= 55) { scoreLabel = "Baik"; scoreTint = "tertiary"; }
      else if (score >= 35) { scoreLabel = "Cukup"; scoreTint = "amber"; }
      else { scoreLabel = "Perlu Perhatian"; scoreTint = "rose"; }
    }

    const cashFlowStatus = !hasData ? "unknown" : laba > 0 ? "positive" : laba === 0 ? "flat" : "negative";

    let riskLevel = "unknown";
    if (hasData) {
      if (marginRatio < 0 || (bep > 0 && pemasukan < bep)) riskLevel = "Tinggi";
      else if (marginRatio < 0.1) riskLevel = "Sedang";
      else riskLevel = "Rendah";
    }

    // Proyeksi 5 tahun: laba bulanan saat ini x 12, dikompon dengan asumsi
    // pertumbuhan tahunan. Ini estimasi ilustratif berbasis data satu bulan
    // terakhir, bukan analisis tren historis multi-tahun sungguhan.
    const currentYear = new Date().getFullYear();
    const baseAnnualProfit = laba * 12;
    const projection = Array.from({ length: 5 }, (_, i) => ({
      year: currentYear + i,
      value: hasData ? Math.round(baseAnnualProfit * Math.pow(1 + growth / 100, i)) : 0,
      highlight: i === 2,
    }));

    return {
      hasData,
      pemasukan,
      pengeluaran,
      bep,
      laba,
      marginRatio,
      score,
      scoreLabel,
      scoreTint,
      cashFlowStatus,
      riskLevel,
      growth,
      projection,
    };
  }, [finances]);

  const value = {
    loggedIn,
    login,
    register,
    logout,
    darkMode,
    toggleDarkMode: () => setDarkMode((v) => !v),
    coins,
    addCoins,
    deductCoins,
    profile,
    saveProfile,
    profileCompleted,
    salesConnected,
    setSalesConnected,
    surveyCompleted,
    setSurveyCompleted,
    invitedFriends,
    setInvitedFriends,
    products,
    addProduct,
    removeProduct,
    tokens,
    useToken,
    buyTokens,
    finances,
    updateFinances,
    healthMetrics,
    toasts,
    showToast,
    dismissToast,
    triggerSimulation,
    profileModal,
    openProfileModal: (tab = "profile") => setProfileModal({ open: true, tab }),
    closeProfileModal: () => setProfileModal((m) => ({ ...m, open: false })),
    switchProfileTab: (tab) => setProfileModal((m) => ({ ...m, tab })),
    logoutModalOpen,
    openLogoutModal: () => setLogoutModalOpen(true),
    closeLogoutModal: () => setLogoutModalOpen(false),
    insufficientModal,
    openInsufficientModal: (cost) => setInsufficientModal({ open: true, cost }),
    closeInsufficientModal: () => setInsufficientModal({ open: false, cost: 0 }),
    avatarInitials,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}