import { useAuth } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="w-full border-b border-gray-200 dark:border-gray-800 py-4 px-6 bg-white dark:bg-gray-950">
      <div className="max-w-screen-lg mx-auto flex flex-wrap items-center justify-between gap-4">
        {/* Branding */}
        <div className="flex items-center gap-4">
          <a
            href="/dashboard"
            className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white hover:underline"
          >
            MyAuth Demo
          </a>
        </div>

        {/* Actions: User Info + Theme + Logout */}
        <div className="flex items-center gap-4 text-sm text-gray-700 dark:text-gray-300">
          {user && (
            <>
              <p>
                Logged in as <span className="font-medium">{user.name}</span>
              </p>
              <button
                onClick={logout}
                className="text-red-600 dark:text-red-400 underline hover:text-red-800 dark:hover:text-red-300"
              >
                Logout
              </button>
            </>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
