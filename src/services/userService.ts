import { isValidRole } from "../utils/validateRole";
import type { StoredUser } from "../types/user";
import type { Role } from "../constants/roles";
import { errorMessages } from "../constants/errorMessages";

export async function getAllUsers(): Promise<StoredUser[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const data = localStorage.getItem("mock_users");
        const users = data ? JSON.parse(data) : [];
        resolve(users);
      } catch {
        reject(new Error(errorMessages.failedToLoadUsers));
      }
    }, 1000);
  });
}

export async function updateUserRole(userId: string, newRole: string): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!isValidRole(newRole)) {
        reject(new Error(errorMessages.invalidRole));
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
        reject(new Error(errorMessages.failedToUpdateRole));
      }
    }, 2000);
  });
}
