import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/shared/stores/auth.store";

export function ProtectedRoute() {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <Outlet />;
}

export function GuestRoute() {
  const { isAuthenticated, user } = useAuthStore();
  if (isAuthenticated) {
    return <Navigate to={user?.role === "ADMIN" ? "/admin" : "/"} replace />;
  }
  return <Outlet />;
}

export function AdminRoute() {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (user?.role !== "ADMIN") return <Navigate to="/" replace />;
  return <Outlet />;
}

export function LandlordRoute() {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (user?.role !== "LANDLORD") return <Navigate to="/" replace />;
  return <Outlet />;
}
