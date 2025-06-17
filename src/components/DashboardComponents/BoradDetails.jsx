import React from "react";
import { Link } from "react-router-dom";
import { useBoard } from "../../contexts/BoardContext";
import { useParams } from "react-router-dom";

const ItemDetails = () => {
  const { groupData, loading, error } = useBoard();
  const { usersPhotoThumb, usersError, usersLoading } = useBoard();
  const { id } = useParams();

  // Find the specific item by matching the ID
  const item = groupData?.find((item) => item.id === id);

  if (loading) {
    return (
      <div className="p-[40px] bg-gray-200 dark:bg-light-black blue:bg-light-blue flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-gray-100 blue:border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-[40px] bg-gray-200 dark:bg-light-black blue:bg-light-blue flex items-center justify-center h-full">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (usersLoading) {
    return (
      <div className="p-[40px] bg-gray-200 dark:bg-light-black blue:bg-light-blue flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-gray-100 blue:border-white"></div>
      </div>
    );
  }

  if (usersError) {
    return (
      <div className="p-[40px] bg-gray-200 dark:bg-light-black blue:bg-light-blue flex items-center justify-center h-full">
        <p className="text-red-500">Error in user photothumb: {usersError}</p>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="p-[40px] text-gray-500 dark:text-gray-400 blue:text-gray-400 flex items-center justify-center h-full bg-gray-200 dark:bg-light-black blue:bg-light-blue">
        Item not found
      </div>
    );
  }

  return (
    <div className="h-full max-h-[calc(100dvh-68px)] p-[40px] overflow-auto bg-gray-100 dark:bg-light-black blue:bg-light-blue">
      {/* Breadcrumb navigation */}
      <div className="text-sm mb-4 text-gray-500 dark:text-white blue:text-white">
        <Link
          to="/"
          className="hover:underline text-gray-500 dark:text-white blue:text-white"
        >
          Board 1
        </Link>{" "}
        /{" "}
        <span className="text-[#BDBDBD] dark:text-[#A2A2A2] blue:text-gray-100">
          Item Details
        </span>
      </div>

      {/* Item title */}
      <div className="flex items-center justify-between gap-8 mb-8">
        <h1 className="text-3xl font-bold text-black dark:text-white blue:text-white break-all">
          {item.name}
        </h1>
        <Link
          to={`edit-details`}
          className="px-4 py-2 bg-[#2A85FF] text-white rounded-lg hover:shadow-lg transition-colors duration-200"
        >
          Edit Item
        </Link>
      </div>

      <div className="bg-white dark:bg-black blue:bg-dark-blue p-6 rounded-lg shadow-sm">
        {item.column_values.map((columnValue, i) => {
          if (columnValue.type === "status") {
            return (
              <div
                key={columnValue.id}
                className="grid grid-cols-[150px_1fr] gap-[32px] items-center mb-4"
              >
                <span className="text-gray-500 dark:text-[#6F767E] blue:text-gray-400">
                  {columnValue.column.title}
                </span>
                <span
                  className="px-3 py-1 text-sm rounded-[4px] text-white w-fit"
                  style={{ backgroundColor: columnValue.label_style?.color }}
                >
                  {columnValue.text}
                </span>
              </div>
            );
          } else if (columnValue.type === "people") {
            return (
              <div
                key={columnValue.id}
                className="grid grid-cols-[150px_1fr] gap-[32px] items-center mb-4"
              >
                <span className="text-gray-500 dark:text-[#6F767E] blue:text-gray-400">
                  {columnValue.column.title}
                </span>
                <div className="flex">
                  {columnValue.persons_and_teams?.map((person, index) => (
                    <img
                      key={index}
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
                  ))}
                </div>
              </div>
            );
          } else {
            return (
              <div
                key={columnValue.id}
                className="grid grid-cols-[150px_1fr] gap-[32px] items-start mb-4"
              >
                <span className="text-gray-500 dark:text-[#6F767E] blue:text-gray-400">
                  {columnValue.column.title}
                </span>
                <p className="text-gray-700 dark:text-white blue:text-white whitespace-pre-line">
                  {columnValue.type === "checkbox"
                    ? columnValue.text
                      ? "Yes"
                      : "No"
                    : columnValue.text || "N/A"}{" "}
                </p>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default ItemDetails;
