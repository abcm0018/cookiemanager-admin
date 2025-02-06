import { Navigate, Route, Routes } from "react-router-dom";
import { ControlPanelPage } from "../pages/ControlPanelPage";

export const ControlPanelRoutes = () => {
  return (
    <Routes>
      <Route path="/control" element={<ControlPanelPage />} />
      <Route path="*" element={<Navigate to="admin/dashboard" />} />
    </Routes>
  );
};
