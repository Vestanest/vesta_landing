"use client";
import { setStoredToken } from "../config";
import { AuthService, LoginRequest, RegisterRequest } from "../services/auth.service";
import { UserModel } from "../models";

export class AuthController {
  static async login(payload: LoginRequest): Promise<UserModel> {
    const raw = await AuthService.login(payload);
    const token = raw.data?.token || raw.token;
    if (token) setStoredToken(token);
    return raw.data?.user || raw.user!; // Assume one exists or let it throw/be undefined if critical
  }

  static async register(payload: RegisterRequest): Promise<UserModel> {
    const raw = await AuthService.register(payload);
    const token = raw.data?.token || raw.token;
    if (token) setStoredToken(token);
    return raw.data?.user || raw.user!;
  }

  static async fetchProfile(): Promise<UserModel> {
    const raw = await AuthService.profile();
    return raw.data?.user || raw.user || (raw as unknown as UserModel);
  }

  static async updateProfile(partial: Partial<RegisterRequest>): Promise<UserModel> {
    const raw = await AuthService.updateProfile(partial);
    return raw.data?.user || raw.user!;
  }

  static async changePassword(body: {
    current_password: string;
    password: string;
    password_confirmation: string;
  }): Promise<string> {
    const res = await AuthService.changePassword(body);
    return res.message;
  }

  static async forgotPassword(email: string): Promise<string> {
    const res = await AuthService.forgotPassword({ email });
    return res.message;
  }

  static async resetPassword(body: {
    email: string;
    otp_code: string;
    password: string;
    password_confirmation: string;
  }): Promise<string> {
    const res = await AuthService.resetPassword(body);
    return res.message;
  }

  static async verifyEmail(email: string, otp_code: string): Promise<string> {
    const res = await AuthService.verifyEmail({ email, otp_code });
    return res.message;
  }

  static async resendEmailOtp(email: string): Promise<string> {
    const res = await AuthService.resendEmailOtp({ email });
    return res.message;
  }

  static async logout(): Promise<string> {
    const res = await AuthService.logout();
    setStoredToken(null);
    return res.message;
  }
}


