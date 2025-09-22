import Sidebar from "../components/sidebar/Sidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../components/ui/resizeable";

const SidebarLayout = ({ children }) => {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="w-full h-full flex overflow-x-hidden"
    >
      <ResizablePanel
        className="bg-white dark:bg-black blue:bg-dark-blue lg:block hidden"
        maxSize={20}
        minSize={13}
        defaultSize={15}
      >
        <Sidebar />
      </ResizablePanel>
      <ResizableHandle className="lg:block hidden" />
      <ResizablePanel className="w-full overflow-y-auto">
        {children}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default SidebarLayout;
