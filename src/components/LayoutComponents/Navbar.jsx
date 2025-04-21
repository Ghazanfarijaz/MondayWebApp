import React, { useState } from "react";
import { Search, Bell } from "lucide-react";
import ControlledMenu from "../UIComponents/ProfileMenu";
import Avatar from "../../assets/Avatar.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex items-center justify-between p-4 bg-white border-b px-[40px] relative z-50">
      {/* Search bar */}
      <div className="relative w-full max-w-md">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="w-4 h-4 text-gray-500" />
        </div>
        <input
          type="search"
          className="w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search"
        />
      </div>

      {/* Icons and Avatar */}
      <div className="flex items-center space-x-4">
        <button className="relative p-1 rounded-full hover:bg-gray-100">
          <Bell className="w-6 h-6" />
          <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
        </button>

        {/* Removed extra `relative` wrapper */}
        <ControlledMenu
          isOpen={menuOpen}
          onOpenChange={setMenuOpen}
          targetElement={
            <img
              className="w-8 h-8 rounded-full cursor-pointer"
              src={Avatar}
              alt="User"
              onClick={() => setMenuOpen(!menuOpen)}
            />
          }
        />
      </div>
    </div>
  );
};

export default Navbar;
