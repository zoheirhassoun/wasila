import { Link } from "react-router-dom";
import "./Home.css";

const services = [
  { to: "/stores", title: "متاجر", desc: "تسوق من متاجر وسيلة والشركاء", icon: "🛒" },
  { to: "/rides", title: "توصيل ركاب", desc: "احجز رحلة بسرعة وأمان", icon: "🚗" },
  { to: "/restaurants", title: "توصيل مطاعم", desc: "اطلب من مطاعمك المفضلة", icon: "🍽" },
  { to: "/flights", title: "حجوزات طيران", desc: "ابحث واحجز رحلاتك", icon: "✈" },
];

export default function Home() {
  return (
    <div className="home">
      <header className="home__header">
        <h1 className="home__title">وسيلة</h1>
        <p className="home__subtitle">كل ما تحتاجه في تطبيق واحد</p>
      </header>
      <section className="home__services">
        {services.map((s) => (
          <Link key={s.to} to={s.to} className="service-card">
            <span className="service-card__icon">{s.icon}</span>
            <div className="service-card__text">
              <h2 className="service-card__title">{s.title}</h2>
              <p className="service-card__desc">{s.desc}</p>
            </div>
            <span className="service-card__arrow">←</span>
          </Link>
        ))}
      </section>
      <section className="home__partner">
        <Link to="/partner" className="partner-cta">
          انضم كشريك واربط متجرك بوسيلة
        </Link>
      </section>
    </div>
  );
}
