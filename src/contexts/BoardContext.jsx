import React, { createContext, useContext, useState, useEffect } from "react";
import { boardsAPI } from "../api/board";

// Create context
const BoardContext = createContext(null);

export const useBoard = () => useContext(BoardContext);

export const BoardProvider = ({ children }) => {
  const [groupData, setGroupData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usersPhotoThumb, setUsersPhotoThumb] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [usersError, setUsersError] = useState(null);

  // Fetch board items

  const fetchBoardItems = async () => {
    try {
      setLoading(true);
      const response = await boardsAPI.getItems();

      const customizationFields = response.data.customization.fields;

      // Add the 'isEditable' Field in the data
      const updatedData = response.data.items.map((item) => {
        const updatedColumnValues = item.column_values.map((col) => {
          const customization = customizationFields.find(
            (field) => field.columnId === col.id
          );
          return {
            ...col,
            isEditable: customization?.isEditable ?? false, // default to false if not found
          };
        });

        return {
          ...item,
          column_values: updatedColumnValues,
        };
      });

      setGroupData(updatedData);
    } catch (err) {
      console.error("Failed to fetch board items:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch users photo thumb
  const fetchUsersPhotoThumb = async () => {
    try {
      setUsersLoading(true);
      const response = await boardsAPI.getUsersPhotoThumb();
      setUsersPhotoThumb(response.data);
    } catch (err) {
      console.error("Failed to fetch users photo thumb:", err);
      setUsersError(err.message);
    } finally {
      setUsersLoading(false);
    }
  };

  // // Fetch items on mount
  useEffect(() => {
    fetchUsersPhotoThumb();
  }, []);

  const value = {
    groupData,
    usersPhotoThumb,
    usersLoading,
    loading,
    error,
    usersError,
  };

  return (
    <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
  );
};
