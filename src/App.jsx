import "./App.css";
import { useNavigate, Outlet } from "react-router-dom";
import React from "react";
import { checkSubdomain } from "./api/subdomain";
// import SessionManager from "./components/SessionManager";
import Navbar from "./components/LayoutComponents/Navbar";
import LoadingBackdrop from "./components/UIComponents/LoadingBackdrop";
import { useQuery } from "@tanstack/react-query";

export default function App() {
  const navigate = useNavigate();

  const { isPending, isError, error } = useQuery({
    queryKey: ["subdomainValidation"],
    queryFn: () =>
      checkSubdomain({
        subdomain:
          process.env.REACT_APP_ENVIRONMENT === "production"
            ? window.location.hostname.split(".")[0]
            : "proto-it-consultants",
      }),
  });

  if (isPending) {
    return <LoadingBackdrop />;
  }

  if (isError) {
    console.error("Error fetching subdomain validation:", error);
    return navigate("/error", {
      state: { error: error },
      replace: true,
    });
  }

  return (
    <React.Fragment>
      {/* <SessionManager /> */}
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
