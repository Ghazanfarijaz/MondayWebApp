import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { authAPI } from "../api/auth";

/**
 * SessionManager - Minimal component that handles session management
 * - Intercepts 401 responses and attempts token refresh
 * - Handles session expiration
 */
const SessionManager = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) return;

    // Intercept fetch/XHR calls to handle 401 responses
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      try {
        const response = await originalFetch(...args);

        // If we get a 401 Unauthorized, try to refresh the token
        if (response.status === 401) {
          try {
            // Try to refresh the token
            await authAPI.refreshToken();
            // Retry the original request
            return await originalFetch(...args);
          } catch (refreshError) {
            // If refresh fails, log the user out
            await logout();
            navigate("/login");
          }
        }

        return response;
      } catch (error) {
        throw error;
      }
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, [isAuthenticated, logout, navigate]);

  // This component doesn't render anything
  return null;
};

export default SessionManager;
