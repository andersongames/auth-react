// Public page accessible to all users (authenticated or not).
// Displays different content based on the user's role using conditional rendering.

import RoleBased from "../components/RoleBased";
import { useAuth } from "../context/AuthContext";

export default function About() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-4">About this App</h1>

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
    </div>
  );
}
