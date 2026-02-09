import { NavLink } from "react-router-dom";
import HomeIcon from "./icons/HomeIcon";
import "./BottomNav.css";

const items = [
  { to: "/", label: "رئيسية", icon: "home" },
  { to: "/stores", label: "متاجر", icon: "🛒" },
  { to: "/rides", label: "توصيل", icon: "🚗" },
  { to: "/flights", label: "طيران", icon: "✈" },
  { to: "/more", label: "المزيد", icon: "⋯" },
];

export default function BottomNav() {
  return (
    <nav className="bottom-nav" role="navigation" aria-label="التنقل الرئيسي">
      {items.map(({ to, label, icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) => `bottom-nav__item ${isActive ? "bottom-nav__item--active" : ""}`}
          end={to === "/"}
        >
          {icon === "home" ? (
            <span className="bottom-nav__icon bottom-nav__icon-svg">
              <HomeIcon size={24} />
            </span>
          ) : (
            <span className="bottom-nav__icon">{icon}</span>
          )}
          <span className="bottom-nav__label">{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
