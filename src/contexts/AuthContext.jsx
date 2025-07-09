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
  // Sorting options on Dashboard
  const [sortingOptions, setSortingOptions] = useState([]);

  const {
    data: authStatus,
    isError,
    error,
  } = useQuery({
    queryKey: ["authStatus"],
    queryFn: () => {
      // Verify with the server
      return authAPI.checkAuth();
    },
    retry: false,
  });

  useEffect(() => {
    setUser(authStatus?.user || null);
  }, [authStatus]);

  if (isError) {
    console.error("Error fetching auth status:", error);
    toast.error("Error!", {
      description: error.message || "Authentication Failed!",
    });
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
    isAuthenticated: !!user,
    logout,
    sortingOptions,
    setSortingOptions,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
