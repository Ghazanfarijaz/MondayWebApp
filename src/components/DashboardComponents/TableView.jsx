import React from "react";
import { useNavigate } from "react-router-dom";

const TableView = ({ item }) => {
  const navigate = useNavigate();

  const handleRowClick = (item) => {
    navigate("/mainpage/item-details", { state: { item } });
  };

  return (
    <tbody>
      {/* {items && items.length > 0 ? (
        items.map((item, index) => ( */}
      <tr
        // key={index}
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
      {/* ))
      ) : (
        <tr>
          <td colSpan="6" className="py-4 px-4 text-center text-gray-500">
            No items found
          </td>
        </tr>
      )} */}
    </tbody>
  );
};

export default TableView;
