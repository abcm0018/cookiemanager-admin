import { Navigate, Route, Routes } from "react-router-dom";
import { ControlPanelPage } from "../dashboard/pages";
import { AdminProfilePage } from "../account/pages";
import { SubscriptionsPage } from "../subscriptions/pages";
import { UsersPage } from "../users/pages";

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/admin/dashboard" element={<ControlPanelPage />} />
      <Route path="admin/subscriptions" element={<SubscriptionsPage />} />
      <Route path="admin/:name" element={<AdminProfilePage />} />
      <Route path="admin/users" element={<UsersPage />} />
      <Route path="/*" element={<Navigate to="/admin/dashboard" replace />} />
    </Routes>
  );
};
