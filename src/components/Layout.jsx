import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import MobileHeader from "./MobileHeader";
import MobileDrawer from "./MobileDrawer";
import ToastContainer from "./ToastContainer";
import ProfileModal from "./modals/ProfileModal";
import LogoutModal from "./modals/LogoutModal";
import InsufficientCoinsModal from "./modals/InsufficientCoinsModal";

// Sidebar-only navigation everywhere. Desktop: persistent left sidebar.
// Mobile: the same sidebar content slides in as a drawer from the hamburger
// button in the top bar — no bottom tab bar, no separate mobile nav pattern.
export default function Layout() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col lg:flex-row w-full relative">
      <div className="bg-aurora">
        <span className="blob" />
      </div>

      <Sidebar />
      <MobileHeader onMenuClick={() => setDrawerOpen(true)} />
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <div className="flex-grow flex flex-col min-h-screen lg:pl-64 pt-16 lg:pt-0 w-full relative z-10">
        <main
          key={location.pathname}
          className="flex-grow px-4 md:px-8 py-6 max-w-5xl mx-auto w-full page-transition"
        >
          <Outlet />
        </main>
      </div>

      <ToastContainer />
      <ProfileModal />
      <LogoutModal />
      <InsufficientCoinsModal />
    </div>
  );
}
