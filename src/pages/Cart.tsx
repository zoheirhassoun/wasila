import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { createOrder } from "../api/stores";
import { useState } from "react";
import "./Cart.css";

export default function Cart() {
  const { cart, removeItem, updateQty, clear } = useCart();
  const [placing, setPlacing] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const storeId = cart[0]?.storeId;
  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  const handlePlaceOrder = async () => {
    if (!storeId || cart.length === 0) return;
    setError(null);
    setPlacing(true);
    try {
      const { orderId: id } = await createOrder({
        storeId,
        items: cart.map((i) => ({ productId: i.productId, quantity: i.quantity, price: i.price })),
      });
      setOrderId(id);
      clear();
    } catch {
      setError("فشل تقديم الطلب");
    } finally {
      setPlacing(false);
    }
  };

  if (cart.length === 0 && !orderId) {
    return (
      <div className="cart-page">
        <h1 className="page-title">السلة</h1>
        <p className="empty-state">السلة فارغة.</p>
        <Link to="/stores" className="btn btn--primary">تصفح المتاجر</Link>
      </div>
    );
  }

  if (orderId) {
    return (
      <div className="cart-page">
        <h1 className="page-title">تم الطلب</h1>
        <p className="success-msg">رقم الطلب: {orderId}</p>
        <Link to="/stores" className="btn btn--primary">العودة للمتاجر</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1 className="page-title">السلة</h1>
      <ul className="cart-list">
        {cart.map((i) => (
          <li key={i.productId} className="cart-item">
            <div className="cart-item__info">
              <h3>{i.name}</h3>
              <p>{i.price} ر.س × {i.quantity}</p>
            </div>
            <div className="cart-item__actions">
              <button type="button" onClick={() => updateQty(i.productId, i.quantity - 1)}>−</button>
              <span>{i.quantity}</span>
              <button type="button" onClick={() => updateQty(i.productId, i.quantity + 1)}>+</button>
              <button type="button" className="cart-item__remove" onClick={() => removeItem(i.productId)}>حذف</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="cart-total">
        الإجمالي: {total} ر.س
      </div>
      {error && <p className="form-error">{error}</p>}
      <button type="button" className="btn btn--primary btn--block" onClick={handlePlaceOrder} disabled={placing}>
        {placing ? "جاري التقديم..." : "تأكيد الطلب"}
      </button>
    </div>
  );
}
