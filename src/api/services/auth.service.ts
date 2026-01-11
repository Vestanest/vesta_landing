import { httpRequest } from "../http";
import { UserModel } from "../models";

export interface RegisterRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
  phone?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}


export interface AuthResponse {
  success?: boolean;
  message?: string;
  data?: {
    user: UserModel;
    token: string;
  };
  token?: string;
  user?: UserModel;
}

export const AuthService = {
  register: (body: RegisterRequest) =>
    httpRequest<AuthResponse>("/auth/register", {
      method: "POST",
      body,
    }),

  login: (body: LoginRequest) =>
    httpRequest<AuthResponse>("/auth/login", {
      method: "POST",
      body,
    }),

  profile: () =>
    httpRequest<AuthResponse>("/auth/profile", {
      method: "GET",
      auth: true,
    }),

  updateProfile: (body: Partial<RegisterRequest>) =>
    httpRequest<AuthResponse>("/auth/profile", {
      method: "PUT",
      auth: true,
      body,
    }),

  changePassword: (body: {
    current_password: string;
    password: string;
    password_confirmation: string;
  }) =>
    httpRequest<{ message: string }>("/auth/change-password", {
      method: "POST",
      auth: true,
      body,
    }),

  forgotPassword: (body: { email: string }) =>
    httpRequest<{ message: string }>("/auth/forgot-password", {
      method: "POST",
      body,
    }),

  resetPassword: (body: {
    email: string;
    otp_code: string;
    password: string;
    password_confirmation: string;
  }) =>
    httpRequest<{ message: string }>("/auth/reset-password", {
      method: "POST",
      body,
    }),

  verifyEmail: (body: { email: string; otp_code: string }) =>
    httpRequest<{ message: string }>("/auth/verify-email", {
      method: "POST",
      body,
    }),

  resendEmailOtp: (body: { email: string }) =>
    httpRequest<{ message: string }>("/auth/resend-email-otp", {
      method: "POST",
      body,
    }),

  logout: () =>
    httpRequest<{ message: string }>("/auth/logout", {
      method: "POST",
      auth: true,
    }),
};


