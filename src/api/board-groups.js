import { axiosInstance } from "../utils/axiosInstance";

export const boardGroupsAPIs = {
  // Fetch All Groups Data of Specific Board
  getAllGroups: async ({ boardId }) => {
    try {
      const response = await axiosInstance.get(
        `/api/boards/getAllGroups/${boardId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      const formattedGroups = response.data.data.map((group) => ({
        value: group.id,
        label: group.title || "",
      }));

      return formattedGroups;
    } catch (error) {
      console.error("Error fetching board groups:", error);
      throw new Error(
        error.response?.data?.message ||
          "Failed to fetch board groups. Please try again."
      );
    }
  },
};
