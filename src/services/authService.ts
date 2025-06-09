// This service simulates a POST request to /register and "saves" the data in localStorage as if it were a backend.

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

type StoredUser = {
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
        id: Date.now(),
        ...data,
      };

      users.push(newUser);
      localStorage.setItem("mock_users", JSON.stringify(users));
      resolve();
    }, 1000); // simulate network delay
  });
}

export async function loginUser(email: string, password: string): Promise<void> {
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

      // Simulate auth token/session
      localStorage.setItem("mock_auth", JSON.stringify({ userId: user.id }));
      resolve();
    }, 1000);
  });
}
