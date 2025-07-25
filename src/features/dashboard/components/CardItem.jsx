import { useNavigate } from "react-router-dom";
import { Avatar, Loader, Tooltip } from "@mantine/core";
import useUsersPhotoThumbs from "../../../hooks/useUsersPhotoThumbs";
import convertDateFormate from "../../../utils/convertDateFormat";
import { useUserPreferences } from "../../../contexts/UserPreferencesContext";

const CardItem = ({ item, boardId }) => {
  // Hooks
  const navigate = useNavigate();
  const USER_PHOTO_THUMBS = useUsersPhotoThumbs();
  const { preferences } = useUserPreferences();

  return (
    <div
      onClick={() => navigate(`/item-details/${boardId}/${item.id}`)}
      className="bg-white dark:bg-black blue:bg-dark-blue p-6 rounded-lg shadow border border-[#EAEAEA] dark:border-[#4E4E4E] blue:border-blue hover:shadow-lg transition-shadow duration-300 cursor-pointer"
    >
      <h3 className="font-medium mb-2 text-black dark:text-white blue:text-white">
        {item.name}
      </h3>

      <div className="flex flex-col gap-3">
        {item.column_values.map((columnValue, i) => {
          if (i > 4) return null;
          return columnValue.type === "status" ? (
            <div
              key={columnValue.id}
              className="flex justify-between items-center gap-2"
            >
              <span className="text-sm text-gray-600 dark:text-[#6F767E] blue:text-gray-400">
                {columnValue.column.title}
              </span>
              <span
                className="px-2 py-1 text-xs rounded-[4px] text-white"
                style={{
                  backgroundColor: `${
                    columnValue.label_style?.color || "#e5e7eb"
                  }20`,
                  color: columnValue.label_style?.color || "#374151",
                  border: `1px solid ${
                    columnValue.label_style?.color || "#e5e7eb"
                  }`,
                }}
              >
                {columnValue.text || "N/A"}
              </span>
            </div>
          ) : columnValue.type === "people" ? (
            <div
              key={columnValue.id}
              className="flex justify-between items-center gap-2"
            >
              <span className="text-sm text-gray-600 dark:text-[#6F767E] blue:text-gray-400">
                {columnValue.column.title}
              </span>
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
                        const currentUser = USER_PHOTO_THUMBS?.users?.find(
                          (user) => user.id === person.id
                        );
                        return (
                          <Tooltip
                            key={person.id}
                            label={
                              <div className="text-[14px]">
                                <p>{currentUser?.name}</p>
                                <p>{currentUser?.email}</p>
                              </div>
                            }
                            multiline
                            maw={200}
                            transitionProps={{
                              duration: 500,
                              timingFunction: "ease-in-out",
                            }}
                            withArrow
                          >
                            <Avatar
                              src={currentUser?.photo_thumb || ""}
                              size="sm"
                            />
                          </Tooltip>
                        );
                      })}
                    {columnValue?.persons_and_teams?.length > 3 && (
                      <Avatar size="sm">
                        +{columnValue.persons_and_teams.length - 3}
                      </Avatar>
                    )}
                  </Avatar.Group>
                )}
              </div>
            </div>
          ) : columnValue.type === "file" ? (
            <div
              key={columnValue.id}
              className="flex justify-between items-center gap-4"
            >
              <span className="text-sm text-gray-600 dark:text-[#6F767E] blue:text-gray-400">
                {columnValue.column.title}
              </span>
              {columnValue?.files?.length < 1 ? (
                <span className="text-sm text-gray-600 dark:text-white blue:text-white text-right">
                  N/A
                </span>
              ) : (
                <span className="text-sm text-gray-600 dark:text-white blue:text-white text-right line-clamp-1">
                  {/* Get the last name after last / */}
                  {columnValue?.files[0]?.asset?.name},...
                </span>
              )}
            </div>
          ) : columnValue.type === "date" ? (
            <div
              key={columnValue.id}
              className="flex justify-between items-center gap-2"
            >
              <span className="text-sm text-gray-600 dark:text-[#6F767E] blue:text-gray-400">
                {columnValue.column.title}
              </span>
              <span className="text-sm text-gray-600 dark:text-white blue:text-white text-right">
                {convertDateFormate({
                  date: columnValue.text,
                  format: preferences?.dateFormat || "YYYY-MM-DD",
                })}
              </span>
            </div>
          ) : (
            <div
              key={columnValue.id}
              className="flex justify-between items-center gap-2"
            >
              <span className="text-sm text-gray-600 dark:text-[#6F767E] blue:text-gray-400">
                {columnValue.column.title}
              </span>
              <span className="text-sm text-gray-600 dark:text-white blue:text-white text-right">
                {columnValue.type === "checkbox"
                  ? columnValue.text
                    ? "Yes"
                    : "No"
                  : columnValue.text || "N/A"}{" "}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CardItem;
