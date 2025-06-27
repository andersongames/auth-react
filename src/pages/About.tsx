// Public page accessible to all users (authenticated or not).
// Displays different content based on the user's role using conditional rendering.

import RoleBased from "../components/RoleBased";
import { useAuth } from "../context/AuthContext";

export default function About() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-[calc(100vh-106px)] flex items-center justify-center">
      <div className="space-y-6 flex flex-col items-center justify-center p-6 text-center bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        <h1 className="text-3xl font-bold tracking-tight mb-4">About this App</h1>

        <p className="mb-6 text-lg">
          This is a public page accessible by anyone.
        </p>

        {!isAuthenticated && (
          <p className="text-blue-600">
            You are not logged in. <a href="/login" className="underline">Log in here</a>.
          </p>
        )}

        <RoleBased allowedRoles={["user"]}>
          <p className="text-green-600 mt-4">Welcome, user! You have access to basic features.</p>
        </RoleBased>

        <RoleBased allowedRoles={["admin"]}>
          <p className="text-red-600 mt-4">Welcome, admin! You can manage users and system data.</p>
        </RoleBased>

        <a
          href="/dashboard"
          className="text-blue-600 underline hover:text-blue-800 mt-4 block"
        >
          Go to Dashboard
        </a>
      </div>
    </div>
  );
}
