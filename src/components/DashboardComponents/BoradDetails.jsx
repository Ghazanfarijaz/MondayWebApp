import React from "react";
import { Link } from "react-router-dom";
import { useBoard } from "../../contexts/BoardContext";
import { useParams } from "react-router-dom";

const ItemDetails = () => {
  const { groupData, loading, error } = useBoard();
  const { usersPhotoThumb, usersError, usersLoading } = useBoard();
  const { id } = useParams();

  console.log("userPhotothumb :", usersPhotoThumb);

  // Find the specific item by matching the ID
  const item = groupData?.find((item) => item.id === id);

  if (!item) return <div className="p-[40px]">Item not found</div>;

  if (loading) {
    return (
      <div className="p-[40px] bg-gray-200 flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-[40px] bg-gray-200 flex items-center justify-center h-full">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

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
    <div className="flex-1 p-[40px] overflow-auto bg-gray-100 h-auto">
      {/* Breadcrumb navigation */}
      <div className="text-sm text-gray-500 mb-4">
        <Link to="/mainpage" className="hover:underline">
          Board 1
        </Link>{" "}
        / Item Details
      </div>

      {/* Item title */}
      <h1 className="text-3xl font-bold mb-8">{item.name}</h1>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        {item.column_values.map((columnValue, i) => {
          return columnValue.type === "status" ? (
            <div className="grid grid-cols-[150px_1fr] items-center mb-4">
              <span className="text-gray-500">{columnValue.column.title}</span>
              <span
                className="px-3 py-1 text-sm rounded-[4px] text-white w-fit"
                style={{ backgroundColor: columnValue.label_style?.color }}
              >
                {columnValue.text}
              </span>
            </div>
          ) : columnValue.type === "people" ? (
            <div className="grid grid-cols-[150px_1fr] items-center mb-4">
              <span className="text-gray-500">{columnValue.column.title}</span>
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
            <div className="grid grid-cols-[150px_1fr] items-start mb-4">
              <span className="text-gray-500">{columnValue.column.title}</span>
              <p className="text-gray-700 whitespace-pre-line">
                {columnValue.type === "checkbox"
                  ? columnValue.text
                    ? "Yes"
                    : "No"
                  : columnValue.text || "N/A"}{" "}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ItemDetails;
