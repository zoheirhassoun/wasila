import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import HomeIcon from "./icons/HomeIcon";
import "./TopBar.css";

export default function TopBar() {
  const { cart } = useCart();
  const count = cart.reduce((s, i) => s + i.quantity, 0);

  return (
    <header className="top-bar">
      <Link to="/" className="top-bar__brand">
        <span className="top-bar__home-icon" aria-hidden="true">
          <HomeIcon size={26} />
        </span>
        <span className="top-bar__title">وسيلة</span>
      </Link>
      <Link to="/cart" className="top-bar__cart" aria-label="السلة">
        <span className="top-bar__cart-icon">🛒</span>
        {count > 0 && (
          <span className="top-bar__cart-badge" aria-hidden="true">{count > 99 ? "99+" : count}</span>
        )}
      </Link>
    </header>
  );
}
