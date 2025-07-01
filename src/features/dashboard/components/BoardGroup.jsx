import { useMemo, useState } from "react";
import CardItem from "./CardItem";
import ListItem from "./ListItem";
import TableView from "./TableView";
import { useNavigate } from "react-router-dom";
import SortFilter from "../../../components/UIComponents/SortFilter";
import useUsersPhotoThumbs from "../../../hooks/useUsersPhotoThumbs";
import { Loader, Skeleton } from "@mantine/core";

const BoardGroup = ({
  itemsData,
  viewMode,
  groupedData,
  noMoreItemsLeft,
  isFetchingNextPage,
  onClickLoadMore,
}) => {
  const navigate = useNavigate();
  const USER_PHOTO_THUMBS = useUsersPhotoThumbs();

  const [filteredData, setFilteredData] = useState({});
  const [sortOptions, setSortOptions] = useState([]);
  const [selectedSort, setSelectedSort] = useState({
    value: "default",
    label: "Default",
  });

  const handleSortChange = ({ value, label }) => {
    if (value === "default") {
      return setFilteredData(groupedData);
    }

    const [sortType, columnId, order] = value.split("-");

    const sortedData = Object.entries(groupedData).reduce(
      (acc, [groupTitle, items]) => {
        const sortedItems = [...items].sort((a, b) => {
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

        acc[groupTitle] = sortedItems;
        return acc;
      },
      {}
    );

    setFilteredData(sortedData);
  };

  // useMemo to memoize filteredData based on itemsData and sortOptions
  useMemo(() => {
    let sortingOptions = [
      {
        value: "default",
        label: "Default",
      },
    ];

    if (itemsData.length > 0) {
      const firstItem = itemsData[0];
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
  }, [itemsData, groupedData, setSortOptions, setFilteredData]);

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex justify-end">
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

      <div className="bg-white dark:bg-black blue:bg-dark-blue px-[24px] py-[24px] rounded-lg shadow-sm h-full max-h-[calc(100dvh-455px)] md:max-h-[calc(100dvh-275px)] overflow-auto w-full">
        {itemsData.length < 1 ? (
          <p className="text-gray-500 dark:text-gray-400 blue:text-gray-400">
            Couldn't find any items in this Board.
          </p>
        ) : viewMode === "list" ? (
          <div className="w-full flex flex-col gap-6">
            {Object.entries(groupedData).map(([groupTitle, items]) => (
              <div key={groupTitle} className="flex flex-col gap-4">
                <div className="flex items-center">
                  <div className={`w-4 h-8 rounded-[4px] bg-purple-300`}></div>
                  <h2 className="ml-2 font-semibold text-lg text-black dark:text-white blue:text-white">
                    {groupTitle}
                  </h2>
                </div>
                <div className="w-full flex flex-col gap-2">
                  {items?.map((item) => (
                    <ListItem key={item.id} item={item} />
                  ))}
                </div>
              </div>
            ))}

            <div className="w-full flex flex-col gap-2 -mt-4">
              {isFetchingNextPage &&
                Array.from({ length: 2 }).map((_, index) => (
                  <Skeleton key={index} width="100%" height={60} radius={6} />
                ))}
            </div>
          </div>
        ) : viewMode === "table" ? (
          <div className="w-full flex flex-col gap-6">
            {Object.entries(filteredData).map(([groupTitle, items]) => (
              <div key={groupTitle} className="flex flex-col gap-4">
                <div className="flex items-center">
                  <div className={`w-4 h-8 rounded-[4px] bg-purple-300`}></div>
                  <h2 className="ml-2 font-semibold text-lg text-black dark:text-white blue:text-white">
                    {groupTitle}
                  </h2>
                </div>
                <div className="w-full lg:border border-gray-200 dark:border-[#4E4E4E] blue:border-blue rounded-md overflow-hidden">
                  <table className="hidden lg:table w-full table-auto border-collapse">
                    <thead>
                      <tr className="bg-gray-200 dark:bg-[#222] blue:bg-light-blue border-b border-gray-200 dark:border-[#4E4E4E] blue:border-blue">
                        <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-white blue:text-white text-sm">
                          Name
                        </th>

                        {items[0].column_values
                          .slice(0, 5)
                          .map((item, index) => (
                            <th
                              key={index}
                              className="text-left py-3 px-4 font-medium text-gray-500 dark:text-white blue:text-white text-sm"
                            >
                              {item.column.title}
                            </th>
                          ))}
                      </tr>
                    </thead>

                    <tbody className="table-row-group">
                      {items.map((item) => (
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

                          {item?.column_values
                            .slice(0, 5)
                            .map((columnValue) => (
                              <td key={columnValue.id} className="py-3 px-4">
                                {columnValue.type === "status" ? (
                                  <span
                                    className="px-3 py-1 text-xs rounded-full font-medium whitespace-nowrap"
                                    style={{
                                      backgroundColor: `${
                                        columnValue.label_style?.color ||
                                        "#e5e7eb"
                                      }20`,
                                      color:
                                        columnValue.label_style?.color ||
                                        "#374151",
                                      border: `1px solid ${
                                        columnValue.label_style?.color ||
                                        "#e5e7eb"
                                      }`,
                                    }}
                                  >
                                    {columnValue.text || "N/A"}
                                  </span>
                                ) : columnValue.type === "people" ? (
                                  <div className="flex -space-x-2">
                                    {USER_PHOTO_THUMBS.isPending ? (
                                      <Loader size="sm" />
                                    ) : columnValue.persons_and_teams.length <
                                      1 ? (
                                      <p className="text-sm text-gray-600 dark:text-white blue:text-white">
                                        N/A
                                      </p>
                                    ) : (
                                      columnValue.persons_and_teams?.map(
                                        (person) => (
                                          <img
                                            key={person.id}
                                            className="w-6 h-6 rounded-full border-2 border-white"
                                            src={
                                              USER_PHOTO_THUMBS?.users?.find(
                                                (user) => user.id === person.id
                                              )?.photo_thumb ||
                                              "/api/placeholder/24/24"
                                            }
                                            alt={`Person ${person.id}`}
                                            onError={(e) => {
                                              e.target.src =
                                                "/api/placeholder/24/24";
                                            }}
                                          />
                                        )
                                      )
                                    )}
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

                      {isFetchingNextPage &&
                        Array.from({ length: 2 }).map((_, index) => (
                          <tr
                            key={index}
                            className="border-b border-gray-200 dark:border-[#4E4E4E] blue:border-blue cursor-pointer"
                          >
                            <td colSpan={6}>
                              <Skeleton width="100%" height={48} />
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>

                  {items?.map((item) => (
                    <TableView key={item.id} item={item} />
                  ))}
                  <div className="w-full flex flex-col gap-3">
                    {isFetchingNextPage &&
                      Array.from({ length: 2 }).map((_, index) => (
                        <Skeleton key={index} width="100%" height={180} />
                      ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {Object.entries(filteredData).map(
              ([groupTitle, items], groupIndex, groupArray) => {
                return (
                  <div key={groupTitle} className="flex flex-col gap-4">
                    <div className="flex items-center">
                      <div
                        className={`w-4 h-8 rounded-[4px] bg-purple-300`}
                      ></div>
                      <h2 className="ml-2 font-semibold text-lg text-black dark:text-white blue:text-white">
                        {groupTitle}
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {items?.map((item) => (
                        <CardItem key={item.id} item={item} />
                      ))}

                      {isFetchingNextPage &&
                        groupIndex === groupArray.length - 1 &&
                        Array.from({ length: 2 }).map((_, index) => (
                          <Skeleton
                            key={index}
                            width="100%"
                            height={250}
                            radius={12}
                          />
                        ))}
                    </div>
                  </div>
                );
              }
            )}
          </div>
        )}

        {itemsData.length > 0 && !isFetchingNextPage && (
          <div className="flex justify-center mt-6">
            {noMoreItemsLeft ? (
              <p className="text-gray-500 dark:text-gray-400 blue:text-gray-400 text-center">
                No more items left to load.
                <br />
                You have fetched al the items of this board.
              </p>
            ) : (
              <button
                type="button"
                className="text-[#2A85FF] dark:text-white blue:text-white text-[14px] font-semibold"
                onClick={onClickLoadMore}
                disabled={isFetchingNextPage}
              >
                {isFetchingNextPage ? "Loading..." : "Load More"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BoardGroup;
