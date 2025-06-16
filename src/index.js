import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import "@mantine/core/styles.css";
import { createTheme, MantineProvider } from "@mantine/core";
import { router } from "./Routes";
import { RouterProvider } from "react-router-dom";

const theme = createTheme({
  cursorType: "pointer",
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <MantineProvider theme={theme}>
    {/* Router Provider */}
    <RouterProvider router={router} />
  </MantineProvider>
);

reportWebVitals();
