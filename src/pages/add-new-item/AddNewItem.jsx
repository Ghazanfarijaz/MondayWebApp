import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import { ChevronLeft } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import useHtmlThemeClass from "../../hooks/useHtmlThemeClass";
import EditItemDetailsSkeleton from "../../features/edit-item-details/components/EditItemDetailsSkeleton";
import React, { useEffect, useState } from "react";
import { boardsAPI } from "../../api/board";
import { NumberInput, Select } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import CustomAvatarSelect from "../../features/edit-item-details/components/CustomAvatarSelect";
import CustomDropdownSelect from "../../features/edit-item-details/components/CustomDropdownSelect";
import CustomTagsSelect from "../../features/edit-item-details/components/CustomTagsSelect";

const AddNewItem = () => {
  // Hooks
  const { boardId, groupId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Theme Hook
  const theme = useHtmlThemeClass();
  const isBlueTheme = theme === "blue";

  // Local States
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [editableFields, setEditableFields] = useState([]);
  const [itemName, setItemName] = useState("");

  // State to store ids of required Columns whoes values are not added
  // Used to show error
  const [emptyRequiredColumnIds, setEmptyRequiredColumnIds] = useState([]);

  // Fetch Details for Editable Columns and Dropdown Options
  const { editableColumns, DropDownOptions, isError, error, isPending } =
    useQueries({
      queries: [
        {
          queryKey: ["editableColumns"],
          queryFn: () => boardsAPI.getEditableColumns({ boardId }),
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

            editableFields?.forEach((col) => {
              switch (col.columnType) {
                case "status":
                  columnIds.status.push(col.columnId);
                  break;
                case "dropdown":
                  columnIds.dropdown.push(col.columnId);
                  break;
                case "tags":
                  columnIds.tags.push(col.columnId);
                  break;
                case "people":
                  columnIds.people.push(col.columnId);
                  break;
                default:
                  break;
              }
            });

            return boardsAPI.getDropDownOptions({
              boardId: boardId,
              columnIds,
            });
          },
          enabled: !!editableFields.length,
        },
      ],

      combine: (results) => {
        const enabledResults = results.filter(
          (result) => result.fetchStatus !== "idle"
        );
        return {
          editableColumns: results[0].data,
          DropDownOptions: results[1].data,
          isPending: enabledResults.some((result) => result.isPending),
          isError: enabledResults.some((result) => result.isError),
          error: enabledResults.find((result) => result.isError)?.error,
        };
      },
    });

  // Update Local State of Editable Columns
  useEffect(() => {
    if (editableColumns) {
      if (editableColumns.allowUsersToCreateNewItems) {
        setEditableFields(editableColumns?.editableFields || []);
      } else {
        navigate(-1);
      }
    }
  }, [editableColumns, navigate]);

  // Update Local State of Dropdown Options
  useEffect(() => {
    if (DropDownOptions) {
      setDropdownOptions(DropDownOptions);
    }
  }, [DropDownOptions]);

  // Add New Item - Mutation
  const addNewItem = useMutation({
    mutationFn: () => {
      // Find the ids of required columns
      const requiredColumnIds = editableFields
        .filter((col) => col.isEditable && col.isRequired)
        .map((col) => col.columnId);

      // Find the ids of empty required columns
      const emptyRequiredColumnIds = requiredColumnIds.filter((colId) => {
        const column = editableFields.find((col) => col.columnId === colId);

        if (!column) return false;

        if (column.columnType === "people") {
          return (
            !column.persons_and_teams || column.persons_and_teams.length === 0
          );
        }

        if (column.columnType === "file") {
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

      const changedColumns = editableFields.filter((col) => {
        return col.text || col.newlyUploadedFile || col.persons_and_teams;
      });

      // Check if editableFields contain name column
      const nameColumn = editableFields.find(
        (col) => col.columnType === "name"
      );

      //  Filter Out the name column from changedColumns
      const changedColumnsWithoutName = changedColumns.filter(
        (col) => col.columnType !== "name"
      );

      if (changedColumns.length === 0) {
        throw new Error("No column values provided");
      }

      return boardsAPI.addNewItem({
        boardId,
        groupId,
        itemName: nameColumn ? nameColumn.text : itemName,
        columnValues: changedColumnsWithoutName,
      });
    },
    onSuccess: () => {
      // Create a sample searchQuery to invalidate the query to fetch updated data
      const searchQuery = "";
      queryClient.invalidateQueries({
        queryKey: ["boardData", searchQuery],
      });

      toast.success("Success!", { description: "Item added successfully." });

      navigate(`/board/${boardId}`, { replace: true });
    },
    onError: (error) => {
      toast.error("Couldn't create item!", {
        description: error.message || "Please try again.",
      });
    },
  });

  if (isError) {
    console.error("Error fetching editable columns", error);
    toast.error("Error!", {
      description: "Interal Server Error! Please try again later.",
    });
    return navigate(`/board/${boardId}`, { replace: true });
  }

  const handleupdateItemValue = ({ itemId, newValue }) => {
    const updatedItems = editableFields.map((item) => {
      if (item.columnId === itemId) {
        return {
          ...item,
          text: newValue,
        };
      }
      return item;
    });

    setEditableFields(updatedItems);
  };

  return (
    <div className="h-full max-h-[calc(100dvh-68px)] p-[40px] overflow-auto bg-gray-100 dark:bg-light-black blue:bg-light-blue">
      <div className="flex flex-col gap-4">
        <Link
          to={`/board/${boardId}`}
          className="text-gray-600 dark:text-gray-400 blue:text-gray-100 font-medium flex items-center gap-1"
        >
          <ChevronLeft size={20} />
          <p>Go Back</p>
        </Link>
        <h1 className="text-3xl font-bold mb-8 text-black dark:text-white blue:text-white break-all">
          Add New Item
        </h1>
      </div>
      {isPending || addNewItem.isPending ? (
        <EditItemDetailsSkeleton />
      ) : (
        <div className="flex flex-col gap-8 bg-white dark:bg-black blue:bg-dark-blue p-6 rounded-lg shadow-sm">
          <h1 className="text-xl font-bold text-black dark:text-white blue:text-white break-all">
            Add Details
          </h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addNewItem.mutate();
            }}
            className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-8"
          >
            {/* Add Item Name Column if not present */}
            {editableFields?.find(
              (item) => item.columnType === "name"
            ) ? null : (
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="item-name"
                  className="text-black dark:text-white blue:text-white text-[14px]"
                >
                  Item Name <span className="text-[#fa5252]">*</span>
                </label>
                <input
                  id="item-name"
                  className="bg-gray-100 dark:bg-light-black blue:bg-light-blue p-[8px_10px] rounded-lg text-black dark:text-white blue:text-white placeholder:text-[14px] placeholder:text-[#adb5bd] placeholder:font-normal"
                  placeholder="Enter item's name here..."
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                />
                {itemName === "" && (
                  <span className="text-[#fa5252] text-[12px] capitalize -mt-[3px]">
                    Item name is required!
                  </span>
                )}
              </div>
            )}

            {editableFields?.map((item) => {
              if (item.columnType === "status") {
                return (
                  <Select
                    key={item.columnId}
                    id={item.columnId}
                    label={item?.columnName}
                    value={item.text || ""}
                    placeholder="Select status"
                    data={
                      DropDownOptions?.find((opt) => opt.id === item.columnId)
                        ?.options || []
                    }
                    onChange={(value) =>
                      handleupdateItemValue({
                        itemId: item.columnId,
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
                      emptyRequiredColumnIds.includes(item.columnId) &&
                      !item.text && (
                        <span className="text-[#fa5252] text-[12px] capitalize -mt-[3px]">
                          {item?.columnName} is required!
                        </span>
                      )
                    }
                  />
                );
              } else if (item.columnType === "tags") {
                const currentOptions =
                  DropDownOptions?.find((opt) => opt.id === item.columnId)
                    ?.options || [];
                // Create an Array of Tags from Item Text
                const tags =
                  item?.text?.split(",")?.map((tag) => tag.trim()) || [];
                // Find the selected tags from the dropdown options
                const selectedTags = currentOptions?.filter((opt) =>
                  tags.includes(opt.name)
                );
                return (
                  <CustomTagsSelect
                    key={item.columnId}
                    title={item?.columnName}
                    options={currentOptions}
                    selectedOptions={selectedTags}
                    onChange={(newSelected) => {
                      // Create a string of selected tags
                      const selectedTagsString = newSelected
                        .map((tag) => tag.name)
                        .join(", ");
                      const updatedItems = editableFields.map((i) => {
                        if (i.columnId === item.columnId) {
                          return {
                            ...i,
                            text: selectedTagsString,
                            selectedTags: newSelected,
                          };
                        }
                        return i;
                      });
                      setEditableFields(updatedItems);
                    }}
                    isRequired={item?.isRequired}
                    error={
                      emptyRequiredColumnIds.includes(item.columnId) &&
                      !item.text && (
                        <span className="text-[#fa5252] text-[12px] capitalize -mt-[3px]">
                          {item?.columnName} is required!
                        </span>
                      )
                    }
                  />
                );
              } else if (item.columnType === "dropdown") {
                const currentOptions =
                  dropdownOptions?.find((opt) => opt.id === item.columnId)
                    ?.options || [];
                // Create an Array of Tags from Item Text
                const options =
                  item?.text?.split(",")?.map((tag) => tag.trim()) || [];
                // Find the selected tags from the dropdown options
                const selectedOptions =
                  currentOptions?.filter((opt) =>
                    options?.includes(opt.name)
                  ) || [];
                return (
                  <CustomDropdownSelect
                    key={item.columnId}
                    title={item?.columnName}
                    options={currentOptions}
                    selectedOptions={selectedOptions}
                    onChange={(newSelected) => {
                      // Create a string of selected tags
                      const selectedOptionsString = newSelected
                        .map((option) => option.name)
                        .join(", ");
                      handleupdateItemValue({
                        itemId: item.columnId,
                        newValue: selectedOptionsString,
                      });
                    }}
                    onSaveNewColumnValue={(newColumnValue) => {
                      // Update the Current Options
                      const updatedItems = dropdownOptions.map((opt) => {
                        if (opt.id === item.columnId) {
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
                      emptyRequiredColumnIds.includes(item.columnId) &&
                      !item.text && (
                        <span className="text-[#fa5252] text-[12px] capitalize -mt-[3px]">
                          {item?.columnName} is required!
                        </span>
                      )
                    }
                  />
                );
              } else if (item.columnType === "people") {
                const currentOptions =
                  DropDownOptions?.find((opt) => opt.id === item.columnId)
                    ?.options || [];
                // Find the selected people from the dropdown options
                const separetedPeopleIds =
                  item?.persons_and_teams?.map((person) => person.id) || [];
                const selectedPeople = currentOptions?.filter((opt) =>
                  separetedPeopleIds.includes(opt.id)
                );

                return (
                  <CustomAvatarSelect
                    key={item.columnId}
                    title={item?.columnName}
                    options={currentOptions}
                    selected={selectedPeople}
                    onChange={(newSelected) => {
                      const updatedItems = editableFields.map((i) => {
                        if (i.columnId === item.columnId) {
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
                      setEditableFields(updatedItems);
                    }}
                    isRequired={item?.isRequired}
                    error={
                      emptyRequiredColumnIds.includes(item.columnId) &&
                      (!item?.persons_and_teams ||
                        item?.persons_and_teams?.length === 0) && (
                        <span className="text-[#fa5252] text-[12px] capitalize -mt-[3px]">
                          {item?.columnName} is required!
                        </span>
                      )
                    }
                  />
                );
              } else if (item.columnType === "date") {
                return (
                  <DateInput
                    key={item.columnId}
                    value={item.text ? new Date(item.text) : null}
                    onChange={(value) =>
                      handleupdateItemValue({
                        itemId: item.columnId,
                        newValue: value,
                      })
                    }
                    label={item?.columnName}
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
                      emptyRequiredColumnIds.includes(item.columnId) &&
                      !item.text && (
                        <span className="text-[#fa5252] text-[12px] capitalize -mt-[3px]">
                          {item?.columnName} is required!
                        </span>
                      )
                    }
                  />
                );
              } else if (item.columnType === "email") {
                return (
                  <div className="flex flex-col gap-2" key={item.columnId}>
                    <label
                      htmlFor={item.columnId}
                      className="text-black dark:text-white blue:text-white text-[14px]"
                    >
                      {item?.columnName}{" "}
                      {item?.isRequired && (
                        <span className="text-[#fa5252]">*</span>
                      )}
                    </label>
                    <input
                      id={item.columnId}
                      type="email"
                      className={`bg-gray-100 dark:bg-light-black blue:bg-light-blue p-[8px_10px] rounded-lg text-black dark:text-white blue:text-white`}
                      placeholder="Enter email here..."
                      value={item.text || ""}
                      onChange={(e) =>
                        handleupdateItemValue({
                          itemId: item.columnId,
                          newValue: e.target.value,
                        })
                      }
                    />
                    {emptyRequiredColumnIds.includes(item.columnId) &&
                      !item.text && (
                        <span className="text-[#fa5252] text-[12px] capitalize -mt-[3px]">
                          {item?.columnName} is required!
                        </span>
                      )}
                  </div>
                );
              } else if (item.columnType === "numbers") {
                return (
                  <NumberInput
                    key={item.columnId}
                    label={item?.columnName}
                    placeholder={"Enter " + item?.columnName}
                    value={item.text}
                    onChange={(value) =>
                      handleupdateItemValue({
                        itemId: item.columnId,
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
                      emptyRequiredColumnIds.includes(item.columnId) &&
                      !item.text && (
                        <span className="text-[#fa5252] text-[12px] capitalize -mt-[3px]">
                          {item?.columnName} is required!!
                        </span>
                      )
                    }
                  />
                );
              } else if (item.columnType === "name") {
                return (
                  <div className="flex flex-col gap-2" key={item.columnId}>
                    <label
                      htmlFor={item.columnId}
                      className="text-black dark:text-white blue:text-white text-[14px]"
                    >
                      Item Name <span className="text-[#fa5252]">*</span>
                    </label>
                    <input
                      id={item.columnId}
                      className="bg-gray-100 dark:bg-light-black blue:bg-light-blue p-[8px_10px] rounded-lg text-black dark:text-white blue:text-white placeholder:text-[14px] placeholder:text-[#adb5bd] placeholder:font-normal"
                      placeholder="Enter item's name here..."
                      value={item.text || ""}
                      required
                      onChange={(e) =>
                        handleupdateItemValue({
                          itemId: item.columnId,
                          newValue: e.target.value,
                        })
                      }
                    />
                    {!item.text && (
                      <span className="text-[#fa5252] text-[12px] capitalize -mt-[3px]">
                        {item?.columnName} is required!
                      </span>
                    )}
                  </div>
                );
              } else if (item.columnType === "phone") {
                return (
                  <div className="flex flex-col gap-2" key={item.columnId}>
                    <label
                      htmlFor={item.columnId}
                      className="text-black dark:text-white blue:text-white text-[14px]"
                    >
                      {item?.columnName}{" "}
                      {item?.isRequired && (
                        <span className="text-[#fa5252]">*</span>
                      )}
                    </label>
                    <input
                      id={item.columnId}
                      className="bg-gray-100 dark:bg-light-black blue:bg-light-blue p-[8px_10px] rounded-lg text-black dark:text-white blue:text-white placeholder:text-[14px] placeholder:text-[#adb5bd] placeholder:font-normal"
                      placeholder="+1 (123) 456 7890"
                      value={item.text || ""}
                      onChange={(e) =>
                        handleupdateItemValue({
                          itemId: item.columnId,
                          newValue: e.target.value,
                        })
                      }
                    />
                    {emptyRequiredColumnIds.includes(item.columnId) &&
                      !item.text && (
                        <span className="text-[#fa5252] text-[12px] capitalize -mt-[3px]">
                          {item?.columnName} is required!
                        </span>
                      )}
                  </div>
                );
              } else if (
                item.columnType === "text" ||
                item.columnType === "long_text"
              ) {
                return (
                  <div className="flex flex-col gap-2" key={item.columnId}>
                    <label
                      htmlFor={item.columnId}
                      className="text-black dark:text-white blue:text-white text-[14px]"
                    >
                      {item?.columnName}{" "}
                      {item?.isRequired && (
                        <span className="text-[#fa5252]">*</span>
                      )}
                    </label>
                    <input
                      id={item.columnId}
                      className="bg-gray-100 dark:bg-light-black blue:bg-light-blue p-[8px_10px] rounded-lg text-black dark:text-white blue:text-white placeholder:text-[14px] placeholder:text-[#adb5bd] placeholder:font-normal"
                      placeholder="Enter value here..."
                      value={item.text || ""}
                      onChange={(e) =>
                        handleupdateItemValue({
                          itemId: item.columnId,
                          newValue: e.target.value,
                        })
                      }
                    />
                    {emptyRequiredColumnIds.includes(item.columnId) &&
                      !item.text && (
                        <span className="text-[#fa5252] text-[12px] capitalize -mt-[3px]">
                          {item?.columnName} is required!!
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
                Add Item
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddNewItem;
