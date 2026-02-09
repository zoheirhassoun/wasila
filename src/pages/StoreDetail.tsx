import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getStore, getStoreProducts } from "../api/stores";
import { useCart } from "../context/CartContext";
import type { Store, Product } from "../types";
import "./StoreDetail.css";

export default function StoreDetail() {
  const { id } = useParams<{ id: string }>();
  const [store, setStore] = useState<Store | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addItem, cart } = useCart();

  useEffect(() => {
    if (!id) return;
    Promise.all([getStore(id), getStoreProducts(id)])
      .then(([s, p]) => {
        setStore(s);
        setProducts(p);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading || !store) return <div className="page-loading">جاري التحميل...</div>;

  return (
    <div className="store-detail">
      <header className="store-detail__header">
        <div className="store-detail__logo">
          {store.logoUrl ? <img src={store.logoUrl} alt="" /> : "🛒"}
        </div>
        <h1 className="store-detail__name">{store.name}</h1>
        <p className="store-detail__desc">{store.description}</p>
      </header>
      <section className="store-detail__products">
        <h2>المنتجات</h2>
        {products.length === 0 ? (
          <p className="empty-state">لا منتجات حالياً.</p>
        ) : (
          <ul className="product-list">
            {products.map((p) => (
              <li key={p.id} className="product-card">
                <div className="product-card__info">
                  <h3>{p.name}</h3>
                  <p className="product-card__price">{p.price} ر.س</p>
                </div>
                <button
                  type="button"
                  className="btn btn--primary"
                  onClick={() => addItem({ productId: p.id, storeId: store.id, name: p.name, price: p.price, quantity: 1 })}
                >
                  أضف للسلة
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
      {cart.length > 0 && (
        <footer className="store-detail__cart-bar">
          <span>{cart.length} صنف</span>
          <Link to="/cart">عرض السلة</Link>
        </footer>
      )}
    </div>
  );
}
