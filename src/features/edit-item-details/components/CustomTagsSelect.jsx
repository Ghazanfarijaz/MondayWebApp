import { Popover, Checkbox, Group, ScrollArea } from "@mantine/core";
import useHtmlThemeClass from "../../../hooks/useHtmlThemeClass";
import { useState } from "react";

const CustomTagsSelect = ({ title, options, selectedOptions, onChange }) => {
  // Hooks
  const theme = useHtmlThemeClass();
  const isBlueTheme = theme === "blue";

  // Local State
  const [filteredOptions, setFilteredOptions] = useState(options);

  const toggleSelection = (id) => {
    const updatedSelected = selectedOptions.some((tag) => tag.id === id)
      ? selectedOptions.filter((tag) => tag.id !== id)
      : [...selectedOptions, options.find((tag) => tag.id === id)];

    onChange(updatedSelected);
  };

  return (
    <Group gap="8px" className="!flex-col !w-full !items-start">
      <p className="text-black dark:text-white blue:text-white font-normal text-[16px]">
        {title}
      </p>
      <Popover
        width="target"
        position="bottom-start"
        withArrow
        shadow="md"
        classNames={{
          dropdown: "!rounded-lg !py-1 !pr-0 !pl-1",
        }}
      >
        <Popover.Target
          className={
            isBlueTheme
              ? " !bg-[#2b2d50] !text-white !p-[8px_10px] !rounded-lg !border-none !min-h-[40px] !w-full"
              : "!p-[8px_10px] !rounded-lg !text-black dark:!text-white !bg-gray-100 dark:!bg-light-black !border-none !h-[40px] !w-full"
          }
        >
          <button type="button">
            {selectedOptions.length < 1 ? (
              <p className="text-placeholder dark:text-placebolder blue:text-placeholder w-full text-left text-[12px]">
                Select Tags
              </p>
            ) : (
              <div className="flex items-center gap-1">
                {selectedOptions.slice(0, 3).map((tag) => (
                  <div
                    key={tag.id}
                    className="flex items-center justify-center p-[2px_6px] bg-gray-300 dark:bg-gray-100 blue:bg-gray-100 rounded-full text-black text-[12px]"
                  >
                    #{tag.name}
                  </div>
                ))}
                {selectedOptions.length > 3 && (
                  <div className="flex items-center justify-center p-[2px_6px] bg-gray-300 dark:bg-gray-100 blue:bg-gray-100 rounded-full text-black text-[12px]">
                    +{selectedOptions.length - 3}
                  </div>
                )}
              </div>
            )}
          </button>
        </Popover.Target>

        <Popover.Dropdown>
          <ScrollArea h={200} scrollbarSize={2}>
            <div className="space-y-1 relative">
              <div className="p-2 sticky top-0 bg-white z-10">
                <input
                  type="text"
                  placeholder={`Search People by name...`}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none text-[14px]"
                  onChange={(e) => {
                    const searchTerm = e.target.value.toLowerCase();
                    setFilteredOptions(
                      options.filter((tag) =>
                        tag.name.toLowerCase().includes(searchTerm)
                      )
                    );
                  }}
                />
              </div>
              {filteredOptions.length < 1 && (
                <p className="text-placeholder text-sm text-center">
                  Nothing found...
                </p>
              )}

              {filteredOptions.map((tag) => {
                const isSelected = selectedOptions.some((t) => t.id === tag.id);

                return (
                  <Checkbox
                    key={tag.id}
                    checked={isSelected}
                    size="xs"
                    onChange={() => toggleSelection(tag.id)}
                    label={
                      <p className="text-[14px] flex-1 w-full">#{tag.name}</p>
                    }
                    classNames={{
                      root: `!p-[6px_10px] hover:!bg-gray-100 !rounded-md ${
                        isSelected && "!bg-gray-100"
                      }`,
                    }}
                  />
                );
              })}
            </div>
          </ScrollArea>
        </Popover.Dropdown>
      </Popover>
    </Group>
  );
};

export default CustomTagsSelect;
