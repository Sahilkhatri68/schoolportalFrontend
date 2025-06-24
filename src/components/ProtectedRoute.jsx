// components/ProtectedRoute.js
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { API } from "./API/API";

const ProtectedRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null); // null = loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API}/login/check_have_token`, { withCredentials: true })
      .then((res) => {
        setIsAuth(res.data === true);
        setLoading(false);
      })
      .catch(() => {
        setIsAuth(false);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return isAuth ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
