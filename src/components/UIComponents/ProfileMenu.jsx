import { Menu } from "@mantine/core";
import { IconSettings, IconUser, IconLogout } from "@tabler/icons-react";

function ControlledMenu({ isOpen, onOpenChange, targetElement }) {
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
        dropdown: "bg-white border border-gray-200 rounded-md shadow-xl py-1", // Added py-1 for vertical padding
        item: "text-sm text-gray-700 hover:bg-gray-100 px-3 mx-3 my-0.5 rounded", // Added mx-2 for horizontal margin
        itemLabel: "font-medium",
        divider: "border-t border-gray-200 mx-2 my-1", // Added horizontal margin to divider
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
        <Menu.Item leftSection={<IconUser size={16} />}>Profile</Menu.Item>
        <Menu.Item leftSection={<IconSettings size={16} />}>Settings</Menu.Item>

        <Menu.Divider />

        <Menu.Item
          color="red"
          leftSection={<IconLogout size={16} />}
          className="text-red-600 hover:bg-red-50"
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default ControlledMenu;
