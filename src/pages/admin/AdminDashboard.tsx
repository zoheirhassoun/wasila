import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../api/supabase";
import { getAdminUsersNeon } from "../../api/auth-neon";
import { getPartnerApplications } from "../../api/partners";
import { AUTH_BACKEND } from "../../context/AuthContext";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [usersCount, setUsersCount] = useState<number | null>(null);
  const [applicationsCount, setApplicationsCount] = useState<number | null>(null);
  const [pendingCount, setPendingCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        if (AUTH_BACKEND === "neon") {
          const users = await getAdminUsersNeon();
          if (!cancelled) setUsersCount(users.length);
        } else if (supabase) {
          const { count } = await supabase.from("profiles").select("*", { count: "exact", head: true });
          if (!cancelled) setUsersCount(count ?? 0);
        } else if (!cancelled) {
          setUsersCount(0);
        }
        const apps = await getPartnerApplications();
        if (!cancelled) {
          setApplicationsCount(apps.length);
          setPendingCount(apps.filter((a) => a.status === "pending").length);
        }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "فشل التحميل");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  if (loading) return <div className="page-loading">جاري التحميل...</div>;
  if (error) return <div className="page-error">{error}</div>;

  return (
    <div className="admin-dashboard">
      <h1 className="admin-dashboard__title">نظرة عامة</h1>
      <div className="admin-dashboard__grid">
        <div className="admin-dashboard__card">
          <span className="admin-dashboard__card-value">{usersCount ?? 0}</span>
          <span className="admin-dashboard__card-label">المستخدمون</span>
          <Link to="/admin/users" className="admin-dashboard__card-link">عرض</Link>
        </div>
        <div className="admin-dashboard__card">
          <span className="admin-dashboard__card-value">{applicationsCount ?? 0}</span>
          <span className="admin-dashboard__card-label">طلبات الشركاء</span>
          <Link to="/admin/partners" className="admin-dashboard__card-link">عرض</Link>
        </div>
        <div className="admin-dashboard__card admin-dashboard__card--highlight">
          <span className="admin-dashboard__card-value">{pendingCount ?? 0}</span>
          <span className="admin-dashboard__card-label">قيد المراجعة</span>
        </div>
      </div>
    </div>
  );
}
