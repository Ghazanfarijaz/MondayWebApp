import React, { useEffect, useState, useCallback, useRef } from "react";
import BoardGroup from "./BoardGroup";
import { boardsAPI } from "../../api/board";
import Loader from "../UIComponents/Loader";
import { LayoutGrid, List, Table } from "lucide-react";

const Board = () => {
  const [viewMode, setViewMode] = useState("card");
  const [groupData, setGroupData] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const containerRef = useRef(null);
  const initialFetchDone = useRef(false);
  const isFetching = useRef(false); // Track if we're currently fetching

  // Fetch data function
  const fetchData = useCallback(async () => {
    if (isFetching.current || !hasMore) return;

    try {
      isFetching.current = true;
      setLoading(true);
      const response = await boardsAPI.getItems(cursor);

      // Filter out any duplicates just in case
      setGroupData((prev) => {
        const newItems = response.data.items.filter(
          (newItem) => !prev.some((item) => item.id === newItem.id)
        );
        return [...prev, ...newItems];
      });

      setCursor(response.data.cursor);
      setHasMore(response.data.cursor !== null);
    } catch (err) {
      setError(err.message || "Failed to fetch data");
      console.error("API Error:", err);
    } finally {
      isFetching.current = false;
      setLoading(false);
      setInitialLoading(false);
    }
  }, [cursor, hasMore]);

  // Initial data fetch
  useEffect(() => {
    if (!initialFetchDone.current) {
      initialFetchDone.current = true;
      fetchData();
    }
  }, [fetchData]);

  // Infinite scroll handler with debouncing
  useEffect(() => {
    const container = containerRef.current;
    if (!container || initialLoading) return;

    let timeoutId;

    const handleScroll = () => {
      // Clear any pending scroll checks
      clearTimeout(timeoutId);

      // Wait 200ms after scrolling stops before checking position
      timeoutId = setTimeout(() => {
        if (isFetching.current || !hasMore) return;

        const { scrollTop, clientHeight, scrollHeight } = container;
        // Check if we're near the bottom (within 300px)
        if (scrollTop + clientHeight >= scrollHeight - 300) {
          fetchData();
        }
      }, 200);
    };

    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, [fetchData, hasMore, initialLoading]);

  if (initialLoading) {
    return (
      // <div className="p-[40px] bg-gray-200 flex items-center justify-center h-full">
      //   <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      // </div>
      <Loader type="bounce" message="Loading Board Items.." color="primary" />
    );
  }

  if (error) {
    return (
      <div className="p-[40px] bg-gray-200 flex items-center justify-center h-full">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="ps-10 py-10 bg-gray-200 dark:bg-light-black blue:bg-light-blue flex flex-col h-full">
      <div className="flex justify-between items-center mb-6 pr-10">
        <h1 className="text-sm md:text-2xl font-bold text-black dark:text-white blue:text-white">
          Board 1
        </h1>
        <div className="flex space-x-3 md:space-x-3 bg-white dark:bg-[#2C2C2C] blue:bg-dark-blue p-2 rounded-full px-4 py-2">
          <button
            className={`p-2 md:px-3 md:py-2 rounded flex items-center gap-1 md:gap-2 text-xs md:text-sm ${
              viewMode === "card"
                ? "bg-[#F4F4F4] text-black dark:bg-black dark:text-white blue:bg-light-blue text-bold rounded-full px-4 py-2"
                : "bg-white dark:bg-transparent blue:bg-transparent text-black dark:text-white blue:text-white rounded-full px-4 py-2"
            }`}
            onClick={() => setViewMode("card")}
          >
            <LayoutGrid className="w-4 h-4" />
            <span className="hidden md:inline">Card View</span>
          </button>
          <button
            className={`p-2 md:px-3 md:py-2 rounded flex items-center gap-1 md:gap-2 text-xs md:text-sm ${
              viewMode === "list"
                ? "bg-[#F4F4F4] text-black dark:bg-black dark:text-white blue:bg-light-blue text-bold rounded-full px-4 py-2"
                : "bg-white dark:bg-transparent blue:bg-transparent text-black dark:text-white blue:text-white rounded-full px-4 py-2"
            }`}
            onClick={() => setViewMode("list")}
          >
            <List className="w-4 h-4" />
            <span className="hidden md:inline">List View</span>
          </button>
          <button
            className={`p-2 md:px-3 md:py-2 rounded flex items-center gap-1 md:gap-2 text-xs md:text-sm ${
              viewMode === "table"
                ? "bg-[#F4F4F4] text-black dark:bg-black dark:text-white blue:bg-light-blue text-bold rounded-full px-4 py-2"
                : "bg-white dark:bg-transparent blue:bg-transparent text-black dark:text-white blue:text-white rounded-full px-4 py-2"
            }`}
            onClick={() => setViewMode("table")}
          >
            <Table className="w-4 h-4" />
            <span className="hidden md:inline">Table View</span>
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        id="board-content-container"
        className="space-y-6 w-full flex-1 overflow-y-auto pr-10"
      >
        <BoardGroup groupData={groupData} viewMode={viewMode} />
        {loading && (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white blue:border-white"></div>
          </div>
        )}
        {!hasMore && groupData.length > 0 && (
          <div className="text-center py-4 text-gray-500">
            No more items to load
          </div>
        )}
      </div>
    </div>
  );
};

export default Board;
