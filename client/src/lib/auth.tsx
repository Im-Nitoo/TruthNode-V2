import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useLocation } from "wouter";
import { apiRequest } from "./queryClient";
import { useToast } from "@/hooks/use-toast";
import { websocket } from "./websocket";

interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  role: string;
  truthTokens: number;
  avatar?: string;
  bio?: string;
  ensAddress?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<User>;
  register: (data: RegisterData) => Promise<User>;
  logout: () => void;
}

interface RegisterData {
  username: string;
  password: string;
  email: string;
  name: string;
  role: string;
  bio?: string | null;
  avatar?: string | null;
  ensAddress?: string | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: async () => {
    throw new Error("Login not implemented");
  },
  register: async () => {
    throw new Error("Register not implemented");
  },
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [, navigate] = useLocation();
  const { toast } = useToast();

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUser(token);
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchUser = async (token: string) => {
    try {
      const res = await apiRequest("GET", "/api/users/me", undefined, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const userData = await res.json();
        setUser(userData);
      // Connect WebSocket after successful authentication
      websocket.updateToken(token);
    } catch (error) {
      console.error("Error fetching user:", error);
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (username: string, password: string) => {
    try {
      const res = await apiRequest("POST", "/api/login", {
        username,
        password,
      });
      const { token, user: userData } = await res.json();
      localStorage.setItem("token", token);
      setUser(userData);
      // Connect WebSocket after successful login
      websocket.updateToken(token);
      return userData;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      const res = await apiRequest("POST", "/api/register", data);
      const { token, user: newUser } = await res.json();
      localStorage.setItem("token", token);
      setUser(newUser);
      // Connect WebSocket after successful registration
      websocket.updateToken(token);
      return newUser;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    // Disconnect WebSocket on logout
    websocket.updateToken(null);
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  return (
    <AuthContext.Provider 
      value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
