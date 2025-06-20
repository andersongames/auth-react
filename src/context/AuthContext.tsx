import { createContext, useContext, useEffect, useState } from "react";
import { loginUser, type StoredUser } from "../services/authService";

type AuthContextType = {
  isAuthenticated: boolean;
  user: { id: string; name: string } | null;
  login: (email: string, password: string) => Promise<void>;  
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<{ id: string; name: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("mock_auth");
    const users = localStorage.getItem("mock_users");

    if (stored && users) {
      const session = JSON.parse(stored);
      const expiresAt = session.expiresAt;
      const now = Date.now();

      if (expiresAt && now > expiresAt) {
        localStorage.removeItem("mock_auth");
        setUser(null);
        window.location.href = "/login?expired=true";
        return;
      }

      const { userId } = session;
      const parsedUsers: StoredUser[] = JSON.parse(users);
      const currentUser = parsedUsers.find((u) => u.id === userId);

      if (currentUser) {
        setUser({ id: currentUser.id, name: currentUser.name });
      }
    }

    setLoading(false);

    // 🔁 Monitorar expiração a cada 30 segundos
    const interval = setInterval(() => {
      const sessionData = localStorage.getItem("mock_auth");
      if (sessionData) {
        const { expiresAt } = JSON.parse(sessionData);
        if (expiresAt && Date.now() > expiresAt) {
          localStorage.removeItem("mock_auth");
          setUser(null);
          window.location.href = "/login?expired=true";
        }
      }
    }, 30000); // 30 segundos

    return () => clearInterval(interval);
  }, []);

  const login = async (email: string, password: string) => {
    const user = await loginUser(email, password);
    setUser({ id: user.id, name: user.name });
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
