// Admin-only page that displays a list of all registered users stored in localStorage.
// Demonstrates role-based access control (RBAC) and interaction with mock user data.

import { useEffect, useState } from "react";
import type { StoredUser } from "../services/authService";

export default function UserList() {
  const [users, setUsers] = useState<StoredUser[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("mock_users");
    if (data) {
      setUsers(JSON.parse(data));
    }
  }, []);

  return (
    <div className="min-h-screen p-6 text-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-6">All Registered Users</h1>
      <div className="flex flex-col sm:flex-row gap-4 mb-6 text-sm">
        <a
          href="/admin-dashboard"
          className="text-blue-600 underline hover:text-blue-800"
        >
          ← Back to Admin Dashboard
        </a>
        <a
          href="/dashboard"
          className="text-blue-600 underline hover:text-blue-800"
        >
          Go to Main Dashboard →
        </a>
      </div>

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 dark:border-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t border-gray-300 dark:border-gray-700">
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
