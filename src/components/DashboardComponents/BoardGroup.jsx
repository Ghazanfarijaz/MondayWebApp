import React, { useState } from "react";
import CardItem from "./CardItem";
import ListItem from "./ListItem";
import TableView from "./TableView";
import { FiFilter, FiChevronDown, FiCheck } from "react-icons/fi";

const BoardGroup = ({ groupData, viewMode, onSortChange, currentSort }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Simplified sort options
  const sortOptions = [
    { value: "default", label: "Default", apiConfig: null },
    {
      value: "name-asc",
      label: "Name (A-Z)",
      apiConfig: [{ columnId: "name", direction: "asc" }],
    },
    {
      value: "name-desc",
      label: "Name (Z-A)",
      apiConfig: [{ columnId: "name", direction: "desc" }],
    },
    {
      value: "date-asc",
      label: "Date (Oldest first)",
      apiConfig: [{ columnId: "date_mkqzac6z", direction: "asc" }],
    },
    {
      value: "date-desc",
      label: "Date (Newest first)",
      apiConfig: [{ columnId: "date_mkqzac6z", direction: "desc" }],
    },
    {
      value: "priority-high",
      label: "Priority (High first)",
      apiConfig: [{ columnId: "numeric_mkqzr3ws", direction: "desc" }],
    },
    {
      value: "priority-low",
      label: "Priority (Low first)",
      apiConfig: [{ columnId: "numeric_mkqzr3ws", direction: "asc" }],
    },
  ];

  // Map UI selections to API format
  const getSortConfig = (value) => {
    switch (value) {
      case "name-asc":
        return [{ columnId: "name", direction: "asc" }];
      case "name-desc":
        return [{ columnId: "name", direction: "desc" }];
      case "date-asc":
        return [{ columnId: "date_mkqzac6z", direction: "asc" }];
      case "date-desc":
        return [{ columnId: "date_mkqzac6z", direction: "desc" }];
      case "priority-high":
        return [{ columnId: "numeric_mkqzr3ws", direction: "desc" }];
      case "priority-low":
        return [{ columnId: "numeric_mkqzr3ws", direction: "asc" }];
      default:
        return null;
    }
  };

  // Find current sort value for UI
  const getCurrentSortValue = () => {
    if (!currentSort) return "default";

    console.log("Current Sort:", currentSort);

    const found = sortOptions.find(
      (option) =>
        JSON.stringify(option.apiConfig) === JSON.stringify(currentSort)
    );

    return found ? found.value : "default";
  };

  return (
    <div className="w-full mb-6 bg-white dark:bg-black blue:bg-dark-blue px-[24px] py-[24px] rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className={`w-4 h-8 rounded-[4px] bg-purple-300`}></div>
          <h2 className="ml-2 font-semibold text-lg text-black dark:text-white blue:text-white">
            Group 1
          </h2>
        </div>

        {/* Filter Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-500 dark:text-white blue:text-white bg-gray-50 dark:bg-light-black blue:bg-light-blue hover:bg-gray-100 rounded-md transition-colors "
          >
            <FiFilter className="text-gray-500 dark:text-white blue:text-white" />
            Sort
            <FiChevronDown
              className={`transition-transform ${
                isFilterOpen ? "rotate-180" : ""
              } text-gray-500 dark:text-white blue:text-white`}
            />
          </button>

          {isFilterOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-light-black blue:bg-light-blue rounded-md shadow-lg z-10 border border-[#EAEAEA] dark:border-[#4E4E4E] blue:border-blue">
              <div className="py-1">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      onSortChange(getSortConfig(option.value));
                      setIsFilterOpen(false);
                      // Here you would implement the actual sorting logic
                    }}
                    className={`flex items-center justify-between w-full px-4 py-2 text-sm text-left ${

                      getCurrentSortValue() === option.value
                        ? "bg-purple-50 text-purple-700"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {option.label}
                    {getCurrentSortValue() === option.value && (
                      <FiCheck className="text-purple-500" />
                      selectedSort === option.value
                        ? "bg-gray-200/25 text-black"
                        : "hover:text-black dark:hover:text-black blue:hover:text-black hover:bg-gray-50"
                    } text-gray-700 dark:text-white blue:text-white`}
                  >
                    {option.label}
                    {selectedSort === option.value && (
                      <FiCheck className="text-gray-700 dark:text-white blue:text-white" />

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
          <div className="w-full border border-gray-200 dark:border-[#4E4E4E] blue:border-blue rounded-md overflow-hidden">
            {/* Desktop Table with Headers (hidden on mobile) */}
            <div className="hidden md:block">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-white dark:bg-black blue:bg-dark-blue border-b border-b-gray-200 dark:border-b-[#4E4E4E] blue:border-b-blue border-gray-200 dark:border-[#4E4E4E] blue:border-blue">
                    <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-white blue:text-white text-sm">
                      Item Name <span className="ml-1">↕</span>
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-white blue:text-white text-sm">
                      Status <span className="ml-1">↕</span>
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-white blue:text-white text-sm">
                      Priority <span className="ml-1">↕</span>
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-white blue:text-white text-sm">
                      Date <span className="ml-1">↕</span>
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-white blue:text-white text-sm">
                      People <span className="ml-1">↕</span>
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-white blue:text-white text-sm">
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
