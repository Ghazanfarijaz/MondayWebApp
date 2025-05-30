// import React, { useEffect, useState } from "react";
// import BoardGroup from "./BoardGroup";
// import { boardsAPI } from "../../api/board";

// const Board = () => {
//   const [viewMode, setViewMode] = useState("card");
//   const [apiData, setApiData] = useState(null);
//   const [cursor, setCursor] = useState(null);
//   const [groupData, setGroupData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   console.log("Group Data:", groupData);
//   console.log("API Data:", apiData);
//   console.log("Cursor:", cursor);
//   console.log("Loading:", loading);
//   console.log("Error:", error);

//   // Fetch data function
//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const response = await boardsAPI.getItems(cursor);
//       setApiData(response.data);
//       setCursor(response.data.cursor);
//       setGroupData(response.data.items);
//     } catch (err) {
//       setError(err.message || "Failed to fetch data");
//       console.error("API Error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Initial data fetch
//   useEffect(() => {
//     fetchData();
//   }, []);

//   if (loading) {
//     return (
//       <div className="p-[40px] bg-gray-200 flex items-center justify-center h-full">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-[40px] bg-gray-200 flex items-center justify-center h-full">
//         <p className="text-red-500">Error: {error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-[40px] overflow-auto bg-gray-200 flex flex-col h-full">
//       <div className="flex justify-between items-center mb-6 border-b">
//         <h1 className="text-sm md:text-2xl font-bold">Board 1</h1>

//         <div className="flex space-x-2">
//           <button
//             className={`px-3 py-1 rounded ${
//               viewMode === "card" ? "bg-blue-500 text-white" : "bg-gray-200"
//             }`}
//             onClick={() => setViewMode("card")}
//           >
//             Card View
//           </button>
//           <button
//             className={`px-3 py-1 rounded ${
//               viewMode === "list" ? "bg-blue-500 text-white" : "bg-gray-200"
//             }`}
//             onClick={() => setViewMode("list")}
//           >
//             List View
//           </button>
//           <button
//             className={`px-3 py-1 rounded ${
//               viewMode === "table" ? "bg-blue-500 text-white" : "bg-gray-200"
//             }`}
//             onClick={() => setViewMode("table")}
//           >
//             Table View
//           </button>
//         </div>
//       </div>

//       <div className="space-y-6 w-full px-[24] flex-1 overflow-y-auto">
//         <BoardGroup groupData={groupData} viewMode={viewMode} cursor={cursor} />
//       </div>
//     </div>
//   );
// };

// export default Board;

import React, { useEffect, useState, useCallback, useRef } from "react";
import BoardGroup from "./BoardGroup";
import { boardsAPI } from "../../api/board";
import Loader from "../UIComponents/Loader";

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
    <div className="p-[40px] bg-gray-200 flex flex-col h-full">
      <div className="flex justify-between items-center mb-6 border-b">
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
      </div>

      <div
        ref={containerRef}
        className="space-y-6 w-full px-[24px] flex-1 overflow-y-auto"
      >
        <BoardGroup groupData={groupData} viewMode={viewMode} />
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
