import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.png";

const ErrorPage = ({
  error,
  errorCode = 404,
  title = "Oops! Something went wrong",
  message = "An unexpected error occurred. Please try again later.",
  showRedirect = true,
  redirectText = "Go back to safety",
  redirectPath = "/",
  fullScreen = true,
  color = "danger",
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get error state from location if available
  const locationError = location.state?.error;
  const mergedError = locationError || error;

  // Use error object values if provided
  const displayCode = mergedError?.status || errorCode;
  const displayTitle = mergedError?.title || title;
  const displayMessage = mergedError?.message || message;

  // Color mapping
  const colorMap = {
    primary: {
      text: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-200",
      button: "bg-blue-600 hover:bg-blue-700",
    },
    secondary: {
      text: "text-purple-600",
      bg: "bg-purple-50",
      border: "border-purple-200",
      button: "bg-purple-600 hover:bg-purple-700",
    },
    danger: {
      text: "text-red-600",
      bg: "bg-red-50",
      border: "border-red-200",
      button: "bg-red-600 hover:bg-red-700",
    },
    success: {
      text: "text-green-600",
      bg: "bg-green-50",
      border: "border-green-200",
      button: "bg-green-600 hover:bg-green-700",
    },
    warning: {
      text: "text-yellow-600",
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      button: "bg-yellow-600 hover:bg-yellow-700",
    },
    dark: {
      text: "text-gray-900",
      bg: "bg-gray-800",
      border: "border-gray-700",
      button: "bg-gray-900 hover:bg-gray-800",
    },
    light: {
      text: "text-gray-800",
      bg: "bg-gray-50",
      border: "border-gray-300",
      button: "bg-gray-200 hover:bg-gray-300 text-gray-800",
    },
  };

  const selectedColor = colorMap[color] || colorMap.danger;

  const containerClasses = `flex flex-col items-center justify-center p-8 ${
    fullScreen ? "min-h-screen w-full" : ""
  } ${selectedColor.bg}`;

  const handleRedirect = () => {
    navigate(redirectPath, { replace: true });
  };

  const handleRefresh = () => {
    // window.location.reload();
    window.location.href = window.location.origin;
  };

  return (
    <div className={containerClasses}>
      <div className="max-w-md w-full text-center">
        {/* Error Code */}
        <div className="mb-6 relative">
          <span
            className={`text-9xl font-bold ${selectedColor.text} opacity-20 absolute -top-4 left-1/2 transform -translate-x-1/2`}
          >
            {displayCode}
          </span>
          <span
            className={`text-6xl font-bold relative ${selectedColor.text} animate-pulse`}
          >
            {displayCode}
          </span>
        </div>

        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <img
            src={Logo}
            alt="Logo"
            className="w-20 h-20 opacity-90 hover:opacity-100 transition-opacity duration-300"
          />
        </div>

        {/* Title */}
        <h1 className={`text-3xl font-bold mb-4 ${selectedColor.text}`}>
          {displayTitle}
        </h1>

        {/* Message */}
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          {displayMessage}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {showRedirect && (
            <button
              onClick={handleRedirect}
              className={`${selectedColor.button} text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300`}
            >
              {redirectText}
            </button>
          )}

          <button
            onClick={handleRefresh}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            Refresh Page
          </button>
        </div>

        {/* Debug Information (dev only) */}
        {process.env.NODE_ENV === "development" && (
          <div
            className={`mt-8 p-4 bg-white dark:bg-gray-700 rounded-lg border ${selectedColor.border} text-left`}
          >
            <h3 className="font-medium mb-2">Debug Information:</h3>
            <pre className="text-xs text-gray-600 dark:text-gray-300 overflow-x-auto">
              {JSON.stringify(
                {
                  path: window.location.pathname,
                  error: mergedError,
                  timestamp: new Date().toISOString(),
                },
                null,
                2
              )}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default ErrorPage;
