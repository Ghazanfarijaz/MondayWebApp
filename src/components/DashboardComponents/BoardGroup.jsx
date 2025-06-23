import { useState } from "react";
import CardItem from "./CardItem";
import ListItem from "./ListItem";
import TableView from "./TableView";
import { FiFilter, FiChevronDown, FiCheck } from "react-icons/fi";
import { useBoard } from "../../contexts/BoardContext";
import { useNavigate } from "react-router-dom";

const BoardGroup = ({ groupData, viewMode }) => {
  const { usersPhotoThumb } = useBoard();
  const navigate = useNavigate();
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
                      setSelectedSort(option.value);
                      setIsFilterOpen(false);
                      // Here you would implement the actual sorting logic
                    }}
                    className={`flex items-center justify-between w-full px-4 py-2 text-sm text-left ${
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

      {groupData.length < 1 ? (
        <p className="text-gray-500 dark:text-gray-400 blue:text-gray-400">
          Couldn't find any items in this group.
        </p>
      ) : viewMode === "list" ? (
        <div className="w-full">
          {/* List items */}
          {groupData?.map((item) => (
            <ListItem key={item.id} item={item} />
          ))}
        </div>
      ) : viewMode === "table" ? (
        <div className="w-full lg:border border-gray-200 dark:border-[#4E4E4E] blue:border-blue rounded-md overflow-hidden">
          {/* Desktop Table with Headers (hidden on mobile) */}

          <table className="hidden lg:table w-full table-auto border-collapse">
            <thead>
              <tr className="bg-white dark:bg-black blue:bg-dark-blue border-b border-gray-200 dark:border-[#4E4E4E] blue:border-blue">
                <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-white blue:text-white text-sm">
                  Name
                  <span className="ml-1">↕</span>
                </th>

                {groupData[0].column_values.slice(0, 5).map((item, index) => (
                  <th
                    key={index}
                    className="text-left py-3 px-4 font-medium text-gray-500 dark:text-white blue:text-white text-sm"
                  >
                    {item.column.title}
                    <span className="ml-1">↕</span>
                  </th>
                ))}
              </tr>
              {/* <tr className="bg-white dark:bg-black blue:bg-dark-blue border-b border-gray-200 dark:border-[#4E4E4E] blue:border-blue">
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
              </tr> */}
            </thead>

            <tbody className="table-row-group">
              {groupData.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-200 dark:border-[#4E4E4E] blue:border-blue cursor-pointer"
                  onClick={() => {
                    navigate(`/item-details/${item.id}`);
                  }}
                >
                  <td className="py-3 px-4 text-gray-700 dark:text-white blue:text-white font-medium">
                    {item.name || "Untitled Item"}
                  </td>

                  {item.column_values.slice(0, 5).map((columnValue) => (
                    <td key={columnValue.id} className="py-3 px-4">
                      {columnValue.type === "status" ? (
                        <span
                          className="px-3 py-1 text-xs rounded-full font-medium whitespace-nowrap"
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
                        <div className="flex">
                          {columnValue.persons_and_teams?.map((person) => (
                            <img
                              key={person.id}
                              className="w-6 h-6 rounded-full border-2 border-white -mr-2"
                              src={
                                usersPhotoThumb?.users?.data?.find(
                                  (user) => user.id === person.id
                                )?.photo_thumb || "/api/placeholder/24/24"
                              }
                              alt={`Person ${person.id}`}
                              onError={(e) => {
                                e.target.src = "/api/placeholder/24/24";
                              }}
                            />
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-700 dark:text-white blue:text-white block">
                          {columnValue.type === "checkbox"
                            ? columnValue.text
                              ? "Yes"
                              : "No"
                            : columnValue.text || "N/A"}
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile Card View (no headers) */}
          {groupData?.map((item) => (
            <TableView key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {groupData?.map((item) => (
            <CardItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BoardGroup;
