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
      { id: "p1", name: "Ipong 17 Pro Mag", price: 18000 },
      { id: "p2", name: "Samsong S50 Ultra Max", price: 15000 },
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
      let ok = false;
      setCoins((c) => {
        if (c >= amount) {
          ok = true;
          return c - amount;
        }
        return c;
      });
      return ok;
    },
    []
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

  const value = {
    loggedIn,
    login,
    register,
    logout,
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
