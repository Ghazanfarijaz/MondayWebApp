import React from "react";
import { useNavigate } from "react-router-dom";
import { useBoard } from "../../contexts/BoardContext";

const CardItem = ({ item }) => {
  const navigate = useNavigate();
  const { usersPhotoThumb, usersError, usersLoading } = useBoard();

  const handleClick = (id) => {
    navigate(`/item-details/${id}`);
  };

  if (usersLoading) {
    return (
      <div className="p-[40px] bg-gray-200 flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (usersError) {
    return (
      <div className="p-[40px] bg-gray-200 flex items-center justify-center h-full">
        <p className="text-red-500">Error in user photothumb: {usersError}</p>
      </div>
    );
  }

  return (
    <div
      onClick={() => handleClick(item.id)}
      className="bg-white p-6 rounded-lg shadow mb-4 border border-gray-200 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
    >
      <h3 className="font-medium mb-2">{item.name}</h3>

      {item.column_values.map((columnValue, i) => {
        if (i > 4) return null;
        return columnValue.type === "status" ? (
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">
              {columnValue.column.title}
            </span>
            <span
              className="px-2 py-1 text-xs rounded-[4px] text-white"
              // style={{ backgroundColor: columnValue.label_style.color }}
              style={{
                backgroundColor: `${
                  columnValue.label_style?.color || "#e5e7eb"
                }20`,
                color: columnValue.label_style?.color || "#374151",
                border: `1px solid ${
                  columnValue.label_style?.color || "#e5e7eb"
                }`,
              }}
            >
              {columnValue.text}
            </span>
          </div>
        ) : columnValue.type === "people" ? (
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">
              {columnValue.column.title}
            </span>
            <div className="flex">
              {columnValue.persons_and_teams?.map((person, index) => (
                <img
                  className="w-6 h-6 rounded-full -mr-1"
                  src={
                    usersPhotoThumb.users.data.find(
                      (user) => user.id === person.id
                    )?.photo_thumb
                  }
                  alt="Person 1"
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-center truncate mb-2">
            <span className="text-sm text-gray-600">
              {columnValue.column.title}
            </span>
            <span className="text-sm">
              {columnValue.type === "checkbox"
                ? columnValue.text
                  ? "Yes"
                  : "No"
                : columnValue.text || "N/A"}{" "}
            </span>
          </div>
        );
      })}

      {/* <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-600">Status</span>
        <span className="px-2 py-1 text-xs rounded-[4px] bg-green-100 text-green-800">
          {item.name}
        </span>
      </div> */}

      {/* <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-600">Priority</span>
        <span className="px-2 py-1 text-xs rounded-[4px] bg-red-500 text-white">
          {item.priority}
        </span>
      </div> */}

      {/* <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-600">Date</span>
        <span className="text-sm"></span>
      </div> */}

      {/* <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-600">People</span>
        <div className="flex">
          <img
            className="w-6 h-6 rounded-full -mr-1"
            // src={item.people?.image1}
            alt="Person 1"
          />
          <img
            className="w-6 h-6 rounded-full"
            // src={item.people?.image2}
            alt="Person 2"
          />
        </div>
      </div> */}

      {/* <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600">Board</span>
        <span className="text-sm"></span>
      </div> */}
    </div>
  );
};

export default CardItem;
