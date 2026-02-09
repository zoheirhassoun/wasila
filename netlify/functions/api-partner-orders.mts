import type { Context, Config } from "@netlify/functions";
import { getJson, setJson } from "./blob-store.mts";

function getApiKey(req: Request): string | null {
  const auth = req.headers.get("Authorization");
  if (auth?.startsWith("Bearer ")) return auth.slice(7);
  return req.headers.get("X-API-Key");
}

export const config: Config = {
  path: "/api/partner/orders/*",
};

export default async (req: Request, _context: Context) => {
  const key = getApiKey(req);
  const envKey = Netlify.env.get("PARTNER_API_KEY");
  if (envKey && key !== envKey) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { "Content-Type": "application/json" } });
  }
  if (req.method !== "PATCH") return new Response(null, { status: 405 });
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();
  if (!id) return new Response(null, { status: 404 });
  const body = await req.json() as { status: string };
  const orders = (await getJson<{ id: string; status?: string }[]>("orders")) ?? [];
  const idx = orders.findIndex((o) => (o as { id: string }).id === id);
  if (idx < 0) return new Response(JSON.stringify({ error: "Not found" }), { status: 404, headers: { "Content-Type": "application/json" } });
  (orders[idx] as { status: string }).status = body.status;
  await setJson("orders", orders);
  return Response.json({ ok: true });
};
