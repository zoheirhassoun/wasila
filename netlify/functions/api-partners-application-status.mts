import type { Config } from "@netlify/functions";
import { getJson, setJson } from "./blob-store.mts";

export const config: Config = {
  path: "/api/partners/applications/status",
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
  if (req.method !== "PATCH" && req.method !== "POST") {
    return new Response(null, { status: 405 });
  }
  const body = (await req.json()) as { id: string; status: string };
  if (!body.id || !body.status || !["approved", "rejected"].includes(body.status)) {
    return Response.json({ error: "id and status (approved|rejected) required" }, { status: 400 });
  }
  const applications = (await getJson<Application[]>("partner-applications")) ?? [];
  const idx = applications.findIndex((a) => a.id === body.id);
  if (idx === -1) {
    return Response.json({ error: "Application not found" }, { status: 404 });
  }
  applications[idx] = { ...applications[idx], status: body.status };
  await setJson("partner-applications", applications);
  return Response.json({ ok: true });
};
