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
  const [sortConfig, setSortConfig] = useState(null); // Add sort state
  const [sortLoading, setSortLoading] = useState(false);
  const [showSortLoader, setShowSortLoader] = useState(false);

  // Modified fetchData function
  const fetchData = useCallback(
    async (reset = false) => {
      if (isFetching.current || (!hasMore && !reset)) return;

      try {
        isFetching.current = true;
        setLoading(true);

        const response = await boardsAPI.getItems(
          reset ? null : cursor, // Use null cursor when resetting
          sortConfig
        );

        // Replace items on reset (sort change), append on scroll
        setGroupData((prev) =>
          reset ? response.data.items : [...prev, ...response.data.items]
        );

        // Always update cursor (will be null when reset)
        setCursor(response.data.cursor);
        setHasMore(response.data.cursor !== null);
      } catch (err) {
        setError(err.message || "Failed to fetch data");
      } finally {
        isFetching.current = false;
        setLoading(false);
        setInitialLoading(false);
      }
    },
    [cursor, hasMore, sortConfig]
  );

  // Sort change handler - forces reset
  const handleSortChange = (newSortConfig) => {
    setSortLoading(true);
    const timer = setTimeout(() => setShowSortLoader(true), 100);
    fetchData(true).finally(() => {
      clearTimeout(timer);
      setSortLoading(false);
      setShowSortLoader(false);
    });
    setSortConfig(newSortConfig);
    setCursor(null); // Reset cursor
    setHasMore(true); // Reset hasMore flag
    fetchData(true); // Force reset with new sort
  };

  // Infinite scroll handler
  useEffect(() => {
    const container = containerRef.current;
    if (!container || initialLoading || !cursor) return; // Only trigger when we have a cursor

    const handleScroll = () => {
      if (isFetching.current || !hasMore) return;

      const { scrollTop, clientHeight, scrollHeight } = container;
      if (scrollTop + clientHeight >= scrollHeight - 300) {
        fetchData(); // Normal paginated fetch (not reset)
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [fetchData, hasMore, initialLoading, cursor]); // Add cursor to dependencies

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
    <div className="p-[40px] bg-gray-200 flex flex-col h-full">
      {/* <div className="flex justify-between items-center mb-6 border-b">
        <h1 className="text-sm md:text-2xl font-bold">Board 1</h1>
        <div className="flex space-x-2">
          <button
            className={`px-3 py-1 rounded ${
              viewMode === "card" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setViewMode("card")}
          >
            Card View
          </button>
          <button
            className={`px-3 py-1 rounded ${
              viewMode === "list" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setViewMode("list")}
          >
            List View
          </button>
          <button
            className={`px-3 py-1 rounded ${
              viewMode === "table" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setViewMode("table")}
          >
            Table View
          </button>
        </div>
      </div> */}

      <div className="flex justify-between items-center mb-6 border-b">
        <h1 className="text-sm md:text-2xl font-bold">Board 1</h1>
        <div className="flex space-x-3 md:space-x-3 bg-white p-2 rounded-full px-4 py-2">
          <button
            className={`p-2 md:px-3 md:py-2 rounded flex items-center gap-1 md:gap-2 text-xs md:text-sm ${
              viewMode === "card"
                ? "bg-gray-200 text-black text-bold rounded-full px-4 py-2"
                : "bg-white hover:bg-gray-200 rounded-full px-4 py-2"
            }`}
            onClick={() => setViewMode("card")}
          >
            <LayoutGrid className="w-4 h-4" />
            <span className="hidden md:inline">Card View</span>
          </button>
          <button
            className={`p-2 md:px-3 md:py-2 rounded flex items-center gap-1 md:gap-2 text-xs md:text-sm ${
              viewMode === "list"
                ? "bg-gray-200 text-black text-bold rounded-full px-4 py-2"
                : "bg-white hover:bg-gray-200 rounded-full px-4 py-2"
            }`}
            onClick={() => setViewMode("list")}
          >
            <List className="w-4 h-4" />
            <span className="hidden md:inline">List View</span>
          </button>
          <button
            className={`p-2 md:px-3 md:py-2 rounded flex items-center gap-1 md:gap-2 text-xs md:text-sm ${
              viewMode === "table"
                ? "bg-gray-200 text-black text-bold rounded-full px-4 py-2"
                : "bg-white hover:bg-gray-200 rounded-full px-4 py-2"
            }`}
            onClick={() => setViewMode("table")}
          >
            <Table className="w-4 h-4" />
            <span className="hidden md:inline">Table View</span>
          </button>
        </div>
      </div>

      {/* <div className="flex justify-between items-center mb-6 border-b">
        <h1 className="text-sm md:text-2xl font-bold">Board 1</h1>
        <div className="flex space-x-1 md:space-x-2">
          <div
            className={`p-2 md:px-3 md:py-2 rounded flex items-center gap-1 md:gap-2 text-xs md:text-sm cursor-pointer ${
              viewMode === "card"
                ? "bg-gray-300 text-black text-bold"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => setViewMode("card")}
          >
            <img src={card} alt="Card View" className="w-4 h-4" />
            <span className="hidden md:inline">Card View</span>
          </div>
          <div
            className={`p-2 md:px-3 md:py-2 rounded flex items-center gap-1 md:gap-2 text-xs md:text-sm cursor-pointer ${
              viewMode === "list"
                ? "bg-gray-300 text-black text-bold"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => setViewMode("list")}
          >
            <img src={list} alt="List View" className="w-4 h-4" />
            <span className="hidden md:inline">List View</span>
          </div>
          <div
            className={`p-2 md:px-3 md:py-2 rounded flex items-center gap-1 md:gap-2 text-xs md:text-sm cursor-pointer ${
              viewMode === "table"
                ? "bg-gray-300 text-black text-bold"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => setViewMode("table")}
          >
            <img src={table} alt="Table View" className="w-4 h-4" />
            <span className="hidden md:inline">Table View</span>
          </div>
        </div>
      </div> */}

      <div
        ref={containerRef}
        className="space-y-6 w-full px-[24px] flex-1 overflow-y-auto"
      >
        {" "}
        {sortLoading && (
          <div className="flex justify-center py-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-500"></div>
          </div>
        )}
        <BoardGroup
          groupData={groupData}
          viewMode={viewMode}
          onSortChange={handleSortChange} // Pass handler to child
          currentSort={sortConfig} // Pass current sort for UI
        />
        {loading && (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
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
