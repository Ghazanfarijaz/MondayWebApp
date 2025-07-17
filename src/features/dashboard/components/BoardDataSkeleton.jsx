import { Skeleton } from "@mantine/core";

const CardSkeleton = () => {
  return (
    <div className="flex flex-col gap-6">
      <Skeleton height={35} width={90} radius={2} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} width="100%" height={250} radius={12} />
        ))}
      </div>
    </div>
  );
};

const ListSkeleton = () => {
  return (
    <div className="flex flex-col gap-6">
      <Skeleton height={35} width={90} radius={2} />
      <div className="flex flex-col gap-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} width="100%" height={60} radius={6} />
        ))}
      </div>
    </div>
  );
};

const TableSkeleton = () => {
  return (
    <div className="flex flex-col gap-6">
      <Skeleton height={35} width={90} radius={2} />
      <div className="w-full border border-gray-200 dark:border-[#4E4E4E] blue:border-blue rounded-md overflow-hidden">
        <div className="hidden md:block">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 dark:bg-[#222] blue:bg-light-blue border-b border-gray-200 dark:border-[#4E4E4E] blue:border-blue">
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
              {Array.from({ length: 3 }).map((_, index) => (
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
    </div>
  );
};

const BoardDataSkeleton = ({ type }) => {
  return (
    <div className="bg-white dark:bg-black blue:bg-dark-blue px-[24px] py-[24px] rounded-lg shadow-sm">
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
    // <div className="w-full flex flex-col gap-4">
    //   <div className="flex justify-end">
    //     <div className="bg-white dark:bg-black blue:bg-dark-blue w-fit p-2 rounded-md">
    //       <Skeleton height={32} width={90} radius={2} />
    //     </div>
    //   </div>
    //   <div className="bg-white dark:bg-black blue:bg-dark-blue px-[24px] py-[24px] rounded-lg shadow-sm">
    //     {type === "card" ? (
    //       <CardSkeleton />
    //     ) : type === "list" ? (
    //       <ListSkeleton />
    //     ) : type === "table" ? (
    //       <TableSkeleton />
    //     ) : (
    //       <div className="text-center text-gray-500">Loading...</div>
    //     )}
    //   </div>
    // </div>
  );
};

export default BoardDataSkeleton;
