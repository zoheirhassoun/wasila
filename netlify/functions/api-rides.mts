import type { Config } from "@netlify/functions";
import { getJson, setJson } from "./blob-store.mts";

export const config: Config = {
  path: "/api/rides",
};

export default async (req: Request) => {
  if (req.method !== "POST") {
    return new Response(null, { status: 405 });
  }
  const body = await req.json() as { from: string; to: string; type: string };
  const rides = (await getJson<unknown[]>("rides")) ?? [];
  const requestId = `ride-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  const estimatedPrice = body.type === "economy" ? 25 : body.type === "comfort" ? 40 : 60;
  rides.push({
    id: requestId,
    ...body,
    estimatedPrice,
    status: "pending",
    createdAt: new Date().toISOString(),
  });
  await setJson("rides", rides);
  return Response.json({ requestId, estimatedPrice });
};
