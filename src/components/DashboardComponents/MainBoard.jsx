import React, { useEffect, useState } from "react";
import BoardGroup from "./BoardGroup";
import { boardsAPI } from "../../api/board";

const Board = () => {
  const [viewMode, setViewMode] = useState("card");
  const [apiData, setApiData] = useState(null);
  const [cursor, setCursor] = useState(null);
  const [groupData, setGroupData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("Group Data:", groupData);
  console.log("API Data:", apiData);
  console.log("Cursor:", cursor);
  console.log("Loading:", loading);
  console.log("Error:", error);

  // Fetch data function
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await boardsAPI.getItems(cursor);
      setApiData(response.data);
      setCursor(response.data.cursor);
      setGroupData(response.data.items);
    } catch (err) {
      setError(err.message || "Failed to fetch data");
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="p-[40px] bg-gray-200 flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
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
    <div className="p-[40px] overflow-auto bg-gray-200 flex flex-col h-full">
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

      <div className="space-y-6 w-full px-[24] flex-1 overflow-y-auto">
        <BoardGroup groupData={groupData} viewMode={viewMode} cursor={cursor} />
      </div>
    </div>
  );
};

export default Board;
