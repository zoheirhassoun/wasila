import { Link } from "react-router-dom";
import "./ServicesList.css";

const services = [
  { id: "cleaning", name: "خدمة النظافة", category: "تنظيف منازل ومكاتب", icon: "🧹" },
  { id: "pharmacy", name: "خدمة الصيدلية", category: "طلب أدوية وتوصيلها", icon: "💊" },
  { id: "cars", name: "خدمة السيارات", category: "صيانة وإصلاح وتشليح", icon: "🚙" },
  { id: "more", name: "خدمات أخرى", category: "المزيد قريباً", icon: "📋" },
];

export default function ServicesList() {
  return (
    <div className="services-list-page">
      <h1 className="page-title">الخدمات</h1>
      <div className="services-grid">
        {services.map((s) => (
          <Link key={s.id} to={`/services/${s.id}`} className="service-item-card">
            <div className="service-item-card__img">
              <span>{s.icon}</span>
            </div>
            <h2 className="service-item-card__name">{s.name}</h2>
            <p className="service-item-card__cat">{s.category}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
