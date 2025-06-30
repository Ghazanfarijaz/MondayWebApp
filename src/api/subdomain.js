import axios from "axios";

// const BASE_URL = process.env.REACT_APP_API_DEPLOYED_URL;
const BASE_URL = "http://localhost:8080";

export const checkSubdomain = async ({ subdomain }) => {
  try {
    // 4. Make the actual API call
    const response = await axios.get(
      `${BASE_URL}/api/subdomain/validateSubDomain/${subdomain}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
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
