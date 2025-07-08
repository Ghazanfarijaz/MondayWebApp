import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  FileText,
  CloudUpload,
  Link as LinkIcon,
  ChevronLeft,
} from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { boardsAPI } from "../../api/board";
import { toast } from "sonner";
import LoadingBackdrop from "../../components/UIComponents/LoadingBackdrop";
import EditItemDetailsSkeleton from "../../features/edit-item-details/components/EditItemDetailsSkeleton";
import { DateInput } from "@mantine/dates";
import useHtmlThemeClass from "../../hooks/useHtmlThemeClass";

const EditItemDetails = () => {
  const { id: itemId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const theme = useHtmlThemeClass();
  const isBlueTheme = theme === "blue";

  // Local States
  const [formattingData, setFormattingData] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);

  const originalFilteredItemsRef = useRef(null);

  // Fetch item details - Query
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["itemDetails", itemId],
    queryFn: () =>
      boardsAPI.getItemDetails({
        itemId: itemId,
      }),
  });

  useEffect(() => {
    setFormattingData(true);

    if (!data) {
      setFormattingData(false);
      return setFilteredItems([]);
    }

    // Filter out the columns in which "isEditable" is true
    // and sort them to ensure "dropdown" and "file" types come last
    const filteredData = data?.column_values
      .filter(
        (col) =>
          col.isEditable &&
          col.type !== "doc" &&
          col.type !== "timeline" &&
          col.type !== "people"
      )
      .sort((a, b) => {
        const lastTypes = ["dropdown", "file"];
        const aIsLast = lastTypes.includes(a.type);
        const bIsLast = lastTypes.includes(b.type);

        if (aIsLast && !bIsLast) return 1; // a should come after b
        if (!aIsLast && bIsLast) return -1; // a should come before b
        return 0; // keep original order otherwise
      });

    setFilteredItems(filteredData);

    // Store original snapshot (deep clone to prevent mutations)
    originalFilteredItemsRef.current = JSON.parse(JSON.stringify(filteredData));

    setFormattingData(false);
  }, [data]);

  // Update selected item - Mutation
  const updateColumnsData = useMutation({
    mutationFn: () => {
      const chnagedColumns = filteredItems.filter((newCol) => {
        const originalCol = originalFilteredItemsRef.current.find(
          (col) => col.id === newCol.id
        );

        // Check if text was updated
        const textChanged = originalCol?.text !== newCol.text;

        // Check if a new file was uploaded
        const fileUploaded = !!newCol.newlyUploadedFile;

        return textChanged || fileUploaded;
      });

      return boardsAPI.updateColumnValuesofItem({
        itemId,
        columnValues: chnagedColumns,
      });
    },
    onSuccess: () => {
      toast.success("Item details updated successfully!");
      const id = "";
      queryClient.invalidateQueries({
        queryKey: ["itemDetails", id],
      });
      queryClient.invalidateQueries({
        queryKey: ["boardData"],
      });
      navigate(`/item-details/${itemId}`);
    },
    onError: (error) => {
      toast.error("Error!", {
        description: error.message || "Could not update item details!",
      });
    },
  });

  const handleupdateItemValue = ({ itemId, newValue }) => {
    const updatedItems = filteredItems.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          text: newValue,
        };
      }
      return item;
    });

    setFilteredItems(updatedItems);
  };

  const handleUploadFile = ({ itemId, file }) => {
    // Check if the file size exceeds 5MB
    if (file.size > 5 * 1024 * 1024) {
      console.error("File size exceeds 5MB limit");
      return;
    }

    const updatedItems = filteredItems.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          newlyUploadedFile: file, // Assuming you want to store the file directly
        };
      }
      return item;
    });

    setFilteredItems(updatedItems);

    // Now remove the file input value to allow re-uploading the same file
    const fileInput = document.getElementById(itemId);
    if (fileInput) {
      fileInput.value = "";
    }
  };

  if (isError) {
    toast.error("Error fetching item details!", {
      description: error.message || "Please try again.",
    });
    return navigate("/");
  }

  return (
    <div className="h-full max-h-[calc(100dvh-68px)] p-[40px] overflow-auto bg-gray-100 dark:bg-light-black blue:bg-light-blue">
      <div className="flex flex-col gap-4">
        <Link
          to={`/item-details/${itemId}`}
          className="text-gray-600 dark:text-gray-400 blue:text-gray-100 font-medium flex items-center gap-1"
        >
          <ChevronLeft size={20} />
          <p>Go Back</p>
        </Link>

        {/* Breadcrumb navigation */}
        <div className="text-sm mb-4 text-gray-500 dark:text-white blue:text-white">
          <Link
            to="/"
            className="hover:underline text-gray-500 dark:text-white blue:text-white"
          >
            Board 1
          </Link>{" "}
          /{" "}
          <Link
            to={`/item-details/${itemId}`}
            className="hover:underline text-gray-500 dark:text-white blue:text-white"
          >
            Item Details
          </Link>{" "}
          /{" "}
          <span className="text-[#BDBDBD] dark:text-[#A2A2A2] blue:text-gray-100">
            Edit Item
          </span>
        </div>
      </div>

      {updateColumnsData.isPending && <LoadingBackdrop />}

      {isPending || formattingData ? (
        <EditItemDetailsSkeleton />
      ) : (
        <>
          {/* Item Title */}
          <h1 className="text-3xl font-bold mb-8 text-black dark:text-white blue:text-white break-all">
            {data.name}
          </h1>

          {/* Edit Details Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!e.target.checkValidity()) {
                e.target.reportValidity(); // show browser's tooltip
                return;
              }
              updateColumnsData.mutate();
            }}
            className="bg-white dark:bg-black blue:bg-dark-blue p-6 rounded-lg shadow-sm grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-8"
          >
            {filteredItems.map((item) => {
              if (item.type === "file") {
                return (
                  <div className="flex flex-col gap-2" key={item.id}>
                    <p className="text-black dark:text-white blue:text-white">
                      {item.column.title}
                    </p>
                    <label
                      htmlFor={item.id}
                      className={`text-black dark:text-white blue:text-white bg-gray-100 dark:bg-light-black blue:bg-light-blue p-[8px_10px] rounded-lg cursor-pointer border border-dashed ${
                        item.newlyUploadedFile
                          ? "border-green-500"
                          : "border-gray-400"
                      } hover:bg-gray-200 transition-colors flex items-center justify-center text-[12px] h-[40.75px]`}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        const file = e.dataTransfer.files?.[0];
                        if (file) {
                          handleUploadFile({
                            itemId: item.id,
                            file: file,
                          });
                        }
                      }}
                    >
                      {item.newlyUploadedFile ? (
                        <div className="flex items-center gap-2">
                          <FileText className="w-5 text-black dark:text-white blue:text-white" />
                          <span>{item.newlyUploadedFile.name}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <CloudUpload className="w-5 text-black dark:text-white blue:text-white" />
                          <span>Drop file here or click to upload</span>
                        </div>
                      )}
                    </label>
                    <input
                      id={item.id}
                      type="file"
                      hidden
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleUploadFile({
                            itemId: item.id,
                            file: file,
                          });
                        }
                      }}
                    />
                    <span className="text-xs text-gray-500">
                      (Max File size: 5MB)
                    </span>
                    <div className="flex flex-col gap-1">
                      <p className="text-black dark:text-white blue:text-white font-semibold">
                        Previous Files:
                      </p>
                      {item?.files?.length < 1
                        ? "No file uploaded"
                        : item?.files?.map((file, index) => (
                            <div className="flex items-center" key={index}>
                              {item.text && (
                                <LinkIcon className="text-black dark:text-white blue:text-white h-[12px]" />
                              )}
                              <div className="text-[12px]">
                                <Link
                                  to={file.asset.public_url}
                                  className="text-black dark:text-white blue:text-white font-semibold hover:underline"
                                >
                                  {/* Get the last name after last / */}
                                  {file.asset.name}
                                </Link>
                              </div>
                            </div>
                          ))}
                    </div>
                  </div>
                );
              } else if (item.type === "date") {
                return (
                  <DateInput
                    value={item.text ? new Date(item.text) : null}
                    onChange={(value) =>
                      handleupdateItemValue({
                        itemId: item.id,
                        newValue: value,
                      })
                    }
                    label={item.column.title}
                    placeholder="Date input"
                    valueFormat="YYYY-MM-DD"
                    classNames={{
                      label:
                        "!text-black dark:!text-white !font-normal !text-[16px] !mb-2" +
                        (isBlueTheme ? " !text-white" : ""),
                      input:
                        "!p-[8px_10px] !rounded-lg !text-black dark:!text-white !h-[40px] !border-none !bg-gray-100 dark:!bg-light-black" +
                        (isBlueTheme ? " !bg-[#2b2d50] !text-white" : ""),
                    }}
                  />
                );
              } else if (item.type === "dropdown") {
                return (
                  <div className="flex flex-col gap-2" key={item.id}>
                    <label
                      htmlFor={item.id}
                      className="text-black dark:text-white blue:text-white"
                    >
                      {item.column.title}
                    </label>
                    <input
                      id={item.id}
                      className="bg-gray-100 dark:bg-light-black blue:bg-light-blue p-[8px_10px] rounded-lg text-black dark:text-white blue:text-white"
                      placeholder="e.g. label 1, label 2, label 3"
                      value={item.text}
                      onChange={(e) =>
                        handleupdateItemValue({
                          itemId: item.id,
                          newValue: e.target.value,
                        })
                      }
                    />
                  </div>
                );
              } else if (item.type === "email") {
                return (
                  <div className="flex flex-col gap-2" key={item.id}>
                    <label
                      htmlFor={item.id}
                      className="text-black dark:text-white blue:text-white"
                    >
                      {item.column.title}
                    </label>
                    <input
                      id={item.id}
                      type="email"
                      className={`bg-gray-100 dark:bg-light-black blue:bg-light-blue p-[8px_10px] rounded-lg text-black dark:text-white blue:text-white`}
                      placeholder="Enter email here..."
                      value={item.text}
                      onChange={(e) =>
                        handleupdateItemValue({
                          itemId: item.id,
                          newValue: e.target.value,
                        })
                      }
                    />
                  </div>
                );
              } else {
                return (
                  <div className="flex flex-col gap-2" key={item.id}>
                    <label
                      htmlFor={item.id}
                      className="text-black dark:text-white blue:text-white"
                    >
                      {item.column.title}
                    </label>
                    <input
                      id={item.id}
                      className="bg-gray-100 dark:bg-light-black blue:bg-light-blue p-[8px_10px] rounded-lg text-black dark:text-white blue:text-white"
                      placeholder="Enter value here..."
                      value={item.text}
                      onChange={(e) =>
                        handleupdateItemValue({
                          itemId: item.id,
                          newValue: e.target.value,
                        })
                      }
                    />
                  </div>
                );
              }
            })}
            <div className="xl:col-span-3 lg:col-span-2 col-span-1">
              <button className="px-4 py-2 bg-[#2A85FF] text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out w-fit">
                Save Changes
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default EditItemDetails;
