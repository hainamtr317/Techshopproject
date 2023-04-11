import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoutes";
import Account from "../pages/profile/Account";

function UserSettingRoutes() {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/account" element={<Account />} />
        </Route>
      </Routes>
    </>
  );
}

export default UserSettingRoutes;
