import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  userId: number | null;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("mock_auth");
    if (stored) {
      const data = JSON.parse(stored);
      setUserId(data.userId);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("mock_auth");
    setUserId(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!userId,
        userId,
        logout,
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
