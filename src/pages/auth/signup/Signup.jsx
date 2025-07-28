import { Lock, Mail, CircleUser } from "lucide-react";
import { useForm } from "@mantine/form";
import { TextInput, PasswordInput } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { GoogleButton } from "../../../components/Auth/GoogleButton";
import { useSignUp } from "../../../contexts/SignUpContext";
// import SignupSkeleton from "../../../features/auth/components/SignupSkeleton";
import { useEffect } from "react";
import { authAPI } from "../../../api/auth";
import { toast } from "sonner";

const Signup = () => {
  const navigate = useNavigate();
  const { signUpMethod } = useSignUp();

  // Signup form
  const signupForm = useForm({
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
      // Password Must be 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character
      password: (value) => {
        const passwordRegex =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]{8,}$/;
        return passwordRegex.test(value)
          ? null
          : "Password must be at least 8 characters, contain uppercase, lowercase, number and special character";
      },
    },
  });

  // Signup user - Mutation
  const signup = useMutation({
    mutationFn: () =>
      authAPI.signUp({
        name: signupForm.values.name,
        email: signupForm.values.email,
        password: signupForm.values.password,
        slug: window.location.hostname.split(".")[0],
        // slug: "eurotas-lucie",
      }),
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("userData", JSON.stringify(data.user));

      // Redirect to main page on success
      navigate("/", { replace: true });
    },
    onError: (error) => {
      if (
        error?.message ===
        "Account Created Successfully! You will be able to login after Admin's approval!"
      ) {
        toast.success("Success!", {
          description:
            error.message ||
            "You will be able to login after Admin's approval!",
        });
        navigate("/auth/login", { replace: true });
      } else {
        toast.error("Signup failed!", {
          description: error.message || "Please try again.",
        });
      }
    },
  });

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
    <main className="font-medium">
      <h1 className="mt-6 text-3xl font-semibold text-slate-900">Sign up</h1>

      <form
        onSubmit={signupForm.onSubmit(signup.mutate)}
        className="mt-8 flex flex-col gap-8"
      >
        <div className="flex flex-col gap-4">
          <TextInput
            // label="Your Name"
            variant="filled"
            placeholder="Your Name"
            {...signupForm.getInputProps("name")}
            leftSectionPointerEvents="none"
            leftSection={<CircleUser size={20} className="text-gray-500" />}
            classNames={{
              label: "!text-gray-500 !text-sm !mb-2",
              input: "!h-[42px] !rounded-lg !ps-10",
            }}
            disabled={signup.isPending}
          />
          <TextInput
            // label="Email"
            variant="filled"
            placeholder="Enter Your Email"
            {...signupForm.getInputProps("email")}
            leftSectionPointerEvents="none"
            leftSection={<Mail size={20} className="text-gray-500" />}
            classNames={{
              label: "!text-gray-500 !text-sm !mb-2",
              input: "!h-[42px] !rounded-lg !ps-10",
            }}
            disabled={signup.isPending}
          />
          <PasswordInput
            // label="Password"
            variant="filled"
            placeholder="Enter Your Password"
            {...signupForm.getInputProps("password")}
            leftSectionPointerEvents="none"
            leftSection={<Lock size={20} className="text-gray-500" />}
            classNames={{
              label: "!text-gray-500 !text-sm !mb-2",
              input: "!h-[42px] !rounded-lg !ps-10",
            }}
            disabled={signup.isPending}
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
