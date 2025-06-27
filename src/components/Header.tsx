import { useAuth } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="w-full border-b border-gray-200 dark:border-gray-800 py-4 px-6 bg-white dark:bg-gray-950">
      <div className="max-w-screen-lg mx-auto flex flex-wrap items-center justify-between gap-4">
        {/* Branding + GitHub */}
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold tracking-tight">MyAuth Demo</h1>
          <a
            href="https://github.com/seu-usuario/seu-repositorio"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300"
          >
            GitHub Repo
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
