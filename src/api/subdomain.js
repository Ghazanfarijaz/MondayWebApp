// import axios from "axios";

// export const checkSubdomain = async (subdomain) => {
//   try {
//     const subdomaintest = "localhost:3000";
//     const response = await axios.get(
//       `${import.meta.env.VITE_API_BASE_URL}/api/subdomain/${subdomaintest}`
//     );
//     return response.data;
//   } catch (error) {
//     return {
//       success: false,
//       message: error.response?.data?.message || "Subdomain validation failed",
//       status: error.response?.status || 500,
//     };
//   }
// };

import axios from "axios";

export const checkSubdomain = async (subdomain) => {
  // 1. First debug log
  console.log("[checkSubdomain] Starting validation for:", subdomain);

  // 2. Check environment variable
  const baseUrl = "http://localhost:8080";
  console.log("[checkSubdomain] Using base URL:", baseUrl);

  if (!baseUrl) {
    const errorMsg =
      "VITE_API_BASE_URL is not defined in environment variables";
    console.error("[checkSubdomain]", errorMsg);
    throw new Error(errorMsg);
  }

  const subdomaintest = "localhost:3000";
  // 3. Prepare the full URL
  const apiUrl = `${baseUrl}/api/subdomain/${subdomain}`;
  console.log("[checkSubdomain] Making request to:", apiUrl);

  try {
    // 4. Make the actual API call
    console.log("[checkSubdomain] Sending GET request...");
    const response = await axios.get(apiUrl, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // 5. Log the response
    console.log("[checkSubdomain] Received response:", response.data);
    return response.data;
  } catch (error) {
    // 6. Detailed error logging
    console.error("[checkSubdomain] API request failed:", error);

    if (error.response) {
      // Server responded with error status
      console.error(
        "[checkSubdomain] Server responded with status:",
        error.response.status
      );
      console.error("[checkSubdomain] Response data:", error.response.data);

      return {
        success: false,
        message: error.response.data?.message || "Subdomain validation failed",
        status: error.response.status,
      };
    } else if (error.request) {
      // No response received
      console.error("[checkSubdomain] No response received");

      return {
        success: false,
        message: "No response from server",
        status: 503,
      };
    } else {
      // Request setup error
      console.error("[checkSubdomain] Request setup error:", error.message);

      return {
        success: false,
        message: error.message,
        status: 500,
      };
    }
  }
};
