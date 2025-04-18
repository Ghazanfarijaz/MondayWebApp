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
      className="flex items-center p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
    >
      <div className="flex-1 ">
        <span className="text-gray-700 font-normal">
          {item.title || "Placeholder for text"}
        </span>
      </div>

      <div className="w-20 px-2">
        <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-600 font-medium">
          {item.status || "Active"}
        </span>
      </div>

      <div className="w-16 px-2">
        <span className="px-3 py-1 text-xs rounded-md bg-red-500 text-white font-medium">
          {item.priority || "High"}
        </span>
      </div>

      <div className="w-32 px-2 text-sm text-gray-600">
        {item.date || "24 July, 2024"}
      </div>

      <div className="w-20 px-2">
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

      <div className="w-28 px-2 text-sm text-gray-700 font-medium">
        {item.board || "XYZ Board"}
      </div>
    </div>
  );
};

export default ListItem;
