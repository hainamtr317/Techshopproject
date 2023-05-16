import React, { useEffect } from "react";
import { Dashboard } from "../pages/admin/Dashboard";
import ProductAdminPage from "../pages/admin/ProductAdminPages";
import CategoryAdminPage from "../pages/admin/CategoryAdminPage";
import { Route, Routes } from "react-router-dom";
import BrandAdminPage from "../pages/admin/BrandAdminPage";
import Sidebar from "../components/Sidebar";
import PrivateAdminRoutes from "../components/PrivateRoutes/PrivateAdminRoutes";
import { verifyAdminToken } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";
import OrdersPage from "../pages/admin/OrdersPage";

export const AdminLayout = () => {
  const token = localStorage.getItem("authAdminToken");
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchPrivateData = async () => {
      await dispatch(verifyAdminToken()).unwrap();
    };
    if (token) {
      fetchPrivateData();
    }
  }, [dispatch, token]);
  return (
    <div className="flex">
      <Sidebar />
      <Routes>
        <Route element={<PrivateAdminRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/category" element={<CategoryAdminPage />} />
          <Route path="/product" element={<ProductAdminPage />} />
          <Route path="/brand" element={<BrandAdminPage />} />
          <Route path="/orders" element={<OrdersPage />} />
        </Route>
      </Routes>
    </div>
  );
};
export default AdminLayout;
