import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { Loader2 } from "lucide-react";

export function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 size={256} strokeWidth={1} className="animate-spin text-blue-600" />
    </div>
  );

  if (!user) return <Navigate to="/login" replace />;
  return <Outlet />;
}