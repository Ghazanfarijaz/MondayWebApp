import { useEffect, useState } from "react";
import { LayoutGrid, List, Table } from "lucide-react";
import BoardGroup from "../../features/dashboard/components/BoardGroup";
import { boardsAPI } from "../../api/board";
import BoardDataSkeleton from "../../features/dashboard/components/BoardDataSkeleton";
import { toast } from "sonner";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useAuth } from "../../contexts/AuthContext";
import SearchInput from "../../components/UIComponents/SearchInput";
import SortFilter from "../../components/UIComponents/SortFilter";

const Dashboard = () => {
  // Hooks
  const { setSortingOptions } = useAuth();

  // Local States
  // View Mode
  const [viewMode, setViewMode] = useState("card");

  // Search Query
  const [searchQuery, setSearchQuery] = useState(null);
  const [groupedData, setGroupedData] = useState({});
  const [filteredData, setFilteredData] = useState({});
  const [sortOptions, setSortOptions] = useState([]);
  const [selectedSort, setSelectedSort] = useState({
    value: "default",
    label: "Default",
  });

  // Fetch Board Data - Query
  const {
    data,
    isPending,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["boardData", searchQuery], // depend on search
    queryFn: ({ pageParam }) => {
      const { cursor = null } = pageParam || {};
      return boardsAPI.getItems({ cursor, searchQuery });
    },
    getNextPageParam: (lastPage) => {
      const nextCursor = lastPage?.data?.cursor;
      return nextCursor ? { cursor: nextCursor } : undefined;
    },
    initialPageParam: { cursor: null },
  });

  // UseEffect to set filteredData based on data and Sorting Options
  useEffect(() => {
    const itemsData = data?.pages.flatMap((page) => page.data.items) || [];

    // Grouping data by group Title
    const groupedData = itemsData.reduce((acc, item) => {
      const groupTitle = item.group?.title || "No Group";
      if (!acc[groupTitle]) {
        acc[groupTitle] = [];
      }
      acc[groupTitle].push(item);
      return acc;
    }, {});

    setGroupedData(groupedData);

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
    // Sorting Options in Context
    // To be used in Preferences modal
    setSortingOptions(sortingOptions);

    // Get User Preferences
    const userPreferences = JSON.parse(localStorage.getItem("userPreferences"));

    const savedSort = sortingOptions?.find(
      (option) => option.value === userPreferences?.sortPreference
    );

    if (savedSort) {
      setSelectedSort(savedSort);
      return handleSortChange({ value: savedSort.value, groupedData });
    }

    // If saved sort option is not found, default to "Default"
    handleSortChange({
      value: "default",
      groupedData,
    });
    setSelectedSort({
      value: "default",
      label: "Default",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, setSortOptions, setFilteredData]);

  // Set the initial view mode from user preferences or default to 'card'
  useEffect(() => {
    const userPreferences = JSON.parse(localStorage.getItem("userPreferences"));
    const initialViewMode = userPreferences?.itemView || "card";
    setViewMode(initialViewMode);
  }, []);

  // Handle Sorting Filter Change
  const handleSortChange = ({ value, groupedData }) => {
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

  if (isError) {
    toast.error("Error!", {
      description:
        error.message || "Could not load data. Please try again later.",
    });
  }

  return (
    <div className="md:ps-8 md:py-8 py-4 ps-4 bg-gray-200 dark:bg-light-black blue:bg-light-blue flex flex-col h-full">
      <div className="flex justify-between items-center mb-6 md:pr-8 pr-4">
        <h1 className="text-sm md:text-2xl font-bold text-black dark:text-white blue:text-white">
          {data?.pages[0]?.data?.customization?.boardName || ""}
        </h1>
        <div className="flex space-x-3 md:space-x-3 bg-white dark:bg-[#2C2C2C] blue:bg-dark-blue p-2 rounded-full px-4 py-2">
          {["card", "list", "table"].map((mode) => {
            const Icon =
              mode === "card" ? LayoutGrid : mode === "list" ? List : Table;
            return (
              <button
                key={mode}
                className={`p-2 md:px-3 md:py-2 rounded flex items-center gap-1 md:gap-2 text-xs md:text-sm ${
                  viewMode === mode
                    ? "bg-[#F4F4F4] text-black dark:bg-black dark:text-white blue:bg-light-blue text-bold rounded-full px-4 py-2"
                    : "bg-white dark:bg-transparent blue:bg-transparent text-black dark:text-white blue:text-white rounded-full px-4 py-2"
                }`}
                onClick={() => setViewMode(mode)}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden md:inline">
                  {mode.charAt(0).toUpperCase() + mode.slice(1)} View
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div
        id="board-content-container"
        className="w-full flex-1 overflow-hidden md:pr-8 pr-4"
      >
        <div className="w-full flex flex-col gap-4">
          <div className="flex gap-10 justify-between">
            <SearchInput
              searchQuery={searchQuery}
              onChange={(value) => setSearchQuery(value)}
            />
            {/* Filter Dropdown */}
            <SortFilter
              selectedOption={selectedSort}
              setSelectedOption={setSelectedSort}
              sortOptions={sortOptions}
              onFilterChange={(value) => {
                setSelectedSort(value);
                handleSortChange({
                  value: value.value,
                  groupedData,
                });
              }}
            />
          </div>
          {isPending ? (
            <BoardDataSkeleton type={viewMode} />
          ) : (
            <BoardGroup
              filteredData={filteredData || {}}
              viewMode={viewMode}
              noMoreItemsLeft={!hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
              onClickLoadMore={() => {
                if (hasNextPage && !isFetchingNextPage) {
                  fetchNextPage();
                }
              }}
              boardId={data?.pages[0]?.data?.customization?.boardId}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
