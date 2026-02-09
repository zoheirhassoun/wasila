import { api } from "./client";
import type { Store, Product } from "../types";

const API = "/api";

const DEV_STORES: Store[] = [
  { id: "s1", name: "متجر النور", description: "إلكترونيات ومنزل", category: "إلكترونيات" },
  { id: "s2", name: "متجر الأمانة", description: "أزياء ورجالي", category: "أزياء" },
];

const DEV_PRODUCTS: Record<string, Product[]> = {
  s1: [
    { id: "p1", storeId: "s1", name: "سماعات لاسلكية", price: 199 },
    { id: "p2", storeId: "s1", name: "شاحن سريع", price: 89 },
  ],
  s2: [
    { id: "p3", storeId: "s2", name: "قميص رجالي", price: 120 },
    { id: "p4", storeId: "s2", name: "بنطال جينز", price: 180 },
  ],
};

async function withDevFallback<T>(fn: () => Promise<T>, devFallback: T): Promise<T> {
  try {
    return await fn();
  } catch {
    if (import.meta.env.DEV) return devFallback;
    throw new Error("فشل تحميل المتاجر");
  }
}

export function getStores(): Promise<Store[]> {
  return withDevFallback(() => api<Store[]>(`${API}/stores`), DEV_STORES);
}

export function getStore(id: string): Promise<Store> {
  return withDevFallback(
    () => api<Store>(`${API}/stores/${id}`),
    DEV_STORES.find((s) => s.id === id) ?? DEV_STORES[0]
  );
}

export function getStoreProducts(storeId: string): Promise<Product[]> {
  return withDevFallback(
    () => api<Product[]>(`${API}/stores/${storeId}/products`),
    DEV_PRODUCTS[storeId] ?? []
  );
}

export function createOrder(payload: {
  storeId: string;
  items: { productId: string; quantity: number; price: number }[];
  address?: string;
}): Promise<{ orderId: string }> {
  return api<{ orderId: string }>(`${API}/orders`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
