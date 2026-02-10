import { useEffect, useState } from "react";
import { getPartnerApplications, updatePartnerApplicationStatus, type PartnerApplication } from "../../api/partners";
import "./AdminPartners.css";

const TYPE_LABELS: Record<string, string> = {
  store: "متجر",
  ride: "توصيل ركاب",
  restaurant: "مطعم",
  flight: "طيران",
};

export default function AdminPartners() {
  const [applications, setApplications] = useState<PartnerApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPartnerApplications();
      setApplications(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "فشل تحميل الطلبات");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleStatus = async (id: string, status: "approved" | "rejected") => {
    setUpdatingId(id);
    try {
      await updatePartnerApplicationStatus(id, status);
      setApplications((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
    } catch {
      setError("فشل تحديث الحالة");
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) return <div className="page-loading">جاري التحميل...</div>;
  if (error) return <div className="page-error">{error}</div>;

  return (
    <div className="admin-partners">
      <h1 className="admin-partners__title">طلبات الشركاء</h1>
      {applications.length === 0 ? (
        <p className="empty-state">لا توجد طلبات</p>
      ) : (
        <div className="admin-partners__list">
          {applications.map((app) => (
            <div key={app.id} className="admin-partners__card">
              <div className="admin-partners__card-body">
                <p className="admin-partners__card-row">
                  <span className="admin-partners__label">نوع الخدمة</span>
                  <span>{TYPE_LABELS[app.type] ?? app.type}</span>
                </p>
                <p className="admin-partners__card-row">
                  <span className="admin-partners__label">الشركة</span>
                  <span>{app.companyName}</span>
                </p>
                <p className="admin-partners__card-row">
                  <span className="admin-partners__label">البريد</span>
                  <span>{app.contactEmail}</span>
                </p>
                <p className="admin-partners__card-row">
                  <span className="admin-partners__label">الجوال</span>
                  <span>{app.contactPhone}</span>
                </p>
                <p className="admin-partners__card-row">
                  <span className="admin-partners__label">التاريخ</span>
                  <span>{new Date(app.createdAt).toLocaleDateString("ar-SA")}</span>
                </p>
                <p className="admin-partners__card-row">
                  <span className="admin-partners__label">الحالة</span>
                  <span className={`admin-partners__status admin-partners__status--${app.status}`}>
                    {app.status === "pending" ? "قيد المراجعة" : app.status === "approved" ? "مقبول" : "مرفوض"}
                  </span>
                </p>
              </div>
              {app.status === "pending" && (
                <div className="admin-partners__actions">
                  <button
                    type="button"
                    className="btn btn--primary"
                    disabled={updatingId === app.id}
                    onClick={() => handleStatus(app.id, "approved")}
                  >
                    {updatingId === app.id ? "..." : "قبول"}
                  </button>
                  <button
                    type="button"
                    className="btn btn--outline"
                    disabled={updatingId === app.id}
                    onClick={() => handleStatus(app.id, "rejected")}
                  >
                    رفض
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
