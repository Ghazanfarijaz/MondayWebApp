import { Outlet } from "react-router-dom";
import { useSignUp } from "../../contexts/SignUpContext";

const Auth = () => {
  const { userLogo, userDescription } = useSignUp();

  return (
    <div className="w-screen h-screen grid lg:grid-cols-2 bg-white">
      <div className="lg:p-[0px_48px] p-[48px_24px] flex items-center justify-center">
        <Outlet />
      </div>
      {/* Image Section - With right padding */}
      <div className="hidden lg:flex items-center justify-center p-12 h-full max-h-screen">
        {/* <SigninImage /> */}
        <div className="h-full w-full bg-gradient-to-tr from-[#2c5da0] to-[#ec4964] rounded-3xl flex flex-col items-center justify-center gap-8 relative p-8">
          <img src={userLogo} alt="user-logo" className="w-32 rounded-lg" />
          <h2 className="text-xl mt-4 text-gray-200 text-center">
            {userDescription}
          </h2>
          <div className="absolute bottom-8 right-8 flex items-center justify-center p-[8px_16px] rounded-full bg-white border border-gray-200 shadow-sm">
            <p className="text-[14px]">
              Empowered by <b>Eurotas</b>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
