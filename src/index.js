import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { router } from "./Routes";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";

// Sonner Toast
import { Toaster } from "sonner";

// Mantine UI styles
import { createTheme, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

const theme = createTheme({
  cursorType: "pointer",
});
// REACT_APP_GOOGLE_CLIENT_ID from .env file
const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

// React Query setup
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId={clientId}>
    <MantineProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>

      <Toaster duration={5000} richColors={true} />
    </MantineProvider>
  </GoogleOAuthProvider>
);

reportWebVitals();
