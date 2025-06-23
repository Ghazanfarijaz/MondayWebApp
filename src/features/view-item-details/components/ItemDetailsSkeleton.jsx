import React from "react";
import { Skeleton } from "@mantine/core";

const ItemDetailsSkeleton = () => {
  return (
    <React.Fragment>
      <div className="flex items-center justify-between md:gap-8 gap-6 mb-8">
        <Skeleton height={40} className="md:!w-[250px] !w-[150px] rounded-lg" />
        <Skeleton height={40} className="md:!w-[100px] !w-[100px] rounded-lg" />
      </div>
      <div className="bg-white dark:bg-black blue:bg-dark-blue p-6 rounded-lg shadow-sm">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="grid grid-cols-[150px_1fr] gap-[32px] items-center mb-4"
          >
            <Skeleton height={40} className="!w-[150px] rounded-lg" />
            <Skeleton height={40} className="!w-full rounded-lg" />
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default ItemDetailsSkeleton;
