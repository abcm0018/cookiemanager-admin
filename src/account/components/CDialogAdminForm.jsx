import { Box, Grid2, TextField } from "@mui/material";
import PropTypes from "prop-types";

export const CDialogAdminForm = ({
  name,
  surname,
  email,
  onEditAdminChange,
}) => {
  return (
    <Box>
      <Grid2 container direction={"row"}>
        <Box sx={{ width: 775, mt: 2 }}>
          <TextField
            autoFocus
            required
            id="name"
            name="name"
            label="Nombre"
            value={name}
            type="text"
            onChange={onEditAdminChange}
          />
        </Box>
        <Box sx={{ width: 775, mt: 2 }}>
          <TextField
            autoFocus
            required
            id="surname-admin"
            name="surname"
            label="Apellidos"
            value={surname}
            type="text"
            onChange={onEditAdminChange}
          />
        </Box>
        <Box sx={{ width: 775, mt: 2 }}>
          <TextField
            autoFocus
            required
            id="email-admin"
            name="email"
            label="Correo electrónico"
            value={email}
            onChange={onEditAdminChange}
            type="text"
          />
        </Box>
      </Grid2>
    </Box>
  );
};

CDialogAdminForm.propTypes = {
  name: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  onEditAdminChange: PropTypes.func.isRequired,
};
