import { Select } from "@mantine/core";
import { ModalContent, ModalRoot } from "../../../components/Modal";
import useHtmlThemeClass from "../../../hooks/useHtmlThemeClass";
import { useState } from "react";
import { Link } from "react-router-dom";

const SelectItemGroupModal = ({ opened, onClose, boardId, groupsData }) => {
  // Theme Hook
  const theme = useHtmlThemeClass();
  const isBlueTheme = theme === "blue";

  // Local States
  const [selectedGroup, setSelectedGroup] = useState(null);

  return (
    <ModalRoot
      id="select-item-group-modal"
      loadingOverlay={false}
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
      <Link
        to={`/create-item/${boardId}/${selectedGroup}`}
        className="px-4 py-2 bg-[#2A85FF] text-white rounded-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out w-fit mt-3"
        onClick={() => onClose()}
      >
        Continue
      </Link>
    </ModalRoot>
  );
};

export default SelectItemGroupModal;
