import { Lock, Mail, CircleUser } from "lucide-react";
import { useForm } from "@mantine/form";
import { TextInput, PasswordInput } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Logo from "../../../assets/Logo.png";
import GoogleIcon from "../../../assets/icons/GoogleIcon";
import { authAPI } from "../../../api/auth";

const Signup = () => {
  const navigate = useNavigate();

  const SignupForm = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validate: {
      name: (value) =>
        typeof value === "string" && value.trim().length > 0
          ? null
          : "Name is required",
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Invalid email address",
      password: (value) =>
        value.length >= 6 ? null : "Password must be at least 6 characters",
    },
  });

  const loginUser = useMutation({
    mutationFn: () =>
      authAPI.login({
        email: SignupForm.values.email,
        password: SignupForm.values.password,
        slug: window.location.hostname.split(".")[0],
        // slug: "proto-it-consultants",
      }),
    onSuccess: (data) => {
      localStorage.setItem("userData", JSON.stringify(data.user));
      // Redirect to main page on success
      navigate("/", { replace: true });
    },
    onError: (error) => {
      toast.error("Login failed", {
        description: error.message || "Please try again.",
      });
      console.error("Login error:", error);
    },
  });

  return (
    <main className="font-medium w-[352px]">
      <img src={Logo} alt="Logo" className="object-contain w-[48px] h-[48px]" />
      <h1 className="mt-8 text-4xl font-semibold text-slate-900">Sign up</h1>
      <form
        // onSubmit={SignupForm.onSubmit(loginUser.mutate)}
        onSubmit={(e) => {
          e.preventDefault();
          navigate("/signup/otp");
        }}
        className="mt-8 flex flex-col gap-4"
      >
        <TextInput
          // label="Your Name"
          variant="filled"
          placeholder="Your Name"
          {...SignupForm.getInputProps("name")}
          leftSectionPointerEvents="none"
          leftSection={<CircleUser size={20} className="text-gray-500" />}
          classNames={{
            input: "!h-[48px] !rounded-lg !ps-10",
          }}
        />
        <TextInput
          // label="Email"
          variant="filled"
          placeholder="Enter Your Email"
          {...SignupForm.getInputProps("email")}
          leftSectionPointerEvents="none"
          leftSection={<Mail size={20} className="text-gray-500" />}
          classNames={{
            input: "!h-[48px] !rounded-lg !ps-10",
          }}
        />
        <PasswordInput
          // label="Password"
          variant="filled"
          placeholder="Enter Your Password"
          {...SignupForm.getInputProps("password")}
          leftSectionPointerEvents="none"
          leftSection={<Lock size={20} className="text-gray-500" />}
          classNames={{
            input: "!h-[48px] !rounded-lg !ps-10",
          }}
        />

        <button
          type="submit"
          className={`mt-4 text-white py-3 rounded-lg font-medium transition-colors bg-blue-600 hover:bg-blue-700 cursor-pointer disabled:bg-blue-400 disabled:cursor-not-allowed`}
          disabled={loginUser.isPending}
        >
          {loginUser.isPending ? "Signing up..." : "Sign up"}
        </button>
      </form>
      {/* Google Signin */}
      <div className="flex items-center mt-8 mb-5">
        <hr className="flex-1 border-b-1 border-[#D6D6D6]" />
        <p className="font-bold text-[20px]/[150%] px-4 text-[#5E5E5E]">OR</p>
        <hr className="flex-1 border-b-1 border-[#D6D6D6]" />
      </div>
      <button className="flex items-center gap-2 justify-center w-full bg-[#FCFCFC] border-2 border-[#EFEFEF] rounded-lg py-3 text-[#1A1D1F] font-bold  hover:bg-gray-100 text-[15px]/[24px] mb-8">
        <GoogleIcon className="size-6" />
        Google
      </button>
      <p className="text-center text-[#808494] text-[14px]/[140%] font-medium">
        Already have an account?{" "}
        <Link className="font-bold text-[#000929]" to="/auth/login">
          Sign In
        </Link>
      </p>
    </main>
  );
};

export default Signup;
