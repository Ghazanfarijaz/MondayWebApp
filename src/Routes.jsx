import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";
import { BoardProvider } from "./contexts/BoardContext";
import SignIn from "./pages/SignIn";
import ErrorPage from "./components/UIComponents/ErrorPage";
import EditItemDetails from "./pages/edit-item-details/EditItemDetails";
import ViewItemDetails from "./pages/view-item-details/ViewItemDetails";
import Dashboard from "./pages/dashboard/Dashboard";

export const router = createBrowserRouter([
  {
    path: "",
    element: (
      <AuthProvider>
        <BoardProvider>
          <App />
        </BoardProvider>
      </AuthProvider>
    ),
    children: [
      {
        index: "/",
        element: <Dashboard />,
      },
      {
        path: "item-details/:id",
        element: <ViewItemDetails />,
      },
      {
        path: "item-details/:id/edit-details",
        element: <EditItemDetails />,
      },
      {
        path: "*",
        element: (
          <ErrorPage errorCode={404} message="Page not found" fullScreen />
        ),
      },
    ],
  },
  {
    path: "login",
    element: <SignIn />,
  },
  {
    path: "error",
    element: <ErrorPage fullScreen />,
  },
]);
