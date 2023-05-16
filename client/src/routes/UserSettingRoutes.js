import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivateUserRoutes from "../components/PrivateRoutes/PrivateUserRoutes";
import Account from "../pages/profile/Account";

function UserSettingRoutes() {
  return (
    <>
      <Routes>
        <Route element={<PrivateUserRoutes />}>
          <Route path="/account" element={<Account />} />
        </Route>
      </Routes>
    </>
  );
}

export default UserSettingRoutes;
