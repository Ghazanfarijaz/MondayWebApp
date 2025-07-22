import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import useUsersPhotoThumbs from "../../../hooks/useUsersPhotoThumbs";
import { Avatar, Loader, Tooltip } from "@mantine/core";
import { useUserPreferences } from "../../../contexts/UserPreferencesContext";
import convertDateFormate from "../../../utils/convertDateFormat";

const ListItem = ({ item, boardId }) => {
  // Hooks
  const navigate = useNavigate();
  const USER_PHOTO_THUMBS = useUsersPhotoThumbs();
  const { preferences } = useUserPreferences();

  return (
    <div
      onClick={() => navigate(`/item-details/${boardId}/${item.id}`)}
      className="grid grid-cols-6 gap-4 p-4 bg-white dark:bg-black blue:bg-dark-blue rounded-lg border border-[#EAEAEA] dark:border-[#4E4E4E] blue:border-blue cursor-pointer shadow-sm transition-colors duration-200"
    >
      {/* Title Column */}
      <div className="flex items-center">
        <span className="text-gray-700 dark:text-white blue:text-white font-medium truncate">
          {item.name || "Untitled Item"}
        </span>
      </div>

      {/* Dynamically render first 5 column values */}
      {item.column_values.slice(0, 5).map((columnValue) => (
        <div key={columnValue.id} className="flex items-center">
          {columnValue.type === "status" ? (
            <span
              className="px-3 py-1 text-xs rounded-full font-medium truncate max-w-full"
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
                      const currentUser = USER_PHOTO_THUMBS?.users?.find(
                        (user) => user.id === person.id
                      );
                      return (
                        <Tooltip
                          key={person.id}
                          label={currentUser?.name}
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
          ) : columnValue.type === "file" ? (
            <span className="text-sm text-gray-600 dark:text-white blue:text-white line-clamp-1 max-w-full">
              {columnValue?.files[0]?.asset
                ? columnValue?.files[0]?.asset?.name + ",..."
                : "N/A"}
            </span>
          ) : columnValue.type === "date" ? (
            <span className="text-sm text-gray-600 dark:text-white blue:text-white text-right">
              {convertDateFormate({
                date: columnValue.text,
                format: preferences?.dateFormat || "YYYY-MM-DD",
              })}
            </span>
          ) : (
            <span className="text-sm text-gray-600 dark:text-white blue:text-white truncate max-w-full">
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
  );
};

ListItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default ListItem;
