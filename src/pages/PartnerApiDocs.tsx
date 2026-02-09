import { Link } from "react-router-dom";
import "./PartnerApiDocs.css";

export default function PartnerApiDocs() {
  return (
    <div className="api-docs">
      <h1 className="page-title">توثيق API الشركاء</h1>
      <p className="api-docs-intro">
        بعد الموافقة على طلبك، تحصل على مفتاح API لربط متجرك أو خدمتك بوسيلة.
      </p>
      <section className="api-docs-section">
        <h2>المصادقة</h2>
        <p>أضف الهيدر في كل طلب:</p>
        <pre>Authorization: Bearer YOUR_API_KEY</pre>
        <p>أو:</p>
        <pre>X-API-Key: YOUR_API_KEY</pre>
      </section>
      <section className="api-docs-section">
        <h2>Endpoints</h2>
        <ul>
          <li><code>POST /api/partner/stores</code> — تسجيل/تحديث متجر</li>
          <li><code>GET /api/partner/stores</code> — قائمة متاجرك</li>
          <li><code>POST /api/partner/stores/:id/products</code> — إضافة/تحديث منتجات</li>
          <li><code>PATCH /api/partner/orders/:id</code> — تحديث حالة الطلب</li>
        </ul>
      </section>
      <section className="api-docs-section">
        <h2>تحديث حالة الطلب</h2>
        <p>أرسل:</p>
        <pre>{"{ \"status\": \"preparing\" | \"shipped\" | \"delivered\" | \"cancelled\" }"}</pre>
      </section>
      <p className="api-docs-footer">
        <Link to="/partner">انضم كشريك</Link>
        {" · "}
        <Link to="/">العودة للتطبيق</Link>
      </p>
    </div>
  );
}
