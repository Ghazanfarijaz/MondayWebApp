import "./App.css";
import { useNavigate, Outlet } from "react-router-dom";
import React from "react";
import { checkSubdomain } from "./api/subdomain";
import Navbar from "./components/Navbar/Navbar";
import LoadingBackdrop from "./components/UIComponents/LoadingBackdrop";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export default function App() {
  const navigate = useNavigate();

  const { isPending, isError, error } = useQuery({
    queryKey: ["subdomainValidation"],
    queryFn: () =>
      checkSubdomain({
        subdomain: window.location.hostname.split(".")[0],
        // subdomain: "proto-it-consultants",
      }),
  });

  if (isPending) {
    return <LoadingBackdrop />;
  }

  if (isError) {
    toast.error("Error!", {
      description: error.message || "Could not validate subdomain!",
    });
    console.error("Error fetching subdomain validation:", error);
    return navigate("/error", {
      state: { error: error },
      replace: true,
    });
  }

  return (
    <React.Fragment>
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
