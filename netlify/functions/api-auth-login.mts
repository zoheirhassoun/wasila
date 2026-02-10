import type { Config } from "@netlify/functions";
import bcrypt from "bcryptjs";
import { getNeon } from "./neon.mts";
import { signToken } from "./auth-jwt.mts";

export const config: Config = {
  path: "/api/auth/login",
};

export default async (req: Request) => {
  if (req.method !== "POST") {
    return new Response(null, { status: 405 });
  }
  const body = (await req.json()) as { email: string; password: string };
  const { email, password } = body;
  if (!email?.trim() || !password) {
    return Response.json({ error: "البريد وكلمة المرور مطلوبان" }, { status: 400 });
  }
  try {
    const sql = getNeon();
    const rows = await sql`
      select id, email, password_hash, full_name, role, created_at
      from users where email = ${email.trim().toLowerCase()}
    `;
    if (rows.length === 0) {
      return Response.json({ error: "البريد أو كلمة المرور غير صحيحة" }, { status: 401 });
    }
    const user = rows[0] as { id: string; email: string; password_hash: string; full_name: string | null; role: string };
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) {
      return Response.json({ error: "البريد أو كلمة المرور غير صحيحة" }, { status: 401 });
    }
    const token = await signToken({
      sub: user.id,
      email: user.email,
      role: user.role,
    });
    return Response.json({
      token,
      user: { id: user.id, email: user.email, full_name: user.full_name, role: user.role },
    });
  } catch (e) {
    console.error("login", e);
    return Response.json({ error: "فشل تسجيل الدخول" }, { status: 500 });
  }
};
