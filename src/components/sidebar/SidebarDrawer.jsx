import { Drawer } from "@mantine/core";
import { SidebarContent } from "./Sidebar";

const SidebarDrawer = ({ opened, onClose }) => {
  return (
    <Drawer size={"xs"} opened={opened} onClose={onClose} padding={20}>
      <div className="flex flex-col gap-2 w-[250px]">
        <SidebarContent />
      </div>
    </Drawer>
  );
};

export default SidebarDrawer;
