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
    <div className="w-full sm:w-[90%] md:w-[80%] max-w-md mx-auto p-4 sm:p-6 border rounded-xl shadow-md bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
      <p className="mb-4 text-sm sm:text-base">
        Welcome, <strong>{user?.name}</strong>!
      </p>

      <RoleBased allowedRoles={[ROLES.ADMIN]}>
        <a
          href="/admin-dashboard"
          className="text-blue-600 underline hover:text-blue-800 my-4 block"
        >
          Go to Admin Panel
        </a>
      </RoleBased>

      <RoleBased allowedRoles={[ROLES.USER]}>
        <a
          href="/user-settings"
          className="text-blue-600 underline hover:text-blue-800 my-4 block"
        >
          Access Personal Settings
        </a>
      </RoleBased>

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
        className="w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 cursor-pointer disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-red-500"
        disabled={isLoggingOut}
      >
        {isLoggingOut ? (
          <span className="animate-spin inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full"></span>
        ) : (
          "Logout"
        )}
      </button>
    </div>
  );
}
