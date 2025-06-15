import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api/apiConfig"
import { ACCESS_TOKEN } from "../api/constants";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// routes that require the visitor to have bearer token to access :

const AuthRequiringRoutes = ({ children }) => {
  const [IsAuth, SetIsAuth] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    checkAuth().catch(() => {
      SetIsAuth(false);
    });
  });

  const checkAuth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    // console.log(token);

    if (token === null) {
      SetIsAuth(false);
    } else {
      const decodedToken = jwtDecode(token);
      const expdate = decodedToken.exp;
      const today = Date.now() / 1000;

      if (today > expdate) {
        // token has expired
        localStorage.removeItem(ACCESS_TOKEN);
        SetIsAuth(false);
        navigate("auth/login");
      } else {
        SetIsAuth(true);
        // navigate("/");
      }
    }
  };

  if (IsAuth === null) {
    return <div>Loading...</div>;
  }

  return IsAuth ? children : <Navigate to="/auth/login" />;
};

export default AuthRequiringRoutes;
