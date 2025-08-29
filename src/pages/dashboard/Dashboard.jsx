import { useEffect, useState } from "react";
import BoardDataSkeleton from "../../features/dashboard/components/BoardDataSkeleton";
import { Skeleton } from "@mantine/core";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  // Hooks
  const { user } = useAuth();
  const navigate = useNavigate();

  // Local States
  // View Mode
  const [viewMode, setViewMode] = useState("card");

  // Set the initial view mode from user preferences or default to 'card'
  useEffect(() => {
    const userPreferences = JSON.parse(localStorage.getItem("userPreferences"));
    const initialViewMode = userPreferences?.itemView || "card";
    setViewMode(initialViewMode);

    if (user?.boardsData?.length > 0) {
      navigate(`/board/${user.boardsData[0].boardId}`);
    }
  }, [user, navigate]);

  return (
    <div className="md:ps-8 md:py-8 py-4 ps-4 bg-gray-200 dark:bg-light-black blue:bg-light-blue flex flex-col h-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 md:pr-8 pr-4">
        {/* Board Name */}
        <Skeleton w={120} height={32} radius={4} />
        {/* View Mode */}
        <div className="flex space-x-3 md:space-x-3 bg-white dark:bg-[#2C2C2C] blue:bg-dark-blue p-2 rounded-full px-4 py-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton
              key={index}
              height={32}
              width="100%"
              className="md:!w-[100px] !w-[32px]"
              radius={32}
            />
          ))}
        </div>
      </div>

      <div
        id="board-content-container"
        className="w-full flex-1 overflow-hidden md:pr-8 pr-4"
      >
        <div className="w-full flex flex-col gap-4">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-10 justify-between">
            <Skeleton height={40} width="100%" maw={250} radius={4} />
            <Skeleton height={40} width="100%" maw={100} radius={4} />
          </div>
          <BoardDataSkeleton type={viewMode} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
