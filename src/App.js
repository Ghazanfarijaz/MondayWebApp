import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { AuthProvider } from "./contexts/AuthContext";
import { BoardProvider } from "./contexts/BoardContext";
import SessionManager from "./components/SessionManager";

// Import your page components here
import MainPage from "./pages/MainPage";
import SignIn from "./pages/SignIn";
import Board from "./components/DashboardComponents/MainBoard";
import BoradDetails from "./components/DashboardComponents/BoradDetails";
import ProfileSettings from "./components/DashboardComponents/ProfileSettings";
import ResetPassword from "./components/DashboardComponents/ResetPassword";

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <AuthProvider>
        <BoardProvider>
          <Router>
            <SessionManager />
            <div>
              <Routes>
                <Route path="/" element={<Navigate to="/mainpage" replace />} />
                <Route path="/login" element={<SignIn />} />

                <Route path="/mainpage" element={<MainPage />}>
                  <Route index element={<Board />} />
                  <Route path="item-details/:id" element={<BoradDetails />} />
                  <Route path="profile" element={<ProfileSettings />} />
                  <Route path="password-reset" element={<ResetPassword />} />
                  <Route path="*" element={<Navigate to="/mainpage" />} />
                </Route>
              </Routes>
            </div>
          </Router>
        </BoardProvider>
      </AuthProvider>
    </MantineProvider>
  );
}

export default App;
