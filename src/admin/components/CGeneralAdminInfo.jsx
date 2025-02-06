import { Box, Grid2, Typography } from "@mui/material";
import { useAuthStore } from "../../hooks";
import { useEffect } from "react";
import Swal from "sweetalert2";

export const CGeneralAdminInfo = () => {
  const { user, errorMessage } = useAuthStore();

  useEffect(() => {
    // Manejo de errores en la carga
    if (errorMessage !== undefined) {
      Swal.fire("Error al cargar el usuario", errorMessage, "error");
    }
  }, [errorMessage]);

  return (
    <Grid2 container sx={{ pb: 10, pt: 4, pl: 8, pr: 8 }}>
      <Box>
        <Typography variant="h6" sx={{ mb: 3 }}>
          Información general
        </Typography>
        <Grid2 container direction="row" spacing={2}>
          <Grid2 xs={6}>
            <Box sx={{ width: 400, mt: 2 }}>
              <Typography>
                <Typography component="span" fontWeight="bold" variant="body1">
                  Nombre:
                </Typography>{" "}
                {user.name}
              </Typography>
            </Box>
          </Grid2>
          <Grid2 xs={6}>
            <Box sx={{ width: 400, mt: 2 }}>
              <Typography>
                <Typography component="span" fontWeight="bold" variant="body1">
                  Apellidos:
                </Typography>{" "}
                {user.surname}
              </Typography>
            </Box>
          </Grid2>
          <Grid2 xs={6}>
            <Box sx={{ width: 400, mt: 2 }}>
              <Typography>
                <Typography component="span" fontWeight="bold" variant="body1">
                  Email:
                </Typography>{" "}
                {user.email}
              </Typography>
            </Box>
          </Grid2>
        </Grid2>
      </Box>
    </Grid2>
  );
};
