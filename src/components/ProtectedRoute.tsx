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

  if (requiredRoles && (!user || !requiredRoles.includes(user.role))) {
    const required = requiredRoles.length === 1
      ? requiredRoles[0]
      : requiredRoles.join(" or ");

    return <Navigate to="/unauthorized" state={{ required }} />;
  }

  return <>{children}</>;
}
