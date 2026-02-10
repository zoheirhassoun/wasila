import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./AdminLayout.css";

export default function AdminLayout() {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleLogout = () => {
    signOut();
    navigate("/");
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <h1 className="admin-sidebar__title">لوحة الأدمن</h1>
        <nav className="admin-sidebar__nav">
          <NavLink to="/admin" end className={({ isActive }) => `admin-sidebar__link ${isActive ? "admin-sidebar__link--active" : ""}`}>
            الرئيسية
          </NavLink>
          <NavLink to="/admin/users" className={({ isActive }) => `admin-sidebar__link ${isActive ? "admin-sidebar__link--active" : ""}`}>
            المستخدمون
          </NavLink>
          <NavLink to="/admin/partners" className={({ isActive }) => `admin-sidebar__link ${isActive ? "admin-sidebar__link--active" : ""}`}>
            طلبات الشركاء
          </NavLink>
        </nav>
        <button type="button" className="admin-sidebar__logout" onClick={handleLogout}>
          تسجيل الخروج
        </button>
      </aside>
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}
