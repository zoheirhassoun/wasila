import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { submitPartnerApplication } from "../api/partners";
import "./Partner.css";

export default function Partner() {
  const navigate = useNavigate();
  const [type, setType] = useState<"store" | "ride" | "restaurant" | "flight">("store");
  const [companyName, setCompanyName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      setError("يرجى الموافقة على الشروط");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      await submitPartnerApplication({
        type,
        companyName,
        contactEmail,
        contactPhone,
      });
      setDone(true);
    } catch {
      setError("فشل إرسال الطلب");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="partner-page">
        <div className="partner-done">
          <h1>تم إرسال طلبك</h1>
          <p>سنراجع بياناتك ونتواصل معك قريباً.</p>
          <button type="button" className="btn btn--primary" onClick={() => navigate("/")}>
            العودة للرئيسية
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="partner-page">
      <h1 className="page-title">انضم كشريك</h1>
      <form className="partner-form" onSubmit={handleSubmit}>
        <label>
          نوع الخدمة
          <select value={type} onChange={(e) => setType(e.target.value as typeof type)}>
            <option value="store">متجر</option>
            <option value="ride">توصيل ركاب</option>
            <option value="restaurant">مطعم</option>
            <option value="flight">طيران</option>
          </select>
        </label>
        <label>
          اسم الشركة
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
        </label>
        <label>
          البريد الإلكتروني
          <input
            type="email"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            required
          />
        </label>
        <label>
          رقم الجوال
          <input
            type="tel"
            value={contactPhone}
            onChange={(e) => setContactPhone(e.target.value)}
            required
          />
        </label>
        <label className="partner-check">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          أوافق على شروط الانضمام والاستخدام
        </label>
        {error && <p className="form-error">{error}</p>}
        <button type="submit" className="btn btn--primary btn--block" disabled={loading}>
          {loading ? "جاري الإرسال..." : "إرسال الطلب"}
        </button>
      </form>
      <p className="partner-footer">
        <a href="/partner/api-docs">توثيق API للشركاء</a>
      </p>
    </div>
  );
}
