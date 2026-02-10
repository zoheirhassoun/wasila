import { api } from "./client";

export type PartnerApplication = {
  id: string;
  type: string;
  companyName: string;
  contactEmail: string;
  contactPhone: string;
  status: string;
  createdAt: string;
};

export function submitPartnerApplication(payload: {
  type: "store" | "ride" | "restaurant" | "flight";
  companyName: string;
  contactEmail: string;
  contactPhone: string;
}): Promise<void> {
  return api("/api/partners/apply", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getPartnerStats(): Promise<{ ordersCount: number; storesCount: number }> {
  return api("/api/partners/stats");
}

export function getPartnerApplications(): Promise<PartnerApplication[]> {
  return api("/api/partners/applications");
}

export function updatePartnerApplicationStatus(id: string, status: "approved" | "rejected"): Promise<void> {
  return api("/api/partners/applications/status", {
    method: "PATCH",
    body: JSON.stringify({ id, status }),
  });
}
