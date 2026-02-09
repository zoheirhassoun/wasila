import type { Config } from "@netlify/functions";
import { getJson, setJson, ensureSeed } from "./blob-store.mts";

function getApiKey(req: Request): string | null {
  const auth = req.headers.get("Authorization");
  if (auth?.startsWith("Bearer ")) return auth.slice(7);
  return req.headers.get("X-API-Key");
}

export const config: Config = {
  path: ["/api/partner/stores", "/api/partner/stores/*"],
};

export default async (req: Request) => {
  const key = getApiKey(req);
  const envKey = Netlify.env.get("PARTNER_API_KEY");
  if (envKey && key !== envKey) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { "Content-Type": "application/json" } });
  }
  await ensureSeed();
  const url = new URL(req.url);
  const pathParts = url.pathname.replace(/^\/api\/partner\/stores\/?/, "").split("/").filter(Boolean);

  if (pathParts.length === 0) {
    if (req.method === "GET") {
      const list = await getJson<unknown[]>("stores");
      return Response.json(list ?? []);
    }
    if (req.method === "POST") {
      const body = await req.json() as { name: string; description: string; category: string; logoUrl?: string };
      const list = (await getJson<{ id: string }[]>("stores")) ?? [];
      const id = `s${Date.now()}`;
      list.push({ id, ...body, partnerId: "partner" });
      await setJson("stores", list);
      return Response.json({ id, ...body });
    }
    return new Response(null, { status: 405 });
  }

  const id = pathParts[0];
  if (pathParts[1] === "products" && req.method === "POST") {
    const body = await req.json() as { name: string; price: number } | { name: string; price: number }[];
    const products = (await getJson<unknown[]>(`products:${id}`)) ?? [];
    const items = Array.isArray(body) ? body : [body];
    for (const p of items) {
      const pid = `p${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
      products.push({ id: pid, storeId: id, name: p.name, price: p.price });
    }
    await setJson(`products:${id}`, products);
    return Response.json({ ok: true });
  }

  return new Response(null, { status: 404 });
};
