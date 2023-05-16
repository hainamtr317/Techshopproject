import { Navigate, Outlet } from "react-router-dom";

import { useSelector } from "react-redux";

const PrivateUserRoutes = () => {
  const { isLogin, isLoading } = useSelector((state) => state.auth);
  if (isLoading) return <h1>Loading</h1>;
  if (!isLogin || !localStorage.getItem("authToken")) {
    return <Navigate replace to="/auth/login" />;
  }
  return <Outlet />;
};
export default PrivateUserRoutes;
