import { axiosInstance } from "../utils/axiosInstance";

export const boardsAPI = {
  getItems: async ({ cursor = null, searchQuery, filterByEmail, boardId }) => {
    try {
      const params = {};
      if (cursor) params.cursor = cursor;
      params.compareValue = searchQuery;
      params.filterByEmail = filterByEmail;
      params.boardId = boardId;

      const response = await axiosInstance.get(`/api/boards/getAllItems`, {
        params,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      return {
        success: response.data.success,
        data: {
          boardName: response.data.data.boardName,
          cursor: response.data.data.result.cursor,
          items: response.data.data.result.items,
          total_items: response.data.data.result.items_count,
          customization: response.data.data.customization,
        },
      };
    } catch (error) {
      console.error("Error fetching board items:", error);
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch board items. Please try again."
      );
    }
  },
  getUsersPhotoThumb: async () => {
    try {
      const response = await axiosInstance.get(`/api/boards/getPhotothumbs`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      return {
        success: response.data.success,
        data: {
          users: response.data,
        },
      };
    } catch (error) {
      console.error("Error fetching board items:", error);
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch board items. Please try again."
      );
    }
  },
  // Update the Column Values of an Item
  updateColumnValuesofItem: async ({ itemId, columnValues }) => {
    const formData = new FormData();

    columnValues.forEach((col) => {
      formData.append(`columnValues[${col.id}][id]`, col.id);
      formData.append(`columnValues[${col.id}][type]`, col.type);
      formData.append(`columnValues[${col.id}][text]`, col.text || "");

      // If there's a file, append it
      if (col.newlyUploadedFile) {
        formData.append(
          `columnValues[${col.id}][newlyUploadedFile]`,
          col.newlyUploadedFile
        );
      }

      // If there are persons_and_teams, append them
      if (col.type === "people") {
        formData.append(
          `columnValues[${col.id}][persons_and_teams]`,
          JSON.stringify(col.persons_and_teams || [])
        );
      }

      // If Column Type is tags, then append "selectedTags"
      if (col.type === "tags") {
        formData.append(
          `columnValues[${col.id}][selectedTags]`,
          JSON.stringify(col.selectedTags || [])
        );
      }
    });

    try {
      const response = await axiosInstance.post(
        `/api/boards/updateItem/${itemId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error updating item:", error);
      throw new Error(
        error.response?.data?.message ||
          "Failed to update item. Please try again."
      );
    }
  },
  // Get Specific Item Details
  getItemDetails: async ({ itemId, boardId }) => {
    try {
      const response = await axiosInstance.get(
        `/api/boards/getItemDetails/${itemId}?boardId=${boardId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      return {
        id: response.data.data.id,
        name: response.data.data.name,
        column_values: response.data.data.column_values,
      };
    } catch (error) {
      console.error("Error fetching item details:", error);
      throw new Error(
        error.response?.data?.message ||
          "Failed to fetch item details. Please try again."
      );
    }
  },

  // Create New Item
  addNewItem: async ({ boardId, groupId, itemName, columnValues }) => {
    try {
      const formData = new FormData();

      columnValues.forEach((col) => {
        formData.append(`columnValues[${col.columnId}][id]`, col.columnId);
        formData.append(`columnValues[${col.columnId}][type]`, col.columnType);
        formData.append(`columnValues[${col.columnId}][text]`, col.text || "");

        // If there's a file, append it
        if (col.newlyUploadedFile) {
          formData.append(
            `columnValues[${col.columnId}][newlyUploadedFile]`,
            col.newlyUploadedFile
          );
        }

        // If there are persons_and_teams, append them
        if (col.columnType === "people") {
          formData.append(
            `columnValues[${col.columnId}][persons_and_teams]`,
            JSON.stringify(col.persons_and_teams || [])
          );
        }

        // If Column Type is tags, then append "selectedTags"
        if (col.columnType === "tags") {
          formData.append(
            `columnValues[${col.columnId}][selectedTags]`,
            JSON.stringify(col.selectedTags || [])
          );
        }
      });

      const response = await axiosInstance.post(
        `/api/boards/create-new-item/${boardId}/${groupId}?itemName=${itemName}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error adding new item:", error);
      throw new Error(
        error.response?.data?.message ||
          "Failed to add new item. Please try again."
      );
    }
  },

  // Get Options for All Dropdowns
  getDropDownOptions: async ({ boardId, columnIds }) => {
    try {
      const response = await axiosInstance.post(
        `/api/boards/getDropdownOptions/${boardId}`,
        {
          columnIds,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      return response.data.data;
    } catch (error) {
      console.error("Error fetching dropdown options:", error);
      throw new Error(
        error.response?.data?.message ||
          "Failed to fetch dropdown options. Please try again."
      );
    }
  },

  // Get the editable Columns Data
  getEditableColumns: async () => {
    try {
      const response = await axiosInstance.get(`/api/boards/editableColumns`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching editable columns:", error);
      throw new Error(
        error.response?.data?.message ||
          "Failed to fetch editable columns. Please try again."
      );
    }
  },
};
