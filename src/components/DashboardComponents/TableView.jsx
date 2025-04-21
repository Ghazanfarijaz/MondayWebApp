import React from "react";
import { useNavigate } from "react-router-dom";

const TableView = ({ item }) => {
  const navigate = useNavigate();

  const handleRowClick = (item) => {
    navigate("/mainpage/item-details", { state: { item } });
  };

  return (
    <>
      {/* Desktop Table View */}
      <tbody className="hidden md:table-row-group">
        <tr
          className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
          onClick={() => handleRowClick(item)}
        >
          <td className="py-3 px-4 text-gray-700">
            {item.title || "Placeholder for text"}
          </td>
          <td className="py-3 px-4">
            <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-600 font-medium">
              {item.status || "Active"}
            </span>
          </td>
          <td className="py-3 px-4">
            <span className="px-3 py-1 text-xs rounded-md bg-red-500 text-white font-medium">
              {item.priority || "High"}
            </span>
          </td>
          <td className="py-3 px-4 text-gray-600 text-sm">
            {item.date || "24 July, 2024"}
          </td>
          <td className="py-3 px-4">
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
          </td>
          <td className="py-3 px-4 text-gray-700">
            {item.board || "ABC Company"}
          </td>
        </tr>
      </tbody>

      {/* Mobile/Tab Card View */}
      <div
        className="md:hidden bg-white rounded-lg shadow-sm p-4 mb-3 border border-gray-100 hover:bg-gray-50 cursor-pointer"
        onClick={() => handleRowClick(item)}
      >
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-gray-800 truncate">
            {item.title || "Placeholder for text"}
          </h3>
          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-600 font-medium ml-2">
            {item.status || "Active"}
          </span>
        </div>

        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <span className="px-2 py-1 text-xs rounded-md bg-red-500 text-white font-medium">
              {item.priority || "High"}
            </span>
            <span className="ml-3 text-gray-600 text-sm">
              {item.date || "24 July, 2024"}
            </span>
          </div>
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

        <div className="text-sm text-gray-700 mt-2">
          {item.board || "ABC Company"}
        </div>
      </div>
    </>
  );
};

export default TableView;
