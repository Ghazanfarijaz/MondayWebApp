import "./App.css";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

export default function App() {
  return (
    <div className="flex flex-col h-screen w-screen">
      <Navbar />
      <Outlet />
    </div>
  );
}
