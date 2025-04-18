// Board.js
import React, { useState } from "react";
import { Users } from "lucide-react";
import BoardGroup from "./BoardGroup";
import image1 from "../../assets/peopleimage1.png";
import image2 from "../../assets/peopleimage2.png";

const Board = () => {
  const [viewMode, setViewMode] = useState("card");

  const groups = [
    {
      id: 1,
      name: "Group 1",
      color: "bg-purple-300",
      items: [
        {
          title: "Placeholder for text",
          status: "Active",
          priority: "High",
          date: "24 July, 2024",
          board: "XYZ Board",
          people: { image1, image2 },
        },
        {
          title: "Placeholder for text",
          status: "Active",
          priority: "High",
          date: "24 July, 2024",
          board: "XYZ Board",
          people: { image1, image2 },
        },
        {
          title: "Placeholder for text",
          status: "Active",
          priority: "High",
          date: "24 July, 2024",
          board: "XYZ Board",
          people: { image1, image2 },
        },
        {
          title: "Placeholder for text",
          status: "Active",
          priority: "High",
          date: "24 July, 2024",
          board: "XYZ Board",
          people: { image1, image2 },
        },
        {
          title: "Placeholder for text",
          status: "Active",
          priority: "High",
          date: "24 July, 2024",
          board: "XYZ Board",
          people: { image1, image2 },
        },
        {
          title: "Placeholder for text",
          status: "Active",
          priority: "High",
          date: "24 July, 2024",
          board: "XYZ Board",
          people: { image1, image2 },
        },
        {
          title: "Placeholder for text",
          status: "Active",
          priority: "High",
          date: "24 July, 2024",
          board: "XYZ Board",
          people: { image1, image2 },
        },
        {
          title: "Placeholder for text",
          status: "Active",
          priority: "High",
          date: "24 July, 2024",
          board: "XYZ Board",
          people: { image1, image2 },
        },
        {
          title: "Placeholder for text",
          status: "Active",
          priority: "High",
          date: "24 July, 2024",
          board: "XYZ Board",
          people: { image1, image2 },
        },
        {
          title: "Placeholder for text",
          status: "Active",
          priority: "High",
          date: "24 July, 2024",
          board: "XYZ Board",
          people: { image1, image2 },
        },
        {
          title: "Placeholder for text",
          status: "Active",
          priority: "High",
          date: "24 July, 2024",
          board: "XYZ Board",
          people: { image1, image2 },
        },
        {
          title: "Placeholder for text",
          status: "Active",
          priority: "High",
          date: "24 July, 2024",
          board: "XYZ Board",
          people: { image1, image2 },
        },
        {
          title: "Placeholder for text",
          status: "Active",
          priority: "High",
          date: "24 July, 2024",
          board: "XYZ Board",
          people: { image1, image2 },
        },
        {
          title: "Placeholder for text",
          status: "Active",
          priority: "High",
          date: "24 July, 2024",
          board: "XYZ Board",
          people: { image1, image2 },
        },
        {
          title: "Placeholder for text",
          status: "Active",
          priority: "High",
          date: "24 July, 2024",
          board: "XYZ Board",
          people: { image1, image2 },
        },
        {
          title: "Placeholder for text",
          status: "Active",
          priority: "High",
          date: "24 July, 2024",
          board: "XYZ Board",
          people: { image1, image2 },
        },
      ],
    },
  ];

  return (
    <div className=" p-[40px] overflow-hidden bg-gray-200 flex flex-col h-full">
      <div className="flex justify-between items-center mb-6 border-b">
        <h1 className="text-2xl font-bold">Board 1</h1>

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

      <div className="space-y-6 w-full px-[24] flex-1 overflow-y-auto ">
        {groups.map((group) => (
          <BoardGroup key={group.id} group={group} viewMode={viewMode} />
        ))}
      </div>
    </div>
  );
};

export default Board;
