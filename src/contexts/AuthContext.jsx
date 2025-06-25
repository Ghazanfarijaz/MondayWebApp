import { createContext, useContext, useState, useEffect } from "react";
import { authAPI } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

// Create context
const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const {
    data: authStatus,
    isError,
    error,
  } = useQuery({
    queryKey: ["authStatus"],
    queryFn: () => {
      // Try to get user from localStorage first for immediate UI update
      const storedUser = localStorage.getItem("userData");
      if (!storedUser) {
        throw new Error("No user data found in localStorage");
      }

      setUser(JSON.parse(storedUser));
      // Verify with the server
      return authAPI.checkAuth();
    },
    retry: false,
  });

  useEffect(() => {
    setLoading(false);
  }, [authStatus]);

  if (isError) {
    console.error("Error fetching auth status:", error);
    toast.error("Authentication error. Please log in again.");
    return navigate("/login", { replace: true });
  }

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
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
