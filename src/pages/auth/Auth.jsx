import { Outlet } from "react-router-dom";
import { useSignUp } from "../../contexts/SignUpContext";
import AppLogo from "../../assets/logo-icon.jpeg";

const Auth = () => {
  const { userLogo, userDescription } = useSignUp();

  return (
    <div className="w-screen h-screen grid lg:grid-cols-2 bg-white">
      <div className="lg:p-[0px_48px] p-[48px_24px] flex items-center justify-center">
        <div className="w-[352px]">
          <div className="flex flex-col gap-2">
            <img
              src={AppLogo}
              alt="app-logo"
              className="object-contain w-[48px] h-[48px] rounded-lg"
            />
            <div>
              <h3 className="font-bold text-xl text-[#f04967] font-serif">
                Lucie{" "}
                <span className="inline-block scale-y-110 origin-bottom">
                  UP
                </span>
              </h3>
              <p className="text-[#2c5da0] text-[10px] font-serif">
                External <span className="text-[#f04967]">U</span>sers{" "}
                <span className="text-[#f04967]">P</span>ortal
              </p>
            </div>
          </div>
          <Outlet />
        </div>
      </div>
      {/* Image Section - With right padding */}
      <div className="hidden lg:flex items-center justify-center p-12 h-full max-h-screen">
        {/* <SigninImage /> */}
        <div className="h-fit max-h-[320.275px] w-full bg-gray-200/70 rounded-3xl flex flex-col gap-4 relative p-8">
          <img src={userLogo} alt="user-logo" className="w-16 rounded-lg" />
          <p className="text-lg text-gray-500 line-clamp-4">
            {userDescription}
          </p>
          <div className="mt-4 flex items-center justify-end w-full">
            <p className="text-[14px] p-[8px_16px] rounded-full bg-gray-300 border border-gray-300">
              A Eurotas Solution
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
