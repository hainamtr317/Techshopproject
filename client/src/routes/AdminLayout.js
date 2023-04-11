import React from "react";

import { Dashboard } from "../pages/admin/Dashboard";
import ProductAdminPage from "../pages/admin/ProductAdminPages";
import CategoryAdminPage from "../pages/admin/CategoryAdminPage";
import { Route, Routes } from "react-router-dom";
import BrandAdminPage from "../pages/admin/BrandAdminPage";
import Sidebar from "../components/Sidebar";
import CheckOut from "../pages/shop/CheckOut";
export const AdminLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/category" element={<CategoryAdminPage />} />
        <Route path="/product" element={<ProductAdminPage />} />
        <Route path="/brand" element={<BrandAdminPage />} />
      </Routes>
    </div>
  );
};
export default AdminLayout;
