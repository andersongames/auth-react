// This service simulates a POST request to /register and "saves" the data in localStorage as if it were a backend.

import { errorMessages } from "../constants/errorMessages";
import type { Role } from "../constants/roles";
import type { StoredUser } from "../types/user";
import { isValidRole } from "../utils/validateRole";

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  role?: Role;
};

export async function registerUser(data: RegisterPayload): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users: StoredUser[] = JSON.parse(localStorage.getItem("mock_users") || "[]");

      const userExists = users.some((user) => user.email === data.email);
      if (userExists) {
        reject(new Error(errorMessages.emailAlreadyRegistered));
        return;
      }

      // ✅ Validate role
      const role = data.role || "user";

      if (!isValidRole(role)) {
        reject(new Error(errorMessages.invalidRole));
        return;
      }

      // ✅ Create user
      const newUser: StoredUser = {
        id: crypto.randomUUID(),
        name: data.name,
        email: data.email,
        password: data.password,
        role,
      };

      users.push(newUser);
      localStorage.setItem("mock_users", JSON.stringify(users));
      resolve();
    }, 1000);
  });
}

export async function loginUser(
  email: string,
  password: string
): Promise<{ id: string; name: string, email: string, role: Role }> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users: StoredUser[] = JSON.parse(
        localStorage.getItem("mock_users") || "[]"
      );

      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (!user) {
        reject(new Error(errorMessages.invalidCredentials));
        return;
      }

      // const expiration = new Date().getTime() + 5000; // 5 secs for testing
      const expiration = new Date().getTime() + 30 * 60 * 1000; // 30 minutes

      // Simulate auth token/session
      localStorage.setItem("mock_auth", JSON.stringify({
        userId: user.id,
        expiresAt: expiration
      }));

      // Return user data
      resolve({ id: user.id, name: user.name, email: user.email, role: user.role });
    }, 1000);
  });
}

export async function logoutUser(): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      localStorage.removeItem("mock_auth");
      resolve();
    }, 1000);
  });
}
