import React, { useState, useRef, useEffect } from "react";
import { Search, Bell, User, LogOut, Key } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Avatar from "../../assets/Avatar.png";

const Navbar = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const notificationsRef = useRef(null);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setShowUserMenu(false);
    navigate("/");
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white border-b px-6 sm:px-6 lg:px-8 relative z-50">
      {/* Search bar - made more responsive */}
      <div className="relative w-3/4 max-w-xs lg:max-w-sm flex items-center">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="w-4 h-4 text-gray-500" />
        </div>
        <input
          type="search"
          className="lg:w-full w-3/4 p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search"
        />
      </div>

      {/* Icons and Avatar - adjusted spacing */}
      <div className=" flex items-center space-x-3 sm:space-x-4  ">
        {/* Notifications */}
        <div className="relative" ref={notificationsRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-1.5 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500 rounded-full"></span>
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
              <div className="px-4 py-2 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900">Notifications</h3>
              </div>
              <div className="max-h-[300px] overflow-y-auto">
                <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                  <p className="text-sm text-gray-800">New order received</p>
                  <p className="text-xs text-gray-500 mt-1">2 minutes ago</p>
                </div>
                <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                  <p className="text-sm text-gray-800">Payment confirmed</p>
                  <p className="text-xs text-gray-500 mt-1">1 hour ago</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-1 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <img
              src={Avatar}
              alt="User profile"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover"
            />
          </button>

          {/* User Menu Dropdown */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-44 sm:w-48 bg-white rounded-lg shadow-lg py-2 z-50">
              <button
                onClick={() => {
                  setShowUserMenu(false);
                  navigate("profile");
                }}
                className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center text-sm sm:text-base"
              >
                <User className="mr-2 h-4 w-4" />
                Profile
              </button>
              <button
                onClick={() => {
                  setShowUserMenu(false);
                  navigate("/password-reset");
                }}
                className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center text-sm sm:text-base"
              >
                <Key className="mr-2 h-4 w-4" />
                Password Reset
              </button>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center text-sm sm:text-base"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
