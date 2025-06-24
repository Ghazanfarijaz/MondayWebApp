import { useMemo, useState } from "react";
import CardItem from "./CardItem";
import ListItem from "./ListItem";
import TableView from "./TableView";

import { useBoard } from "../../contexts/BoardContext";
import { useNavigate } from "react-router-dom";
import SortFilter from "../UIComponents/SortFilter";

const BoardGroup = ({ groupData, viewMode }) => {
  const { usersPhotoThumb } = useBoard();
  const navigate = useNavigate();

  const [filteredData, setFilteredData] = useState(groupData);
  const [sortOptions, setSortOptions] = useState([]);
  const [selectedSort, setSelectedSort] = useState({
    value: "default",
    label: "Default",
  });

  const handleSortChange = ({ value, label }) => {
    if (value === "default") {
      return setFilteredData(groupData);
    }

    const [sortType, columnId, order] = value.split("-");

    const sortedData = [...groupData].sort((a, b) => {
      const columnA = a.column_values.find((col) => col.id === columnId);
      const columnB = b.column_values.find((col) => col.id === columnId);

      if (!columnA || !columnB) return 0;

      let aText = columnA.text ?? "";
      let bText = columnB.text ?? "";

      let comparison = 0;
      if (sortType === "text" || sortType === "status") {
        comparison = aText.localeCompare(bText);
      } else if (sortType === "date") {
        const aDate = new Date(aText);
        const bDate = new Date(bText);
        comparison = aDate - bDate;
      } else if (sortType === "priority") {
        const aPriority = columnA.priority ?? 0;
        const bPriority = columnB.priority ?? 0;
        comparison = aPriority - bPriority;
      }

      return order === "asc" ? comparison : -comparison;
    });

    setFilteredData(sortedData);
  };

  // useMemo to memoize filteredData based on groupData and sortOptions
  useMemo(() => {
    let sortingOptions = [
      {
        value: "default",
        label: "Default",
      },
    ];

    if (groupData.length > 0) {
      const firstItem = groupData[0];
      const columnValues = firstItem.column_values;

      columnValues.slice(0, 5).forEach((column) => {
        if (column.type === "text") {
          sortingOptions.push({
            value: `text-${column.id}-asc`,
            label: `${column.column.title} (A-Z)`,
          });
          sortingOptions.push({
            value: `text-${column.id}-desc`,
            label: `${column.column.title} (Z-A)`,
          });
        } else if (column.type === "date") {
          sortingOptions.push({
            value: `date-${column.id}-asc`,
            label: `${column.column.title} (Oldest First)`,
          });
          sortingOptions.push({
            value: `date-${column.id}-desc`,
            label: `${column.column.title} (Newest First)`,
          });
        } else if (column.type === "status") {
          sortingOptions.push({
            value: `status-${column.id}-asc`,
            label: `${column.column.title} (Status Asc)`,
          });
          sortingOptions.push({
            value: `status-${column.id}-desc`,
            label: `${column.column.title} (Status Desc)`,
          });
        } else if (column.type === "priority") {
          sortingOptions.push({
            value: `priority-${column.id}-asc`,
            label: `${column.column.title} (Priority Asc)`,
          });
          sortingOptions.push({
            value: `priority-${column.id}-desc`,
            label: `${column.column.title} (Priority Desc)`,
          });
        }
      });
    }

    setSortOptions(sortingOptions);
    handleSortChange(selectedSort);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupData, setSortOptions, setFilteredData]);

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
        <SortFilter
          selectedOption={selectedSort}
          setSelectedOption={setSelectedSort}
          sortOptions={sortOptions}
          onFilterChange={(value) => {
            setSelectedSort(value);
            handleSortChange(value);
          }}
        />
      </div>

      {filteredData.length < 1 ? (
        <p className="text-gray-500 dark:text-gray-400 blue:text-gray-400">
          Couldn't find any items in this group.
        </p>
      ) : viewMode === "list" ? (
        <div className="w-full">
          {/* List items */}
          {filteredData?.map((item) => (
            <ListItem key={item.id} item={item} />
          ))}
        </div>
      ) : viewMode === "table" ? (
        <div className="w-full lg:border border-gray-200 dark:border-[#4E4E4E] blue:border-blue rounded-md overflow-hidden">
          {/* Desktop Table with Headers (hidden on mobile) */}

          <table className="hidden lg:table w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200 dark:bg-[#222] blue:bg-light-blue border-b border-gray-200 dark:border-[#4E4E4E] blue:border-blue">
                <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-white blue:text-white text-sm">
                  Name
                  {/* <span className="ml-1">↕</span> */}
                </th>

                {filteredData[0].column_values
                  .slice(0, 5)
                  .map((item, index) => (
                    <th
                      key={index}
                      className="text-left py-3 px-4 font-medium text-gray-500 dark:text-white blue:text-white text-sm"
                    >
                      {item.column.title}
                      {/* <span className="ml-1">↕</span> */}
                    </th>
                  ))}
              </tr>
            </thead>

            <tbody className="table-row-group">
              {filteredData.map((item) => (
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
          {filteredData?.map((item) => (
            <TableView key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredData?.map((item) => (
            <CardItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BoardGroup;
