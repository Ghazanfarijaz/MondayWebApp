import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";
import { BoardProvider } from "./contexts/BoardContext";
import MainPage from "./pages/MainPage";
import SignIn from "./pages/SignIn";
import ErrorPage from "./components/UIComponents/ErrorPage";
import Board from "./components/DashboardComponents/MainBoard";
import ProfileSettings from "./components/DashboardComponents/ProfileSettings";
import ResetPassword from "./components/DashboardComponents/ResetPassword";
import BoradDetails from "./components/DashboardComponents/BoradDetails";

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
        path: "login",
        element: <SignIn />,
      },
      {
        path: "error",
        element: <ErrorPage fullScreen />,
      },
      {
        path: "/",
        element: <MainPage />,
        children: [
          {
            index: true,
            element: <Board />,
          },
          {
            path: "item-details/:id",
            element: <BoradDetails />,
          },
          {
            path: "profile",
            element: <ProfileSettings />,
          },
          {
            path: "password-reset",
            element: <ResetPassword />,
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
]);
