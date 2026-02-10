import { useEffect, useState } from "react";
import { supabase } from "../../api/supabase";
import { getAdminUsersNeon } from "../../api/auth-neon";
import { AUTH_BACKEND } from "../../context/AuthContext";
import type { Profile } from "../../api/supabase";
import "./AdminUsers.css";

export default function AdminUsers() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        if (AUTH_BACKEND === "neon") {
          const data = await getAdminUsersNeon();
          if (!cancelled) setProfiles(data);
        } else if (supabase) {
          const { data, error: err } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
          if (err) throw err;
          if (!cancelled) setProfiles((data as Profile[]) ?? []);
        } else if (!cancelled) {
          setProfiles([]);
        }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "فشل تحميل المستخدمين");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  if (loading) return <div className="page-loading">جاري التحميل...</div>;
  if (error) return <div className="page-error">{error}</div>;
  if (AUTH_BACKEND !== "neon" && !supabase) return <div className="page-error">Supabase غير مهيأ</div>;

  return (
    <div className="admin-users">
      <h1 className="admin-users__title">المستخدمون</h1>
      {profiles.length === 0 ? (
        <p className="empty-state">لا يوجد مستخدمون</p>
      ) : (
        <div className="admin-users__table-wrap">
          <table className="admin-users__table">
            <thead>
              <tr>
                <th>البريد</th>
                <th>الاسم</th>
                <th>الدور</th>
                <th>تاريخ الإنشاء</th>
              </tr>
            </thead>
            <tbody>
              {profiles.map((p) => (
                <tr key={p.id}>
                  <td>{p.email}</td>
                  <td>{p.full_name ?? "—"}</td>
                  <td><span className={`admin-users__role admin-users__role--${p.role}`}>{p.role === "admin" ? "مدير" : "مستخدم"}</span></td>
                  <td>{new Date(p.created_at).toLocaleDateString("ar-SA")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
