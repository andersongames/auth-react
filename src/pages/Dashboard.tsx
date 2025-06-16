import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { user, logout } = useAuth();

  return (
    <div className="w-4/5 max-w-md mx-auto mt-10 p-6 border rounded-xl shadow-md bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
      <p className="mb-4">
        Welcome, <strong>{user?.name}</strong>!
      </p>
      <button
        onClick={() => {
          setIsLoggingOut(true);
          setTimeout(() => {
            logout();
            setIsLoggingOut(false);
          }, 1000);
        }}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 cursor-pointer disabled:opacity-50"
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
