import React, { createContext, useContext, useState, useEffect } from "react";
import { authAPI } from "../api/auth";

// Create context
const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is authenticated on initial load
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Try to get user from localStorage first for immediate UI update
        const storedUser = localStorage.getItem("userData");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }

        // Verify with the server
        const { isAuthenticated, user: serverUser } = await authAPI.checkAuth();

        if (isAuthenticated && serverUser) {
          setUser(serverUser);
          localStorage.setItem("userData", JSON.stringify(serverUser));
        } else if (!isAuthenticated) {
          // Clear localStorage if server says not authenticated
          setUser(null);
          localStorage.removeItem("userData");
        }
      } catch (err) {
        console.error("Authentication check failed:", err);
        // If server check fails, still use localStorage data
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Set up automatic token refresh
  useEffect(() => {
    if (!user) return;

    const refreshToken = async () => {
      try {
        await authAPI.refreshToken();
        console.log("Token refreshed");
      } catch (error) {
        console.error("Token refresh failed:", error);
        // On refresh failure, we'll clear user data
        if (error.response?.status === 401) {
          setUser(null);
          localStorage.removeItem("userData");
        }
      }
    };

    // Refresh token every 45 minutes
    const refreshInterval = setInterval(refreshToken, 45 * 60 * 1000);

    return () => clearInterval(refreshInterval);
  }, [user]);

  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await authAPI.login(email, password);

      // Update user state with returned user data
      setUser(response.user);
      localStorage.setItem("userData", JSON.stringify(response.user));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
      // Clear user data
      setUser(null);
      localStorage.removeItem("userData");
      return { success: true };
    } catch (err) {
      console.error("Logout error:", err);
      return { success: false, error: err.message };
    }
  };

  // Provide auth context
  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
