import { Button, Grid2, Link, TextField } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { AuthLayout } from "../layout";
import { useAuthStore, useForm } from "../../hooks";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { recoveryFormFields } from "../utils";

export const PasswordRecoveryAdmin = () => {
  const { startRecoveryPassword, errorMessage } = useAuthStore();

  const navigate = useNavigate();

  const {
    recoveryEmail,
    recoveryPassword,
    confirmPassword,
    onInputChange: onInputRecoveryChange,
  } = useForm(recoveryFormFields);

  // Para enviar los datos del formulario
  const recoverySubmit = (event) => {
    event.preventDefault();
    if (recoveryPassword === confirmPassword) {
      startRecoveryPassword({
        email: recoveryEmail,
        password: recoveryPassword,
      })
        .then((response) => {
          if (response?.status === 200) {
            Swal.fire({
              title: "Contraseña actualizada",
              text: "Tu contraseña ha sido cambiada correctamente. Ahora puedes iniciar sesión.",
              icon: "success",
              confirmButtonText: "Ir a login",
              timer: 5000,
            }).then(() => {
              navigate("/auth/login");
            });
          }
        })
        .catch((error) => {
          console.error("Error en el cambio de contraseña:", error); // Verificación de error

          // Verifica si el error es un 400 (Bad Request) y si contiene el mensaje específico
          if (error.response && error.response.status === 400) {
            // Verificar la estructura del error
            const violations = error.response.data?.violations;

            if (violations && violations.length > 0) {
              // Si hay violaciones, mostrar el mensaje de la primera violación
              const violationMessage = violations[0];
              Swal.fire({
                title: "Error al cambiar contraseña",
                text: violationMessage,
                icon: "error",
              });
            } else {
              // Si no hay violaciones, mostrar un mensaje genérico
              Swal.fire({
                title: "Error al cambiar contraseña",
                text: "Hubo un problema al intentar actualizar tu contraseña.",
                icon: "error",
              });
            }
          }
        });
    } else {
      Swal.fire({
        title: "Las contraseñas no coinciden",
        text: "La nueva contraseña y su confirmación deben de ser iguales",
        icon: "error",
      });
    }
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
          <Grid2 size={12} sx={{ mt: 2 }}>
            <TextField
              label="Confirmar contraseña"
              type="password"
              placeholder="Confirm contraseña"
              name="confirmPassword"
              value={confirmPassword}
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
            to="/auth/admin/login"
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
