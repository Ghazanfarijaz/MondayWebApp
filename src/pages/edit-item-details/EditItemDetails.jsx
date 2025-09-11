import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  FileText,
  CloudUpload,
  Link as LinkIcon,
  ChevronLeft,
} from "lucide-react";
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import { boardsAPI } from "../../api/board";
import { toast } from "sonner";
import LoadingBackdrop from "../../components/ui/LoadingBackdrop";
import EditItemDetailsSkeleton from "../../features/edit-item-details/components/EditItemDetailsSkeleton";
import { DateInput } from "@mantine/dates";
import useHtmlThemeClass from "../../hooks/useHtmlThemeClass";
import { NumberInput, Select } from "@mantine/core";
import CustomAvatarSelect from "../../features/edit-item-details/components/CustomAvatarSelect";
import CustomTagsSelect from "../../features/edit-item-details/components/CustomTagsSelect";
import CustomDropdownSelect from "../../features/edit-item-details/components/CustomDropdownSelect";

const EditItemDetails = () => {
  const { boardId, itemId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const theme = useHtmlThemeClass();
  const isBlueTheme = theme === "blue";

  // Local States
  const [formattingData, setFormattingData] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);
  const [dropdownOptions, setDropdownOptions] = useState([]);

  // State to store ids of required Columns whoes values are not added
  // Used to show error
  const [emptyRequiredColumnIds, setEmptyRequiredColumnIds] = useState([]);

  const originalFilteredItemsRef = useRef(null);

  // Fetch item details and dropdown options using TanStack Query
  const { itemDetails, DropDownOptions, isError, error, isPending } =
    useQueries({
      queries: [
        {
          queryKey: ["itemDetails", itemId, boardId],
          queryFn: () =>
            boardsAPI.getItemDetails({
              itemId,
              boardId,
            }),
        },
        {
          queryKey: ["dropDownOptions"],
          queryFn: () => {
            const columnIds = {
              status: [],
              dropdown: [],
              tags: [],
              people: [],
            };

            if (filteredItems.length === 0) return [];

            filteredItems?.forEach((col) => {
              switch (col.type) {
                case "status":
                  columnIds.status.push(col.id);
                  break;
                case "dropdown":
                  columnIds.dropdown.push(col.id);
                  break;
                case "tags":
                  columnIds.tags.push(col.id);
                  break;
                case "people":
                  columnIds.people.push(col.id);
                  break;
                default:
                  break;
              }
            });

            return boardsAPI.getDropDownOptions({
              boardId,
              columnIds,
            });
          },
          enabled: !!filteredItems.length,
        },
      ],
      combine: (results) => {
        const enabledResults = results.filter(
          (result) => result.fetchStatus !== "idle"
        );

        return {
          itemDetails: results[0].data,
          DropDownOptions: results[1].data,
          isPending: enabledResults.some((result) => result.isPending),
          isError: enabledResults.some((result) => result.isError),
          error: enabledResults.find((result) => result.isError)?.error,
        };
      },
    });

  useEffect(() => {
    setFormattingData(true);

    if (!itemDetails) {
      setFormattingData(false);
      return setFilteredItems([]);
    }

    // Filter out the columns in which "isEditable" is true
    // and sort them to ensure "dropdown" and "file" types come last
    const filteredData = itemDetails?.column_values
      .filter(
        (col) => col.isEditable && col.type !== "doc" && col.type !== "timeline"
        // col.type !== "people"
      )
      .sort((a, b) => {
        const lastTypes = ["file"];
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
  }, [itemDetails]);

  // Update Local State of Dropdown Options
  useEffect(() => {
    if (DropDownOptions) {
      setDropdownOptions(DropDownOptions);
    }
  }, [DropDownOptions]);

  // Update selected item - Mutation
  const updateColumnsData = useMutation({
    mutationFn: () => {
      // Find the ids of required columns
      const requiredColumnIds = filteredItems
        .filter((col) => col.isEditable && col.isRequired)
        .map((col) => col.id);

      // Find the ids of empty required columns
      const emptyRequiredColumnIds = requiredColumnIds.filter((colId) => {
        const column = filteredItems.find((col) => col.id === colId);
        if (!column) return false;

        if (column.type === "people") {
          return (
            !column.persons_and_teams || column.persons_and_teams.length === 0
          );
        }

        if (column.type === "file") {
          return (
            !column.newlyUploadedFile || column.newlyUploadedFile.length === 0
          );
        }

        return !column.text?.trim().length;
      });

      if (emptyRequiredColumnIds.length > 0) {
        setEmptyRequiredColumnIds(emptyRequiredColumnIds);
        throw new Error("Please fill in all required fields.");
      }

      const chnagedColumns = filteredItems.filter((newCol) => {
        const originalCol = originalFilteredItemsRef.current.find(
          (col) => col.id === newCol.id
        );

        // Check if text was updated
        const textChanged = originalCol?.text !== newCol.text;

        // Check if a new file was uploaded
        const fileUploaded = !!newCol.newlyUploadedFile;

        // Check if the persons_and_teams were updated
        let personsChanged;

        if (
          newCol.type === "people" &&
          JSON.stringify(originalCol?.persons_and_teams) !==
            JSON.stringify(newCol.persons_and_teams)
        ) {
          personsChanged = true;
        } else {
          personsChanged = false;
        }

        return textChanged || fileUploaded || personsChanged;
      });

      if (chnagedColumns.length === 0) {
        throw new Error("No Column value changed.");
      }

      return boardsAPI.updateColumnValuesofItem({
        boardId,
        itemId,
        columnValues: chnagedColumns,
      });
    },
    onSuccess: () => {
      toast.success("Success!", {
        description: "Item details updated successfully.",
      });
      const id = "";
      queryClient.invalidateQueries({
        queryKey: ["itemDetails", id],
      });
      queryClient.invalidateQueries({
        queryKey: ["boardData"],
      });
      navigate(`/board/${boardId}/item-details/${itemId}`);
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
    console.error("Error fetching item details:", error);
    toast.error("Error fetching item details!", {
      description: error.message || "Please try again.",
    });
    return navigate(-1);
  }

  return (
    <div className="h-full max-h-[calc(100dvh-68px)] p-[40px] overflow-auto bg-gray-100 dark:bg-light-black blue:bg-light-blue">
      <div className="flex flex-col gap-4">
        <Link
          to={`/board/${boardId}/item-details/${itemId}`}
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
            Dashboard
          </Link>{" "}
          /{" "}
          <Link
            to={`/item-details/${boardId}/${itemId}`}
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
            {itemDetails.name}
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
            {filteredItems?.length < 1 ? (
              <p className="text-gray-400 blue:text-gray-400">
                No fields to edit!
              </p>
            ) : (
              <>
                {filteredItems.map((item) => {
                  if (item.type === "file") {
                    return (
                      <div className="flex flex-col gap-2" key={item.id}>
                        <p className="text-black dark:text-white blue:text-white">
                          {item.column.title}{" "}
                          {item?.isRequired && (
                            <span className="text-[#fa5252]">*</span>
                          )}
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
                        {emptyRequiredColumnIds.includes(item.id) &&
                          !item.newlyUploadedFile && (
                            <span className="text-[#fa5252] text-[12px] capitalize -mt-[3px]">
                              {item.column.title} is required!
                            </span>
                          )}
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
                  } else if (item.type === "status") {
                    return (
                      <Select
                        key={item.id}
                        id={item.id}
                        label={item.column.title}
                        value={item.text || ""}
                        placeholder="Select status"
                        data={
                          DropDownOptions?.find((opt) => opt.id === item.id)
                            ?.options || []
                        }
                        onChange={(value) =>
                          handleupdateItemValue({
                            itemId: item.id,
                            newValue: value,
                          })
                        }
                        classNames={{
                          label: isBlueTheme
                            ? "!text-white !font-normal !text-[14px] !mb-2"
                            : "!text-black dark:!text-white !font-normal !text-[14px] !mb-2",
                          input: isBlueTheme
                            ? "!bg-[#2b2d50] !text-white !p-[8px_10px] !rounded-lg !border-none !h-[40px]"
                            : "!p-[8px_10px] !rounded-lg !text-black dark:!text-white !bg-gray-100 dark:!bg-light-black !border-none !h-[40px]",
                        }}
                        withAsterisk={item?.isRequired}
                        error={
                          emptyRequiredColumnIds.includes(item.id) &&
                          !item.text && (
                            <span className="text-[#fa5252] text-[12px] capitalize -mt-[3px]">
                              {item.column.title} is required!
                            </span>
                          )
                        }
                      />
                    );
                  } else if (item.type === "tags") {
                    const currentOptions =
                      DropDownOptions?.find((opt) => opt.id === item.id)
                        ?.options || [];

                    // Create an Array of Tags from Item Text
                    const tags = item.text.split(",").map((tag) => tag.trim());

                    // Find the selected tags from the dropdown options
                    const selectedTags = currentOptions?.filter((opt) =>
                      tags.includes(opt.name)
                    );

                    return (
                      <CustomTagsSelect
                        key={item.id}
                        title={item.column.title}
                        options={currentOptions}
                        selectedOptions={selectedTags}
                        onChange={(newSelected) => {
                          // Create a string of selected tags
                          const selectedTagsString = newSelected
                            .map((tag) => tag.name)
                            .join(", ");

                          const updatedItems = filteredItems.map((i) => {
                            if (i.id === item.id) {
                              return {
                                ...i,
                                text: selectedTagsString,
                                selectedTags: newSelected,
                              };
                            }
                            return i;
                          });

                          setFilteredItems(updatedItems);
                        }}
                        isRequired={item?.isRequired}
                        error={
                          emptyRequiredColumnIds.includes(item.id) &&
                          !item.text && (
                            <span className="text-[#fa5252] text-[12px] capitalize -mt-[3px]">
                              {item.column.title} is required!
                            </span>
                          )
                        }
                      />
                    );
                  } else if (item.type === "dropdown") {
                    const currentOptions =
                      dropdownOptions?.find((opt) => opt.id === item.id)
                        ?.options || [];

                    // Create an Array of Tags from Item Text
                    const options = item?.text
                      ?.split(",")
                      .map((tag) => tag.trim());

                    // Find the selected tags from the dropdown options
                    const selectedOptions =
                      currentOptions?.filter((opt) =>
                        options?.includes(opt.name)
                      ) || [];

                    return (
                      <CustomDropdownSelect
                        key={item.id}
                        title={item.column.title}
                        options={currentOptions}
                        selectedOptions={selectedOptions}
                        onChange={(newSelected) => {
                          // Create a string of selected tags
                          const selectedOptionsString = newSelected
                            .map((option) => option.name)
                            .join(", ");

                          handleupdateItemValue({
                            itemId: item.id,
                            newValue: selectedOptionsString,
                          });
                        }}
                        onSaveNewColumnValue={(newColumnValue) => {
                          // Update the Current Options
                          const updatedItems = dropdownOptions.map((opt) => {
                            if (opt.id === item.id) {
                              return {
                                ...opt,
                                options: [...opt.options, newColumnValue],
                              };
                            }
                            return opt;
                          });

                          setDropdownOptions(updatedItems);
                        }}
                        isRequired={item?.isRequired}
                        error={
                          emptyRequiredColumnIds.includes(item.id) &&
                          !item.text && (
                            <span className="text-[#fa5252] text-[12px] capitalize -mt-[3px]">
                              {item.column.title} is required!
                            </span>
                          )
                        }
                      />
                    );
                  } else if (item.type === "people") {
                    const currentOptions =
                      DropDownOptions?.find((opt) => opt.id === item.id)
                        ?.options || [];

                    // Find the selected people from the dropdown options
                    const separetedPeopleIds = item.persons_and_teams.map(
                      (person) => person.id
                    );

                    const selectedPeople = currentOptions?.filter((opt) =>
                      separetedPeopleIds.includes(opt.id)
                    );

                    return (
                      <CustomAvatarSelect
                        key={item.id}
                        title={item.column.title}
                        options={currentOptions}
                        isRequired={item?.isRequired}
                        selected={selectedPeople}
                        onChange={(newSelected) => {
                          const updatedItems = filteredItems.map((i) => {
                            if (i.id === item.id) {
                              return {
                                ...i,
                                persons_and_teams: newSelected.map((user) => ({
                                  id: user.id,
                                  kind: "person",
                                })),
                              };
                            }
                            return i;
                          });
                          setFilteredItems(updatedItems);
                        }}
                        error={
                          emptyRequiredColumnIds.includes(item.id) &&
                          item.persons_and_teams.length === 0 && (
                            <span className="text-[#fa5252] text-[12px] capitalize -mt-[3px]">
                              {item.column.title} is required!
                            </span>
                          )
                        }
                      />
                    );
                  } else if (item.type === "date") {
                    return (
                      <DateInput
                        key={item.id}
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
                          label: isBlueTheme
                            ? " !text-white !font-normal !text-[14px] !mb-2"
                            : "!text-black dark:!text-white !font-normal !text-[14px] !mb-2",
                          input: isBlueTheme
                            ? " !bg-[#2b2d50] !text-white !p-[8px_10px] !rounded-lg !border-none !h-[40px]"
                            : "!p-[8px_10px] !rounded-lg !text-black dark:!text-white !bg-gray-100 dark:!bg-light-black !border-none !h-[40px]",
                        }}
                        withAsterisk={item?.isRequired}
                        error={
                          emptyRequiredColumnIds.includes(item.id) &&
                          !item.text && (
                            <span className="text-[#fa5252] text-[12px] capitalize -mt-[3px]">
                              {item.column.title} is required!
                            </span>
                          )
                        }
                      />
                    );
                  } else if (item.type === "email") {
                    return (
                      <div className="flex flex-col gap-2" key={item.id}>
                        <label
                          htmlFor={item.id}
                          className="text-black dark:text-white blue:text-white text-[14px]"
                        >
                          {item.column.title}{" "}
                          {item?.isRequired && (
                            <span className="text-[#fa5252]">*</span>
                          )}
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
                        {emptyRequiredColumnIds.includes(item.id) &&
                          !item.text && (
                            <span className="text-[#fa5252] text-[12px] capitalize -mt-[3px]">
                              {item.column.title} is required!
                            </span>
                          )}
                      </div>
                    );
                  } else if (item.type === "numbers") {
                    return (
                      <NumberInput
                        key={item.id}
                        label={item.column.title}
                        placeholder={"Enter " + item.column.title}
                        value={item.text}
                        onChange={(value) =>
                          handleupdateItemValue({
                            itemId: item.id,
                            newValue: value,
                          })
                        }
                        classNames={{
                          label: isBlueTheme
                            ? "!text-white !font-normal !text-[14px] !mb-2"
                            : "!text-black dark:!text-white !font-normal !text-[14px] !mb-2",
                          input: isBlueTheme
                            ? "!bg-[#2b2d50] !text-white !p-[8px_10px] !rounded-lg !border-none !h-[40px]"
                            : "!p-[8px_10px] !rounded-lg !text-black dark:!text-white !bg-gray-100 dark:!bg-light-black !border-none !h-[40px]",
                        }}
                        withAsterisk={item?.isRequired}
                        error={
                          emptyRequiredColumnIds.includes(item.id) &&
                          !item.text && (
                            <span className="text-[#fa5252] text-[12px] capitalize -mt-[3px]">
                              {item.column.title} is required!
                            </span>
                          )
                        }
                      />
                    );
                  } else if (item.type === "phone") {
                    return (
                      <div className="flex flex-col gap-2" key={item.id}>
                        <label
                          htmlFor={item.id}
                          className="text-black dark:text-white blue:text-white text-[14px]"
                        >
                          {item.column.title}{" "}
                          {item?.isRequired && (
                            <span className="text-[#fa5252]">*</span>
                          )}
                        </label>
                        <input
                          id={item.id}
                          className="bg-gray-100 dark:bg-light-black blue:bg-light-blue p-[8px_10px] rounded-lg text-black dark:text-white blue:text-white placeholder:text-[14px]"
                          placeholder="+1 (123) 456 7890"
                          value={item.text}
                          onChange={(e) =>
                            handleupdateItemValue({
                              itemId: item.id,
                              newValue: e.target.value,
                            })
                          }
                        />
                        {emptyRequiredColumnIds.includes(item.id) &&
                          !item.text && (
                            <span className="text-[#fa5252] text-[12px] capitalize -mt-[3px]">
                              {item.column.title} is required!
                            </span>
                          )}
                      </div>
                    );
                  } else if (
                    item.type === "text" ||
                    item.type === "long-text" ||
                    item.type === "name"
                  ) {
                    return (
                      <div className="flex flex-col gap-2" key={item.id}>
                        <label
                          htmlFor={item.id}
                          className="text-black dark:text-white blue:text-white text-[14px]"
                        >
                          {item.column.title}{" "}
                          {item?.isRequired && (
                            <span className="text-[#fa5252]">*</span>
                          )}
                        </label>
                        <input
                          id={item.id}
                          className="bg-gray-100 dark:bg-light-black blue:bg-light-blue p-[8px_10px] rounded-lg text-black dark:text-white blue:text-white placeholder:text-[14px]"
                          placeholder="Enter value here..."
                          value={item.text}
                          onChange={(e) =>
                            handleupdateItemValue({
                              itemId: item.id,
                              newValue: e.target.value,
                            })
                          }
                        />
                        {emptyRequiredColumnIds.includes(item.id) &&
                          !item.text && (
                            <span className="text-[#fa5252] text-[12px] capitalize -mt-[3px]">
                              {item.column.title} is required!
                            </span>
                          )}
                      </div>
                    );
                  } else {
                    return null;
                  }
                })}
                <div className="xl:col-span-3 lg:col-span-2 col-span-1">
                  <button className="px-4 py-2 bg-[#2A85FF] text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out w-fit">
                    Save Changes
                  </button>
                </div>
              </>
            )}
          </form>
        </>
      )}
    </div>
  );
};

export default EditItemDetails;
