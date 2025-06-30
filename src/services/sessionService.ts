export interface AuthSession {
  userId: string;
  expiresAt: number;
}

export async function getAuthSession(): Promise<AuthSession | null> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const raw = localStorage.getItem("mock_auth");
        if (!raw) {
          resolve(null);
          return;
        }

        const session: AuthSession = JSON.parse(raw);
        resolve(session);
      } catch {
        reject(new Error("Failed to retrieve session."));
      }
    }, 1000);
  });
}
