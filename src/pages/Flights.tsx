import { useState } from "react";
import { searchFlights, bookFlight } from "../api/flights";
import type { Flight } from "../types";
import "./Flights.css";

export default function Flights() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(false);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setFlights([]);
    setLoading(true);
    try {
      const data = await searchFlights({ from, to, date });
      setFlights(data);
    } catch {
      setError("فشل البحث");
    } finally {
      setLoading(false);
    }
  };

  const handleBook = async (flightId: string) => {
    setError(null);
    setLoading(true);
    try {
      const data = await bookFlight(flightId);
      setBookingId(data.bookingId);
    } catch {
      setError("فشل الحجز");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flights-page">
      <h1 className="page-title">حجوزات طيران</h1>
      <form className="flights-form" onSubmit={handleSearch}>
        <input
          type="text"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          placeholder="من"
          required
        />
        <input
          type="text"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          placeholder="إلى"
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button type="submit" className="btn btn--primary" disabled={loading}>
          {loading ? "جاري البحث..." : "بحث"}
        </button>
      </form>
      {error && <p className="form-error">{error}</p>}
      {bookingId && (
        <div className="flights-result success">
          تم الحجز بنجاح. رقم الحجز: {bookingId}
        </div>
      )}
      {flights.length > 0 && (
        <ul className="flights-list">
          {flights.map((f) => (
            <li key={f.id} className="flight-card">
              <div className="flight-card__route">
                <span>{f.from}</span>
                <span>→</span>
                <span>{f.to}</span>
              </div>
              <div className="flight-card__meta">
                <span>{f.date} {f.time}</span>
                <span>{f.airline}</span>
              </div>
              <div className="flight-card__price">
                {f.price} ر.س
                <button
                  type="button"
                  className="btn btn--primary"
                  onClick={() => handleBook(f.id)}
                  disabled={loading}
                >
                  احجز
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
