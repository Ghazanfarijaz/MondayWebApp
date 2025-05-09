// api/auth.js
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";
console.log("Base URL:", BASE_URL); // Log the base URL for debugging

// Configure axios to always include credentials (cookies)
axios.defaults.withCredentials = true;

// Create an axios instance with consistent configuration
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const authAPI = {
  // Login User
  login: async (email, password) => {
    try {
      const response = await api.post(`/api/auth/login`, {
        email,
        password,
      });

      return {
        success: response.data.success,
        message: response.data.message,
        user: response.data.data.user,
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

  // Refresh token
  refreshToken: async () => {
    try {
      const response = await api.post(`/api/auth/refresh-token`);
      return response.data;
    } catch (error) {
      console.error("Token refresh error:", error);
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "Failed to refresh token."
      );
    }
  },

  // Logout user
  logout: async () => {
    try {
      const response = await api.post(`/api/auth/logout`);
      return response.data;
    } catch (error) {
      console.error("Logout error:", error);
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "Logout failed. Please try again."
      );
    }
  },

  // Check if user is authenticated
  checkAuth: async () => {
    try {
      // Try to access a protected endpoint
      const response = await api.get(`/api/credentials/check-auth`);
      return {
        isAuthenticated: true,
        user: response.data.user,
      };
    } catch (error) {
      if (error.response?.status === 401) {
        // Try to refresh token
        try {
          await authAPI.refreshToken();
          // If refresh successful, try again
          const retryResponse = await api.get(`/api/credentials/check-auth`);
          return {
            isAuthenticated: true,
            user: retryResponse.data.user,
          };
        } catch (refreshError) {
          // If refresh fails, user is not authenticated
          return {
            isAuthenticated: false,
          };
        }
      }
      return {
        isAuthenticated: false,
      };
    }
  },
};
