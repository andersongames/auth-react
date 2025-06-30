import { createContext, useContext, useEffect, useState } from "react";
import { loginUser, logoutUser } from "../services/authService";
import type { Role } from "../constants/roles";
import { getAuthSession } from "../services/sessionService";
import { getAllUsers } from "../services/userService";
import { handleUnexpectedError } from "../utils/handleUnexpectedError";

type AuthContextType = {
  isAuthenticated: boolean;
  user: { id: string; name: string; email: string; role: Role } | null;
  login: (email: string, password: string) => Promise<void>;  
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<{ id: string; name: string; email: string, role: Role } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function restoreSession() {
      try {
        const session = await getAuthSession();
        if (!session) {
          setLoading(false);
          return;
        }

        const now = Date.now();
        if (session.expiresAt && now > session.expiresAt) {
          await logoutUser();
          setUser(null);
          window.location.href = "/login?expired=true";
          return;
        }

        const users = await getAllUsers();
        const currentUser = users.find((u) => u.id === session.userId);

        if (currentUser) {
          setUser({
            id: currentUser.id,
            name: currentUser.name,
            email: currentUser.email,
            role: currentUser.role,
          });
        }
      } catch (error) {
        handleUnexpectedError(error, "Failed to restore session.");
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    restoreSession();

    // 🔁 Monitor expiration every 30 seconds
    const interval = setInterval(async () => {
      try {
        const session = await getAuthSession();
        const now = Date.now();

        if (session?.expiresAt && now > session.expiresAt) {
          await logoutUser();
          setUser(null);
          window.location.href = "/login?expired=true";
        }
      } catch {
        // We avoid showing visual feedback (like a toast) here because this check runs
        // automatically in the background at fixed intervals. If the session becomes
        // invalid or malformed, we clear it and redirect silently without interrupting
        // the user with duplicate or confusing messages.
        console.warn("Session data is malformed or unreadable. Clearing session...");
        await logoutUser();
        setUser(null);
      }
    }, 30000);

    // ✅ Watch for session removal from other tabs or DevTools (storage event only fires in other tabs).
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "mock_auth" && event.newValue === null) {
        logoutUser();
        setUser(null);
        window.location.href = "/login?expired=true";
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const login = async (email: string, password: string) => {
    const user = await loginUser(email, password);
    setUser({ id: user.id, name: user.name, email: user.email, role: user.role });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
