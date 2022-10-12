import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../Page/HomePage";
import Login from "../Page/Login";

const ChangeRoutes = () => {
  const privateUser = JSON.parse(localStorage.getItem("user"));

  const PrivateRoutes = ({ children }) => {
    return privateUser ? children : <Navigate to="/registrar" />;
  };

  const PrivateLogin = ({ children }) => {
    if (privateUser) {
      return <Navigate to="/home" />;
    } else {
      return children;
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoutes>
              <HomePage />
            </PrivateRoutes>
          }
        />
        <Route
          path="/login"
          element={
            <PrivateLogin>
              <Login title="Login" />
            </PrivateLogin>
          }
        />
        <Route
          path="/registrar"
          element={
            <PrivateLogin>
              <Login title="Registrar" />
            </PrivateLogin>
          }
        />
        <Route
          path="*"
          element={
            <PrivateRoutes>
              <HomePage />
            </PrivateRoutes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default ChangeRoutes;
