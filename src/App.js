import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { AuthProvider } from "./contexts/AuthContext";
import SessionManager from "./components/SessionManager";

// Import your page components here
import MainPage from "./pages/MainPage";
import SignIn from "./pages/SignIn";
import Board from "./components/DashboardComponents/MainBoard";
import BoradDetails from "./components/DashboardComponents/BoradDetails";
import ProfileSettings from "./components/DashboardComponents/ProfileSettings";

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <AuthProvider>
        <Router>
          <SessionManager />
          <div>
            <Routes>
              <Route path="/login" element={<SignIn />} />

              <Route path="/" element={<MainPage />} />
              <Route path="/mainpage" element={<MainPage />}>
                <Route index element={<Board />} />
                <Route path="item-details" element={<BoradDetails />} />
                <Route path="profile" element={<ProfileSettings />} />
              </Route>
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </MantineProvider>
  );
}

export default App;
