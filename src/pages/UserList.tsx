// Admin-only page that displays a list of all registered users stored in localStorage.
// Allows the admin to change the role of other users (promote/demote) via a dropdown interface.
// Prevents the admin from changing their own role to avoid accidental lockout.
// Demonstrates role-based access control (RBAC), persistent data mutation, and secure UI logic.

import { useEffect, useState } from "react";
import type { StoredUser } from "../services/authService";
import { ROLES, type Role } from "../constants/roles";
import { useAuth } from "../context/AuthContext";
import { isValidRole } from "../utils/validateRole";

export default function UserList() {
  const [users, setUsers] = useState<StoredUser[]>([]);
  const { user: authUser } = useAuth();

  const handleRoleChange = (userId: string, value: string) => {
    if (!isValidRole(value)) {
      alert("Invalid role selected.");
      return;
    }

    const newRole = value as Role;

    const updatedUsers = users.map((u) =>
      u.id === userId ? { ...u, role: newRole } : u
    );

    setUsers(updatedUsers);
    localStorage.setItem("mock_users", JSON.stringify(updatedUsers));
  };

  useEffect(() => {
    const data = localStorage.getItem("mock_users");
    if (data) {
      setUsers(JSON.parse(data));
    }
  }, []);

  return (
    <div className="p-6 space-y-6 flex flex-col bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold tracking-tight mb-6">All Registered Users</h1>
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
                <th className="px-4 py-2 text-left">Change Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t border-gray-300 dark:border-gray-700">
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.role}</td>
                  <td className="px-4 py-2">
                  {!authUser || user.email === authUser.email ? (
                    // Prevent self-edit
                    <span
                      title="You cannot change your own role"
                      className="inline-block px-2 py-1 rounded bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400 cursor-default"
                    >
                      {user.role} (you)
                    </span>
                  ) : (
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value as Role)}
                      className="border p-1 rounded dark:bg-gray-800 dark:border-gray-700"
                    >
                      {Object.values(ROLES).map((role) => (
                        <option key={role} value={role}>
                          {role.charAt(0).toUpperCase() + role.slice(1)}
                        </option>
                      ))}
                    </select>
                  )}
                </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
