import React from "react";
import CardItem from "./CardItem";

const BoardGroup = ({ group }) => {
  return (
    <div className="w-full mb-6 bg-white px-[24px] py-[24px]">
      <div className="flex items-center mb-4">
        <div className={`w-4 h-8 rounded-[4px] ${group.color}`}></div>
        <h2 className="ml-2 font-semibold text-lg">{group.name}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {group.items.map((item, index) => (
          <CardItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default BoardGroup;
