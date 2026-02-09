import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { CartItem } from "../types";

type CartContextValue = {
  cart: CartItem[];
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (productId: string) => void;
  updateQty: (productId: string, quantity: number) => void;
  clear: () => void;
  addConfirmOpen: boolean;
  closeAddConfirm: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [addConfirmOpen, setAddConfirmOpen] = useState(false);

  const addItem = useCallback((item: Omit<CartItem, "quantity"> & { quantity?: number }) => {
    const qty = item.quantity ?? 1;
    setCart((prev) => {
      const i = prev.findIndex((x) => x.productId === item.productId);
      if (i >= 0) {
        const next = [...prev];
        next[i].quantity += qty;
        return next;
      }
      return [...prev, { ...item, quantity: qty }];
    });
    setAddConfirmOpen(true);
  }, []);

  const closeAddConfirm = useCallback(() => setAddConfirmOpen(false), []);

  const removeItem = useCallback((productId: string) => {
    setCart((prev) => prev.filter((x) => x.productId !== productId));
  }, []);

  const updateQty = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((x) => x.productId !== productId));
      return;
    }
    setCart((prev) =>
      prev.map((x) => (x.productId === productId ? { ...x, quantity } : x))
    );
  }, []);

  const clear = useCallback(() => setCart([]), []);

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, updateQty, clear, addConfirmOpen, closeAddConfirm }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
