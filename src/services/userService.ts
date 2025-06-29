import { isValidRole } from "../utils/validateRole";
import type { StoredUser } from "../types/user";
import type { Role } from "../constants/roles";

export function getAllUsers(): Promise<StoredUser[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const data = localStorage.getItem("mock_users");
        const users = data ? JSON.parse(data) : [];
        resolve(users);
      } catch {
        reject(new Error("Failed to load user list."));
      }
    }, 1000);
  });
}

export function updateUserRole(userId: string, newRole: string): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!isValidRole(newRole)) {
        reject(new Error("Invalid role selected."));
        return;
      }

      try {
        const data = localStorage.getItem("mock_users");
        const users: StoredUser[] = data ? JSON.parse(data) : [];

        const updatedUsers = users.map((u) =>
          u.id === userId ? { ...u, role: newRole as Role } : u
        );

        localStorage.setItem("mock_users", JSON.stringify(updatedUsers));
        resolve();
      } catch {
        reject(new Error("Failed to update user role."));
      }
    }, 2000);
  });
}
