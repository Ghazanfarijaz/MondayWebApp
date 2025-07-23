import { useNavigate } from "react-router-dom";
import Logo from "../../../assets/mainlogo.jpg";
import { useForm } from "@mantine/form";
import { PinInput } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { useSignUp } from "../../../contexts/SignUpContext";
// import OTPSkeleton from "../../../features/auth/components/OTPSkeleton";
import { useEffect } from "react";

const SignupOTP = () => {
  const navigate = useNavigate();
  const { signUpMethod } = useSignUp();

  const form = useForm({
    initialValues: {
      otp: "",
    },
    validate: {
      otp: (value) =>
        value.length === 6 ? null : "Please enter all 6 digits of the OTP",
    },
  });

  const verifyOtp = useMutation({});

  useEffect(() => {
    if (
      signUpMethod !== "signup-with-admin-approval" ||
      signUpMethod === "signup-without-admin-approval"
    ) {
      console.error("Sign up not allowed");
      navigate("/auth/login", { replace: true });
    }
  }, [signUpMethod, navigate]);

  return (
    <main className="w-[352px] flex flex-col items-center gap-8">
      <img
        src={Logo}
        alt="Logo"
        className="object-contain w-[100px] h-[100px]"
      />

      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-semibold text-slate-900">
          OTP Verification
        </h1>
        <p className="text-[14px] text-gray-500">
          We just sent you a verification code. Check your inbox to get it.
        </p>
      </div>
      <form
        onSubmit={form.onSubmit(verifyOtp.mutate)}
        className="flex flex-col gap-8 w-full"
      >
        <PinInput
          className="!w-full"
          length={6}
          type="number"
          oneTimeCode
          value={form.values.otp}
          onChange={(value) => form.setFieldValue("otp", value)}
          error={form.errors.otp}
        />

        <button
          type="submit"
          className={`w-full text-white py-3 rounded-lg font-medium transition-colors bg-blue-600 hover:bg-blue-700 cursor-pointer disabled:bg-[#2A85FF80] disabled:cursor-not-allowed`}
          disabled={verifyOtp.isPending}
        >
          Continue
        </button>
      </form>
    </main>
  );
};

export default SignupOTP;
