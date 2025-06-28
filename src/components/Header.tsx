import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../services/authService";

export default function Header() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    logout();
    await logoutUser();
    navigate({ pathname: "/login", search: "?loggedOut=true" });
    setIsLoggingOut(false);
  };

  return (
    <header className="w-full border-b border-gray-200 dark:border-gray-800 py-4 px-6 bg-white dark:bg-gray-950">
      <div className="mx-auto flex flex-wrap items-center justify-between gap-4">
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
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium cursor-pointer transition-colors duration-200 ease-in-out hover:bg-red-700 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-red-500"
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
