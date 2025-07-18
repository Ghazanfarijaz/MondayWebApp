import { Popover, Checkbox, Group, ScrollArea } from "@mantine/core";
import useHtmlThemeClass from "../../../hooks/useHtmlThemeClass";
import { useState, useRef } from "react";
import { Plus } from "lucide-react";
import { LabelModal } from "./LabelModal";
import { useDisclosure, useClickOutside } from "@mantine/hooks";

const CustomDropdownSelect = ({
  title,
  options,
  selectedOptions,
  onChange,
}) => {
    const [opened, { open, close }] = useDisclosure(false);
    const [isPopoverOpen, { open: openPopover, close: closePopover }] =
      useDisclosure(false);
      const dropdownRef = useClickOutside(() => {
        if (isPopoverOpen) closePopover();
      });
  // Hooks
  const theme = useHtmlThemeClass();
  const isBlueTheme = theme === "blue";

  // Local State
  const [filteredOptions, setFilteredOptions] = useState(options);

  const toggleSelection = (id) => {
    const updatedSelected = selectedOptions.some((option) => option.id === id)
      ? selectedOptions.filter((option) => option.id !== id)
      : [...selectedOptions, options.find((option) => option.id === id)];

    onChange(updatedSelected);
  };

  return (
    <>
      <LabelModal opened={opened} onClose={close} />
      <Group gap="8px" className="!flex-col !w-full !items-start">
        <p className="text-black dark:text-white blue:text-white font-normal text-[16px]">
          {title}
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
                <button className="p-2 hover:bg-gray-100 flex gap-1 items-center">
                  <Plus className="w-4 h-4" />
                  <p
                    onClick={() => {
                      open();
                      closePopover();
                    }}
                    className="underline underline-offset-4"
                  >
                    Add a Label
                  </p>
                </button>
              </div>
            </ScrollArea>
          </Popover.Dropdown>
        </Popover>
      </Group>
    </>
  );
};

export default CustomDropdownSelect;
