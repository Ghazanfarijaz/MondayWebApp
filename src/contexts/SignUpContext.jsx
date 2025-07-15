import { useQuery } from "@tanstack/react-query";
import { createContext, useContext } from "react";
import { authAPI } from "../api/auth";

// Create context
const SignUpContext = createContext(null);

export const useSignUp = () => useContext(SignUpContext);

export const SignUpProvider = ({ children }) => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["signupPermission"],
    queryFn: async () =>
      authAPI.fetchUserSignUpPermission({
        // slug: window.location.hostname.split(".")[0],
        slug: "proto-it-consultants",
      }),
  });

  if (isError) {
    console.error("Failed to Fetch SignUp Permission", error?.message);
  }

  const value = {
    signUpMethod: data?.signupMethod,
    isFetchingSignUpPermission: isPending,
  };

  return (
    <SignUpContext.Provider value={value}>{children}</SignUpContext.Provider>
  );
};
