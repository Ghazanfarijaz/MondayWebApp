import { axiosInstance } from "../utils/axiosInstance";

export const checkSubdomain = async ({ subdomain }) => {
  try {
    // 4. Make the actual API call
    const response = await axiosInstance.get(
      `/api/subdomain/validateSubDomain/${subdomain}`
    );

    return response.data.data;
  } catch (error) {
    console.error("[checkSubdomain] Error:", error);
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while validating subdomain"
    );
  }
};
