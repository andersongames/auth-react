// Protected page accessible to any authenticated user, regardless of role.

import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../services/authService";
import RoleBased from "../components/RoleBased";
import { ROLES } from "../constants/roles";

export default function Dashboard() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-var(--layout-offset))] flex items-center justify-center">
      <div className="w-full sm:w-[90%] md:w-[80%] max-w-md mx-auto p-4 sm:p-6 border shadow-md rounded-2xl space-y-6 flex flex-col bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        <h2 className="text-2xl font-semibold tracking-tight mb-4">Dashboard</h2>
        <p className="mb-4 text-sm sm:text-base">
          Welcome, <strong>{user?.name}</strong>!
        </p>
        {user && (
          <div className="text-sm text-gray-700 dark:text-gray-300 mb-6">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
          </div>
        )}
        <div className="flex flex-col gap-1">
          <a
            href="/about"
            className="text-blue-600 underline hover:text-blue-800 block"
          >
            Learn more about this app
          </a>

          <RoleBased allowedRoles={[ROLES.ADMIN]}>
            <a
              href="/admin-dashboard"
              className="text-blue-600 underline hover:text-blue-800 block"
            >
              Go to Admin Panel
            </a>
          </RoleBased>

          <RoleBased allowedRoles={[ROLES.USER]}>
            <a
              href="/user-settings"
              className="text-blue-600 underline hover:text-blue-800 block"
            >
              Access Personal Settings
            </a>
          </RoleBased>

          <RoleBased allowedRoles={[ROLES.ADMIN, "editor"]}>
            <a
              href="/manage-content"
              className="text-blue-600 underline hover:text-blue-800 block"
            >
              Manage Content
            </a>
          </RoleBased>
        </div>

        <button
          onClick={async () => {
            setIsLoggingOut(true);
            logout(); // clear global state (AuthContext)
            await logoutUser(); // clear session (authService)
            navigate({
              pathname: "/login",
              search: "?loggedOut=true",
            });
            setIsLoggingOut(false);
          }}
          className="w-full bg-red-600 text-white px-4 py-2 rounded-lg font-medium cursor-pointer transition-colors duration-200 ease-in-out hover:bg-red-700 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-red-500"
          disabled={isLoggingOut}
        >
          {isLoggingOut ? (
            <span className="animate-spin inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full"></span>
          ) : (
            "Logout"
          )}
        </button>
      </div>
    </div>
  );
}
