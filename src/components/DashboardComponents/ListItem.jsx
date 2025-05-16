// import React from "react";
// import { useNavigate } from "react-router-dom";

// const ListItem = ({ item }) => {
//   const navigate = useNavigate();

//   const handleClick = () => {
//     navigate("/mainpage/item-details", { state: { item } });
//   };

//   return (
//     <div
//       onClick={handleClick}
//       className="flex flex-col md:flex-row items-start md:items-center p-3 md:p-4 my-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer shadow-sm"
//     >
//       {/* Title - full width on mobile, normal width on larger screens */}
//       <div className="w-full md:w-auto md:pr-4 lg:pr-6 xl:pr-20 mb-2 md:mb-0">
//         <span className="text-gray-700 font-normal">
//           {item.title || "Placeholder for text"}
//         </span>
//       </div>

//       {/* Status */}
//       <div className="flex flex-wrap gap-2 md:gap-0 w-full md:w-auto md:px-2 lg:px-6 xl:px-20 mb-2 md:mb-0">
//         <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-600 font-medium">
//           {item.status || "Active"}
//         </span>
//       </div>

//       {/* Priority */}
//       <div className="flex flex-wrap gap-2 md:gap-0 w-full md:w-auto md:px-2 lg:px-6 xl:px-20 mb-2 md:mb-0">
//         <span className="px-3 py-1 text-xs rounded-md bg-red-500 text-white font-medium">
//           {item.priority || "High"}
//         </span>
//       </div>

//       {/* Date */}
//       <div className="w-full md:w-auto md:px-2 lg:px-6 xl:px-20 text-sm text-gray-600 mb-2 md:mb-0">
//         {item.date || "24 July, 2024"}
//       </div>

//       {/* People */}
//       <div className="w-full md:w-auto md:px-2 lg:px-6 xl:px-20 mb-2 md:mb-0">
//         <div className="flex">
//           <img
//             className="w-6 h-6 rounded-full border-2 border-white -mr-2"
//             src={item.people?.image1 || "/api/placeholder/24/24"}
//             alt="Person 1"
//           />
//           <img
//             className="w-6 h-6 rounded-full border-2 border-white"
//             src={item.people?.image2 || "/api/placeholder/24/24"}
//             alt="Person 2"
//           />
//         </div>
//       </div>

//       {/* Board */}
//       <div className="w-full md:w-auto md:px-2 lg:px-6 xl:px-20 text-sm text-gray-700 font-medium">
//         {item.board || "XYZ Board"}
//       </div>
//     </div>
//   );
// };

// export default ListItem;

import React from "react";
import { useNavigate } from "react-router-dom";

const ListItem = ({ item }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/mainpage/item-details", { state: { item } });
  };

  // Helper function to get column value by title
  const getColumnValue = (title) => {
    const column = item.column_values.find((col) => col.column.title === title);
    return column || null;
  };

  // Extract specific column values
  const statusColumn = getColumnValue("Status");
  const priorityColumn = getColumnValue("Priority");
  const dateColumn = getColumnValue("Date");
  const peopleColumn = getColumnValue("People");
  const boardColumn = getColumnValue("Board");

  return (
    <div
      onClick={handleClick}
      className="flex flex-col md:flex-row items-start md:items-start p-3 md:p-4 my-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer shadow-sm"
    >
      {/* Title */}
      <div className="w-full md:w-auto md:pr-4 lg:pr-6 xl:pr-20 mb-2 md:mb-0">
        <span className="text-gray-700 font-normal">
          {item.name || "Untitled Item"}
        </span>
      </div>

      {/* Status */}
      <div className="flex flex-wrap gap-2 md:gap-0 w-full md:w-auto md:px-2 lg:px-6 xl:px-20 mb-2 md:mb-0">
        {statusColumn ? (
          <span
            className="px-3 py-1 text-xs rounded-full font-medium"
            style={{
              backgroundColor: `${
                statusColumn.label_style?.color || "#e5e7eb"
              }20`,
              color: statusColumn.label_style?.color || "#374151",
              border: `1px solid ${
                statusColumn.label_style?.color || "#e5e7eb"
              }`,
            }}
          >
            {statusColumn.text || "No Status"}
          </span>
        ) : (
          <span className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-600 font-medium">
            No Status
          </span>
        )}
      </div>

      {/* Priority */}
      <div className="flex flex-wrap gap-2 md:gap-0 w-full md:w-auto md:px-2 lg:px-6 xl:px-20 mb-2 md:mb-0">
        {priorityColumn ? (
          <span
            className="px-3 py-1 text-xs rounded-md font-medium"
            style={{
              backgroundColor: priorityColumn.label_style?.color || "#ef4444",
              color: priorityColumn.label_style?.text_color || "#ffffff",
            }}
          >
            {priorityColumn.text || "No Priority"}
          </span>
        ) : (
          <span className="px-3 py-1 text-xs rounded-md bg-red-500 text-white font-medium">
            No Priority
          </span>
        )}
      </div>

      {/* Date */}
      <div className="w-full md:w-auto md:px-2 lg:px-6 xl:px-20 text-sm text-gray-600 mb-2 md:mb-0">
        {dateColumn ? dateColumn.text || "No Date" : "No Date"}
      </div>

      {/* People */}
      <div className="w-full md:w-auto md:px-2 lg:px-6 xl:px-20 mb-2 md:mb-0">
        {peopleColumn && peopleColumn.value ? (
          <div className="flex">
            {JSON.parse(peopleColumn.value)
              .slice(0, 2)
              .map((person, index) => (
                <img
                  key={index}
                  className={`w-6 h-6 rounded-full border-2 border-white ${
                    index !== 0 ? "-ml-2" : ""
                  }`}
                  src={person.photo_url || "/api/placeholder/24/24"}
                  alt={person.name}
                />
              ))}
          </div>
        ) : (
          <div className="flex">
            <img
              className="w-6 h-6 rounded-full border-2 border-white"
              src="/api/placeholder/24/24"
              alt="No person"
            />
          </div>
        )}
      </div>

      {/* Board */}
      <div className="w-full md:w-auto md:px-2 lg:px-6 xl:px-20 text-sm text-gray-700 font-medium">
        {boardColumn ? boardColumn.text || "No Board" : "No Board"}
      </div>
    </div>
  );
};

export default ListItem;
