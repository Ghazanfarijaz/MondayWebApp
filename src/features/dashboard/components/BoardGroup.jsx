import CardItem from "./CardItem";
import ListItem from "./ListItem";
import TableView from "./TableView";
import { Link } from "react-router-dom";
import useUsersPhotoThumbs from "../../../hooks/useUsersPhotoThumbs";
import { Avatar, Loader, Skeleton, Tooltip } from "@mantine/core";
import { useUserPreferences } from "../../../contexts/UserPreferencesContext";
import convertDateFormate from "../../../utils/convertDateFormat";
import { useState } from "react";
import SelectItemGroupModal from "../../../features/add-new-item/components/SelectItemGroupModal";
import { useAuth } from "../../../contexts/AuthContext";

const BoardGroup = ({
  viewMode,
  filteredData,
  noMoreItemsLeft,
  isFetchingNextPage,
  onClickLoadMore,
  totalItemsCount,
}) => {
  // Hooks
  const USER_PHOTO_THUMBS = useUsersPhotoThumbs();
  const { preferences } = useUserPreferences();
  const { user } = useAuth();

  // Local State to manage View Mode
  const [openSelectModalOpen, setOpenSelectModalOpen] = useState(false);

  // Calculate the total number of items in groups in filteredData
  const totalItemsInGroups = Object.values(filteredData).reduce(
    (total, group) => total + group.length,
    0
  );

  return (
    <>
      {/* Select Group for New Item Creation */}
      <SelectItemGroupModal
        opened={openSelectModalOpen}
        onClose={() => setOpenSelectModalOpen(false)}
      />
      {/* Main Content */}
      <div className="bg-white dark:bg-black blue:bg-dark-blue px-[24px] py-[24px] rounded-lg shadow-sm w-full h-full max-h-[calc(100dvh-236px)] md:max-h-[calc(100dvh-275px)] overflow-auto">
        <div className="w-full flex justify-between pb-4">
          <p className="font-medium text-gray-400 dark:text-gray-400 blue:text-gray-400 h-[40.8px]">
            Items Count (Total):{" "}
            {user?.filterItemsByEmail === "false"
              ? totalItemsCount
              : totalItemsInGroups}
          </p>
          {user?.allowUsersToCreateNewItems === "true" &&
            ["Pro", "Enterprise"].includes(user?.subscriptionPlan) && (
              <button
                type="button"
                className="px-4 py-2 bg-[#2A85FF] text-white rounded-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out w-fit"
                onClick={() => {
                  setOpenSelectModalOpen(true);
                }}
              >
                Add New Item
              </button>
            )}
        </div>
        <div
          className={`h-full max-h-[calc(100dvh-340.8px)] md:max-h-[calc(100dvh-379.8px)] overflow-auto`}
        >
          {Object.entries(filteredData).length < 1 ? (
            <p className="text-gray-500 dark:text-gray-400 blue:text-gray-400">
              {user?.filterItemsByEmail === "true"
                ? "Couldn't find any item assigned to you."
                : "Couldn't find any items in this Board."}
            </p>
          ) : viewMode === "list" ? (
            <div className="w-full flex flex-col gap-6">
              {Object.entries(filteredData).map(([groupId, items]) => (
                <div key={groupId} className="flex flex-col gap-4">
                  <div className="flex items-center">
                    <div
                      className={`w-4 h-8 rounded-[4px] bg-purple-300`}
                    ></div>
                    <h2 className="ml-2 font-semibold text-lg text-black dark:text-white blue:text-white">
                      {items[0]?.group?.title || "Group"}
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
              {Object.entries(filteredData).map(([groupId, items]) => (
                <div key={groupId} className="flex flex-col gap-4">
                  <div className="flex items-center">
                    <div
                      className={`w-4 h-8 rounded-[4px] bg-purple-300`}
                    ></div>
                    <h2 className="ml-2 font-semibold text-lg text-black dark:text-white blue:text-white">
                      {items[0]?.group?.title || "Group"}
                    </h2>
                  </div>
                  <div className="w-full lg:border border-gray-200 dark:border-[#4E4E4E] blue:border-blue rounded-md overflow-hidden">
                    <div className="w-full lg:border border-gray-200 dark:border-[#4E4E4E] blue:border-blue rounded-md overflow-hidden">
                      <div className="hidden lg:block w-full">
                        {/* Header Row */}
                        <div className="grid grid-cols-6 bg-gray-200 dark:bg-[#222] blue:bg-light-blue border-b border-gray-200 dark:border-[#4E4E4E] blue:border-blue">
                          <div className="py-3 px-4 font-medium text-gray-500 dark:text-white blue:text-white text-sm">
                            Name
                          </div>
                          {items[0].column_values
                            .slice(0, 5)
                            .map((item, index) => (
                              <div
                                key={index}
                                className="py-3 px-4 font-medium text-gray-500 dark:text-white blue:text-white text-sm"
                              >
                                {item.column.title}
                              </div>
                            ))}
                        </div>

                        {/* Data Rows */}
                        {items.map((item) => (
                          <Link
                            key={item.id}
                            to={`item-details/${item.id}`}
                            className="grid grid-cols-6 border-b border-gray-200 dark:border-[#4E4E4E] blue:border-blue cursor-pointer"
                          >
                            <div className="py-3 px-4 text-gray-700 dark:text-white blue:text-white font-medium">
                              {item.name || "Untitled Item"}
                            </div>
                            {item?.column_values
                              .slice(0, 5)
                              .map((columnValue) => (
                                <div key={columnValue.id} className="py-3 px-4">
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
                                        <Avatar.Group>
                                          {columnValue?.persons_and_teams
                                            ?.slice(0, 3)
                                            ?.map((person) => {
                                              const currentUser =
                                                USER_PHOTO_THUMBS?.users?.find(
                                                  (user) =>
                                                    user.id === person.id
                                                );
                                              return (
                                                <Tooltip
                                                  key={person.id}
                                                  label={
                                                    <div className="text-[14px]">
                                                      <p>{currentUser?.name}</p>
                                                      <p>
                                                        {currentUser?.email}
                                                      </p>
                                                    </div>
                                                  }
                                                  multiline
                                                  maw={200}
                                                  transitionProps={{
                                                    duration: 500,
                                                    timingFunction:
                                                      "ease-in-out",
                                                  }}
                                                  withArrow
                                                >
                                                  <Avatar
                                                    src={
                                                      currentUser?.photo_thumb ||
                                                      ""
                                                    }
                                                    size="sm"
                                                  />
                                                </Tooltip>
                                              );
                                            })}
                                          {columnValue?.persons_and_teams
                                            ?.length > 3 && (
                                            <Avatar size="sm">
                                              +
                                              {columnValue.persons_and_teams
                                                .length - 3}
                                            </Avatar>
                                          )}
                                        </Avatar.Group>
                                      )}
                                    </div>
                                  ) : columnValue.type === "file" ? (
                                    <span className="text-gray-700 dark:text-white blue:text-white block line-clamp-1">
                                      {columnValue?.files[0]?.asset
                                        ? columnValue?.files[0]?.asset?.name +
                                          ",..."
                                        : "N/A"}
                                    </span>
                                  ) : columnValue.type === "date" ? (
                                    <span className="text-gray-700 dark:text-white blue:text-white block">
                                      {convertDateFormate({
                                        date: columnValue.text,
                                        format:
                                          preferences?.dateFormat ||
                                          "YYYY-MM-DD",
                                      })}
                                    </span>
                                  ) : (
                                    <span className="text-gray-700 dark:text-white blue:text-white block">
                                      {columnValue.type === "checkbox"
                                        ? columnValue.text
                                          ? "Yes"
                                          : "No"
                                        : columnValue.text || "N/A"}
                                    </span>
                                  )}
                                </div>
                              ))}
                          </Link>
                        ))}

                        {/* Loading Skeletons */}
                        {isFetchingNextPage &&
                          Array.from({ length: 2 }).map((_, index) => (
                            <div
                              key={index}
                              className="grid grid-cols-6 border-b border-gray-200 dark:border-[#4E4E4E] blue:border-blue"
                            >
                              <div className="col-span-6">
                                <Skeleton width="100%" height={48} />
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>

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
                ([groupId, items], groupIndex, groupArray) => {
                  return (
                    <div key={groupId} className="flex flex-col gap-4">
                      <div className="flex items-center">
                        <div
                          className={`w-4 h-8 rounded-[4px] bg-purple-300`}
                        ></div>
                        <h2 className="ml-2 font-semibold text-lg text-black dark:text-white blue:text-white">
                          {items[0]?.group?.title || "Group"}
                        </h2>
                      </div>
                      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
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
          {Object.entries(filteredData).length > 0 && !isFetchingNextPage && (
            <div className="flex justify-center mt-6">
              {noMoreItemsLeft ? (
                <p className="text-gray-500 dark:text-gray-400 blue:text-gray-400 text-center">
                  No more items left to load.
                  <br />
                  You have fetched all the items of this board.
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
    </>
  );
};

export default BoardGroup;
