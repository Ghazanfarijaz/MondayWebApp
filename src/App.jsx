import "./App.css";
import { useNavigate, Outlet } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { checkSubdomain } from "./api/subdomain";
import Loader from "./components/UIComponents/Loader/Loader";
import SessionManager from "./components/SessionManager";
import Navbar from "./components/LayoutComponents/Navbar";

export default function App() {
  const navigate = useNavigate();
  const [validationState, setValidationState] = useState({
    loading: true,
    error: null,
  });

  useEffect(() => {
    const validateSubdomain = async () => {
      try {
        const subdomain = window.location.host;

        const result = await checkSubdomain(subdomain);

        if (!result.success) {
          setValidationState({
            loading: false,
            error: {
              status: result.status || 400,
              message: result.message || "Invalid subdomain",
              title: "Subdomain Error",
            },
          });
          return;
        }

        setValidationState({ loading: false, error: null });
      } catch (error) {
        setValidationState({
          loading: false,
          error: {
            status: 500,
            message: "Failed to validate subdomain",
            title: "Validation Error",
          },
        });
      }
    };

    validateSubdomain();
  }, []);

  useEffect(() => {
    if (!validationState.loading && validationState.error) {
      navigate("/error", {
        state: { error: validationState.error },
        replace: true,
      });
    }
  }, [validationState, navigate]);

  if (validationState.loading) {
    return <Loader message="Validating subdomain..." fullScreen={true} />;
  }
  return (
    <React.Fragment>
      <SessionManager />
      <div className="flex flex-col h-screen w-screen">
        {/* Right side: Navbar at the top, then Board below */}
        <Navbar />
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </React.Fragment>
  );
}
