import { useEffect, useState } from "react";
import type { StoredUser } from "../types/user";
import { ROLES, type Role } from "../constants/roles";
import { useAuth } from "../context/AuthContext";
import Link from "../components/Link";
import { updateUserRole, getAllUsers } from "../services/userService";
import { handleUnexpectedError } from "../utils/handleUnexpectedError";
import toast from "react-hot-toast";
import { errorMessages } from "../constants/errorMessages";
import { successMessages } from "../constants/successMessages";

export default function UserList() {
  const [users, setUsers] = useState<StoredUser[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);
  const { user: authUser } = useAuth();

  const handleRoleChange = async (userId: string, value: string) => {
    setUpdatingUserId(userId);
    try {
      await updateUserRole(userId, value);
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, role: value as Role } : u))
      );
      toast.success(successMessages.updateRoleSuccess);
    } catch (error) {
      handleUnexpectedError(error, errorMessages.failedToUpdateRole);
    } finally {
      setUpdatingUserId(null);
    }
  };

  useEffect(() => {
    async function fetchUsers() {
      setIsLoadingUsers(true);
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (error) {
        handleUnexpectedError(error, errorMessages.failedToLoadUsers);
      } finally {
        setIsLoadingUsers(false);
      }
    }

    fetchUsers();
  }, []);

  return (
    <div className="p-6 space-y-6 flex flex-col transition-colors bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold tracking-tight mb-6">All Registered Users</h1>
      
      <div className="flex flex-col sm:flex-row gap-4 mb-6 text-sm">
        <Link to="/admin-dashboard">← Back to Admin Dashboard</Link>
        <Link to="/dashboard">Go to Main Dashboard →</Link>
      </div>

      {isLoadingUsers ? (
        <p>Loading users...</p>
      ) : users.length === 0 ? (
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
                        disabled={updatingUserId === user.id}
                        className="border p-1 rounded transition-colors dark:bg-gray-800 dark:border-gray-700 disabled:opacity-50"
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
