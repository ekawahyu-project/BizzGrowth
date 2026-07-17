import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Beranda from "./pages/Beranda";
import Simulasi from "./pages/Simulasi";
import Insight from "./pages/Insight";
import Ekspansi from "./pages/Ekspansi";
import AIMentor from "./pages/AIMentor";
import Profil from "./pages/Profil";

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="/beranda" element={<Beranda />} />
            <Route path="/simulasi" element={<Simulasi />} />
            <Route path="/insight" element={<Insight />} />
            <Route path="/ekspansi" element={<Ekspansi />} />
            <Route path="/mentor" element={<AIMentor />} />
            <Route path="/profil" element={<Profil />} />
          </Route>

          <Route path="/" element={<Navigate to="/beranda" replace />} />
          <Route path="*" element={<Navigate to="/beranda" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
