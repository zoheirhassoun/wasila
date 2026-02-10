import "./Loader.css";

type Props = { hidden?: boolean };

export default function Loader({ hidden }: Props) {
  return (
    <div className={`loader ${hidden ? "loader--hidden" : ""}`} role="status" aria-label="جاري التحميل">
      <div className="loader__logo">وسيلة</div>
      <p className="loader__tagline">كل ما تحتاجه في تطبيق واحد</p>
      <div className="loader__spinner" aria-hidden="true" />
    </div>
  );
}
