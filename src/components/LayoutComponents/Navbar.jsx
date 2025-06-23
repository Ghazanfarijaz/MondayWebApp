import { useState, useRef, useEffect } from "react";
import { LogOut, Palette, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Avatar from "../../assets/Avatar.png";
import { useAuth } from "../../contexts/AuthContext";
import Logo from "../../assets/Logo.png";

const Navbar = () => {
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  // Set the theme based on localStorage or default to light
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark", "blue");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
        setShowThemeMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      setShowUserMenu(false);
      const result = await logout();
      if (result.success) {
        navigate("/login");
      } else {
        console.error("Logout failed:", result.error);
        alert("Failed to logout. Please try again.");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white dark:bg-black blue:bg-dark-blue border-l border-l-[#eaeaea] dark:border-l-light-black blue:border-l-light-blue px-6 sm:px-6 lg:px-8 relative z-50">
      <img
        src={Logo}
        alt="Logo"
        className="object-contain w-[48px] h-[48px] cursor-pointer"
      />

      {/* Icons and Avatar - adjusted spacing */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        {/* User Profile */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center"
          >
            <img
              src={Avatar}
              alt="User profile"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover"
            />
          </button>

          {/* User Menu Dropdown */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-44 sm:w-48 bg-white dark:bg-light-black blue:bg-light-blue rounded-lg shadow-lg py-2 z-50 border border-[#EAEAEA] dark:border-[#4E4E4E] blue:border-blue">
              <div className="relative">
                <button
                  // onClick={() => setShowThemeMenu((prev) => !prev)}
                  className="w-full px-4 py-2 text-left text-gray-700 dark:text-white blue:text-white hover:bg-gray-100 dark:hover:text-black blue:hover:text-black flex items-center justify-between text-sm sm:text-base"
                  onMouseEnter={() => setShowThemeMenu(true)}
                >
                  <div className="flex items-center">
                    <Palette className="mr-2 h-4 w-4" />
                    Theme
                  </div>
                  <ChevronRight className="h-4 w-4" />
                </button>
                {showThemeMenu && (
                  <div className="absolute right-full top-0 mt-0 mr-1 w-40 bg-white dark:bg-light-black blue:bg-light-blue rounded-lg shadow-lg py-2 border border-[#EAEAEA] dark:border-[#4E4E4E] blue:border-blue dark:hover:text-black blue:hover:text-black z-50">
                    <button
                      onClick={() => {
                        setShowThemeMenu(false);
                        setShowUserMenu(false);
                        setTheme("light");
                      }}
                      className="w-full px-4 py-2 text-left text-gray-700 dark:text-white blue:text-white hover:bg-gray-100 dark:hover:text-black blue:hover:text-black text-sm"
                    >
                      Light
                    </button>
                    <button
                      onClick={() => {
                        setShowThemeMenu(false);
                        setShowUserMenu(false);
                        setTheme("dark");
                      }}
                      className="w-full px-4 py-2 text-left text-gray-700 dark:text-white blue:text-white hover:bg-gray-100 dark:hover:text-black blue:hover:text-black text-sm"
                    >
                      Dark
                    </button>
                    <button
                      onClick={() => {
                        setShowThemeMenu(false);
                        setShowUserMenu(false);
                        setTheme("blue");
                      }}
                      className="w-full px-4 py-2 text-left text-gray-700 dark:text-white blue:text-white hover:bg-gray-100 dark:hover:text-black blue:hover:text-black text-sm"
                    >
                      Blue
                    </button>
                  </div>
                )}
              </div>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-left text-gray-700 dark:text-white blue:text-white hover:bg-gray-100 dark:hover:text-black blue:hover:text-black flex items-center text-sm sm:text-base"
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
