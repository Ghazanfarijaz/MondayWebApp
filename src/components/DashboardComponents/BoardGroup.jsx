import React from "react";
import CardItem from "./CardItem";
import ListItem from "./ListItem";
import TableView from "./TableView";

const BoardGroup = ({ group, viewMode }) => {
  return (
    <div className="w-full mb-6 bg-white px-[24px] py-[24px]">
      <div className="flex items-center mb-4">
        <div className={`w-4 h-8 rounded-[4px] ${group.color}`}></div>
        <h2 className="ml-2 font-semibold text-lg">{group.name}</h2>
      </div>

      {viewMode === "list" ? (
        <div className="w-full">
          {/* List items */}
          {group.items.map((item, index) => (
            <ListItem key={index} item={item} />
          ))}
        </div>
      ) : viewMode === "table" ? (
        <>
          <div className="w-full border border-gray-200 rounded-md overflow-hidden">
            {/* Desktop Table with Headers (hidden on mobile) */}
            <div className="hidden md:block">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
                      Item Name <span className="ml-1">↕</span>
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
                      Status <span className="ml-1">↕</span>
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
                      Priority <span className="ml-1">↕</span>
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
                      Date <span className="ml-1">↕</span>
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
                      People <span className="ml-1">↕</span>
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
                      Board <span className="ml-1">↕</span>
                    </th>
                  </tr>
                </thead>
                {group.items.map((item, index) => (
                  <TableView key={index} item={item} />
                ))}
              </table>
            </div>

            {/* Mobile Card View (no headers) */}
            <div className="md:hidden p-2 space-y-2">
              {group.items.map((item, index) => (
                <TableView key={index} item={item} />
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {group.items.map((item, index) => (
            <CardItem key={index} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BoardGroup;
