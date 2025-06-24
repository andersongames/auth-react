import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { Role } from "../constants/roles";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: Role[];
}

export default function ProtectedRoute({ children, requiredRoles }: ProtectedRouteProps) {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) return null;

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requiredRoles && (!user || !requiredRoles.includes(user.role as Role))) {
    return <Navigate to="/unauthorized" />;
  }

  return <>{children}</>;
}
