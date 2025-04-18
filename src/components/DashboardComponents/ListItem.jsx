import React from "react";
import { useNavigate } from "react-router-dom";

const ListItem = ({ item }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/mainpage/item-details", { state: { item } });
  };

  return (
    <div
      onClick={handleClick}
      className="flex flex-col md:flex-row items-start md:items-center p-3 md:p-4 my-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer shadow-sm"
    >
      {/* Title - full width on mobile, normal width on larger screens */}
      <div className="w-full md:w-auto md:pr-4 lg:pr-6 xl:pr-20 mb-2 md:mb-0">
        <span className="text-gray-700 font-normal">
          {item.title || "Placeholder for text"}
        </span>
      </div>

      {/* Status */}
      <div className="flex flex-wrap gap-2 md:gap-0 w-full md:w-auto md:px-2 lg:px-6 xl:px-20 mb-2 md:mb-0">
        <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-600 font-medium">
          {item.status || "Active"}
        </span>
      </div>

      {/* Priority */}
      <div className="flex flex-wrap gap-2 md:gap-0 w-full md:w-auto md:px-2 lg:px-6 xl:px-20 mb-2 md:mb-0">
        <span className="px-3 py-1 text-xs rounded-md bg-red-500 text-white font-medium">
          {item.priority || "High"}
        </span>
      </div>

      {/* Date */}
      <div className="w-full md:w-auto md:px-2 lg:px-6 xl:px-20 text-sm text-gray-600 mb-2 md:mb-0">
        {item.date || "24 July, 2024"}
      </div>

      {/* People */}
      <div className="w-full md:w-auto md:px-2 lg:px-6 xl:px-20 mb-2 md:mb-0">
        <div className="flex">
          <img
            className="w-6 h-6 rounded-full border-2 border-white -mr-2"
            src={item.people?.image1 || "/api/placeholder/24/24"}
            alt="Person 1"
          />
          <img
            className="w-6 h-6 rounded-full border-2 border-white"
            src={item.people?.image2 || "/api/placeholder/24/24"}
            alt="Person 2"
          />
        </div>
      </div>

      {/* Board */}
      <div className="w-full md:w-auto md:px-2 lg:px-6 xl:px-20 text-sm text-gray-700 font-medium">
        {item.board || "XYZ Board"}
      </div>
    </div>
  );
};

export default ListItem;
