import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";
import { supabase } from "../api/supabase";
import type { Profile } from "../api/supabase";
import * as neonAuth from "../api/auth-neon";

export const AUTH_BACKEND = (import.meta.env.VITE_AUTH_BACKEND as string) || "supabase";

type AuthContextValue = {
  user: { id: string; email?: string } | null;
  profile: Profile | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthContextValue | null>(null);

async function fetchProfileSupabase(userId: string): Promise<Profile | null> {
  if (!supabase) return null;
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
  return data as Profile | null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthContextValue["user"]>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const loadSessionSupabase = useCallback(async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      setUser({ id: session.user.id, email: session.user.email ?? undefined });
      const p = await fetchProfileSupabase(session.user.id);
      setProfile(p);
    } else {
      setUser(null);
      setProfile(null);
    }
    setLoading(false);
  }, []);

  const loadSessionNeon = useCallback(async () => {
    const data = await neonAuth.meNeon();
    if (data) {
      setUser({ id: data.user.id, email: data.user.email });
      setProfile(data.profile);
    } else {
      setUser(null);
      setProfile(null);
    }
    setLoading(false);
  }, []);

  const loadSession = useCallback(async () => {
    if (AUTH_BACKEND === "neon") {
      await loadSessionNeon();
      return;
    }
    await loadSessionSupabase();
  }, [loadSessionNeon, loadSessionSupabase]);

  useEffect(() => {
    loadSession();
    if (AUTH_BACKEND !== "supabase" || !supabase) return;
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        setUser({ id: session.user.id, email: session.user.email ?? undefined });
        const p = await fetchProfileSupabase(session.user.id);
        setProfile(p);
      } else {
        setUser(null);
        setProfile(null);
      }
    });
    return () => subscription.unsubscribe();
  }, [loadSession]);

  const signUp = useCallback(async (email: string, password: string, fullName?: string) => {
    if (AUTH_BACKEND === "neon") {
      try {
        const { token, user: u } = await neonAuth.registerNeon(email, password, fullName);
        neonAuth.setToken(token);
        setUser({ id: u.id, email: u.email });
        setProfile({
          id: u.id,
          email: u.email,
          full_name: u.full_name,
          role: u.role as "user" | "admin",
          created_at: new Date().toISOString(),
        });
        return { error: null };
      } catch (e) {
        return { error: e instanceof Error ? e : new Error("فشل إنشاء الحساب") };
      }
    }
    if (!supabase) return { error: new Error("Supabase غير مهيأ") };
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName ?? "" } },
    });
    return { error: error ?? null };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    if (AUTH_BACKEND === "neon") {
      try {
        const { token, user: u } = await neonAuth.loginNeon(email, password);
        neonAuth.setToken(token);
        setUser({ id: u.id, email: u.email });
        setProfile({
          id: u.id,
          email: u.email,
          full_name: u.full_name,
          role: u.role as "user" | "admin",
          created_at: new Date().toISOString(),
        });
        return { error: null };
      } catch (e) {
        return { error: e instanceof Error ? e : new Error("فشل تسجيل الدخول") };
      }
    }
    if (!supabase) return { error: new Error("Supabase غير مهيأ") };
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error ?? null };
  }, []);

  const signOut = useCallback(async () => {
    if (AUTH_BACKEND === "neon") {
      neonAuth.removeToken();
    } else if (supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
    setProfile(null);
  }, []);

  const value: AuthContextValue = {
    user,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
    isAdmin: profile?.role === "admin",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
