import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
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
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminPartners from "./pages/admin/AdminPartners";

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
        <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="partners" element={<AdminPartners />} />
      </Route>
      <Route path="/partner" element={<Partner />} />
      <Route path="/partner/dashboard" element={<PartnerDashboard />} />
      <Route path="/partner/api-docs" element={<PartnerApiDocs />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
