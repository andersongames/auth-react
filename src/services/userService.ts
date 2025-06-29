import { isValidRole } from "../utils/validateRole";
import type { StoredUser } from "../types/user";
import type { Role } from "../constants/roles";

export function getAllUsers(): StoredUser[] {
  const data = localStorage.getItem("mock_users");
  try {
    return data ? JSON.parse(data) : [];
  } catch {
    throw new Error("Failed to load user list.");
  }
}

export function updateUserRole(userId: string, newRole: string): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!isValidRole(newRole)) {
        reject(new Error("Invalid role selected."));
        return;
      }

      try {
        const users = getAllUsers();
        const updatedUsers = users.map((u) =>
          u.id === userId ? { ...u, role: newRole as Role } : u
        );
        localStorage.setItem("mock_users", JSON.stringify(updatedUsers));
        resolve();
      } catch {
        reject(new Error("Failed to update user role."));
      }
    }, 1000);
  });
}
