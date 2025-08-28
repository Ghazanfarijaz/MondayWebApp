import { Link as LinkIcon, ChevronLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { boardsAPI } from "../../api/board";
import { toast } from "sonner";
import ItemDetailsSkeleton from "../../features/view-item-details/components/ItemDetailsSkeleton";
import { Avatar, Loader, Tooltip } from "@mantine/core";
import useUsersPhotoThumbs from "../../hooks/useUsersPhotoThumbs";
import { useUserPreferences } from "../../contexts/UserPreferencesContext";
import convertDateFormate from "../../utils/convertDateFormat";

const ViewItemDetails = () => {
  const USER_PHOTO_THUMBS = useUsersPhotoThumbs();
  const { itemId, boardId } = useParams();
  const navigate = useNavigate();
  const { preferences } = useUserPreferences();

  // Fetch item details - Query
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["itemDetails", boardId, itemId],
    queryFn: () =>
      boardsAPI.getItemDetails({
        itemId,
        boardId,
      }),
  });

  if (isError) {
    toast.error("Error fetching item details!", {
      description: error.message || "Please try again.",
    });
    return navigate("/");
  }

  return (
    <div className="h-full max-h-[calc(100dvh-68px)] md:p-10 p-4 overflow-auto bg-gray-100 dark:bg-light-black blue:bg-light-blue">
      {/* Breadcrumb navigation */}
      <div className="flex flex-col gap-4">
        <Link
          to={`/board/${boardId}`}
          className="text-gray-600 dark:text-gray-400 blue:text-gray-100 font-medium flex items-center gap-1"
        >
          <ChevronLeft size={20} />
          <p>Go Back</p>
        </Link>

        <div className="text-sm mb-4 text-gray-500 dark:text-white blue:text-white">
          <Link
            to={`/board/${boardId}`}
            className="hover:underline text-gray-500 dark:text-white blue:text-white"
          >
            Dashboard
          </Link>{" "}
          /{" "}
          <span className="text-[#BDBDBD] dark:text-[#A2A2A2] blue:text-gray-100">
            Item Details
          </span>
        </div>
      </div>
      {isPending ? (
        <ItemDetailsSkeleton />
      ) : (
        <>
          {/* Item title */}
          <div className="flex items-center justify-between gap-8 mb-8">
            <h1 className="text-3xl font-bold text-black dark:text-white blue:text-white break-all">
              {data.name}
            </h1>
            <Link
              to={`edit-details`}
              className="px-4 py-2 bg-[#2A85FF] text-white rounded-lg hover:shadow-lg transition-colors duration-200 whitespace-nowrap"
            >
              Edit Item
            </Link>
          </div>

          <div className="bg-white dark:bg-black blue:bg-dark-blue p-6 rounded-lg shadow-sm">
            {data.column_values.map((columnValue, i) => {
              if (columnValue.type === "status") {
                return (
                  <div
                    key={columnValue.id}
                    className="grid grid-cols-[150px_1fr] gap-[32px] items-center mb-4"
                  >
                    <span className="text-gray-500 dark:text-[#6F767E] blue:text-gray-400">
                      {columnValue.column.title}
                    </span>
                    <span
                      className="px-3 py-1 text-sm rounded-[4px] text-white w-fit"
                      style={{
                        backgroundColor: columnValue.label_style?.color,
                      }}
                    >
                      {columnValue.text}
                    </span>
                  </div>
                );
              } else if (columnValue.type === "people") {
                return (
                  <div
                    key={columnValue.id}
                    className="grid grid-cols-[150px_1fr] gap-[32px] items-center mb-4"
                  >
                    <span className="text-gray-500 dark:text-[#6F767E] blue:text-gray-400">
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
                              const currentUser =
                                USER_PHOTO_THUMBS?.users?.find(
                                  (user) => user.id === person.id
                                );
                              return (
                                <Tooltip
                                  key={person.id}
                                  label={currentUser?.name}
                                  withArrow
                                  className="hover:cursor-pointer"
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
                );
              } else if (columnValue.type === "file") {
                return (
                  <div
                    key={columnValue.id}
                    className="grid grid-cols-[150px_1fr] gap-[32px] items-start mb-4"
                  >
                    <span className="text-gray-500 dark:text-[#6F767E] blue:text-gray-400">
                      {columnValue.column.title}
                    </span>
                    <div className="flex items-center md:gap-4 gap-2 flex-wrap">
                      {columnValue?.files?.length < 1
                        ? "No file uploaded"
                        : columnValue?.files?.map((file, index) => (
                            <div className="flex items-center" key={index}>
                              {columnValue.text && (
                                <LinkIcon className="text-gray-700 dark:text-white blue:text-white h-[12px]" />
                              )}
                              <div className="text-[12px]">
                                <Link
                                  to={file.asset.public_url}
                                  className="text-gray-700 dark:text-white blue:text-white font-semibold hover:underline"
                                >
                                  {/* Get the last name after last / */}
                                  {file.asset.name}
                                </Link>
                              </div>
                              {index < columnValue.files.length - 1 && (
                                <p className="ps-4 text-gray-700 dark:text-white blue:text-white">
                                  |
                                </p>
                              )}
                            </div>
                          ))}
                    </div>
                  </div>
                );
              } else if (columnValue.type === "date") {
                return (
                  <div
                    key={columnValue.id}
                    className="grid grid-cols-[150px_1fr] gap-[32px] items-start mb-4"
                  >
                    <span className="text-gray-500 dark:text-[#6F767E] blue:text-gray-400">
                      {columnValue.column.title}
                    </span>
                    <p className="text-gray-700 dark:text-white blue:text-white whitespace-pre-line">
                      {convertDateFormate({
                        date: columnValue.text,
                        format: preferences?.dateFormat || "YYYY-MM-DD",
                      })}
                    </p>
                  </div>
                );
              } else if (columnValue.type === "phone") {
                return (
                  <div
                    key={columnValue.id}
                    className="grid grid-cols-[150px_1fr] gap-[32px] items-start mb-4"
                  >
                    <span className="text-gray-500 dark:text-[#6F767E] blue:text-gray-400">
                      {columnValue.column.title}
                    </span>
                    <p className="text-gray-700 dark:text-white blue:text-white whitespace-pre-line">
                      {/* Show phone number with country code */}
                      {/* Formate: +1 (123) 456-7890 */}
                      {columnValue?.text
                        ? (() => {
                            const digits = columnValue?.text.replace(/\D/g, "");

                            // Guessing country code length: try 1 to 3 digits
                            const local = digits.slice(-10);
                            const countryCode = digits.slice(0, -10);

                            const area = local.slice(0, 3);
                            const prefix = local.slice(3, 6);
                            const line = local.slice(6, 10);

                            return `+${countryCode} ${area} (${prefix}) ${line}`;
                          })()
                        : "N/A"}
                    </p>
                  </div>
                );
              } else {
                return (
                  <div
                    key={columnValue.id}
                    className="grid grid-cols-[150px_1fr] gap-[32px] items-start mb-4"
                  >
                    <span className="text-gray-500 dark:text-[#6F767E] blue:text-gray-400">
                      {columnValue.column.title}
                    </span>
                    <p className="text-gray-700 dark:text-white blue:text-white whitespace-pre-line">
                      {columnValue.type === "checkbox"
                        ? columnValue.text
                          ? "Yes"
                          : "No"
                        : columnValue.text || "N/A"}{" "}
                    </p>
                  </div>
                );
              }
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default ViewItemDetails;
