import type { Config } from "@netlify/functions";
import { getNeon } from "./neon.mts";
import { verifyToken } from "./auth-jwt.mts";

export const config: Config = {
  path: "/api/auth/me",
};

export default async (req: Request) => {
  if (req.method !== "GET") {
    return new Response(null, { status: 405 });
  }
  const auth = req.headers.get("Authorization");
  const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;
  if (!token) {
    return Response.json({ error: "غير مصرح" }, { status: 401 });
  }
  const payload = await verifyToken(token);
  if (!payload) {
    return Response.json({ error: "غير مصرح" }, { status: 401 });
  }
  try {
    const sql = getNeon();
    const rows = await sql`
      select id, email, full_name, role, created_at
      from users where id = ${payload.sub}
    `;
    if (rows.length === 0) {
      return Response.json({ error: "المستخدم غير موجود" }, { status: 404 });
    }
    const u = rows[0] as { id: string; email: string; full_name: string | null; role: string; created_at: string };
    return Response.json({
      user: { id: u.id, email: u.email },
      profile: {
        id: u.id,
        email: u.email,
        full_name: u.full_name,
        role: u.role,
        created_at: u.created_at,
      },
    });
  } catch (e) {
    console.error("me", e);
    return Response.json({ error: "فشل جلب البيانات" }, { status: 500 });
  }
};
