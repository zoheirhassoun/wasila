import { useAuth } from "../context/AuthContext";
import "./Profile.css";

export default function Profile() {
  const { user, profile, signOut } = useAuth();

  return (
    <div className="profile-page">
      <h1 className="page-title">الملف الشخصي</h1>
      <div className="profile-card">
        {profile?.full_name && (
          <p className="profile-card__row">
            <span className="profile-card__label">الاسم</span>
            <span>{profile.full_name}</span>
          </p>
        )}
        <p className="profile-card__row">
          <span className="profile-card__label">البريد</span>
          <span>{user?.email ?? profile?.email ?? "—"}</span>
        </p>
        <p className="profile-card__row">
          <span className="profile-card__label">الدور</span>
          <span>{profile?.role === "admin" ? "مدير" : "مستخدم"}</span>
        </p>
      </div>
      <button type="button" className="btn btn--outline btn--block" onClick={() => signOut()}>
        تسجيل الخروج
      </button>
    </div>
  );
}
