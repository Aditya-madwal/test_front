import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Page404 from "./pages/Page404";
import Schedule from "./pages/Schedule";
import AuthRequiringRoutes from "./lib/auth/Authrequired";
import { ACCESS_TOKEN } from "./lib/api/constants";
import { useContext } from "react";
import { MyContext } from "./MyContext";
import api from "./lib/api/apiConfig";
import { useNavigate } from "react-router-dom";
import RedirectIfAuthenticated from "./lib/auth/RedirectIfAuthenticated";
import Logout from "./lib/auth/Logout";
import StudyAreaDashboard from "./pages/StudyArea";
import PDFAnalysisPage from "./pages/Pdf";
import User from "./pages/User";

const RegisterAndLogout = () => {
  const navigate = useNavigate();
  if (localStorage.getItem(ACCESS_TOKEN) != null) {
    if (confirm("you sure?")) {
      localStorage.clear();
      return <Register />;
    } else {
      navigate("/");
    }
  } else {
    return <Register />;
  }
};

function App() {
  const { me, setMe } = useContext(MyContext);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMyData = async () => {
      try {
        const response = await api.get(`/users/isauthenticated`);

        setMe(response.data.user);
        console.log(response.data.user);
      } catch (error) {
        if (error.response) {
          setError(
            `Error: ${error.response.status} - ${error.response.statusText}`
          );

          console.error(error.response);
        } else if (error.request) {
          setError("Error: No response received from server");
          console.error(err);
        } else {
          setError(`Error: ${error.message}`);
        }
      } finally {
      }
    };
    fetchMyData();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <AuthRequiringRoutes>
              <Home />
            </AuthRequiringRoutes>
          }
        />
        <Route
          path="/schedule"
          element={
            <AuthRequiringRoutes>
              <Schedule />
            </AuthRequiringRoutes>
          }
        />
        <Route
          path="/profile"
          element={
            <AuthRequiringRoutes>
              <User />
            </AuthRequiringRoutes>
          }
        />
        <Route
          path="/studyarea/:uid"
          element={
            <AuthRequiringRoutes>
              <StudyAreaDashboard />
            </AuthRequiringRoutes>
          }
        />
        <Route
          path="studyarea/:roadmapUid/pdf/:pdfUid"
          element={
            <AuthRequiringRoutes>
              <PDFAnalysisPage />
            </AuthRequiringRoutes>
          }
        />

        <Route
          path="/auth/login"
          element={
            <RedirectIfAuthenticated>
              <Login />
            </RedirectIfAuthenticated>
          }
        />

        <Route
          path="/auth/register"
          element={
            <RedirectIfAuthenticated>
              <Register />
            </RedirectIfAuthenticated>
          }
        />
        <Route path="/auth/logout" element={<Logout />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
