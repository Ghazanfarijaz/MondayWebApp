import SIGN_IN_IMAGE from "../assets/signin-image.svg";
import SigninForm from "../features/signin/components/SigninForm";
import SignupForm from "../features/signin/components/SignupForm";
import OtpForm from "../features/signin/components/OtpForm";


const SignIn = ({page}) => {
  return (
    <div className="w-screen h-screen grid lg:grid-cols-2">
      {/* Form Section - Centered vertically on mobile */}
      <div className="lg:p-[0px_48px] p-[48px_24px] flex items-center justify-center bg-gray-50">
        {page === "login" ? (
          <SigninForm />
        ) : page === "signup" ? (
          <SignupForm />
        ) : (
          <OtpForm />
        )}
      </div>

      {/* Image Section - With right padding */}
      <div className="hidden lg:flex items-center justify-center p-12 bg-gray-50 h-full max-h-screen">
        {/* <SigninImage /> */}
        <img src={SIGN_IN_IMAGE} alt="portal-snapshot" className="h-full" />
      </div>
    </div>
  );
};

export default SignIn;
