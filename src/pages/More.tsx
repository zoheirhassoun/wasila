import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./More.css";

export default function More() {
  const { user, isAdmin } = useAuth();

  return (
    <div className="more-page">
      <h1 className="page-title">المزيد</h1>
      <nav className="more-links">
        <Link to="/cart">السلة</Link>
        {user ? (
          <>
            <Link to="/profile">الملف الشخصي</Link>
            {isAdmin && <Link to="/admin">لوحة الأدمن</Link>}
          </>
        ) : (
          <>
            <Link to="/login">تسجيل الدخول</Link>
            <Link to="/register">إنشاء حساب</Link>
          </>
        )}
        <Link to="/partner">انضم كشريك</Link>
        <Link to="/partner/dashboard">لوحة الشريك</Link>
        <Link to="/partner/api-docs">توثيق API</Link>
      </nav>
      <p className="more-about">
        وسيلة — متاجر، توصيل ركاب، مطاعم، وحجوزات طيران في تطبيق واحد.
      </p>
    </div>
  );
}
