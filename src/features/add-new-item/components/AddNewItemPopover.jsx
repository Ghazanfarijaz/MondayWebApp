import { LoadingOverlay, Popover, Select, Stack } from "@mantine/core";
import useHtmlThemeClass from "../../../hooks/useHtmlThemeClass";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { boardGroupsAPIs } from "../../../api/board-groups";
import { toast } from "sonner";
import { CROSS_ICON } from "../../../assets/icons/CrossIcon";
import { useIsMobile } from "../hooks/use-mobile";

const AddNewItemPopover = () => {
  // Theme Hook
  const theme = useHtmlThemeClass();
  const isBlueTheme = theme === "blue";
  const { boardId } = useParams();
  const isMobile = useIsMobile();

  // Local States
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [openedAddNewItemPopover, setAddNewItemPopover] = useState(false);

  // Query to fetch the Groups Data
  const {
    data: groupsData,
    isPending,
    error,
    isError,
  } = useQuery({
    queryKey: ["groups"],
    queryFn: () => boardGroupsAPIs.getAllGroups({ boardId }),
    enabled: !!openedAddNewItemPopover && !!boardId,
  });

  if (isError) {
    console.error("Error fetching board groups:", error);
    toast.error("Could not fetch board groups!", {
      description:
        error.message || "Failed to fetch board groups. Please try again.",
    });
  }

  return (
    <Popover
      //   width="500px"
      position={!isMobile ? "bottom-end" : "bottom"}
      withArrow
      shadow="md"
      opened={openedAddNewItemPopover}
      onChange={() => setAddNewItemPopover(false)}
      withOverlay
      overlayProps={{ zIndex: 10000, blur: "2px" }}
      zIndex={10001}
      radius={12}
      padding={0}
      classNames={{
        dropdown: `!w-[90dvw] !max-w-[500px]`,
      }}
    >
      <Popover.Target>
        <button
          type="button"
          className="px-4 py-2 bg-[#2A85FF] text-white rounded-md hover:shadow-lg w-full sm:w-fit"
          onClick={() => {
            setAddNewItemPopover(true);
          }}
        >
          Add New Item
        </button>
      </Popover.Target>
      <Popover.Dropdown classNames={{}}>
        <div className="w-full relative p-[20px_8px] bg-white dark:bg-light-black blue:bg-light-blue rounded-md">
          <LoadingOverlay
            visible={isPending}
            zIndex={1000}
            overlayProps={{ radius: "sm", blur: 2 }}
          />
          <button
            className="absolute !top-0 !right-0"
            onClick={() => setAddNewItemPopover(false)}
          >
            <CROSS_ICON className="text-black dark:text-white blue:text-white" />
          </button>

          <Stack gap={5}>
            <div>
              <h2 className="font-bold md:text-[24px] text-[20px] text-black dark:text-white blue:text-white leading-none">
                Select Item Group
              </h2>
              <p className="text-gray-700 dark:text-gray-400 blue:text-gray-100">
                Select a group in which you want to add a new item.
              </p>
            </div>
            <Select
              id="select-item-group"
              data={groupsData}
              value={selectedGroup}
              onChange={setSelectedGroup}
              placeholder="Select Group"
              classNames={{
                input: isBlueTheme
                  ? "!bg-[#191B34] !text-white !border-none !h-[42px] !rounded-lg !p-[8px_10px]"
                  : "!text-black !bg-gray-100 !border-none !h-[42px] !rounded-lg !p-[8px_10px]",
                dropdown: isBlueTheme
                  ? "!bg-[#191B34] !text-white !border-[#2B2D50] !rounded-lg !outline-none"
                  : "bg-white !rounded-lg !outline-none",
                option: isBlueTheme
                  ? "hover:!bg-[#2B2D50] !text-white"
                  : "hover:!bg-gray-100 !text-black",
              }}
              comboboxProps={{
                withinPortal: false,
              }}
              allowDeselect={false}
              disabled={isPending}
              searchable
              nothingFoundMessage="No groups found..."
            />
            {selectedGroup ? (
              <Link
                to={`/board/${boardId}/create-item/${selectedGroup}`}
                className={`px-4 py-2 bg-[#2A85FF] text-white transform hover:scale-105 transition-all duration-300 ease-in-out hover:shadow-lg rounded-md w-fit mt-3`}
                onClick={() => setAddNewItemPopover(false)}
              >
                Continue
              </Link>
            ) : (
              <span
                className={`px-4 py-2 bg-gray-300 text-gray-400 hover:cursor-not-allowed rounded-md w-fit mt-3`}
              >
                Continue
              </span>
            )}
          </Stack>
        </div>
      </Popover.Dropdown>
    </Popover>
  );
};

export default AddNewItemPopover;
