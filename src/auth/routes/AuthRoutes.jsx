import { Navigate, Route, Routes } from "react-router-dom";
import { LoginAdmin, LogoutPage, PasswordRecoveryAdmin } from "../pages";

export const AuthRoutes = () => {
  return (
    <Routes>
      {/** Ruta administrador login*/}
      <Route path="admin/login" element={<LoginAdmin />} />
      {/** Ruta logout*/}
      <Route path="logout" element={<LogoutPage />} />
      {/** Ruta administrador recuperar contraseña*/}
      <Route
        path="admin/recovery-password"
        element={<PasswordRecoveryAdmin />}
      />

      {/**Ruta por defecto */}
      <Route path="/*" element={<Navigate to="/auth/admin/login" />} />
    </Routes>
  );
};
