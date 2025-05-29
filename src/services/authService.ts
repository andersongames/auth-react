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
