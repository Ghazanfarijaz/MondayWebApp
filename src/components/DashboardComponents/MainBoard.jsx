// // Board.js
// import React, { useCallback, useEffect, useRef, useState } from "react";
// import { Users } from "lucide-react";
// import BoardGroup from "./BoardGroup";
// import image1 from "../../assets/peopleimage1.png";
// import image2 from "../../assets/peopleimage2.png";
// import { boardsAPI } from "../../api/board";

// const Board = () => {
//   const [viewMode, setViewMode] = useState("card");
//   const [groups, setGroups] = useState([]);
//   const [cursor, setCursor] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);
//   const containerRef = useRef(null);

//   console.log("Groups:", groups);

//   const groups1 = [
//     {
//       id: 1,
//       name: "Group 1",
//       color: "bg-purple-300",
//       items: [
//         {
//           title: "Placeholder for text",
//           status: "Active",
//           priority: "High",
//           date: "24 July, 2024",
//           board: "XYZ Board",
//           people: { image1, image2 },
//         },
//         {
//           title: "Placeholder for text",
//           status: "Active",
//           priority: "High",
//           date: "24 July, 2024",
//           board: "XYZ Board",
//           people: { image1, image2 },
//         },
//         {
//           title: "Placeholder for text",
//           status: "Active",
//           priority: "High",
//           date: "24 July, 2024",
//           board: "XYZ Board",
//           people: { image1, image2 },
//         },
//         {
//           title: "Placeholder for text",
//           status: "Active",
//           priority: "High",
//           date: "24 July, 2024",
//           board: "XYZ Board",
//           people: { image1, image2 },
//         },
//         {
//           title: "Placeholder for text",
//           status: "Active",
//           priority: "High",
//           date: "24 July, 2024",
//           board: "XYZ Board",
//           people: { image1, image2 },
//         },
//         {
//           title: "Placeholder for text",
//           status: "Active",
//           priority: "High",
//           date: "24 July, 2024",
//           board: "XYZ Board",
//           people: { image1, image2 },
//         },
//         {
//           title: "Placeholder for text",
//           status: "Active",
//           priority: "High",
//           date: "24 July, 2024",
//           board: "XYZ Board",
//           people: { image1, image2 },
//         },
//         {
//           title: "Placeholder for text",
//           status: "Active",
//           priority: "High",
//           date: "24 July, 2024",
//           board: "XYZ Board",
//           people: { image1, image2 },
//         },
//         {
//           title: "Placeholder for text",
//           status: "Active",
//           priority: "High",
//           date: "24 July, 2024",
//           board: "XYZ Board",
//           people: { image1, image2 },
//         },
//         {
//           title: "Placeholder for text",
//           status: "Active",
//           priority: "High",
//           date: "24 July, 2024",
//           board: "XYZ Board",
//           people: { image1, image2 },
//         },
//         {
//           title: "Placeholder for text",
//           status: "Active",
//           priority: "High",
//           date: "24 July, 2024",
//           board: "XYZ Board",
//           people: { image1, image2 },
//         },
//         {
//           title: "Placeholder for text",
//           status: "Active",
//           priority: "High",
//           date: "24 July, 2024",
//           board: "XYZ Board",
//           people: { image1, image2 },
//         },
//         {
//           title: "Placeholder for text",
//           status: "Active",
//           priority: "High",
//           date: "24 July, 2024",
//           board: "XYZ Board",
//           people: { image1, image2 },
//         },
//         {
//           title: "Placeholder for text",
//           status: "Active",
//           priority: "High",
//           date: "24 July, 2024",
//           board: "XYZ Board",
//           people: { image1, image2 },
//         },
//         {
//           title: "Placeholder for text",
//           status: "Active",
//           priority: "High",
//           date: "24 July, 2024",
//           board: "XYZ Board",
//           people: { image1, image2 },
//         },
//         {
//           title: "Placeholder for text",
//           status: "Active",
//           priority: "High",
//           date: "24 July, 2024",
//           board: "XYZ Board",
//           people: { image1, image2 },
//         },
//       ],
//     },
//   ];

//   // Fetch initial data
//   useEffect(() => {
//     fetchItems();
//   }, []);

//   const fetchItems = useCallback(async () => {
//     if (isLoading || !hasMore) return;

//     setIsLoading(true);
//     try {
//       const response = await boardsAPI.getItems(cursor);
//       setCursor(response.data.cursor);
//       setHasMore(response.data.cursor !== null);

//       // Transform API data to match your existing structure
//       const newGroup = {
//         id: 1,
//         name: "Group 1",
//         color: "bg-purple-300",
//         items: response.data.items.map((item) => ({
//           title: item.name,
//           status:
//             item.column_values.find((c) => c.type === "status")?.text ||
//             "Unknown",
//           priority:
//             item.column_values.find((c) => c.type === "dropdown")?.text ||
//             "Medium",
//           date: item.column_values.find((c) => c.type === "date")?.text || "",
//           board:
//             item.column_values.find((c) => c.type === "board_relation")
//               ?.display_value || "",
//           people: { image1, image2 }, // Keeping your existing people images
//         })),
//       };

//       setGroups((prev) => {
//         if (prev.length === 0) return [newGroup];
//         const updatedGroups = [...prev];
//         updatedGroups[0].items = [...updatedGroups[0].items, ...newGroup.items];
//         return updatedGroups;
//       });
//     } catch (error) {
//       console.error("Error fetching items:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [cursor, isLoading, hasMore]);

//   // Infinite scroll handler
//   useEffect(() => {
//     const container = containerRef.current;
//     if (!container) return;

//     const handleScroll = () => {
//       if (
//         container.scrollTop + container.clientHeight >=
//           container.scrollHeight - 1 &&
//         !isLoading &&
//         hasMore
//       ) {
//         fetchItems();
//       }
//     };

//     container.addEventListener("scroll", handleScroll);
//     return () => container.removeEventListener("scroll", handleScroll);
//   }, [fetchItems, isLoading, hasMore]);

//   return (
//     <div className=" p-[40px] overflow-auto bg-gray-200 flex flex-col h-full">
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

//       <div className="space-y-6 w-full px-[24] flex-1 overflow-y-auto ">
//         {groups1.map((group) => (
//           <BoardGroup
//             key={group.id}
//             group={group}
//             viewMode={viewMode}
//             cursor={cursor}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Board;

import React, { useEffect, useState } from "react";
import { Users } from "lucide-react";
import BoardGroup from "./BoardGroup";
import image1 from "../../assets/peopleimage1.png";
import image2 from "../../assets/peopleimage2.png";
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

  // Fallback static data
  const staticGroups = [
    {
      id: 1,
      name: "Group 1",
      color: "bg-purple-300",
      items: [
        // ... (your existing static items)
      ],
    },
  ];

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
