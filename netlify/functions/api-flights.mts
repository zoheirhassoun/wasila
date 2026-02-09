import type { Config } from "@netlify/functions";
import { getJson, setJson } from "./blob-store.mts";

interface Flight {
  id: string;
  from: string;
  to: string;
  date: string;
  time: string;
  price: number;
  airline: string;
}

const MOCK_FLIGHTS: Flight[] = [
  { id: "f1", from: "RUH", to: "JED", date: "2025-02-15", time: "08:00", price: 350, airline: "الخطوط السعودية" },
  { id: "f2", from: "RUH", to: "JED", date: "2025-02-15", time: "14:00", price: 420, airline: "ناس" },
  { id: "f3", from: "RUH", to: "JED", date: "2025-02-15", time: "20:00", price: 380, airline: "فلاي دبي" },
];

export const config: Config = {
  path: ["/api/flights", "/api/flights/book"],
};

export default async (req: Request) => {
  const url = new URL(req.url);

  if (url.pathname === "/api/flights" && req.method === "GET") {
    const from = url.searchParams.get("from") ?? "";
    const to = url.searchParams.get("to") ?? "";
    const date = url.searchParams.get("date") ?? "";
    const filtered = MOCK_FLIGHTS.filter(
      (f) => f.from.toUpperCase().includes(from.toUpperCase()) && f.to.toUpperCase().includes(to.toUpperCase()) && (date ? f.date === date : true)
    );
    return Response.json(filtered);
  }

  if (url.pathname === "/api/flights/book" && req.method === "POST") {
    const body = await req.json() as { flightId: string };
    const bookings = (await getJson<unknown[]>("bookings")) ?? [];
    const bookingId = `bk-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    bookings.push({ id: bookingId, flightId: body.flightId, createdAt: new Date().toISOString() });
    await setJson("bookings", bookings);
    return Response.json({ bookingId });
  }

  return new Response(null, { status: 404 });
};
