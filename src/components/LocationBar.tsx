import { useState } from "react";
import "./LocationBar.css";

const cities = ["الرياض", "جدة", "الدمام"];

export default function LocationBar() {
  const [selectedCity, setSelectedCity] = useState(cities[0]);
  const [open, setOpen] = useState(false);

  return (
    <div className="location-bar-wrap">
      <button
        type="button"
        className="location-bar"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="اختر المدينة"
      >
        <span className="location-bar__city">{selectedCity}</span>
        <span className="location-bar__arrow" aria-hidden="true">▼</span>
      </button>
      {open && (
        <ul
          className="location-bar__dropdown"
          role="listbox"
          aria-label="المدن"
        >
          {cities.map((c) => (
            <li
              key={c}
              role="option"
              aria-selected={c === selectedCity}
              className="location-bar__option"
              onClick={() => {
                setSelectedCity(c);
                setOpen(false);
              }}
            >
              {c}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
