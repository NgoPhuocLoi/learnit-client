import "./App.css";
import { Route, Routes } from "react-router-dom";
import Landing from "./components/layout/Landing";
import Auth from "./views/Auth";
import AuthContextProvider from "./contexts/AuthContext";
import DashBoard from "./views/DashBoard";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import About from "./views/About";
import PostContextProvider from "./contexts/PostContext";

function App() {
  return (
    <AuthContextProvider>
      <PostContextProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Auth authRoute="login" />} />
          <Route path="/register" element={<Auth authRoute="register" />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashBoard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/about"
            element={
              <ProtectedRoute>
                <About />
              </ProtectedRoute>
            }
          />
        </Routes>
      </PostContextProvider>
    </AuthContextProvider>
  );
}

export default App;
