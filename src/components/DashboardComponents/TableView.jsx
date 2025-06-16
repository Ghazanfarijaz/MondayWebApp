import React from "react";
import { useNavigate } from "react-router-dom";
import { useBoard } from "../../contexts/BoardContext";
import PropTypes from "prop-types";

const TableView = ({ item }) => {
  const navigate = useNavigate();
  const { usersPhotoThumb, usersError, usersLoading } = useBoard();

  const handleRowClick = (id) => {
    navigate(`/mainpage/item-details/${id}`);
  };

  if (usersLoading) return <div>Loading user data...</div>;
  if (usersError) return <div>Error loading user data</div>;
  if (!item || !item.column_values) return <div>No item data available</div>;

  // Safely get column values or default to empty array
  const columnValues = Array.isArray(item.column_values)
    ? item.column_values
    : [];

  return (
    <>
      {/* Desktop Table View */}
      <tbody className="hidden md:table-row-group">
        <tr
          className="border-b border-gray-200 dark:border-[#4E4E4E] blue:border-blue cursor-pointer"
          onClick={() => handleRowClick(item.id)}
        >
          <td className="py-3 px-4 text-gray-700 dark:text-white blue:text-white font-medium truncate max-w-xs">
            {item.name || "Untitled Item"}
          </td>
          {/* Dynamically render first 5 column values */}
          {columnValues.slice(0, 5).map((columnValue) => (
            <td key={columnValue.id} className="py-3 px-4">
              {columnValue.type === "status" ? (
                <span
                  className="px-3 py-1 text-xs rounded-full font-medium"
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
                <div className="flex">
                  {columnValue.persons_and_teams?.map((person) => (
                    <img
                      key={person.id}
                      className="w-6 h-6 rounded-full border-2 border-white -mr-2"
                      src={
                        usersPhotoThumb?.users?.data?.find(
                          (user) => user.id === person.id
                        )?.photo_thumb || "/api/placeholder/24/24"
                      }
                      alt={`Person ${person.id}`}
                      onError={(e) => {
                        e.target.src = "/api/placeholder/24/24";
                      }}
                    />
                  ))}
                </div>
              ) : (
                <span className="text-gray-700 dark:text-white blue:text-white truncate max-w-xs block">
                  {columnValue.type === "checkbox"
                    ? columnValue.text
                      ? "Yes"
                      : "No"
                    : columnValue.text || "N/A"}
                </span>
              )}
            </td>
          ))}
        </tr>
      </tbody>

      {/* Mobile/Tab Card View */}
      <div
        className="md:hidden bg-white rounded-lg shadow-sm p-4 mb-3 border border-gray-100 hover:bg-gray-50 cursor-pointer"
        onClick={() => handleRowClick(item.id)}
      >
        {columnValues.slice(0, 4).map((columnValue) => (
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
              <div className="flex">
                {columnValue.persons_and_teams?.map((person) => (
                  <img
                    key={person.id}
                    className="w-6 h-6 rounded-full border-2 border-white -mr-2"
                    src={
                      usersPhotoThumb?.users?.data?.find(
                        (user) => user.id === person.id
                      )?.photo_thumb || "/api/placeholder/24/24"
                    }
                    alt={`Person ${person.id}`}
                    onError={(e) => {
                      e.target.src = "/api/placeholder/24/24";
                    }}
                  />
                ))}
              </div>
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
    </>
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
