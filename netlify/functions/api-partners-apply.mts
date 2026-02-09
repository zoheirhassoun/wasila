import type { Config } from "@netlify/functions";
import { getJson, setJson } from "./blob-store.mts";

export const config: Config = {
  path: "/api/partners/apply",
};

export default async (req: Request) => {
  if (req.method !== "POST") {
    return new Response(null, { status: 405 });
  }
  const body = await req.json() as { type: string; companyName: string; contactEmail: string; contactPhone: string };
  const applications = (await getJson<unknown[]>("partner-applications")) ?? [];
  const id = `app-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  applications.push({
    id,
    type: body.type,
    companyName: body.companyName,
    contactEmail: body.contactEmail,
    contactPhone: body.contactPhone,
    status: "pending",
    createdAt: new Date().toISOString(),
  });
  await setJson("partner-applications", applications);
  return Response.json({});
};
