import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) return <Loader2 className="animate-spin" />;
  if (!user) return <Navigate to="/login" replace />;

  return <Outlet />;
}