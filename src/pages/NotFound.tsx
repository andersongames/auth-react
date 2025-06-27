import { useAuth } from "../context/AuthContext";
import Link from "../components/Link";

export default function NotFound() {
  const { user } = useAuth();

  const redirectPath = user ? "/dashboard" : "/login";

  return (
    <div className="min-h-[calc(100vh-var(--layout-offset))] flex items-center justify-center">
      <div className="space-y-6 flex flex-col items-center justify-center p-6 text-center bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        <h1 className="text-4xl font-bold tracking-tight">404</h1>
        <p className="text-lg">Page not found.</p>
        <Link to={redirectPath}>
          {user ? "Back to dashboard" : "Back to login"}
        </Link>
      </div>
    </div>
  );
}
