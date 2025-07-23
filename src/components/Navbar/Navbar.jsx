import { useState, useEffect } from "react";
import { Cog, KeyRound, LogOut, Palette, UserCog } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo-icon.jpeg";
import FeedbackIcon from "../../assets/icons/FeedbackIcon";
import { Menu } from "@mantine/core";
import { toast } from "sonner";
import { useAuth } from "./../../contexts/AuthContext";
import PreferencesModal from "../../features/settings/components/PreferencesModal";
import { useDisclosure } from "@mantine/hooks";
import { FeedbackModal } from "./../ui/FeedbackModal/FeedbackModal";

const Navbar = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const [openPreferencesModal, setOpenPreferencesModal] = useState(false);

  // Set the theme based on localStorage or default to light
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark", "blue");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleLogout = async () => {
    try {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userData");

      navigate("/auth/login", {
        replace: true,
      });
    } catch (error) {
      console.error("Logout error:", error);

      toast.error("Error logging out!", {
        description: error.response.data.message || "",
      });
    }
  };

  return (
    <>
      <FeedbackModal opened={opened} onClose={close} />
      <PreferencesModal
        isModalOpen={openPreferencesModal}
        onCloseModal={() => setOpenPreferencesModal(false)}
      />

      <div className="flex items-center justify-between p-4 bg-white dark:bg-black blue:bg-dark-blue border-l border-l-[#eaeaea] dark:border-l-light-black blue:border-l-light-blue px-6 sm:px-6 lg:px-8 relative z-50">
        <Link to="/">
          <div className="flex items-center gap-2">
            <img
              src={Logo}
              alt="Logo"
              className="object-contain w-[48px] h-[48px] rounded-lg"
            />
            <div>
              <h3 className="font-bold text-xl text-[#f04967] font-serif">
                Lucie{" "}
                <span className="inline-block scale-y-110 origin-bottom">
                  UP
                </span>
              </h3>
              <p className="text-[#2c5da0] text-[10px] font-serif">
                External <span className="text-[#f04967]">U</span>sers{" "}
                <span className="text-[#f04967]">P</span>ortal
              </p>
            </div>
          </div>
        </Link>
        {/* Icons and Avatar - adjusted spacing */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <FeedbackIcon
            onClick={open}
            className="cursor-pointer text-[#6F767E] size-8"
          />
          <Menu shadow="md" width={190} position="bottom-end" withArrow>
            <Menu.Target className="cursor-pointer">
              {user?.profilePicture ? (
                <img
                  src={user?.profilePicture}
                  alt="User profile"
                  className="object-contain w-9 h-9 rounded-full"
                />
              ) : (
                <div className="w-9 h-9 rounded-full flex items-center justify-center bg-[#2A85FF] cursor-pointer">
                  <span className="text-[14px] text-white font-bold">
                    {user?.name?.slice(0, 2).toUpperCase() ||
                      user?.email?.slice(0, 2).toUpperCase()}
                  </span>
                </div>
              )}
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                leftSection={<UserCog className="mr-2 h-4 w-4" />}
                onClick={() => navigate("/settings/profile")}
              >
                Profile Settings
              </Menu.Item>
              <Menu.Item
                leftSection={<KeyRound className="mr-2 h-4 w-4" />}
                onClick={() => navigate("/settings/change-password")}
              >
                Change Password
              </Menu.Item>
              <Menu.Item
                leftSection={<Cog className="mr-2 h-4 w-4" />}
                onClick={() => setOpenPreferencesModal(true)}
              >
                Preferences
              </Menu.Item>
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
    </>
  );
};

export default Navbar;
