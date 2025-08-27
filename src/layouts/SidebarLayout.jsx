import Sidebar from "../components/sidebar/Sidebar";

const SidebarLayout = ({ children }) => {
  return (
    <div className="w-full h-full flex overflow-x-hidden">
      <Sidebar />
      <div className="w-full overflow-y-auto">{children}</div>
    </div>
  );
};

export default SidebarLayout;
