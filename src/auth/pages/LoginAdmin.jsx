import { Button, Grid2, Link, TextField } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useAuthStore, useForm } from "../../hooks";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { loginFormFields } from "../utils";
import { AuthLayout } from "../layout";

export const LoginAdmin = () => {
  const { startLoginAdmin, errorMessage } = useAuthStore();

  const {
    loginEmail,
    loginPassword,
    onInputChange: onLoginInputChange,
  } = useForm(loginFormFields);

  // Para enviar los datos del formulario
  const loginSubmit = (event) => {
    event.preventDefault();
    //console.log({ loginEmail, loginPassword });
    startLoginAdmin({ email: loginEmail, password: loginPassword });
  };

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire("Error en la autenticación", errorMessage, "error");
    }
  }, [errorMessage]);
  return (
    <AuthLayout
      title="Iniciar sesión"
      description="Introduce tu email y contraseña para iniciar sesión en tu cuenta"
      size={420}
    >
      <form onSubmit={loginSubmit}>
        <Grid2 container>
          <Grid2 size={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo electrónico"
              type="email"
              placeholder="Correo electrónico"
              name="loginEmail"
              value={loginEmail}
              fullWidth
              size="medium"
              required
              onChange={onLoginInputChange}
            />
          </Grid2>
          <Grid2 size={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              name="loginPassword"
              value={loginPassword}
              fullWidth
              size="medium"
              required
              onChange={onLoginInputChange}
            />
            <Grid2
              container
              direction="row"
              justifyContent="end"
              sx={{ mt: 1, mb: 1 }}
            >
              <Link
                to="/auth/admin/recovery-password"
                component={RouterLink}
                underline="none"
                sx={{ color: "secondary.main" }}
              >
                ¿Has olvidado la contraseña?
              </Link>
            </Grid2>
          </Grid2>
        </Grid2>
        <Grid2 container spacing={2} sx={{ mb: 1, mt: 1 }}>
          <Grid2 size={12}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              //href="/admin/control"
              sx={{ height: 52, bgcolor: "secondary.main" }}
            >
              INICIAR SESIÓN
            </Button>
          </Grid2>
        </Grid2>
      </form>
    </AuthLayout>
  );
};
