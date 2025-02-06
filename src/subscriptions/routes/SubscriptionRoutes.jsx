import { Navigate, Route, Routes } from "react-router-dom";
import { SubscriptionsPage } from "../pages/SubscriptionsPage";

export const SubscriptionRoutes = () => {
  return (
    <Routes>
      <Route path="/subscriptions" element={<SubscriptionsPage />} />
      <Route path="*" element={<Navigate to="admin/dashboard" />} />
    </Routes>
  );
};
