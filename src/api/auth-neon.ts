import type { Profile } from "./supabase";

const TOKEN_KEY = "wasila_neon_token";
const BASE = "";

function getStoredToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function getToken(): string | null {
  return getStoredToken();
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function removeToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

async function authFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const token = getStoredToken();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options?.headers,
  };
  if (token) (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  const res = await fetch(`${BASE}${path}`, { ...options, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error((data as { error?: string }).error || res.statusText);
  }
  return data as T;
}

export async function registerNeon(email: string, password: string, fullName?: string): Promise<{ token: string; user: { id: string; email: string; full_name: string | null; role: string } }> {
  const res = await authFetch<{ token: string; user: { id: string; email: string; full_name: string | null; role: string } }>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password, full_name: fullName ?? "" }),
  });
  return res;
}

export async function loginNeon(email: string, password: string): Promise<{ token: string; user: { id: string; email: string; full_name: string | null; role: string } }> {
  const res = await authFetch<{ token: string; user: { id: string; email: string; full_name: string | null; role: string } }>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  return res;
}

export async function meNeon(): Promise<{ user: { id: string; email: string }; profile: Profile } | null> {
  const token = getStoredToken();
  if (!token) return null;
  try {
    const res = await authFetch<{ user: { id: string; email: string }; profile: Profile }>("/api/auth/me");
    return res;
  } catch {
    removeToken();
    return null;
  }
}

export async function getAdminUsersNeon(): Promise<Profile[]> {
  const res = await authFetch<Profile[]>("/api/admin/users");
  return res;
}
