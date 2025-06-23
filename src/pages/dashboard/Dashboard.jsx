import { useEffect, useState, useRef } from "react";
import { LayoutGrid, List, Table } from "lucide-react";
import BoardGroup from "../../components/DashboardComponents/BoardGroup";
import { boardsAPI } from "../../api/board";
import BoardDataSkeleton from "../../features/dashboard/components/BoardDataSkeleton";
import { toast } from "sonner";
import { useInfiniteQuery } from "@tanstack/react-query";

const Dashboard = () => {
  const [viewMode, setViewMode] = useState("card");
  const containerRef = useRef(null);

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

  const groupData = data?.pages.flatMap((page) => page.data.items) || [];

  // Scroll Listener
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const nearBottom = scrollTop + clientHeight >= scrollHeight - 100;

      if (nearBottom && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isError) {
    toast.error("Error!", {
      description:
        error.message || "Could not load data. Please try again later.",
    });
  }

  return (
    <div className="md:ps-10 md:py-10 py-4 ps-4 bg-gray-200 dark:bg-light-black blue:bg-light-blue flex flex-col h-full">
      <div className="flex justify-between items-center mb-6 pr-10">
        <h1 className="text-sm md:text-2xl font-bold text-black dark:text-white blue:text-white">
          Board 1
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
        ref={containerRef}
        id="board-content-container"
        className="space-y-6 w-full flex-1 overflow-y-auto md:pr-10 pr-4"
      >
        {isPending ? (
          <BoardDataSkeleton type={viewMode} />
        ) : (
          <BoardGroup groupData={groupData || []} viewMode={viewMode} />
        )}

        {isFetchingNextPage && (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white blue:border-white"></div>
          </div>
        )}

        {!hasNextPage && groupData?.length > 0 && (
          <div className="text-center py-4 text-gray-500">
            No more items to load
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
