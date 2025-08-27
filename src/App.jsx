import "./App.css";
import { Outlet } from "react-router-dom";
import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";

export default function App() {
  return (
    <React.Fragment>
      <div className="flex flex-col h-screen w-screen">
        {/* Right side: Navbar at the top, then Board below */}
        <Navbar />
        <div className="w-full h-full flex overflow-x-hidden">
          <Sidebar />
          <div className="w-full overflow-y-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
