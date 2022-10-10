import React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "../Page/HomePage";
import Login from "../Page/Login";

const ChangeRoutes = () => {
  // const PrivateUser = ({ children }) => {
  //   const user = localStorage.getItem("user");

  //   console.log(user);

  //   return children;
  // };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login title="Login" />} />
        <Route path="/registrar" element={<Login title="Registrar" />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default ChangeRoutes;
