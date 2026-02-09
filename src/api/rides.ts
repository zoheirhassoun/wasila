import { api } from "./client";

export function requestRide(payload: {
  from: string;
  to: string;
  type: string;
}): Promise<{ requestId: string; estimatedPrice?: number }> {
  return api("/api/rides", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
