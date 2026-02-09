import type { Context, Config } from "@netlify/functions";
import { getJson, ensureSeed } from "./blob-store.mts";

interface Restaurant {
  id: string;
  name: string;
  description: string;
  logoUrl?: string;
  partnerId?: string;
}

interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  price: number;
  imageUrl?: string;
}

export const config: Config = {
  path: ["/api/restaurants", "/api/restaurants/*"],
};

export default async (req: Request, context: Context) => {
  await ensureSeed();
  const url = new URL(req.url);
  const pathParts = url.pathname.replace(/^\/api\/restaurants\/?/, "").split("/").filter(Boolean);

  if (pathParts.length === 0) {
    const list = await getJson<Restaurant[]>("restaurants");
    return Response.json(list ?? []);
  }

  const id = pathParts[0];
  if (pathParts.length === 1) {
    const list = await getJson<Restaurant[]>("restaurants");
    const restaurant = list?.find((r) => r.id === id);
    if (!restaurant) return new Response(JSON.stringify({ error: "Not found" }), { status: 404, headers: { "Content-Type": "application/json" } });
    return Response.json(restaurant);
  }

  if (pathParts[1] === "menu") {
    const menu = await getJson<MenuItem[]>(`menu:${id}`);
    return Response.json(menu ?? []);
  }

  return new Response(null, { status: 404 });
};
