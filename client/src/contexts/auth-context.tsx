import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface User {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
  verifyToken: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await fetch("/api/auth/logout", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
    }
  };

  const verifyToken = async (): Promise<boolean> => {
    const token = localStorage.getItem("token");
    if (!token) {
      return false;
    }

    try {
      const response = await fetch("/api/auth/verify", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setUser(result.data.user);
          return true;
        }
      }
      
      // Token is invalid, clear it
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      return false;
    } catch (error) {
      console.error("Token verification error:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      return false;
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);
      
      // Check if user data exists in localStorage
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          
          // Verify token is still valid
          await verifyToken();
        } catch (error) {
          console.error("Error parsing stored user data:", error);
          localStorage.removeItem("user");
          localStorage.removeItem("token");
        }
      }
      
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    logout,
    verifyToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
