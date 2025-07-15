// GoogleButton.jsx
import { useGoogleLogin } from "@react-oauth/google";
import GoogleIcon from "../../../assets/icons/GoogleIcon";

export const GoogleButton = () => {
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );
        const userInfo = await res.json();
        console.log("User Info:", userInfo);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    },
    onError: () => {
      console.error("Google Login Failed");
    },
  });

  return (
    <button
      onClick={() => login()}
      className="flex items-center gap-2 justify-center w-full bg-[#FCFCFC] border-2 border-[#EFEFEF] rounded-lg py-3 text-[#1A1D1F] font-bold hover:bg-gray-100 text-[15px]/[24px] mb-8"
    >
      <GoogleIcon className="size-6" />
      Google
    </button>
  );
};
