import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";
import SignIn from "./pages/auth/signin/SignIn";
import EditItemDetails from "./pages/edit-item-details/EditItemDetails";
import ViewItemDetails from "./pages/view-item-details/ViewItemDetails";
import Dashboard from "./pages/dashboard/Dashboard";
import ErrorPage from "./pages/error/ErrorPage";
import Settings from "./pages/settings/Settings";
import ProfileSettings from "./pages/settings/profile-settings/ProfileSettings";
import ChangePassword from "./pages/settings/change-password/ChangePassword";
import Auth from "./pages/auth/Auth";
import Signup from "./pages/auth/signup/Signup";
// import SignupOTP from "./pages/auth/otp/SignupOTP";
import { SignUpProvider } from "./contexts/SignUpContext";
import { UserPreferencesProvider } from "./contexts/UserPreferencesContext";
import GoogleCallback from "./pages/auth/google-callback/GoogleCallback";
import AddNewItem from "./pages/add-new-item/AddNewItem";
import BoardDetails from "./pages/boardDetails/BoardDetails";
import SidebarLayout from "./layouts/SidebarLayout";
import UserPreferences from "./pages/user-preferences/UserPreferences";

export const router = createBrowserRouter([
  {
    path: "",
    element: (
      <AuthProvider>
        <UserPreferencesProvider>
          <App />
        </UserPreferencesProvider>
      </AuthProvider>
    ),
    children: [
      {
        index: "/",
        element: (
          <SidebarLayout>
            <Dashboard />
          </SidebarLayout>
        ),
      },
      {
        path: "board/:boardId",
        element: (
          <SidebarLayout>
            <BoardDetails />
          </SidebarLayout>
        ),
      },
      {
        path: "board/:boardId/create-item/:groupId",
        element: <AddNewItem />,
      },
      {
        path: "board/:boardId/item-details/:itemId",
        element: <ViewItemDetails />,
      },
      {
        path: "board/:boardId/item-details/:itemId/edit-details",
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
          {
            path: "preferences",
            element: <UserPreferences />,
          },
        ],
      },
    ],
  },

  // Auth Routes
  {
    path: "auth",
    element: (
      <SignUpProvider>
        <Auth />
      </SignUpProvider>
    ),
    children: [
      {
        path: "login",
        element: <SignIn />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      // {
      //   path: "signup/otp",
      //   element: <SignupOTP />,
      // },
    ],
  },
  {
    path: "callback",
    element: <GoogleCallback />,
  },
  {
    path: "error",
    element: <ErrorPage fullScreen />,
  },

  // Error Routes
  {
    path: "*",
    element: <ErrorPage errorCode={404} message="Page not found" fullScreen />,
  },
]);
