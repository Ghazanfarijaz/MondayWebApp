import React from "react";
import { Skeleton } from "@mantine/core";

const EditItemDetailsSkeleton = () => {
  return (
    <React.Fragment>
      <Skeleton
        height={40}
        className="md:!w-[250px] !w-[150px] rounded-lg mb-8"
      />
      <div className="bg-white dark:bg-black blue:bg-dark-blue p-6 rounded-lg shadow-sm grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-8">
        {Array.from({ length: 7 }).map((_, index) => (
          <div key={index} className="flex flex-col gap-2">
            <Skeleton height={25} className="!w-[75px] rounded-lg" />
            <Skeleton height={40} className="!w-full rounded-lg" />
          </div>
        ))}
        <div className="xl:col-span-3 lg:col-span-2 col-span-1">
          <Skeleton height={40} className="!w-[150px] rounded-lg" />
        </div>
      </div>
    </React.Fragment>
  );
};

export default EditItemDetailsSkeleton;
