import GoogleIcon from "../../assets/icons/GoogleIcon";

export const GoogleButton = () => {
  const handleGoogleLogin = () => {
    const redirectUri = encodeURIComponent(
      window.location.origin + "/callback"
    );
    window.location.href = `https://auth.lucieup.com?redirect=${redirectUri}`;
    // window.location.href = `http://localhost:5173?redirect=${redirectUri}`;
  };

  return (
    <button
      onClick={() => handleGoogleLogin()}
      className="flex items-center gap-2 justify-center w-full bg-[#FCFCFC] border-2 border-[#EFEFEF] rounded-lg py-3 text-[#1A1D1F] font-bold hover:bg-gray-100 text-[15px]/[24px] mb-8"
    >
      <GoogleIcon className="size-6" />
      Google
    </button>
  );
};
