import type { Config } from "@netlify/functions";
import { getJson } from "./blob-store.mts";

export const config: Config = {
  path: "/api/partners/stats",
};

export default async () => {
  const orders = (await getJson<unknown[]>("orders")) ?? [];
  const stores = (await getJson<unknown[]>("stores")) ?? [];
  return Response.json({
    ordersCount: orders.length,
    storesCount: stores.length,
  });
};
