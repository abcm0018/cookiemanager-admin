import { Navigate, Route, Routes } from "react-router-dom";
import { AdminProfilePage } from "../pages/AdminProfilePage";

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/profile" element={<AdminProfilePage />} />
      <Route path="*" element={<Navigate to="admin/dashboard" />} />
    </Routes>
  );
};
