import { Navigate, Route, Routes } from "react-router-dom";
import { UsersPage } from "../pages/UsersPages";

export const UsersRoutes = () => {
  return (
    <Routes>
      <Route path="/users" element={<UsersPage />} />
      <Route path="*" element={<Navigate to="admin/dashboard" />} />
    </Routes>
  );
};
