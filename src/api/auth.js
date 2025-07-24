import { axiosInstance } from "../utils/axiosInstance";

export const authAPI = {
  // Login User
  login: async ({ email, password, slug }) => {
    try {
      const response = await axiosInstance.post(`/api/auth/login`, {
        email,
        password,
        slug,
      });

      localStorage.setItem("accessToken", response.data.data.accessToken);

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

  // Login and SignUp with Google
  googleSignIn: async ({ slug, code, redirect_uri }) => {
    try {
      const response = await axiosInstance.post(
        `/api/auth/signin-with-google`,
        {
          slug,
          code,
          redirect_uri,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Google Sign-in error:", error);
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
      const response = await axiosInstance.post(`/api/auth/refresh-token`);
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
      const response = await axiosInstance.post(`/api/auth/logout`);
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
      const response = await axiosInstance.get(`/api/auth/check-user-auth`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      return {
        isAuthenticated: true,
        user: response.data.user,
      };
    } catch (error) {
      console.error("Authentication check error:", error);

      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "Failed to check authentication status."
      );
    }
  },

  // Fetch User's Signup Permission
  fetchUserSignUpPermission: async ({ slug }) => {
    try {
      const response = await axiosInstance.get(
        `/api/auth/check-signup-permission`,
        {
          params: {
            slug,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error in checkUserSignUpPermission", error);
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "Failed to check user signup permission."
      );
    }
  },
};
