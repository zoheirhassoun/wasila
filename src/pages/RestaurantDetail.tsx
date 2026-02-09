import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRestaurant, getRestaurantMenu } from "../api/restaurants";
import type { Restaurant, MenuItem } from "../types";
import "./StoreDetail.css";

export default function RestaurantDetail() {
  const { id } = useParams<{ id: string }>();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    Promise.all([getRestaurant(id), getRestaurantMenu(id)])
      .then(([r, m]) => {
        setRestaurant(r);
        setMenu(m);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading || !restaurant) return <div className="page-loading">جاري التحميل...</div>;

  return (
    <div className="store-detail">
      <header className="store-detail__header">
        <div className="store-detail__logo">
          {restaurant.logoUrl ? <img src={restaurant.logoUrl} alt="" /> : "🍽"}
        </div>
        <h1 className="store-detail__name">{restaurant.name}</h1>
        <p className="store-detail__desc">{restaurant.description}</p>
      </header>
      <section className="store-detail__products">
        <h2>قائمة الطعام</h2>
        {menu.length === 0 ? (
          <p className="empty-state">لا عناصر حالياً.</p>
        ) : (
          <ul className="product-list">
            {menu.map((p) => (
              <li key={p.id} className="product-card">
                <div className="product-card__info">
                  <h3>{p.name}</h3>
                  <p className="product-card__price">{p.price} ر.س</p>
                </div>
                <button type="button" className="btn btn--primary">
                  أضف للطلب
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
