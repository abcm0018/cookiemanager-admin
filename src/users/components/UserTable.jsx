import PropTypes from "prop-types";

import {
  IconButton,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { TableLayout } from "../layout/TableLayout";
import Swal from "sweetalert2";
import { useAdminStore } from "../../hooks/useAdminStore";

export const UserTable = ({ users = [] }) => {
  const { startDeletingUser, errorMessage } = useAdminStore();

  const handleDeleteUser = (userEmail) => {
    Swal.fire({
      title: "Estás a punto de eliminar un usuario, ¿Estás seguro?",
      text: "Esta acción no podrá ser revertida",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        startDeletingUser(userEmail);
        Swal.fire({
          title: "Usuario Eliminado",
          text: "El usuario ha sido eliminado correctamente.",
          icon: "success",
        });
      }
    });
  };

  const headers = [
    "Nombre",
    "Apellidos",
    "Correo electrónico",
    "Compañía",
    "Subscripción",
    "Dominios",
    "Acción",
  ];

  return (
    <>
      <TableLayout headers={headers}>
        {users.map((user, index) => (
          <TableRow key={user.id || index}>
            <TableCell component="th" scope="row">
              <Typography variant="body1">{user.name}</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1">{user.surname}</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1">{user.email}</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1">{user.company}</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1">{user.subscription}</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1">
                {user.domains ? user.domains.length : 0}
              </Typography>
            </TableCell>
            <TableCell>
              <Stack direction="row" spacing={1}>
                <IconButton
                  aria-label="delete"
                  size="small"
                  color="error"
                  onClick={() => handleDeleteUser(user.email)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Stack>
            </TableCell>
          </TableRow>
        ))}
      </TableLayout>
    </>
  );
};

UserTable.propTypes = {
  users: PropTypes.array.isRequired,
};
