const RAW_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000").trim();
const NORMALIZED_BASE = RAW_BASE_URL.replace(/\/+$/, "");

export const APP_BASE_URL: string = NORMALIZED_BASE.endsWith("/api/v1")
  ? NORMALIZED_BASE.replace(/\/api\/v1$/, "")
  : NORMALIZED_BASE;

export const API_BASE_URL: string = `${APP_BASE_URL}/api/v1`;




export function mediaUrl(path?: string | null): string {
  if (!path) return "/images/placeholder-property.jpg"; // Return a placeholder if no path
  
  // If it's a full URL
  if (/^https?:\/\//i.test(path)) {
    return path;
  }
  
  // Clean up the path
  const cleanPath = path.startsWith("/") ? path.substring(1) : path;
  
  // If the path already includes "storage/", don't duplicate it
  if (cleanPath.startsWith("storage/")) {
     return `${APP_BASE_URL}/${cleanPath}`;
  }

  // Default case: prepend storage
  return `${APP_BASE_URL}/storage/${cleanPath}`;
}

// Token storage (browser-only)
const TOKEN_STORAGE_KEY = "vesta-auth-token";

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function setStoredToken(token: string | null): void {
  if (typeof window === "undefined") return;
  try {
    if (token) localStorage.setItem(TOKEN_STORAGE_KEY, token);
    else localStorage.removeItem(TOKEN_STORAGE_KEY);
  } catch {
    // ignore
  }
}

export function authHeader(): Record<string, string> {
  const token = getStoredToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}
