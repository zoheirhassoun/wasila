import { api } from "./client";
import type { Restaurant, MenuItem } from "../types";

export function getRestaurants(): Promise<Restaurant[]> {
  return api("/api/restaurants");
}

export function getRestaurant(id: string): Promise<Restaurant> {
  return api(`/api/restaurants/${id}`);
}

export function getRestaurantMenu(restaurantId: string): Promise<MenuItem[]> {
  return api(`/api/restaurants/${restaurantId}/menu`);
}
