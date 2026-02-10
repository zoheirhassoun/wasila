import { Outlet } from "react-router-dom";
import TopBar from "./TopBar";
import LocationBar from "./LocationBar";
import BottomNav from "./BottomNav";
import AddToCartConfirm from "./AddToCartConfirm";
import "./Layout.css";

export default function Layout() {
  return (
    <div className="layout">
      <TopBar />
      <LocationBar />
      <main className="layout-main">
        <Outlet />
      </main>
      <BottomNav />
      <AddToCartConfirm />
    </div>
  );
}
