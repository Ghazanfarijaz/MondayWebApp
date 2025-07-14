import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";
import SignIn from "./pages/SignIn";
import EditItemDetails from "./pages/edit-item-details/EditItemDetails";
import ViewItemDetails from "./pages/view-item-details/ViewItemDetails";
import Dashboard from "./pages/dashboard/Dashboard";
import ErrorPage from "./pages/error/ErrorPage";
import Settings from "./pages/settings/Settings";
import ProfileSettings from "./pages/settings/profile-settings/ProfileSettings";
import ChangePassword from "./pages/settings/change-password/ChangePassword";

export const router = createBrowserRouter([
  {
    path: "",
    element: (
      <AuthProvider>
        <App />
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
        path: "settings",
        element: <Settings />,
        children: [
          {
            path: "profile",
            element: <ProfileSettings />,
          },
          {
            path: "change-password",
            element: <ChangePassword />,
          },
        ],
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
    element: <SignIn page="login" />,
  },{
    path: "signup",
    element: <SignIn page="signup" />,
  },{
    path: "signup/otp",
    element: <SignIn page="otp" />,
  },
  {
    path: "error",
    element: <ErrorPage fullScreen />,
  },
]);
