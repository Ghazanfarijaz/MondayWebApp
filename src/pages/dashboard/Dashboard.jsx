import { useState } from "react";
import { LayoutGrid, List, Table } from "lucide-react";
import BoardGroup from "../../components/DashboardComponents/BoardGroup";
import { boardsAPI } from "../../api/board";
import BoardDataSkeleton from "../../features/dashboard/components/BoardDataSkeleton";
import { toast } from "sonner";
import { useInfiniteQuery } from "@tanstack/react-query";

const Dashboard = () => {
  const [viewMode, setViewMode] = useState("card");

  const {
    data,
    isPending,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["boardData"],
    queryFn: ({ pageParam = null }) => boardsAPI.getItems(pageParam),
    getNextPageParam: (lastPage) => lastPage?.data?.cursor ?? undefined,
  });

  const itemsData = data?.pages.flatMap((page) => page.data.items) || [];

  // Grouping data by group Title
  const groupedData = itemsData.reduce((acc, item) => {
    const groupTitle = item.group?.title || "No Group";
    if (!acc[groupTitle]) {
      acc[groupTitle] = [];
    }
    acc[groupTitle].push(item);
    return acc;
  }, {});

  if (isError) {
    toast.error("Error!", {
      description:
        error.message || "Could not load data. Please try again later.",
    });
  }

  return (
    <div className="md:ps-8 md:py-8 py-4 ps-4 bg-gray-200 dark:bg-light-black blue:bg-light-blue flex flex-col h-full">
      <div className="flex justify-between items-center mb-6 md:pr-8 pr-4">
        <h1 className="text-sm md:text-2xl font-bold text-black dark:text-white blue:text-white">
          {data?.pages[0]?.data?.customization?.boardName || ""}
        </h1>
        <div className="flex space-x-3 md:space-x-3 bg-white dark:bg-[#2C2C2C] blue:bg-dark-blue p-2 rounded-full px-4 py-2">
          {["card", "list", "table"].map((mode) => {
            const Icon =
              mode === "card" ? LayoutGrid : mode === "list" ? List : Table;
            return (
              <button
                key={mode}
                className={`p-2 md:px-3 md:py-2 rounded flex items-center gap-1 md:gap-2 text-xs md:text-sm ${
                  viewMode === mode
                    ? "bg-[#F4F4F4] text-black dark:bg-black dark:text-white blue:bg-light-blue text-bold rounded-full px-4 py-2"
                    : "bg-white dark:bg-transparent blue:bg-transparent text-black dark:text-white blue:text-white rounded-full px-4 py-2"
                }`}
                onClick={() => setViewMode(mode)}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden md:inline">
                  {mode.charAt(0).toUpperCase() + mode.slice(1)} View
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div
        id="board-content-container"
        className="w-full flex-1 overflow-hidden md:pr-8 pr-4"
      >
        {isPending ? (
          <BoardDataSkeleton type={viewMode} />
        ) : (
          <BoardGroup
            itemsData={itemsData}
            groupedData={groupedData || {}}
            viewMode={viewMode}
            noMoreItemsLeft={!hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            onClickLoadMore={() => {
              if (hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
              }
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
