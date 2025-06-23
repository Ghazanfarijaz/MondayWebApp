import React from "react";
import { useNavigate } from "react-router-dom";
import { useBoard } from "../../contexts/BoardContext";
import { Loader } from "@mantine/core";
import { toast } from "sonner";

const CardItem = ({ item }) => {
  const navigate = useNavigate();
  const { usersPhotoThumb, usersError, usersLoading } = useBoard();

  if (usersError) {
    toast.error("Error!", {
      description: "Could not load data. Please try again later.",
    });
  }

  return (
    <div
      onClick={() => navigate(`/item-details/${item.id}`)}
      className="bg-white dark:bg-black blue:bg-dark-blue p-6 rounded-lg shadow mb-4 border border-[#EAEAEA] dark:border-[#4E4E4E] blue:border-blue hover:shadow-lg transition-shadow duration-300 cursor-pointer"
    >
      <h3 className="font-medium mb-2 text-black dark:text-white blue:text-white">
        {item.name}
      </h3>

      {item.column_values.map((columnValue, i) => {
        if (i > 4) return null;
        return columnValue.type === "status" ? (
          <div
            key={columnValue.id}
            className="flex justify-between items-center mb-2"
          >
            <span className="text-sm text-gray-600 dark:text-[#6F767E] blue:text-gray-400">
              {columnValue.column.title}
            </span>
            <span
              className="px-2 py-1 text-xs rounded-[4px] text-white"
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
          </div>
        ) : columnValue.type === "people" ? (
          <div
            key={columnValue.id}
            className="flex justify-between items-center mb-2"
          >
            <span className="text-sm text-gray-600 dark:text-[#6F767E] blue:text-gray-400">
              {columnValue.column.title}
            </span>
            <div className="flex">
              {usersLoading ? (
                <Loader size="sm" />
              ) : (
                columnValue.persons_and_teams?.map((person, index) => (
                  <img
                    className={`w-6 h-6 rounded-full ${
                      columnValue.persons_and_teams.length > 1 && "-mr-1"
                    }`}
                    src={
                      usersPhotoThumb.users.data.find(
                        (user) => user.id === person.id
                      )?.photo_thumb
                    }
                    alt="Person 1"
                  />
                ))
              )}
            </div>
          </div>
        ) : (
          <div
            key={columnValue.id}
            className="flex justify-between items-center truncate mb-2"
          >
            <span className="text-sm text-gray-600 dark:text-[#6F767E] blue:text-gray-400">
              {columnValue.column.title}
            </span>
            <span className="text-sm text-black dark:text-white blue:text-white">
              {columnValue.type === "checkbox"
                ? columnValue.text
                  ? "Yes"
                  : "No"
                : columnValue.text || "N/A"}{" "}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default CardItem;
