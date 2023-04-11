import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Confirmation from "../pages/auth/Confirmation";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
const AuthRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/confirmRegistration/:confirmToken"
          element={<Confirmation />}
        />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword/:resetToken" element={<ResetPassword />} />
      </Routes>
    </>
  );
};

export default AuthRoutes;
