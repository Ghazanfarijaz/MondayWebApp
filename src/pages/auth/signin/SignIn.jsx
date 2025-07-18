import { useNavigate } from "react-router-dom";
import Logo from "../../../assets/mainlogo.jpg";
import { GoogleButton } from "../../../components/Auth/GoogleButton";
import { authAPI } from "../../../api/auth";
import { Lock, Mail } from "lucide-react";
import { useForm } from "@mantine/form";
import { TextInput, PasswordInput, Skeleton } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useSignUp } from "../../../contexts/SignUpContext";
import { Link } from "react-router-dom";

const SignIn = () => {
  // Hooks
  const navigate = useNavigate();
  const { isFetchingSignUpPermission, signUpMethod } = useSignUp();

  const signInForm = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Invalid email address",
    },
  });

  const loginUser = useMutation({
    mutationFn: () =>
      authAPI.login({
        email: signInForm.values.email,
        password: signInForm.values.password,
        slug: window.location.hostname.split(".")[0],
        // slug: "eurotas-lucie",
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
      <img src={Logo} alt="Logo" className="object-contain w-[100px] h-[100px]" />
      <h1 className="mt-8 text-4xl font-semibold text-slate-900">Sign In</h1>
      <form 
        onSubmit={signInForm.onSubmit(loginUser.mutate)}
        className="mt-8 flex flex-col gap-4"
      >
        <TextInput
          variant="filled"
          placeholder="Enter Your Email"
          {...signInForm.getInputProps("email")}
          leftSectionPointerEvents="none"
          leftSection={<Mail size={20} className="text-gray-500" />}
          classNames={{
            input: "!h-[48px] !rounded-lg !ps-10",
          }}
        />
        <PasswordInput
          variant="filled"
          placeholder="Enter Your Password"
          {...signInForm.getInputProps("password")}
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
          {loginUser.isPending ? "Signing in..." : "Sign in"}
        </button>
      </form>
      <div className="w-full mt-5 flex flex-col gap-4">
        {/* Google Signin */}
        <div className="flex items-center">
          <hr className="flex-1 border-b-1 border-[#D6D6D6]" />
          <p className="font-bold text-[20px]/[150%] px-4 text-[#5E5E5E]">OR</p>
          <hr className="flex-1 border-b-1 border-[#D6D6D6]" />
        </div>
        <GoogleButton />
        {/* Signup */}
        {isFetchingSignUpPermission ? (
          <Skeleton className="!w-full !h-[25px] !rounded-md" />
        ) : (
          (signUpMethod === "signup-with-admin-approval" ||
            signUpMethod === "signup-without-admin-approval") && (
            <p className="text-center text-[#808494] text-[14px]/[140%] font-medium">
              Don&apos;t have an account?{" "}
              <Link className="font-bold text-[#000929]" to="/signup">
                Sign up
              </Link>
            </p>
          )
        )}
      </div>
    </main>
  );
};

export default SignIn;
