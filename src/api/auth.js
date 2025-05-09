// api/auth.js
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";
console.log("Base URL:", BASE_URL); // Log the base URL for debugging

export const authAPI = {
  // Login User
  login: async (email, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/login`, {
        email,
        password,
      });

      return {
        success: response.data.success,
        message: response.data.message,
        user: response.data.data.user,
        accessToken: response.data.data.accessToken,
        refreshToken: response.data.data.refreshToken,
      };
    } catch (error) {
      console.error("Login error:", error);
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "Login failed. Please try again."
      );
    }
  },

  // You can add other auth-related methods here following the same pattern
  // For example:
  /*
  logout: async (accessToken) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/logout`, {}, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      return response.data;
    } catch (error) {
      console.error("Logout error:", error);
      throw new Error(error.response?.data?.message || "Logout failed");
    }
  },
  */
};
