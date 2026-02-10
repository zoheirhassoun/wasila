import type { Config } from "@netlify/functions";
import { getJson } from "./blob-store.mts";

export const config: Config = {
  path: "/api/partners/applications",
};

type Application = {
  id: string;
  type: string;
  companyName: string;
  contactEmail: string;
  contactPhone: string;
  status: string;
  createdAt: string;
};

export default async (req: Request) => {
  if (req.method !== "GET") {
    return new Response(null, { status: 405 });
  }
  const applications = (await getJson<Application[]>("partner-applications")) ?? [];
  return Response.json(applications);
};
