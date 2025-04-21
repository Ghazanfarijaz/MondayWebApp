import { Menu } from "@mantine/core";
import { IconSettings, IconUser, IconLogout } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

function ControlledMenu({ isOpen, onOpenChange, targetElement }) {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    onOpenChange(false); // Close the menu after navigation
  };

  return (
    <Menu
      shadow="md"
      width={50}
      opened={isOpen}
      onChange={onOpenChange}
      position="bottom-end"
      withinPortal={false}
      zIndex={100}
      classNames={{
        dropdown: "bg-white border border-gray-200 rounded-md shadow-xl py-1",
        item: "text-sm text-gray-700 hover:bg-gray-100 px-3 mx-3 my-0.5 rounded",
        itemLabel: "font-medium",
        divider: "border-t border-gray-200 mx-2 my-1",
      }}
    >
      <Menu.Target>{targetElement}</Menu.Target>

      <Menu.Dropdown
        style={{
          left: "auto",
          right: 0,
          marginTop: 180,
        }}
      >
        <Menu.Item
          leftSection={<IconUser size={16} />}
          onClick={() => handleNavigation("profile")}
        >
          Profile
        </Menu.Item>
        <Menu.Item
          leftSection={<IconSettings size={16} />}
          onClick={() => handleNavigation("/settings")}
        >
          Settings
        </Menu.Item>

        <Menu.Divider />

        <Menu.Item
          color="red"
          leftSection={<IconLogout size={16} />}
          className="text-red-600 hover:bg-red-50"
          onClick={() => handleNavigation("/")}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default ControlledMenu;
