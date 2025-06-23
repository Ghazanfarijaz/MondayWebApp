import { Skeleton } from "@mantine/core";
import { LayoutGrid, List, Table } from "lucide-react";

const CardSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <Skeleton key={index} width="100%" height={250} radius={12} />
      ))}
    </div>
  );
};

const ListSkeleton = () => {
  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: 5 }).map((_, index) => (
        <Skeleton key={index} width="100%" height={60} radius={6} />
      ))}
    </div>
  );
};

const TableSkeleton = () => {
  return (
    <div className="w-full border border-gray-200 dark:border-[#4E4E4E] blue:border-blue rounded-md overflow-hidden">
      <div className="hidden md:block">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-white dark:bg-black blue:bg-dark-blue border-b border-b-gray-200 dark:border-b-[#4E4E4E] blue:border-b-blue border-gray-200 dark:border-[#4E4E4E] blue:border-blue">
              <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-white blue:text-white text-sm">
                Item Name
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-white blue:text-white text-sm">
                Status
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-white blue:text-white text-sm">
                Priority
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-white blue:text-white text-sm">
                Date
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-white blue:text-white text-sm">
                People
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-white blue:text-white text-sm">
                Numbers
              </th>
            </tr>
          </thead>
          <tbody className="table-row-group">
            {Array.from({ length: 8 }).map((_, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 dark:border-[#4E4E4E] blue:border-blue cursor-pointer"
              >
                <td colSpan={1000} className="p-1">
                  <Skeleton width="100%" height={50} radius={6} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="md:hidden p-2 space-y-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} width="100%" height={100} radius={6} />
        ))}
      </div>
    </div>
  );
};

const BoardDataSkeleton = ({ type }) => {
  return (
    <div className="ps-10 py-10 bg-gray-200 dark:bg-light-black blue:bg-light-blue flex flex-col h-full">
      <div className="flex justify-between items-center mb-6 pr-10">
        <h1 className="text-sm md:text-2xl font-bold text-black dark:text-white blue:text-white">
          Board 1
        </h1>
        <div className="flex space-x-3 md:space-x-3 bg-white dark:bg-[#2C2C2C] blue:bg-dark-blue p-2 rounded-full px-4 py-2">
          <button
            className={`p-2 md:px-3 md:py-2 rounded flex items-center gap-1 md:gap-2 text-xs md:text-sm disabled:hover:cursor-not-allowed ${
              type === "card"
                ? "bg-[#F4F4F4] text-black dark:bg-black dark:text-white blue:bg-light-blue text-bold rounded-full px-4 py-2"
                : "bg-white dark:bg-transparent blue:bg-transparent text-black dark:text-white blue:text-white rounded-full px-4 py-2"
            }`}
            disabled
          >
            <LayoutGrid className="w-4 h-4" />
            <span className="hidden md:inline">Card View</span>
          </button>
          <button
            className={`p-2 md:px-3 md:py-2 rounded flex items-center gap-1 md:gap-2 text-xs md:text-sm disabled:hover:cursor-not-allowed ${
              type === "list"
                ? "bg-[#F4F4F4] text-black dark:bg-black dark:text-white blue:bg-light-blue text-bold rounded-full px-4 py-2"
                : "bg-white dark:bg-transparent blue:bg-transparent text-black dark:text-white blue:text-white rounded-full px-4 py-2"
            }`}
            disabled
          >
            <List className="w-4 h-4" />
            <span className="hidden md:inline">List View</span>
          </button>
          <button
            className={`p-2 md:px-3 md:py-2 rounded flex items-center gap-1 md:gap-2 text-xs md:text-sm disabled:hover:cursor-not-allowed ${
              type === "table"
                ? "bg-[#F4F4F4] text-black dark:bg-black dark:text-white blue:bg-light-blue text-bold rounded-full px-4 py-2"
                : "bg-white dark:bg-transparent blue:bg-transparent text-black dark:text-white blue:text-white rounded-full px-4 py-2"
            }`}
            disabled
          >
            <Table className="w-4 h-4" />
            <span className="hidden md:inline">Table View</span>
          </button>
        </div>
      </div>
      <div className="w-full mb-6 bg-white dark:bg-black blue:bg-dark-blue px-[24px] py-[24px] rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <Skeleton height={32} width={120} radius={2} />
          <Skeleton height={32} width={90} radius={2} />
        </div>
        {type === "card" ? (
          <CardSkeleton />
        ) : type === "list" ? (
          <ListSkeleton />
        ) : type === "table" ? (
          <TableSkeleton />
        ) : (
          <div className="text-center text-gray-500">Loading...</div>
        )}
      </div>
    </div>
  );
};

export default BoardDataSkeleton;
