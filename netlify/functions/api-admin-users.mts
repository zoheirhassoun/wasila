import type { Config } from "@netlify/functions";
import { getNeon } from "./neon.mts";
import { verifyToken } from "./auth-jwt.mts";

export const config: Config = {
  path: "/api/admin/users",
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
  if (!payload || payload.role !== "admin") {
    return Response.json({ error: "غير مصرح" }, { status: 403 });
  }
  try {
    const sql = getNeon();
    const rows = await sql`
      select id, email, full_name, role, created_at
      from users
      order by created_at desc
    `;
    return Response.json(rows);
  } catch (e) {
    console.error("admin users", e);
    return Response.json({ error: "فشل جلب المستخدمين" }, { status: 500 });
  }
};
