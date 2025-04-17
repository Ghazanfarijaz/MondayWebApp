import React from "react";

const SigninImage = () => {
  return (
    <div className="pr-[48px] hidden  md:block">
      <div className="w-[619px] h-[784px]  bg-blue-200 rounded-[15px] p-16 flex flex-col ">
        <div className="mb-16">
          <h2 className="text-4xl font-medium text-slate-900">
            Lorem ipsum dolor sit amet consectetur. Sed mi tellus morbi purus a.
          </h2>
        </div>

        <div className="flex-grow flex items-center justify-center">
          <div className="w-full max-w-md bg-white rounded-xl p-4 shadow-sm">
            {/* Browser window mockup */}
            <div className="flex gap-1 mb-4">
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            </div>

            <div className="flex">
              {/* Left panel */}
              <div className="w-2/5 bg-gray-200 rounded-lg p-4">
                <div className="w-4 h-4 bg-blue-900 rounded-full mb-6"></div>

                <div className="space-y-2 mb-8">
                  <div className="h-2 bg-blue-400 rounded-full w-full"></div>
                  <div className="h-2 bg-blue-400 rounded-full w-3/4"></div>
                  <div className="h-2 bg-blue-400 rounded-full w-1/2"></div>
                </div>

                <div className="h-1 bg-blue-100 rounded-full w-full mb-6"></div>

                <div className="flex items-center gap-2 bg-white p-2 rounded-lg">
                  <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-2 bg-blue-400 rounded-full w-full"></div>
                  </div>
                </div>

                <div className="flex justify-center mt-8">
                  <div className="flex gap-1">
                    <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                    <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                    <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                  </div>
                </div>
              </div>

              {/* Right panel */}
              <div className="w-3/5 p-4">
                <div className="space-y-2 mb-4">
                  <div className="h-2 bg-blue-400 rounded-full w-1/2"></div>
                  <div className="h-2 bg-blue-400 rounded-full w-full"></div>
                  <div className="h-2 bg-blue-400 rounded-full w-3/4"></div>
                </div>

                <div className="border border-blue-200 rounded-full h-8 mb-4"></div>
                <div className="border border-blue-200 rounded-full h-8 mb-4"></div>

                <button className="bg-blue-500 text-white w-full py-1 rounded-lg mb-6">
                  Sign up
                </button>

                <div className="flex items-center gap-2">
                  <div className="h-1 bg-blue-200 rounded-full w-full"></div>
                  <div className="h-1 bg-blue-200 rounded-full w-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninImage;
