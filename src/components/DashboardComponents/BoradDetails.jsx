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

  // Handle loading and error states
  if (loading) return <div className="p-[40px]">Loading...</div>;
  if (error) return <div className="p-[40px]">Error: {error}</div>;
  if (!item) return <div className="p-[40px]">Item not found</div>;

  // Helper function to get column values
  const getColumnValue = (title) => {
    return item.column_values?.find((col) => col.column?.title === title)?.text;
  };

  // Extract specific fields
  const status = item.column_values?.find(
    (col) => col.column?.title === "Status"
  );
  const people = item.column_values?.find(
    (col) => col.column?.title === "People"
  );
  const date = getColumnValue("Date");
  const description = getColumnValue("Long text");
  const numbers = getColumnValue("Numbers");
  const dropdown = getColumnValue("Dropdown");
  const boardRelation = getColumnValue("eAudit Development");
  const timeline = getColumnValue("Timeline");
  const checkbox = item.column_values?.find(
    (col) => col.column?.title === "Check"
  );

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

      {/* Item details card */}
      {/* <div className="bg-white p-6 rounded-lg shadow-sm">
       
        {status && (
          <div className="grid grid-cols-[150px_1fr] items-center mb-4">
            <span className="text-gray-500">{status.column.title}</span>
            <span
              className="px-3 py-1 text-sm rounded-[4px] text-white w-fit"
              style={{ backgroundColor: status.label_style?.color }}
            >
              {status.text}
            </span>
          </div>
        )}

     
        {people && (
          <div className="grid grid-cols-[150px_1fr] items-center mb-4">
            <span className="text-gray-500">{people.column.title}</span>
            <div className="flex">
              {people.persons_and_teams?.map((person, index) => (
                <div
                  key={index}
                  className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium -ml-2 first:ml-0"
                >
                  {person.kind === "person" ? "P" : "T"}
                </div>
              ))}
            </div>
          </div>
        )}

      
        {date && (
          <div className="grid grid-cols-[150px_1fr] items-center mb-4">
            <span className="text-gray-500">Date</span>
            <span>{date}</span>
          </div>
        )}

     
        {numbers && (
          <div className="grid grid-cols-[150px_1fr] items-center mb-4">
            <span className="text-gray-500">Numbers</span>
            <span>{numbers}</span>
          </div>
        )}

      
        {dropdown && (
          <div className="grid grid-cols-[150px_1fr] items-center mb-4">
            <span className="text-gray-500">Dropdown</span>
            <span>{dropdown}</span>
          </div>
        )}

       
        {boardRelation && (
          <div className="grid grid-cols-[150px_1fr] items-center mb-4">
            <span className="text-gray-500">eAudit Development</span>
            <span>{boardRelation}</span>
          </div>
        )}

       
        {timeline && (
          <div className="grid grid-cols-[150px_1fr] items-center mb-4">
            <span className="text-gray-500">Timeline</span>
            <span>{timeline}</span>
          </div>
        )}

        
        {checkbox && (
          <div className="grid grid-cols-[150px_1fr] items-center mb-4">
            <span className="text-gray-500">{checkbox.column.title}</span>
            <span>{checkbox.text ? "Yes" : "No"}</span>
          </div>
        )}

   
        {description && (
          <div className="grid grid-cols-[150px_1fr] items-start mb-4">
            <span className="text-gray-500">Description</span>
            <p className="text-gray-700 whitespace-pre-line">{description}</p>
          </div>
        )}
      </div> */}
    </div>
  );
};

export default ItemDetails;
