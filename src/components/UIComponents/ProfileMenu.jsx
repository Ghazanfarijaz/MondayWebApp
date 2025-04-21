import { Menu, Text } from "@mantine/core";
import {
  IconSettings,
  IconSearch,
  IconPhoto,
  IconMessageCircle,
  IconTrash,
  IconArrowsLeftRight,
} from "@tabler/icons-react";

function ControlledMenu({ isOpen, onOpenChange, targetElement }) {
  return (
    <Menu
      shadow="md"
      width="auto"
      opened={isOpen}
      onChange={onOpenChange}
      position="bottom-end"
      offset={5} // Add this offset
      withinPortal={false} // Disable portal
      zIndex={1000}
      withArrow
      classNames={{
        dropdown: "bg-white border border-gray-200 rounded-lg shadow-lg", // Dropdown styling
        arrow: "border-white", // Arrow color (matches dropdown bg)
        item: "text-sm text-gray-700 hover:bg-gray-100 px-3 py-2", // Menu items
        itemLabel: "font-medium", // Item label (if needed)
        itemSection: "mr-2", // Left/right section spacing
        divider: "border-t border-gray-200 my-1", // Divider styling
        label: "text-xs font-semibold text-gray-500 px-3 py-1", // Menu label
      }}
    >
      <Menu.Target>{targetElement}</Menu.Target>

      <Menu.Dropdown
        style={{
          right: "auto",
          left: "50%",
          top: "50px",
          transform: "translateX(-55%)",
          transform: "translateY(55%)",
        }}
      >
        <Menu.Label>Application</Menu.Label>
        <Menu.Item leftSection={<IconSettings size={14} />}>Settings</Menu.Item>
        <Menu.Item leftSection={<IconMessageCircle size={14} />}>
          Messages
        </Menu.Item>
        <Menu.Item leftSection={<IconPhoto size={14} />}>Gallery</Menu.Item>
        <Menu.Item
          leftSection={<IconSearch size={14} />}
          rightSection={
            <Text size="xs" c="dimmed">
              ⌘K
            </Text>
          }
        >
          Search
        </Menu.Item>

        <Menu.Divider />

        <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item leftSection={<IconArrowsLeftRight size={14} />}>
          Transfer my data
        </Menu.Item>
        <Menu.Item
          color="red"
          leftSection={<IconTrash size={14} />}
          className="text-red-600 hover:bg-red-50" // Custom red item styling
        >
          Delete my account
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default ControlledMenu;
