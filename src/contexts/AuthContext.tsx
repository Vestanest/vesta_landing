"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { AuthController } from "../api/controllers/auth.controller";
import { setStoredToken, getStoredToken } from "../api/config";

interface User {
  id: number | string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string | null;
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
  verifyEmail: (email: string, otpCode: string) => Promise<boolean>;
  resendEmailOtp: (email: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app load
    const checkAuth = async () => {
      try {
        const token = getStoredToken();
        if (!token) {
          setIsLoading(false);
          return;
        }
        
        const apiUser = await AuthController.fetchProfile();
        const mapped: User = {
          id: apiUser.id,
          email: apiUser.email,
          firstName: apiUser.first_name,
          lastName: apiUser.last_name,
          phone: apiUser.phone ?? undefined,
        };
        setUser(mapped);
      } catch (error) {
        console.error("Auth check failed:", error);
        // Clear invalid token
        setStoredToken(null);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      const apiUser = await AuthController.login({ email, password });
      const mapped: User = {
        id: apiUser.id,
        email: apiUser.email,
        firstName: apiUser.first_name,
        lastName: apiUser.last_name,
        phone: apiUser.phone ?? undefined,
      };
      setUser(mapped);
      return true;
    } catch (error) {
      throw error; // Re-throw to allow UI to handle specific error messages
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
      const apiUser = await AuthController.register({
        first_name: userData.firstName,
        last_name: userData.lastName,
        email: userData.email,
        password: userData.password,
        password_confirmation: userData.password,
        phone: userData.phone,
      });
      const mapped: User = {
        id: apiUser.id,
        email: apiUser.email,
        firstName: apiUser.first_name,
        lastName: apiUser.last_name,
        phone: apiUser.phone ?? undefined,
      };
      setUser(mapped);
      return true;
    } catch (error) {
      throw error; // Re-throw to allow UI to handle specific error messages
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Call logout API to invalidate token on server
      await AuthController.logout();
    } catch (error) {
      console.error("Logout API call failed:", error);
    } finally {
      // Always clear local state
      setUser(null);
      setStoredToken(null);
      setIsLoading(false);
    }
  };

  const forgotPassword = async (email: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      await AuthController.forgotPassword(email);
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
      // Requires email + otp at call site; keep simple for now
      // Implementers can extend context to pass email/otp from UI flow
      return password === confirmPassword;
    } catch (error) {
      console.error("Password reset failed:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyEmail = async (email: string, otpCode: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      await AuthController.verifyEmail(email, otpCode);
      return true;
    } catch (error) {
      console.error("Email verification failed:", error);
      throw error; // Re-throw to allow UI to handle specific error messages
    } finally {
      setIsLoading(false);
    }
  };

  const resendEmailOtp = async (email: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      await AuthController.resendEmailOtp(email);
      return true;
    } catch (error) {
      console.error("Resend OTP failed:", error);
      throw error; // Re-throw to allow UI to handle specific error messages
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
    verifyEmail,
    resendEmailOtp,
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
