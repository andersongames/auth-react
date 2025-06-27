import { useLocation } from "react-router-dom";

export default function Unauthorized() {
  const location = useLocation();
  const requiredRole = location.state?.required;

  return (
    <div className="min-h-screen space-y-6 flex flex-col items-center justify-center p-6 text-center bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold tracking-tight mb-2">Access Denied</h1>
      <p className="text-lg mb-4">
        You do not have permission to view this page.
      </p>

      {requiredRole && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          This page requires <strong>{requiredRole}</strong> privileges.
        </p>
      )}

      <a href="/dashboard" className="text-blue-600 hover:underline">
        Go to Dashboard
      </a>
    </div>
  );
}
