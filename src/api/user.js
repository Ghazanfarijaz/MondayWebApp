import { axiosInstance } from "./../utils/axiosInstance";

export const userAPIs = {
  // Change Password
  changePassword: async ({ oldPassword, newPassword }) => {
    try {
      const response = await axiosInstance.patch(
        `/api/user/change-password`,
        {
          oldPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Change Password error:", error);
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "Failed to change password."
      );
    }
  },

  // Update Profile
  updateProfile: async ({ name, profilePicture }) => {
    const formData = new FormData();
    formData.append("name", name);
    if (profilePicture && profilePicture instanceof Blob) {
      formData.append("profilePicture", profilePicture);
    }

    try {
      const response = await axiosInstance.patch(
        `/api/user/update-profile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Update Profile error:", error);
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "Failed to update profile."
      );
    }
  },

  // Send Feedback
  sendFeedback: async ({ summary, details, name, email }) => {
    try {
      const response = await axiosInstance.post(`/api/feedback/send-feedback`, {
        summary,
        details,
        name,
        email,
      });
      return response.data;
    } catch (error) {
      console.error("Send Feedback error:", error);
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "Failed to send feedback."
      );
    }
  },
};
