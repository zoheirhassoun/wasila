export interface Store {
  id: string;
  name: string;
  description: string;
  category: string;
  logoUrl?: string;
  partnerId?: string;
}

export interface Product {
  id: string;
  storeId: string;
  name: string;
  price: number;
  imageUrl?: string;
}

export interface CartItem {
  productId: string;
  storeId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface RideRequest {
  from: string;
  to: string;
  type: string;
  estimatedPrice?: number;
  status: string;
}

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  logoUrl?: string;
  partnerId?: string;
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  price: number;
  imageUrl?: string;
}

export interface Flight {
  id: string;
  from: string;
  to: string;
  date: string;
  time: string;
  price: number;
  airline: string;
}

export interface PartnerApplication {
  id: string;
  type: "store" | "ride" | "restaurant" | "flight";
  companyName: string;
  contactEmail: string;
  contactPhone: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}
