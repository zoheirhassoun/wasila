import { api } from "./client";

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
