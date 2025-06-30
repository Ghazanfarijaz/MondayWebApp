import { axiosInstance } from "../utils/axiosInstance";

export const boardsAPI = {
  getItems: async (cursor = null) => {
    try {
      const params = {};
      if (cursor) params.cursor = cursor;

      const response = await axiosInstance.get(`/api/boards/getAllItems`, {
        params,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      return {
        success: response.data.success,
        data: {
          cursor: response.data.data.result.cursor,
          items: response.data.data.result.items,
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
  getItemDetails: async ({ itemId }) => {
    try {
      const response = await axiosInstance.get(
        `/api/boards/getItemDetails/${itemId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      const customizationFields = response.data.customization.fields;

      // Add the 'isEditable' Field in the data
      const updatedColumnValues = response.data.data.column_values.map(
        (col) => {
          const customization = customizationFields.find(
            (field) => field.columnId === col.id
          );
          return {
            ...col,
            isEditable: customization?.isEditable ?? false,
          };
        }
      );

      return {
        id: response.data.data.id,
        name: response.data.data.name,
        column_values: updatedColumnValues,
      };
    } catch (error) {
      console.error("Error fetching item details:", error);
      throw new Error(
        error.response?.data?.message ||
          "Failed to fetch item details. Please try again."
      );
    }
  },
};
