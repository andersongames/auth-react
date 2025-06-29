// Admin-only page that displays a list of all registered users stored in localStorage.
// Allows the admin to change the role of other users (promote/demote) via a dropdown interface.
// Prevents the admin from changing their own role to avoid accidental lockout.
// Demonstrates role-based access control (RBAC), persistent data mutation, and secure UI logic.

import { useEffect, useState } from "react";
import type { StoredUser } from "../types/user";
import { ROLES, type Role } from "../constants/roles";
import { useAuth } from "../context/AuthContext";
import Link from "../components/Link";
import { updateUserRole } from "../services/userService";
import { handleUnexpectedError } from "../utils/handleUnexpectedError";

export default function UserList() {
  const [users, setUsers] = useState<StoredUser[]>([]);
  const { user: authUser } = useAuth();

  const handleRoleChange = (userId: string, value: string) => {
    try {
      updateUserRole(userId, value);
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, role: value as Role } : u))
      );
    } catch (error) {
      handleUnexpectedError(error, "Unable to update user role.");
    }
  };

  useEffect(() => {
    const data = localStorage.getItem("mock_users");
    if (data) {
      setUsers(JSON.parse(data));
    }
  }, []);

  return (
    <div className="p-6 space-y-6 flex flex-col transition-colors bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold tracking-tight mb-6">All Registered Users</h1>
      <div className="flex flex-col sm:flex-row gap-4 mb-6 text-sm">
        <Link to="/admin-dashboard">
          ← Back to Admin Dashboard
        </Link>
        <Link to="/dashboard">
          Go to Main Dashboard →
        </Link>
      </div>

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border transition-colors border-gray-300 dark:border-gray-700">
            <thead className="transition-colors bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Role</th>
                <th className="px-4 py-2 text-left">Change Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t transition-colors border-gray-300 dark:border-gray-700">
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.role}</td>
                  <td className="px-4 py-2">
                  {!authUser || user.email === authUser.email ? (
                    // Prevent self-edit
                    <span
                      title="You cannot change your own role"
                      className="inline-block px-2 py-1 rounded transition-colors bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400 cursor-default"
                    >
                      {user.role} (you)
                    </span>
                  ) : (
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value as Role)}
                      className="border p-1 rounded transition-colors dark:bg-gray-800 dark:border-gray-700"
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
