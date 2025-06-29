/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone?: string;
  }) => Promise<boolean>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<boolean>;
  resetPassword: (
    password: string,
    confirmPassword: string
  ) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app load
    const checkAuth = async () => {
      try {
        // TODO: Implement actual auth check
        // For now, check localStorage for demo purposes
        const savedUser = localStorage.getItem("vesta-user");
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);

      // TODO: Implement actual login API call
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock user data for demo
      const mockUser: User = {
        id: "1",
        email,
        firstName: "John",
        lastName: "Doe",
        phone: "+233 20 123 4567",
      };

      setUser(mockUser);
      localStorage.setItem("vesta-user", JSON.stringify(mockUser));

      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone?: string;
  }): Promise<boolean> => {
    try {
      setIsLoading(true);

      // TODO: Implement actual signup API call
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock user data for demo
      const mockUser: User = {
        id: "1",
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone,
      };

      setUser(mockUser);
      localStorage.setItem("vesta-user", JSON.stringify(mockUser));

      return true;
    } catch (error) {
      console.error("Signup failed:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("vesta-user");
  };

  const forgotPassword = async (email: string): Promise<boolean> => {
    try {
      setIsLoading(true);

      // TODO: Implement actual forgot password API call
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return true;
    } catch (error) {
      console.error("Forgot password failed:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (
    password: string,
    confirmPassword: string
  ): Promise<boolean> => {
    try {
      setIsLoading(true);

      // TODO: Implement actual password reset API call
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return true;
    } catch (error) {
      console.error("Password reset failed:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    signup,
    logout,
    forgotPassword,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
