import { api } from "./client";
import type { Flight } from "../types";

export function searchFlights(params: {
  from: string;
  to: string;
  date: string;
}): Promise<Flight[]> {
  const q = new URLSearchParams(params).toString();
  return api(`/api/flights?${q}`);
}

export function bookFlight(flightId: string): Promise<{ bookingId: string }> {
  return api("/api/flights/book", {
    method: "POST",
    body: JSON.stringify({ flightId }),
  });
}
