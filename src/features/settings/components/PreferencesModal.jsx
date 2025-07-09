import { Group, Select } from "@mantine/core";
import { ModalContent, ModalRoot } from "../../../components/Modal";
import { LayoutGrid, List, Table } from "lucide-react";
import useHtmlThemeClass from "../../../hooks/useHtmlThemeClass";
import useUserPreferences from "../../../hooks/useUserPreferences";
import { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";

const icons = {
  card: <LayoutGrid size={20} />,
  list: <List size={20} />,
  table: <Table size={20} />,
};

const renderSelectOption = ({ option, checked }) => (
  <Group flex="1" gap="xs">
    {icons[option.value]}
    {option.label}
  </Group>
);

const PreferencesModal = ({ isModalOpen, onCloseModal, type }) => {
  // Theme Hook
  const theme = useHtmlThemeClass();
  const isBlueTheme = theme === "blue";

  // User Preferences Hook
  const { preferences, updatePreferences } = useUserPreferences();

  // Sorting Options Context
  const { sortingOptions } = useAuth();

  // Local States
  const [selectedItemView, setSelectedItemView] = useState("card");
  const [sortPreference, setSortPreference] = useState("default");

  // Sync state when preferences load from localStorage
  useEffect(() => {
    if (preferences?.itemView)
      setSelectedItemView(preferences.itemView || "card");
    if (preferences?.sortPreference)
      setSortPreference(preferences.sortPreference || "default");
  }, [preferences]);

  return (
    <ModalRoot
      id="preferencesModal"
      openModal={isModalOpen}
      onClose={onCloseModal}
      loadingOverlay={false}
    >
      <ModalContent
        heading="Item View Preference"
        description="Select your preferred item view and sorting option. These preferences will be saved for future sessions."
      />
      <Select
        id="default-item-view-select"
        label="Item View"
        data={[
          { value: "card", label: "Card View" },
          { value: "list", label: "List View" },
          { value: "table", label: "Table View" },
        ]}
        renderOption={renderSelectOption}
        placeholder="Select Item View"
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
        value={selectedItemView}
        onChange={(value) => setSelectedItemView(value)}
      />
      <Select
        id="default-sort-filter-select"
        label="Sort Preference"
        data={sortingOptions}
        placeholder="Select Item View"
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
        value={sortPreference}
        onChange={(value) => setSortPreference(value)}
      />
      <button
        type="button"
        className="px-4 py-2 bg-[#2A85FF] text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out w-fit"
        onClick={() => {
          updatePreferences({
            itemView: selectedItemView,
            sortPreference: sortPreference,
          });
          onCloseModal();
        }}
      >
        Save Changes
      </button>
    </ModalRoot>
  );
};

export default PreferencesModal;
