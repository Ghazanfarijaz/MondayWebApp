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
      <div className="hidden lg:flex items-center justify-center p-12 h-full max-h-screen relative">
        {/* <SigninImage /> */}
        <div
          className={`h-full max-h-[609.53px] w-full flex flex-col gap-2 justify-between`}
        >
          <div className="flex flex-col gap-4 bg-gray-200/70 border border-gray-300 rounded-3xl p-4">
            <img
              src={userLogo}
              alt="user-logo"
              className="w-[95px] h-auto rounded-lg object-contain"
            />
            <p className="text-lg text-gray-500 line-clamp-[15]">
              {userDescription}
            </p>
          </div>
          <div className="flex items-center justify-end w-full">
            <p className="text-[14px] p-[8px_16px] rounded-full bg-gray-200/70 border border-gray-300">
              A Eurotas Solution
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
