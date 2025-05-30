import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import { useAuth } from "../../contexts/AuthContext";

const SigninForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    if (isFormValid()) {
      setIsLoading(true);
      try {
        // Use the login function from context
        const result = await login(email, password);

        if (result.success) {
          // Redirect to main page on success
          navigate("/mainpage");
        } else {
          setError(result.error || "Login failed. Please try again.");
        }
      } catch (err) {
        setError(err.message || "Login failed. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const isFormValid = () => {
    // Basic validation - you might want to add more robust email validation
    return email.trim() !== "" && password.trim() !== "";
  };

  return (
    <main className="font-medium w-[352px]">
      <img src={Logo} alt="Logo" className="object-contain w-[48px] h-[48px]" />

      <h1 className="mt-8 text-4xl font-semibold text-slate-900">Sign In</h1>

      {/* Display error message if exists */}
      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
        <div className="flex items-center bg-zinc-100 rounded-xl p-3 h-12">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/70a517bcfc2d3dfa56a133f9b80de8c5ab0e8786?placeholderIfAbsent=true&apiKey=66a3cfd10ea64496910d5aafd67f1097"
            alt=""
            className="w-6 h-6 mr-3"
          />
          <input
            type="email"
            placeholder="Your email"
            className="bg-transparent w-full focus:outline-none text-base font-medium text-zinc-900 placeholder:text-zinc-400"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex items-center bg-zinc-100 rounded-xl p-3 h-12">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/1666109278130b0e56ae90e75de704733d943014?placeholderIfAbsent=true&apiKey=66a3cfd10ea64496910d5aafd67f1097"
            alt=""
            className="w-6 h-6 mr-3"
          />
          <input
            type="password"
            placeholder="Your Password"
            className="bg-transparent w-full focus:outline-none text-base font-medium text-zinc-900 placeholder:text-zinc-400"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className={`mt-4 text-white py-3 rounded-lg font-medium transition-colors ${
            isFormValid() && !isLoading
              ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
              : "bg-blue-400 cursor-not-allowed"
          }`}
          disabled={!isFormValid() || isLoading}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Signing in...
            </span>
          ) : (
            "Sign in"
          )}
        </button>
      </form>
    </main>
  );
};

export default SigninForm;
