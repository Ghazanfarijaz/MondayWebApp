import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import useHtmlThemeClass from "../../hooks/useHtmlThemeClass";
import { Skeleton } from "@mantine/core";

const Sidebar = () => {
  const { user, isFetchingBoards } = useAuth();
  const theme = useHtmlThemeClass();
  const isBlueTheme = theme === "blue";
  const pathName = useLocation().pathname;

  return (
    <div className="flex flex-col gap-2 p-4 bg-white dark:bg-black blue:bg-dark-blue px-6 sm:px-6 lg:px-8 w-[250px]">
      <h1 className="text-2xl font-semibold text-black dark:text-white blue:text-white mb-1">
        My Boards
      </h1>
      {isFetchingBoards
        ? Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="!h-[40px]" />
          ))
        : user?.boardsData.map((board) => {
            const isActive = pathName === `/board/${board.boardId}`;
            return (
              <Link
                key={board.boardId}
                to={`/board/${board.boardId}`}
                className={`text-black dark:text-gray-400 blue:text-gray-400 ${
                  isActive
                    ? "bg-gray-100 dark:bg-light-black blue:bg-light-blue"
                    : ""
                } hover:dark:bg-light-black ${
                  isBlueTheme ? "hover:bg-light-blue" : "hover:bg-gray-100"
                } rounded-md p-[8px_12px]`}
              >
                {board.boardName}
              </Link>
            );
          })}
    </div>
  );
};

export default Sidebar;
