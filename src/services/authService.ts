// This service simulates a POST request to /register and "saves" the data in localStorage as if it were a backend.

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

export type StoredUser = {
  id: string;
  name: string;
  email: string;
  password: string;
}

export async function registerUser(data: RegisterPayload): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("mock_users") || "[]");

      const userExists = users.some((user: StoredUser) => user.email === data.email);
      if (userExists) {
        reject(new Error("Email already registered."));
        return;
      }

      const newUser = {
        id: crypto.randomUUID(),
        ...data,
      };

      users.push(newUser);
      localStorage.setItem("mock_users", JSON.stringify(users));
      resolve();
    }, 1000); // simulate network delay
  });
}

export async function loginUser(
  email: string,
  password: string
): Promise<{ id: string; name: string }> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users: StoredUser[] = JSON.parse(
        localStorage.getItem("mock_users") || "[]"
      );

      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (!user) {
        reject(new Error("Invalid email or password."));
        return;
      }

      const expiration = new Date().getTime() + 5000; // 5 secs for testing
      // const expiration = new Date().getTime() + 30 * 60 * 1000; // 30 minutes

      // Simulate auth token/session
      localStorage.setItem("mock_auth", JSON.stringify({
        userId: user.id,
        expiresAt: expiration
      }));

      // Return user data
      resolve({ id: user.id, name: user.name });
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
