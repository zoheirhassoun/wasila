import { Link, useParams } from "react-router-dom";
import "./Services.css";

const serviceNames: Record<string, string> = {
  cleaning: "خدمة النظافة",
  pharmacy: "خدمة الصيدلية",
  cars: "خدمة السيارات",
  more: "خدمات أخرى",
};

export default function Services() {
  const { id } = useParams<{ id: string }>();
  const title = id && serviceNames[id] ? serviceNames[id] : "الخدمات";

  return (
    <div className="services-page">
      <h1 className="services-page__title">{title}</h1>
      <p className="services-page__soon">هذه الخدمة ستكون متاحة قريباً</p>
      <Link to="/" className="services-page__back">
        ← العودة للرئيسية
      </Link>
    </div>
  );
}
