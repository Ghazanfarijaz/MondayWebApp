// Sidebar.js
import React, { useState } from "react";
import Logo from "../../assets/Logo.png"; // Adjust the path as necessary

const Sidebar = () => {
  const [boards, setBoards] = useState([
    { id: 1, name: "Board 1", active: true },
    { id: 2, name: "Board 2", active: false },
    { id: 3, name: "Board 2", active: false },
    { id: 4, name: "Board 2", active: false },
    { id: 5, name: "Board 2", active: false },
  ]);

  const handleBoardClick = (id) => {
    const updatedBoards = boards.map((board) => ({
      ...board,
      active: board.id === id,
    }));
    setBoards(updatedBoards);
  };

  return (
    <div className="w-64 h-screen bg-white p-4 border-r hidden md:block">
      <div className="flex items-center mb-8">
        <img
          src={Logo}
          alt="Logo"
          className="object-contain w-[48px] h-[48px]"
        />
      </div>

      <h2 className="text-lg font-semibold mb-4">My Boards</h2>
      <ul className="space-y-2">
        {boards.map((board) => (
          <li
            key={board.id}
            className={`p-2 rounded-md cursor-pointer ${
              board.active ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"
            }`}
            onClick={() => handleBoardClick(board.id)}
          >
            {board.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
