import FilterIcon from "../../../assets/icons/FilterIcon";
import { Menu, Checkbox } from "@mantine/core";
import useHtmlThemeClass from "../../../hooks/useHtmlThemeClass";

const AssignToFilter = ({ value, onChange }) => {
  // Hooks
  const theme = useHtmlThemeClass();
  const isBlueTheme = theme === "blue";

  return (
    <Menu
      shadow="md"
      width={250}
      position="bottom-end"
      classNames={{
        dropdown: `!rounded-lg ${
          isBlueTheme
            ? "!bg-[#2B2D50] !border-[#797e93]"
            : "!bg-white dark:!bg-light-black dark:!border-[#4E4E4E]"
        }`,
        arrow: isBlueTheme
          ? "!bg-[#2B2D50] !border-[#797e93]"
          : "!bg-white dark:!bg-light-black dark:!border-[#4E4E4E]",
        item: isBlueTheme
          ? "hover:!bg-[#191B34]"
          : "hover:!bg-gray-50 dark:hover:!bg-black/50",
      }}
      withArrow
    >
      <Menu.Target>
        <div className="flex items-center justify-center w-[40px] h-[40px] bg-[#F4F4F4] dark:bg-black blue:bg-dark-blue rounded-[12px] cursor-pointer">
          <FilterIcon className="text-[#6F767E] dark:text-gray-500 blue:text-gray-400 size-[24px]" />
        </div>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>
          <div className="font-bold text-[14px] text-[#33383F] dark:text-white blue:text-white">
            Filter
          </div>
        </Menu.Label>
        <Menu.Item closeMenuOnClick={false}>
          <Checkbox
            label="Show only assigned to me"
            checked={value === "assigned-to-me"}
            value={value}
            onChange={() => onChange("assigned-to-me")}
            classNames={{
              label: isBlueTheme
                ? "!text-white"
                : "!text-black dark:!text-white",
            }}
          />
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default AssignToFilter;
