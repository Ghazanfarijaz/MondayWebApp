import React from "react";
import SigninForm from "../components/RegistrationComponents/SigninForm";
import SigninImage from "../components/RegistrationComponents/SigninImage";

const SignIn = () => {
  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row">
      {/* Form Section - Centered vertically on mobile */}
      <div className="w-full lg:w-1/2 px-6 lg:px-12 py-12 lg:py-0 flex items-center justify-center">
        <div className="w-full max-w-md">
          <SigninForm />
        </div>
      </div>

      {/* Image Section - With right padding */}
      <div className="hidden lg:flex lg:w-1/2 pl-6 pr-12 items-center justify-center bg-gray-50">
        <div className="w-full max-w-2xl">
          <SigninImage />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
