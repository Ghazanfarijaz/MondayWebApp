import React from "react";
import { useNavigate } from "react-router-dom";
import { useBoard } from "../../contexts/BoardContext";
import PropTypes from "prop-types";

const ListItem = ({ item }) => {
  const navigate = useNavigate();
  const { usersPhotoThumb, usersError, usersLoading } = useBoard();

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
      onClick={() => navigate(`/item-details/${item.id}`)}
      className="grid grid-cols-6 gap-4 p-4 my-2 bg-white dark:bg-black blue:bg-dark-blue rounded-lg border border-[#EAEAEA] dark:border-[#4E4E4E] blue:border-blue cursor-pointer shadow-sm transition-colors duration-200"
    >
      {/* Title Column */}
      <div className="flex items-center">
        <span className="text-gray-700 dark:text-white blue:text-white font-medium truncate">
          {item.name || "Untitled Item"}
        </span>
      </div>

      {/* Dynamically render first 5 column values */}
      {item.column_values.slice(0, 5).map((columnValue) => (
        <div key={columnValue.id} className="flex items-center">
          {columnValue.type === "status" ? (
            <span
              className="px-3 py-1 text-xs rounded-full font-medium truncate max-w-full"
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
              {columnValue.text || "N/A"}
            </span>
          ) : columnValue.type === "people" ? (
            <div className="flex -space-x-2">
              {columnValue.persons_and_teams?.slice(0, 3).map((person) => (
                <img
                  key={person.id}
                  className="w-6 h-6 rounded-full object-cover"
                  src={
                    usersPhotoThumb.users.data.find(
                      (user) => user.id === person.id
                    )?.photo_thumb || "/default-avatar.png"
                  }
                  alt={`Person ${person.id}`}
                  onError={(e) => {
                    e.target.src = "/default-avatar.png";
                  }}
                />
              ))}
              {columnValue.persons_and_teams?.length > 3 && (
                <div className="w-6 h-6 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center">
                  <span className="text-xs text-gray-600">
                    +{columnValue.persons_and_teams.length - 3}
                  </span>
                </div>
              )}
            </div>
          ) : (
            <span className="text-sm text-gray-600 dark:text-white blue:text-white truncate max-w-full">
              {columnValue.type === "checkbox"
                ? columnValue.text
                  ? "Yes"
                  : "No"
                : columnValue.text || "N/A"}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

ListItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default ListItem;
