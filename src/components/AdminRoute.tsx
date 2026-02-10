import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user, profile, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div className="page-loading">جاري التحميل...</div>;
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  if (profile?.role !== "admin") return <Navigate to="/" replace />;
  return <>{children}</>;
}
