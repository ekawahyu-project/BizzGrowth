import { Navigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function ProtectedRoute({ children }) {
  const { loggedIn } = useApp();
  if (!loggedIn) return <Navigate to="/login" replace />;
  return children;
}
