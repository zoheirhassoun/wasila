import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Stores from "./pages/Stores";
import StoreDetail from "./pages/StoreDetail";
import Cart from "./pages/Cart";
import Rides from "./pages/Rides";
import Restaurants from "./pages/Restaurants";
import RestaurantDetail from "./pages/RestaurantDetail";
import Flights from "./pages/Flights";
import More from "./pages/More";
import Partner from "./pages/Partner";
import PartnerDashboard from "./pages/PartnerDashboard";
import PartnerApiDocs from "./pages/PartnerApiDocs";
import Services from "./pages/Services";
import ServicesList from "./pages/ServicesList";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="stores" element={<Stores />} />
        <Route path="stores/:id" element={<StoreDetail />} />
        <Route path="cart" element={<Cart />} />
        <Route path="rides" element={<Rides />} />
        <Route path="restaurants" element={<Restaurants />} />
        <Route path="restaurants/:id" element={<RestaurantDetail />} />
        <Route path="flights" element={<Flights />} />
        <Route path="services" element={<ServicesList />} />
        <Route path="services/:id" element={<Services />} />
        <Route path="more" element={<More />} />
      </Route>
      <Route path="/partner" element={<Partner />} />
      <Route path="/partner/dashboard" element={<PartnerDashboard />} />
      <Route path="/partner/api-docs" element={<PartnerApiDocs />} />
    </Routes>
  );
}
