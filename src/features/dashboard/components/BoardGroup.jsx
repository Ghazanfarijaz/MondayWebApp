import CardItem from "./CardItem";
import ListItem from "./ListItem";
import TableView from "./TableView";
import { useNavigate } from "react-router-dom";
import useUsersPhotoThumbs from "../../../hooks/useUsersPhotoThumbs";
import { Avatar, Loader, Skeleton, Tooltip } from "@mantine/core";
import { useUserPreferences } from "../../../contexts/UserPreferencesContext";
import convertDateFormate from "../../../utils/convertDateFormat";

const BoardGroup = ({
  viewMode,
  filteredData,
  noMoreItemsLeft,
  isFetchingNextPage,
  onClickLoadMore,
  boardId,
}) => {
  // Hooks
  const navigate = useNavigate();
  const USER_PHOTO_THUMBS = useUsersPhotoThumbs();
  const { preferences } = useUserPreferences();

  return (
    <div className="bg-white dark:bg-black blue:bg-dark-blue px-[24px] py-[24px] rounded-lg shadow-sm h-[calc(100dvh-236px)] md:max-h-[calc(100dvh-275px)] overflow-auto w-full">
      {Object.entries(filteredData).length < 1 ? (
        <p className="text-gray-500 dark:text-gray-400 blue:text-gray-400">
          Couldn't find any items in this Board.
        </p>
      ) : viewMode === "list" ? (
        <div className="w-full flex flex-col gap-6">
          {Object.entries(filteredData).map(([groupTitle, items]) => (
            <div key={groupTitle} className="flex flex-col gap-4">
              <div className="flex items-center">
                <div className={`w-4 h-8 rounded-[4px] bg-purple-300`}></div>
                <h2 className="ml-2 font-semibold text-lg text-black dark:text-white blue:text-white">
                  {groupTitle}
                </h2>
              </div>
              <div className="w-full flex flex-col gap-2">
                {items?.map((item) => (
                  <ListItem key={item.id} item={item} boardId={boardId} />
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
                <div className="w-full lg:border border-gray-200 dark:border-[#4E4E4E] blue:border-blue rounded-md overflow-hidden">
                  <div className="hidden lg:block w-full">
                    {/* Header Row */}
                    <div className="grid grid-cols-6 bg-gray-200 dark:bg-[#222] blue:bg-light-blue border-b border-gray-200 dark:border-[#4E4E4E] blue:border-blue">
                      <div className="py-3 px-4 font-medium text-gray-500 dark:text-white blue:text-white text-sm">
                        Name
                      </div>
                      {items[0].column_values.slice(0, 5).map((item, index) => (
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
                      <div
                        key={item.id}
                        className="grid grid-cols-6 border-b border-gray-200 dark:border-[#4E4E4E] blue:border-blue cursor-pointer"
                        onClick={() => {
                          navigate(`/item-details/${boardId}/${item.id}`);
                        }}
                      >
                        <div className="py-3 px-4 text-gray-700 dark:text-white blue:text-white font-medium">
                          {item.name || "Untitled Item"}
                        </div>
                        {item?.column_values.slice(0, 5).map((columnValue) => (
                          <div key={columnValue.id} className="py-3 px-4">
                            {columnValue.type === "status" ? (
                              <span
                                className="px-3 py-1 text-xs rounded-full font-medium whitespace-nowrap"
                                style={{
                                  backgroundColor: `${
                                    columnValue.label_style?.color || "#e5e7eb"
                                  }20`,
                                  color:
                                    columnValue.label_style?.color || "#374151",
                                  border: `1px solid ${
                                    columnValue.label_style?.color || "#e5e7eb"
                                  }`,
                                }}
                              >
                                {columnValue.text || "N/A"}
                              </span>
                            ) : columnValue.type === "people" ? (
                              <div className="flex -space-x-2">
                                {USER_PHOTO_THUMBS.isPending ? (
                                  <Loader size="sm" />
                                ) : columnValue.persons_and_teams.length < 1 ? (
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
                                            (user) => user.id === person.id
                                          );
                                        return (
                                          <Tooltip
                                            key={person.id}
                                            label={currentUser?.name}
                                            withArrow
                                          >
                                            <Avatar
                                              src={
                                                currentUser?.photo_thumb || ""
                                              }
                                              size="sm"
                                            />
                                          </Tooltip>
                                        );
                                      })}
                                    {columnValue?.persons_and_teams?.length >
                                      3 && (
                                      <Avatar size="sm">
                                        +
                                        {columnValue.persons_and_teams.length -
                                          3}
                                      </Avatar>
                                    )}
                                  </Avatar.Group>
                                )}
                              </div>
                            ) : columnValue.type === "file" ? (
                              <span className="text-gray-700 dark:text-white blue:text-white block line-clamp-1">
                                {columnValue?.files[0]?.asset
                                  ? columnValue?.files[0]?.asset?.name + ",..."
                                  : "N/A"}
                              </span>
                            ) : columnValue.type === "date" ? (
                              <span className="text-gray-700 dark:text-white blue:text-white block">
                                {convertDateFormate({
                                  date: columnValue.text,
                                  format: preferences.dateFormat,
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
                      </div>
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
                  <TableView key={item.id} item={item} boardId={boardId} />
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
                      <CardItem key={item.id} item={item} boardId={boardId} />
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
  );
};

export default BoardGroup;
