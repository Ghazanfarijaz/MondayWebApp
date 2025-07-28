import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import LoadingBackdrop from "./../../../components/ui/LoadingBackdrop";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { authAPI } from "./../../../api/auth";

const GoogleCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  // Mutation To Login
  const loginUser = useMutation({
    mutationFn: ({ token }) =>
      authAPI.googleSignIn({
        slug: window.location.hostname.split(".")[0],
        // slug: "eurotas-lucie",
        token,
      }),
    enabled: !!token,
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.data.accessToken);
      localStorage.setItem("userData", JSON.stringify(data.data.user));
      navigate("/", { replace: true });
      toast.success("Login successful!", {
        description: "You have successfully logged in.",
      });
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
        toast.error("Error!", {
          description: error.message || "Login failed. Please try again.",
        });
        navigate("/auth/login", { replace: true });
      }
    },
  });

  useEffect(() => {
    if (token)
      loginUser.mutate({
        token,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  if (loginUser.isPending) return <LoadingBackdrop />;
};

export default GoogleCallback;
