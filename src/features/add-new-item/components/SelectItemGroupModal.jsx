import { Select } from "@mantine/core";
import { ModalContent, ModalRoot } from "../../../components/Modal";
import useHtmlThemeClass from "../../../hooks/useHtmlThemeClass";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { boardGroupsAPIs } from "../../../api/board-groups";
import { toast } from "sonner";

const SelectItemGroupModal = ({ opened, onClose }) => {
  // Theme Hook
  const theme = useHtmlThemeClass();
  const isBlueTheme = theme === "blue";
  const { boardId } = useParams();

  // Local States
  const [selectedGroup, setSelectedGroup] = useState(null);

  // Query to fetch the Groups Data
  const {
    data: groupsData,
    isPending,
    error,
    isError,
  } = useQuery({
    queryKey: ["groups"],
    queryFn: () => boardGroupsAPIs.getAllGroups({ boardId }),
    // enabled: !!opened && !!boardId,
  });

  if (isError) {
    console.error("Error fetching board groups:", error);
    toast.error("Could not fetch board groups!", {
      description:
        error.message || "Failed to fetch board groups. Please try again.",
    });
    onClose();
  }

  return (
    <ModalRoot
      id="select-item-group-modal"
      loadingOverlay={isPending}
      openModal={opened}
      onClose={onClose}
    >
      <ModalContent
        heading={"Select Item Group"}
        description="Select a group in which you want to add a new item."
      />
      <Select
        id="select-item-group"
        data={groupsData}
        value={selectedGroup}
        onChange={setSelectedGroup}
        placeholder="Select Group"
        classNames={{
          input: isBlueTheme
            ? " !bg-[#191B34] !text-white !border-none !h-[42px] !rounded-lg !p-[8px_10px]"
            : "!text-black !bg-gray-100 !border-none !h-[42px] !rounded-lg !p-[8px_10px]",
          dropdown: isBlueTheme
            ? "!bg-[#191B34] !text-white !border-[#2B2D50] !rounded-lg !outline-none"
            : "bg-white !rounded-lg !outline-none",
          option: isBlueTheme
            ? "hover:!bg-[#2B2D50] !text-white"
            : "hover:!bg-gray-100 !text-black",
        }}
        allowDeselect={false}
      />
      {selectedGroup ? (
        <Link
          to={`/create-item/${boardId}/${selectedGroup}`}
          className={`px-4 py-2 bg-[#2A85FF] text-white transform hover:scale-105 transition-all duration-300 ease-in-out hover:shadow-lg rounded-md w-fit mt-3`}
          onClick={() => onClose()}
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
    </ModalRoot>
  );
};

export default SelectItemGroupModal;
