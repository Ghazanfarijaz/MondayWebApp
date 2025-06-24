// library imports
import { Outlet } from "react-router-dom";
import Navbar from "../components/LayoutComponents/Navbar";
import RouteGuard from "../components/RouteGuard";

export default function MainPage() {
  return (
    <RouteGuard>
      <div className="flex flex-col h-screen w-screen">
        {/* Right side: Navbar at the top, then Board below */}
        <Navbar />
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </RouteGuard>
  );
}
