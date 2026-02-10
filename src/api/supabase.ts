import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  console.warn("Supabase URL or anon key missing. Auth will be disabled.");
}

export const supabase = url && anonKey
  ? createClient(url, anonKey)
  : null;

export type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  role: "user" | "admin";
  created_at: string;
};
