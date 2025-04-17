"use client";
import React from "react";
import Logo from "../../assets/Logo.png"; // Adjust the path as necessary

const SigninForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <main className="font-medium w-[352px]">
      {/* <div className="w-12 h-12 flex items-center justify-center  rounded-xl"> */}
      <img src={Logo} alt="Logo" className="object-contain w-[48px] h-[48px]" />
      {/* </div> */}

      <h1 className="mt-8 text-4xl font-semibold text-slate-900">Sign In</h1>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
        <div className="flex items-center bg-zinc-100 rounded-xl p-3 h-12">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/70a517bcfc2d3dfa56a133f9b80de8c5ab0e8786?placeholderIfAbsent=true&apiKey=66a3cfd10ea64496910d5aafd67f1097"
            alt=""
            className="w-6 h-6 mr-3"
          />
          <input
            type="email"
            placeholder="Your email"
            className="bg-transparent w-full focus:outline-none text-base font-medium text-zinc-900 placeholder:text-zinc-400"
            required
          />
        </div>

        <div className="flex items-center bg-zinc-100 rounded-xl p-3 h-12">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/1666109278130b0e56ae90e75de704733d943014?placeholderIfAbsent=true&apiKey=66a3cfd10ea64496910d5aafd67f1097"
            alt=""
            className="w-6 h-6 mr-3"
          />
          <input
            type="password"
            placeholder="Your Password"
            className="bg-transparent w-full focus:outline-none text-base font-medium text-zinc-900 placeholder:text-zinc-400"
            required
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-400 text-white py-3 rounded-lg font-medium"
        >
          Sign in
        </button>
      </form>
    </main>
  );
};

export default SigninForm;
