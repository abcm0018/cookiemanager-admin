import { Button, Grid2, Link, TextField } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { AuthLayout } from "../layout";
import { useAuthStore, useForm } from "../../hooks";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { recoveryFormFields } from "../utils";

export const PasswordRecoveryAdmin = () => {
  const { startRecoveryPassword, errorMessage } = useAuthStore();

  const {
    recoveryEmail,
    recoveryPassword,
    onInputChange: onInputRecoveryChange,
  } = useForm(recoveryFormFields);

  // Para enviar los datos del formulario
  const recoverySubmit = (event) => {
    event.preventDefault();
    startRecoveryPassword({
      email: recoveryEmail,
      password: recoveryPassword,
    });
  };

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire("Error en la autenticación", errorMessage, "error");
    }
  }, [errorMessage]);

  return (
    <AuthLayout
      title="Recuperar contraseña"
      description="Introduce tu correo electrónico y te enviaremos un enlace para
          resetear tu contraseña"
      size={420}
    >
      <form onSubmit={recoverySubmit}>
        <Grid2 container>
          <Grid2 size={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo electrónico"
              type="email"
              placeholder="Correo electrónico"
              name="recoveryEmail"
              value={recoveryEmail}
              fullWidth
              size="medium"
              required
              onChange={onInputRecoveryChange}
            />
          </Grid2>
          <Grid2 size={12} sx={{ mt: 2 }}>
            <TextField
              label="Nueva contraseña"
              type="password"
              placeholder="Nueva contraseña"
              name="recoveryPassword"
              value={recoveryPassword}
              fullWidth
              size="medium"
              required
              onChange={onInputRecoveryChange}
            />
          </Grid2>
        </Grid2>
        <Grid2 container spacing={2} sx={{ mb: 2, mt: 4 }}>
          <Grid2 size={12}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              sx={{ height: 52, bgcolor: "secondary.main" }}
            >
              RESETEAR CONTRASEÑA
            </Button>
          </Grid2>
        </Grid2>
        <Grid2 container direction="row" justifyContent="center" sx={{ mb: 3 }}>
          <Link
            to="/auth/login"
            component={RouterLink}
            underline="none"
            sx={{ color: "secondary.main" }}
          >
            O inciar sesión en tu cuenta
          </Link>
        </Grid2>
      </form>
    </AuthLayout>
  );
};
