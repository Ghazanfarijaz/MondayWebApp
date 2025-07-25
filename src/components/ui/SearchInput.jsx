import { TextInput } from "@mantine/core";
import useHtmlThemeClass from "../../hooks/useHtmlThemeClass";
import SearchIcon from "../../assets/icons/SearchIcon";
import debounce from "lodash.debounce";
import { useState } from "react";

const SearchInput = ({ searchQuery, onChange }) => {
  const theme = useHtmlThemeClass();
  const isBlueTheme = theme === "blue";

  const bgColorClass = isBlueTheme
    ? "bg-[#191b34] text-white"
    : "dark:bg-[#000] bg-[#F4F4F4]";

  // Local States
  const [searchTerm, setSearchTerm] = useState(searchQuery || "");

  const handleSearch = debounce((value) => {
    onChange(value);
  }, 1000);

  return (
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
  );
};

export default SearchInput;
