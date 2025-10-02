import { Link, Outlet } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const Settings = () => {
  return (
    <div className="h-full max-h-[calc(100dvh-68px)] lg:p-10 p-6 overflow-auto bg-gray-100 dark:bg-light-black blue:bg-light-blue">
      <div className="flex flex-col gap-4">
        <Link
          to={-1}
          className="text-gray-600 dark:text-gray-400 blue:text-gray-100 font-medium flex items-center gap-1"
        >
          <ChevronLeft size={20} />
          <p>Go Back</p>
        </Link>
        <Outlet />
      </div>
    </div>
  );
};

export default Settings;
