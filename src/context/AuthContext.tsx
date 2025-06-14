import { createContext, useContext, useEffect, useState } from "react";
import type { StoredUser } from "../services/authService";

type AuthContextType = {
  isAuthenticated: boolean;
  user: { id: string; name: string } | null;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<{ id: string; name: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = localStorage.getItem("mock_auth");
    const users = localStorage.getItem("mock_users");

    if (auth && users) {
      const { userId } = JSON.parse(auth);
      const parsedUsers: StoredUser[] = JSON.parse(users);
      const currentUser = parsedUsers.find((u) => u.id === userId);

      if (currentUser) {
        setUser({ id: currentUser.id, name: currentUser.name });
      }
    }

    setLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem("mock_auth");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
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
