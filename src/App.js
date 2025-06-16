// import "./App.css";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import { MantineProvider } from "@mantine/core";
// import { AuthProvider } from "./contexts/AuthContext";
// import { BoardProvider } from "./contexts/BoardContext";
// import SessionManager from "./components/SessionManager";

// // Import your page components here
// import MainPage from "./pages/MainPage";
// import SignIn from "./pages/SignIn";
// import Board from "./components/DashboardComponents/MainBoard";
// import BoradDetails from "./components/DashboardComponents/BoradDetails";
// import ProfileSettings from "./components/DashboardComponents/ProfileSettings";
// import ResetPassword from "./components/DashboardComponents/ResetPassword";

// function App() {
//   return (
//     <MantineProvider withGlobalStyles withNormalizeCSS>
//       <AuthProvider>
//         <BoardProvider>
//           <Router>
//             <SessionManager />
//             <div>
//               <Routes>
//                 <Route path="/" element={<Navigate to="/mainpage" replace />} />
//                 <Route path="/login" element={<SignIn />} />

//                 <Route path="/mainpage" element={<MainPage />}>
//                   <Route index element={<Board />} />
//                   <Route path="item-details/:id" element={<BoradDetails />} />
//                   <Route path="profile" element={<ProfileSettings />} />
//                   <Route path="password-reset" element={<ResetPassword />} />
//                   <Route path="*" element={<Navigate to="/mainpage" />} />
//                 </Route>
//               </Routes>
//             </div>
//           </Router>
//         </BoardProvider>
//       </AuthProvider>
//     </MantineProvider>
//   );
// }

// export default App;

import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { useEffect, useState } from "react";
import { checkSubdomain } from "./api/subdomain";
import Loader from "./components/UIComponents/Loader";
import ErrorPage from "./components/UIComponents/ErrorPage";
import { AuthProvider } from "./contexts/AuthContext";
import { BoardProvider } from "./contexts/BoardContext";
import SessionManager from "./components/SessionManager";
import MainPage from "./pages/MainPage";
import SignIn from "./pages/SignIn";
import Board from "./components/DashboardComponents/MainBoard";
import BoradDetails from "./components/DashboardComponents/BoradDetails";
import ProfileSettings from "./components/DashboardComponents/ProfileSettings";
import ResetPassword from "./components/DashboardComponents/ResetPassword";

function AppContent() {
  const navigate = useNavigate();
  const [validationState, setValidationState] = useState({
    loading: true,
    error: null,
  });

  useEffect(() => {
    console.log("1. Starting subdomain validation");

    const validateSubdomain = async () => {
      try {
        console.log("2. Getting current hostname");
        const subdomain = window.location.host;

        console.log("3. Calling checkSubdomain API");
        const result = await checkSubdomain(subdomain);
        console.log("4. API returned:", result);

        if (!result.success) {
          console.log("5. Validation failed - setting error state");
          setValidationState({
            loading: false,
            error: {
              status: result.status || 400,
              message: result.message || "Invalid subdomain",
              title: "Subdomain Error",
            },
          });
          return;
        }

        console.log("5. Validation successful");
        setValidationState({ loading: false, error: null });
      } catch (error) {
        console.error("5. Validation error:", error);
        setValidationState({
          loading: false,
          error: {
            status: 500,
            message: "Failed to validate subdomain",
            title: "Validation Error",
          },
        });
      }
    };

    validateSubdomain();
  }, []);

  useEffect(() => {
    if (!validationState.loading && validationState.error) {
      console.log("6. Redirecting to error page with:", validationState.error);
      navigate("/error", {
        state: { error: validationState.error },
        replace: true,
      });
    }
  }, [validationState, navigate]);

  if (validationState.loading) {
    console.log("Rendering loader");
    return <Loader message="Validating subdomain..." fullScreen />;
  }

  console.log("Rendering main app");
  return (
    <>
      <SessionManager />
      <Routes>
        <Route path="/" element={<Navigate to="/mainpage" replace />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/error" element={<ErrorPage fullScreen />} />
        <Route path="/mainpage" element={<MainPage />}>
          <Route index element={<Board />} />
          <Route path="item-details/:id" element={<BoradDetails />} />
          <Route path="profile" element={<ProfileSettings />} />
          <Route path="password-reset" element={<ResetPassword />} />
          <Route path="*" element={<Navigate to="/mainpage" />} />
        </Route>
        <Route
          path="*"
          element={
            <ErrorPage errorCode={404} message="Page not found" fullScreen />
          }
        />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Router>
        <AuthProvider>
          <BoardProvider>
            <AppContent />
          </BoardProvider>
        </AuthProvider>
      </Router>
    </MantineProvider>
  );
}
