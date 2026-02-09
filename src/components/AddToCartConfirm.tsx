import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./AddToCartConfirm.css";

export default function AddToCartConfirm() {
  const navigate = useNavigate();
  const { addConfirmOpen, closeAddConfirm } = useCart();

  if (!addConfirmOpen) return null;

  const goToCart = () => {
    closeAddConfirm();
    navigate("/cart");
  };

  const continueBrowsing = () => {
    closeAddConfirm();
  };

  return (
    <div className="add-confirm-overlay" role="dialog" aria-modal="true" aria-labelledby="add-confirm-title">
      <div className="add-confirm">
        <p id="add-confirm-title" className="add-confirm__message">تمت الإضافة للسلة</p>
        <div className="add-confirm__actions">
          <button type="button" className="btn btn--primary" onClick={goToCart}>
            الذهاب إلى السلة
          </button>
          <button type="button" className="btn btn--outline" onClick={continueBrowsing}>
            الاستمرار في التصفح
          </button>
        </div>
      </div>
    </div>
  );
}
