import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { router } from "./Routes";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Sonner Toast
import { Toaster } from "sonner";

// Mantine UI styles
import { createTheme, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

const theme = createTheme({
  cursorType: "pointer",
});

// React Query setup
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <MantineProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>

    <Toaster
      style={{
        fontFamily: "Plus Jakarta Sans",
      }}
      duration={3000}
      richColors={true}
    />
  </MantineProvider>
);

reportWebVitals();
