import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRestaurants } from "../api/restaurants";
import type { Restaurant } from "../types";
import "./Restaurants.css";

export default function Restaurants() {
  const [list, setList] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getRestaurants()
      .then(setList)
      .catch(() => setError("فشل تحميل المطاعم"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="page-loading">جاري التحميل...</div>;
  if (error) return <div className="page-error">{error}</div>;

  return (
    <div className="restaurants-page">
      <h1 className="page-title">توصيل مطاعم</h1>
      <div className="stores-grid">
        {list.length === 0 ? (
          <p className="empty-state">لا مطاعم حالياً.</p>
        ) : (
          list.map((r) => (
            <Link key={r.id} to={`/restaurants/${r.id}`} className="store-card">
              <div className="store-card__img">
                {r.logoUrl ? <img src={r.logoUrl} alt="" /> : <span>🍽</span>}
              </div>
              <h2 className="store-card__name">{r.name}</h2>
              <p className="store-card__cat">{r.description}</p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
