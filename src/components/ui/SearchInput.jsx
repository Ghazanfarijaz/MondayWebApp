import { TextInput } from "@mantine/core";
import useHtmlThemeClass from "../../hooks/useHtmlThemeClass";
import SearchIcon from "../../assets/icons/SearchIcon";
import debounce from "lodash.debounce";
import { useState } from "react";
import FilterIcon  from "../../assets/icons/FilterIcon";
import { Menu, Checkbox } from "@mantine/core";
const SearchInput = ({ searchQuery, onChange }) => {
  const theme = useHtmlThemeClass();
  const isBlueTheme = theme === "blue";

  const bgColorClass = isBlueTheme
    ? "bg-[#191b34] text-white"
    : "dark:bg-[#000] bg-[#F4F4F4]";

  // Local States
  const [searchTerm, setSearchTerm] = useState(searchQuery || "");
  const [onlyAssigned, setOnlyAssigned] = useState(false);


  const handleSearch = debounce((value) => {
    onChange(value);
  }, 1000);

  return (
    <div className="flex gap-2">
      <div className="relative max-w-[310px] h-[40px]">
        {/* Left Icon + Blue Bar Layer */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 pl-3 flex items-center gap-[12px] pointer-events-none">
          <SearchIcon className="w-6 h-6 text-[#6F767E]" />
          <div className="w-[2px] h-5 bg-[#2A85FF] rounded-sm" />
        </div>

        {/* Input Field */}
        <TextInput
          unstyled
          placeholder="Search"
          classNames={{
            input: `!h-[40px] !rounded-[12px] !pl-[64px] text-sm font-medium outline-none w-full text-black dark:text-white ${bgColorClass}`,
          }}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            handleSearch(e.target.value);
          }}
        />
      </div>
      <div className="flex items-center justify-center w-[40px] h-[40px] bg-[#F4F4F4] rounded-[12px]">
        <Menu shadow="md" width={250} position="bottom-end">
          <Menu.Target>
            <div className="flex items-center justify-center w-[40px] h-[40px] bg-[#F4F4F4] rounded-[12px] cursor-pointer">
              <FilterIcon className="text-[#6F767E] size-[24px]" />
            </div>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>
              <div className="font-bold text-[14px] text-[#33383F]">
                Filter
              </div>
            </Menu.Label>
            <Menu.Item closeMenuOnClick={false}>
              <Checkbox
                label="Show only assigned to me"
                checked={onlyAssigned}
                onChange={(e) => setOnlyAssigned(e.currentTarget.checked)}
              />
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    </div>
  );
};

export default SearchInput;
