// library imports
import { Outlet } from "react-router-dom";
import Sidebar from "../components/LayoutComponents/Sidebar";
import Navbar from "../components/LayoutComponents/Navbar";
import RouteGuard from "../components/RouteGuard";

export default function MainPage() {
  return (
    <RouteGuard>
      <div className="flex h-screen">
        {/* Sidebar on the left, full height */}
        <Sidebar />

        {/* Right side: Navbar at the top, then Board below */}
        <div className="flex flex-col flex-1">
          <Navbar />
          <div className="flex-1 overflow-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </RouteGuard>
  );
}
