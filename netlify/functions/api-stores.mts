import type { Context, Config } from "@netlify/functions";
import { getJson, setJson, ensureSeed } from "./blob-store.mts";

interface Store {
  id: string;
  name: string;
  description: string;
  category: string;
  logoUrl?: string;
  partnerId?: string;
}

interface Product {
  id: string;
  storeId: string;
  name: string;
  price: number;
  imageUrl?: string;
}

const FALLBACK_STORES: Store[] = [
  { id: "s1", name: "متجر النور", description: "إلكترونيات ومنزل", category: "إلكترونيات" },
  { id: "s2", name: "متجر الأمانة", description: "أزياء ورجالي", category: "أزياء" },
];

const FALLBACK_PRODUCTS: Record<string, Product[]> = {
  s1: [
    { id: "p1", storeId: "s1", name: "سماعات لاسلكية", price: 199 },
    { id: "p2", storeId: "s1", name: "شاحن سريع", price: 89 },
  ],
  s2: [
    { id: "p3", storeId: "s2", name: "قميص رجالي", price: 120 },
    { id: "p4", storeId: "s2", name: "بنطال جينز", price: 180 },
  ],
};

export const config: Config = {
  path: ["/api/stores", "/api/stores/*"],
};

async function getStoresList(): Promise<Store[]> {
  try {
    await ensureSeed();
    const list = await getJson<Store[]>("stores");
    return list ?? FALLBACK_STORES;
  } catch {
    return FALLBACK_STORES;
  }
}

export default async (req: Request, context: Context) => {
  const url = new URL(req.url);
  const pathParts = url.pathname.replace(/^\/api\/stores\/?/, "").split("/").filter(Boolean);

  if (pathParts.length === 0) {
    const list = await getStoresList();
    return Response.json(list);
  }

  const id = pathParts[0];
  if (pathParts.length === 1 && pathParts[0] !== "products") {
    const list = await getStoresList();
    const store = list.find((s) => s.id === id);
    if (!store) return new Response(JSON.stringify({ error: "Not found" }), { status: 404, headers: { "Content-Type": "application/json" } });
    return Response.json(store);
  }

  if (pathParts[1] === "products") {
    try {
      const products = await getJson<Product[]>(`products:${id}`);
      return Response.json(products ?? FALLBACK_PRODUCTS[id] ?? []);
    } catch {
      return Response.json(FALLBACK_PRODUCTS[id] ?? []);
    }
  }

  return new Response(null, { status: 404 });
};
