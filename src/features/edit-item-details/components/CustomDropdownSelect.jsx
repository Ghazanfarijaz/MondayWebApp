import { Popover, Checkbox, Group, ScrollArea } from "@mantine/core";
import useHtmlThemeClass from "../../../hooks/useHtmlThemeClass";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { NewColumnValueModal } from "./NewColumnValueModal";
import { useDisclosure, useClickOutside } from "@mantine/hooks";
import { useAuth } from "./../../../contexts/AuthContext";

const CustomDropdownSelect = ({
  title,
  options,
  isRequired,
  selectedOptions,
  onChange,
  onSaveNewColumnValue,
  error,
}) => {
  // Use Auth Hook to check if we want to allow craeting new column values
  const { user } = useAuth();

  // Hook to manage state of the modal
  // For Creating new Column Value
  const [opened, { open, close }] = useDisclosure(false);

  // Hook to manage state of the popover containing options list
  const [isPopoverOpen, { open: openPopover, close: closePopover }] =
    useDisclosure(false);
  const dropdownRef = useClickOutside(() => {
    if (isPopoverOpen) closePopover();
  });

  // Theme Hooks for blue theme
  const theme = useHtmlThemeClass();
  const isBlueTheme = theme === "blue";

  // Local State
  const [filteredOptions, setFilteredOptions] = useState([]);

  const toggleSelection = (id) => {
    const updatedSelected = selectedOptions.some((option) => option.id === id)
      ? selectedOptions.filter((option) => option.id !== id)
      : [...selectedOptions, options.find((option) => option.id === id)];

    onChange(updatedSelected);
  };

  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  return (
    <>
      <NewColumnValueModal
        opened={opened}
        onClose={close}
        onSaveValue={(newLabel) => {
          onSaveNewColumnValue({
            id: options.length + 1,
            name: newLabel,
          });
          close();
        }}
      />
      <Group gap="8px" className="!flex-col !w-full !items-start">
        <p className="text-black dark:text-white blue:text-white font-normal text-[14px]">
          {title} {isRequired && <span className="text-[#fa5252]">*</span>}
        </p>
        <Popover
          opened={isPopoverOpen}
          onClose={closePopover}
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
            <button onClick={openPopover} type="button">
              {selectedOptions.length < 1 ? (
                <p className="text-placeholder dark:text-placebolder blue:text-placeholder w-full text-left text-[12px]">
                  Select Options
                </p>
              ) : (
                <div className="flex items-center gap-1">
                  {selectedOptions.slice(0, 3).map((option) => (
                    <div
                      key={option.id}
                      className="flex items-center justify-center p-[2px_6px] bg-gray-300 dark:bg-gray-100 blue:bg-gray-100 rounded-full text-black text-[12px]"
                    >
                      {option.name}
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

          <Popover.Dropdown ref={dropdownRef}>
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
                        options.filter((option) =>
                          option.name.toLowerCase().includes(searchTerm)
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

                {filteredOptions.map((option) => {
                  const isSelected = selectedOptions.some(
                    (o) => o.id === option.id
                  );

                  return (
                    <Checkbox
                      key={option.id}
                      checked={isSelected}
                      size="xs"
                      onChange={() => toggleSelection(option.id)}
                      label={
                        <p className="text-[14px] flex-1 w-full">
                          {option.name}
                        </p>
                      }
                      classNames={{
                        root: `!p-[6px_10px] hover:!bg-gray-100 !rounded-md ${
                          isSelected && "!bg-gray-100"
                        }`,
                      }}
                    />
                  );
                })}
                {/* Add New Label - Button */}
                {user?.allowNewValueCreation === "true" && (
                  <button
                    type="button"
                    className="p-[6px_10px] flex gap-1 items-center text-[#2a85ff]"
                    onClick={() => {
                      // Open Modal for creating a new label
                      open();
                      // Close Current Popover
                      closePopover();
                    }}
                  >
                    <Plus className="w-4 h-4" />
                    <p className="text-[14px]">Add New Label</p>
                  </button>
                )}
              </div>
            </ScrollArea>
          </Popover.Dropdown>
        </Popover>
        {error && (
          <p className="text-[#fa5252] text-[12px] -mt-[3px]">{error}</p>
        )}
      </Group>
    </>
  );
};

export default CustomDropdownSelect;
