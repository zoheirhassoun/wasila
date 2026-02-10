import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./TopBar.css";

export default function TopBar() {
  const { cart } = useCart();
  const count = cart.reduce((s, i) => s + i.quantity, 0);

  return (
    <header className="top-bar">
      <Link to="/cart" className="top-bar__cart" aria-label="السلة">
        <span className="top-bar__cart-icon">🛒</span>
        {count > 0 && (
          <span className="top-bar__cart-badge" aria-hidden="true">{count > 99 ? "99+" : count}</span>
        )}
      </Link>
      <div className="top-bar__search-wrap">
        <input
          type="search"
          className="top-bar__search"
          placeholder="بحث وسيلة"
          aria-label="بحث"
          readOnly
          onFocus={(e) => e.target.blur()}
        />
      </div>
      <Link to="/" className="top-bar__brand" aria-label="وسيلة">
        <span className="top-bar__logo-icon" aria-hidden="true">★</span>
        <span className="top-bar__title">وسيلة</span>
      </Link>
    </header>
  );
}
