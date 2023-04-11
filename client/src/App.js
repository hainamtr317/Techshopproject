import { Routes, Route } from "react-router-dom";
import AuthRoutes from "./routes/AuthRoutes";
import MainLayoutRoutes from "./routes/MainLayoutRoutes";
import AdminLayout from "./routes/AdminLayout";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import UserSettingRoutes from "./routes/UserSettingRoutes";
function App() {
  return (
    <>
      <Routes>
        <Route path="auth/*" element={<AuthRoutes />} />
        <Route path="admin/*" element={<AdminLayout />} />
        <Route path="/*" element={<MainLayoutRoutes />} />
        <Route path="user/*" element={<UserSettingRoutes />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
