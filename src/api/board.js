import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

// Reuse the existing axios instance configuration
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    subdomain: "localhost:3000",
  },
});

export const boardsAPI = {
  /**
   * Fetch board items with cursor-based pagination
   * @param {string|null} cursor - Optional cursor for pagination
   * @returns {Promise<{success: boolean, data: {cursor: string, items: Array}}>}
   */
  getItems: async (cursor = null) => {
    try {
      const params = {};
      if (cursor) {
        params.cursor = cursor;
      }

      const response = await api.get(`/api/boards/items`, { params });

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
      const response = await api.get(`/api/users/photothumb`);
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

  /**
   * Fetch all items by automatically handling pagination
   * @returns {Promise<Array>} - Combined array of all items
   */

  // Example usage in a component

  getAllItems: async () => {
    try {
      let allItems = [];
      let cursor = null;
      let hasMore = true;

      while (hasMore) {
        const response = await boardsAPI.getItems(cursor);
        allItems = [...allItems, ...response.data.items];
        cursor = response.data.cursor;
        hasMore =
          response.data.cursor !== null && response.data.items.length > 0;
      }

      return allItems;
    } catch (error) {
      console.error("Error fetching all board items:", error);
      throw error;
    }
  },
};
