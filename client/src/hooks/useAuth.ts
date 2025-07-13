import { useState, useEffect, createContext, useContext } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (credentials: { username: string; password: string }) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const useAuthProvider = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated on page load
    const token = localStorage.getItem("admin-token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (credentials: { username: string; password: string }): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simple authentication check (in production, this would be an API call)
      // Using basic credentials for demo: admin / admin123
      if (credentials.username === "admin" && credentials.password === "admin123") {
        const token = btoa(`${credentials.username}:${credentials.password}`);
        localStorage.setItem("admin-token", token);
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("admin-token");
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    login,
    logout,
    isLoading,
  };
};

export { AuthContext };