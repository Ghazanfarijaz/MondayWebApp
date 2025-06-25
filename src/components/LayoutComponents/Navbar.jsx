import { useState, useEffect } from "react";
import { LogOut, Palette } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "../../assets/Avatar.png";
import { useAuth } from "../../contexts/AuthContext";
import Logo from "../../assets/Logo.png";
import { Menu } from "@mantine/core";
import { toast } from "sonner";

const Navbar = () => {
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

  const handleLogout = async () => {
    try {
      const result = await logout();
      if (result.success) {
        navigate("/login");
      } else {
        console.error("Logout failed:", result.error);
        toast.error("Error logging out!", {
          description: result.error || "",
        });
      }
    } catch (error) {
      console.error("Logout error:", error);

      toast.error("Error logging out!", {
        description: error.response.data.message || "",
      });
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white dark:bg-black blue:bg-dark-blue border-l border-l-[#eaeaea] dark:border-l-light-black blue:border-l-light-blue px-6 sm:px-6 lg:px-8 relative z-50">
      <Link to="/">
        <img
          src={Logo}
          alt="Logo"
          className="object-contain w-[48px] h-[48px]"
        />
      </Link>

      {/* Icons and Avatar - adjusted spacing */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        <Menu shadow="md" width={180} position="bottom-end" withArrow>
          <Menu.Target>
            <img
              src={Avatar}
              alt="User profile"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover hover:cursor-pointer"
            />
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Sub
              width={130}
              leftSection={<Palette className="mr-2 h-4 w-4" />}
            >
              <Menu.Sub.Target>
                <Menu.Sub.Item>Theme</Menu.Sub.Item>
              </Menu.Sub.Target>
              <Menu.Sub.Dropdown>
                <Menu.Item onClick={() => setTheme("light")}>Light</Menu.Item>
                <Menu.Divider />
                <Menu.Item onClick={() => setTheme("dark")}>Dark</Menu.Item>
                <Menu.Divider />
                <Menu.Item onClick={() => setTheme("blue")}>Blue</Menu.Item>
              </Menu.Sub.Dropdown>
            </Menu.Sub>
            <Menu.Divider />
            <Menu.Item
              color="red"
              leftSection={<LogOut className="mr-2 h-4 w-4" />}
              onClick={handleLogout}
            >
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    </div>
  );
};

export default Navbar;
