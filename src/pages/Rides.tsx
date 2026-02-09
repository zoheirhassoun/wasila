import { useState } from "react";
import { requestRide } from "../api/rides";
import "./Rides.css";

export default function Rides() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [type, setType] = useState("economy");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ requestId: string; estimatedPrice?: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);
    setLoading(true);
    try {
      const data = await requestRide({ from, to, type });
      setResult(data);
    } catch {
      setError("فشل إنشاء الطلب");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rides-page">
      <h1 className="page-title">توصيل ركاب</h1>
      <form className="rides-form" onSubmit={handleSubmit}>
        <label>
          من
          <input
            type="text"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            placeholder="نقطة الانطلاق"
            required
          />
        </label>
        <label>
          إلى
          <input
            type="text"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="الوجهة"
            required
          />
        </label>
        <label>
          نوع الرحلة
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="economy">اقتصادي</option>
            <option value="comfort">مريح</option>
            <option value="premium">بريميوم</option>
          </select>
        </label>
        {error && <p className="form-error">{error}</p>}
        {result && (
          <div className="rides-result">
            <p>تم إنشاء الطلب بنجاح.</p>
            {result.estimatedPrice != null && (
              <p>السعر التقديري: {result.estimatedPrice} ر.س</p>
            )}
          </div>
        )}
        <button type="submit" className="btn btn--primary btn--block" disabled={loading}>
          {loading ? "جاري الحجز..." : "احجز رحلة"}
        </button>
      </form>
    </div>
  );
}
