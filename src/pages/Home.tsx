import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getStores } from "../api/stores";
import type { Store } from "../types";
import "./Home.css";

const categories = [
  { to: "/stores", title: "متاجر", icon: "🛒" },
  { to: "/rides", title: "توصيل ركاب", icon: "🚗" },
  { to: "/restaurants", title: "مطاعم", icon: "🍽" },
  { to: "/flights", title: "طيران وفنادق", icon: "✈" },
  { to: "/services", title: "الخدمات", icon: "📋" },
];

const bannerSlides = [
  {
    image: "https://picsum.photos/seed/wasila1/800/320",
    title: "عروض وسيلة",
    subtitle: "يصل إلى %50",
    price: "ابتداء من 70 ر.س",
  },
  {
    image: "https://picsum.photos/seed/wasila2/800/320",
    title: "تسوق من متاجر الشركاء",
    subtitle: "عروض حصرية",
    price: "توصيل سريع",
  },
];

export default function Home() {
  const [bannerIndex, setBannerIndex] = useState(0);
  const [featuredStores, setFeaturedStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStores()
      .then((stores) => setFeaturedStores(stores.slice(0, 6)))
      .catch(() => setFeaturedStores([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setBannerIndex((i) => (i + 1) % bannerSlides.length);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="home">
      <section className="home__banner">
        <div className="home__banner-track" style={{ transform: `translateX(${-bannerIndex * 100}%)` }}>
          {bannerSlides.map((slide, i) => (
            <div key={i} className="home__banner-slide">
              <img src={slide.image} alt="" className="home__banner-img" />
              <div className="home__banner-overlay">
                <h2 className="home__banner-title">{slide.title}</h2>
                <p className="home__banner-subtitle">{slide.subtitle}</p>
                <p className="home__banner-price">{slide.price}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="home__banner-dots">
          {bannerSlides.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`home__banner-dot ${i === bannerIndex ? "home__banner-dot--active" : ""}`}
              aria-label={`شريحة ${i + 1}`}
              onClick={() => setBannerIndex(i)}
            />
          ))}
        </div>
      </section>

      <section className="home__section">
        <h2 className="home__section-title">الفئات</h2>
        <div className="home__categories-scroll">
          {categories.map((c) => (
            <Link key={c.to} to={c.to} className="home__category-card">
              <span className="home__category-icon">{c.icon}</span>
              <span className="home__category-label">{c.title}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="home__section">
        <h2 className="home__section-title">عروض اليوم</h2>
        {loading ? (
          <p className="home__loading">جاري التحميل...</p>
        ) : featuredStores.length === 0 ? (
          <p className="home__empty">لا توجد عروض حالياً.</p>
        ) : (
          <div className="home__deals-grid">
            {featuredStores.map((s, i) => (
              <Link key={s.id} to={`/stores/${s.id}`} className="home__deal-card">
                {i === 0 && <span className="home__deal-card__badge">عرض خاص</span>}
                <div className="home__deal-card__img">
                  {s.logoUrl ? (
                    <img src={s.logoUrl} alt="" />
                  ) : (
                    <span className="home__deal-card__placeholder">🛒</span>
                  )}
                </div>
                <h3 className="home__deal-card__name">{s.name}</h3>
                <p className="home__deal-card__cat">{s.category}</p>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="home__partner">
        <Link to="/partner" className="partner-cta">
          انضم كشريك واربط متجرك بوسيلة
        </Link>
      </section>
    </div>
  );
}
