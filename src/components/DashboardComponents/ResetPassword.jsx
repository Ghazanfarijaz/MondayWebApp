import React from "react";
import { FaTools } from "react-icons/fa";

function ResetPassword() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-gray-100 via-white to-gray-100">
      <div className="text-center p-6 bg-white rounded-2xl shadow-xl max-w-md">
        <div className="flex justify-center mb-4 text-yellow-500 text-5xl animate-pulse">
          <FaTools />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Page Under Construction
        </h1>
        <p className="text-gray-600">
          This page will be updated soon after the Figma design is finalized.
        </p>
      </div>
    </div>
  );
}

export default ResetPassword;
