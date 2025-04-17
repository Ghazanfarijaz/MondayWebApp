import React from "react";
import { useNavigate } from "react-router-dom";

const CardItem = ({ item }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/mainpage/item-details", { state: { item } });
  };
  return (
    <div
      onClick={handleClick}
      className="bg-white p-4 rounded-lg shadow mb-4 border border-gray-200 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
    >
      <h3 className="font-medium mb-2">{item.title}</h3>

      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-600">Status</span>
        <span className="px-2 py-1 text-xs rounded-[4px] bg-green-100 text-green-800">
          {item.status}
        </span>
      </div>

      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-600">Priority</span>
        <span className="px-2 py-1 text-xs rounded-[4px] bg-red-500 text-white">
          {item.priority}
        </span>
      </div>

      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-600">Date</span>
        <span className="text-sm">{item.date}</span>
      </div>

      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-600">People</span>
        <div className="flex">
          <img
            className="w-6 h-6 rounded-full -mr-1"
            src={item.people?.image1}
            alt="Person 1"
          />
          <img
            className="w-6 h-6 rounded-full"
            src={item.people?.image2}
            alt="Person 2"
          />
        </div>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600">Board</span>
        <span className="text-sm">{item.board}</span>
      </div>
    </div>
  );
};

export default CardItem;
