import axios from "axios";

export const checkSubdomain = async (subdomain) => {
  // 2. Check environment variable
  const baseUrl = "http://localhost:8080";

  if (!baseUrl) {
    const errorMsg =
      "VITE_API_BASE_URL is not defined in environment variables";
    console.error("[checkSubdomain]", errorMsg);
    throw new Error(errorMsg);
  }

  // 3. Prepare the full URL
  const apiUrl = `${baseUrl}/api/subdomain/${subdomain}`;

  try {
    // 4. Make the actual API call
    const response = await axios.get(apiUrl, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      return {
        success: false,
        message: error.response.data?.message || "Subdomain validation failed",
        status: error.response.status,
      };
    } else if (error.request) {
      return {
        success: false,
        message: "No response from server",
        status: 503,
      };
    } else {
      return {
        success: false,
        message: error.message,
        status: 500,
      };
    }
  }
};
