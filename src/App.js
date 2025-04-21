import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MantineProvider } from "@mantine/core";

// Import your page components here
import MainPage from "./pages/MainPage";
import SignIn from "./pages/SignIn";
import Board from "./components/DashboardComponents/MainBoard";
import BoradDetails from "./components/DashboardComponents/BoradDetails";

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<SignIn />} />

            <Route path="/mainpage" element={<MainPage />} />
            <Route path="/mainpage" element={<MainPage />}>
              <Route index element={<Board />} />
              <Route path="item-details" element={<BoradDetails />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </MantineProvider>
  );
}

export default App;
