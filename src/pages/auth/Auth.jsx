import { Outlet } from "react-router-dom";
import { useSignUp } from "../../contexts/SignUpContext";
import AppLogo from "../../assets/mainlogo.jpg";

const Auth = () => {
  const { userLogo, userDescription } = useSignUp();

  return (
    <div className="w-screen h-screen grid lg:grid-cols-2 bg-white">
      <div className="lg:p-[0px_48px] p-[48px_24px] flex items-center justify-center">
        <div className="w-[352px]">
          <img
            src={AppLogo}
            alt="app-logo"
            className="object-contain w-[95px] h-auto"
          />
          <Outlet />
        </div>
      </div>
      {/* Image Section - With right padding */}
      <div className="hidden lg:flex items-center justify-center p-24 h-full max-h-screen relative">
        {/* <SigninImage /> */}
        <div className="h-[609.53px] flex flex-col gap-16 bg-gray-200/50 border border-gray-200 rounded-3xl p-4 overflow-hidden">
          <img
            src={userLogo}
            alt="user-logo"
            className="w-[95px] h-auto rounded-lg object-contain"
          />
          <p className="text-lg text-gray-500 line-clamp-[15]">
            {userDescription}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
