import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import LoadingBackdrop from "./../../../components/ui/LoadingBackdrop";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { authAPI } from "./../../../api/auth";

const GoogleCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  // Mutation To Login
  const loginUser = useMutation({
    mutationFn: ({ code, state }) =>
      authAPI.googleSignIn({
        slug: "eurotas-lucie",
        code,
        redirect_uri: atob(state),
      }),
    enabled: !!code && !!state,
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.data.accessToken);
      localStorage.setItem("userData", JSON.stringify(data.data.user));
      navigate("/", { replace: true });
      toast.success("Login successful!", {
        description: "You have successfully logged in.",
      });
    },
    onError: (error) => {
      toast.error("Error!", {
        description: error.message || "Login failed. Please try again.",
      });
      navigate("/auth/login", { replace: true });
    },
  });

  useEffect(() => {
    if (code && state)
      loginUser.mutate({
        code,
        state,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, state]);

  if (loginUser.isPending) return <LoadingBackdrop />;
};

export default GoogleCallback;
