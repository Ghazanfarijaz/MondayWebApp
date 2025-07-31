import { useEffect, useRef, useState } from "react";
import { FiFilter, FiChevronDown, FiCheck } from "react-icons/fi";

const SortFilter = ({
  selectedOption,
  setSelectedOption,
  sortOptions,
  onFilterChange,
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterOptions, setFilterOptions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    };

    if (isFilterOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFilterOpen]);

  // Handle Search Filter
  useEffect(() => {
    const filteredOptions = sortOptions.filter((option) => {
      return option.label.toLowerCase().includes(searchQuery.toLowerCase());
    });
    setFilterOptions(filteredOptions);
  }, [searchQuery, sortOptions]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsFilterOpen((prev) => !prev)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-500 dark:text-white blue:text-white bg-gray-50 dark:bg-black blue:bg-dark-blue hover:bg-gray-100 rounded-md transition-colors h-[40px]"
      >
        <FiFilter className="text-gray-500 dark:text-white blue:text-white" />
        Sort
        <FiChevronDown
          className={`transition-transform ${
            isFilterOpen ? "rotate-180" : ""
          } text-gray-500 dark:text-white blue:text-white`}
        />
      </button>

      {isFilterOpen && (
        <div className="absolute right-0 mt-2 p-2 w-56 bg-white dark:bg-light-black blue:bg-light-blue rounded-lg shadow-lg z-10 border border-[#EAEAEA] dark:border-[#4E4E4E] blue:border-blue">
          <input
            id="search-sort-filter-input"
            placeholder="Search..."
            className="mb-2 p-[8px_12px] w-full text-sm border border-gray-200 dark:border-[#4E4E4E] blue:border-blue bg-gray-100 dark:bg-black blue:bg-dark-blue text-gray-700 dark:text-white blue:text-white rounded-md focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="h-full max-h-[250px] overflow-auto">
            {filterOptions.length < 1 ? (
              <p className="text-sm text-gray-400 dark:text-gray-400 blue:text-gray-400 text-center">
                No options found
              </p>
            ) : (
              filterOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setSelectedOption(option);
                    setIsFilterOpen(false);
                    onFilterChange(option);
                  }}
                  className={`flex items-center justify-between w-full px-4 py-2 text-sm text-left ${
                    selectedOption === option
                      ? "bg-gray-200/25 text-black"
                      : "hover:text-black dark:hover:text-black blue:hover:text-black hover:bg-gray-50"
                  } text-gray-700 dark:text-white blue:text-white rounded-md`}
                >
                  {option.label}
                  {selectedOption === option && (
                    <FiCheck className="text-gray-700 dark:text-white blue:text-white" />
                  )}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SortFilter;
