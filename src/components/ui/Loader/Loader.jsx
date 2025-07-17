import Logo from "../../../assets/Logo.png";
import "./Loader.css";

const Loader = ({
  type = "logo-pulse",
  size = 80,
  color = "primary",
  message = "Loading...",
  fullScreen = true,
}) => {
  // Color mapping for flexibility
  const colorMap = {
    primary: "text-blue-600",
    secondary: "text-purple-600",
    danger: "text-red-600",
    success: "text-green-600",
    warning: "text-yellow-600",
    dark: "text-gray-900",
    light: "text-gray-200",
  };

  const bgColorMap = {
    primary: "bg-blue-100",
    secondary: "bg-purple-100",
    danger: "bg-red-100",
    success: "bg-green-100",
    warning: "bg-yellow-100",
    dark: "bg-gray-800",
    light: "bg-gray-50",
  };

  const borderColorMap = {
    primary: "border-blue-500",
    secondary: "border-purple-500",
    danger: "border-red-500",
    success: "border-green-500",
    warning: "border-yellow-500",
    dark: "border-gray-700",
    light: "border-gray-300",
  };

  const containerClasses = `flex flex-col items-center justify-center p-8 ${
    fullScreen ? "min-h-screen w-full" : ""
  } ${bgColorMap[color] || bgColorMap.primary}`;

  return (
    <div className={containerClasses}>
      {/* Logo Orbit Animation */}
      {type === "logo-orbit" && (
        <div className="relative" style={{ width: size * 2, height: size * 2 }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className={`animate-spin rounded-full border-2 ${borderColorMap[color]} opacity-30`}
              style={{ width: size * 1.8, height: size * 1.8 }}
            ></div>
          </div>
          <img
            src={Logo}
            alt="Loading"
            className="absolute top-0 left-1/2 transform -translate-x-1/2 animate-orbit"
            style={{
              width: size / 2,
              height: size / 2,
              animation: `orbit 2s linear infinite`,
            }}
          />
          <img
            src={Logo}
            alt="Loading"
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 animate-orbit-reverse"
            style={{
              width: size / 2,
              height: size / 2,
              animation: `orbit-reverse 2s linear infinite`,
            }}
          />
        </div>
      )}

      {/* Logo Pulse Animation */}
      {type === "logo-pulse" && (
        <div className="flex flex-col items-center">
          <img
            src={Logo}
            alt="Loading"
            className="animate-pulse-slow transform hover:scale-110 transition-transform duration-300"
            style={{ width: size, height: size }}
          />
        </div>
      )}

      {/* Bouncing Dots with Logo */}
      {type === "bounce" && (
        <div className="flex flex-col items-center space-y-6">
          <img
            src={Logo}
            alt="Loading"
            className="animate-bounce-slow"
            style={{ width: size, height: size }}
          />
          <div className="flex space-x-2">
            {[0, 0.2, 0.4].map((delay) => (
              <div
                key={delay}
                className={`w-3 h-3 rounded-full ${bgColorMap[color]
                  .replace("bg-", "bg-")
                  .replace("100", "400")} animate-bounce`}
                style={{ animationDelay: `${delay}s` }}
              ></div>
            ))}
          </div>
        </div>
      )}

      {/* Modern Wave Animation */}
      {type === "wave" && (
        <div className="flex flex-col items-center space-y-8">
          <img
            src={Logo}
            alt="Loading"
            className="mb-4"
            style={{ width: size, height: size }}
          />
          <div className="flex items-end space-x-1 h-12">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={`w-2 ${bgColorMap[color]
                  .replace("bg-", "bg-")
                  .replace("100", "400")} rounded-t-lg animate-wave`}
                style={{
                  height: `${i * 8}px`,
                  animationDelay: `${i * 0.1}s`,
                }}
              ></div>
            ))}
          </div>
        </div>
      )}

      {/* Message with progress indication */}
      {message && (
        <div className={`mt-6 text-center ${colorMap[color]} font-medium`}>
          {message}
          {type === "wave" && <span className="animate-pulse">...</span>}
        </div>
      )}
    </div>
  );
};

export default Loader;
