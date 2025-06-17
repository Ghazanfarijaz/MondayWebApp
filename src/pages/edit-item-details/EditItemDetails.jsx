import { Link, useParams } from "react-router-dom";
import { useBoard } from "../../contexts/BoardContext";
import { useEffect, useState } from "react";

const EditItemDetails = () => {
  const { id: itemId } = useParams();
  const { groupData, loading, error } = useBoard();
  const { usersPhotoThumb, usersError, usersLoading } = useBoard();

  // Local States
  const [formattingData, setFormattingData] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    setFormattingData(true);

    // Find the specific item by matching the ID
    const item = groupData?.find((item) => item.id === itemId);

    // Filter out the columns in which "isEditable" is true
    const filtredData = item?.column_values.filter((col) => col.isEditable);

    setSelectedItem(item);
    setFilteredItems(filtredData);

    setFormattingData(false);
  }, [groupData, itemId]);

  if (loading || formattingData) {
    return (
      <div className="p-[40px] bg-gray-200 dark:bg-light-black blue:bg-light-blue flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-gray-100 blue:border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-[40px] bg-gray-200 dark:bg-light-black blue:bg-light-blue flex items-center justify-center h-full">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (usersLoading) {
    return (
      <div className="p-[40px] bg-gray-200 dark:bg-light-black blue:bg-light-blue flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-gray-100 blue:border-white"></div>
      </div>
    );
  }

  if (usersError) {
    return (
      <div className="p-[40px] bg-gray-200 dark:bg-light-black blue:bg-light-blue flex items-center justify-center h-full">
        <p className="text-red-500">Error in user photothumb: {usersError}</p>
      </div>
    );
  }

  if (!selectedItem) {
    return (
      <div className="p-[40px] text-gray-500 dark:text-gray-400 blue:text-gray-400 flex items-center justify-center h-full bg-gray-200 dark:bg-light-black blue:bg-light-blue">
        Item not found
      </div>
    );
  }

  console.log("filteredItems", filteredItems);

  return (
    <div className="h-full max-h-[calc(100dvh-68px)] p-[40px] overflow-auto bg-gray-100 dark:bg-light-black blue:bg-light-blue">
      {/* Breadcrumb navigation */}
      <div className="text-sm mb-4 text-gray-500 dark:text-white blue:text-white">
        <Link
          to="/"
          className="hover:underline text-gray-500 dark:text-white blue:text-white"
        >
          Board 1
        </Link>{" "}
        /{" "}
        <Link
          to={`/item-details/${itemId}`}
          className="hover:underline text-gray-500 dark:text-white blue:text-white"
        >
          Item Details
        </Link>{" "}
        /{" "}
        <span className="text-[#BDBDBD] dark:text-[#A2A2A2] blue:text-gray-100">
          Edit Item
        </span>
      </div>

      {/* Item Title */}
      <h1 className="text-3xl font-bold mb-8 text-black dark:text-white blue:text-white break-all">
        {selectedItem.name}
      </h1>

      {/* Edit Details Form */}
      <form className="bg-white dark:bg-black blue:bg-dark-blue p-6 rounded-lg shadow-sm"></form>
    </div>
  );
};

export default EditItemDetails;
