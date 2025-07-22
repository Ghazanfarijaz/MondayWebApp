import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import useUsersPhotoThumbs from "../../../hooks/useUsersPhotoThumbs";
import { Avatar, Loader, Tooltip } from "@mantine/core";
import convertDateFormate from "../../../utils/convertDateFormat";
import { useUserPreferences } from "../../../contexts/UserPreferencesContext";

const TableView = ({ item, boardId }) => {
  // Hooks
  const navigate = useNavigate();
  const USER_PHOTO_THUMBS = useUsersPhotoThumbs();
  const { preferences } = useUserPreferences();

  if (!item || !item.column_values) return <div>No item data available</div>;

  // Safely get column values or default to empty array
  const columnValues = Array.isArray(item.column_values)
    ? item.column_values
    : [];

  return (
    <div
      className="lg:hidden bg-white rounded-lg shadow-sm p-4 mb-3 border border-gray-100 hover:bg-gray-50 cursor-pointer"
      onClick={() => navigate(`/item-details/${boardId}/${item.id}`)}
    >
      {columnValues.slice(0, 5).map((columnValue) => (
        <div
          key={columnValue.id}
          className="flex justify-between items-center mb-2"
        >
          <span className="text-sm text-gray-600">
            {columnValue.column?.title || "Field"}
          </span>
          {columnValue.type === "status" ? (
            <span
              className="px-2 py-1 text-xs rounded-full font-medium text-white"
              style={{
                backgroundColor: columnValue.label_style?.color || "#64748b",
                opacity: columnValue.label_style?.color ? 1 : 0.8,
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
            <span className="text-sm">
              {columnValue?.files[0]?.asset
                ? columnValue?.files[0]?.asset?.name + ",..."
                : "N/A"}
            </span>
          ) : columnValue.type === "date" ? (
            <span className="text-sm">
              {convertDateFormate({
                date: columnValue.text,
                format: preferences.dateFormat,
              })}
            </span>
          ) : (
            <span className="text-sm">
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

TableView.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    column_values: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        text: PropTypes.string,
        label_style: PropTypes.object,
        persons_and_teams: PropTypes.array,
        column: PropTypes.shape({
          title: PropTypes.string,
        }),
      })
    ),
  }),
};

export default TableView;
