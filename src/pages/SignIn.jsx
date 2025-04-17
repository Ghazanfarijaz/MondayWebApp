import React from "react";
import SigninForm from "../components/RegistrationComponents/SigninForm";
import SigninImage from "../components/RegistrationComponents/SigninImage";

const SignIn = () => {
  return (
    <div className="w-full h-screen flex items-center justify-between">
      <div className="px-4 md:px-0 md:pl-[170px] flex items-center w-full md:w-auto">
        <SigninForm />
      </div>

      <SigninImage />
    </div>
  );
};

export default SignIn;
