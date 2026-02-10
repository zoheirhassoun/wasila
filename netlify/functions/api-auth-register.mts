import type { Config } from "@netlify/functions";
import bcrypt from "bcryptjs";
import { getNeon } from "./neon.mts";
import { signToken } from "./auth-jwt.mts";

export const config: Config = {
  path: "/api/auth/register",
};

export default async (req: Request) => {
  if (req.method !== "POST") {
    return new Response(null, { status: 405 });
  }
  const body = (await req.json()) as { email: string; password: string; full_name?: string };
  const { email, password, full_name } = body;
  if (!email?.trim() || !password) {
    return Response.json({ error: "البريد وكلمة المرور مطلوبان" }, { status: 400 });
  }
  if (password.length < 6) {
    return Response.json({ error: "كلمة المرور 6 أحرف على الأقل" }, { status: 400 });
  }
  try {
    const sql = getNeon();
    const existing = await sql`select id from users where email = ${email.trim().toLowerCase()}`;
    if (existing.length > 0) {
      return Response.json({ error: "البريد مستخدم مسبقاً" }, { status: 400 });
    }
    const password_hash = await bcrypt.hash(password, 10);
    const rows = await sql`
      insert into users (email, password_hash, full_name, role)
      values (${email.trim().toLowerCase()}, ${password_hash}, ${full_name?.trim() ?? null}, 'user')
      returning id, email, full_name, role, created_at
    `;
    const user = rows[0] as { id: string; email: string; full_name: string | null; role: string };
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
    console.error("register", e);
    return Response.json({ error: "فشل إنشاء الحساب" }, { status: 500 });
  }
};
