// import React from "react";
// import CardItem from "./CardItem";
// import ListItem from "./ListItem";
// import TableView from "./TableView";

// const BoardGroup = ({ groupData, viewMode }) => {
//   return (
//     <div className="w-full mb-6 bg-white px-[24px] py-[24px]">
//       <div className="flex items-center mb-4">
//         <div className={`w-4 h-8 rounded-[4px] bg-purple-300`}></div>
//         <h2 className="ml-2 font-semibold text-lg">Group 1</h2>
//       </div>

//       {viewMode === "list" ? (
//         <div className="w-full">
//           {/* List items */}
//           {groupData?.map((item) => (
//             <ListItem key={item.id} item={item} />
//           ))}
//         </div>
//       ) : viewMode === "table" ? (
//         <>
//           <div className="w-full border border-gray-200 rounded-md overflow-hidden">
//             {/* Desktop Table with Headers (hidden on mobile) */}
//             <div className="hidden md:block">
//               <table className="w-full border-collapse">
//                 <thead>
//                   <tr className="bg-gray-50 border-b border-gray-200">
//                     <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
//                       Item Name <span className="ml-1">↕</span>
//                     </th>
//                     <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
//                       Status <span className="ml-1">↕</span>
//                     </th>
//                     <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
//                       Priority <span className="ml-1">↕</span>
//                     </th>
//                     <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
//                       Date <span className="ml-1">↕</span>
//                     </th>
//                     <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
//                       People <span className="ml-1">↕</span>
//                     </th>
//                     <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
//                       Numbers <span className="ml-1">↕</span>
//                     </th>
//                   </tr>
//                 </thead>
//                 {groupData?.map((item) => (
//                   <TableView key={item.id} item={item} />
//                 ))}
//               </table>
//             </div>

//             {/* Mobile Card View (no headers) */}
//             <div className="md:hidden p-2 space-y-2">
//               {groupData?.map((item) => (
//                 <TableView key={item.id} item={item} />
//               ))}
//             </div>
//           </div>
//         </>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {groupData?.map((item) => (
//             <CardItem key={item.id} item={item} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default BoardGroup;

import React, { useState } from "react";
import CardItem from "./CardItem";
import ListItem from "./ListItem";
import TableView from "./TableView";
import { FiFilter, FiChevronDown, FiCheck } from "react-icons/fi";

const BoardGroup = ({ groupData, viewMode }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("default");

  const sortOptions = [
    { value: "default", label: "Default" },
    { value: "name-asc", label: "Name (A-Z)" },
    { value: "name-desc", label: "Name (Z-A)" },
    { value: "date-asc", label: "Date (Oldest first)" },
    { value: "date-desc", label: "Date (Newest first)" },
    { value: "priority-high", label: "Priority (High first)" },
    { value: "priority-low", label: "Priority (Low first)" },
  ];

  return (
    <div className="w-full mb-6 bg-white px-[24px] py-[24px] rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className={`w-4 h-8 rounded-[4px] bg-purple-300`}></div>
          <h2 className="ml-2 font-semibold text-lg">Group 1</h2>
        </div>

        {/* Filter Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors"
          >
            <FiFilter className="text-gray-500" />
            Sort
            <FiChevronDown
              className={`transition-transform ${
                isFilterOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isFilterOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-10 border border-gray-100">
              <div className="py-1">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSelectedSort(option.value);
                      setIsFilterOpen(false);
                      // Here you would implement the actual sorting logic
                    }}
                    className={`flex items-center justify-between w-full px-4 py-2 text-sm text-left ${
                      selectedSort === option.value
                        ? "bg-purple-50 text-purple-700"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {option.label}
                    {selectedSort === option.value && (
                      <FiCheck className="text-purple-500" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {viewMode === "list" ? (
        <div className="w-full">
          {/* List items */}
          {groupData?.map((item) => (
            <ListItem key={item.id} item={item} />
          ))}
        </div>
      ) : viewMode === "table" ? (
        <>
          <div className="w-full border border-gray-200 rounded-md overflow-hidden">
            {/* Desktop Table with Headers (hidden on mobile) */}
            <div className="hidden md:block">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
                      Item Name <span className="ml-1">↕</span>
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
                      Status <span className="ml-1">↕</span>
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
                      Priority <span className="ml-1">↕</span>
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
                      Date <span className="ml-1">↕</span>
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
                      People <span className="ml-1">↕</span>
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
                      Numbers <span className="ml-1">↕</span>
                    </th>
                  </tr>
                </thead>
                {groupData?.map((item) => (
                  <TableView key={item.id} item={item} />
                ))}
              </table>
            </div>

            {/* Mobile Card View (no headers) */}
            <div className="md:hidden p-2 space-y-2">
              {groupData?.map((item) => (
                <TableView key={item.id} item={item} />
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groupData?.map((item) => (
            <CardItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BoardGroup;
