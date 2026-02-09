import type { Config } from "@netlify/functions";
import { getJson, setJson } from "./blob-store.mts";

export const config: Config = {
  path: "/api/orders",
};

export default async (req: Request) => {
  if (req.method !== "POST") {
    return new Response(null, { status: 405 });
  }
  const body = await req.json() as { storeId: string; items: { productId: string; quantity: number; price: number }[]; address?: string };
  const orders = (await getJson<unknown[]>("orders")) ?? [];
  const orderId = `ord-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  orders.push({
    id: orderId,
    storeId: body.storeId,
    items: body.items,
    address: body.address,
    status: "pending",
    createdAt: new Date().toISOString(),
  });
  await setJson("orders", orders);
  return Response.json({ orderId });
};
