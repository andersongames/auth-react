import { useLocation } from "react-router-dom";
import Link from "../components/Link";
import { useAuth } from "../context/AuthContext";

export default function Unauthorized() {
  const location = useLocation();
  const requiredRole = location.state?.required;
  const { user } = useAuth();
  const redirectPath = user ? "/dashboard" : "/login";

  return (
    <div className="min-h-[calc(100vh-var(--layout-offset))] flex items-center justify-center">
      <div className="space-y-6 flex flex-col items-center justify-center p-6 text-center transition-colors bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Access Denied</h1>
        <p className="text-lg mb-4">
          You do not have permission to view this page.
        </p>

        {requiredRole && (
          <p className="text-sm text-gray-600 transition-colors dark:text-gray-400 mb-4">
            This page requires <strong>{requiredRole}</strong> privileges.
          </p>
        )}

        <Link to={redirectPath}>
          {user ? "Back to dashboard" : "Back to login"}
        </Link>
      </div>
    </div>
  );
}
