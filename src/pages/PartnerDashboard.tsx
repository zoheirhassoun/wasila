import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPartnerStats } from "../api/partners";
import "./More.css";
import "./PartnerDashboard.css";

export default function PartnerDashboard() {
  const [stats, setStats] = useState<{ ordersCount: number; storesCount: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPartnerStats()
      .then(setStats)
      .catch(() => setStats({ ordersCount: 0, storesCount: 0 }))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="more-page">
      <h1 className="page-title">لوحة الشريك</h1>
      {loading ? (
        <p className="page-loading">جاري التحميل...</p>
      ) : (
        <div className="dashboard-stats">
          <div className="stat-card">
            <span className="stat-value">{stats?.ordersCount ?? 0}</span>
            <span className="stat-label">الطلبات</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{stats?.storesCount ?? 0}</span>
            <span className="stat-label">المتاجر/النقاط</span>
          </div>
        </div>
      )}
      <nav className="more-links">
        <Link to="/partner/api-docs">توثيق API</Link>
        <Link to="/">العودة للتطبيق</Link>
      </nav>
    </div>
  );
}
