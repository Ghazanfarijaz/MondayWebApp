import { Lock, Mail, CircleUser } from "lucide-react";
import { useForm } from "@mantine/form";
import { TextInput, PasswordInput } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../../assets/mainlogo.jpg";
import { GoogleButton } from "../../../components/Auth/GoogleButton";
import { useSignUp } from "../../../contexts/SignUpContext";
// import SignupSkeleton from "../../../features/auth/components/SignupSkeleton";
import { useEffect } from "react";

const Signup = () => {
  const navigate = useNavigate();
  const { signUpMethod } = useSignUp();

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

  const signup = useMutation({});

  useEffect(() => {
    if (
      signUpMethod !== "signup-with-admin-approval" &&
      signUpMethod !== "signup-without-admin-approval"
    ) {
      console.error("Sign up not allowed");
      // console.log(signUpMethod);
      navigate("/auth/login", { replace: true });
    }
  }, [signUpMethod, navigate]);

  return (
    <main className="font-medium w-[352px]">
      <img
        src={Logo}
        alt="Logo"
        className="object-contain w-[100px] h-[100px]"
      />
      <h1 className="mt-8 text-4xl font-semibold text-slate-900">Sign up</h1>

      <form
        onSubmit={SignupForm.onSubmit(signup.mutate)}
        className="mt-8 flex flex-col gap-8"
      >
        <div className="flex flex-col gap-4">
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
        </div>

        <button
          type="submit"
          className={`text-white py-3 rounded-lg font-medium transition-colors bg-blue-600 hover:bg-blue-700 cursor-pointer disabled:bg-blue-400 disabled:cursor-not-allowed`}
          disabled={signup.isPending}
        >
          {signup.isPending ? "Signing up..." : "Sign up"}
        </button>
      </form>

      <div className="flex flex-col gap-8">
        {/* Google Signin */}
        <div className="w-full mt-5 flex flex-col gap-5">
          <div className="flex items-center">
            <hr className="flex-1 border-b-1 border-[#D6D6D6]" />
            <p className="font-bold text-[20px]/[150%] px-4 text-[#5E5E5E]">
              OR
            </p>
            <hr className="flex-1 border-b-1 border-[#D6D6D6]" />
          </div>
          <GoogleButton />
        </div>
        {/* Already have an account */}
        <p className="text-center text-[#808494] text-[14px]/[140%] font-medium">
          Already have an account?{" "}
          <Link className="font-bold text-[#000929]" to="/auth/login">
            Sign In
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Signup;
