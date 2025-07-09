import "./App.css";
import { Outlet } from "react-router-dom";
import React from "react";
import Navbar from "./components/Navbar/Navbar";

export default function App() {
  return (
    <React.Fragment>
      <div className="flex flex-col h-screen w-screen">
        {/* Right side: Navbar at the top, then Board below */}
        <Navbar />
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </React.Fragment>
  );
}
