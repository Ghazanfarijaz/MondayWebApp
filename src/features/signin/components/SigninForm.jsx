import { useNavigate } from "react-router-dom";
import Logo from "../../../assets/Logo.png";
import { authAPI } from "../../../api/auth";
import { Lock, Mail } from "lucide-react";
import { useForm } from "@mantine/form";
import { TextInput, PasswordInput } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const SigninForm = () => {
  const navigate = useNavigate();

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
      <h1 className="mt-8 text-4xl font-semibold text-slate-900">Sign In</h1>
      <form
        onSubmit={signInForm.onSubmit(loginUser.mutate)}
        className="mt-8 flex flex-col gap-4"
      >
        <TextInput
          label="Email"
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
          label="Password"
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
    </main>
  );
};

export default SigninForm;
