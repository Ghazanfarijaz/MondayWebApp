import {
  Popover,
  Checkbox,
  Avatar,
  Group,
  ScrollArea,
  Tooltip,
} from "@mantine/core";
import useHtmlThemeClass from "../hooks/useHtmlThemeClass";
import { useState } from "react";

const CustomAvatarSelect = ({ title, options, selected, onChange }) => {
  const theme = useHtmlThemeClass();
  const isBlueTheme = theme === "blue";

  const [filteredOptions, setFilteredOptions] = useState(options);

  const toggleSelection = (id) => {
    const updatedSelected = selected.some((user) => user.id === id)
      ? selected.filter((user) => user.id !== id)
      : [...selected, options.find((user) => user.id === id)];

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
            {selected.length < 1 ? (
              <p className="text-placeholder dark:text-placebolder blue:text-placeholder w-full text-left text-[12px]">
                Select Person
              </p>
            ) : (
              <Avatar.Group>
                {selected.slice(0, 3).map((user) => (
                  <Tooltip key={user.id} label={user.name} withArrow>
                    <Avatar src={user.photo_small} size={24} />
                  </Tooltip>
                ))}
                {selected.length > 3 && (
                  <Avatar size={24}>+{selected.length - 3}</Avatar>
                )}
              </Avatar.Group>
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
                      options.filter((user) =>
                        user.name.toLowerCase().includes(searchTerm)
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

              {filteredOptions.map((user) => {
                const isSelected = selected.some((u) => u.id === user.id);

                return (
                  <Checkbox
                    key={user.id}
                    checked={isSelected}
                    size="xs"
                    onChange={() => toggleSelection(user.id)}
                    label={
                      <Group spacing="xs">
                        <Avatar src={user.photo_small} size={20} />
                        <p className="text-[14px] flex-1 w-full">{user.name}</p>
                      </Group>
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

export default CustomAvatarSelect;
