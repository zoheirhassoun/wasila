import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getStores } from "../api/stores";
import type { Store } from "../types";
import "./Stores.css";

export default function Stores() {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getStores()
      .then(setStores)
      .catch(() => setError("فشل تحميل المتاجر"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="page-loading">جاري التحميل...</div>;
  if (error) return <div className="page-error">{error}</div>;

  return (
    <div className="stores-page">
      <h1 className="page-title">المتاجر</h1>
      <div className="stores-grid">
        {stores.length === 0 ? (
          <p className="empty-state">لا توجد متاجر حالياً.</p>
        ) : (
          stores.map((s, i) => (
            <Link key={s.id} to={`/stores/${s.id}`} className="store-card">
              {i === 0 && <span className="store-card__badge">عرض خاص</span>}
              <div className="store-card__img">
                {s.logoUrl ? <img src={s.logoUrl} alt="" /> : <span>🛒</span>}
              </div>
              <h2 className="store-card__name">{s.name}</h2>
              <p className="store-card__cat">{s.category}</p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
