import { getStore } from "@netlify/blobs";

const storeName = "platform-data";
export const platformStore = () => getStore({ name: storeName, consistency: "strong" });

export async function getJson<T>(key: string): Promise<T | null> {
  const store = platformStore();
  const raw = await store.get(key);
  if (raw == null) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export async function setJson(key: string, value: unknown): Promise<void> {
  const store = platformStore();
  await store.set(key, JSON.stringify(value));
}

const SEED_STORES = [
  { id: "s1", name: "متجر النور", description: "إلكترونيات ومنزل", category: "إلكترونيات", logoUrl: undefined },
  { id: "s2", name: "متجر الأمانة", description: "أزياء ورجالي", category: "أزياء", logoUrl: undefined },
];

const SEED_PRODUCTS: Record<string, { id: string; storeId: string; name: string; price: number }[]> = {
  s1: [
    { id: "p1", storeId: "s1", name: "سماعات لاسلكية", price: 199 },
    { id: "p2", storeId: "s1", name: "شاحن سريع", price: 89 },
  ],
  s2: [
    { id: "p3", storeId: "s2", name: "قميص رجالي", price: 120 },
    { id: "p4", storeId: "s2", name: "بنطال جينز", price: 180 },
  ],
};

const SEED_RESTAURANTS = [
  { id: "r1", name: "مطعم الشرق", description: "أكلات عربية ومشويات", logoUrl: undefined },
  { id: "r2", name: "بيتزا فور يو", description: "بيتزا وباستا", logoUrl: undefined },
];

const SEED_MENU: Record<string, { id: string; restaurantId: string; name: string; price: number }[]> = {
  r1: [
    { id: "m1", restaurantId: "r1", name: "شاورما لحم", price: 25 },
    { id: "m2", restaurantId: "r1", name: "كباب مشوي", price: 45 },
  ],
  r2: [
    { id: "m3", restaurantId: "r2", name: "بيتزا وسط", price: 35 },
    { id: "m4", restaurantId: "r2", name: "باستا بولونيز", price: 28 },
  ],
};

export async function ensureSeed(): Promise<void> {
  const existing = await getJson<unknown>("stores");
  if (!existing) {
    await setJson("stores", SEED_STORES);
    for (const [sid, prods] of Object.entries(SEED_PRODUCTS)) {
      await setJson(`products:${sid}`, prods);
    }
  }
  const restExisting = await getJson<unknown>("restaurants");
  if (!restExisting) {
    await setJson("restaurants", SEED_RESTAURANTS);
    for (const [rid, items] of Object.entries(SEED_MENU)) {
      await setJson(`menu:${rid}`, items);
    }
  }
}

export const config = { path: "/api/__blob-store-no-route" };
export default async () => new Response(null, { status: 404 });
