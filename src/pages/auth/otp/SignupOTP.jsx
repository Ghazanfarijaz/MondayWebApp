import { useNavigate } from "react-router-dom";
import Logo from "../../../assets/Logo.png";
import { authAPI } from "../../../api/auth";
import { useForm } from "@mantine/form";
import { PinInput, Group } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const SignupOTP = () => {
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      otp: "",
    },
    validate: {
      otp: (value) =>
        value.length === 6 ? null : "Please enter all 6 digits of the OTP",
    },
  });

  const verifyOtp = useMutation({
    mutationFn: () =>
      authAPI.verifyOtp({
        otp: form.values.otp,
        slug: window.location.hostname.split(".")[0],
      }),
    onSuccess: (data) => {
      localStorage.setItem("userData", JSON.stringify(data.user));
      navigate("/", { replace: true });
    },
    onError: (error) => {
      toast.error("OTP Verification failed", {
        description: error.message || "Please try again.",
      });
      console.error("OTP error:", error);
    },
  });

  return (
    <main className="font-medium w-[352px]">
      <img src={Logo} alt="Logo" className="object-contain w-[48px] h-[48px]" />
      <h1 className="mt-8 text-4xl font-semibold text-slate-900">Sign up</h1>
      <p className="mt-8 font-semibold text-[14px]/[24px]">
        We just sent you a verification code. Check your inbox to get it.
      </p>

      <form
        onSubmit={form.onSubmit(() => verifyOtp.mutate())}
        className="mt-8 flex flex-col gap-4"
      >
        <Group className="w-full" position="center">
          <PinInput
            className="w-full"
            length={6}
            type="number"
            oneTimeCode
            value={form.values.otp}
            onChange={(value) => form.setFieldValue("otp", value)}
            error={form.errors.otp}
          />
        </Group>

        {form.errors.otp && (
          <p className="text-red-600 text-sm text-center">{form.errors.otp}</p>
        )}

        <button
          type="submit"
          className={`mt-4 text-white py-3 rounded-lg font-medium transition-colors bg-blue-600 hover:bg-blue-700 cursor-pointer disabled:bg-[#2A85FF80] disabled:cursor-not-allowed`}
          disabled={form.values.otp.length !== 6 || verifyOtp.isPending}
        >
          Continue
        </button>
      </form>
    </main>
  );
};

export default SignupOTP;
