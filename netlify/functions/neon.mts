import { neon } from "@neondatabase/serverless";

const conn = process.env.NEON_DATABASE_URL ?? process.env.DATABASE_URL;

export function getNeon() {
  if (!conn) throw new Error("NEON_DATABASE_URL or DATABASE_URL not set");
  return neon(conn);
}

export type NeonUser = {
  id: string;
  email: string;
  password_hash: string;
  full_name: string | null;
  role: string;
  created_at: string;
};
