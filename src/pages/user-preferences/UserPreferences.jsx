import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useUserPreferences } from "../../contexts/UserPreferencesContext";
import useHtmlThemeClass from "../../hooks/useHtmlThemeClass";
import { Group, Select } from "@mantine/core";
import { LayoutGrid, List, Table } from "lucide-react";

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

const UserPreferences = () => {
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
  const [dateFormat, setDateFormat] = useState("YYYY-MM-DD");
  const [updatingPreferences, setUpdatingPreferences] = useState(false);

  // Sync state when preferences load from localStorage
  useEffect(() => {
    if (preferences?.itemView)
      setSelectedItemView(preferences?.itemView || "card");
    if (preferences?.sortPreference)
      setSortPreference(preferences?.sortPreference || "default");
    if (preferences?.dateFormat)
      setDateFormat(preferences?.dateFormat || "YYYY-MM-DD");
  }, [preferences]);

  const handleUpdatePreferences = () => {
    setUpdatingPreferences(true);
    updatePreferences({
      itemView: selectedItemView,
      sortPreference: sortPreference,
      dateFormat: dateFormat,
    });

    setTimeout(() => {
      setUpdatingPreferences(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="font-bold md:text-[24px] text-[20px] text-black dark:text-white blue:text-white leading-none">
          User Preferences
        </h2>
        <p className="text-gray-700 dark:text-gray-400 blue:text-gray-100">
          Select your preferred <b>'Item View'</b> and <b>'Sorting Option'</b>.
          These preferences will be saved for future sessions.
        </p>
      </div>
      <div className="bg-white dark:bg-black blue:bg-dark-blue p-6 rounded-lg shadow-sm lg:grid grid-cols-2 flex flex-col gap-8 max-w-[800px] relative">
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
          disabled={updatingPreferences}
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
          disabled={updatingPreferences}
        />
        <Select
          id="default-date-format"
          label="Date Format"
          data={[
            { value: "DD-MM-YYYY", label: "DD-MM-YYYY" },
            { value: "DD-MMM-YYYY", label: "DD-MMM-YYYY" },
            { value: "MM-DD-YYYY", label: "MM-DD-YYYY" },
            { value: "YYYY-MM-DD", label: "YYYY-MM-DD" },
          ]}
          placeholder="Select Date Format"
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
          value={dateFormat}
          onChange={(value) => setDateFormat(value)}
          disabled={updatingPreferences}
        />
        <button
          type="button"
          className="px-4 py-2 bg-[#2A85FF] text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out w-fit mt-3 lg:col-span-2"
          onClick={() => {
            handleUpdatePreferences();
          }}
        >
          {updatingPreferences ? (
            <div className="flex items-center gap-2">
              <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
              <span>Updating...</span>
            </div>
          ) : (
            "Update Preferences"
          )}
        </button>
      </div>
    </div>
  );
};

export default UserPreferences;
